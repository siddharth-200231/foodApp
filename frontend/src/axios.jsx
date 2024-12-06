import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add error handling
API.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

API.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401 || 
            error.response?.data?.message?.includes('JWT expired')) {
            // Clear stored data
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Redirect to login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default API;
