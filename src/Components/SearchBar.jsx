import React from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onSubmit }) => {
  const handleInputChange = (e) => onSearch(e.target.value);

  const handleSearchClick = () => {
    onSubmit(); // Trigger the search when button is clicked
  };

  return (
    <div className="search-bar-panel">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search movies..." 
          onChange={handleInputChange} 
        />
        <button className="search-btn" onClick={handleSearchClick}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
