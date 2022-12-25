import { createClient } from "redis";

export let redisClient: ReturnType<typeof createClient>;
export async function initRedis() {
  redisClient = createClient({});
  redisClient.on("error", (error) => console.error(`RedisError: ${error}`));
  await redisClient.connect();
}
