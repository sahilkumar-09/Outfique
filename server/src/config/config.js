import { config } from "dotenv";

config()

if (!process.env.MONGO_URI) {
  throw new Error("Mongodb uri is not defined in environment variable");
}

if(!process.env.PORT){
    throw new Error("Port is not defined in environment variable")
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT secret is not defined in environment variable")
}

if (!process.env.JWT_EXPIRE) {
  throw new Error("JWT expire is not defined in environment variable")
}

if(!process.env.GOOGLE_CLIENT_ID){
  throw new Error("Google client id is not defined in environment variable")
}

if(!process.env.GOOGLE_CLIENT_SECRET){
  throw new Error("Google client secret is not defined in environment variable")
}

const configure = {
  PORT: process.env.PORT || 8000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};

export default configure