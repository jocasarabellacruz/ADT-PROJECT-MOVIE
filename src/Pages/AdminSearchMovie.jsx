import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminSearchMovie.css';

axios.defaults.withCredentials = true;

const AdminSearchMovie = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const moviesPerPage = 6;
  
  const navigate = useNavigate();
  const defaultPosterPath = "https://th.bing.com/th/id/OIP.lEADQMbDYsJ97C5U-r8j5AHaGo?rs=1&pid=ImgDetMain";

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost/admin_search?query=${query}`);
      
      if (response.data.results) {
        setResults(response.data.results);
        setTotalPages(Math.ceil(response.data.results.length / moviesPerPage));
        setCurrentPage(1);
        setError(null);
      } else {
        setResults([]);
        setError('No results found.');
        setTotalPages(0);
      }
    } catch (err) {
      setError('Error fetching data. Please try again.');
      console.error(err);
    }
  };

  const handleCardClick = (tmdbId) => {
    navigate(`/admin_edit/${tmdbId}`);
  };

  // Get current movies
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = results.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`pagination-button ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="container">
      <div className="search-card">
        <h1>Admin Search Movie</h1>
        <p className="adminSearchDescription">Find and manage movies in the TMDB database.</p>
        <input
          className='adminSearchinput'
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button className="adminsearch-button" onClick={handleSearch}>Search</button>

        {error && <p className="error-message">{error}</p>}
      </div>

      {results.length > 0 && (
        <>
          <div className="movie-list">
            {currentMovies.map((movie) => ( 
              <div 
                key={movie.id} 
                className="movie-card1" 
                onClick={() => handleCardClick(movie.id)}
              >
                <img 
                  className="movie-poster" 
                  src={movie.poster_path ? 
                    `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : defaultPosterPath} 
                  alt={movie.title} 
                />
                <h2>{movie.title}</h2>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button 
              className="pagination-button"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {renderPaginationButtons()}
            <button 
              className="pagination-button"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminSearchMovie;