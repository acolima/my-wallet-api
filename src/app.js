import express, { json } from "express"
import cors from "cors"
import router from "./routes/index.js"

const server = express()

// server.use(cors())

server.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,
  })
);
server.use(json())

server.use(router)

server.listen(process.env.PORT, () => console.log("Listening"))