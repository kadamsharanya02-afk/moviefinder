import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/client';
import VibeSlider from '../components/VibeSlider';
import MovieCard from '../components/MovieCard';
import TrailerModal from '../components/TrailerModal';
import { Sparkles, Sliders, Search, ArrowRight, RefreshCw, Flame, Heart, Zap, Smile, Film, ShieldAlert, Skull, Eye } from 'lucide-react';

const DiscoverPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  // Natural Language Prompt State
  const [prompt, setPrompt] = useState(initialQuery);
  const [analyzingAi, setAnalyzingAi] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState(null);

  // 9 Vibe Sliders (0 - 100)
  const [vibes, setVibes] = useState({
    horror: 30,
    romance: 30,
    thriller: 50,
    comedy: 40,
    drama: 50,
    action: 50,
    mystery: 40,
    violence: 30,
    darkness: 35,
  });

  // Recommendations Results
  const [recommendations, setRecommendations] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);
  const [activeTrailer, setActiveTrailer] = useState(null);

  const samplePrompts = [
    'I want something creepy and romantic with lots of suspense but not too violent.',
    'A mind-bending sci-fi mystery that keeps me guessing till the end.',
    'An uplifting, hilarious comedy with lots of heart and zero darkness.',
    'Dark gritty crime thriller with intense tension and high stakes.',
    'A visually stunning action spectacle with explosive energy.',
  ];

  const handleSliderChange = (key, val) => {
    setVibes((prev) => ({ ...prev, [key]: val }));
  };

  // AI Prompt Analysis
  const handleAnalyzePrompt = async (e) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;

    setAnalyzingAi(true);
    setAiAnalysisResult(null);

    try {
      const res = await api.post('/ai/analyze', { prompt });
      const { vibes: aiVibes, explanation, detectedKeywords } = res.data;

      // Animate sliders to new AI values
      setVibes(aiVibes);
      setAiAnalysisResult({ explanation, detectedKeywords });

      // Automatically search with the updated vibe settings
      fetchRecommendations(aiVibes);
    } catch (err) {
      console.error('AI analysis error:', err);
    } finally {
      setAnalyzingAi(false);
    }
  };

  // Find My Movies using Recommendation Engine
  const fetchRecommendations = async (customVibes = vibes) => {
    setLoadingResults(true);
    try {
      const res = await api.post('/recommendations/vibe', {
        prompt,
        ...customVibes,
      });
      setRecommendations(res.data.recommendations || []);
    } catch (err) {
      console.error('Error fetching vibe recommendations:', err);
    } finally {
      setLoadingResults(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      handleAnalyzePrompt();
    } else {
      fetchRecommendations();
    }
  }, []);

  const resetSliders = () => {
    const defaultVibes = {
      horror: 30,
      romance: 30,
      thriller: 50,
      comedy: 40,
      drama: 50,
      action: 50,
      mystery: 40,
      violence: 30,
      darkness: 35,
    };
    setVibes(defaultVibes);
    setAiAnalysisResult(null);
    fetchRecommendations(defaultVibes);
  };

  const sliderConfigs = [
    { key: 'horror', label: 'Horror', icon: <Skull size={18} />, desc: 'Fear, chills & jump scares' },
    { key: 'romance', label: 'Romance', icon: <Heart size={18} />, desc: 'Love, chemistry & intimacy' },
    { key: 'thriller', label: 'Thriller', icon: <Flame size={18} />, desc: 'Suspense, edge-of-seat tension' },
    { key: 'comedy', label: 'Comedy', icon: <Smile size={18} />, desc: 'Laughs, satire & lightness' },
    { key: 'drama', label: 'Drama', icon: <Film size={18} />, desc: 'Emotional depth & human journeys' },
    { key: 'action', label: 'Action', icon: <Zap size={18} />, desc: 'Adrenaline, stunts & high octane' },
    { key: 'mystery', label: 'Mystery', icon: <Eye size={18} />, desc: 'Puzzles, twists & investigations' },
    { key: 'violence', label: 'Violence', icon: <ShieldAlert size={18} />, desc: 'Grit, blood & combat intensity' },
    { key: 'darkness', label: 'Darkness', icon: <Skull size={18} />, desc: 'Bleak, noir & melancholic mood' },
  ];

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px auto' }}>
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
            <span>AI VIBE & MOOD ENGINE</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.8px',
              marginBottom: '12px',
            }}
          >
            What are you in the mood for?
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#a3a3b2', lineHeight: 1.6 }}>
            Describe your ideal film in plain English or fine-tune the vibe sliders below. Our hybrid recommendation
            algorithm calculates exact match vectors across real movie database entries.
          </p>
        </div>

        {/* Section 1: Natural Language AI Search */}
        <div
          style={{
            backgroundColor: '#14141e',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '28px',
            marginBottom: '40px',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Sparkles size={18} color="#e50914" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>
              Tell us what you want to watch
            </h3>
          </div>

          <form onSubmit={handleAnalyzePrompt} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div
              style={{
                flex: '1 1 500px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                borderRadius: '10px',
                padding: '14px 18px',
                transition: 'border-color 0.2s',
              }}
            >
              <Search size={20} color="#a3a3b2" style={{ marginRight: '12px' }} />
              <input
                type="text"
                placeholder='e.g., "I want something creepy, romantic and suspenseful but not too violent."'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  width: '100%',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={analyzingAi || !prompt.trim()}
              className="glow-button"
              style={{
                padding: '14px 28px',
                fontSize: '0.95rem',
                minWidth: '180px',
                justifyContent: 'center',
              }}
            >
              {analyzingAi ? (
                <>
                  <RefreshCw size={18} className="spin-icon" />
                  <span>AI Tuning...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Analyze with AI</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Sample Prompts */}
          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6e6e82', textTransform: 'uppercase' }}>
              Try this:
            </span>
            {samplePrompts.map((sp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPrompt(sp);
                  setAnalyzingAi(true);
                  api.post('/ai/analyze', { prompt: sp })
                    .then((res) => {
                      setVibes(res.data.vibes);
                      setAiAnalysisResult({
                        explanation: res.data.explanation,
                        detectedKeywords: res.data.detectedKeywords,
                      });
                      fetchRecommendations(res.data.vibes);
                    })
                    .finally(() => setAnalyzingAi(false));
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#a3a3b2',
                  padding: '5px 12px',
                  borderRadius: '16px',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = 'rgba(229, 9, 20, 0.4)';
                  e.currentTarget.style.backgroundColor = 'rgba(229, 9, 20, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#a3a3b2';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                }}
              >
                "{sp.length > 55 ? sp.substring(0, 52) + '...' : sp}"
              </button>
            ))}
          </div>

          {/* AI Feedback Banner */}
          {aiAnalysisResult && (
            <div
              style={{
                marginTop: '20px',
                padding: '14px 18px',
                borderRadius: '10px',
                backgroundColor: 'rgba(229, 9, 20, 0.12)',
                border: '1px solid rgba(229, 9, 20, 0.3)',
                animation: 'fadeIn 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Sparkles size={16} color="#ff6b6b" />
                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#ff6b6b' }}>
                  AI Mood Extracted & Sliders Calibrated
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#e5e5e5' }}>
                {aiAnalysisResult.explanation}
              </p>
              {aiAnalysisResult.detectedKeywords && aiAnalysisResult.detectedKeywords.length > 0 && (
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
                  {aiAnalysisResult.detectedKeywords.map((kw, i) => (
                    <span key={i} className="pill pill-red">
                      {kw}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Section 2: Mood Sliders (0 - 100) */}
        <div style={{ marginBottom: '50px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={20} color="#e50914" />
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff' }}>
                Mood / Vibe Sliders (0 – 100%)
              </h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                type="button"
                onClick={resetSliders}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#a3a3b2',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#a3a3b2';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                }}
              >
                <RefreshCw size={14} />
                <span>Reset Defaults</span>
              </button>

              <button
                type="button"
                onClick={() => fetchRecommendations()}
                disabled={loadingResults}
                className="glow-button"
                style={{ padding: '10px 24px', fontSize: '0.9rem' }}
              >
                <span>Find My Movies</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* 3x3 Grid of 9 Vibe Sliders */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px',
            }}
          >
            {sliderConfigs.map((cfg) => (
              <VibeSlider
                key={cfg.key}
                label={cfg.label}
                icon={cfg.icon}
                description={cfg.desc}
                value={vibes[cfg.key]}
                onChange={(val) => handleSliderChange(cfg.key, val)}
              />
            ))}
          </div>
        </div>

        {/* Section 3: Recommendation Results Grid with Explainable AI ("Why this movie?") */}
        <div style={{ marginTop: '50px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
              Matched Discoveries
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#a3a3b2' }}>
              Ranked by similarity vector, user taste correlation, review quality, and your current mood settings.
            </p>
          </div>

          {loadingResults ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#a3a3b2' }}>
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
              <p>Calculating vibe vectors & scoring catalog...</p>
            </div>
          ) : recommendations.length === 0 ? (
            <div
              style={{
                backgroundColor: '#181824',
                borderRadius: '12px',
                padding: '40px',
                textAlign: 'center',
                color: '#a3a3b2',
              }}
            >
              <p style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '8px' }}>No matches found</p>
              <p>Try adjusting your sliders or entering a different search prompt.</p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
                gap: '24px',
              }}
            >
              {recommendations.map((movie) => (
                <div key={movie.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <MovieCard
                    movie={movie}
                    onPlayTrailer={(m) => setActiveTrailer(m)}
                  />

                  {/* "Why this movie?" Explainability Box */}
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

export default DiscoverPage;
