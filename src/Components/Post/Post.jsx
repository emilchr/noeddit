import React from 'react';
import './Post.css';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import Skeleton from '../Skeleton/Skeleton';
import { useSelector } from 'react-redux';
import { postError, postLoading } from '../../Features/Posts/postsSlice';


export const Post = (props) => {

	// console.log("POST: props post.id: " + props.post.id)
	const post = props.post;
	
	const isLoading = useSelector(postLoading);
	const hasError = useSelector(postError);
	
	let content = '';
	// if (!post){console.log('Post error: ' + post)} else { console.log(post)}
	// If post is undefined, log error and repeat.
	
	  if (isLoading){ // if fetching of post is pending display the skeleton.
		const skeletonArray = [];	
		let i = 0;
		while ( i < 3){

			const skeletonPost = 
			(<div key={i+2}>
				<div className="post">
					<div className="sub-title">r/<Skeleton width='5rem' height='.55rem' /></div>
					<h2 className="post-title">
					<Skeleton variant='h2' />
					</h2>
					<div className="votes">
						<ArrowUpward />
						<Skeleton  height='1rem' />
						<ArrowDownward />
					</div>
					<div className="post-text">
							<p>
								<Skeleton />
								<Skeleton />
								<Skeleton />
								<Skeleton width='80%' height='1rem' />
								<Skeleton width='50%' height='1rem' />
							</p>
					</div>
					<div className="image-container">					
						<Skeleton variant='image' />
					</div>
					<div className="post-info">
						<Skeleton  height='.75rem' />
					</div>
				</div>
			</div>);

			skeletonArray.push(skeletonPost);

			i++;
		}
		
		content = skeletonArray
		
		return content;

	}
	else if (post) { // If post is defined
		content = 
				(<div className="post" id={post.id} >
					<div className="sub-title">r/facePalm</div>

					<h2 className="post-title">
					Post title: {post.title}
					</h2>

					<div className="votes">
						<ArrowUpward />
						
						2.7k
						
						<ArrowDownward />
					</div>

					<div className="post-text">
						
							<p>Body: {post.body}</p>
						
					</div>

					<div className="image-container">

					</div>

					<div className="post-info">
						<p>Posted by userID: <b>{post.userId}</b></p> 
						<p> 2 minutes ago</p> 
						<p>Comments</p>
					</div>
				</div>)
			
	} else if (hasError) {
		console.log('Loading post failed');
	}
	
	return (
	<>
		{content}
	</>
	);
};
