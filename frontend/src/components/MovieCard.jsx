import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Plus, Check, Star, Info, Sparkles } from 'lucide-react';
import { getImageUrl } from '../api/client';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

const MovieCard = ({ movie, onPlayTrailer, onWatchlistChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(movie.inWatchlist || false);
  const [loadingWatchlist, setLoadingWatchlist] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleWatchlistToggle = async (e) => {
    e.stopPropagation();
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
      if (onWatchlistChange) onWatchlistChange(movie.id, !inWatchlist);
    } catch (err) {
      console.error('Watchlist toggle error:', err);
    } finally {
      setLoadingWatchlist(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        transform: isHovered ? 'scale(1.05) translateY(-4px)' : 'scale(1) translateY(0)',
        boxShadow: isHovered ? '0 12px 28px rgba(0, 0, 0, 0.8)' : '0 4px 10px rgba(0, 0, 0, 0.4)',
        backgroundColor: '#181824',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Poster Image */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '150%' }}>
        <img
          src={getImageUrl(movie.posterPath, 'w500')}
          alt={movie.title}
          loading="lazy"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Gradient Overlay for Text Readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: isHovered
              ? 'linear-gradient(to top, rgba(10, 10, 15, 0.95) 0%, rgba(10, 10, 15, 0.6) 50%, rgba(10, 10, 15, 0.2) 100%)'
              : 'linear-gradient(to top, rgba(10, 10, 15, 0.8) 0%, transparent 60%)',
            transition: 'background 0.3s ease',
          }}
        />

        {/* Badges Container (Match Score, TV Series, Bollywood) */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', flexDirection: 'column', gap: '4px', zIndex: 2 }}>
          {movie.matchScore && (
            <div
              style={{
                backgroundColor: 'rgba(229, 9, 20, 0.95)',
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <Sparkles size={11} />
              <span>{Math.round(movie.matchScore)}% Match</span>
            </div>
          )}

          {movie.contentType === 'TV_SERIES' && (
            <div
              style={{
                backgroundColor: 'rgba(79, 70, 229, 0.9)',
                color: '#ffffff',
                fontSize: '0.68rem',
                fontWeight: 700,
                padding: '2px 6px',
                borderRadius: '4px',
                display: 'inline-flex',
                alignItems: 'center',
                width: 'fit-content',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(4px)',
                letterSpacing: '0.5px',
              }}
            >
              {movie.seasons ? movie.seasons : 'TV Series'}
            </div>
          )}

          {movie.industry === 'Bollywood' && (
            <div
              style={{
                backgroundColor: 'rgba(217, 119, 6, 0.9)',
                color: '#ffffff',
                fontSize: '0.68rem',
                fontWeight: 700,
                padding: '2px 6px',
                borderRadius: '4px',
                display: 'inline-flex',
                alignItems: 'center',
                width: 'fit-content',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(4px)',
                letterSpacing: '0.5px',
              }}
            >
              Bollywood
            </div>
          )}
        </div>

        {/* Rating Badge */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            color: '#ffb800',
            fontSize: '0.75rem',
            fontWeight: 700,
            padding: '3px 7px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            backdropFilter: 'blur(4px)',
          }}
        >
          <Star size={12} fill="#ffb800" color="#ffb800" />
          <span>{movie.tmdbRating ? movie.tmdbRating.toFixed(1) : '—'}</span>
        </div>

        {/* Bottom Content */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <h4
            style={{
              fontSize: '0.95rem',
              fontWeight: 700,
              color: '#ffffff',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {movie.title}
          </h4>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#a3a3b2', flexWrap: 'wrap' }}>
            {movie.releaseYear && <span>{movie.releaseYear}</span>}
            {movie.contentType === 'TV_SERIES' && movie.seasons && (
              <>
                <span>•</span>
                <span style={{ color: '#a5b4fc', fontWeight: 600 }}>{movie.seasons}</span>
              </>
            )}
            {movie.genres && movie.genres.length > 0 && (
              <>
                <span>•</span>
                <span>{movie.genres[0]}</span>
              </>
            )}
            {movie.industry === 'Bollywood' && (
              <>
                <span>•</span>
                <span style={{ color: '#fbbf24', fontWeight: 500 }}>Hindi</span>
              </>
            )}
          </div>

          {/* Hover Actions Bar */}
          {isHovered && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '6px',
                animation: 'fadeIn 0.2s ease',
              }}
            >
              {onPlayTrailer && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayTrailer(movie);
                  }}
                  title="Play Trailer"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <Play size={14} fill="#000" />
                </button>
              )}

              <button
                type="button"
                onClick={handleWatchlistToggle}
                disabled={loadingWatchlist}
                title={inWatchlist ? 'Remove from My List' : 'Add to My List'}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: inWatchlist ? '#e50914' : 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {inWatchlist ? <Check size={16} /> : <Plus size={16} />}
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/movie/${movie.id}`);
                }}
                title="Movie Details"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <Info size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
