import express, { json } from "express"
import cors from "cors"
import signOut, { signIn, signUp } from "./controllers/authController.js"
import { addRegister, getRegisters } from "./controllers/registerController.js"

const server = express()
server.use(cors())
server.use(json())

server.post("/sign-up", signUp)

server.post("/login", signIn)

server.delete("/logout", signOut)

server.post("/add-register", addRegister)

server.get("/registers", getRegisters)

server.listen(5000, () => console.log("Listening on port 5000"))