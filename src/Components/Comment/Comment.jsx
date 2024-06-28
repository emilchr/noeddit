import React from 'react';
import './Comment.css';
import { useSelector } from 'react-redux';
import { commentError } from '../../Features/Comments/commentsSlice';
import Markdown from 'react-markdown';


export default function Comment(props) {
    let content = '';

    const hasError = useSelector(commentError);

    const comment = props.comment;

  
    if (comment){
        content = (
            <div className='comment'>
                <div className='comment-body'>
                    <Markdown>{comment.body}</Markdown>
                </div>
                <div className='comment-name'><h6>{comment.author}</h6></div>
            </div>
        )
    } else if (hasError){
        console.log('Loading comment failed');
    }

    return content;
}
