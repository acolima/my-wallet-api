import { Router } from "express"
import { signIn, signOut, signUp } from "../controllers/authController.js"
import { authValidationMiddleware, tokenValidationMiddleware, userValidationMiddleware } from "../middlewares/index.js"

const authRouter = Router()

authRouter.post("/sign-up", userValidationMiddleware, signUp)

authRouter.post("/login", authValidationMiddleware, signIn)

authRouter.delete("/logout", tokenValidationMiddleware, signOut)

export default authRouter