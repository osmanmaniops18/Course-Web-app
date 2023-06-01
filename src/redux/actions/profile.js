
import { serverUrl } from "../store";
import axios from "axios";



export const updateProfile=(name,email)=> async dispatch=>{
    try {
      dispatch({type:"updateProfileRequest"})
      const {data}=await axios.put(`${serverUrl}/updateprofile`,{
        name,email
      },{
        headers:{
            "Content-Type":"application/json"
        },
        withCredentials:true
      }
      );
      dispatch({type:"updateProfileSuccess",payload:data.message})
        
    } catch (error) {
        dispatch({type:"updateProfileError",payload:error.response.data.message})

        
    }
}
export const updateProfilePicture=(formdata)=> async dispatch=>{
    try {
      dispatch({type:"updateProfilePicRequest"})
      const {data}=await axios.put(`${serverUrl}/updateprofilepic`,
        formdata
      ,{
        headers:{
            "Content-Type":"multipart/form-data"
        },
        withCredentials:true
      }
      );
      dispatch({type:" updateProfilePicSuccess",payload:data.message})
        
    } catch (error) {
        dispatch({type:" updateProfilePicError",payload:error.response.data.message})

        
    }
}


export const changePassword=(oldPassword,newPassword)=> async dispatch=>{
    try {
      dispatch({type:"changePasswordRequest"})
      const {data}=await axios.put(`${serverUrl}/changepassword`,{
        oldPassword,newPassword
      },{
        headers:{
            "Content-Type":"application/json"
        },
        withCredentials:true
      }
      );
      dispatch({type:"changePasswordSuccess",payload:data.message})
        
    } catch (error) {
        dispatch({type:"changePasswordFail",payload:error.response.data.message})

        
    }
}

export const forgetPassword=(email)=> async dispatch=>{
    try {
      dispatch({type:"forgetPasswordRequest"})
      const {data}=await axios.post(`${serverUrl}/forgetpassword`,{
        email
      },{
        headers:{
            "Content-Type":"application/json"
        },
        withCredentials:true
      }
      );
      dispatch({type:"forgetPasswordSuccess",payload:data.message})
        
    } catch (error) {
        dispatch({type:"forgetPasswordFail",payload:error.response.data.message})

        
    }
}

export const resetPassword=(token,password)=> async dispatch=>{
  try {
    dispatch({type:"resetPasswordRequest"})
    const {data}=await axios.put(`${serverUrl}/resetpassword/${token}`,{
      password
    },{
      headers:{
          "Content-Type":"application/json"
      },
      withCredentials:true
    }
    );
    dispatch({type:"resetPasswordSuccess",payload:data.message})
      
  } catch (error) {
      dispatch({type:"resetPasswordFail",payload:error.response.data.message})

      
  }
}