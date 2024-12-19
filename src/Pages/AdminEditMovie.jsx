import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./AdminEditMovie.css";
import { useNavigate, Link } from 'react-router-dom';

const AdminEditMovie = () => {
  const { tmdbId } = useParams();
  const navigate = useNavigate();
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
    results: [],
  });
  const [error, setError] = useState(null);

  const [newCastMember, setNewCastMember] = useState({
    name: "",
    profile_path: "",
    character: "",
  });
  const [newPhoto, setNewPhoto] = useState({ file_path: "", description: "" });
  const [newVideo, setNewVideo] = useState({
    name: "",
    site: "",
    key: "",
    type: "",
    official: false,
  });
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost/admin_edit?tmbd_id=${tmdbId}`
        );

        const data = response.data;

        console.log(data)

        const processedData = {
          ...data,
          poster_path: data.poster_path
            ? `https://image.tmdb.org/t/p/original${data.poster_path}`
            : "https://th.bing.com/th/id/OIP.lEADQMbDYsJ97C5U-r8j5AHaGo?rs=1&pid=ImgDetMain",
          backdrop_path: data.backdrop_path
            ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
            : 'https://th.bing.com/th/id/OIP.lEADQMbDYsJ97C5U-r8j5AHaGo?rs=1&pid=ImgDetMain',
          cast: data.cast.slice(0, 9).map((member) => ({
            ...member,
            profile_path: member.profile_path
              ? `https://image.tmdb.org/t/p/original${member.profile_path}`
              : 'https://images.squarespace-cdn.com/content/v1/622134fd4170e91e1ee24e8d/f248d961-96bb-4f96-a9b6-3b62664136e8/Candidate.png',
          })),
          posters: data.posters.slice(0, 9).map((poster) => ({ 
            ...poster,
            file_path: poster.file_path
              ? `https://image.tmdb.org/t/p/original${poster.file_path}`
              : 'https://th.bing.com/th/id/OIP.lEADQMbDYsJ97C5U-r8j5AHaGo?rs=1&pid=ImgDetMain',
          })),
          results: data.results.slice(0, 9).map((result) => ({
            key: result.key
              ? `https://www.youtube.com/embed/${result.key}`
              : null,
            name: result.name
          })),
        };
        

        setMovieDetails(processedData);


      } catch (err) {
        setError("Error fetching movie details.");
      }
    };
    fetchMovieDetails();
  }, [tmdbId]);

  const handleAddMovie = async () => {
    const data = {
        id: movieDetails.id,
        title: movieDetails.title,
        overview: movieDetails.overview,
        popularity: movieDetails.popularity,
        releaseDate: movieDetails.release_date,
        voteAverage: movieDetails.vote_average,
        backdropPath: movieDetails.backdrop_path,
        posterPath: movieDetails.poster_path,
        cast: movieDetails.cast,
        photos: movieDetails.posters,
        videos: movieDetails.results,
        isFeatured: isFeatured
    };

    console.log(data);

    try {
        const response = await axios.post("http://localhost/add_movie", data);
        console.log(response.data);
        navigate("/home");
    } catch (err) {
        console.error(err);
    }
  };

  const handleCheckboxChange = (event) => {
    setIsFeatured(event.target.checked);
  };

  const handleAddCastMember = () => {
    setMovieDetails({
      ...movieDetails,
      cast: [...movieDetails.cast, newCastMember],
    });
    setNewCastMember({ name: "", profile_path: "", character: "" });
  };

  const handleAddPhoto = () => {
    setMovieDetails({
      ...movieDetails,
      posters: [...movieDetails.posters, newPhoto],
    });
    setNewPhoto({ file_path: "", description: "" });
  };

  const handleAddVideo = () => {
    setMovieDetails({
      ...movieDetails,
      results: [...movieDetails.results, newVideo],
    });
    setNewVideo({ name: "", site: "", key: "", type: "", official: false });
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!movieDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="wholecont">
      <div className="movie-container">
        {/* Movie Card Section */}
        <div
          className="movie-cardto"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(${movieDetails.backdrop_path})`,
          }}
        >
          {/* Left Column - Movie Details */}
          <div className="poster-container">
            <img
              src={`${movieDetails.poster_path}`}
              alt="Poster"
              className="poster-img"
            />
          </div>

          {/* Right Column - Movie Details */}
          <div className="details">
            {/* Path inputs in one row */}
            <div className="input-row">
              <div className="input-group half">
                <label>Poster Path:</label>
                <input
                  type="text"
                  value={movieDetails.poster_path}
                  onChange={(e) =>
                    setMovieDetails({
                      ...movieDetails,
                      poster_path: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input-group half">
                <label>Backdrop Path:</label>
                <input
                  type="text"
                  value={movieDetails.backdrop_path}
                  onChange={(e) =>
                    setMovieDetails({
                      ...movieDetails,
                      backdrop_path: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="input-group">
              <label>Title:</label>
              <input
                type="text"
                value={movieDetails.title}
                onChange={(e) =>
                  setMovieDetails({
                    ...movieDetails,
                    title: e.target.value,
                  })
                }
                className="title-input"
              />
            </div>

            <div className="input-group">
              <label>Overview:</label>
              <textarea
                value={movieDetails.overview}
                onChange={(e) =>
                  setMovieDetails({
                    ...movieDetails,
                    overview: e.target.value,
                  })
                }
                className="overview-input"
              />
            </div>

            {/* Numeric inputs in one row */}
            <div className="input-row">
              <div className="input-group third">
                <label>Popularity:</label>
                <input
                  type="number"
                  value={movieDetails.popularity}
                  onChange={(e) =>
                    setMovieDetails({
                      ...movieDetails,
                      popularity: parseFloat(e.target.value),
                    })
                  }
                />
              </div>

              <div className="input-group third">
                <label>Release Date:</label>
                <input
                  type="date"
                  value={movieDetails.release_date}
                  onChange={(e) =>
                    setMovieDetails({
                      ...movieDetails,
                      release_date: e.target.value,
                    })
                  }
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
                  onChange={(e) =>
                    setMovieDetails({
                      ...movieDetails,
                      vote_average: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        <h1 className="cast-header">Cast</h1>
        <div className="cast-section">
          {movieDetails.cast.map((member, index) => (
            <div key={index} className="cast-item">
              <img src={member.profile_path} alt={member.name} className="cast-image" />
              <label>Name:</label>
              <input
                type="text"
                value={member.name}
                onChange={(e) =>
                  setMovieDetails({
                    ...movieDetails,
                    cast: movieDetails.cast.map((item, i) =>
                      i === index ? { ...item, name: e.target.value } : item
                    ),
                  })
                }
              />
              <label>Character Name:</label>
              <input
                type="text"
                value={member.character}
                onChange={(e) =>
                  setMovieDetails({
                    ...movieDetails,
                    cast: movieDetails.cast.map((item, i) =>
                      i === index ? { ...item, character: e.target.value } : item
                    ),
                  })
                }
              />
              <button 
                className="remove-btn" 
                onClick={() => {
                  setMovieDetails({
                    ...movieDetails,
                    cast: movieDetails.cast.filter((_, i) => i !== index)
                  });
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <h2 className="cast-header">Add New Cast Member</h2>
        <div className="addCastMember">
          {/* Add New Cast Member Section */}

          <div className="formGroup">
            <div className="left">
              <label>Name:</label>
              <input
                type="text"
                value={newCastMember.name}
                onChange={(e) =>
                  setNewCastMember({ ...newCastMember, name: e.target.value })
                }
              />
            </div>

            <div className="right">
              <label>Character:</label>
              <input
                type="text"
                value={newCastMember.character}
                onChange={(e) =>
                  setNewCastMember({
                    ...newCastMember,
                    character: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <label>Profile Path:</label>
          <input
            type="text"
            value={newCastMember.profile_path}
            onChange={(e) =>
              setNewCastMember({
                ...newCastMember,
                profile_path: e.target.value,
              })
            }
          />

          <button onClick={handleAddCastMember}>Add Cast Member</button>
        </div>

      </div>

   

      {/* Photos Section */}
      <h2 className='cast-header'>Photos</h2>
      <div className="photo-gallery">
        {movieDetails.posters.map((poster, index) => (
          <div key={index} className="photo-card">
            <img
              src={`${poster.file_path}`}
              alt={`Poster ${index + 1}`}
              className="poster-image"
            />
            <button 
              className="remove-btn" 
              onClick={() => {
                setMovieDetails({
                  ...movieDetails,
                  posters: movieDetails.posters.filter((_, i) => i !== index)
                });
              }}
            >
              Remove
            </button>
          </div>

      ))}
      </div>
      <h2 className='cast-header'>Add New Photo</h2>
      <div className='addCastMember'>
      <label>URL:</label>
      <input
        type="text"
        value={newPhoto.file_path}
        onChange={(e) => setNewPhoto({ ...newPhoto, file_path: e.target.value })}
      />
      <button className='addBtn' onClick={handleAddPhoto}>Add Photo</button>
      </div>

     {/* Videos Section */}
      <h2 className='cast-header'>Videos</h2>
      <div className="video-gallery">
        {movieDetails.results.map((result, index) => (
          <div key={index} className="video-card">
            {/* Video Iframe */}
            <iframe
              src={`${result.key}`}
              title={result.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="video-frame"
            ></iframe>

            {/* Video Title */}
            <div className="video-title">
              <input
                type="text"
                value={result.name}
                onChange={(e) =>
                  setMovieDetails({
                    ...movieDetails,
                    results: movieDetails.results.map((item, i) =>
                      i === index ? { ...item, name: e.target.value } : item
                    ),
                  })
                }
                className="video-title-input"
              />
              <button 
                className="remove-btn" 
                onClick={() => {
                  setMovieDetails({
                    ...movieDetails,
                    results: movieDetails.results.filter((_, i) => i !== index)
                  });
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>



      <h2 className='cast-header'>Add New Video</h2>
      <div className='addCastMember'>
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

        <button className='addBtn' style={{marginTop: '10px'}} onClick={handleAddVideo}>Add Video</button>
      </div>

      

      <h2 className='cast-header'>Add Movie</h2>
      <div className="featuredDiv">
        <div className="featureMovie">
        <label htmlFor="featureCheckbox">Feature this movie</label>
          <input
            type="checkbox"
            id="featureCheckbox"
            checked={isFeatured}
            onChange={handleCheckboxChange}
            className="checkFeatured"
          />
          
        </div>
        <button className="addBtn" onClick={handleAddMovie}>Add Movie</button>
      </div>

    </div>
  );
};

export default AdminEditMovie;

