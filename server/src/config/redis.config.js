import { createClient } from "redis";
import chalk from "chalk";

export const redisClient = createClient();

redisClient.on('connect', () => {
    console.log(chalk.red("Redis connected successfully "));
});

redisClient.on('error', async () => {
    console.log(chalk.red("Sorry something went wrong with Redis"));
});
