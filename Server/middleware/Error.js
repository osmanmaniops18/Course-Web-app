
//it recive a message from error handler which store in err parameter which is called whenever the next() function is called


const ErrorMiddleware=(err,req,resp,next)=>{

  
    
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal Server Error";

    resp.status(err.statusCode).json({
        success:false,
        message:err.message,

    })
}

export default ErrorMiddleware;