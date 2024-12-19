import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FavoritesPanel.css';
import { FaHeart } from 'react-icons/fa';


const FavoritesPanel = ({ globalFavorites, setGlobalFavorites }) => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndFavorites = async () => {
      try {
        const userResponse = await axios.get('http://localhost/get_user');
        setUserId(userResponse.data.UserID);
        
        const favoritesResponse = await axios.get(`http://localhost/get_favorite?userId=${userResponse.data.UserID}`);
        setGlobalFavorites(favoritesResponse.data.favorites || []);
      } catch (err) {
        console.error('Error fetching favorites:', err);
      }
    };

    fetchUserAndFavorites();
  }, [setGlobalFavorites]);

  const handleRemoveFavorite = async (e, movieId) => {
    e.stopPropagation();
    try {
      await axios.delete(`http://localhost/remove_favorite?movieId=${movieId}&userId=${userId}`);
      const newFavorites = globalFavorites.filter(movie => movie.movieId !== movieId);
      setGlobalFavorites(newFavorites);
    } catch (err) {
      console.error('Error removing favorite:', err);
    }
  };

  const handleCardClick = (movieId) => {
    navigate(`/view/${movieId}`);
  };

  return (
    <div className="favorites-panel">
      <h2 className="favorites-header"><FaHeart className="movies-icon" />Favorites</h2>
      {(!globalFavorites || globalFavorites.length === 0) ? (
        <div className="no-favorites-message">
          <p>No favorites added yet.</p>
        </div>
      ) : (
        <div className="favorites-cards">
          {globalFavorites.map((movie) => (
            <div 
              key={movie.movieId} 
              className="favorite-card"
              onClick={() => handleCardClick(movie.movieId)}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src={movie.posterPath || 'default-poster.jpg'} 
                alt={movie.title} 
                className="favorite-poster" 
              />
              <h3 className="favorite-title">{movie.title}</h3>
              <button
                className="remove-favorite"
                onClick={(e) => handleRemoveFavorite(e, movie.movieId)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPanel;
