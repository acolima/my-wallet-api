import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid" 
import db from "../db.js"
import joi from "joi"
import { stripHtml } from "string-strip-html"

/* Schemas */
const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required()
})

const loginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required()
})

export async function signUp(req, res){
  const user = {
    name: stripHtml(req.body.name).result.trim(),
    email: stripHtml(req.body.email).result.trim(),
    password: stripHtml(req.body.password).result.trim(),
  }

  const validation = userSchema.validate(user)
  if(validation.error)
    return res.status(422).send("Todos os campos devem ser preenchidos")
  
  try {
    const usersCollection = db.collection("users")
    
    const emailRegistered = await usersCollection.findOne({email: user.email})
    if(emailRegistered)
      return res.status(409).send("Email já cadastrado")
    
    const password = bcrypt.hashSync(user.password, 10)
    await usersCollection.insertOne({...user, password})

    res.sendStatus(201)
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function signIn(req, res){
  const user = {
    email: stripHtml(req.body.email).result.trim(),
    password: stripHtml(req.body.password).result.trim()
  }

  const validation = loginSchema.validate(user)
  if(validation.error)
    return res.status(422).send("Todos os campos devem ser preenchidos")
  

  try{
    const userRegistered = await db.collection("users").findOne({email: user.email})
    
    if(!userRegistered)
      return res.status(401).send("Email e/ou senha incorretos")
    
    if(!bcrypt.compareSync(user.password, userRegistered.password))
      return res.status(401).send("Email e/ou senha incorretos")
    
    const token = uuid()
    await db.collection("sessions").insertOne({token, userId: userRegistered._id})

    const name = userRegistered.name

    res.send({token, name})
  } catch {
    res.sendStatus(500);
  }
}

export async function signOut(req, res){
  const { authorization } = req.headers
  const token = authorization?.replace("Bearer ", "")

  if(!token) 
    return res.sendStatus(401);

  try {
    const user = await db.collection("sessions").findOne({token})

    if(!user)
      return res.sendStatus(401)

    await db.collection("sessions").deleteOne({token: user.token})
    res.sendStatus(200)
  } catch {
    res.sendStatus(500)
  }
}