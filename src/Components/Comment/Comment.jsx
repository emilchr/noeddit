import React from 'react';
import './Comment.css';

export default function Comment(props) {
    
    return (
        <div className='comment'>
            <div className='comment-body'>
                Comment Body: {props.comment.body}
            </div>
                <div className='comment-name'><h6> Comment Name: {props.comment.name}</h6>
                </div>
        </div>
    )
}
