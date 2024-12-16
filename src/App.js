import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AdminSearchMovie from './Components/AdminSearchMovie';
import AdminEditMovie from './Components/AdminEditMovie';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin_search" element={<AdminSearchMovie />} />
          <Route path="/admin_edit/:tmdbId" element={<AdminEditMovie />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
