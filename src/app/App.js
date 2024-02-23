import React from 'react';
import Posts from '../Features/Posts/Posts';
import Home from '../Features/Home/Home';
import NotFound from '../Features/NotFound/NotFound';
import AppLayout from './AppLayout';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SubReddits from '../Features/SubReddit/SubReddits';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="posts" element={<Posts />} />
					<Route path="subreddits" element={<SubReddits />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
