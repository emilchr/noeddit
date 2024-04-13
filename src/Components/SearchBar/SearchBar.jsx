import React from 'react';
import './SearchBar.css';
import { SearchRounded } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchQuery, setSearchQuery } from '../../Features/SearchResults/searchResultsSlice';

export const SearchBar = () => {
	const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = useSelector(searchQuery);

	const handleSubmit = (e) => {
		e.preventDefault();

	};
  const handleChange = (e) => {
		const value = e.target.value;
    if (value){
    dispatch(setSearchQuery(value));
    } else {
      dispatch(setSearchQuery(''))
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
					<button type='submit'>
						<SearchRounded />
					</button>
				</div>
			</form>
		</>
	);
};
