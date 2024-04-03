import React, { useEffect } from 'react';
import { Post } from '../Post/Post';
import { useDispatch } from 'react-redux';
import { Link, ScrollRestoration } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	loadAllPosts,
	postLoading,
	postError,
	fetchPage,
	postNextPage,
	addNextPage,
	addCurrentPage,
	loadingMorePosts,
	loadNextPosts,
	postCurrentPage,
	rehydrateCurrentPage,
	rehydrateNextPage,
} from '../../Features/Posts/postsSlice';
import './PostList.css';
import { CircularProgress } from '@mui/material';

export const PostList = () => {
	const dispatch = useDispatch();

	const loadPosts = useSelector(loadAllPosts);
	const nextPosts = useSelector(loadNextPosts);
	const firstLoad = useSelector(postLoading);
	const isLoadingPage = useSelector(loadingMorePosts);
	const hasError = useSelector(postError);
	const nextPage = useSelector(postNextPage);
	const currentPage = useSelector(postCurrentPage);
	const rehydratePage = useSelector(rehydrateCurrentPage);
	const rehydrateUpcomingPage = useSelector(rehydrateNextPage);

	const persistedCurrentPage = JSON.parse(localStorage.getItem('currentPage'));
		localStorage.setItem('currentPage', JSON.stringify(currentPage));
	const persistedNextPage = JSON.parse(localStorage.getItem('nextPage'));
		localStorage.setItem('nextPage', JSON.stringify(nextPage));

	useEffect(() => {
		if (loadPosts.length === 0) {
			dispatch(fetchPage(1));
			dispatch(fetchPage(2));
			
		}
		if (!persistedCurrentPage) {
			dispatch(addCurrentPage());
		}
	}, [dispatch, loadPosts]);

	/// -------- Handles loading of next page and the logic for increasing posts.currentPage and posts.nextPage.------------------ ///
	const handleNextPage = (e) => {
		e.preventDefault();

		if (currentPage === null) {
			console.log('CurrentPage is null.');
		} else {
			dispatch(fetchPage(nextPage));
			dispatch(addNextPage());
			dispatch(addCurrentPage());
			localStorage.setItem('currentPage', JSON.stringify(currentPage));
			localStorage.setItem('nextPage', JSON.stringify(nextPage));
		}
	};
	// ----- handles loading, errors and the rendering of posts ---------
	if (isLoadingPage && loadPosts) {
		// If more posts are loading and state.posts are filled with posts.
		const listNextPosts = nextPosts.map((post) => {
			const linkToPost = 'posts/' + post.id;

			return (
				<Link to={linkToPost} key={post.id}>
					<Post />
				</Link>
			);
		});

		return (
			<div className="postList">
				{listNextPosts}
				<div className="load-container">
					<CircularProgress />
				</div>
				{/* Restores position to top */}
				{/* <ScrollRestoration /> */}
			</div>
		);
	} else if (firstLoad) { // If this is the first time the app loads. Displays skeleton of posts.
		return (
			<div>
				<Post />
			</div>
		);
	} else if (hasError) {
		return (
			<div>
				<p>An error has occurred.</p>
			</div>
		);
	} else {
		const listPosts = loadPosts.map((post) => {
			const urlToPost = 'posts/' + post.id;
			return (
				<Link to={urlToPost} key={post.id}>
					<Post post={loadPosts[post.id - 1]} /> 
					{/* -1 to handle index 0 */}
				</Link>
			);
		});
		
		const listNextPosts = nextPosts.map((post) => {
			const urlToPost = 'posts/' + post.id;
			return (
				<Link to={urlToPost} key={post.id}>
					<Post post={loadPosts[post.id - 1]} />
				</Link>
			);})

		return (
			<div className="postList">
				{listPosts}
				{console.log(listNextPosts)}
				<div className="load-container">
					<Link
						className="load-post"
						onClick={handleNextPage}
						preventScrollReset={true}
					>
						Load more posts
					</Link>
				</div>
				{/* ------------------------------------------ 
        Restores position to top. Needs to restore scroll before the next posts. 

        Does it get fixed when i add new posts below?
        ------------------------------------------------------*/}
				<ScrollRestoration />
			</div>
		);
	}
};
