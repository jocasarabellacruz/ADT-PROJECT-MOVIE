import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminSearchMovie.css';

axios.defaults.withCredentials = true;

const AdminSearchMovie = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
    
      const response = await axios.get(`http://localhost/admin_search?query=${query}`);
      
      console.log(response.data.results[0].original_title); 
      if (response.data.results) {
        setResults(response.data.results); 
      } else {
        setResults([]); 
        setError('No results found.'); 
      }
      setError(null); 
    } catch (err) {
      setError('Error fetching data. Please try again.');
      console.error(err);
    }
  };

  const handleCardClick = (tmdbId) => {
    navigate(`/admin_edit/${tmdbId}`);
  };

  return (
    <div className="container">
      <div className="search-card">
        <h1>Admin Search Movie</h1>
        <input
        className='input'
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button className="search-button" onClick={handleSearch}>Search</button>

        {error && <p>{error}</p>}
      </div>

      <div className="movie-list">
        {results.map((movie) => ( 
          <div 
            key={movie.id} 
            className="movie-card" 
            onClick={() => handleCardClick(movie.id)}
          >
            <h2>{movie.original_title}</h2>
            <img className="movie-poster" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.original_title} />
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSearchMovie;