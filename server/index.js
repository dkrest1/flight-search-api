import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from 'swagger-jsdoc';
import connectDb from "./src/config/db.config.js";
import chalk from "chalk";
import userRoute from "./src/modules/users/user.route.js";
import flightRoute from "./src/modules/flights/flight.route.js";
import { client } from "./src/config/redis.config.js"



const app = express()
dotenv.config();
connectDb();
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())



app.use("/user", userRoute);
app.use("/flight", flightRoute)

//swagger explorer ui option
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Flight Search API with OpenAPI",
            version: "1.0.0",
            description:
                "This is a simple Flight search API interated with Amadeus flight API where users can search for flight, filter, sort and order flight search results based on the parameters supplied.",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./src/modules/**/*.route.js"],
};

const specs = swaggerJSDoc(options);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);




app.listen(port || 3000, () => {
    console.log(chalk.blue(`app is live and running on port ${port}`))
})



// const enableCORS = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, X-Access-Token');
//     if ('OPTIONS' == req.method) {
//         return res.sendStatus(200);
//     }
//     next();
// };
// app.use(enableCORS);
// app.use(helmet());
