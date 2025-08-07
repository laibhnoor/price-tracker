// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import './App.css';
import './Auth.css';

const App = () => {
  const [theme, setTheme] = useState('light');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // This hook runs once when the app loads to check if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setCurrentUser(JSON.parse(user));
      setIsLoggedIn(true);
    }
  }, []);

  // This function is passed to the Login/Signup pages. It updates the app's state.
  const handleLogin = (backendResponse) => {
    const { user, token } = backendResponse;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  useEffect(() => { document.body.className = theme; }, [theme]);

  return (
    <BrowserRouter>
      <div className="app-container">
        <NavBar
          toggleTheme={toggleTheme}
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
        <main className="main-content">
          <Routes>
            {/* The Homepage */}
            <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
            
            {/* If logged in, redirect from /login to home. Otherwise, show LoginPage. */}
            <Route 
              path="/login" 
              element={isLoggedIn ? <Navigate to="/" /> : <LoginPage onLoginSuccess={handleLogin} />} 
            />
            
            {/* If logged in, redirect from /signup to home. Otherwise, show SignupPage. */}
            <Route 
              path="/signup" 
              element={isLoggedIn ? <Navigate to="/" /> : <SignupPage onSignupSuccess={handleLogin} />} 
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;