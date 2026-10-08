import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Film, Lock, Mail, User, AlertCircle, ArrowRight } from 'lucide-react';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      await register(fullName, email, password, confirmPassword);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url('https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=1920&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '24px',
      }}
    >
      {/* Dark Vignette Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at center, rgba(10, 10, 15, 0.7) 0%, rgba(10, 10, 15, 0.95) 100%),
            linear-gradient(to bottom, rgba(10, 10, 15, 0.8) 0%, rgba(10, 10, 15, 0.95) 100%)
          `,
        }}
      />

      {/* Centered Register Card */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '460px',
          backgroundColor: 'rgba(20, 20, 29, 0.92)',
          backdropFilter: 'blur(16px)',
          borderRadius: '14px',
          padding: '40px 36px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
          animation: 'fadeIn 0.4s ease',
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '24px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '9px',
              background: 'linear-gradient(135deg, #e50914 0%, #b81d24 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(229, 9, 20, 0.6)',
            }}
          >
            <Film size={20} color="#ffffff" />
          </div>
          <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.5px' }}>
            Movie<span style={{ color: '#e50914' }}>Finder</span>
          </span>
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px', textAlign: 'center' }}>
          Create Your Account
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#a3a3b2', textAlign: 'center', marginBottom: '24px' }}>
          Join to discover personalized AI recommendations and build your taste profile
        </p>

        {error && (
          <div
            style={{
              backgroundColor: 'rgba(229, 9, 20, 0.15)',
              border: '1px solid rgba(229, 9, 20, 0.4)',
              borderRadius: '8px',
              padding: '12px 14px',
              color: '#ff6b6b',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px',
            }}
          >
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Full Name */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#d1d1db', marginBottom: '6px' }}>
              Full Name
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                borderRadius: '8px',
                padding: '12px 14px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
              }}
            >
              <User size={18} color="#a3a3b2" style={{ marginRight: '10px' }} />
              <input
                type="text"
                required
                placeholder="Jane Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  width: '100%',
                }}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#d1d1db', marginBottom: '6px' }}>
              Email Address
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                borderRadius: '8px',
                padding: '12px 14px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
              }}
            >
              <Mail size={18} color="#a3a3b2" style={{ marginRight: '10px' }} />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  width: '100%',
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#d1d1db', marginBottom: '6px' }}>
              Password
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                borderRadius: '8px',
                padding: '12px 14px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
              }}
            >
              <Lock size={18} color="#a3a3b2" style={{ marginRight: '10px' }} />
              <input
                type="password"
                required
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  width: '100%',
                }}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#d1d1db', marginBottom: '6px' }}>
              Confirm Password
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                borderRadius: '8px',
                padding: '12px 14px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
              }}
            >
              <Lock size={18} color="#a3a3b2" style={{ marginRight: '10px' }} />
              <input
                type="password"
                required
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  width: '100%',
                }}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="glow-button"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '14px',
              fontSize: '0.95rem',
              marginTop: '8px',
            }}
          >
            {loading ? 'Creating account...' : 'Start Discovery'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        {/* Link to Login */}
        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.85rem', color: '#a3a3b2' }}>
          Already have an account?{' '}
          <Link
            to="/login"
            style={{ color: '#ffffff', fontWeight: 600, marginLeft: '4px' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#e50914')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
