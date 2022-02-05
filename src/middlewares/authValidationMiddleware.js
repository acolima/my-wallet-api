import joi from "joi"
import { stripHtml } from "string-strip-html"

const loginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required()
})

export default function authValidationMiddleware(req, res, next){
  const user = {
    email: stripHtml(req.body.email).result.trim(),
    password: stripHtml(req.body.password).result.trim()
  }
  const validation = loginSchema.validate(user)
  if(validation.error)
    return res.status(422).send("Todos os campos devem ser preenchidos")
  
  res.locals.user = user
  next()
}
  