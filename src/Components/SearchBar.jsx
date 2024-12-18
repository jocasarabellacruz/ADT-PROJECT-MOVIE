import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, searchTerm }) => {
  const [search, setSearch] = useState(searchTerm || '');

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    onSearch(search);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar-panel">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search movies..." 
          value={search}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button 
          className="search-button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
