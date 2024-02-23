import React from 'react';
import { Outlet } from 'react-router-dom';
import SubReddits from '../Features/SubReddit/SubReddits';


export default function AppLayout() {
	return (
		<div>
			
			<header>
				<h1>noreddit</h1>
			</header>
			
			<nav>				
				<SubReddits />				
			</nav>
			<Outlet />
		</div>
	);
}
