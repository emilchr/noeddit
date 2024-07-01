import React from 'react';
import './Comment.css';
import { useSelector } from 'react-redux';
import { commentError } from '../../Features/Comments/commentsSlice';
import Markdown from 'react-markdown';

export default function Comment(props) {
	let content = '';

	const hasError = useSelector(commentError);

	const comment = props.comment;
	let innerComment = '';
	console.log(comment.replies);
	if (!comment.replies) {
		console.log('No replies to comment.');
	} else {
		console.log('not undefined');
		innerComment = comment.replies.data.children.map((innerComment) => {
			return (
				<div className="inner-comment" key={innerComment.data.id}>
					<div className="inner-comment-body">
						<Markdown>{innerComment.data.body}</Markdown>
					</div>
					<div className="inner-comment-name">
						<h6>{innerComment.data.author}</h6>
					</div>
				</div>
			);
		});
	}

	if (comment) {
		content = (
			<div className="comment">
				<div className="comment-body">
					<Markdown>{comment.body}</Markdown>
				</div>
				<div className="comment-name">
					<h6>{comment.author}</h6>
				</div>
				{innerComment}
			</div>
		);
	} else if (hasError) {
		console.log('Loading comment failed');
	}

	return content;
}
