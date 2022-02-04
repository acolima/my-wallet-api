import { Router } from "express"
import { addRegister, getRegisters } from "../controllers/registerController.js"

const registerRouter = Router()

registerRouter.post("/add-register", addRegister)

registerRouter.get("/registers", getRegisters)

export default registerRouter