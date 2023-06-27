import { createClient } from 'redis';
import chalk from "chalk";

const redisClient = createClient();

redisClient.on("error", (err) => console.log("Redis client on error", err));

const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log(chalk.red("Redis connected successfully"));
    } catch (err) {
        console.log(err);
        process.exit(0);
    }
}

export { connectRedis, redisClient }