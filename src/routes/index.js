import { Router } from "express"
import authRouter from "./authRouter.js"
import recordRouter from "./recordRouter.js"

const router = Router()

router.use(authRouter)
router.use(recordRouter)

export default router