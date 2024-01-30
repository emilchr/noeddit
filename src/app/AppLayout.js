import React from 'react';
import { Outlet } from 'react-router-dom';
import SubReddits from '../Features/SubReddit/SubReddits';

export default function AppLayout() {
	return (
		<div>
			<nav>
				<ul>
					<SubReddits />
				</ul>
			</nav>
			<Outlet />
			<p>Base</p>
		</div>
	);
}
