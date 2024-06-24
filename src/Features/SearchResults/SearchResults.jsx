import React from 'react';
import { useSelector } from 'react-redux';
import { searchQuery } from './searchResultsSlice';
// import { PostList } from '../../Components/PostList/PostList';
import { useSearchParams } from 'react-router-dom';

function SearchResults() {
	const [searchParams] = useSearchParams();

	return (
		<div>
			<h2>Search results</h2>
			<div>
				{' '}
				Search result for: {
					searchParams.toString() /* Not a good option */
				}{' '}
			</div>
			<div>Number of results: {/* INSERT NUMBER OF RESULTS */}</div>
		</div>
	);
}

export default SearchResults;
