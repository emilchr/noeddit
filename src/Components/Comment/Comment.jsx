import React from 'react'
import './Comment.css';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllComments, rehydrateComments } from '../../Features/Comments/commentsSlice';
import { useParams } from 'react-router-dom';

export default function Comment() {
    const params = useParams();
	let { postId } = params;
	
	postId = Number(postId); // Converts postId to a number
    let loadComments = useSelector(loadAllComments);

    const dispatch = useDispatch ();
	
 

    
    const postComments = loadComments.filter((comment) => comment.postId === postId);
    

    return (
        <div className='comment'>
            <div className='comment-body'>
                Comment Body: {postComments[0].body}
            </div>
                <div className='comment-name'><h6> Comment Name: {postComments[0].name}</h6>
                </div>
        </div>
    )
}
