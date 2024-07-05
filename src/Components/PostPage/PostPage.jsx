import React, { useEffect } from 'react';
import './PostPage.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPosts, rehydratePosts } from '../../Features/Posts/postsSlice';
import { Post } from '../Post/Post';
import CommentList from '../CommentList/CommentList';
import { fetchComments } from '../../Features/Comments/commentsSlice';

export const PostPage = () => {
	const params = useParams();
	let { postId } = params;
	const dispatch = useDispatch();

	let loadPosts = useSelector(loadAllPosts);
	// Selects the post that has the same ID as postID
	if (loadPosts.length === 0) {
		dispatch(rehydratePosts());
	}
	let singlePost = null;
	let subreddit = null;
	let singlePostId = null;

	if (loadPosts.length !== 0) {
		singlePost = loadPosts.find((post) => post.data.id === postId);
		subreddit = singlePost ? singlePost.data.subreddit : null; // Selects the subreddit name
		singlePostId = singlePost ? singlePost.data.id : null; // Selecting post id
	}

	useEffect(() => {
		// Check if state.posts is empty. If empty, rehydrate with the state stored in localStorage.

		const postInfo = {
			// Merges to an object for the thunk parameter.
			subreddit,
			singlePostId,
		};
		dispatch(fetchComments(postInfo));
	}, [dispatch, singlePostId, subreddit]);

	return (
		<div className="postPage">
			<Post post={singlePost ? singlePost.data : ''} />
			<CommentList />
		</div>
	);
};
