import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./src/config/db.config.js";
import chalk from "chalk";
import userRoute from "./src/modules/users/user.route.js";
import flightRoute from "./src/modules/flights/flight.route.js"

const app = express()
dotenv.config();
connectDb();
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use("/user", userRoute);
app.use("/flight", flightRoute)

app.listen(port || 3000, () => {
    console.log(chalk.blue(`app is live and running on port ${port}`))
})