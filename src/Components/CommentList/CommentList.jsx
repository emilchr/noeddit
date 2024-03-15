import React from 'react'
import './CommentList.css';
import Comment from '../Comment/Comment';
import { useSelector } from 'react-redux';
import { loadAllComments } from '../../Features/Comments/commentsSlice';
import { useParams } from 'react-router-dom';



export default function CommentList() {
   // filter and map over comments to get correct comments assosiated with post.
   const params = useParams();
   let { postId } = params;
   
   postId = Number(postId); // Converts postId to a number
   let loadComments = useSelector(loadAllComments);
   
   let postComments = loadComments.filter((comment) => comment.postId === postId)
                                    .map((comment) => {

                                            return (
                                                <Comment comment={comment} key={comment.id} />
                                            )});

    return (
        <>
            {postComments}
        </>
    )
}
