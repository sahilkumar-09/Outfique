import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
import configure from "./config.js";

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(`${configure.MONGO_URI}/${DB_NAME}`)
        console.log(`Mongodb is connected successfully:- ${conn.connection.host}/${conn.connection.name}`)
    } catch (error) {
        console.error(`Error while connecting to database:- ${error}`)
        process.exit(1)
    }
}

export default connectDb