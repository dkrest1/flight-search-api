import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(cors())

app.listen(port || 3000, () => {
    console.log(`app is live and running on port ${port}`)
})