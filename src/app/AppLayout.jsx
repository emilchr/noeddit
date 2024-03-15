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
import { menuState, searchState, toggleMenu, toggleSearch } from '../Features/userUiSlice/userUiSlice';

export default function AppLayout() {

	const dispatch = useDispatch();
	const currentMenuState = useSelector(menuState);
	const currentSearchState = useSelector(searchState);
	
	const handleMenuClick = (e) => {
		e.preventDefault();
		
		dispatch(toggleMenu());
		// console.log('Toggled menu state: ' + currentMenuState)
	}
	const handleSearchClick = (e) => {
		e.preventDefault();
		
		dispatch(toggleSearch());
		// console.log('Toggled menu state: ' + currentMenuState)
	}
	let modalBackground = '';
	if (currentMenuState || currentSearchState){ // if one condition is true, modalBackground is displayed.
		modalBackground = <div className='modal-background'></div>
	}
	
	return (
		<><div className='container'>
			
			
			<header>
				<Link to="/">
					<h2>noeddit</h2>
				</Link>
			<div className="header-overhang"><p>r/subReddit</p></div>
			
				{ // Displays modalBackground.
					modalBackground 
				}

				<div className='header-right'>
				<button className='toggle-button' onClick={handleSearchClick}>
					
					{!currentSearchState ? 
							<SearchRoundedIcon style={{color: 'white'}}/>
							:
							<CloseRoundedIcon style={{color: 'white'}} />
						}
				</button>
				{!currentSearchState ? null 
					: 	
					<SearchBar />
				}
					<button 
					className='toggle-button' 
					onClick={handleMenuClick}>
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
					</nav>
				}
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
