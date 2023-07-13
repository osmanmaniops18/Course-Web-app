
import { serverUrl } from "../store";
import axios from "axios";



export const getAllCourses=(category="",keyword="")=> async dispatch=>{
    try {

        dispatch({type:"allCoursesRequest"});
        const {data}=await axios.get(`${serverUrl}/courses?keyword=${keyword}&category=${category}`
        );
        
        dispatch({type:"allCoursesSuccess",payload:data.courses
    });
        
    } catch (error) {
        dispatch({type:"allCoursesFail",payload:error.response.data.message});
    }
}

export const addToPlaylist=(id)=> async dispatch=>{
    try {

        dispatch({type:"addToPlaylistRequest"});
        const {data}=await axios.post(`${serverUrl}/addtoplaylist`,{
           id
        }  ,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        }
        );
        
        dispatch({type:"addToPlaylistSuccess",payload:data.message
    });
        
    } catch (error) {
        dispatch({type:"addToPlaylistFail",payload:error.response.data.message});
    }
}


export const removeFromPlaylist=(id)=> async dispatch=>{
    try {

        dispatch({type:"removeToPlaylistRequest"});
        const {data}=await axios.delete(`${serverUrl}/removefromplaylist?id=${id}` ,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        }
        );
        
        dispatch({type:"removeToPlaylistSuccess",payload:data.message
    });
        
    } catch (error) {
        dispatch({type:"removeToPlaylistFail",payload:error.response.data.message});
    }
}