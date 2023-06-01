import mongoose from "mongoose";


export const connectDb=async()=>{
  try {
    const{connection}= await mongoose.connect(process.env.MONGO_URL)

    console.log(`MongoDb is Connected with ${connection.host}`)
    
  } catch (error) {
    console.log(`MOngoDb is not connected due to this error${error}`)
  }
}