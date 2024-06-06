//This file sets up the core configuration of the Express application, including middleware for handling different types of requests and routes for user operations.

//Imports the Express library, which is a web framework for Node.js used to build web applications and APIs.
import express from "express"


//Imports the CORS library, which is used to enable Cross-Origin Resource Sharing. This allows the backend to handle requests from different origins (domains).
import cors from "cors"


//Imports the `cookie-parser` library, which is used to parse cookies attached to client requests. This enables reading and manipulating cookies on the server.
import cookieParser from "cookie-parser"



//Creates an instance of the Express application. This `app` object will be used to configure the server and define routes.
const app = express()



//Sets up CORS middleware to allow the backend to accept requests from the frontend. The `origin` specifies which domain is allowed (read from environment variables). `The credentials`: true option allows the server to accept cookies and other credentials from the frontend.
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true

}))



//Configures the app to handle JSON payloads in requests. The `limit: "16kb"` option sets the maximum size of JSON payloads to `16KB `to prevent overly large requests.
app.use(express.json({ limit: "16kb"}))



//Configures the app to handle URL-encoded form data. The `extended: true` option allows for rich objects and arrays to be encoded into the URL-encoded format. The `limit: "16kb"` option sets the maximum size of URL-encoded payloads to 16KB.
app.use(express.urlencoded({ extended: true, limit: "16kb"}))



//Configures the app to serve static files from the `public` directory. This is useful for serving static assets like images, CSS files, and JavaScript files.
app.use(express.static("public"))



//Adds the `cookie-parser` middleware to the app. This middleware allows the app to parse and manipulate cookies in incoming requests.
app.use(cookieParser())



//Imports the user routes from the `user.routes.js` file. This file contains the route definitions and handlers for user-related operations.
import userRouter from "./routes/user.routes.js"



//routes declaration

//Declares a route for user-related operations. All routes defined in `userRouter` will be prefixed with `/api/v1/users`. This means that a route defined as /register in userRouter will be accessible at `/api/v1/users/register`.

//here, we've written `app.use` (using middlewares) instead of using `app.get` since here routes and controllers are getting imported from different files
app.use("/api/v1/users", userRouter)


//http://localhost:8000/api/v1/users/register

export { app }