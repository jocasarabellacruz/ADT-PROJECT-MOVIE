import React, { useState, useEffect } from 'react';
import "./MainMoviesPanel.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaFilm } from 'react-icons/fa';


const MainMoviesPanel = ({ movies, onDeleteMovie, onFavoriteUpdate, globalFavorites, setGlobalFavorites }) => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost/get_user');
                setUserId(response.data.UserID);
                setRole(response.data.Role);
            } catch (err) {
                console.error('Error fetching user data:', err);
            }
        };

        fetchUserData();
    }, []);

    const handleFavoriteToggle = async (e, movie) => {
        e.stopPropagation();
        try {
            const isFavorited = globalFavorites.some(fav => fav.movieId === movie.movieId);
            
            if (isFavorited) {
                await axios.delete(`http://localhost/remove_favorite?movieId=${movie.movieId}&userId=${userId}`);
                setGlobalFavorites(prev => prev.filter(fav => fav.movieId !== movie.movieId));
            } else {
                await axios.post('http://localhost/add_favorite', {
                    movieId: movie.movieId,
                    userId: userId
                });
                setGlobalFavorites(prev => [...prev, movie]);
            }
        } catch (err) {
            console.error('Error toggling favorite:', err);
        }
    };

    const handleAddMovie = () => {
        navigate("/admin_search");
    };

    const handleDeleteMovie = (e, movieId) => {
        e.stopPropagation();
        onDeleteMovie(movieId);
    };

    const handleCardClick = (movieId) => {
        navigate(`/view/${movieId}`);
    };

    return (
        <div className="main-movies-panel">
            <div className='head'>
            <h2 className="movies-header">
            <FaFilm className="movies-icon" /> Movies
            </h2>
                {role === 'Admin' && ( // Conditionally render the Add Movie button
                    <button className='addMovieBtn' onClick={handleAddMovie}>Add Movie</button>
                )}
            </div>

            <div className="movies-cards">
                {movies && movies.length > 0 ? (
                    movies.map((movie) => {
                        const isFavorited = globalFavorites.some(fav => fav.movieId === movie.movieId);
                        const descriptionPreview = movie.overview.length > 100
                            ? `${movie.overview.slice(0, 100)}...`
                            : movie.overview;

                        return (
                            <div 
                                key={movie.movieId} 
                                className="movie-card"
                                onClick={() => handleCardClick(movie.movieId)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={`${movie.posterPath || 'default-poster.jpg'}`}
                                    alt={movie.title}
                                    className="movie-poster1"
                                />
                                <div className="movie-details">
                                    <h3 className="movie-title">{movie.title}</h3>
                                    <p className="movie-description">
                                        {descriptionPreview}
                                        <span className="see-more">
                                            See more
                                        </span>
                                    </p>
                                    <button
                                        className={`favorite-button ${isFavorited ? 'favorited' : ''}`}
                                        onClick={(e) => handleFavoriteToggle(e, movie)}
                                    >
                                        {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
                                    </button>
                                    {role === 'Admin' && (
                                        <button
                                            className="watch-button"
                                            onClick={(e) => handleDeleteMovie(e, movie.movieId)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>No movies available.</p>
                )}
            </div>
        </div>
    );
};

export default MainMoviesPanel;
