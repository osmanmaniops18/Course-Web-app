import Razorpay from "razorpay";
import app from "./app.js";
import { connectDb } from "./config/database.js";
import cloudinary from "cloudinary";
import nodeCron from "node-cron"
import { Stats } from "./models/Stats.js";


cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
})

export const instance= new Razorpay({
        key_id:process.env.RAZOR_API_KEY,
        key_secret:process.env.RAZOR_API_SECRET
    })

    nodeCron.schedule("0 0 0 1 * *",async()=>{
        try {
            await Stats.create({});

            
        } catch (error) {
            console.log(error)
        }
    })

 


connectDb();
app.listen(process.env.PORT,()=>{
    console.log(`Server is runing at port ${process.env.PORT}`)
})