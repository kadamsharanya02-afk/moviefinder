import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle authentication expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized on a protected route, clear token
      const isAuthRoute = error.config.url.includes('/auth/');
      if (!isAuthRoute && localStorage.getItem('token')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Helper to resolve poster & backdrop image URLs from TMDB paths
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const getBackdropUrl = (path) => {
  if (!path) return 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1280&auto=format&fit=crop';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `https://image.tmdb.org/t/p/original${path}`;
};

export default api;
