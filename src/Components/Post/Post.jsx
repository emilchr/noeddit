import React from 'react';
import './Post.css';




export const Post = (props) => {

	// console.log("POST: props post.id: " + props.post.id)
	const post = props.post;

	// TODO: Add useParams here, for loading state from store, not through props from PostList. ? But PostList needs the singular posts in sequence.
	
	let content = '';
	// if (!post){console.log('Post error: ' + post)} else { console.log(post)}
	if (post) {
		content = <>
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
	} else {
		console.log('Loading post failed')
	}
	
	return (
	<>
		{content}
	</>
	);
};
