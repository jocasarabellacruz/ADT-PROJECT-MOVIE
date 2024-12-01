import { Outlet } from 'react-router-dom';

const Movie = () => {
  return (
    <>
      <h1>Movie Page------------------------------------------------------------------------------------------------------</h1> 
      {/* reworking haha */}
      <Outlet />
    </>
  );
};

export default Movie;