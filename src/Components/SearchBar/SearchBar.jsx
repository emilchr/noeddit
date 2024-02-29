import React from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import './SearchBar.css';

export const SearchBar = () => {
  return (
    <form>
        <input type="search" name="search" id="search" />
        <button type="submit"><SearchRoundedIcon style={{color: 'white'}}/></button>
    </form>
  )
}
