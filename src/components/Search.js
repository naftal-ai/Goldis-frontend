import React from 'react'
import searchIcon from '../assets/search.svg';

const Search = ({ setSearchValue }) => {
  return (
    <div className='search'>
      <img src={searchIcon} alt="search" />
      <input type="text" placeholder='Search' onChange={(e) => setSearchValue(e.target.value)}/>
    </div>
  )
}

export default Search