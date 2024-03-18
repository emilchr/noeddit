import React from 'react';
import './PostPage.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPosts, postError, postLoading, rehydratePosts } from '../../Features/Posts/postsSlice';
import { Post } from '../Post/Post';
import CommentList from '../CommentList/CommentList';
import { loadAllComments, rehydrateComments } from '../../Features/Comments/commentsSlice';

export const PostPage = () => {
	const params = useParams();
	let { postId } = params;
	postId = Number(postId); // Converts postId to a number

	let loadPosts = useSelector(loadAllPosts);
	let loadComments = useSelector(loadAllComments);
	const isLoading = useSelector(postLoading);
	const hasError = useSelector(postError);

	const dispatch = useDispatch();

	// Check if state.posts is empty. If empty, rehydrate with the state stored in localStorage.
	if (loadPosts.length === 0) {
			dispatch(rehydratePosts());
			}
	// Check if state.comments is empty. If empty, rehydrate with the state stored in localStorage.
	if (loadComments.length === 0) {
		dispatch(rehydrateComments());
		}

		// console.log('singlePost: ' + singlePost.id)
		

		const singlePost = loadPosts.find((post) => post.id === postId ); // Selects the post that has the same ID as postID
		
		return (
	<div className='postPage'>
		<Post post={singlePost} />
		<CommentList />
	</div>
	);
};
