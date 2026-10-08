import React, { useState } from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ initialRating = 0, onRate, size = 20, readonly = false }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(initialRating || 0);

  const handleClick = (val) => {
    if (readonly) return;
    setRating(val);
    if (onRate) onRate(val);
  };

  const currentDisplay = hoverRating || rating || initialRating || 0;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= currentDisplay;
        return (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => handleClick(star)}
            onMouseEnter={() => !readonly && setHoverRating(star)}
            onMouseLeave={() => !readonly && setHoverRating(0)}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '2px',
              cursor: readonly ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.15s ease',
            }}
            onMouseOver={(e) => {
              if (!readonly) e.currentTarget.style.transform = 'scale(1.2)';
            }}
            onMouseOut={(e) => {
              if (!readonly) e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Star
              size={size}
              fill={isFilled ? '#ffb800' : 'none'}
              color={isFilled ? '#ffb800' : '#4a4a5a'}
              strokeWidth={2}
            />
          </button>
        );
      })}
      {rating > 0 && !readonly && (
        <span style={{ fontSize: '0.85rem', color: '#ffb800', fontWeight: 600, marginLeft: '6px' }}>
          {rating}/5
        </span>
      )}
    </div>
  );
};

export default RatingStars;
