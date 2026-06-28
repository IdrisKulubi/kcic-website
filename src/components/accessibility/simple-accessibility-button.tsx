'use client';

import React, { useState } from 'react';
import { Accessibility } from 'lucide-react';

export function SimpleAccessibilityButton() {
  const [isVisible] = useState(true);

  const handleClick = () => {
    alert('Accessibility button clicked! The full panel will be available once the context is working.');
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleClick}
      className="accessibility-floating-button"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        backgroundColor: '#10B981',
        color: 'white',
        border: 'none',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        cursor: 'pointer',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.backgroundColor = '#059669';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.backgroundColor = '#10B981';
      }}
      aria-label="Open accessibility settings"
      title="Accessibility Settings"
    >
      <Accessibility size={24} />
    </button>
  );
}