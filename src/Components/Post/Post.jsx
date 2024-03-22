import React from 'react';
import './Post.css';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import Skeleton from '../Skeleton/Skeleton';





export const Post = (props) => {

	// console.log("POST: props post.id: " + props.post.id)
	const post = props.post;
	
	let content = '';
	// if (!post){console.log('Post error: ' + post)} else { console.log(post)}
	// If post is undefined, log error and repeat.
	if (post) {
		content = 
			<>
				<div className="post" id={post.id} >

				<div className="sub-title">r/facePalm</div>

				<h2 className="post-title">
				Post title: {post.title}
				</h2>

				<div className="votes">
					<ArrowUpward />
					
					2.7k
					
					<ArrowDownward />
				</div>

				<div className="post-text">
					
						<p>Body: {post.body}</p>
					
				</div>

				<div className="image-container">
					<Skeleton  height='1rem' /><br />
					<Skeleton  height='1rem' /><br />
					<Skeleton width='80%' height='1rem' />
				</div>

				<div className="post-info">
					<p>Posted by userID: <b>{post.userId}</b> - 2 minutes ago - Comments</p>
				</div>

			
				</div>
			</>
	} else {
		console.log('Loading post failed')
	}
	
	return (
	<>
		{content}
	</>
	);
};
