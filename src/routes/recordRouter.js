import { Router } from "express"
import { addRecord, deleteRecord, getRecord, updateRecord } from "../controllers/recordController.js"
import { tokenValidationMiddleware, recordValidationMiddleware } from "../middlewares/index.js"

const recordRouter = Router()

recordRouter.use(tokenValidationMiddleware)

recordRouter.post("/records", recordValidationMiddleware, addRecord)

recordRouter.get("/records", getRecord)

recordRouter.delete("/records/:id", deleteRecord)

recordRouter.put("/records/:id", recordValidationMiddleware, updateRecord)

export default recordRouter