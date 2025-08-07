// src/pages/SignupPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../components/auth/SignupForm';

const SignupPage = ({ onSignupSuccess }) => {
  return (
    <div className="auth-page-container">
      <div className="auth-form-wrapper">
        <h2>Create Your Account</h2>
        <SignupForm onSignupSuccess={onSignupSuccess} />
        <p className="auth-redirect-link">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;