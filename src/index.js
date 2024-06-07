//This file is crucial as it initializes the environment, establishes a database connection, and starts the server, making it the main entry point of the backend application.



//require('dotenv').config({path: './env'})


// Load environment variables from a .env file into process.env
//This line imports the dotenv package, which is used to load environment variables from a .env file into process.env.
import dotenv from "dotenv";



// Import the function to connect to the database
import connectDB from "./db/index.js";


// Import the Express app
import { app } from './app.js';



// Configure dotenv to load environment variables from the specified path
dotenv.config({
    path: './.env'
});



// Connect to the database
connectDB()
    .then(() => {
        // If the database connection is successful, start the server
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port : ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        // If there is an error connecting to the database, log the error
        console.log("MONGODB connection FAILED", error);
    });




/*

>>>>>>>>>>>>  Traditional Way   >>>>>>>>>>>>>

import express from "express"
const app = express()

(
    async () => {
         try {
            await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
            app.on("error", (error) => {
                console.log("Error: ",error)
                throw error
            })

            app.listen(process.env.PORT, () => {
                console.log(`App is listening on port ${process.env.PORT}`)
            } )

         } catch (error) {
             console.error("Error: ",error)
             throw error
         }
    }
)()
*/