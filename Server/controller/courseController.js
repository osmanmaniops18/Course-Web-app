import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Course } from "../models/Course.js";
import { Stats } from "../models/Stats.js";
import dataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js"
import cloudinary from "cloudinary"



export const getAllCourses= catchAsyncError(async (req,resp,next)=>{

    const keyword=req.query.keyword || ""
    const category=req.query.category || "";
   
    const courses=await Course.find({
        title:{
            $regex:keyword,
            $options:"i"
        },
        category:{
            $regex:category,
            $options:"i"
        }
    }).select("-lectures");

resp.status(200).json({
    success:true,
    courses
})


})

export const createCourses= catchAsyncError(async (req,resp,next)=>{
   
    const{
        title,descrption,category,createdBy
    }=req.body;
 
    
    if(!title || !descrption || !category || !createdBy) return next(new ErrorHandler("Please Fill all fields",400))

    const file=req.file;
     if(!file) return next(new ErrorHandler("Please Upload Poster",400))
    const fileUri= dataUri(file);
    const myCloud=await cloudinary.v2.uploader.upload(fileUri.content)

    await Course.create({
        title,descrption,category,createdBy,poster:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        },

    });

resp.status(201).json({
    success:true,
    message:"Course Created Successfully. You Can add lectures now"
})


})



export const getCourseLectures= catchAsyncError(async (req,resp,next)=>{
    const courses=await Course.findById(req.params.id);
    if(!courses) return next(new ErrorHandler("Course Not found",404))
    courses.views+=1;
    await courses.save()

resp.status(200).json({
    success:true,
    lectures:courses.lectures
})


})


export const addLectures= catchAsyncError(async (req,resp,next)=>{
    
    const courses=await Course.findById(req.params.id);
    if(!courses) return next(new ErrorHandler("Course Not found",404))
    const {title,descrption}=req.body;
    if( !title || !descrption) return next(new ErrorHandler("Please Fill All fields",400));
   

    const file=req.file;
     if(!file) return next(new ErrorHandler("Please Upload Video ",400))
    const fileUri= dataUri(file);
    const myCloud=await cloudinary.v2.uploader.upload(fileUri.content,{
        resource_type:"video"
    })
   
    courses.lectures.push({
        title,descrption,video:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
    })

    await courses.save();

    courses.numOfVideos=courses.lectures.length;

resp.status(200).json({
    success:true,
    message:"Lectures Addedd Successfully"
})


})


export const deleteCourses= catchAsyncError(async (req,resp,next)=>{
   
    const{
        id
    }=req.params;
    const course=await Course.findById(id);

    if(!course) return next(new ErrorHandler("Course Not Found",404))

    await cloudinary.v2.uploader.destroy(course.poster.public_id);

    for (let index = 0; index < course.lectures.length; index++) {
        const element = course.lectures[index];
        await cloudinary.v2.uploader.destroy(element.video.public_id,{
            resource_type:"video"
        })
        
    }

    await course.deleteOne();

resp.status(201).json({
    success:true,
    message:"Course Deleted Successfully"
})


})


export const deleteLecture= catchAsyncError(async (req,resp,next)=>{
   const {courseId,lectureId}=req.query;

   const course=await Course.findById(courseId);

   if(!course) return next(new ErrorHandler("Course Not Found",404))

   const lecture=course.lectures.find((item)=>{
    if(item._id.toString() ===lectureId.toString()) return item
   })

   await cloudinary.v2.uploader.destroy(lecture.video.public_id,{
    resource_type:"video"
})


   course.lectures=course.lectures.filter((item)=>{
    if(item._id.toString() !==lectureId.toString() ) return item
   })

   course.numOfVideos=course.lectures.length;
  await course.save();
resp.status(200).json({
    success:true,
    message:"Lecture Deleted Successfully"
})


})


Course.watch().on("change",async()=>{
    const stats=await Stats.find({}).sort("desc").limit(1)
    const course=await Course.find({})
     let totalViews=0
    for (let index = 0; index < course.length; index++) {
   totalViews+=course[index].views
        
    }
    stats[0].views=totalViews;
    stats[0].createdAt=new Date(Date.now());
    await stats[0].save();
    
})