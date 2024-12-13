import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './FeaturedMovies.css';

const FeaturedMovies = () => {
  const [featured, setFeatured] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        const response = await fetch('/featured_movie'); 
        const data = await response.json();

  
        if (response.ok) {
          setFeatured(data); 
        } else {
          throw new Error('Failed to fetch featured movies');
        }
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchFeaturedMovies();
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="featured-movies">
      <h1>Featured Movies</h1>
      <Slider {...settings}>
        {featured.map((movie) => (
          <div key={movie.movieId} className="carousel-slide">
            <img className="carousel-poster" src={movie.posterPath} alt={movie.title} />
            <h3 className="carousel-title">{movie.title}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedMovies;
