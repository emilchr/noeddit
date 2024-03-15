import React from 'react';
import './SearchBar.css';

export const SearchBar = () => {
  return (
    <>
    <form>
        <div className='search-modal'>
          <div className="search-modal-top"></div>
          <input type="search" name="search" id="search" placeholder='Search...' />
        </div>
    </form>
    </>
  )
}
