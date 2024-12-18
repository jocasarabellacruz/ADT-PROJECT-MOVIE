import { useState, useEffect, useRef, useCallback } from 'react';
import './SearchBar.css';
import axios from 'axios';

axios.defaults.withCredentials = true;

const SearchBar = ({ onSearch, onSubmit }) => {
  const [search, setSearch] = useState('');
  const handleInputChange = (e) => onSearch(e.target.value);

  const handleSearchClick = () => {
    searchMovies();
    //alert(search);
    //onSubmit(); // Trigger the search when button is clicked
  };

  const searchMovies = async () => {
    const data = { search: search };
    try {
      const response = await axios.post("http://localhost/search_movie", data);

      console.log('Search:', response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="search-bar-panel">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search movies..." 
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearchClick}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
