import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchPosts,
        fetchPhotos,
        loadAllPosts
         } from './postsSlice';


function Posts() {

  const dispatch = useDispatch();
  
  const isLoading = useSelector(state => state.posts.isLoading);
  const loadPosts = useSelector(loadAllPosts);
  const hasError = useSelector(state => state.posts.hasError)
    
    useEffect(() => {

      dispatch(fetchPosts())
      dispatch(fetchPhotos())
            
    }, [dispatch])
    
    if (!isLoading && loadPosts[0]) {console.log(loadPosts)} 
    
    let content = '';

    if (isLoading) {
      content = <p>Loading...</p>;
    } else if (hasError){
      content = <p>An error has occurred</p>;
    } else {
      content = loadPosts.map(post => (
      <div className="post" id={post.id} key={post.id}>
         <h2>{post.title}</h2>
         <p>{post.body}</p>
         <></>
         <p>Posted by userID: {post.userId}</p>
      </div>
      ));

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