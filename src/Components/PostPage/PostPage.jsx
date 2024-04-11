import React, { useEffect } from 'react';
import './PostPage.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPosts, loadNextPosts, rehydrateCurrentPage, rehydrateNextPage, rehydrateNextPosts, rehydratePosts } from '../../Features/Posts/postsSlice';
import { Post } from '../Post/Post';
import CommentList from '../CommentList/CommentList';
import { fetchComments } from '../../Features/Comments/commentsSlice';

export const PostPage = () => {
	const params = useParams();
	let { postId } = params;
	postId = Number(postId); // Converts postId to a number

	let loadPosts = useSelector(loadAllPosts);
	let nextPosts = useSelector(loadNextPosts);

	const dispatch = useDispatch();
	useEffect(() => {
	
		dispatch(fetchComments(postId));
	
	}, [dispatch, postId])
	
	// Check if state.posts is empty. If empty, rehydrate with the state stored in localStorage.
	if (loadPosts.length === 0) {
			dispatch(rehydratePosts());
			dispatch(rehydrateNextPosts());
			dispatch(rehydrateCurrentPage());
			dispatch(rehydrateNextPage());
			}	

		// console.log('singlePost: ' + singlePost.id)
		
		// Selects the post that has the same ID as postID
		const singlePost = loadPosts.find((post) => post.id === postId ); 
		const nextPagePost = nextPosts.find((post) => post.id === postId );

		
		return (
	<div className='postPage'>
		<Post post={singlePost || nextPagePost} />
		<CommentList />
	</div>
	);
};
