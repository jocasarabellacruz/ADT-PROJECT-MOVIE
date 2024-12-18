import React, { useEffect, useState } from 'react';
import './FeaturedMovies.css';
import axios from 'axios';

const FeaturedMovies = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const searchFeatured = async () => {
      try {
        const response = await axios.get("http://localhost/get_featured");
        //console.log('API Response:', response.data); // Log API response
        if (response.data) {
            setFeatured(response.data);
        } else {
            setFeatured([]);
          setError('No results found.');
        }
        setError(null);
      } catch (err) {
        setError('Error fetching data. Please try again.');
        console.error(err);
      }
    };

    useEffect(() => {
        searchFeatured();
    }, []); 

    useEffect(() => {
        if (featured.length > 0) {
        console.log('Featured:', featured);
        }
    }, [featured]);

  // Render movies in a single row
  return (
    <div className="featured-movies">
      <h1>Featured Movies</h1>
      <div className="featured-movies-grid">
        {featured.slice(0, 6).map((movie) => (
          <div key={movie.movieId} className="featured-movie-card">
            <img 
              className="featured-movie-posterr"
              src={`${movie.posterPath || 'default-poster.jpg'}`}
              alt={movie.title}
            />
            <h3 className="featured-movie-title">{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedMovies;
