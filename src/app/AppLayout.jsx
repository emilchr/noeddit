import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import SubReddits from '../Features/SubReddit/SubReddits';
import './AppLayout.css';
import { SearchBar } from '../Components/SearchBar/SearchBar';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useDispatch, useSelector } from 'react-redux';
import { menuState, toggleMenu } from '../Features/userUiSlice/userUiSlice';

export default function AppLayout() {

	const dispatch = useDispatch();
	const currentMenuState = useSelector(menuState);
	const handleClick = (e) => {
		e.preventDefault();

		if (!currentMenuState){
			
			dispatch(toggleMenu());
		}
	}
	
	return (
		<><div className='container'>
			
			
			<header>
				<Link to="/">
					<h2>noeddit</h2>
				</Link>
			<div className="header-overhang"><p>r/subReddit</p></div>
				<div className='header-right'>
					
					<SearchBar />
					
						<button onClick={handleClick}><MenuRoundedIcon style={{color: 'white'}} /></button>
					
				</div>

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
