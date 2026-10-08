import React from 'react';

const VibeSlider = ({ label, value, onChange, icon, description }) => {
  return (
    <div
      style={{
        backgroundColor: '#181824',
        padding: '16px 20px',
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        transition: 'all 0.25s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(229, 9, 20, 0.3)';
        e.currentTarget.style.backgroundColor = '#1d1d2b';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
        e.currentTarget.style.backgroundColor = '#181824';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {icon && <span style={{ color: '#e50914' }}>{icon}</span>}
          <div>
            <span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#ffffff' }}>{label}</span>
            {description && (
              <p style={{ fontSize: '0.75rem', color: '#a3a3b2', marginTop: '2px' }}>{description}</p>
            )}
          </div>
        </div>

        <div
          style={{
            padding: '3px 10px',
            borderRadius: '12px',
            backgroundColor: value > 60 ? 'rgba(229, 9, 20, 0.2)' : 'rgba(255, 255, 255, 0.08)',
            border: value > 60 ? '1px solid rgba(229, 9, 20, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
            fontWeight: 700,
            fontSize: '0.85rem',
            color: value > 60 ? '#ff6b6b' : '#ffffff',
            minWidth: '50px',
            textAlign: 'center',
          }}
        >
          {value}%
        </div>
      </div>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          style={{
            width: '100%',
            height: '6px',
            background: `linear-gradient(to right, #e50914 0%, #e50914 ${value}%, #2b2b3d ${value}%, #2b2b3d 100%)`,
          }}
        />
      </div>
    </div>
  );
};

export default VibeSlider;
