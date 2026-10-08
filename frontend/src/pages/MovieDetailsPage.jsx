import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api, { getBackdropUrl, getImageUrl } from '../api/client';
import RatingStars from '../components/RatingStars';
import TrailerModal from '../components/TrailerModal';
import { useAuth } from '../context/AuthContext';
import { Play, Plus, Check, Star, ArrowLeft, Clock, Calendar, User, Film, Award, BarChart2 } from 'lucide-react';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [ratingMessage, setRatingMessage] = useState('');
  const [activeTrailer, setActiveTrailer] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/movies/${id}`);
        setMovie(res.data);
        setInWatchlist(res.data.inWatchlist || false);
        setUserRating(res.data.userRating || 0);
      } catch (err) {
        console.error('Error fetching movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleWatchlistToggle = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      if (inWatchlist) {
        await api.delete(`/watchlist/${movie.id}`);
        setInWatchlist(false);
      } else {
        await api.post(`/watchlist/${movie.id}`);
        setInWatchlist(true);
      }
    } catch (err) {
      console.error('Watchlist toggle error:', err);
    }
  };

  const handleRateMovie = async (ratingVal) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await api.post(`/movies/${movie.id}/rate`, {
        rating: ratingVal,
        review: '',
      });
      setUserRating(ratingVal);
      setRatingMessage(`Rated ${ratingVal} stars! Your taste profile has updated.`);
      setTimeout(() => setRatingMessage(''), 4000);
    } catch (err) {
      console.error('Error rating movie:', err);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#a3a3b2',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '3px solid rgba(229, 9, 20, 0.2)',
            borderTopColor: '#e50914',
            animation: 'spin 0.8s linear infinite',
            marginRight: '12px',
          }}
        />
        <span>Loading movie details...</span>
      </div>
    );
  }

  if (!movie) {
    return (
      <div style={{ padding: '120px 24px', textAlign: 'center', color: '#a3a3b2' }}>
        <h2>Movie not found</h2>
        <button onClick={() => navigate('/home')} className="secondary-button" style={{ marginTop: '16px' }}>
          Back to Home
        </button>
      </div>
    );
  }

  const features = movie.features || {};

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '80px', overflowX: 'hidden' }}>
      {/* Backdrop Header */}
      <div
        style={{
          position: 'relative',
          height: '60vh',
          minHeight: '400px',
          maxHeight: '600px',
          width: '100%',
          backgroundImage: `url(${getBackdropUrl(movie.backdropPath)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(to top, rgba(10, 10, 15, 1) 0%, rgba(10, 10, 15, 0.6) 50%, rgba(10, 10, 15, 0.3) 100%),
              linear-gradient(to right, rgba(10, 10, 15, 0.9) 0%, transparent 60%)
            `,
          }}
        />

        <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'flex-end', paddingBottom: '20px' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              position: 'absolute',
              top: '90px',
              left: '24px',
              backgroundColor: 'rgba(20, 20, 30, 0.7)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(229, 9, 20, 0.8)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(20, 20, 30, 0.7)')}
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="container" style={{ marginTop: '-120px', position: 'relative', zIndex: 10 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Poster & Quick Controls */}
          <div style={{ maxWidth: '340px', margin: '0 auto', width: '100%' }}>
            <div
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 20px 45px rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '20px',
              }}
            >
              <img
                src={getImageUrl(movie.posterPath, 'w500')}
                alt={movie.title}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {movie.trailerUrl && (
                <button
                  onClick={() => setActiveTrailer(movie)}
                  className="glow-button"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Play size={18} fill="#ffffff" />
                  <span>Watch Official Trailer</span>
                </button>
              )}

              <button
                onClick={handleWatchlistToggle}
                className="secondary-button"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: inWatchlist ? 'rgba(229, 9, 20, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                  borderColor: inWatchlist ? 'rgba(229, 9, 20, 0.5)' : 'rgba(255, 255, 255, 0.15)',
                  color: inWatchlist ? '#ff6b6b' : '#ffffff',
                }}
              >
                {inWatchlist ? <Check size={18} /> : <Plus size={18} />}
                <span>{inWatchlist ? 'Saved in My List' : 'Add to My List'}</span>
              </button>
            </div>

            {/* Interactive User Rating Box */}
            <div
              style={{
                marginTop: '20px',
                backgroundColor: '#181824',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                padding: '16px',
                textAlign: 'center',
              }}
            >
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffffff', marginBottom: '8px' }}>
                Your Personal Rating
              </h4>
              <RatingStars
                initialRating={userRating}
                onRate={handleRateMovie}
                size={24}
              />
              {ratingMessage ? (
                <p style={{ fontSize: '0.75rem', color: '#4ade80', marginTop: '8px', animation: 'fadeIn 0.2s ease' }}>
                  {ratingMessage}
                </p>
              ) : (
                <p style={{ fontSize: '0.75rem', color: '#a3a3b2', marginTop: '6px' }}>
                  {userRating > 0 ? 'Click stars to change rating' : 'Rate 1 to 5 stars to train your AI taste'}
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Title, Metadata, Overview, Ratings Comparison & Features */}
          <div style={{ flex: '1 1 500px' }}>
            <h1
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: '-0.8px',
                lineHeight: 1.15,
                marginBottom: '12px',
              }}
            >
              {movie.title}
            </h1>

            {movie.originalTitle && movie.originalTitle !== movie.title && (
              <p style={{ fontSize: '1rem', color: '#a3a3b2', fontStyle: 'italic', marginBottom: '14px' }}>
                Original: {movie.originalTitle}
              </p>
            )}

            {/* Metadata Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {movie.releaseYear && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#a3a3b2', fontSize: '0.85rem' }}>
                  <Calendar size={15} />
                  <span>{movie.releaseYear}</span>
                </div>
              )}

              {movie.runtime && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#a3a3b2', fontSize: '0.85rem' }}>
                  <Clock size={15} />
                  <span>{movie.runtime} min</span>
                </div>
              )}

              {movie.director && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#a3a3b2', fontSize: '0.85rem' }}>
                  <User size={15} />
                  <span>Dir: {movie.director}</span>
                </div>
              )}
            </div>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {movie.genres.map((g) => (
                  <span key={g} className="pill">
                    {g}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                Overview
              </h3>
              <p style={{ color: '#d1d1db', fontSize: '0.95rem', lineHeight: 1.7 }}>
                {movie.overview}
              </p>
            </div>

            {/* Rating Comparison Table (Requirement #7) */}
            <div
              style={{
                backgroundColor: '#181824',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '32px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Award size={20} color="#e50914" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>
                  Multi-Source Rating Comparison
                </h3>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '14px',
                }}
              >
                {movie.ratingsComparison &&
                  Object.entries(movie.ratingsComparison).map(([source, score]) => (
                    <div
                      key={source}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        borderRadius: '8px',
                        padding: '12px 14px',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        textAlign: 'center',
                      }}
                    >
                      <span style={{ fontSize: '0.75rem', color: '#a3a3b2', textTransform: 'uppercase', fontWeight: 600 }}>
                        {source}
                      </span>
                      <p style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
                        {score}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Movie Feature Vector Breakdown (9 Dimensions) */}
            {features && Object.keys(features).length > 0 && (
              <div
                style={{
                  backgroundColor: '#181824',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '24px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <BarChart2 size={20} color="#e50914" />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>
                    Movie Vibe DNA Profile (0–100%)
                  </h3>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px',
                  }}
                >
                  {Object.entries(features).map(([name, score]) => (
                    <div key={name}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                        <span style={{ color: '#d1d1db', textTransform: 'capitalize' }}>{name}</span>
                        <span style={{ fontWeight: 600, color: score > 60 ? '#ff6b6b' : '#a3a3b2' }}>{score}%</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', backgroundColor: '#2b2b3d', borderRadius: '3px', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${score}%`,
                            height: '100%',
                            backgroundColor: score > 60 ? '#e50914' : '#5c5c72',
                            borderRadius: '3px',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <TrailerModal
        isOpen={!!activeTrailer}
        trailerUrl={activeTrailer?.trailerUrl}
        title={activeTrailer?.title}
        onClose={() => setActiveTrailer(null)}
      />
    </div>
  );
};

export default MovieDetailsPage;
