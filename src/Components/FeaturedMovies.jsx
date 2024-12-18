import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeaturedMovies.css';
import axios from 'axios';

const FeaturedMovies = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const searchFeatured = async () => {
    try {
      const response = await axios.get("http://localhost/get_featured");
      if (Array.isArray(response.data)) {
        setFeatured(response.data);
        setError(null);
      } else {
        setFeatured([]);
        setError('No results found.');
      }
    } catch (err) {
      setError('Error fetching data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchFeatured();
  }, []); 

  const handleCardClick = (movieId) => {
    navigate(`/view/${movieId}`);
  };

  return (
    <div className="featured-movies">
      <h1 className='featHeader'>Featured Movies</h1>
      {loading ? (
        <p>Loading featured movies...</p>
      ) : error ? (
        <p>{error}</p>
      ) : featured.length === 0 ? (
        <p>No featured movies available at the moment.</p>
      ) : (
        <div className="featured-movies-grid">
          {featured.slice(0, 6).map((movie) => (
            <div 
              key={movie.movieId} 
              className="featured-movie-card"
              onClick={() => handleCardClick(movie.movieId)}
              style={{ cursor: 'pointer' }}
            >
              <img
                className="featured-movie-poster"
                src={movie.posterPath || 'default-poster.jpg'}
                alt={movie.title}
              />
              <h3 className="featured-movie-title">{movie.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedMovies;
