import React from 'react';
import { Post } from '../Post/Post';
import './PostList.css';
import { useSelector } from 'react-redux';
import { loadAllPosts, loadAllPhotos } from '../../Features/Posts/postsSlice';


export const PostList = () => {
  
  const loadPhotos = useSelector(loadAllPhotos);
  
  const loadPosts = useSelector(loadAllPosts);
  const listPosts = loadPosts.map((post) => {

    const photos = loadPhotos.map((photo) => {
      // loads all photos into the variable photos and returns a img and title.
      return <img key={photo.id} src={photo.thumbnailUrl} alt={photo.title}></img>;
    });

    return(
    <Post 
        pId={post.id} 
        title={post.title}
        body={post.body}
        photo={photos[1]}
        userId={post.userId}
        key={post.id}
      />
    )
  }); 

  return (
    <>
    {listPosts}      
    </>
  )
}
