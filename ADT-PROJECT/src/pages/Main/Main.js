import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  useEffect(() => {
    if (!accessToken) {
      handleLogout();
    }
  }, [accessToken]);

  return (
    <div className="Main">
      {/* Navbarr */}
      <div className="container">
        <div className="navigation">
          <ul>
            <li><a href="/main/home">Home</a></li>
            <li><a href="/main/favorites">Favorites</a></li>
            <li><a href="/main/search">Search</a></li>
            <li><a href="/main/settings">Settings</a></li>
            <li className="logout" onClick={handleLogout}>Logout</li>
          </ul>
        </div>

        {/* Content */}
        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;
