import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data);
          localStorage.setItem('user', JSON.stringify(res.data));
        } catch (err) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    verifyAuth();
  }, []);

  const login = async (email, password, rememberMe = false) => {
    const res = await api.post('/auth/login', { email, password, rememberMe });
    const { token: jwt, id, email: userEmail, fullName, role } = res.data;
    const userData = { id, email: userEmail, fullName, role };

    localStorage.setItem('token', jwt);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(jwt);
    setUser(userData);
    return res.data;
  };

  const register = async (fullName, email, password, confirmPassword) => {
    const res = await api.post('/auth/register', { fullName, email, password, confirmPassword });
    const { token: jwt, id, email: userEmail, fullName: name, role } = res.data;
    const userData = { id, email: userEmail, fullName: name, role };

    localStorage.setItem('token', jwt);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(jwt);
    setUser(userData);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
