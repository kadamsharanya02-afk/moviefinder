import React from 'react';
import { X } from 'lucide-react';

const TrailerModal = ({ trailerUrl, title, isOpen, onClose }) => {
  if (!isOpen) return null;

  // Extract YouTube video ID
  let videoId = '';
  if (trailerUrl) {
    if (trailerUrl.includes('v=')) {
      videoId = trailerUrl.split('v=')[1]?.split('&')[0];
    } else if (trailerUrl.includes('youtu.be/')) {
      videoId = trailerUrl.split('youtu.be/')[1]?.split('?')[0];
    }
  }

  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
    : null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.25s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '900px',
          backgroundColor: '#12121a',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ffffff' }}>
            {title ? `${title} — Official Trailer` : 'Movie Trailer'}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#ffffff',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(229, 9, 20, 0.8)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
          >
            <X size={18} />
          </button>
        </div>

        {/* Video Player */}
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, backgroundColor: '#000' }}>
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={title || 'Trailer'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
            />
          ) : (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#a3a3b2',
              }}
            >
              Trailer preview unavailable for this title.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
