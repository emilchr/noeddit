import React from 'react';
import './PostPage.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loadAllPosts } from '../../Features/Posts/postsSlice';
import { Post } from '../Post/Post';
import CommentList from '../CommentList/CommentList';

export const PostPage = () => {
	const params = useParams();
	let { postId } = params;
	postId = Number(postId); // Converts postId to a number
	let loadPosts = useSelector(loadAllPosts);

	// Check if state.posts is empty. If empty rehydrate with the state stored in localStorage.
	
		if (loadPosts.length === 0) {

			const persistedState = JSON.parse(localStorage.getItem('posts'))
					
					loadPosts = persistedState;
				}


	const singlePost = loadPosts.find((post) => post.id === postId ); // Selects the post that has the same ID as postID

	
	return (
	<>
		<Post post={singlePost} />
		<CommentList />
	</>
	);
};
