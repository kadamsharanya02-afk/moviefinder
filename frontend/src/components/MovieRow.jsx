import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies = [], onPlayTrailer, onWatchlistChange, subtitle }) => {
  const rowRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      const newScrollLeft = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

      rowRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  const onScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div style={{ marginBottom: '40px', position: 'relative' }}>
      {/* Row Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '14px', padding: '0 24px' }}>
        <h3
          style={{
            fontSize: '1.35rem',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.3px',
          }}
        >
          {title}
        </h3>
        {subtitle && (
          <span style={{ fontSize: '0.85rem', color: '#a3a3b2' }}>
            {subtitle}
          </span>
        )}
      </div>

      {/* Row Slider Container */}
      <div style={{ position: 'relative', group: 'relative' }}>
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => handleScroll('left')}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '48px',
              backgroundColor: 'rgba(10, 10, 15, 0.7)',
              backdropFilter: 'blur(6px)',
              border: 'none',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(229, 9, 20, 0.7)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(10, 10, 15, 0.7)')}
          >
            <ChevronLeft size={28} />
          </button>
        )}

        {/* Scrollable Movies List */}
        <div
          ref={rowRef}
          onScroll={onScroll}
          style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            padding: '10px 24px 20px 24px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {movies.map((movie) => (
            <div key={movie.id} style={{ flex: '0 0 190px', width: '190px' }}>
              <MovieCard
                movie={movie}
                onPlayTrailer={onPlayTrailer}
                onWatchlistChange={onWatchlistChange}
              />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => handleScroll('right')}
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: '48px',
              backgroundColor: 'rgba(10, 10, 15, 0.7)',
              backdropFilter: 'blur(6px)',
              border: 'none',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(229, 9, 20, 0.7)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(10, 10, 15, 0.7)')}
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieRow;
