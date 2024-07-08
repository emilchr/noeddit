import React, { useEffect } from 'react';
import { Post } from '../Post/Post';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	loadAllPosts,
	postLoading,
	postError,
	fetchNextPosts,
	loadingMorePosts,
	loadNextPosts,
	fetchPosts,
	postFirstLoad,
	setLocalPosts,
	setLocalNextPosts,
	getLastPostId,
	lastPostId,
	addNextPosts,
} from '../../Features/Posts/postsSlice';
import './PostList.css';
import { CircularProgress } from '@mui/material';
import {
	activeSubreddit,
	rehydrateActiveSubreddit,
	setSubreddit,
} from '../../Features/userUi/userUiSlice';

export const PostList = () => {
	const dispatch = useDispatch();

	const loadPosts = useSelector(loadAllPosts);
	const nextPosts = useSelector(loadNextPosts);
	const firstLoad = useSelector(postFirstLoad);
	const isLoading = useSelector(postLoading);
	const isLoadingMore = useSelector(loadingMorePosts);
	const hasError = useSelector(postError);
	const currentSubreddit = useSelector(activeSubreddit);
	const lastId = useSelector(lastPostId);

	useEffect(() => {
		if (loadPosts.length !== 0) {
			// if posts.posts is populated
			dispatch(getLastPostId());
		}
		if (loadPosts.length === 0) {
			dispatch(setSubreddit(currentSubreddit)); // Sets the current subreddit
			dispatch(fetchPosts(currentSubreddit));
		}
	}, [loadPosts, currentSubreddit, dispatch]);

	useEffect(() => {
		if (!loadPosts) {
			console.log('No posts for localStorage.');
		} else {
			dispatch(setLocalPosts());
			if (nextPosts) {
				dispatch(setLocalNextPosts());
				dispatch(getLastPostId());
			}
		}
	}, [loadPosts, nextPosts, dispatch]);

	useEffect(() => {
		// Checks if user has scrolled to the bottom.

		const scrolledToBottom = () => {
			const bottom =
				Math.ceil(window.innerHeight + window.scrollY) >=
				document.documentElement.scrollHeight;

			if (bottom) {
				// if the user has scrolled to the bottom.
				// pageLoad();
			}
		};
		window.addEventListener('scroll', scrolledToBottom, {
			passive: true,
		});

		return () => {
			// Clean up of event listener
			window.removeEventListener('scroll', scrolledToBottom);
		};
	}, []);
	// -------- Handles loading of next page and the logic for increasing posts.nextPage.------------------ //
	const pageLoad = () => {
		const nextPostInfo = {
			currentSubreddit,
			lastId,
		};
		dispatch(fetchNextPosts(nextPostInfo));
		if (nextPosts) {
			dispatch(addNextPosts());
		}
	};
	const handleNextPage = (e) => {
		e.preventDefault();
		pageLoad();
	};

	// ----- Handles loading, errors and the rendering of posts ---------
	if (isLoadingMore && loadPosts) {
		// If more posts are loading and state.posts are filled with posts.
		const listPosts = loadPosts.map((post) => {
			const urlToPost = 'posts/' + post.data.id;
			return <Post url={urlToPost} post={post.data} key={post.data.id} />;
		});

		// If post is defined but loading new posts after fetching new page.

		return (
			<div className="postList">
				{listPosts}

				<div className="load-container">
					<CircularProgress />
				</div>
			</div>
		);
	} else if (firstLoad || isLoading) {
		// If this is the first time the app loads and if there are no posts in state. Displays skeleton of posts.
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
		//
		// if there is no error or loading, this executes.
		//

		const listPosts = loadPosts.map((post) => {
			const urlToPost = 'posts/' + post.data.id;
			// console.log(post);
			return <Post url={urlToPost} post={post.data} key={post.data.id} />;
		});
		let listNextPosts = null;
		if (nextPosts) {
			listNextPosts = nextPosts.map((post) => {
				const urlToPost = 'posts/' + post.data.id;
				return <Post url={urlToPost} post={post.data} key={post.data.id} />;
			});
		}
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
