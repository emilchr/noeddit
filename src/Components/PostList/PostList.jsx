import React, { useEffect } from 'react';
import { Post } from '../Post/Post';
import { useDispatch } from 'react-redux';
import { Link, ScrollRestoration } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	loadAllPosts,
	postLoading,
	postError,
	fetchNextPosts,
	postNextPage,
	addNextPage,
	loadingMorePosts,
	loadNextPosts,
	rehydrateNextPage,
	payloadEmpty,
	fetchPosts,
	postFirstLoad,
} from '../../Features/Posts/postsSlice';
import './PostList.css';
import { CircularProgress } from '@mui/material';
import {
	activeSubreddit,
	rehydrateActiveSubreddit,
} from '../../Features/userUi/userUiSlice';

export const PostList = () => {
	const dispatch = useDispatch();

	const loadPosts = useSelector(loadAllPosts);
	const nextPosts = useSelector(loadNextPosts);
	const firstLoad = useSelector(postFirstLoad);
	const isLoading = useSelector(postLoading);
	const isLoadingMore = useSelector(loadingMorePosts);
	const hasError = useSelector(postError);
	const isEmpty = useSelector(payloadEmpty);
	const currentSubreddit = useSelector(activeSubreddit);

	const nextPage = useSelector(postNextPage);

	localStorage.setItem('nextPage', JSON.stringify(nextPage));
	localStorage.setItem('currentSubreddit', JSON.stringify(currentSubreddit));

	const persistedSubreddit = localStorage.getItem('currentSubreddit');

	useEffect(() => {
		if (loadPosts.length === 0) {
			dispatch(fetchPosts('popular'));

			setTimeout(() => {
				// Delay added for proper loading in state.posts and state.nextPosts.
				// dispatch(fetchNextPosts(2));
			}, 100);
		}
	}, [loadPosts]);

	// Checks if user has scrolled to the bottom.

	const scrolledToBottom = () => {
		// ! Not the correct way to define the function. Find a  better solution for this. This happens because the function is a dependency for the useEffect below.
		const bottom =
			Math.ceil(window.innerHeight + window.scrollY) >=
			document.documentElement.scrollHeight;

		if (bottom) {
			// if the user has scrolled to the bottom.
			pageLoad();
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', scrolledToBottom, {
			passive: true,
		});

		return () => {
			// Clean up of event listener
			window.removeEventListener('scroll', scrolledToBottom);
		};
	}, [scrolledToBottom]);
	// -------- Handles loading of next page and the logic for increasing posts.nextPage.------------------ //
	const pageLoad = () => {
		if (isEmpty) {
			console.log('No more posts.');
		} else {
			// dispatch(fetchNextPosts(nextPage));
			dispatch(addNextPage());

			localStorage.setItem('nextPage', JSON.stringify(nextPage));
		}
	};
	const handleNextPage = (e) => {
		e.preventDefault();
		pageLoad();
	};
	// console.log('___________________________________________');
	// console.log(loadPosts);
	// console.log('___________________________________________');
	// ----- Handles loading, errors and the rendering of posts ---------
	if (isLoadingMore && loadPosts) {
		// If more posts are loading and state.posts are filled with posts.
		const listPosts = loadPosts.map((post, index) => {
			const urlToPost = 'posts/' + post.data.id;
			return <Post url={urlToPost} post={post.data} key={post.data.id} />;
		});

		// If post is defined but loading new posts after fetching new page.
		let content = '';

		const listNextPosts = nextPosts.map((post, index) => {
			const urlToPost = 'posts/' + post.data.id;
			return <Post post={nextPosts[index]} key={post.data.id} />;
		});

		return (
			<div className="postList">
				{listPosts}
				{/* {listNextPosts && content} Created issues with loading props.posts.data*/}
				{content}
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
		const listPosts = loadPosts.map((post, index) => {
			const urlToPost = 'posts/' + post.data.id;
			// console.log(post)
			return <Post url={urlToPost} post={post.data} key={post.data.id} />;
		});

		// const listNextPosts = nextPosts.map((post, index) => {
		// 	const urlToPost = 'posts/' + post.id;
		// 	return <Post post={nextPosts[index]} key={post.data.id} />;
		// });
		return (
			<div className="postList">
				{listPosts}
				{/* {listNextPosts} */}
				{isEmpty ? (
					<div className="post-title">No more posts</div>
				) : (
					<div className="load-container">
						<Link className="load-post" onClick={handleNextPage}>
							Load more posts
						</Link>
					</div>
				)}

				{/* ------------------------------------------ 
        Restores position to bottom. Needs to restore scroll before the next posts. 
		*/}
			</div>
		);
	}
};
