import { createClient } from "redis";
import chalk from "chalk";


export const redisClient = createClient({
    socket: { keepAlive: 10000000 },
    url: process.env.REDIS_URL,
    database: 0
});

redisClient.on('connect', () => {
    console.log(chalk.red("Redis connected successfully "));
});

redisClient.on('error', async () => {
    console.log(chalk.red("Sorry something went wrong with Redis"));
});
