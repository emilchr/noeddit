import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchLinks, loadLinks } from './subRedditsSlice';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
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
				<ul>
					{link.map((link) => (
						<li key={link.id}>
							<NavLink to={link.url}>{link.title}</NavLink>
						</li>
					))}	
				</ul>
			</>
		);
	}

	return (
	<><div className='modal-background'></div>
		<div className='subReddits-top'><CloseRoundedIcon /></div>
		<div className='subReddits'>
			{content}
		</div>
	</>
	);
}

export default SubReddits;
