import { config } from "dotenv";

config()

if (!process.env.MONGO_URI) {
  throw new Error("Mongodb uri is not defined in environment variable");
}

if(!process.env.PORT){
    throw new Error("Port is not defined in environment variable")
}

if (!process.env.ACCESS_TOKEN_SECRET) {
  throw new Error("ACCESS_TOKEN_SECRET is not defined in environment variable");
}

if (!process.env.ACCESS_TOKEN_EXPIRES_IN) {
  throw new Error(
    "ACCESS_TOKEN_EXPIRES_IN is not defined in environment variable",
  );
}

if (!process.env.REFRESH_TOKEN_SECRET) {
  throw new Error(
    "REFRESH_TOKEN_SECRET is not defined in environment variable",
  );
}

if (!process.env.REFRESH_TOKEN_EXPIRES_IN) {
  throw new Error(
    "REFRESH_TOKEN_EXPIRES_IN is not defined in environment variable",
  );
}

if (!process.env.GOOGLE_USER) {
  throw new Error("Google user is not defined in environment variable");
}

if(!process.env.GOOGLE_CLIENT_ID){
  throw new Error("Google client id is not defined in environment variable")
}

if(!process.env.GOOGLE_CLIENT_SECRET){
  throw new Error("Google client secret is not defined in environment variable")
} 

if(!process.env.IMAGEKIT_PUBLIC_KEY){
  throw new Error("Imagekit public key is not defined in environment variable")
}

if(!process.env.IMAGEKIT_PRIVATE_KEY){
  throw new Error("Imagekit private key is not defined in environment variable")
}

if(!process.env.IMAGEKIT_URL_ENDPOINT){
  throw new Error("Imagekit url endpoint is not defined in environment variable")
}

if (!process.env.RAZORPAY_KEY_ID) {
  throw new Error(  "Razorpay key id is not defined in environment variable")
}

if (!process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("Razorpay secret id is not defined in environment variable");
}

if (!process.env.UPSTASH_REDIS_REST_URL) {
  throw new Error(
    "UPSTASH_REDIS_REST_URL is not defined in environment variable",
  );
}

if (!process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error(
    "UPSTASH_REDIS_REST_TOKEN is not defined in environment variable",
  );
}

if (!process.env.RESET_PASSWORD_TOKEN) {
  throw new Error("Reset password token is not defined in environment variable")
}

if (!process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN) {
  throw new Error("RESET_PASSWORD_TOKEN_EXPIRES_IN is not defined in environment variable")
}

const configure = {
  PORT: process.env.PORT || 8000,
  MONGO_URI: process.env.MONGO_URI,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
  RESET_PASSWORD_TOKEN: process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN,
  RESET_PASSWORD_TOKEN_EXPIRES_IN: process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
  GOOGLE_USER: process.env.GOOGLE_USER,
  NODE_ENV: process.env.NODE_ENV || "development",
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
  IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
  IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT,
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
};

export default configure