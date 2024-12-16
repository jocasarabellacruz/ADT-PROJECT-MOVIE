import React from 'react';
import { useParams } from 'react-router-dom';

const AdminEditMovie = () => {
  const { tmdbId } = useParams(); 

  return (
    <div>
      <h1>Edit Movie</h1>
      <p>Editing movie with TMDb ID: {tmdbId}</p>
    </div>
  );
};

export default AdminEditMovie;