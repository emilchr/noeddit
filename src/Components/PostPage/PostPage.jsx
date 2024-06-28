import React, { useEffect } from 'react';
import './PostPage.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	loadAllPosts,
	loadNextPosts,
	rehydrateCurrentPage,
	rehydrateNextPage,
	rehydrateNextPosts,
	rehydratePayloadEmpty,
	rehydratePosts,
} from '../../Features/Posts/postsSlice';
import { Post } from '../Post/Post';
import CommentList from '../CommentList/CommentList';
import { fetchComments } from '../../Features/Comments/commentsSlice';

export const PostPage = () => {
	const params = useParams();
	let { postId } = params;
	const dispatch = useDispatch();

	let loadPosts = useSelector(loadAllPosts);
	let nextPosts = useSelector(loadNextPosts);
	// Selects the post that has the same ID as postID
	const singlePost = loadPosts.find((post) => post.data.id === postId);
	const nextPagePost = nextPosts.find((post) => post.data.id === postId);
	const subreddit = singlePost.data.subreddit; // Selects the subreddit name
	const singlePostId = singlePost.data.id // Selecting post id
	const postInfo = { // Merges to an object for the thunk parameter.
		subreddit,
		singlePostId
	} 
	
	
	useEffect(() => {
		dispatch(fetchComments(postInfo));
	}, [dispatch, singlePostId]);

	// Check if state.posts is empty. If empty, rehydrate with the state stored in localStorage.
	if (loadPosts.length === 0) {
		dispatch(rehydratePosts());
		dispatch(rehydrateNextPosts());
		dispatch(rehydrateCurrentPage());
		dispatch(rehydrateNextPage());
		dispatch(rehydratePayloadEmpty());
	}
	
	
	return (
		<div className="postPage">
			<Post post={singlePost.data || nextPagePost.data} />
			<CommentList />
		</div>
	);
};
