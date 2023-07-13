import mongoose from "mongoose";

const dashboardScheme=new mongoose.Schema({
    users:{
      type:Number,
      default:0
    },
    subscrptions:{
        type:Number,
        default:0
      },
      views:{
        type:Number,
        default:0
      },
  

    createdAt:{
        type:Date,
        default:Date.now,
    }

});


export const Stats=mongoose.model("Stats",dashboardScheme)