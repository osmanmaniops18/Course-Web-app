import express from "express"
import { config } from "dotenv";
import course from "./routes/courseRouter.js"
import users from "./routes/userRouter.js"
import payment from "./routes/paymentRoutes.js"
import others from "./routes/otherRoutes.js"
import ErrorMiddleware from "./middleware/Error.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors"


config({
    path:"./config/config.env"
})

const app=express();
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]

}))

//Using Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.use(cookieParser())

app.use("/api/v1/", course)
app.use("/api/v1/",users)
app.use("/api/v1",payment)
app.use("/api/v1",others)


export default app;

app.use(ErrorMiddleware)