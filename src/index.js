import express, { json } from "express"
import cors from "cors"
import joi from "joi"
import { MongoClient } from "mongodb"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid" 

dotenv.config()
const server = express()
server.use(cors())
server.use(json())

const mongoClient = new MongoClient(process.env.MONGO_URI)
let db
mongoClient.connect(() => {
  db = mongoClient.db("MyWallet")
})

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


/* SignUp route */
server.post("/sign-up", async (req, res) => {
  const user = req.body

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
})

server.post("/login", async (req, res) => {
  const user = req.body

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
})

server.listen(5000, () => console.log("Listening on port 5000"))