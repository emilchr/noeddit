import React from 'react';
import './Post.css';



export const Post = (props) => {

	// console.log("POST: props post.id: " + props.post.id)

	const post = props.post;

	
	return (
	<>
		<div className="post" id={post.id} >

		<div className="sub-title">r/facePalm</div>

		<h2 className="post-title">
		Post title: {post.title}
		</h2>

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
			{}
		</div>

		<div className="post-info">
			<p>Posted by userID: {post.userId} - 2 minutes ago - Comments</p>
		</div>

	
		</div>
	</>
	);
};
