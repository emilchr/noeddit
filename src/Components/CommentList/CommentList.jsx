import React from 'react'
import './CommentList.css';
import { useSelector } from 'react-redux';
import { loadAllComments } from '../../Features/Comments/commentsSlice';
import { useParams } from 'react-router-dom';
import Comment from '../Comment/Comment';

export default function CommentList() {
    const params = useParams();
	let { postId } = params;
	
	postId = Number(postId); // Converts postId to a number

    const comments = useSelector(loadAllComments);
    const postComments = comments.filter((comment) => comment.postId === postId);
  
    
    console.log(postComments)
    
    return (
        <>
            <Comment />
        </>
    )
}
