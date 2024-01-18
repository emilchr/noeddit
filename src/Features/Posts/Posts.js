import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchPosts, 
        loadAllPosts,
        isLoading,
        hasError
         } from './postsSlice';


function Posts() {

  const dispatch = useDispatch();
  
  const isLoading = useSelector(isLoading);
    
    console.log(isLoading)
    // console.log("Loading: " + useSelector(isLoading));
    // console.log(useSelector(loadAllPosts))
    
    useEffect(() => {

      dispatch(fetchPosts())
            
    }, [dispatch])
    
    
    

  return (
    <div> 
      <h2>Posts</h2>
      <div>This is where the posts will go</div>
        
    </div>
  )
}

export default Posts