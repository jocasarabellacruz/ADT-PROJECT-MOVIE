import React, { useState, useEffect } from 'react';
import NavBar from '../Components/NavBar';
import FeaturedMovies from '../Components/FeaturedMovies';
import MainMoviesPanel from '../Components/MainMoviesPanel';
import SearchBar from '../Components/SearchBar';
import FavoritesPanel from '../Components/FavoritesPanel';
import Account from '../Components/Account';
import axios from 'axios';
import './HomePage.css';

axios.defaults.withCredentials = true;

const HomePage = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'Inception',
      poster: 'https://via.placeholder.com/150',
      description: 'A mind-bending thriller about dreams within dreams.',
    },
    {
      id: 2,
      title: 'Interstellar',
      poster: 'https://via.placeholder.com/150',
      description: 'A journey beyond the stars to save humanity.',
    },
    {
      id: 3,
      title: 'The Dark Knight',
      poster: 'https://via.placeholder.com/150',
      description: 'A gritty and realistic take on Batman.',
    },
    
  ]);

  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost/get_user");
      console.log('User:', response.data);
    } catch (err) {
      console.error(err);
    }
  };
  

  useEffect(() => {
    getUser();
  }, []); 

  // Handle search input
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Filter movies based on search term
  const filteredMovies = searchTerm
    ? movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : movies;

  // Add to favorites
  const handleAddToFavorites = (movie) => {
    // Check if movie is already in favorites
    if (!favorites.some((fav) => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  // Watch movie (example function)
  const handleWatch = (id) => {
    alert(`Watching movie with ID: ${id}`);
  };

  return (
    <div className="home-page">
      <div className="sidebar">
        <NavBar />
      </div>
      <div className="main-content">
        <div className="top-row">
          <div className="account">
            <Account />
          </div>
          <div className="search">
            <SearchBar onSearch={handleSearch} />
          </div>
          
        </div>
        <div className="featured">
            <FeaturedMovies featured={filteredMovies.slice(0, 5)} />
          </div>
        <div className="bottom-row">
          <div className="main-movies">
            <MainMoviesPanel
              movies={filteredMovies}
              onWatch={handleWatch}
              onAddToFavorites={handleAddToFavorites}
            />
          </div>
          <div className="favorites">
            <FavoritesPanel favorites={favorites} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
