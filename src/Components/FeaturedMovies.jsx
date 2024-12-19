import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeaturedMovies.css';
import axios from 'axios';
import { GiTicket } from 'react-icons/gi';


const FeaturedMovies = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  useEffect(() => {
    if (featured.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === featured.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [featured]);

  const handleCardClick = (movieId) => {
    navigate(`/view/${movieId}`);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === featured.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? featured.length - 1 : prevIndex - 1
    );
  };

  if (loading) return <p>Loading featured movies...</p>;
  if (error) return <p>{error}</p>;
  if (featured.length === 0) return <p>No featured movies available at the moment.</p>;

  return (
    <div className="featured-movies">
      <h1 className='featHeader'><GiTicket className="movies-icon" />Featured Movies</h1>
      <div className="carousel-container">
        <button className="carousel-button prev" onClick={prevSlide}>❮</button>
        <div className="carousel-content">
          {featured.map((movie, index) => (
            <div 
              key={movie.movieId}
              className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleCardClick(movie.movieId)}
              style={{ cursor: 'pointer' }}
            >
              <img
                className="carousel-movie-backdrop"
                src={movie.backdropPath || 'default-backdrop.jpg'}
                alt={movie.title}
              />
              <div className="carousel-overlay">
                <div className="movie-details">
                  <h2 className="movie-title">{movie.title}</h2>
                  <div className="movie-meta">
                    <span className="release-date">
                      {new Date(movie.releaseDate).getFullYear()}
                    </span>
                    <span className="rating">
                      ★ {movie.voteAverage.toFixed(1)}
                    </span>
                    <span className="popularity">
                      Popularity: {Math.round(movie.popularity)}
                    </span>
                  </div>
                  <p className="movie-overview">{movie.overview}</p>
                  <button className="watch-now-btn" onClick={() => handleCardClick(movie.movieId)}>
                    Watch Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-button next" onClick={nextSlide}>❯</button>
      </div>
    </div>
  );
};

export default FeaturedMovies;
