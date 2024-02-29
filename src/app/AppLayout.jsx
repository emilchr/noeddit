import React from 'react';
import { Outlet } from 'react-router-dom';
import SubReddits from '../Features/SubReddit/SubReddits';
import './AppLayout.css';
import { SearchBar } from '../Components/SearchBar/SearchBar';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

export default function AppLayout() {
	return (
		<><div className='container'>
			
			<div className="header-overhang"><p>r/subReddit</p></div>
			
			<header>
				<h2>noreddit</h2>
				<div className='header-right'>
					<SearchBar />
					
						<a href=''><MenuRoundedIcon style={{color: 'white'}} /></a>
					
				</div>
				{/* <CloseRoundedIcon style={{color: 'white'}} /> */}
				

				
			</header>
			<nav>				
				<SubReddits />				
			</nav>

			<main>
				<Outlet />
			</main>
			
			
		</div>
		<footer>
		Made with <FavoriteRoundedIcon style={{color: 'red'}} /> by Emil
		</footer>
	</>
	);
}
