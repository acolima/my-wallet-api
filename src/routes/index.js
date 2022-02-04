import { Router } from "express"
import authRouter from "./authRouter.js"
import registerRouter from "./registerRouter.js"

const router = Router()

router.use(authRouter)
router.use(registerRouter)

export default router