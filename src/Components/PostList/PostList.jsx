import React, { useEffect } from 'react';
import { Post } from '../Post/Post';
import './PostList.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	loadAllPosts, fetchPhotos, fetchPosts, postLoading, postError } from '../../Features/Posts/postsSlice';

import { useDispatch } from 'react-redux';
import { fetchComments } from '../../Features/Comments/commentsSlice';

export const PostList = () => {  
  
  const dispatch = useDispatch();

	useEffect(() => {
		// dispatch(fetchPhotos());
		dispatch(fetchPosts());
		dispatch(fetchComments());
  }, [dispatch]);
	
  const loadPosts = useSelector(loadAllPosts);
  const isLoading = useSelector(postLoading);
  const hasError = useSelector(postError);

    if (isLoading){
        
      return (
        <div>
          <p>Loading...</p>
        </div>
        )

    } else if (hasError){

        return (
          <div>
            <p>An error has occurred.</p>
          </div>
          )

    } else {

    const listPosts = loadPosts.map((post, index) => {
      

      const linkToPost = "posts/" + post.id;

      return (
      <Link to={linkToPost} key={post.id} >
        <Post post={loadPosts[index]} />
      </Link>
      )
    }).splice(0, 10); // Max posts at 10 XXXXXXXXXXXXXXXXXXXXX

    return (
      <div className='postList'>
      {listPosts}      
      </div>
    )
  };
}
