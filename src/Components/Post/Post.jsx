import React from 'react';
import { useSelector } from 'react-redux';
import { loadAllPhotos, loadAllPosts } from '../../Features/Posts/postsSlice';
import './Post.css';

export const Post = () => {
	const loadPosts = useSelector(loadAllPosts);
	const loadPhotos = useSelector(loadAllPhotos);

	const photos = loadPhotos.map((photo) => {
		// loads all photos into the variable photos and returns a img and title.
		return <img src={photo.thumbnailUrl} alt={photo.title}></img>;
	});

	const posts = loadPosts.map((post, index) => {
		// loads all posts and combines photos with the post.
		return (
			<div className="post" id={post.id} key={post.id}>
				<div className="sub-title">r/facePalm</div>
				<h2 className="post-title">Post title: {post.title}</h2>

				<div className="votes">
					Up
					<br />
					2.7k
					<br />
					Down
				</div>
				<div className="post-text">
					<p>Body: {post.body}</p>
				</div>
				<div className="image-container">
					{
						photos[index] // inserts a photo in each post.
					}
				</div>
				<div className="post-info">
					<p>Posted by userID: {post.userId} - 2 minutes ago - Comments</p>
				</div>
			</div>
		);
	}).splice(0, 10); // Slice added for dev to max posts
	return <>{posts}</>;
};
