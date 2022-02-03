import express, { json } from "express"
import cors from "cors"
import { signIn, signUp } from "./controllers/authController.js"

const server = express()
server.use(cors())
server.use(json())

/* Authentication routes */
server.post("/sign-up", signUp)

server.post("/login", signIn)

server.listen(5000, () => console.log("Listening on port 5000"))