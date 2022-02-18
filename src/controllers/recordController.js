import { ObjectId } from "mongodb"
import db from "../db.js"

export async function addRecord(req, res) {
  const { record, session } = res.locals

  try {
    await db.collection("records").insertOne({ ...record, userId: session.userId })

    res.sendStatus(201)
  } catch {
    res.sendStatus(500)
  }
}

export async function getRecord(req, res) {
  const { session } = res.locals

  try {
    const records = await db.collection("records").find({ userId: session.userId }).toArray()

    res.status(200).send(records)
  } catch {
    res.sendStatus(500)
  }
}

export async function deleteRecord(req, res) {
  const { id } = req.params

  try {
    await db.collection("records").deleteOne({ _id: ObjectId(id) })

    res.sendStatus(200)
  } catch {
    res.sendStatus(500)
  }
}

export async function updateRecord(req, res) {
  const { id } = req.params
  const { record } = res.locals

  try {
    const toUpdateRecord = await db.collection("records").findOne({ _id: ObjectId(id) })

    if (toUpdateRecord) {
      await db.collection("records").updateOne({ _id: ObjectId(id) }, { $set: { ...record } })
      res.sendStatus(200)
    }
  } catch {
    res.sendStatus(500)
  }
}