import React from 'react';
import './PostPage.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loadAllPosts, loadAllPhotos } from '../../Features/Posts/postsSlice';
import { Post } from '../Post/Post';

export const PostPage = () => {
	const params = useParams();
	let { postId } = params;
	
	postId = Number(postId); // Converts postId to a number

	const loadPosts = useSelector(loadAllPosts)

	console.log("POSTPAGE: params.id " + postId)
	
	console.log(loadPosts)

	const singlePost = loadPosts.find((post) => post.id === postId ); // Selects the single post that has the same ID as postID

	console.log('POSTPAGE: SinglePost id ' + singlePost.id)
	
	return (
	<>
		<Post post={singlePost} />
	</>
	);
};
