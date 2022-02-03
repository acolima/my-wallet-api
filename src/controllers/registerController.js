import joi from "joi"
import db from "../db.js"

/* Schemes */
const registerScheme = joi.object({
  amount: joi.string().required(),
  description: joi.string().required(),
  type: joi.string().valid('income', 'expense').required(),
  date: joi.string()
})

export async function addIncome(req, res){
  const { authorization } = req.headers
  const token = authorization?.replace("Bearer ", "")
  const income = req.body

  const validation = registerScheme.validate(income)
  if(validation.error)
    return res.status(422).send("Todos os campos devem ser preenchidos")

  try {
    const user = await db.collection("sessions").findOne({token})

    if(!user)
      return res.sendStatus(401)

    await db.collection("registers").insertOne({...income, userId: user.userId})
    res.sendStatus(201)
  } catch {
    res.sendStatus(500)
  }
}

export async function addExpense(req, res){
  const { authorization } = req.headers
  const token = authorization?.replace("Bearer ", "")
  const expense = req.body

  const validation = registerScheme.validate(expense)
  if(validation.error)
    return res.status(422).send("Todos os campos devem ser preenchidos")

  try {
    const user = await db.collection("sessions").findOne({token})

    if(!user)
      return res.sendStatus(401)

    await db.collection("registers").insertOne({...expense, userId: user.userId})
    res.sendStatus(201)
  } catch {
    res.sendStatus(500)
  }
}