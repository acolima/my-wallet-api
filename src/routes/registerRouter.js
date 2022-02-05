import { Router } from "express"
import { addRegister, deleteRegister, getRegisters } from "../controllers/registerController.js"
import { tokenValidationMiddleware, registerValidationMiddleware } from "../middlewares/index.js"

const registerRouter = Router()

registerRouter.use(tokenValidationMiddleware)

registerRouter.post("/add-register", registerValidationMiddleware, addRegister)

registerRouter.get("/registers", getRegisters)

registerRouter.delete("/registers/:id", deleteRegister)

export default registerRouter