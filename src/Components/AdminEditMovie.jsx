import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./AdminEditMovie.css";

const AdminEditMovie = () => {
  const { tmdbId } = useParams();
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
        setMovieDetails(response.data);
      } catch (err) {
        setError("Error fetching movie details.");
      }
    };
    fetchMovieDetails();
  }, [tmdbId]);

  const handleAddMovie = async () => {
    console.log(movieDetails);
    

    const data = {
      isFeatured: isFeatured,
      id: movieDetails.id,
      title: movieDetails.title,
      overview: movieDetails.overview,
      popularity: movieDetails.popularity,
      releaseDate: movieDetails.release_date,
      voteAverage: movieDetails.vote_average,
      backdropPath: movieDetails.backdrop_path,
      posterPath: movieDetails.poster_path,
      cast: movieDetails.cast,
    };

    console.log(data);

    // try {
    //   const response = await axios.post("http://localhost/add_movie", data);
    //   console.log(response.data);
    // } catch (err) {
    //   console.error(err);
    // }
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
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
          }}
        >
          {/* Left Column - Movie Details */}
          <div className="poster-container">
            <img
              src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
              alt="Poster"
              className="poster-img"
            />
          </div>

          {/* Right Column - Poster Image */}
          <div className="details">
            <h1 className="movietite">{movieDetails.title}</h1>
            <p className="overview">{movieDetails.overview}</p>
            <p>
              <strong>Popularity:</strong> {movieDetails.popularity}
            </p>
            <p>
              <strong>Release Date:</strong> {movieDetails.release_date}
            </p>
            <p>
              <strong>Vote Average:</strong> {movieDetails.vote_average}
            </p>
          </div>
        </div>

        {/* Backdrop */}
        {/* <div
        className="backdrop"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
        }}
      ></div> */}

        {/* Cast Section */}
        <h1 className="cast-header">Cast</h1>
        <div className="cast-section">
          {movieDetails.cast.map((member, index) => (
            <div key={index} className="cast-item">
              <img
                src={`https://image.tmdb.org/t/p/original${member.profile_path}`}
                alt={member.name}
                className="cast-image"
              />
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
                      i === index
                        ? { ...item, character: e.target.value }
                        : item
                    ),
                  })
                }
              />
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

        {/* Photos Section */}
        <h2 className="cast-header">Photos</h2>
        <div className="photo-gallery">
          {movieDetails.posters.map((poster, index) => (
            <div key={index} className="photo-card">
              <img
                src={`https://image.tmdb.org/t/p/original${poster.file_path}`}
                alt={`Poster ${index + 1}`}
                className="poster-image"
              />
              {/* <label>URL:</label> */}
            {/* <input
              type="text"
              value={poster.file_path}
              onChange={(e) =>
                setMovieDetails({
                  ...movieDetails,
                  posters: movieDetails.posters.map((item, i) =>
                    i === index ? { ...item, file_path: e.target.value } : item
                  ),
                })
              }
            />  */}
            </div>
          ))}
        </div>
        <h2 className="cast-header">Add New Photo</h2>
        <div className="addCastMember">
          <label>URL:</label>
          <input
            type="text"
            value={newPhoto.file_path}
            onChange={(e) =>
              setNewPhoto({ ...newPhoto, file_path: e.target.value })
            }
          />
          <button onClick={handleAddPhoto}>Add Photo</button>
        </div>

        {/* Videos Section */}
        <h2 className="cast-header">Videos</h2>
        {movieDetails.results.map((result, index) => (
          <div key={index}>
            <label>Key:</label>
            <input
              type="text"
              value={result.key}
              onChange={(e) =>
                setMovieDetails({
                  ...movieDetails,
                  results: movieDetails.results.map((item, i) =>
                    i === index ? { ...item, key: e.target.value } : item
                  ),
                })
              }
            />

          </div>
        ))}
      </div>
      <h2 className='cast-header'>Add New Cast Member</h2>
      <div className='addCastMember'>
  {/* Add New Cast Member Section */}
  
  
  <div className="formGroupCast">
    <div className="left">
      <label>Name:</label>
      <input
        type="text"
        value={newCastMember.name}
        onChange={(e) => setNewCastMember({ ...newCastMember, name: e.target.value })}
      />
    </div>
    
    <div className="right">
      <label>Character:</label>
      <input
        type="text"
        value={newCastMember.character}
        onChange={(e) => setNewCastMember({ ...newCastMember, character: e.target.value })}
      />
    </div>
  </div>

  <label>Profile Path:</label>
  <input
    type="text"
    value={newCastMember.profile_path}
    onChange={(e) => setNewCastMember({ ...newCastMember, profile_path: e.target.value })}
  />
  
  <button className='addBtn' onClick={handleAddCastMember}>Add Cast Member</button>
</div>

      {/* Photos Section */}
      <h2 className='cast-header'>Photos</h2>
      <div className="photo-gallery">
        {movieDetails.posters.map((poster, index) => (
          <div key={index} className="photo-card">
            <img
              src={`https://image.tmdb.org/t/p/original${poster.file_path}`}
              alt={`Poster ${index + 1}`}
              className="poster-image"
            />
            {/* <label>URL:</label>*/}

            {/* <input
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
            /> */}
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
              src={`https://www.youtube.com/embed/${result.key}`}
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
            </div>
          </div>
        ))}
      </div>



      <h2 className='cast-header'>Add New Video</h2>
      <div className='addCastMember'>
      <label>Key:</label>
      <input
        type="text"
        value={newVideo.key}
        onChange={(e) => setNewVideo({ ...newVideo, key: e.target.value })}
      />
      <button className='addBtn' onClick={handleAddVideo}>Add Video</button>
      </div>

      <label>Is Featured:</label>
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={handleCheckboxChange}
          />

      <h2 className='cast-header'>Add Movie</h2>
      <div className='addCastMember'>
        <button className='addBtn' onClick={handleAddMovie}>Add Movie</button>
      </div>
    </div>
  );
};

export default AdminEditMovie;
