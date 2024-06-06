//This file is crucial for establishing a connection to the MongoDB database and handling any errors that occur during the connection process.


import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";



const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`/n MongoDB connected !! DB Host : ${connectionInstance.connection.host}`)
        
    } catch (error) {
        console.log("MONGODB connection FAILED ",error)
        process.exit(1)//This line exits the Node.js process with a failure code (1). This is useful for terminating the application if the database connection fails, preventing the app from running without a database connection.
    }
}

export default connectDB