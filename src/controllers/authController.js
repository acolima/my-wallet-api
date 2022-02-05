import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid" 
import db from "../db.js"

export async function signUp(req, res){
  const { user } = res.locals

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
  const { user } = res.locals
  
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
  const { session } = res.locals

  try {
    await db.collection("sessions").deleteOne({token: session.token})

    res.sendStatus(200)
  } catch {
    res.sendStatus(500)
  }
}