import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import NotFound from '../Features/NotFound/NotFound';
import AppLayout from './AppLayout';
import SubReddits from '../Features/SubReddit/SubReddits';
import { PostList } from '../Components/PostList/PostList';
import { PostPage } from '../Components/PostPage/PostPage';

function App() {

	const router = createBrowserRouter(createRoutesFromElements(
		<Route element={<AppLayout />}>
			<Route path="/*" element={<NotFound />} />	
			<Route path="/" element={<PostList />} />
			<Route path="posts/:postId" element={<PostPage /> } />						
			<Route path="subreddits" element={<SubReddits />} />
		</Route>
	))

	return (
		
		<RouterProvider router={router} />
			
	);
}

export default App;
