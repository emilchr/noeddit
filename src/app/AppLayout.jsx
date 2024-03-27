import React, { useEffect } from 'react';
import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { menuState, searchState, toggleMenu, toggleSearch } from '../Features/userUi/userUiSlice';
import SubReddits from '../Features/SubReddit/SubReddits';
import './AppLayout.css';
import { SearchBar } from '../Components/SearchBar/SearchBar';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { fetchLinks } from '../Features/SubReddit/subRedditsSlice';

export default function AppLayout() {

	const dispatch = useDispatch();
	const currentMenuState = useSelector(menuState);
	const currentSearchState = useSelector(searchState);
	
	const navigate = useNavigate();
	
	useEffect(() => {
		dispatch(fetchLinks()); //Fetches links from API on page load. 
	}, [dispatch]);

	const handleMenuClick = (e) => {
		e.preventDefault();
		
		const toggleMenuButton = document.getElementById('toggle-menu');
		toggleMenuButton.checked 
		? toggleMenuButton.checked = false 
		: toggleMenuButton.checked = true;// Toggles the checkbox on or off

		dispatch(toggleMenu());
	};

	const handleSearchClick = (e) => {
		e.preventDefault();
		
		dispatch(toggleSearch());
	};

	const handleDisableClick = () => { // handles disabling modal when user clicks outside the container.
		if (currentMenuState === true){
			dispatch(toggleMenu());

			const toggleMenuButton = document.getElementById('toggle-menu');
			toggleMenuButton.checked 
			? toggleMenuButton.checked = false // Toggles the checkbox off if true
			: toggleMenuButton.checked = true;

		} else if (currentSearchState === true){
			dispatch(toggleSearch());
		};
	}

	let modalBackground = '';
	if (currentMenuState || currentSearchState){ // if one condition is true, modalBackground is displayed.
		modalBackground = <div className='modal-background' onClick={handleDisableClick}></div>
	};

	return (
		<>
		<div className='container'>
			
			<header>
				
					<h2 onClick={() => {navigate('/')}}>noeddit</h2>
				
			<div className="header-overhang"><p>r/subReddit</p></div>
			
				{ // Displays modalBackground.
					modalBackground 
				}

			<div className='header-right'>
				<button className='toggle-button' onClick={handleSearchClick}>

					{!currentSearchState ? 
						<SearchRoundedIcon style={{color: 'white'}} />
						:
						<CloseRoundedIcon style={{color: 'white'}} />
					}
				</button>
					{!currentSearchState ? 
						null
						:
						<SearchBar />
					}

				<label className='toggle-button' onClick={handleMenuClick}>
					{!currentMenuState ? 
						<MenuRoundedIcon style={{color: 'white'}} />
						:
						<CloseRoundedIcon style={{color: 'white'}} />
					}
				</label>
						
			</div>
				<nav>
				<input type='checkbox' id='toggle-menu'></input>
					{!currentMenuState ? 
						null
						:
						<SubReddits />
					}			
				</nav>
				
			</header>

			<main>
				<Outlet />
			</main>
			<footer>
		Made with <FavoriteRoundedIcon style={{color: 'red'}} /> by Emil
		</footer>						
		</div>

		
		<ScrollRestoration
			getKey={(location) => {
				const paths = ['/posts'];
				return paths.includes(location.pathname)
				? // posts restore by pathname
					location.pathname
				: // everything else by location like the browser
					location.key;
			}}
		/> 
	</>
	);
}
