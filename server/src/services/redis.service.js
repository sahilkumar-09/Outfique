import { Redis } from "@upstash/redis";
import configure from "../config/config.js";

const redis = new Redis({
  url: configure.UPSTASH_REDIS_REST_URL,
  token: configure.UPSTASH_REDIS_REST_TOKEN
});

try {
  await redis.set("test", "Redis connection successful!");
  console.log("Redis connection successful!");
} catch (error) {
  console.log("Redis connection error: ", error);
}

export default redis;
