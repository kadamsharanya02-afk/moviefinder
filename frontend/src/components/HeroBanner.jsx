import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Info, Plus, Check, Star, Sparkles } from 'lucide-react';
import { getBackdropUrl } from '../api/client';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

const HeroBanner = ({ movie, onPlayTrailer }) => {
  const [inWatchlist, setInWatchlist] = useState(movie?.inWatchlist || false);
  const [loadingWatchlist, setLoadingWatchlist] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!movie) return null;

  const handleWatchlistToggle = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setLoadingWatchlist(true);
    try {
      if (inWatchlist) {
        await api.delete(`/watchlist/${movie.id}`);
        setInWatchlist(false);
      } else {
        await api.post(`/watchlist/${movie.id}`);
        setInWatchlist(true);
      }
    } catch (err) {
      console.error('Watchlist error:', err);
    } finally {
      setLoadingWatchlist(false);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        height: '80vh',
        minHeight: '550px',
        maxHeight: '750px',
        width: '100%',
        backgroundImage: `url(${getBackdropUrl(movie.backdropPath)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 20%',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
      }}
    >
      {/* Cinematic Gradient Overlays */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(to right, rgba(10, 10, 15, 0.95) 0%, rgba(10, 10, 15, 0.7) 40%, rgba(10, 10, 15, 0.1) 80%),
            linear-gradient(to top, rgba(10, 10, 15, 1) 0%, rgba(10, 10, 15, 0.3) 35%, transparent 70%)
          `,
        }}
      />

      {/* Hero Content */}
      <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '750px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: 'rgba(229, 9, 20, 0.2)',
              border: '1px solid rgba(229, 9, 20, 0.5)',
              padding: '4px 10px',
              borderRadius: '20px',
              color: '#ff6b6b',
              fontWeight: 700,
              fontSize: '0.8rem',
            }}
          >
            <Sparkles size={13} />
            <span>FEATURED SELECTION</span>
          </div>

          {movie.releaseYear && (
            <span style={{ fontSize: '0.9rem', color: '#a3a3b2', fontWeight: 500 }}>
              {movie.releaseYear}
            </span>
          )}

          {movie.tmdbRating && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ffb800', fontWeight: 600 }}>
              <Star size={14} fill="#ffb800" color="#ffb800" />
              <span>{movie.tmdbRating.toFixed(1)}/10</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-1px',
            marginBottom: '16px',
            color: '#ffffff',
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.8)',
          }}
        >
          {movie.title}
        </h1>

        {/* Genres */}
        {movie.genres && movie.genres.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {movie.genres.map((genre) => (
              <span key={genre} className="pill">
                {genre}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        <p
          style={{
            fontSize: '1.05rem',
            color: '#d1d1db',
            lineHeight: 1.6,
            marginBottom: '28px',
            maxWidth: '650px',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)',
          }}
        >
          {movie.overview}
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          {movie.trailerUrl && (
            <button
              onClick={() => onPlayTrailer(movie)}
              className="glow-button"
            >
              <Play size={18} fill="#ffffff" />
              <span>Watch Trailer</span>
            </button>
          )}

          <button
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="secondary-button"
          >
            <Info size={18} />
            <span>More Info</span>
          </button>

          <button
            onClick={handleWatchlistToggle}
            disabled={loadingWatchlist}
            style={{
              background: inWatchlist ? 'rgba(229, 9, 20, 0.25)' : 'rgba(255, 255, 255, 0.12)',
              border: inWatchlist ? '1px solid rgba(229, 9, 20, 0.6)' : '1px solid rgba(255, 255, 255, 0.15)',
              color: inWatchlist ? '#ff6b6b' : '#ffffff',
              padding: '12px 20px',
              borderRadius: '6px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.25s ease',
              cursor: 'pointer',
            }}
          >
            {inWatchlist ? <Check size={18} /> : <Plus size={18} />}
            <span>{inWatchlist ? 'In My List' : 'Add to My List'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
