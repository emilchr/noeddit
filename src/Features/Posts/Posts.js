import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchPosts, 
        loadAllPosts
         } from './postsSlice';


function Posts() {

  const dispatch = useDispatch();
  
  const isLoading = useSelector(state => state.posts.isLoading);
  const loadPosts = useSelector(loadAllPosts);
  const hasError = useSelector(state => state.posts.hasError)
    
    useEffect(() => {

      dispatch(fetchPosts())
            
    }, [dispatch])
    
    if (!isLoading && loadPosts[0]) {console.log(loadPosts)} 
    
    let content = '';

    if (isLoading) {
      content = <p>Loading...</p>;
    } else if (hasError){
      content = <p>An error has occurred</p>;
    } else {
      content = <p>Haha!</p>;
      
    }

  return (
    <div> 
      <h2>Posts</h2>
      <div>This is where the posts will go</div>
        { content }  
        

    </div>
  )
}

export default Posts