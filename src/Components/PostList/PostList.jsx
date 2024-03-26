import React, { useEffect } from 'react';
import { Post } from '../Post/Post';
import { useDispatch } from 'react-redux';
import { Link, ScrollRestoration } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loadAllPosts, fetchPosts, postLoading, postError, fetchPage, postNextPage, postCurrentPage, addPage, addCurrentPage } from '../../Features/Posts/postsSlice';
import './PostList.css';


export const PostList = () => {  
  
  const dispatch = useDispatch();

	useEffect(() => {
    
    dispatch(fetchPage())
		
  }, [dispatch]);
	
  const loadPosts = useSelector(loadAllPosts);
  const isLoading = useSelector(postLoading);
  const hasError = useSelector(postError);
  const nextPage = useSelector(postNextPage);
  const currentPage = useSelector(postCurrentPage);


  const handleNextPage = (e) => {
    e.preventDefault();

    dispatch(fetchPage(nextPage));
    dispatch(addPage());
    dispatch(addCurrentPage());
    
    console.log(currentPage);
    console.log(nextPage);

  };

    if (isLoading){
        
      return (
        <div>
          <Post />
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
    })

    return (
      <div className='postList'>
      {listPosts} 
      {/* Restores position to top */}
      <button onClick={handleNextPage}>Load more</button>  
      <ScrollRestoration />    
      </div>
    )
  };
}
