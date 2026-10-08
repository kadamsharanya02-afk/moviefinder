import React, { useState, useEffect } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import MovieCard from '../components/MovieCard';
import TrailerModal from '../components/TrailerModal';
import { User, Star, Bookmark, PieChart, Activity, Sliders, Calendar, Mail, Award, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTrailer, setActiveTrailer] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get('/user/profile');
        setProfile(res.data);
      } catch (err) {
        console.error('Error fetching user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
        <span>Loading personal taste profile...</span>
      </div>
    );
  }

  const genreTaste = profile?.genrePreferences || {};
  const vibeTaste = profile?.vibePreferences || {};
  const recentRatings = profile?.recentRatings || [];

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px', minHeight: '100vh' }}>
      <div className="container">
        {/* User Profile Header Card */}
        <div
          style={{
            backgroundColor: '#181824',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '40px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #e50914 0%, #301115 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  border: '3px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 24px rgba(229, 9, 20, 0.4)',
                }}
              >
                {profile?.fullName ? profile.fullName[0].toUpperCase() : 'U'}
              </div>

              <div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
                  {profile?.fullName || 'Movie Enthusiast'}
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', color: '#a3a3b2', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Mail size={15} />
                    <span>{profile?.email}</span>
                  </div>
                  {profile?.memberSince && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Calendar size={15} />
                      <span>Member since {new Date(profile.memberSince).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stat Counters */}
            <div style={{ display: 'flex', gap: '20px' }}>
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  padding: '16px 24px',
                  textAlign: 'center',
                  minWidth: '120px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#ffb800' }}>
                  <Star size={16} fill="#ffb800" />
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
                    {profile?.totalRatings || 0}
                  </span>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#a3a3b2', marginTop: '4px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Movies Rated
                </p>
              </div>

              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  padding: '16px 24px',
                  textAlign: 'center',
                  minWidth: '120px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#e50914' }}>
                  <Bookmark size={16} fill="#e50914" />
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
                    {profile?.totalWatchlist || 0}
                  </span>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#a3a3b2', marginTop: '4px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Watchlist
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Your Movie Taste Dynamic Breakdown (Requirement #8) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '32px',
            marginBottom: '40px',
          }}
        >
          {/* Left: Your Movie Taste (Genre Affinity Chart) */}
          <div
            style={{
              backgroundColor: '#181824',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '14px',
              padding: '28px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <PieChart size={20} color="#e50914" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                Your Movie Taste
              </h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#a3a3b2', marginBottom: '24px' }}>
              Dynamically derived from your movie ratings and watch history.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {Object.entries(genreTaste).map(([genre, pct], idx) => {
                const colorPalette = ['#e50914', '#ff4b4b', '#ff7849', '#ffaa00', '#36b37e', '#00b8d9', '#6554c0'];
                const barColor = colorPalette[idx % colorPalette.length];

                return (
                  <div key={genre}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#ffffff' }}>
                        {genre}
                      </span>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: barColor }}>
                        {pct}%
                      </span>
                    </div>

                    <div
                      style={{
                        width: '100%',
                        height: '10px',
                        backgroundColor: '#262636',
                        borderRadius: '5px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${pct}%`,
                          height: '100%',
                          backgroundColor: barColor,
                          borderRadius: '5px',
                          transition: 'width 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Vibe Matrix (9 dimensions) */}
          <div
            style={{
              backgroundColor: '#181824',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '14px',
              padding: '28px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sliders size={20} color="#e50914" />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                  Learned Vibe Vector
                </h2>
              </div>
              <Link to="/discover" style={{ fontSize: '0.8rem', color: '#ff6b6b', fontWeight: 600 }}>
                Adjust in Discover
              </Link>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#a3a3b2', marginBottom: '24px' }}>
              Current mood weights feeding into your recommendation algorithm.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '14px' }}>
              {Object.entries(vibeTaste).map(([vibeName, vibeScore]) => (
                <div
                  key={vibeName}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '8px',
                    padding: '12px',
                    textAlign: 'center',
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: '#a3a3b2', textTransform: 'uppercase', fontWeight: 600 }}>
                    {vibeName}
                  </span>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: vibeScore > 60 ? '#ff6b6b' : '#ffffff', margin: '4px 0' }}>
                    {vibeScore}%
                  </div>
                  <div style={{ width: '100%', height: '4px', backgroundColor: '#2b2b3d', borderRadius: '2px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${vibeScore}%`,
                        height: '100%',
                        backgroundColor: vibeScore > 60 ? '#e50914' : '#5c5c72',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section: Recent Ratings */}
        {recentRatings.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '18px' }}>
              Your Recently Rated Movies
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '20px',
              }}
            >
              {recentRatings.map((movie) => (
                <div key={movie.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <MovieCard
                    movie={movie}
                    onPlayTrailer={(m) => setActiveTrailer(m)}
                  />
                  {movie.userRating && (
                    <div
                      style={{
                        backgroundColor: 'rgba(255, 184, 0, 0.1)',
                        border: '1px solid rgba(255, 184, 0, 0.3)',
                        borderRadius: '6px',
                        padding: '6px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        color: '#ffb800',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                      }}
                    >
                      <Star size={14} fill="#ffb800" color="#ffb800" />
                      <span>You rated {movie.userRating}/5</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
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

export default ProfilePage;
