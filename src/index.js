import express, { json } from "express"
import cors from "cors"
import joi from "joi"
import { MongoClient } from "mongodb"
import dotenv from "dotenv"
import bcrypt from "bcrypt"

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
      return res.status(422).send("Email já cadastrado")
    

    const password = bcrypt.hashSync(user.password, 10)
    await usersCollection.insertOne({...user, password})

    res.sendStatus(201)
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

server.listen(5000, () => console.log("Listening on port 5000"))