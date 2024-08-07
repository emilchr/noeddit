import React from 'react';
import './Comment.css';
import { useSelector } from 'react-redux';
import { commentError } from '../../Features/Comments/commentsSlice';
import Markdown from 'marked-react';
export default function Comment(props) {
  let content = '';

  const hasError = useSelector(commentError);

  const comment = props.comment;
  let innerComment = '';
  let deepComment = '';

  if (comment.replies) {
    innerComment = comment.replies.data.children.map((innerComment) => {
      if (innerComment.data.replies) {
        deepComment = innerComment.data.replies.data.children;
        // eslint-disable-next-line
        deepComment = deepComment.map((deepComment) => {
          if (deepComment.kind !== 'more') {
            return (
              <div className="inner-comment" key={deepComment.data.id}>
                <div className="inner-comment-body">
                  <Markdown>{deepComment.data.body}</Markdown>
                </div>
                <div className="inner-comment-name">
                  <h6>{deepComment.data.author}</h6>
                </div>
              </div>
            );
          }
        });
      }

      return (
        <div className="inner-comment" key={innerComment.data.id}>
          <div className="inner-comment-body">
            <Markdown>{innerComment.data.body}</Markdown>
          </div>
          <div className="inner-comment-name">
            <h6>{innerComment.data.author}</h6>
          </div>
          {deepComment}
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
