import React from 'react';
import './SearchBar.css';
import { SearchRounded } from '@mui/icons-material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	searchQuery,
	setSearchQuery,
} from '../../Features/SearchResults/searchResultsSlice';
import { toggleSearch } from '../../Features/userUi/userUiSlice';

export const SearchBar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const query = useSelector(searchQuery);

	const handleSubmit = (e) => {
		e.preventDefault();
		setSearchParams({ q: query });
		navigate(`/search?q=${encodeURIComponent(query)}`);
		dispatch(toggleSearch()); //turns of search bar modal
	};
	const handleChange = (e) => {
		const value = e.target.value;
		if (value) {
			dispatch(setSearchQuery(value));
		} else {
			dispatch(setSearchQuery(''));
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="search-modal">
					<input
						type="search"
						name="search"
						id="search"
						placeholder="Search..."
						value={query}
						onChange={handleChange}
					/>
					<button type="submit">
						<SearchRounded />
					</button>
				</div>
			</form>
		</>
	);
};
