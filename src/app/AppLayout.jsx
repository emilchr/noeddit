import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import SubReddits from '../Features/SubReddit/SubReddits';
import './AppLayout.css';
import { SearchBar } from '../Components/SearchBar/SearchBar';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useDispatch, useSelector } from 'react-redux';
import { menuState, toggleMenu } from '../Features/userUiSlice/userUiSlice';

export default function AppLayout() {

	const dispatch = useDispatch();
	const currentMenuState = useSelector(menuState);
	
	const handleClick = (e) => {
		e.preventDefault();
		if (!currentMenuState){ // Check if currentMenuState is false (it should be false).
			
			// Shows the navigation 
		}
		dispatch(toggleMenu());
		console.log('Toggled menu state: ' + currentMenuState)
	}
	
	return (
		<><div className='container'>
			
			
			<header>
				<Link to="/">
					<h2>noeddit</h2>
				</Link>
			<div className="header-overhang"><p>r/subReddit</p></div>
			{!currentMenuState ? 
				null
				:
				<div className='modal-background'></div>
				}
				<div className='header-right'>
				<button className='toggle-button'><SearchRoundedIcon style={{color: 'white'}}/></button>

					<SearchBar />
					
					<button 
					className='toggle-button' 
					onClick={handleClick}>
						{!currentMenuState ? 
						<MenuRoundedIcon style={{color: 'white'}} />
						:
						<CloseRoundedIcon style={{color: 'white'}} />
						}
					</button>
					
				</div>
				{!currentMenuState ? null 
				: 
				<nav>
					<SubReddits />				
				</nav>}
			</header>

				

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
