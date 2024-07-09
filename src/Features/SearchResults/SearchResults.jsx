import React from 'react';
import './SearchResults.css';

import { useSearchParams } from 'react-router-dom';
import { PostList } from '../../Components/PostList/PostList';

function SearchResults() {
  const [searchParams] = useSearchParams();

  return (
    <>
      <div className="searchResults-container">
        <h2>Search results</h2>
        <p>Search result for: {Object.fromEntries(searchParams).q}</p>
      </div>
      <PostList />
    </>
  );
}

export default SearchResults;
