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
	addPage,
	addCurrentPage,
	loadingMorePosts,
  loadNextPosts,
} from '../../Features/Posts/postsSlice';
import './PostList.css';
import { CircularProgress } from '@mui/material';

export const PostList = () => {
	const dispatch = useDispatch();

	const loadPosts = useSelector(loadAllPosts)
  // const nextPosts = useSelector(loadNextPosts);
	const firstLoad = useSelector(postLoading);
	const isLoadingPage = useSelector(loadingMorePosts);
	const hasError = useSelector(postError);
	const nextPage = useSelector(postNextPage);

	useEffect(() => {
		if (loadPosts.length === 0) {
			dispatch(fetchPage(1));
		}
	}, [dispatch, loadPosts]);

	const handleNextPage = (e) => {
		e.preventDefault();

		dispatch(fetchPage(nextPage));
		dispatch(addPage());
		dispatch(addCurrentPage());
	};

	if (isLoadingPage && loadPosts) { // If more posts are loading and state.posts are filled with posts.
		const listPosts = loadPosts.map((post) => {
			const linkToPost = 'posts/' + post.id;

			return (
				<Link to={linkToPost} key={post.id}>
					<Post />
				</Link>
			);
		});

		return (
			<div className="postList">
				{listPosts}
				<div className="load-container">
					<CircularProgress />
				</div>
				{/* Restores position to top */}
				<ScrollRestoration />
			</div>
		);
	} else if (firstLoad) {
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
		return (
			<div className="postList">
				{listPosts}
				<div className="load-container">
					<Link
						className="load-post"
						onClick={handleNextPage}
						preventScrollReset={true}
					>
						Load more posts
					</Link>
				</div>
				{/* Restores position to top */}
				<ScrollRestoration />
			</div>
		);
	}
};
