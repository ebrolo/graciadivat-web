'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { siteData } from '@/data/siteData';

// Individual scroll-reveal row for the continuous downward page scroll
function ManifestoScrollRow({ statement }: { statement: string }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const checkVisibility = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight || document.documentElement.clientHeight;
      // Trigger when element's top enters the comfortable viewing area (<= 78% of viewport height)
      if (rect.top <= windowH * 0.78) {
        setIsVisible(true);
      } else if (rect.top > windowH * 0.92) {
        // Reset when user scrolls back up past the element so re-scrolling triggers the fade again
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', checkVisibility, { passive: true });
    checkVisibility();

    let lenisOff: (() => void) | undefined;
    if (window.__lenis) {
      window.__lenis.on('scroll', checkVisibility);
      lenisOff = () => window.__lenis?.off('scroll', checkVisibility);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else if (entry.boundingClientRect.top > (window.innerHeight || 800) * 0.85) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -22% 0px',
      }
    );

    observer.observe(el);

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      if (lenisOff) lenisOff();
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={rowRef}
      className="about-mobile-scroll-row"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, transform',
      }}
    >
      <h2 className="font-serif about-manifesto-scroll-title">
        {statement}
      </h2>
    </div>
  );
}

export function AboutSection() {
  const { language } = useLanguage();
  const { about } = siteData;
  const manifesto = about.manifesto;

  const pinTrackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress across the spotlight pinned track
  const handleScroll = useCallback(() => {
    if (!pinTrackRef.current) return;
    const rect = pinTrackRef.current.getBoundingClientRect();
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
  if (p >= 0.50) {
    activeIndex = 2;
  } else if (p >= 0.22) {
    activeIndex = 1;
  }

  // ------------------------------------------------------------------
  // 2. RÖVID RÖGZÍTÉS (Oldal nem mozdul)
  // Középre zárt mondatok lejjebb pozicionálva: 1 -> 2 -> 3 (3. elhalványul és eltűnik)
  // ------------------------------------------------------------------
  // Statement 0: visible initially, fades out 0.18 -> 0.24
  const mobSpotOp0 = p < 0.18 ? 1 : Math.max(0, 1 - (p - 0.18) / 0.06);

  // Statement 1: fades in 0.22 -> 0.28, holds, fades out 0.44 -> 0.50
  const mobSpotOp1 =
    p < 0.22
      ? 0
      : p < 0.44
      ? Math.min(1, (p - 0.22) / 0.06)
      : Math.max(0, 1 - (p - 0.44) / 0.06);

  // Statement 2: fades in 0.48 -> 0.54, holds, then completely fades out 0.68 -> 0.78
  const mobSpotOp2 =
    p < 0.48
      ? 0
      : p < 0.68
      ? Math.min(1, (p - 0.48) / 0.06)
      : Math.max(0, 1 - (p - 0.68) / 0.10);

  const mobSpotlight = [
    { opacity: mobSpotOp0 },
    { opacity: mobSpotOp1 },
    { opacity: mobSpotOp2 },
  ];

  // Dashes fade out along with the 3rd statement
  const dashesOpacityMobile = p < 0.68 ? 1 : Math.max(0, 1 - (p - 0.68) / 0.10);

  return (
    <div
      id="about"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#F8F5EE',
        borderTop: '1px solid rgba(197, 168, 128, 0.35)',
      }}
    >
      {/* 2. Rövid rögzítés szakasza (Oldal nem mozdul) */}
      <div
        ref={pinTrackRef}
        className="about-pinned-track"
        style={{
          position: 'relative',
          width: '100%',
        }}
      >
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
              {/* Kép: 100% látható (fej + cipő kényelmesen a keretben) */}
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

                {/* Main Visual Image Frame: 2/3 ratio, zoomed out, full view of woman from head to golden heels */}
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
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src="/images/collection/846646474_1422651720063716_8159150398027964920_n.jpg"
                    alt="Grácia Szalon Nyíregyháza - Elegáns Modell"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center center',
                      display: 'block',
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

                {/* MOBIL: Középre zárt mondatok lejjebb pozícionálva: 1 -> 2 -> 3 (A 3. mondat elhalványul és eltűnik) */}
                <div className="about-mobile-spotlight-box">
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
                            lineHeight: 1.22,
                            letterSpacing: '-0.015em',
                            fontWeight: 400,
                            color: 'var(--text-main)',
                            margin: '0 auto',
                            textAlign: 'center',
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
      </div>

      {/* 3. Rögzítés véget ér: A felhasználó az oldalt görgeti lefelé */}
      {/* Folyamatos lefelé görgetés a Kollekció Galériára (Nincs külön lap!) */}
      <div className="about-mobile-scroll-manifesto">
        <div className="container-luxury" style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
          <div className="about-mobile-scroll-rows">
            {manifesto.map((item) => (
              <ManifestoScrollRow
                key={item.id}
                statement={item.statement[language]}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .about-pinned-track {
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
        .about-mobile-scroll-manifesto {
          display: none;
        }

        @media (max-width: 1023px) {
          /* 2. Rövid rögzítés: 135vh hosszon játszódik le a 3 középre zárt mondat, majd véget ér */
          .about-pinned-track {
            height: 135vh !important;
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

          /* Középre zárt mondatok lejjebb pozicionálva */
          .about-mobile-spotlight-box {
            display: block !important;
            position: relative !important;
            min-height: 120px !important;
            width: 100% !important;
            margin-top: clamp(1.8rem, 4.2vh, 2.8rem) !important;
          }
          .about-manifesto-mobile-title-center {
            font-size: clamp(1.55rem, 5.8vw, 2.1rem) !important;
            line-height: 1.22 !important;
            letter-spacing: -0.015em !important;
            font-weight: 400 !important;
            color: var(--text-main) !important;
            margin: 0 auto !important;
            text-align: center !important;
            max-width: 320px !important;
          }

          /* 3. Folyamatos lefelé görgetés a Kollekció Galériára (Nincs külön lap!) */
          .about-mobile-scroll-manifesto {
            display: block !important;
            position: relative !important;
            background-color: #F8F5EE !important;
            z-index: 20 !important;
          }
          .about-mobile-scroll-rows {
            display: flex !important;
            flex-direction: column !important;
            /* Nagy térköz a mondatok között, hogy az egész felületen elterüljenek */
            gap: clamp(28vh, 34vh, 42vh) !important;
            padding-top: clamp(18vh, 22vh, 28vh) !important;
            padding-bottom: clamp(22vh, 28vh, 36vh) !important;
            width: 100% !important;
          }
          .about-mobile-scroll-row {
            display: flex !important;
            flex-direction: column !important;
            padding-left: 1.35rem !important;
            border-left: 2px solid var(--accent-gold) !important;
            text-align: left !important;
          }
          .about-manifesto-scroll-title {
            font-size: clamp(1.75rem, 6.8vw, 2.45rem) !important;
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