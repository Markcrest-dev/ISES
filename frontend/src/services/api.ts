import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Required for sending cookies
});

// Add request interceptor for handling auth tokens
api.interceptors.request.use(
  (config) => {
    // You can add auth token logic here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle response errors here (e.g., unauthorized, validation errors)
    return Promise.reject(error);
  }
);

export default api;