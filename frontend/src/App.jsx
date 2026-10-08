import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DiscoverPage from './pages/DiscoverPage';
import RecommendationsPage from './pages/RecommendationsPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import MyListPage from './pages/MyListPage';
import ProfilePage from './pages/ProfilePage';

// Protected Route component ensuring user is logged in
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0f',
          color: '#ffffff',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '3px solid rgba(229, 9, 20, 0.2)',
            borderTopColor: '#e50914',
            animation: 'spin 0.8s linear infinite',
          }}
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Layout component to hide navbar on login / register
const Layout = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main>
        <Routes>
          {/* Public Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Main Discovery & Recommendation Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/discover"
            element={
              <ProtectedRoute>
                <DiscoverPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recommendations"
            element={
              <ProtectedRoute>
                <RecommendationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <MovieDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-list"
            element={
              <ProtectedRoute>
                <MyListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Root redirect */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;
