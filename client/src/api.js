// src/api.js
import axios from 'axios';

// This is the base URL of your backend server
const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

// We will use these functions in our forms
export const login = (formData) => api.post('/auth/login', formData);
export const signup = (formData) => api.post('/auth/signup', formData);

// IMPORTANT: Interceptor to add the token to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export default api;