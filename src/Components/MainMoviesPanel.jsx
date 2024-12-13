import React from "react";
import "./MainMoviesPanel.css";

const MainMoviesPanel = ({ movies, onWatch, onAddToFavorites }) => {
  return (
    <div className="main-movies-panel">
      {/* Header Section */}
      <h2 className="movies-header">Movies</h2>

      {/* Movie Cards */}
      <div className="movies-cards">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={movie.poster}
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-details">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-description">{movie.description}</p>
              <button
                className="watch-button"
                onClick={() => onWatch(movie.id)}
              >
                Watch
              </button>
              <button
                className="watch-button"
                onClick={() => onAddToFavorites(movie)}
              >
                Add to Favorites
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainMoviesPanel;
