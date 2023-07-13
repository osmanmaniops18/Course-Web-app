import { serverUrl } from "../store";
import axios from "axios";



export const register=(formdata)=> async dispatch=>{
    try {

        dispatch({type:"registerRequest"});
        const {data}=await axios.post(`${serverUrl}/register`,formdata,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        });
        
        dispatch({type:"registerSuccess",payload:data});
        
    } catch (error) {
        dispatch({type:"registerFail",payload:error.response.data.message});
    }
}

 export const login=(email,password)=> async dispatch=>{
    try {

        dispatch({type:"loginRequest"});
        const {data}=await axios.post(`${serverUrl}/login`,{email,password},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        
        dispatch({type:"loginSuccess",payload:data});
        
    } catch (error) {
        dispatch({type:"loginFail",payload:error.response.data.message});
    }
}

export const loadUser=()=> async dispatch=>{
    try {

        dispatch({type:"loadUserRequest"});
        const {data}=await axios.get(`${serverUrl}/me`,{
          
            withCredentials:true
        });
        
        dispatch({type:"loadUserSuccess",payload:data.user});
        
    } catch (error) {
        dispatch({type:"loadUserFail",payload:error.response.data.message});
    }
}

export const logOutUser=()=> async dispatch=>{
    try {

        dispatch({type:"logOutRequest"});
        const {data}=await axios.get(`${serverUrl}/logout`,{
          
            withCredentials:true
        });
        
        dispatch({type:"logOutSuccess",payload:data.message});
        
    } catch (error) {
        dispatch({type:"logOutFail",payload:error.response.data.message});
    }
}