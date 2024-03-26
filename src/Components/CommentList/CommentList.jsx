import React from 'react'
import './CommentList.css';
import Comment from '../Comment/Comment';
import { useSelector } from 'react-redux';
import { commentLoading, loadAllComments } from '../../Features/Comments/commentsSlice';
import { useParams } from 'react-router-dom';
import Skeleton from '../Skeleton/Skeleton';



export default function CommentList() {
   // filter and map over comments to get correct comments assosiated with post.
   const params = useParams();
   let { postId } = params;
   
   postId = Number(postId); // Converts postId to a number
   let comments = useSelector(loadAllComments);
   const isLoading = useSelector(commentLoading);

   let postComments = '';

    if (isLoading){
        
            const skeletonArray = [];
            let i = 0;
    
            while (i < 3){
                const skeletonComment = (
                    <div className='comment' key={i+3}>
                        <div className='comment-body'>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton width='50%' />
                        </div>
                        <div className='comment-name'>
                            <Skeleton width='30%' variant='p' />
                        </div>
                    </div>
                );
    
                skeletonArray.push(skeletonComment);
                
                i++;
            }
            
            postComments = skeletonArray;
            return postComments;
        
    } else if (loadAllComments){
        postComments = 
        comments
        .filter((comment) => comment.postId === postId)
        .map((comment) => {return <Comment comment={comment} key={comment.id} />});

        return postComments;
    }

  

    return (
        <>
            {postComments}
        </>
    )
}
