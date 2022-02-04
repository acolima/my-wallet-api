import joi from "joi"
import { stripHtml } from "string-strip-html"
import db from "../db.js"
import dayjs from "dayjs"

/* Schemes */
const registerScheme = joi.object({
  amount: joi.string().required(),
  description: joi.string().required(),
  type: joi.string().valid('income', 'expense').required(),
  date: joi.string()
})

export async function addRegister(req, res){
  const { authorization } = req.headers
  const token = authorization?.replace("Bearer ", "")
  const register = {
    amount: stripHtml(req.body.amount).result.trim(),
    description: stripHtml(req.body.description).result.trim(),
    type: req.body.type,
    date: dayjs().format("DD/MM")
  }
  
  if(!token) 
    return res.sendStatus(401);

  const validation = registerScheme.validate(register)
  if(validation.error)
    return res.status(422).send("Todos os campos devem ser preenchidos")

  try {
    const user = await db.collection("sessions").findOne({token})

    if(!user)
      return res.sendStatus(401)

    await db.collection("registers").insertOne({...register, userId: user.userId})
    res.sendStatus(201)
  } catch {
    res.sendStatus(500)
  }
}

export async function getRegisters(req, res){
  const { authorization } = req.headers
  const token = authorization?.replace("Bearer ", "")

  if(!token) 
    return res.sendStatus(401);

  try {
    const user = await db.collection("sessions").findOne({token})
    if(!user)
      return res.sendStatus(401)

    const registers = await db.collection("registers").find({userId: user.userId}).toArray()
    res.send(registers)
  } catch {
    res.sendStatus(500)
  }
}