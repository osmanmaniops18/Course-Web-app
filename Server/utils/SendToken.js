export const SendToken=(resp,user,message,statusCode=201)=>{

    const token=user.getJwtToken();

    const options={
        expires:new Date(Date.now()+ 15 * 24 * 60 * 60 * 1000),
        httpOnly:true,
        secure:true,
       sameSite:"none"
    }

    resp.status(statusCode).cookie("token",token,options).json({
        success:true,
        message,
        user,
      
    })
}