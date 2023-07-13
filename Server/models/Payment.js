import mongoose from "mongoose";

const paymentScheme=new mongoose.Schema({
    razorpay_signature:{
      type:String,
      required:true
    },
     razorpay_payment_id:{
        type:String,
        required:true
     },
      razorpay_subscrption_id:{
        type:String,
        required:true
      },


    createdAt:{
        type:Date,
        default:Date.now,
    }

});


export const Payment=mongoose.model("Payment",paymentScheme)