import React from 'react'
import './CommentList.css';
import Comment from '../Comment/Comment';
import { useSelector } from 'react-redux';
import { commentError, commentLoading, loadAllComments } from '../../Features/Comments/commentsSlice';
import { useParams } from 'react-router-dom';
import Skeleton from '../Skeleton/Skeleton';



export default function CommentList() {
   // filter and map over comments to get correct comments assosiated with post.
   const params = useParams();
   let { postId } = params;
   
   let comments = useSelector(loadAllComments);
   const isLoading = useSelector(commentLoading);
   const hasError = useSelector(commentError);

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
        
    } else if (hasError){

        console.log('Something went wrong.')

        return postComments;
    } else if (loadAllComments){
        postComments = 
        comments
        .map((comment) => {return <Comment comment={comment.data} key={comment.data.id} />});
        

        return postComments;
    }

  

    return (
        <>
            {postComments}
        </>
    )
}
