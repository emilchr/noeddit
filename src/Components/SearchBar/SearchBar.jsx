import React from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import './SearchBar.css';

export const SearchBar = () => {
  return (
    <form>
        <div className='search-modal'>
          <div className="search-modal-top"><CloseRoundedIcon /></div>
          <input type="search" name="search" id="search" placeholder='Search...' />
        </div>
        <button type="submit"><SearchRoundedIcon style={{color: 'white'}}/></button>
    </form>
  )
}
