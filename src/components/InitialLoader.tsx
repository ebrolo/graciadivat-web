'use client';

import React, { useState, useEffect } from 'react';

export function InitialLoader() {
  const [stage, setStage] = useState<'visible' | 'fading' | 'done'>('visible');

  useEffect(() => {
    // Lock body scroll during initial preloader
    document.body.style.overflow = 'hidden';

    // Begin fade out at 1350ms
    const t1 = setTimeout(() => {
      setStage('fading');
      window.dispatchEvent(new CustomEvent('initial-loader-start-fade'));
    }, 1350);

    // Completely unmount and unlock scroll at 1950ms
    const t2 = setTimeout(() => {
      setStage('done');
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('initial-loader-complete'));
    }, 1950);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = '';
    };
  }, []);

  if (stage === 'done') return null;

  return (
    <div
      id="initial-loader"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#0C0A09',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: stage === 'fading' ? 0 : 1,
        pointerEvents: stage === 'fading' ? 'none' : 'auto',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.85rem',
        }}
      >
        {/* Brand Wordmark */}
        <span
          className="font-serif"
          style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.5rem)',
            fontWeight: 400,
            letterSpacing: '0.24em',
            color: '#E8D8C0',
            lineHeight: 1,
            textTransform: 'uppercase',
            textShadow: '0 0 40px rgba(197, 168, 128, 0.3)',
          }}
        >
          GRÁCIA
        </span>

        {/* Submark */}
        <span
          style={{
            fontSize: '0.68rem',
            fontWeight: 500,
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: '#9C9283',
            fontFamily: '"Helvetica Now Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
          }}
        >
          NŐI DIVAT • NYÍREGYHÁZA
        </span>

        {/* Minimalist Golden Progress Hairline */}
        <div
          style={{
            width: '120px',
            height: '1px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            marginTop: '1.5rem',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div className="initial-loader-progress-bar" />
        </div>
      </div>

      <style jsx>{`
        .initial-loader-progress-bar {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 100%;
          background: linear-gradient(
            to right,
            transparent,
            var(--accent-gold),
            transparent
          );
          animation: loaderBeam 1.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes loaderBeam {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
