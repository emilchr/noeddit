import React from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import './SearchBar.css';

export const SearchBar = () => {
  return (
    <form>
        <div className='search-modal'>
          <input type="search" name="search" id="search" />
        </div>
        <button type="submit"><SearchRoundedIcon style={{color: 'white'}}/></button>
    </form>
  )
}
