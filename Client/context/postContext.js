import React,{ useEffect,useState ,createContext} from "react";
import axios from 'axios'
// import {createContext} from 'react';

//context
const PostContext=createContext()

const PostProvider=({children})=>{
//state
const [loading,setLoading]=useState(false)
const [posts,setPosts]=useState([])


const getAllPosts=async()=>{
    setLoading(true)
    try {
        const {data}=await axios.get('/post/get-all-post')
        setLoading(false)
        setPosts(data?.posts)

    } catch (error) {
        console.log(error)
        setLoading(false)

        
    }
}

//intial Psts
useEffect(()=>{
    getAllPosts()
},[])

return(
    //[posts,setPosts,getAllPosts] before
    <PostContext.Provider value={{posts,setPosts,getAllPosts}}>
        {children}
    </PostContext.Provider>
)
}

export {PostContext,PostProvider}