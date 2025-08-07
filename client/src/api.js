// src/api.js
import axios from 'axios';

// This is the base URL of your backend server
const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

// We will use these functions in our forms
export const login = (formData) => api.post('/auth/login', formData);
export const signup = (formData) => api.post('/auth/signup', formData);

export default api;