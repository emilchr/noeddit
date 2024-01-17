import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchPostById, 
        fetchPosts,
         } from './postsSlice';


function Posts() {

    const dispatch = useDispatch();
    const allPosts = useSelector(fetchPosts);
    
    

    useEffect(() => {
      dispatch(fetchPostById())
    
      return () => {
        console.log("useEffect is done.")
      }
    }, [dispatch])
    
  
    

  return (
    <div> 
      <h2>Posts</h2>
      <div>This is where the posts will go</div>
        {}
    </div>
  )
}

export default Posts