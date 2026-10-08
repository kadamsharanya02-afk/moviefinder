import React, { useState, useEffect } from 'react';
import api from '../api/client';
import MovieCard from '../components/MovieCard';
import TrailerModal from '../components/TrailerModal';
import { Sparkles, Sliders, Film, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecommendationsPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [tasteProfile, setTasteProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTrailer, setActiveTrailer] = useState(null);

  useEffect(() => {
    const fetchPersonalRecommendations = async () => {
      try {
        setLoading(true);
        const res = await api.get('/recommendations');
        setRecommendations(res.data.recommendations || []);
        setTasteProfile(res.data.tasteProfile || {});
      } catch (err) {
        console.error('Error fetching recommendations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalRecommendations();
  }, []);

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
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
              marginBottom: '16px',
            }}
          >
            <Sparkles size={16} />
            <span>TAILORED FOR YOU</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.5px',
              marginBottom: '10px',
            }}
          >
            Personalized Movie Recommendations
          </h1>
          <p style={{ fontSize: '1rem', color: '#a3a3b2', maxWidth: '750px', lineHeight: 1.6 }}>
            Every title below is scored using our hybrid discovery engine, combining your past ratings,
            watchlist saves, genre preferences, and mood vector analysis.
          </p>
        </div>

        {/* Quick Mood Search CTA Bar */}
        <div
          style={{
            backgroundColor: '#181824',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '20px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
              Want to tune by current mood?
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#a3a3b2' }}>
              Use our 9-slider mood matrix or type natural language prompts in Discover.
            </p>
          </div>
          <Link to="/discover" className="glow-button" style={{ padding: '10px 22px', fontSize: '0.85rem' }}>
            <Sliders size={16} />
            <span>Open Mood Sliders</span>
          </Link>
        </div>

        {/* Content */}
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
            <p>Synthesizing personal recommendations...</p>
          </div>
        ) : recommendations.length === 0 ? (
          <div
            style={{
              backgroundColor: '#181824',
              borderRadius: '12px',
              padding: '60px 24px',
              textAlign: 'center',
              color: '#a3a3b2',
            }}
          >
            <Film size={48} color="#e50914" style={{ margin: '0 auto 16px auto', opacity: 0.8 }} />
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
              No recommendations available yet
            </h2>
            <p style={{ maxWidth: '500px', margin: '0 auto 24px auto', fontSize: '0.9rem' }}>
              Rate movies from the catalog or explore using our Mood Sliders to start building your taste vector!
            </p>
            <Link to="/discover" className="glow-button">
              <span>Explore Discover</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '24px',
            }}
          >
            {recommendations.map((movie) => (
              <div key={movie.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <MovieCard
                  movie={movie}
                  onPlayTrailer={(m) => setActiveTrailer(m)}
                />

                {/* Explainable AI ("Why this movie?") */}
                {movie.explanation && (
                  <div
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.07)',
                      borderRadius: '6px',
                      padding: '10px 12px',
                      fontSize: '0.75rem',
                      lineHeight: 1.4,
                      color: '#b5b5c4',
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        color: '#e50914',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginBottom: '4px',
                      }}
                    >
                      <Sparkles size={12} />
                      <span>Why this movie?</span>
                    </div>
                    <p>{movie.explanation}</p>
                  </div>
                )}
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

export default RecommendationsPage;
