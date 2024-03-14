import React from 'react'
import './Comment.css';
import { useSelector } from 'react-redux';
import { loadAllComments } from '../../Features/Comments/commentsSlice';
import { useParams } from 'react-router-dom';

export default function Comment() {
    const params = useParams();
	let { postId } = params;
	
	postId = Number(postId); // Converts postId to a number

    const comments = useSelector(loadAllComments);
    const postComments = comments.filter((comment) => comment.postId === postId);
    
    return (
        <div className='comment'>
                <div className='comment-name'><h4> Comment Name: {postComments[0].name}</h4>
                </div>

            <div className='comment-body'>
                Comment Body: {postComments[0].body}
            </div>
        </div>
    )
}
