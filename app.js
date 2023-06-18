import express from "express";
import dotenv from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js"
import cookieParser from "cookie-parser"

//dotenv config 
dotenv.config({
    path:"./config/config.env"
})



const app = express();
app.use(express.json())
app.use(express.urlencoded({
    extended:true,
}))
app.use(cookieParser())

//Importing & using Routes
import course from "./route/courseRoutes.js"
import user from "./route/userRoutes.js"
import payment from "./route/paymentRoutes.js"
import other from "./route/otherRoutes.js"

app.use("/api/v1",course)
app.use("/api/v1",user)
app.use("/api/v1",payment)
app.use("/api/v1",other);

export default app;


app.use(ErrorMiddleware)