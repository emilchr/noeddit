import React, { useEffect } from 'react';
import './PostPage.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, loadAllPosts } from '../../Features/Posts/postsSlice';
import { Post } from '../Post/Post';
import CommentList from '../CommentList/CommentList';

export const PostPage = () => {
	const params = useParams();
	let { postId } = params;
	postId = Number(postId); // Converts postId to a number
	const loadPosts = useSelector(loadAllPosts)
	

	// TODO: Need to create a function that loads the current post and comments from api or localStorage
    
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);
	
    // console.log(loadComments)
	console.log("POSTPAGE: params.id " + postId)
	
	// console.log(loadPosts)

	const singlePost = loadPosts.find((post) => post.id === postId ); // Selects the post that has the same ID as postID

	console.log('POSTPAGE: SinglePost id ' + singlePost.id)
	
	return (
	<>
		<Post post={singlePost} />
		<CommentList />
	</>
	);
};
