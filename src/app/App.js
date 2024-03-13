import React, { useEffect } from 'react';
import NotFound from '../Features/NotFound/NotFound';
import AppLayout from './AppLayout';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SubReddits from '../Features/SubReddit/SubReddits';
import { PostList } from '../Components/PostList/PostList';
import { fetchPhotos, fetchPosts } from '../Features/Posts/postsSlice';
import { useDispatch } from 'react-redux';
import { PostPage } from '../Components/PostPage/PostPage';

function App() {

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPhotos());
		dispatch(fetchPosts());
	}, [dispatch]);
	

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route path="/" element={<PostList />} />
					<Route path="posts" element={<PostList />} />
					<Route path="posts/:postId"  element={<PostPage /> } />
					<Route path="subreddits" element={<SubReddits />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
