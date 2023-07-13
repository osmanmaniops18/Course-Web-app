import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import crypto from "crypto"


const userScheme=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter your Name"]
    },
    email:{
        type:String,
        required:[true,"Please Enter your Email"],
        unique:true,
        validate:{validator:validator.isEmail,
            message:"Invalid Email",
            isAsync:false
        }
    },
    password:{
        type:String,
        required:[true,"Please Enter your Password"],
        minLength:[6,"Password must be at least 6 characters"],
        select:false
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    subscrption:{
        id:String,
        status:String,
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    playlist:[
        {
            courseId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Course"
            },
            poster:String
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now,
    },
    resetPasswordToken:String,
    resetPasswordExpire:String,

});

userScheme.pre("save", async function(next){
    if(!this.isModified("password")) return next();


    this.password=await bcrypt.hash(this.password,10)
    next();

})


userScheme.methods.getJwtToken= function(){
  
    return jwt.sign({_id:this._id},process.env.JWT_SECRETKEY,{
        expiresIn:"15d"
    })
}


userScheme.methods.comparePassword= async function(password){
   
    return bcrypt.compare(password,this.password)
    
}

userScheme.methods.resetPassword=function(){

    const resetToken=crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire=Date.now() + 15 * 60 * 1000;
    return resetToken;

}

export const User=mongoose.model("User",userScheme)