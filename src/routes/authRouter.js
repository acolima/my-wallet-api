import { Router } from "express"
import { signIn, signOut, signUp } from "../controllers/authController.js"

const authRouter = Router()

authRouter.post("/sign-up", signUp)

authRouter.post("/login", signIn)

authRouter.delete("/logout", signOut)

export default authRouter