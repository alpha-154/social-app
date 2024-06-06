import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

//here, by doing this app variable will be able to use all of the express properties
const app = express()


//setting up cross origin resource sharing (cors) option to connect backend with fronted
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true

}))

//configuring the app to handle json file requests upto 16kb
app.use(express.json({ limit: "16kb"}))
//configuring the app to handle url responses
app.use(express.urlencoded({ extended: true, limit: "16kb"}))
//configuring the app to handle storing pdf's, images, videos
app.use(express.static("public"))
//cookie-parser is used to access the cookies from the user's browser and run `CRUD` operations with these
app.use(cookieParser())

//routes import 
import userRouter from "./routes/user.routes.js"

//routes declaration
//here, we've written `app.use` (using middlewares) instead of using `app.get` since here routes and controllers are getting imported from different files
app.use("/api/v1/users", userRouter)

//http://localhost:8000/api/v1/users/register

export { app }