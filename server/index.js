import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from 'swagger-jsdoc';
import connectDb from "./src/config/db.config.js";
import chalk from "chalk";
import userRoute from "./src/modules/users/user.route.js";
import flightRoute from "./src/modules/flights/flight.route.js";
import { redisClient } from "./src/config/redis.config.js"
import axios from "axios";



const app = express()
dotenv.config();
connectDb();
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
/////////////////////////////
const MOCK_API = "https://jsonplaceholder.typicode.com/users/";
app.get('/user/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const response = await axios.get(`${MOCK_API}?email=${email}`);
        const user = response.data
        console.log("User successfully retrieved from the API");
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send(err);
    }
})
//////////////////////////////////////////////////////////////
app.get('/cache/user/:email', async (req, res) => {
    const email = req.params.email;

    try {
        redisClient.get(email, async (err, response) => {
            console.log(response);
            if (response) {
                console.log("User successfully retrieved from cache");
                res.status(200).send(JSON.parse(response));
            } else {
                const response = await axios.get(`${MOCK_API}?email=${email}`);
                const user = response.data;
                redisClient.set(email, 600, JSON.stringify(user));
                console.log("User successfully retrieved from the API");
                res.status(200).send(user);
            }
        })
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})
/////////////////////////////////////////////////////////////


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


app.listen(port || 3000, async () => {
    console.log(chalk.blue(`app is live and running on port ${port}`))
    await redisClient.connect();
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
