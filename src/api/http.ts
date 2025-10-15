// Create a typed axios instance with base URL and JSON headers
import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ?? import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' }
})

// Attach token automatically if present
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default http
