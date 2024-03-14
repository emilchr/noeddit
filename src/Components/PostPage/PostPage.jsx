import React from 'react';
import './PostPage.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPosts, rehydratePosts } from '../../Features/Posts/postsSlice';
import { Post } from '../Post/Post';
import CommentList from '../CommentList/CommentList';
import { loadAllComments, rehydrateComments } from '../../Features/Comments/commentsSlice';

export const PostPage = () => {
	const params = useParams();
	let { postId } = params;
	postId = Number(postId); // Converts postId to a number

	let loadPosts = useSelector(loadAllPosts);
	let loadComments = useSelector(loadAllComments);

	const dispatch = useDispatch();

	// Check if state.posts is empty. If empty, rehydrate with the state stored in localStorage.
	if (loadPosts.length === 0) {
			dispatch(rehydratePosts());
			}
	// Check if state.comments is empty. If empty, rehydrate with the state stored in localStorage.
	if (loadComments.length === 0) {
		dispatch(rehydrateComments());
		}

	const singlePost = loadPosts.find((post) => post.id === postId ); // Selects the post that has the same ID as postID
	// console.log('singlePost: ' + singlePost.id)
	
	return (
	<>
		<Post post={singlePost} />
		<CommentList />
	</>
	);
};
