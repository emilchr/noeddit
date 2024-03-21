import NotFound from '../Features/NotFound/NotFound';
import AppLayout from './AppLayout';
import { Route, BrowserRouter, Routes, useLocation } from 'react-router-dom';
import SubReddits from '../Features/SubReddit/SubReddits';
import { PostList } from '../Components/PostList/PostList';

import { PostPage } from '../Components/PostPage/PostPage';
import { useEffect } from 'react';

function App() {

	
	

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AppLayout />}>
					<Route path="/*" element={<NotFound />} />	
					<Route path="/" element={<PostList />} />
					<Route path="posts/:postId"  element={<PostPage /> } />						
					<Route path="subreddits" element={<SubReddits />} />
				</Route>
				
			</Routes>
		</BrowserRouter>
	);
}

export default App;
