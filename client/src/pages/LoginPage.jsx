// src/pages/LoginPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = ({ onLoginSuccess }) => {
  return (
    <div className="auth-page-container">
      <div className="auth-form-wrapper">
        <h2>Welcome Back!</h2>
        <LoginForm onLoginSuccess={onLoginSuccess} />
        <p className="auth-redirect-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;