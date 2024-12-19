import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';


const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/home" className="logo">MovieSite</Link>
      </div>
      <div className="sidebar-content">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li>
            <a 
              onClick={handleLogout}
              style={{ cursor: 'pointer' }}
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
