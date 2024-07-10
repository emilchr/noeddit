import React, { useEffect } from 'react';
import './CommentList.css';
import Comment from '../Comment/Comment';
import { useDispatch, useSelector } from 'react-redux';
import {
  commentError,
  commentLoading,
  loadAllComments,
  setLocalComments,
} from '../../Features/Comments/commentsSlice';
import Skeleton from '../Skeleton/Skeleton';

export default function CommentList() {
  const dispatch = useDispatch();

  let comments = useSelector(loadAllComments);
  const isLoading = useSelector(commentLoading);
  const hasError = useSelector(commentError);

  let postComments = '';
  useEffect(() => {
    if (comments.length !== 0) {
      dispatch(setLocalComments()); // Sets comments.comments in localStorage if the state isn't empty.
    }
  }, [dispatch, comments]);

  if (isLoading) {
    const skeletonArray = [];
    let i = 0;

    while (i < 3) {
      const skeletonComment = (
        <div className="comment" key={i + 3}>
          <div className="comment-body">
            <Skeleton />
            <Skeleton />
            <Skeleton width="50%" />
          </div>
          <div className="comment-name">
            <Skeleton width="30%" variant="p" />
          </div>
        </div>
      );

      skeletonArray.push(skeletonComment);

      i++;
    }

    postComments = skeletonArray;
    return postComments;
  } else if (hasError) {
    console.log('Something went wrong.');

    return postComments;
  } else if (loadAllComments) {
    postComments = comments.map((comment) => {
      return <Comment comment={comment.data} key={comment.data.id} />;
    });
    return postComments;
  }

  return <>{postComments}</>;
}
