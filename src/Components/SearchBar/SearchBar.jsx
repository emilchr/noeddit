import React from 'react';
import './SearchBar.css';
import { SearchRounded } from '@mui/icons-material';

export const SearchBar = () => {
  return (
    <>
    <form>
        <div className='search-modal'>
          <div className="search-modal-top"></div>
          <input type="search" name="search" id="search" placeholder='Search...' />
          <button>
            <SearchRounded />
          </button>
        </div>
    </form>
    </>
  )
}
