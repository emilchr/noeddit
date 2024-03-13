import React from 'react';
import { useSelector } from 'react-redux';
import {
	loadAllPosts,
} from './postsSlice';
import { PostList } from '../../Components/PostList/PostList';

function Posts() {
	

	const isLoading = useSelector((state) => state.posts.isLoading);
	const hasError = useSelector((state) => state.posts.hasError);
	const loadPosts = useSelector(loadAllPosts);
	

	

	if (!isLoading && loadPosts[0]) {
		console.log("ok");
		
	}
	
	let content = ''; // Content will get assigned to this variable.

	if (isLoading) {
		content = <p>Loading...</p>; console.log(isLoading)
	} else if (hasError) {
		content = <p>An error has occurred</p>;
	} else {
		content = <PostList />; // posts combined with pictures.
	
	}

	return (
		<div>
			{
				content
			}
		</div>
	);
}

export default Posts;
