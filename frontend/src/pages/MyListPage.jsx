import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import MovieCard from '../components/MovieCard';
import TrailerModal from '../components/TrailerModal';
import { Bookmark, Compass, Trash2 } from 'lucide-react';

const MyListPage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTrailer, setActiveTrailer] = useState(null);

  const fetchWatchlist = async () => {
    try {
      setLoading(true);
      const res = await api.get('/watchlist');
      setWatchlist(res.data || []);
    } catch (err) {
      console.error('Error fetching watchlist:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const handleWatchlistChange = (movieId, isInList) => {
    if (!isInList) {
      setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
    }
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(229, 9, 20, 0.15)',
                border: '1px solid rgba(229, 9, 20, 0.35)',
                padding: '6px 14px',
                borderRadius: '24px',
                color: '#ff6b6b',
                fontWeight: 700,
                fontSize: '0.85rem',
                marginBottom: '14px',
              }}
            >
              <Bookmark size={15} />
              <span>SAVED COLLECTION</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: '-0.5px',
              }}
            >
              My List ({watchlist.length})
            </h1>
          </div>
        </div>

        {/* Watchlist Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#a3a3b2' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '3px solid rgba(229, 9, 20, 0.2)',
                borderTopColor: '#e50914',
                animation: 'spin 0.8s linear infinite',
                margin: '0 auto 16px auto',
              }}
            />
            <p>Loading your saved movies...</p>
          </div>
        ) : watchlist.length === 0 ? (
          <div
            style={{
              backgroundColor: '#181824',
              borderRadius: '14px',
              padding: '60px 24px',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <Bookmark size={48} color="#e50914" style={{ margin: '0 auto 16px auto', opacity: 0.8 }} />
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
              Your List is Empty
            </h2>
            <p style={{ color: '#a3a3b2', maxWidth: '480px', margin: '0 auto 24px auto', fontSize: '0.9rem' }}>
              Explore trending titles, search by genre, or use the AI Mood Discover sliders to add titles to your personal watchlist.
            </p>
            <Link to="/discover" className="glow-button">
              <Compass size={18} />
              <span>Discover Movies</span>
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '24px',
            }}
          >
            {watchlist.map((movie) => (
              <div key={movie.id} style={{ position: 'relative' }}>
                <MovieCard
                  movie={movie}
                  onPlayTrailer={(m) => setActiveTrailer(m)}
                  onWatchlistChange={handleWatchlistChange}
                />
              </div>
            ))}
          </div>
        )}
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

export default MyListPage;
