import NotFound from '../Features/NotFound/NotFound';
import AppLayout from './AppLayout';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SubReddits from '../Features/SubReddit/SubReddits';
import { PostList } from '../Components/PostList/PostList';

import { PostPage } from '../Components/PostPage/PostPage';

function App() {



	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AppLayout />}>
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
