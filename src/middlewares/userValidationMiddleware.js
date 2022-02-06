import joi from "joi"
import { stripHtml } from "string-strip-html"

const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required().min(6)
})

export default function userValidationMiddleware(req, res, next){
  const user = {
    name: stripHtml(req.body.name).result.trim(),
    email: stripHtml(req.body.email).result.trim(),
    password: stripHtml(req.body.password).result.trim(),
  }
  
  const validation = userSchema.validate(user)
  if(validation.error)
    return res.status(422).send("Todos os campos devem ser preenchidos")
  
  res.locals.user = user

  next()
}