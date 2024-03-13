import React from 'react';
import { Post } from '../Post/Post';
import './PostList.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	loadAllPosts,
} from '../../Features/Posts/postsSlice';

export const PostList = () => {  
  
  const loadPosts = useSelector(loadAllPosts)

  
  const listPosts = loadPosts.map((post, index) => {
    
    // const photos = props.photos.map((photo) => {
    //   // loads all photos into the variable photos and returns a img and title.
    //   return <img key={photo.id} src={photo.thumbnailUrl} alt={photo.title}></img>;
    // });
    const linkToPost = "posts/" + post.id;

    return(
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
}
