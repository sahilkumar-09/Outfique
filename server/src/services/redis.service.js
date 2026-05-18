import Redis from "ioredis";
import configure from "../config/config.js";

const redis = new Redis({
  port: configure.REDIS_PORT,
  host: configure.REDIS_HOST,
  password: configure.REDIS_PASSWORD,
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (error) => {
  console.log("Redis error: ", error);
});

export default redis;
