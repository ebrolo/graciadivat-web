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

  // Track scroll progress across the section track
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

  // Active index for indicator dashes
  let activeIndex = 0;
  if (p >= 0.28) {
    activeIndex = 2;
  } else if (p >= 0.14) {
    activeIndex = 1;
  }

  // -------------------------------------------------------------
  // MOBILE ANIMATION PHYSICS (Option A - All in-frame sequence)
  // -------------------------------------------------------------

  // STAGE 1: Spotlight Phase (Center-aligned, one-by-one, 3rd fades out)
  // Statement 0 (center): visible from 0.00 -> 0.10, fades out 0.10 -> 0.14
  const mobSpotOp0 = p < 0.10 ? 1 : Math.max(0, 1 - (p - 0.10) / 0.04);

  // Statement 1 (center): fades in 0.14 -> 0.18, holds 0.18 -> 0.24, fades out 0.24 -> 0.28
  const mobSpotOp1 =
    p < 0.14
      ? 0
      : p < 0.24
      ? Math.min(1, (p - 0.14) / 0.04)
      : Math.max(0, 1 - (p - 0.24) / 0.04);

  // Statement 2 (center): fades in 0.28 -> 0.32, holds 0.32 -> 0.38, cleanly fades out 0.38 -> 0.44
  const mobSpotOp2 =
    p < 0.28
      ? 0
      : p < 0.38
      ? Math.min(1, (p - 0.28) / 0.04)
      : Math.max(0, 1 - (p - 0.38) / 0.06);

  const mobSpotlight = [
    { opacity: mobSpotOp0 },
    { opacity: mobSpotOp1 },
    { opacity: mobSpotOp2 },
  ];

  // Dashes fade out with the 3rd statement
  const dashesOpacityMobile = p < 0.38 ? 1 : Math.max(0, 1 - (p - 0.38) / 0.06);

  // STAGE 2: Stacked Rows Phase (Left-aligned, sequential fade in under each other)
  // Statement 0 (left-aligned): fades in 0.48 -> 0.58
  const stackOp0 = p < 0.48 ? 0 : Math.min(1, (p - 0.48) / 0.10);

  // Statement 1 (left-aligned): fades in 0.60 -> 0.72
  const stackOp1 = p < 0.60 ? 0 : Math.min(1, (p - 0.60) / 0.10);

  // Statement 2 (left-aligned): fades in 0.74 -> 0.86
  const stackOp2 = p < 0.74 ? 0 : Math.min(1, (p - 0.74) / 0.10);

  const stackOpacities = [stackOp0, stackOp1, stackOp2];

  // Horizontal pan: The image stays firmly inside the frame.
  // Model placed slightly left initially (-28px).
  // Glides gently from left to right as you scroll.
  // objectPosition: 'center bottom' ensures the feet and gold shoes are 100% visible!
  const panOffset = -28 + p * 28;

  const isStackedStage = p >= 0.46;

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
      {/* Sticky Viewport Frame - Single cohesive container for entire section */}
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
            {/* Left Column: Model Image (2:3 aspect ratio, legs/shoes 100% visible, stays firmly in place while gliding subtly from left to right) */}
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

              {/* Main Visual Image Frame: 2/3 Aspect Ratio allows complete view of woman and gold heels */}
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
                    width: 'calc(100% + 28px)',
                    height: '100%',
                    maxWidth: 'none',
                    objectFit: 'cover',
                    objectPosition: 'center bottom',
                    display: 'block',
                    transform: `translateX(${panOffset}px)`,
                    transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
                    willChange: 'transform',
                  }}
                />
              </div>
            </div>

            {/* Right Column: Typographic Manifesto Stage */}
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
                  opacity: dashesOpacityMobile,
                  transition: 'opacity 0.25s ease-out',
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

              {/* MOBILE STAGE 1: Spotlight (CENTER ALIGNED, ONE-BY-ONE, 3RD FADES OUT) */}
              <div
                className="about-mobile-spotlight-box"
                style={{
                  opacity: isStackedStage ? 0 : 1,
                  pointerEvents: isStackedStage ? 'none' : 'auto',
                  transition: 'opacity 0.3s ease-out',
                }}
              >
                {manifesto.map((item, index) => {
                  const st = mobSpotlight[index];
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
                        textAlign: 'center',
                      }}
                    >
                      <h2
                        className="font-serif about-manifesto-mobile-title-center"
                        style={{
                          lineHeight: 1.18,
                          letterSpacing: '-0.015em',
                          fontWeight: 400,
                          color: 'var(--text-main)',
                          margin: 0,
                          textAlign: 'center',
                        }}
                      >
                        {item.statement[language]}
                      </h2>
                    </div>
                  );
                })}
              </div>

              {/* MOBILE STAGE 2: Stacked Rows (LEFT ALIGNED, SEQUENTIAL FADE-IN UNDER EACH OTHER) */}
              <div
                className="about-mobile-stacked-box"
                style={{
                  opacity: isStackedStage ? 1 : 0,
                  pointerEvents: isStackedStage ? 'auto' : 'none',
                  transition: 'opacity 0.3s ease-out',
                }}
              >
                {manifesto.map((item, index) => {
                  const op = stackOpacities[index];
                  return (
                    <div
                      key={item.id}
                      className="about-mobile-stacked-row"
                      style={{
                        opacity: op,
                        transform: `translateY(${Math.max(0, (1 - op) * 12)}px)`,
                        transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
                      }}
                    >
                      <h2
                        className="font-serif about-manifesto-mobile-title-left"
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
        .about-mobile-stacked-box {
          display: none;
        }

        @media (max-width: 1023px) {
          .about-scroll-track {
            height: 250vh !important;
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
            padding-top: 4.8rem !important;
            padding-bottom: 1.5rem !important;
          }
          .about-grid-layout {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
          .about-visual-portrait-container {
            max-width: 200px !important;
            margin: 0 auto !important;
          }
          .about-accent-hairline-frame {
            display: none !important;
          }
          .about-text-column {
            margin: 0 !important;
            max-width: 100% !important;
            position: relative !important;
          }
          .about-category-tag-wrapper {
            text-align: center !important;
            margin-bottom: 0.65rem !important;
          }
          .about-progress-dashes {
            display: flex !important;
            justify-content: center !important;
            margin-bottom: 1rem !important;
          }
          .about-manifesto-stage-desktop {
            display: none !important;
          }

          /* Mobile Spotlight: Center-aligned in spotlight */
          .about-mobile-spotlight-box {
            display: block !important;
            position: relative !important;
            min-height: 110px !important;
            width: 100% !important;
          }
          .about-manifesto-mobile-title-center {
            font-size: clamp(1.55rem, 5.8vw, 2.1rem) !important;
            line-height: 1.2 !important;
            letter-spacing: -0.015em !important;
            font-weight: 400 !important;
            color: var(--text-main) !important;
            margin: 0 auto !important;
            text-align: center !important;
            max-width: 320px !important;
          }

          /* Mobile Stacked: Left-aligned with gold left border, appearing under each other */
          .about-mobile-stacked-box {
            display: flex !important;
            flex-direction: column !important;
            gap: 1.15rem !important;
            width: 100% !important;
            position: relative !important;
            margin-top: 0.5rem !important;
          }
          .about-mobile-stacked-row {
            display: flex !important;
            flex-direction: column !important;
            padding-left: 1rem !important;
            border-left: 2px solid var(--accent-gold) !important;
            text-align: left !important;
          }
          .about-manifesto-mobile-title-left {
            font-size: clamp(1.3rem, 4.8vw, 1.7rem) !important;
            line-height: 1.22 !important;
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