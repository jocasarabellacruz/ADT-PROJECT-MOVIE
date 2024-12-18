import React, { useState, useEffect } from 'react';
import "./MainMoviesPanel.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MainMoviesPanel = ({ movies, onDeleteMovie, onFavoriteUpdate, globalFavorites, setGlobalFavorites }) => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [expandedMovies, setExpandedMovies] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost/get_user');
                setUserId(response.data.UserID);
            } catch (err) {
                console.error('Error fetching user data:', err);
            }
        };

        fetchUserData();
    }, []);

    const handleFavoriteToggle = async (e, movie) => {
        e.stopPropagation(); // Prevent card click when toggling favorite
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
            
            if (onFavoriteUpdate) {
                onFavoriteUpdate();
            }
        } catch (err) {
            console.error('Error toggling favorite:', err);
        }
    };

    const handleAddMovie = () => {
        navigate("/admin_search");
    };

    const handleDeleteMovie = (e, movieId) => {
        e.stopPropagation(); // Prevent card click when deleting
        onDeleteMovie(movieId);
    };

    const handleCardClick = (movieId) => {
        navigate(`/view/${movieId}`);
    };

    const toggleDescription = (e, movieId) => {
        e.stopPropagation();
        setExpandedMovies(prev => ({
            ...prev,
            [movieId]: !prev[movieId]
        }));
    };

    return (
        <div className="main-movies-panel">
            <div className='head'>
                <h2 className="movies-header">Movies</h2>
                <button className='addMovieBtn' onClick={handleAddMovie}>Add Movie</button>
            </div>

            <div className="movies-cards">
                {movies && movies.length > 0 ? (
                    movies.map((movie) => {
                        const isExpanded = expandedMovies[movie.movieId] || false;
                        const isFavorited = globalFavorites.some(fav => fav.movieId === movie.movieId);
                        const descriptionPreview = movie.overview.length > 100
                            ? `${movie.overview.slice(0, 100)}...`
                            : movie.overview;

                        return (
                            <div key={movie.movieId} className={`movie-card ${isExpanded ? 'expanded' : ''}`} onClick={() => handleCardClick(movie.movieId)}>
                                <img
                                    src={`${movie.posterPath || 'default-poster.jpg'}`}
                                    alt={movie.title}
                                    className="movie-poster1"
                                />
                                <div className="movie-details">
                                    <h3 className="movie-title">{movie.title}</h3>
                                    <p className="movie-description">
                                        {isExpanded ? movie.overview : descriptionPreview}
                                        {movie.overview.length > 100 && (
                                            <span
                                                className="see-more"
                                                onClick={(e) => toggleDescription(e, movie.movieId)}
                                            >
                                                {isExpanded ? " See less" : " See more"}
                                            </span>
                                        )}
                                    </p>
                                    <button
                                        className={`favorite-button ${isFavorited ? 'favorited' : ''}`}
                                        onClick={(e) => handleFavoriteToggle(e, movie)}
                                    >
                                        {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
                                    </button>
                                    <button
                                        className="watch-button"
                                        onClick={(e) => handleDeleteMovie(e, movie.movieId)}
                                    >
                                        Delete
                                    </button>
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
