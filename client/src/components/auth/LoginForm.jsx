// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api';

const LoginForm = ({ onLoginSuccess }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await login({
        email: e.target.email.value,
        password: e.target.password.value,
      });
      onLoginSuccess(response.data); // This updates App.jsx
      navigate('/'); // Redirect to homepage on success
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" required />
      </div>
      <div className="auth-form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" required />
      </div>
      {error && <p className="auth-error">{error}</p>}
      <button type="submit" className="auth-submit-btn">Log In</button>
    </form>
  );
};

export default LoginForm;