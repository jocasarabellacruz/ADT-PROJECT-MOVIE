import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation();
  const [movieData, setMovieData] = useState({
    allMovies: [],
    filteredMovies: [],
    favorites: [],
    searchTerm: ''
  });
  const [globalFavorites, setGlobalFavorites] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost/get_movies");
      if (response.data) {
        setMovieData(prev => ({
          ...prev,
          allMovies: response.data,
          filteredMovies: response.data
        }));
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []); 

  useEffect(() => {
    if (location.state?.refresh) {
      fetchMovies();
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Centralized handlers
  const handleSearch = (term) => {
    const searchTerm = term.toLowerCase().trim();
    
    if (searchTerm === '') {
      setMovieData(prev => ({
        ...prev,
        searchTerm: '',
        filteredMovies: prev.allMovies
      }));
    } else {
      const filtered = movieData.allMovies.filter((movie) => 
        movie.title.toLowerCase().includes(searchTerm)
      );
      
      setMovieData(prev => ({
        ...prev,
        searchTerm: term,
        filteredMovies: filtered
      }));
    }
  };

  const handleAddToFavorites = (movie) => {
    if (!movieData.favorites.some((fav) => fav.id === movie.id)) {
      setMovieData(prev => ({
        ...prev,
        favorites: [...prev.favorites, movie]
      }));
    }
  };

    const handleWatch = async (id) => {
      try {
        const response = await axios.get("http://localhost/get_user");
        navigate(`/view/${id}`);
      } catch (err) {
        console.error('Failed to fetch user role:', err);
    }
  };

  const handleRefreshMovies = async () => {
    await fetchMovies();
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      const response = await axios.delete(`http://localhost/delete_movie?movieId=${movieId}`);
      if (response.data.success) {
        // Update both allMovies and filteredMovies after deletion
        setMovieData(prev => ({
          ...prev,
          allMovies: prev.allMovies.filter(movie => movie.movieId !== movieId),
          filteredMovies: prev.filteredMovies.filter(movie => movie.movieId !== movieId)
        }));
      }
    } catch (err) {
      console.error("Error deleting movie:", err);
    }
  };

  const handleFavoriteUpdate = async () => {
    try {
      const userResponse = await axios.get('http://localhost/get_user');
      const favoritesResponse = await axios.get(`http://localhost/get_favorite?userId=${userResponse.data.UserID}`);
      setGlobalFavorites(favoritesResponse.data.favorites || []);
    } catch (err) {
      console.error('Error updating favorites:', err);
    }
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
            <SearchBar 
              onSearch={handleSearch}
              searchTerm={movieData.searchTerm}
            />
          </div>
        </div>
        <div className="featured">
          <FeaturedMovies 
            movies={movieData.allMovies}
          />
        </div>
        <div className="bottom-row">
          <div className="main-movies">
            <MainMoviesPanel
              movies={movieData.filteredMovies}
              onWatch={handleWatch}
              onAddToFavorites={handleAddToFavorites}
              onDeleteMovie={handleDeleteMovie}
              refreshMovies={handleRefreshMovies}
              onFavoriteUpdate={handleFavoriteUpdate}
              setGlobalFavorites={setGlobalFavorites}
              globalFavorites={globalFavorites}
            />
          </div>
          <div className="favorites">
            <FavoritesPanel 
              globalFavorites={globalFavorites}
              setGlobalFavorites={setGlobalFavorites}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
