import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ViewMovie.css"; 

const ViewMovie = () => {
  const { movieId } = useParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [movieDetails, setMovieDetails] = useState({
    title: "",
    overview: "",
    popularity: 0,
    release_date: "",
    vote_average: 0,
    backdrop_path: "",
    poster_path: "",
    cast: [],
    posters: [],
    videos: [],
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newCastMember, setNewCastMember] = useState({
    name: "",
    url: "",
    characterName: "",
  });
  const [newPhoto, setNewPhoto] = useState({ file_path: "", description: "" });
  const [newVideo, setNewVideo] = useState({
    name: "",
    site: "",
    key: "",
    type: "",
    official: false,
  });
  const [originalDetails, setOriginalDetails] = useState(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const response = await axios.get("http://localhost/get_user");
        setIsAdmin(response.data.Role === 'Admin');
      } catch (err) {
        console.error('Failed to fetch user role:', err);
      }
    };

    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://localhost/get_movie?movieId=${movieId}`);
        if (response.data.error) {
          setError(response.data.error);
          return;
        }
        setMovieDetails(response.data);
        setIsFeatured(response.data.isFeatured === 1);
      } catch (err) {
        setError("Error fetching movie details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost/get_user');
        setUserId(response.data.UserID);
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    checkUserRole();
    fetchMovieDetails();
    fetchUserData();
  }, [movieId]);

  const handleSaveChanges = async () => {
    try {
      if (!userId) {
        console.error("User ID is not available");
        return;
      }

      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

      const response = await axios.put(`http://localhost/update_movie?movieId=${movieId}`, {
        movieId: movieId,
        userId: userId,
        tmdbId: movieDetails.tmdbId,
        title: movieDetails.title,
        overview: movieDetails.overview,
        popularity: movieDetails.popularity,
        releaseDate: movieDetails.release_date,
        voteAverage: movieDetails.vote_average,
        backdropPath: movieDetails.backdrop_path,
        posterPath: movieDetails.poster_path,
        dateUpdated: currentDate,
        isFeatured: isFeatured ? 1 : 0,
        
        cast: movieDetails.cast.map(member => ({
          movieId: movieId,
          userId: userId,
          name: member.name,
          characterName: member.characterName,
          url: member.url
        })),

        posters: movieDetails.posters.map(poster => ({
          movieId: movieId,
          userId: userId,
          url: poster.url,
          description: poster.description || ''
        })),

        videos: movieDetails.videos.map(video => ({
          movieId: movieId,
          userId: userId,
          url: video.url,
          name: video.name,
          site: video.site,
          videoKey: video.videoKey,
          videoType: video.videoType,
          official: video.official
        }))
      });
      console.log(response.data);
      if (response.data.success) {
        setIsEditing(false);
        const updatedMovie = await axios.get(`http://localhost/get_movie?movieId=${movieId}`);
        setMovieDetails(updatedMovie.data);
        setOriginalDetails(updatedMovie.data);
      } else {
        console.error("Failed to update movie:", response.data.error);
      }
    } catch (err) {
      console.error("Error saving changes:", err);
    }
  };

  const handleRemoveItem = (type, index) => {
    setMovieDetails(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleStartEditing = () => {
    setOriginalDetails({...movieDetails}); // Store original state
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setMovieDetails(originalDetails);
    setIsFeatured(originalDetails.isFeatured === 1);
    setIsEditing(false);
  };

  const handleAddCastMember = () => {
    setMovieDetails({
      ...movieDetails,
      cast: [...movieDetails.cast, newCastMember],
    });
    setNewCastMember({ name: "", profile_path: "", characterName: "" });
  };

  const handleAddPhoto = () => {
    setMovieDetails({
      ...movieDetails,
      posters: [...movieDetails.posters, newPhoto],
    });
    setNewPhoto({ file_path: "", description: "" });
  };

  const handleAddVideo = () => {
    const newVideoData = {
      name: newVideo.name,
      videoKey: newVideo.key,
      site: newVideo.site,
      videoType: newVideo.type,
      official: newVideo.official,
      url: newVideo.key 
    };
    
    setMovieDetails({
      ...movieDetails,
      videos: [...movieDetails.videos, newVideoData]
    });
    setNewVideo({ name: "", site: "", key: "", type: "", official: false });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="wholecont">
      {isAdmin && (
        <div className="admin-controls">
          {isEditing ? (
            <div className="button-group">
              <button onClick={handleSaveChanges} className="save-button">Save Changes</button>
              <button onClick={handleCancelEditing} className="cancel-button">Cancel</button>
              <div className="feature-toggle">
                <label htmlFor="featureCheckbox">Featured</label>
                <input
                  type="checkbox"
                  id="featureCheckbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="checkFeatured"
                />
              </div>
            </div>
          ) : (
            <button onClick={handleStartEditing} className="edit-button">Edit</button>
          )}
        </div>
      )}

      <div className="movie-container">
        <div 
          className="movie-cardto" 
          style={{
            backgroundImage: `url(${movieDetails.backdrop_path})`
          }}
        >
          <div className="poster-container">
            <img src={movieDetails.poster_path} alt={movieDetails.title} className="poster-img" />
          </div>

          <div className="details">
            {isEditing ? (
              <>
                <div className="input-group">
                  <label>Title:</label>
                  <input
                    type="text"
                    value={movieDetails.title}
                    onChange={e => setMovieDetails({...movieDetails, title: e.target.value})}
                    className="title-input"
                  />
                </div>
                <div className="input-group">
                  <label>Overview:</label>
                  <textarea
                    value={movieDetails.overview}
                    onChange={e => setMovieDetails({...movieDetails, overview: e.target.value})}
                    className="overview-input"
                  />
                </div>
                <div className="input-row">
                  <div className="input-group third">
                    <label>Popularity:</label>
                    <input
                      type="number"
                      value={movieDetails.popularity}
                      onChange={e => setMovieDetails({...movieDetails, popularity: parseFloat(e.target.value)})}
                    />
                  </div>
                  <div className="input-group third">
                    <label>Release Date:</label>
                    <input
                      type="date"
                      value={movieDetails.release_date}
                      onChange={e => setMovieDetails({...movieDetails, release_date: e.target.value})}
                    />
                  </div>
                  <div className="input-group third">
                    <label>Vote Average:</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={movieDetails.vote_average}
                      onChange={e => setMovieDetails({...movieDetails, vote_average: parseFloat(e.target.value)})}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <h1 className="movietite">{movieDetails.title}</h1>
                <p className="overview">{movieDetails.overview}</p>
                <div className="movie-info">
                  <p><strong>Popularity:</strong> {movieDetails.popularity}</p>
                  <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
                  <p><strong>Vote Average:</strong> {movieDetails.vote_average}</p>
                </div>
              </>
            )}
          </div>
        </div>

        <h2 className="cast-header">Cast</h2>

        <div className="cast-section">
          {movieDetails.cast.map((member, index) => (
            <div key={index} className="cast-item">
              <img src={member.url} alt={member.name} className="cast-image" />
              {isEditing ? (
                <>

                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => {
                      const updatedCast = [...movieDetails.cast];
                      updatedCast[index] = { ...member, name: e.target.value };
                      setMovieDetails({ ...movieDetails, cast: updatedCast });
                    }}
                  />
                  <input
                    type="text"
                    
                    value={member.characterName}
                    onChange={(e) => {
                      const updatedCast = [...movieDetails.cast];
                      updatedCast[index] = { ...member, characterName: e.target.value };
                      setMovieDetails({ ...movieDetails, cast: updatedCast });
                    }}
                  />
                  <button 
                    className="remove-btn" 
                    onClick={() => handleRemoveItem('cast', index)}
                  >
                    Remove
                  </button>
                </>
              ) : (
                <>
                  <h3 className="charName">{member.name}</h3>
                  <p >{member.characterName}</p>
                </>
              )}
            </div>
          ))}
        </div>
       
        {isEditing && (
          <>
          <h2 className="cast-header">Add New Cast Member</h2>
          <div className="addCastMember">
            <div className="formGroupCast">
              <div className="left">
                <label>Name:</label>
                <input
                  type="text"
                  value={newCastMember.name}
                  onChange={(e) => setNewCastMember({ ...newCastMember, name: e.target.value })}
                  placeholder="Enter name"
                />
              </div>
              <div className="right">
                <label>Character:</label>
                <input
                  type="text"
                  value={newCastMember.characterName}
                  onChange={(e) => setNewCastMember({ ...newCastMember, characterName: e.target.value })}
                  placeholder="Enter character name"
                />
              </div>
            </div>
            <label>Profile Image URL:</label>
            <input
              type="text"
              value={newCastMember.url}
              onChange={(e) => setNewCastMember({ ...newCastMember, url: e.target.value })}
              placeholder="Enter profile image URL"
            />
            <button className="addBtn" onClick={handleAddCastMember}>Add Cast Member</button>
          </div>
          </>
        )}


        <h2 className="cast-header">Photos</h2>
        <div className="photo-gallery">
          {movieDetails.posters.map((poster, index) => (
            <div key={index} className="photo-card">
              <img src={poster.url} alt={`Poster ${index + 1}`} className="poster-image" />
              {isEditing && (
                <button 
                  className="remove-btn" 
                  onClick={() => handleRemoveItem('posters', index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        {isEditing && (
          <>
          <h2 className="cast-header">Add New Photo</h2>
          <div className="addCastMember">
            <label>URL:</label>
            <input
              type="text"
              value={newPhoto.url}
              onChange={(e) => setNewPhoto({ ...newPhoto, url: e.target.value })}
              placeholder="Enter photo URL"
            />
            <button className="addBtn" onClick={handleAddPhoto}>Add Photo</button>
          </div>
          </>
        )}

        <h2 className="cast-header">Videos</h2>
        <div className="video-gallery">
          {movieDetails.videos.map((video, index) => (
            <div key={index} className="video-card">
              <iframe
                src={`${video.url}`}
                title={video.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-frame"
              />
              <div className="video-title">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={video.name}
                      onChange={(e) => {
                        const updatedVideos = [...movieDetails.videos];
                        updatedVideos[index] = { ...video, name: e.target.value };
                        setMovieDetails({ ...movieDetails, videos: updatedVideos });
                      }}
                      className="video-title-input"
                    />
                    <button 
                      className="remove-btn" 
                      onClick={() => handleRemoveItem('videos', index)}
                    >
                      Remove
                    </button>
                  </>
                ) : (
                  <h3>{video.name}</h3>
                )}
              </div>
            </div>
          ))}
        </div>
        {isEditing && (
          <>
            <h2 className="cast-header">Add New Video</h2>
            <div className="addCastMember">
              <div className="formGroupCast">
                <div className="left">
                  <label>Video Title:</label>
                  <input
                    type="text"
                    value={newVideo.name}
                    onChange={(e) => setNewVideo({ ...newVideo, name: e.target.value })}
                    placeholder="Enter video title"
                    className="video-title-input"
                  />
                </div>
                <div className="right">
                  <label>Video Key (YouTube):</label>
                  <input
                    type="text"
                    value={newVideo.key}
                    onChange={(e) => setNewVideo({ ...newVideo, key: e.target.value })}
                    placeholder="Enter YouTube Embed Video Code"
                    className="video-title-input"
                  />
                </div>
              </div>

              <div className="formGroupCast">
                <div className="left">
                  <label>Site:</label>
                  <input
                    type="text"
                    value={newVideo.site}
                    onChange={(e) => setNewVideo({ ...newVideo, site: e.target.value })}
                    placeholder="Enter site name"
                    className="video-title-input"
                  />
                </div>
                <div className="right">
                  <label>Type:</label>
                  <input
                    type="text"
                    value={newVideo.type}
                    onChange={(e) => setNewVideo({ ...newVideo, type: e.target.value })}
                    placeholder="Enter video type"
                    className="video-title-input"
                  />
                </div>
              </div>

              <button className="addBtn" style={{marginTop: '10px'}} onClick={handleAddVideo}>Add Video</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewMovie; 