import React from 'react';
import './SearchBar.css';
import { SearchRounded } from '@mui/icons-material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSearchResults,
  searchQuery,
  setSearchQuery,
} from '../../Features/SearchResults/searchResultsSlice';
import { setSubreddit, toggleSearch } from '../../Features/userUi/userUiSlice';
import { setLoading } from '../../Features/Posts/postsSlice';

export const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const query = useSelector(searchQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(setSubreddit('SearchResults'));
    setSearchParams({ q: query });
    navigate(`/search?q=${encodeURIComponent(query)}`);
    dispatch(fetchSearchResults(query));
    dispatch(toggleSearch()); //turns of search bar modal
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1500);
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
