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

  // Track scroll progress across scroll track
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

  // Desktop active calculations:
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

  const statementsDesktop = [
    { opacity: op0, translateY: ty0 },
    { opacity: op1, translateY: ty1 },
    { opacity: op2, translateY: ty2 },
  ];

  // Active index for indicator lines and mobile spotlight cycle
  let activeIndex = 0;
  if (p >= 0.52) {
    activeIndex = 2;
  } else if (p >= 0.26) {
    activeIndex = 1;
  }

  // Mobile spotlight statements calculation (one-by-one spotlight)
  // Stage 1 (0 <= p <= 0.28): statement 0
  // Stage 2 (0.28 < p <= 0.56): statement 1
  // Stage 3 (0.56 < p <= 0.82): statement 2
  const mobOp0 = p < 0.24 ? 1 : Math.max(0, 1 - (p - 0.24) / 0.08);
  const mobOp1 = p < 0.26 ? 0 : p < 0.52 ? Math.min(1, (p - 0.26) / 0.08) : Math.max(0, 1 - (p - 0.52) / 0.08);
  const mobOp2 = p < 0.54 ? 0 : Math.min(1, (p - 0.54) / 0.08);

  const mobStatements = [
    { opacity: mobOp0 },
    { opacity: mobOp1 },
    { opacity: mobOp2 },
  ];

  // Subtle luxury parallax & scale for the model portrait
  const imageScale = 1.025 - 0.025 * p;
  const imageTranslateY = p * 12;

  return (
    <div
      ref={containerRef}
      id="about"
      className="about-scroll-track"
      style={{
        position: 'relative',
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
        <div className="container-luxury about-content-container">
          <div className="about-grid-layout">
            {/* Left Column: Pristine Visual Portrait Frame (Full 2:3 ratio, legs and shoes visible) */}
            <div className="about-visual-portrait-container">
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

              {/* Main Visual Image Frame: 2/3 Aspect Ratio allows complete view without cropping */}
              <div
                className="about-image-card-box"
                style={{
                  overflow: 'hidden',
                  boxShadow: '0 24px 60px -15px rgba(26, 22, 18, 0.15)',
                  border: '1px solid rgba(197, 168, 128, 0.35)',
                  position: 'relative',
                  aspectRatio: '2 / 3',
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
                    objectPosition: 'center 20%',
                    display: 'block',
                    transform: `scale(${imageScale}) translateY(${imageTranslateY}px)`,
                    transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
                    willChange: 'transform',
                  }}
                />
              </div>
            </div>

            {/* Right Column: Radical Minimalist Typographic Manifesto */}
            <div className="about-text-column">
              {/* Category Pill Tag */}
              <div className="about-category-tag-wrapper">
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-gold)',
                    display: 'inline-block',
                    fontFamily: '"Helvetica Now Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
                  }}
                >
                  {language === 'hu' ? 'A Grácia Filozófiája' : 'The Grácia Philosophy'}
                </span>
              </div>

              {/* Minimalist Progress Dashes */}
              <div
                className="about-progress-dashes"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
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

              {/* DESKTOP MANIFESTO STAGE */}
              <div className="about-manifesto-stage-desktop">
                {manifesto.map((item, index) => {
                  const state = statementsDesktop[index];
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
                        className="font-serif about-manifesto-title"
                        style={{
                          lineHeight: 1.12,
                          letterSpacing: '-0.02em',
                          fontWeight: 400,
                          color: 'var(--text-main)',
                          margin: 0,
                          textAlign: 'left',
                        }}
                      >
                        {item.statement[language]}
                      </h2>
                    </div>
                  );
                })}
              </div>

              {/* MOBILE SPOTLIGHT STAGE (Statements appear one by one in spotlight) */}
              <div className="about-mobile-spotlight-box">
                {manifesto.map((item, index) => {
                  const st = mobStatements[index];
                  return (
                    <div
                      key={item.id}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        opacity: st.opacity,
                        pointerEvents: st.opacity > 0.5 ? 'auto' : 'none',
                        transition: 'opacity 0.25s ease-out',
                      }}
                    >
                      <h2
                        className="font-serif about-manifesto-mobile-title"
                        style={{
                          lineHeight: 1.18,
                          letterSpacing: '-0.015em',
                          fontWeight: 400,
                          color: 'var(--text-main)',
                          margin: 0,
                          textAlign: 'left',
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

      {/* MOBILE SEQUENTIAL STACKED SECTION (Natural page scroll: after 3rd sentence has had its moment, page scrolls naturally into all 3 statements stacked row-by-row without numbers) */}
      <div className="about-mobile-stacked-section">
        <div className="container-luxury" style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
          <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--accent-gold)',
                display: 'inline-block',
              }}
            >
              {language === 'hu' ? 'A Grácia Hitvallása' : 'The Grácia Creed'}
            </span>
          </div>

          <div className="about-mobile-stacked-rows-container">
            {manifesto.map((item) => (
              <div
                key={item.id}
                className="about-mobile-statement-row"
              >
                <h2 className="font-serif about-manifesto-mobile-title">
                  {item.statement[language]}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .about-scroll-track {
          height: 180vh;
        }
        .about-content-container {
          width: 100%;
          padding-top: clamp(5.8rem, 11vh, 7.8rem);
          padding-bottom: 2.5rem;
        }
        .about-grid-layout {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: clamp(3rem, 7vw, 7rem);
          align-items: center;
        }
        .about-visual-portrait-container {
          position: relative;
          width: 100%;
          max-width: clamp(280px, 25vw, 380px);
          margin: 0 auto;
        }
        .about-text-column {
          max-width: 620px;
          width: 100%;
        }
        .about-category-tag-wrapper {
          text-align: left;
          margin-bottom: 2rem;
        }
        .about-progress-dashes {
          justify-content: flex-start;
          margin-bottom: 2.5rem;
        }
        .about-manifesto-stage-desktop {
          position: relative;
          min-height: 220px;
          display: flex;
          align-items: center;
        }
        .about-manifesto-title {
          font-size: clamp(2.4rem, 4.6vw, 4.2rem);
        }
        .about-mobile-spotlight-box {
          display: none;
        }
        .about-mobile-stacked-section {
          display: none;
        }

        @media (max-width: 1023px) {
          .about-scroll-track {
            height: 220vh !important;
          }
          .about-sticky-frame {
            position: sticky !important;
            top: 0 !important;
            height: 100dvh !important;
            min-height: 100dvh !important;
            display: flex !important;
            align-items: center !important;
            z-index: 10 !important;
          }
          .about-content-container {
            padding-top: 5rem !important;
            padding-bottom: 1.5rem !important;
          }
          .about-grid-layout {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .about-visual-portrait-container {
            max-width: 220px !important;
            margin: 0 auto !important;
          }
          .about-accent-hairline-frame {
            display: none !important;
          }
          .about-text-column {
            margin: 0 !important;
            max-width: 100% !important;
          }
          .about-category-tag-wrapper {
            text-align: left !important;
            margin-bottom: 0.75rem !important;
          }
          .about-progress-dashes {
            display: flex !important;
            margin-bottom: 1.25rem !important;
          }
          .about-manifesto-stage-desktop {
            display: none !important;
          }
          .about-mobile-spotlight-box {
            display: block !important;
            position: relative !important;
            min-height: 140px !important;
            width: 100% !important;
          }
          .about-mobile-stacked-section {
            display: block !important;
            position: relative !important;
            background-color: #F8F5EE !important;
            padding-top: 3.5rem !important;
            padding-bottom: 4.5rem !important;
            border-top: 1px dashed rgba(197, 168, 128, 0.4) !important;
            z-index: 20 !important;
          }
          .about-mobile-stacked-rows-container {
            display: flex !important;
            flex-direction: column !important;
            gap: 2.2rem !important;
            width: 100% !important;
          }
          .about-mobile-statement-row {
            display: flex !important;
            flex-direction: column !important;
            padding-left: 1.25rem !important;
            border-left: 2px solid var(--accent-gold) !important;
            text-align: left !important;
          }
          .about-manifesto-mobile-title {
            font-size: clamp(1.75rem, 6.8vw, 2.35rem) !important;
            line-height: 1.2 !important;
            letter-spacing: -0.015em !important;
            font-weight: 400 !important;
            color: var(--text-main) !important;
            margin: 0 !important;
            text-align: left !important;
          }
        }
      `}</style>
    </div>
  );
}