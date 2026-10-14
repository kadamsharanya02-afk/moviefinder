import React, { useState, useEffect } from 'react';
import api from '../api/client';
import HeroBanner from '../components/HeroBanner';
import MovieRow from '../components/MovieRow';
import TrailerModal from '../components/TrailerModal';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [bollywoodMovies, setBollywoodMovies] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);
  const [becauseYouWatched, setBecauseYouWatched] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Trailer Modal State
  const [activeTrailer, setActiveTrailer] = useState(null);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);

        const [featuredRes, trendingRes, popularRes, topRatedRes, bollywoodRes, tvSeriesRes] = await Promise.all([
          api.get('/movies/featured'),
          api.get('/movies/trending'),
          api.get('/movies/popular'),
          api.get('/movies/top-rated'),
          api.get('/movies/bollywood'),
          api.get('/movies/tv-series'),
        ]);

        setFeaturedMovie(featuredRes.data);
        setTrendingMovies(trendingRes.data);
        setPopularMovies(popularRes.data);
        setTopRatedMovies(topRatedRes.data);
        setBollywoodMovies(bollywoodRes.data);
        setTvSeries(tvSeriesRes.data);

        // Fetch user-personalized rows if authenticated
        if (isAuthenticated) {
          try {
            const [watchedRes, recRes] = await Promise.all([
              api.get('/movies/because-you-watched'),
              api.get('/recommendations'),
            ]);
            setBecauseYouWatched(watchedRes.data);
            if (recRes.data && recRes.data.recommendations) {
              setRecommendedMovies(recRes.data.recommendations);
            }
          } catch (e) {
            console.warn('Personalized rows could not be loaded:', e);
          }
        }
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, [isAuthenticated]);

  const handlePlayTrailer = (movie) => {
    setActiveTrailer(movie);
  };

  const handleCloseTrailer = () => {
    setActiveTrailer(null);
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '3px solid rgba(229, 9, 20, 0.2)',
            borderTopColor: '#e50914',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        <p style={{ color: '#a3a3b2', fontSize: '0.9rem' }}>Loading cinematic experience...</p>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '60px', overflowX: 'hidden' }}>
      {/* Featured Movie Hero Banner */}
      {featuredMovie && (
        <HeroBanner movie={featuredMovie} onPlayTrailer={handlePlayTrailer} />
      )}

      {/* Main Horizontally Scrollable Sections */}
      <div style={{ marginTop: '-40px', position: 'relative', zIndex: 20 }}>
        {recommendedMovies.length > 0 && (
          <MovieRow
            title="Recommended For You"
            subtitle="Matched to your personal taste & ratings"
            movies={recommendedMovies}
            onPlayTrailer={handlePlayTrailer}
          />
        )}

        {becauseYouWatched.length > 0 && (
          <MovieRow
            title="Because You Watched..."
            subtitle="Similar tone and themes to your recent activity"
            movies={becauseYouWatched}
            onPlayTrailer={handlePlayTrailer}
          />
        )}

        <MovieRow
          title="Trending Now"
          subtitle="Recent releases and high-momentum titles"
          movies={trendingMovies}
          onPlayTrailer={handlePlayTrailer}
        />

        {bollywoodMovies.length > 0 && (
          <MovieRow
            title="Bollywood Blockbusters"
            subtitle="Iconic Hindi cinema, timeless dramas & comedy classics"
            movies={bollywoodMovies}
            onPlayTrailer={handlePlayTrailer}
          />
        )}

        {tvSeries.length > 0 && (
          <MovieRow
            title="Top Rated TV Series & Web Shows"
            subtitle="Critically acclaimed binge-worthy multi-season sagas"
            movies={tvSeries}
            onPlayTrailer={handlePlayTrailer}
          />
        )}

        <MovieRow
          title="Popular on MovieFinder"
          subtitle="Most viewed and saved across audiences"
          movies={popularMovies}
          onPlayTrailer={handlePlayTrailer}
        />

        <MovieRow
          title="Critically Acclaimed & Top Rated"
          subtitle="Highest composite review scores on TMDB & IMDb"
          movies={topRatedMovies}
          onPlayTrailer={handlePlayTrailer}
        />
      </div>

      {/* Trailer Modal Player */}
      <TrailerModal
        isOpen={!!activeTrailer}
        trailerUrl={activeTrailer?.trailerUrl}
        title={activeTrailer?.title}
        onClose={handleCloseTrailer}
      />
    </div>
  );
};

export default HomePage;
