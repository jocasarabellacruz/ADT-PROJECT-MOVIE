import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AdminSearchMovie from './Pages/AdminSearchMovie';
import AdminEditMovie from './Pages/AdminEditMovie';
import ViewMovie from './Pages/ViewMovie';
import './App.css';
import Login from './Login/Login';
import Register from './Register/Register';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin_search" element={<AdminSearchMovie />} />
          <Route path="/admin_edit/:tmdbId" element={<AdminEditMovie />} />
          <Route path="/view/:movieId" element={<ViewMovie />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
