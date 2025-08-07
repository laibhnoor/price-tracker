// src/components/auth/SignupForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUploader from './ImageUploader';
import api from '../../api'; // We'll use the default axios instance from api.js

const SignupForm = ({ onSignupSuccess }) => {
  const [profileFile, setProfileFile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // When sending files, we MUST use FormData
    const formData = new FormData();
    formData.append('full_name', e.target.name.value);
    formData.append('email', e.target.email.value);
    formData.append('password', e.target.password.value);

    // If the user selected a file, add it to the form data
    if (profileFile) {
      // The name 'profile_image' MUST match what multer is expecting on the backend
      formData.append('profile_image', profileFile);
    }
    
    try {
      // Axios automatically sets the correct 'Content-Type' for FormData
      const response = await api.post('/auth/signup', formData);
      
      onSignupSuccess(response.data);
      navigate('/');
    } catch (err) {
      setError('Signup failed. This email may already be in use.');
      console.error("Frontend signup error:", err.response?.data);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {/* ... The rest of your form JSX is unchanged ... */}
      <div className="auth-form-group">
        <label htmlFor="name">Full Name</label>
        <input type="text" id="name" required />
      </div>
      <div className="auth-form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" required />
      </div>
      <div className="auth-form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" required />
      </div>
      <div className="auth-form-group">
        <label>Profile Picture</label>
        <ImageUploader onFileAccepted={setProfileFile} />
      </div>
      {error && <p className="auth-error">{error}</p>}
      <button type="submit" className="auth-submit-btn">Sign Up</button>
    </form>
  );
};

export default SignupForm;