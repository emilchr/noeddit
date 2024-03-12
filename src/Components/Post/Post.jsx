import React from 'react';
import './Post.css';

export const Post = (props) => {
	
	return <><div className="post" id={props.pId} >
	<div className="sub-title">r/facePalm</div>
	<h2 className="post-title">Post title: {props.title}</h2>

	<div className="votes">
		Up
		<br />
		2.7k
		<br />
		Down
	</div>
	<div className="post-text">
		<p>Body: {props.body}</p>
	</div>
	<div className="image-container">
		{props.photo}
	</div>
	<div className="post-info">
		<p>Posted by userID: {props.userId} - 2 minutes ago - Comments</p>
	</div>
</div></>;
};
