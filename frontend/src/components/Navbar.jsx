import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, Film, User, LogOut, Bookmark, Star, Sliders, Sparkles, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/discover?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Discover', path: '/discover' },
    { name: 'Recommendations', path: '/recommendations' },
    { name: 'My List', path: '/my-list' },
    { name: 'Profile', path: '/profile' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'background-color 0.3s ease, padding 0.3s ease',
        backgroundColor: scrolled ? 'rgba(10, 10, 15, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
        padding: scrolled ? '12px 0' : '20px 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          <Link
            to="/home"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '1.5rem',
              fontWeight: 900,
              letterSpacing: '-0.5px',
              color: '#ffffff',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #e50914 0%, #b81d24 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 10px rgba(229, 9, 20, 0.5)',
              }}
            >
              <Film size={18} color="#ffffff" />
            </div>
            <span>
              Movie<span style={{ color: '#e50914' }}>Finder</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#ffffff' : '#a3a3b2',
                    transition: 'color 0.2s ease',
                    position: 'relative',
                    padding: '4px 0',
                  }}
                >
                  {link.name}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-2px',
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: '#e50914',
                        borderRadius: '2px',
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Action Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            style={{
              display: 'flex',
              alignItems: 'center',
              background: searchOpen ? 'rgba(24, 24, 36, 0.9)' : 'transparent',
              border: searchOpen ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
              borderRadius: '24px',
              padding: searchOpen ? '6px 14px' : '6px',
              transition: 'all 0.3s ease',
            }}
          >
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              style={{
                background: 'transparent',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Search size={19} />
            </button>
            {searchOpen && (
              <input
                type="text"
                placeholder="Search movies, directors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  marginLeft: '8px',
                  width: '180px',
                }}
              />
            )}
          </form>

          {/* User Avatar & Dropdown */}
          {isAuthenticated ? (
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'transparent',
                  color: '#ffffff',
                  padding: '4px 8px',
                  borderRadius: '20px',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #e50914 0%, #301115 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    color: '#fff',
                    border: '1.5px solid rgba(255,255,255,0.2)',
                  }}
                >
                  {user?.fullName ? user.fullName[0].toUpperCase() : 'U'}
                </div>
                <ChevronDown size={14} color="#a3a3b2" />
              </button>

              {dropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '42px',
                    right: 0,
                    width: '220px',
                    backgroundColor: '#181824',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                    padding: '8px 0',
                    zIndex: 1100,
                    animation: 'fadeIn 0.2s ease',
                  }}
                >
                  <div style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>{user?.fullName}</p>
                    <p style={{ fontSize: '0.75rem', color: '#a3a3b2', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {user?.email}
                    </p>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 16px',
                      fontSize: '0.85rem',
                      color: '#e5e5e5',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <User size={16} color="#e50914" />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    to="/my-list"
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 16px',
                      fontSize: '0.85rem',
                      color: '#e5e5e5',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <Bookmark size={16} color="#e50914" />
                    <span>My Watchlist</span>
                  </Link>

                  <Link
                    to="/discover"
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 16px',
                      fontSize: '0.85rem',
                      color: '#e5e5e5',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <Sliders size={16} color="#e50914" />
                    <span>Mood Sliders</span>
                  </Link>

                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '4px 0' }} />

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                      navigate('/login');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      width: '100%',
                      padding: '10px 16px',
                      background: 'transparent',
                      color: '#ff6b6b',
                      fontSize: '0.85rem',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(229,9,20,0.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="glow-button" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
