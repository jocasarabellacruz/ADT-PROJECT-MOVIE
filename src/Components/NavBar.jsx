import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">MovieSite</Link>
      </div>
      <div className="sidebar-content">
        <ul>
          <li><Link to="/main/movies">Home</Link></li>
          <li><Link to="/main/favorites">Favorites</Link></li>
          <li><Link to="/main/search">Search</Link></li>
          <li><Link to="/main/settings">Settings</Link></li>
          <li><a onClick={() => localStorage.removeItem('accessToken')}>Logout</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
