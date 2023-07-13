import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { User } from "../models/User.js";
import { Course } from "../models/Course.js";
import { SendToken } from "../utils/SendToken.js";
import ErrorHandler from "../utils/errorHandler.js";
import { SendEmail } from "../utils/sendEmail.js";
import crypto from "crypto"
import dataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary"
import { Stats } from "../models/Stats.js";




export const registerUser=catchAsyncError(async(req,resp,next)=>{

    const {name,email,password}=req.body;
    
    if(!name || !email || !password) return next(new ErrorHandler("Please Fill All fields",400));

    let user=await User.findOne({email});
    if(user) return next(new ErrorHandler("User Already Exixt",409));
    const file=req.file;
    if(!file) return next(new ErrorHandler("Please Upload Poster",400))
    const fileUri= dataUri(file);
    const myCloud=await cloudinary.v2.uploader.upload(fileUri.content)
    user=await User.create({
        name,email,password,avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
    });

    SendToken(resp,user,"Register Succussfully",201);




})


export const login=catchAsyncError(async(req,resp,next)=>{

    const {email,password}=req.body;

    if( !email || !password) return next(new ErrorHandler("Please Fill All fields",400));

    const user=await User.findOne({email}).select("+password");
    if(!user) return next(new ErrorHandler("Incorrect Email or Password",401));


    const isMatch=await user.comparePassword(password);

    if(!isMatch) return next(new ErrorHandler("Incorrect Email or Password",401));


    

    SendToken(resp,user,`Welcome back, ${user.name}`,200);




})


export const logout=catchAsyncError( async(req,resp,next)=>{

    resp.status(200).cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
        secure:true,
        sameSite:"none"
        
    }).json({
        success:true,
        message:"Logout Successfully"
    })

})


export const getMyProfile=catchAsyncError( async(req,resp,next)=>{


    const user=await User.findById(req.user._id);

    resp.status(200).json({
        success:true,
       user
    })

})

export const changepassword=catchAsyncError( async(req,resp,next)=>{

   const {oldPassword,newPassword}=req.body;

 if( !oldPassword || !newPassword) return next(new ErrorHandler("Please Fill All fields",400));
   const user=await User.findById(req.user._id).select("+password");

   const isMatch=await user.comparePassword(oldPassword);

   if(!isMatch) return next(new ErrorHandler("Incorrect Old Password",401));

   user.password=newPassword;

   await user.save();
 
 

    resp.status(200).json({
        success:true,
        message:"Password Updated Successfully"
    })

})


export const updateProfile=catchAsyncError( async(req,resp,next)=>{

    const {name,email}=req.body;
 

    const user=await User.findById(req.user._id);
 
   
 
    user.name=name;
    user.email=email;
    await user.save();
 
    await user.save();
  
  
 
     resp.status(200).json({
         success:true,
         message:"Profile Updated Successfully",
         
     })
 
 })


 export const updateProfilePic=catchAsyncError( async(req,resp,next)=>{
      
    const user=await User.findById(req.user._id);
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    const file=req.file;
    if(!file) return next(new ErrorHandler("Please Upload Poster",400))
    const fileUri= dataUri(file);
    const myCloud=await cloudinary.v2.uploader.upload(fileUri.content);
   

    user.avatar={
        public_id:myCloud.public_id,
        url:myCloud.secure_url
    }

    await user.save();
    resp.status(200).json({
        success:true,
        message:"Profile Picture Updated Successfully"
    })

})

export const forgetPassword=catchAsyncError( async(req,resp,next)=>{


    const {email}=req.body;
    if(!email) return next(new ErrorHandler("Please Provide Email",409))
    const user=await User.findOne({email});
    if(!user) return next(new ErrorHandler("User Not Found",400));

    const resetToken=await user.resetPassword();
    //save fuction to save the reset password token in mongodb
    await user.save();
    const url=`${process.env.FRONTEND_URL}/resetpassword/${resetToken}`
   const message=`Click on the link to reset Password. ${url}.If you have not requested then please ignore it`;
   

   await SendEmail(user.email,"CourseBundler Reset Password",message)
    resp.status(200).json({
        success:true,
        message:`Reset Password Token Send to ${user.email}`
    })

})

export const resetPassword=catchAsyncError( async(req,resp,next)=>{
  
    const {token}=req.params;

    const resetPasswordToken=crypto.createHash("sha256").update(token).digest("hex");

    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{
            $gt:Date.now()
        }
    })
    if(!user) return next( new ErrorHandler("Token is invalid or has been Expired",401))
    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save();
    resp.status(200).json({
        success:true,
        message:"Password Reset Successfully",
      
    })

})


export const addToPlayList=catchAsyncError( async(req,resp,next)=>{


    const user=await User.findById(req.user._id);
<<<<<<< HEAD
    const course=await Course.findById(req.body.id);
=======
    const course=await Course.findById(req.body._id);
>>>>>>> 30056cbaf66c72095fe31022d0c6598f27b3d52f
    if(!course) return next(new ErrorHandler("Invalid Course ID",404))
  

    const isExist=user.playlist.find((items)=>{
        if(items.courseId.toString()===course._id.toString()) return true
    })

    if(isExist) return next(new ErrorHandler("Course Already Exist",409))
    user.playlist.push({
        courseId:course._id,
        poster:course.poster.url
    })
    await user.save();

    resp.status(200).json({
        success:true,
        message:"Added To Playlist"
    })

})


export const removeFromPlayList=catchAsyncError( async(req,resp,next)=>{

    
    const user=await User.findById(req.user._id);
    const course=await Course.findById(req.query.id);
    if(!course) return next(new ErrorHandler("Invalid Course ID",404))

    const newPlayList=user.playlist.filter((item)=>{
        if(item.courseId.toString() !==course._id.toString()) return item
    })

    user.playlist=newPlayList
    await user.save();
  

  

    
 

    resp.status(200).json({
        success:true,
        message:"Removed From playlist"
    })

})
//Admin Controllers
export const getAllUsers=catchAsyncError( async(req,resp,next)=>{


    
    const users=await User.find({});
   
     
    resp.status(200).json({
        success:true,
        users
    })

})


export const updateUserRole=catchAsyncError( async(req,resp,next)=>{


    
    const user=await User.findById(req.params.id);
   
      if(user.role==="user") user.role="admin"
      else user.role="user"
       await user.save();
    resp.status(200).json({
        success:true,
        message:`Role Updated successfully to ${user.role}` 
    })

})


export const deleteUser=catchAsyncError( async(req,resp,next)=>{


    
    const user=await User.findById(req.params.id);

    await cloudinary.v2.uploader.destroy(user.avatar.public_id)
   
     
       await user.deleteOne();
    resp.status(200).json({
        success:true,
        message:"User Deleted Successfully" 
    })

})

export const deleteMyProfile=catchAsyncError( async(req,resp,next)=>{


    
    const user=await User.findById(req.user._id);

    await cloudinary.v2.uploader.destroy(user.avatar.public_id)
   
     
       await user.deleteOne();
    resp.status(200).cookie("token",null,{
        expires: new Date(Date.now())
    }).json({
        success:true,
        message:"User Deleted Successfully" 
    })

})


User.watch().on("change",async()=>{
    const stats=await Stats.find({}).sort("desc").limit(1)
    const subscrption=await User.find({"subscrption.status":"active"})
    stats[0].users=await User.countDocuments();
    stats[0].subscrptions=subscrption.length;
    stats[0].createdAt=new Date(Date.now())
    await stats[0].save();
})