import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchPosts,
	fetchPhotos,
	loadAllPosts,
	loadAllPhotos,
} from './postsSlice';
import { PostList } from '../../Components/PostList/PostList';

function Posts() {
	const dispatch = useDispatch();

	const isLoading = useSelector((state) => state.posts.isLoading);
	const hasError = useSelector((state) => state.posts.hasError);
	const loadPosts = useSelector(loadAllPosts);
	const loadPhotos = useSelector(loadAllPhotos);

	useEffect(() => {
		dispatch(fetchPhotos());
		dispatch(fetchPosts());
	}, [dispatch]);

	if (!isLoading && loadPosts[0]) {
		console.log(loadPosts);
		console.log(loadPhotos);
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
