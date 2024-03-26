import React from 'react';
import './Comment.css';
import { useSelector } from 'react-redux';
import { commentError, commentLoading } from '../../Features/Comments/commentsSlice';


export default function Comment(props) {
    let content = '';

    const hasError = useSelector(commentError);

    const comment = props.comment;

  
    if (comment){
        content = (
            <div className='comment'>
                <div className='comment-body'>
                    Comment Body: {comment.body}
                </div>
                <div className='comment-name'><h6> Comment Name: {comment.name}</h6></div>
            </div>
        )
    } else if (hasError){
        console.log('Loading comment failed');
    }

    return content;
}
