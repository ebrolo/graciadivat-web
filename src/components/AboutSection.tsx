'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { siteData } from '@/data/siteData';

export function AboutSection() {
  const { language } = useLanguage();
  const { about } = siteData;
  const manifesto = about.manifesto;

  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress across 170vh track
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalScroll = rect.height - windowHeight;
    if (totalScroll <= 0) return;

    const currentScroll = -rect.top;
    const progress = Math.max(0, Math.min(1, currentScroll / totalScroll));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const p = scrollProgress;

  // Statement 0 (Időt szánunk rád): Active p = 0.00 -> 0.34
  const op0 = p < 0.26 ? 1 : Math.max(0, 1 - (p - 0.26) / 0.10);
  const ty0 = p < 0.26 ? 0 : -(p - 0.26) * 60;

  // Statement 1 (Minden nőnek, minden alkatra): Active p = 0.32 -> 0.68
  const op1 =
    p < 0.30
      ? 0
      : p < 0.58
      ? Math.min(1, (p - 0.30) / 0.10)
      : Math.max(0, 1 - (p - 0.58) / 0.10);
  const ty1 =
    p < 0.30
      ? 20
      : p < 0.58
      ? (1 - Math.min(1, (p - 0.30) / 0.10)) * 20
      : -(p - 0.58) * 60;

  // Statement 2 (A felejthetetlen pillanatokért): Active p = 0.64 -> 1.00
  const op2 = p < 0.62 ? 0 : Math.min(1, (p - 0.62) / 0.10);
  const ty2 = p < 0.62 ? 20 : (1 - op2) * 20;

  const statementsState = [
    { opacity: op0, translateY: ty0 },
    { opacity: op1, translateY: ty1 },
    { opacity: op2, translateY: ty2 },
  ];

  // Active index for the minimalist indicator lines
  let activeIndex = 0;
  if (p >= 0.62) {
    activeIndex = 2;
  } else if (p >= 0.30) {
    activeIndex = 1;
  }

  return (
    <div
      ref={containerRef}
      id="about"
      className="about-scroll-track"
      style={{
        position: 'relative',
        height: '170vh',
        width: '100%',
        backgroundColor: '#F8F5EE',
        borderTop: '1px solid rgba(197, 168, 128, 0.35)',
      }}
    >
      {/* Sticky Viewport Frame */}
      <div
        className="about-sticky-frame"
        style={{
          position: 'sticky',
          top: 0,
          minHeight: '100dvh',
          height: '100dvh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#F8F5EE',
        }}
      >
        <div
          className="container-luxury"
          style={{
            width: '100%',
            paddingTop: 'clamp(5.8rem, 11vh, 7.8rem)',
            paddingBottom: '2.5rem',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(3rem, 7vw, 7rem)',
              alignItems: 'center',
            }}
          >
            {/* Left Column: Pristine Visual Portrait Frame (Uncropped, Head Completely Visible, Zero Clutter) */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '460px', margin: '0 auto' }}>
              {/* Elegant Hairline Offset Accent Frame */}
              <div
                className="about-accent-hairline-frame"
                style={{
                  position: 'absolute',
                  inset: '-14px -14px 14px 14px',
                  border: '1px solid rgba(197, 168, 128, 0.45)',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />

              {/* Main Visual Image Frame: 100% Clean, No Cards/Badges */}
              <div
                style={{
                  overflow: 'hidden',
                  boxShadow: '0 24px 60px -15px rgba(26, 22, 18, 0.15)',
                  border: '1px solid rgba(197, 168, 128, 0.35)',
                  position: 'relative',
                  aspectRatio: '3/4',
                  backgroundColor: '#F8F5EE',
                  zIndex: 2,
                }}
              >
                <img
                  src="/images/collection/846646474_1422651720063716_8159150398027964920_n.jpg"
                  alt="Grácia Szalon Nyíregyháza - Elegáns Modell"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    transform: 'scale(1.0)',
                    display: 'block',
                  }}
                />
              </div>
            </div>

            {/* Right Column: Radical Minimalist Typographic Manifesto */}
            <div style={{ maxWidth: '620px' }}>
              {/* Category Pill Tag */}
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-gold)',
                  display: 'inline-block',
                  marginBottom: '2rem',
                  fontFamily: '"Helvetica Now Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
                }}
              >
                {language === 'hu' ? 'A Grácia Filozófiája' : 'The Grácia Philosophy'}
              </span>

              {/* Minimalist Progress Dashes */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '2.5rem',
                }}
              >
                {[0, 1, 2].map((idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <div
                      key={idx}
                      style={{
                        height: '2px',
                        width: isActive ? '36px' : '16px',
                        backgroundColor: isActive ? 'var(--accent-gold)' : 'rgba(197, 168, 128, 0.3)',
                        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                  );
                })}
              </div>

              {/* Dynamic Manifesto Statements Swapping In Place - ZERO Cards, Pure Monumental Serif */}
              <div
                className="about-manifesto-stage"
                style={{
                  position: 'relative',
                  minHeight: '220px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {manifesto.map((item, index) => {
                  const state = statementsState[index];
                  return (
                    <div
                      key={item.id}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        opacity: state.opacity,
                        transform: `translateY(${state.translateY}px)`,
                        pointerEvents: state.opacity > 0.5 ? 'auto' : 'none',
                        transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
                      }}
                    >
                      <h2
                        className="font-serif"
                        style={{
                          fontSize: 'clamp(2.4rem, 4.6vw, 4.2rem)',
                          lineHeight: 1.12,
                          letterSpacing: '-0.02em',
                          fontWeight: 400,
                          color: 'var(--text-main)',
                          margin: 0,
                        }}
                      >
                        {item.statement[language]}
                      </h2>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1023px) {
          .about-scroll-track {
            height: auto !important;
          }
          .about-sticky-frame {
            position: relative !important;
            height: auto !important;
            min-height: auto !important;
            padding: 4.5rem 0 !important;
          }
          .about-manifesto-stage {
            position: relative !important;
            min-height: auto !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 2rem !important;
          }
          .about-manifesto-stage > div {
            position: relative !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .about-accent-hairline-frame {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
