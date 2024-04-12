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
import Skeleton from '../Skeleton/Skeleton';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

export const PostList = () => {
	const dispatch = useDispatch();

	const loadPosts = useSelector(loadAllPosts);
	const nextPosts = useSelector(loadNextPosts);
	const firstLoad = useSelector(postLoading);
	const isLoadingMore = useSelector(loadingMorePosts);
	const hasError = useSelector(postError);
	const nextPage = useSelector(postNextPage);
	const currentPage = useSelector(postCurrentPage);

	const persistedCurrentPage = JSON.parse(localStorage.getItem('currentPage'));

	localStorage.setItem('currentPage', JSON.stringify(currentPage));
	localStorage.setItem('nextPage', JSON.stringify(nextPage));

	useEffect(() => {
		if (loadPosts.length === 0) {
			dispatch(fetchPage(1));
			setTimeout(() => {
				// Delay added for proper loading in state.posts and state.nextPosts.
				dispatch(fetchPage(2));
			}, 100);
		}
		if (!persistedCurrentPage) {
			dispatch(addCurrentPage());
		}
	}, [loadPosts]);

	// Infinite scroll feature
	const scrolledToBottom = () => {
		const bottom =
			Math.ceil(window.innerHeight + window.scrollY) >=
			document.documentElement.scrollHeight;

		if (bottom) {
			console.log('at the bottom');
			pageLoad();
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', scrolledToBottom, {
			passive: true,
		});
		
		return () => { // Clean up of event listener
			window.removeEventListener('scroll', scrolledToBottom);
		};
	}, []);
	/// -------- Handles loading of next page and the logic for increasing posts.currentPage and posts.nextPage.------------------ ///
	const pageLoad = () => {
		if (currentPage === null) {
			console.log('CurrentPage is null.');
		} else {
			dispatch(fetchPage(nextPage));
			dispatch(addNextPage());
			dispatch(addCurrentPage());
			localStorage.setItem('currentPage', JSON.stringify(currentPage));
			localStorage.setItem('nextPage', JSON.stringify(nextPage));
		}
	}
	const handleNextPage = (e) => {
		e.preventDefault();
		pageLoad();
		
	};

	// ----- handles loading, errors and the rendering of posts ---------
	if (isLoadingMore && loadPosts) {
		// If more posts are loading and state.posts are filled with posts.
		const listPosts = loadPosts.map((post, index) => {
			const urlToPost = 'posts/' + post.id;
			return (
				<Link to={urlToPost} key={post.id}>
					<Post post={loadPosts[index]} />
				</Link>
			);
		});

		// If post is defined but loading new posts after fetching new page.
		let content = (
			<div>
				<div className="post">
					<div className="sub-title">
						r/
						<Skeleton width="5rem" height=".55rem" />
					</div>
					<h2 className="post-title">
						<Skeleton variant="h2" />
					</h2>
					<div className="votes">
						<ArrowUpward />
						<Skeleton height="1rem" />
						<ArrowDownward />
					</div>
					<div className="post-text">
						<p>
							<Skeleton />
							<Skeleton />
							<Skeleton />
							<Skeleton width="80%" height="1rem" />
							<Skeleton width="50%" height="1rem" />
						</p>
					</div>
					<div className="image-container">
						<Skeleton variant="image" />
					</div>
					<div className="post-info">
						<Skeleton height=".75rem" />
					</div>
				</div>
			</div>
		);
		const listNextPosts = nextPosts.map((post, index) => {
			const urlToPost = 'posts/' + post.id;
			return (
				<Link to={urlToPost} key={post.id}>
					<Post post={nextPosts[index]} />
				</Link>
			);
		});

		return (
			<div className="postList">
				{listPosts}
				{listNextPosts && content}
				<div className="load-container">
					<CircularProgress />
				</div>
				{/* !---     <ScrollRestoration />
				 Restores position to bottom. It needs to hold position at last buttonpress */}
			</div>
		);
	} else if (firstLoad) {
		// If this is the first time the app loads. Displays skeleton of posts.
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
		const listPosts = loadPosts.map((post, index) => {
			const urlToPost = 'posts/' + post.id;
			return (
				<Link to={urlToPost} key={post.id}>
					<Post post={loadPosts[index]} />
				</Link>
			);
		});

		const listNextPosts = nextPosts.map((post, index) => {
			const urlToPost = 'posts/' + post.id;
			return (
				<Link to={urlToPost} key={post.id}>
					<Post post={nextPosts[index]} />
				</Link>
			);
		});
		return (
			<div className="postList">
				{listPosts}
				{listNextPosts}

				<div className="load-container">
					<Link className="load-post" onClick={handleNextPage}>
						Load more posts
					</Link>
				</div>
				{/* ------------------------------------------ 
        Restores position to bottom. Needs to restore scroll before the next posts. 
		*/}
			</div>
		);
	}
};
