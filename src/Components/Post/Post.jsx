import React from 'react';
import './Post.css';
import {
	ArrowDownward,
	ArrowUpward,
	CommentOutlined,
} from '@mui/icons-material';
import Skeleton from '../Skeleton/Skeleton';
import { useSelector } from 'react-redux';
import {
	loadingMorePosts,
	postError,
	postFirstLoad,
	postLoading,
} from '../../Features/Posts/postsSlice';
import { Link } from 'react-router-dom';
import Markdown from 'marked-react';
import { cleanUrl } from '../../Utils/helpers';

export const Post = (props) => {
	// console.log("POST: props post.id: " + props.post.id)
	const post = props.post;
	// console.log(props)
	const firstLoad = useSelector(postFirstLoad);
	const isLoading = useSelector(postLoading);
	const isLoadingMore = useSelector(loadingMorePosts);
	const hasError = useSelector(postError);

	let content = '';
	// if (!post){console.log('Post error: ' + post)} else { console.log(post)}
	// If post is undefined, log error and repeat.

	if (firstLoad || isLoading) {
		// if fetching of post is pending and there are no posts avalible display the skeleton.
		const skeletonArray = [];
		let i = 0;
		while (i < 3) {
			const skeletonPost = (
				<div key={i + 2}>
					<div className="post">
						<div className="sub-title">
							r/
							<Skeleton width="5rem" height=".55rem" />
						</div>
						<h2 className="post-title">
							<Skeleton variant="h2" />
						</h2>

						<div className="post-text">
							<p>
								<Skeleton />
								<Skeleton />
								<Skeleton />
								<Skeleton width="80%" height="1rem" />
								<Skeleton width="50%" height="1rem" />
							</p>
						</div>
						<div className="post-media">
							<Skeleton variant="image" />
						</div>
						<div className="post-info">
							<Skeleton height=".75rem" />
						</div>
					</div>
				</div>
			);

			skeletonArray.push(skeletonPost);

			i++;
		}

		content = skeletonArray;

		return content;
	} else if (post) {
		// If there are posts present in state.
		let postCreated = new Date(post.created * 1000); // get time for when post is created.

		let media = [];
		if (post.url.startsWith('https://i') && post.post_hint === 'image') {
			media.push(
				<div key={post.id}>
					<Link to={props.url}>
						<img src={post.url} alt={post.title} />
					</Link>
				</div>
			);
		} else if (
			post.url.startsWith('https://v.') &&
			post.post_hint === 'hosted:video'
		) {
			media.push(
				<div className="video-container" key={post.id}>
					<video
						src={post.secure_media.reddit_video.fallback_url}
						controls
					></video>
				</div>
			);
		} else if (post.is_gallery) {
			const mediaArr = Object.entries(post.media_metadata);

			media.push(
				<div className="carousel-container" key={post.id}>
					<div className="carousel">
						{mediaArr.map((item) => {
							return (
								<p key={item[0]}>
									<img src={cleanUrl(item[1].s.u)} alt={post.title} />
								</p>
							);
						})}
					</div>
				</div>
			);
		} else {
			media.push('');
		}

		content = (
			<div className="post">
				<div className="sub-title">r/{post.subreddit}</div>

				<h3 className="post-title">
					<Link to={props.url}>{post.title}</Link>
				</h3>

				<div className="post-text">
					<p>
						Posted by <b>{post.author}</b>
					</p>
					<Markdown gfm={true}>{post.selftext || post.url}</Markdown>
				</div>

				<div className="post-media">{media}</div>

				<div className="post-info">
					<p>
						<ArrowUpward />
						<ArrowDownward />
						{post.score}
					</p>
					<p>Posted {postCreated.toLocaleString('no-NO')}</p>
					<p className="num_comments">
						<CommentOutlined />
						<Link to={props.url}>{post.num_comments}</Link>
					</p>
				</div>
			</div>
		);
	} else if (hasError) {
		console.log('Loading post failed');
	}

	return <>{content}</>;
};
