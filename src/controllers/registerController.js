import { ObjectId } from "mongodb"
import db from "../db.js"

export async function addRegister(req, res){
  const { register } = res.locals
  const { session } = res.locals

  try{
    await db.collection("registers").insertOne({...register, userId: session.userId})

    res.sendStatus(201)
  } catch {
    res.sendStatus(500)
  }
}

export async function getRegisters(req, res){
  const { session } = res.locals

  try{
    const registers = await db.collection("registers").find({userId: session.userId}).toArray()

    res.status(200).send(registers)
  } catch {
    res.sendStatus(500)
  }  
}

export async function deleteRegister(req, res){
  const { id } = req.params
  try {
    await db.collection("registers").deleteOne({_id: ObjectId(id)})

    res.sendStatus(200)
  } catch {
    res.sendStatus(500)
  }
}