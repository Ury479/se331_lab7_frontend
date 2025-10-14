// Create a typed axios instance with base URL and JSON headers
import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8080', // backend base URL
  headers: { 'Content-Type': 'application/json' }
});

// Attach token automatically if present
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default http;
