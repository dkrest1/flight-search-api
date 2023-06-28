import { createClient } from 'redis';

export const client = createClient(process.env.PORT, process.env.HOST);
client.on('error', (err) => console.log('Redis Client Error', err));
await client.connect()

