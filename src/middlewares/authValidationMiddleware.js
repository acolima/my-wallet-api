import joi from "joi"

const loginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required()
})

export default function authValidationMiddleware(req, res, next){
  const user = {
    email: req.body.email,
    password: req.body.password
  }
  const validation = loginSchema.validate(user)
  if(validation.error)
    return res.status(422).send("Todos os campos devem ser preenchidos")
  
  res.locals.user = user
  next()
}
  