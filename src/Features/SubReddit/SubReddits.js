import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchLinks, loadLinks } from './subRedditsSlice';
import './SubReddits.css';

function SubReddits() {
	const dispatch = useDispatch();

	const isLoading = useSelector((state) => state.subReddits.isLoading);
	const hasError = useSelector((state) => state.subReddits.hasError);
	const link = useSelector(loadLinks);
	
		
	useEffect(() => {
		dispatch(fetchLinks());
	}, [dispatch]);
	let content = '';
	
	if (isLoading) {
		content = <p>Loading...</p>;
	} else if (hasError) {
		content = <p>An error has occurred</p>;
	} else {
		content = (
			<>
					{link.map((link) => (
						<button key={link.id}>
							<NavLink to={link.url}>{link.title}</NavLink>
						</button>
					))}	
			</>
		);
	}

	return (
		<>
			<div className='subReddits'>
				{content}
			</div>
		</>
	);
}

export default SubReddits;
