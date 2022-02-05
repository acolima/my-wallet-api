import dayjs from "dayjs"
import joi from "joi"
import { stripHtml } from "string-strip-html"

const registerScheme = joi.object({
  amount: joi.string().required(),
  description: joi.string().required(),
  type: joi.string().valid('income', 'expense').required(),
  date: joi.string()
})

export default function registerValidationMiddleware(req, res, next){
  const register = {
    amount: stripHtml(req.body.amount).result.trim(),
    description: stripHtml(req.body.description).result.trim(),
    type: req.body.type,
    date: dayjs().format("DD/MM")
  }
  
  const validation = registerScheme.validate(register)
  if(validation.error)
    return res.status(422).send("Todos os campos devem ser preenchidos")
  
  res.locals.register = register

  next()
}