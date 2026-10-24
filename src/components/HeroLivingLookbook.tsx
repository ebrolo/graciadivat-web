'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { siteData } from '@/data/siteData';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export function HeroLivingLookbook() {
  const { language } = useLanguage();
  const looks = siteData.hero.looks;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll Progress Tracking for the Grand Opening Animation
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroTextRevealed, setHeroTextRevealed] = useState(false);

  // Trigger delicate text reveal when preloader fades out (slower, cinematic pace)
  useEffect(() => {
    let delayTimer: NodeJS.Timeout;
    const onLoaderFade = () => {
      delayTimer = setTimeout(() => setHeroTextRevealed(true), 350);
    };
    window.addEventListener('initial-loader-start-fade', onLoaderFade);
    const fallbackTimer = setTimeout(() => setHeroTextRevealed(true), 1700);
    return () => {
      window.removeEventListener('initial-loader-start-fade', onLoaderFade);
      clearTimeout(delayTimer);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Handle scroll progress (0 to 1 across 185vh container - eliminating dead zone)
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

  // Auto-advance looks every 5.5s when in final phase (p >= 0.75) and not paused
  useEffect(() => {
    if (isPaused || scrollProgress < 0.75) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % looks.length);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, scrollProgress, looks.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + looks.length) % looks.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % looks.length);
  };

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el && window.__lenis) {
      window.__lenis.scrollTo(el as HTMLElement, { offset: -70 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentLook = looks[currentIndex];

  // ANIMATION INTERPOLATIONS
  // p: 0.0 -> 1.0 (Paced for responsive 185vh track with zero dead gap at the end)
  const p = scrollProgress;

  // 1. Initial dark overlay: starts at 0.55 at p=0 (rich darkened photo), smoothly fades to 0 by p=0.48
  const darkOverlayOpacity = Math.max(0, 0.55 * (1 - p / 0.48));

  // 2. Opening subtitle text under centered GRÁCIA:
  // Visible at p=0, cleanly dissolves by p=0.22 as scroll begins
  const openingSubtitleOpacity = Math.max(0, 1 - p * 4.5);

  // 3. Motion progress for "GRÁCIA" title:
  // Starts centered at p=0, smoothly glides to the left column by p=0.80
  const moveProgress = Math.max(0, Math.min(1, p / 0.80));
  const easedMove =
    moveProgress < 0.5
      ? 4 * moveProgress * moveProgress * moveProgress
      : 1 - Math.pow(-2 * moveProgress + 2, 3) / 2;

  // Color interpolation for "GRÁCIA" from white (against darkened hero photo) to dark charcoal (on light background)
  const titleR = Math.round(250 - 222 * easedMove);
  const titleG = Math.round(248 - 222 * easedMove);
  const titleB = Math.round(245 - 222 * easedMove);
  const titleColor = `rgb(${titleR}, ${titleG}, ${titleB})`;
  const titleShadow =
    easedMove < 0.45
      ? `0 8px 32px rgba(0, 0, 0, ${0.45 * (1 - easedMove * 2.2)})`
      : 'none';

  // 4. Split Hero elements (Editorial subtitle, description, CTA buttons, arrows):
  // Fades in and slides up from p=0.38 to p=0.84 directly below the arriving GRÁCIA title
  const splitContentOpacity = Math.max(0, Math.min(1, (p - 0.38) / 0.46));
  const splitContentTranslateY = (1 - splitContentOpacity) * 25; // 25px -> 0px

  // 5. Image pane position interpolation:
  // Starts fullscreen (left: 0%, width: 100%) at p <= 0.10
  // Transitions smoothly to right column (left: ~46%, width: ~54%) by p = 0.80
  const morphProgress = Math.max(0, Math.min(1, (p - 0.10) / 0.70));
  const easedMorph =
    morphProgress < 0.5
      ? 4 * morphProgress * morphProgress * morphProgress
      : 1 - Math.pow(-2 * morphProgress + 2, 3) / 2;

  const imagePaneLeftPercent = easedMorph * 46; // 0% -> 46%
  const imagePaneWidthPercent = 100 - easedMorph * 46; // 100% -> 54%

  // Feather overlay opacity (fades in as layout morphs to soft-blend the image's left edge)
  const featherOpacity = Math.max(0, Math.min(1, (p - 0.15) / 0.35));

  return (
    <div
      ref={containerRef}
      id="hero"
      className="hero-scroll-track"
      style={{
        position: 'relative',
        height: '185vh',
        width: '100%',
        backgroundColor: '#FAF8F5',
      }}
    >
      {/* Sticky Viewport Frame (Stays locked for the duration of the 260vh scroll) */}
      <div
        className="hero-sticky-frame"
        style={{
          position: 'sticky',
          top: 0,
          height: '100dvh',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: '#FAF8F5',
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* ========================================================= */}
        {/* A. MORPHING BACKGROUND / RIGHT IMAGE CONTAINER             */}
        {/* Starts FULLSCREEN at p=0 with darkened image               */}
        {/* ========================================================= */}
        <div
          className="hero-morphing-image-pane"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: `${imagePaneLeftPercent}%`,
            width: `${imagePaneWidthPercent}%`,
            opacity: 1,
            zIndex: 2,
            overflow: 'hidden',
          }}
        >
          {/* Edge-bleed active look photo */}
          {looks.map((look, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={look.id}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: isActive ? 1 : 0,
                  visibility: isActive ? 'visible' : 'hidden',
                  transition:
                    'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isActive ? 'scale(1.0)' : 'scale(1.03)',
                }}
              >
                <img
                  src={look.image}
                  alt={look.title[language]}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 16%',
                  }}
                />
              </div>
            );
          })}

          {/* Left Feather Blur Overlay: completely dissolves image edge into light background */}
          <div
            className="hero-left-feather-overlay"
            style={{
              opacity: featherOpacity,
            }}
          />

          {/* Bottom Gradient Overlay for clean baseline transition */}
          <div className="hero-bottom-gradient-mask" />
        </div>

        {/* ========================================================= */}
        {/* B. DARK OVERLAY AT SCROLL START (Darkened initial photo)   */}
        {/* ========================================================= */}
        {darkOverlayOpacity > 0.01 && (
          <div
            className="hero-dark-initial-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 3,
              backgroundColor: 'rgba(14, 11, 9, 0.58)',
              opacity: darkOverlayOpacity / 0.55,
              pointerEvents: 'none',
              transition: 'opacity 0.1s linear',
            }}
          />
        )}

        {/* ========================================================= */}
        {/* C. FLOATING "GRÁCIA" TITLE (SWIMS TO LEFT ON SCROLL)       */}
        {/* ========================================================= */}
        <div
          className="hero-floating-brand-title"
          style={{
            position: 'absolute',
            zIndex: 20,
            left: `calc(${50 * (1 - easedMove)}% + clamp(1.75rem, 5vw, 6rem) * ${easedMove})`,
            top: `calc(${44 * (1 - easedMove)}% + clamp(8.5rem, 15vh, 11.5rem) * ${easedMove})`,
            transform: `translate(${-50 * (1 - easedMove)}%, ${-50 * (1 - easedMove)}%) scale(${
              1 + 1.4 * (1 - easedMove)
            })`,
            transformOrigin: `${50 * (1 - easedMove)}% ${50 * (1 - easedMove)}%`,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            opacity: heroTextRevealed ? 1 : 0,
            transition: 'opacity 2.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h1
            className="font-serif hero-monumental-title"
            style={{
              fontSize: 'clamp(3.6rem, 6.2vw, 5.8rem)',
              lineHeight: 0.95,
              letterSpacing: '0.04em',
              fontWeight: 400,
              color: titleColor,
              margin: 0,
              textTransform: 'uppercase',
              textShadow: titleShadow,
              transition: 'color 0.1s linear, text-shadow 0.1s linear',
            }}
          >
            GRÁCIA
          </h1>
        </div>

        {/* ========================================================= */}
        {/* D. INITIAL OPENING SUBTITLE (UNDER CENTERED TITLE AT p=0)  */}
        {/* Clean text: NO badge, NO boxes, NO borders, NOT italic    */}
        {/* ========================================================= */}
        {openingSubtitleOpacity > 0.01 && (
          <div
            className="hero-opening-text-container"
            style={{
              position: 'absolute',
              left: '50%',
              top: 'calc(44% + 8.5rem)',
              transform: `translate(-50%, ${(1 - openingSubtitleOpacity) * 15}px)`,
              zIndex: 19,
              textAlign: 'center',
              width: '90%',
              maxWidth: '680px',
              opacity: heroTextRevealed ? openingSubtitleOpacity : 0,
              pointerEvents: 'none',
              transition: 'opacity 3.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s',
            }}
          >
            <p
              className="font-serif"
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.55rem)',
                fontStyle: 'normal',
                fontWeight: 400,
                color: '#FAF8F5',
                lineHeight: 1.45,
                margin: 0,
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.55)',
                letterSpacing: '0.02em',
              }}
            >
              {language === 'hu'
                ? 'Időtlen elegancia és kifinomult nőiesség Nyíregyháza szívében.'
                : 'Timeless elegance and refined feminine poise in the heart of Nyíregyháza.'}
            </p>
          </div>
        )}

        {/* Initial Scroll Down Prompt at p < 0.12 */}
        {p < 0.12 && (
          <div
            style={{
              position: 'absolute',
              bottom: '2.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              opacity: Math.max(0, 1 - p * 9),
              transition: 'opacity 0.2s',
              zIndex: 19,
              pointerEvents: 'none',
            }}
          >
            <span
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.85)',
                fontWeight: 600,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
              }}
            >
              {language === 'hu' ? 'Görgess lefelé' : 'Scroll down'}
            </span>
            <div
              style={{
                width: '1px',
                height: '24px',
                backgroundColor: 'var(--accent-gold)',
                animation: 'pulseHeight 1.5s infinite',
              }}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* E. SPLIT HERO CONTENT ON THE LEFT (ARRIVES WITH GRÁCIA)    */}
        {/* ========================================================= */}
        <div
          className="hero-split-content-container"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 15,
            display: 'flex',
            alignItems: 'center',
            pointerEvents: splitContentOpacity > 0.5 ? 'auto' : 'none',
            opacity: splitContentOpacity,
            transform: `translateY(${splitContentTranslateY}px)`,
          }}
        >
          <div
            className="hero-left-text-column"
            style={{
              width: '100%',
              maxWidth: '680px',
              paddingLeft: 'clamp(1.75rem, 5vw, 6rem)',
              paddingRight: 'clamp(1.5rem, 3.5vw, 3rem)',
              paddingTop: 'clamp(15rem, 25vh, 19.5rem)',
              paddingBottom: '3rem',
            }}
          >
            {/* Editorial Heading */}
            <h2
              className="font-serif hero-editorial-title"
              style={{
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
                color: 'var(--text-main)',
                marginBottom: '1.25rem',
                fontWeight: 400,
              }}
            >
              {siteData.hero.heading[language]}
            </h2>

            {/* Subheading */}
            <p
              className="subtitle-editorial"
              style={{
                fontSize: 'clamp(0.95rem, 1.15vw, 1.1rem)',
                lineHeight: 1.75,
                color: 'var(--text-muted)',
                marginBottom: '2.5rem',
                maxWidth: '560px',
              }}
            >
              {siteData.hero.subheading[language]}
            </p>

            {/* Action Buttons: "Kollekció" and "Itt találsz minket" */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.1rem',
                marginBottom: '3rem',
              }}
            >
              <button
                onClick={() => handleScrollTo('#gallery')}
                className="btn-luxury-primary"
                id="hero-primary-cta"
              >
                <span>{siteData.hero.primaryCta[language]}</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => handleScrollTo('#contact')}
                className="btn-luxury-outline"
                id="hero-secondary-cta"
              >
                <span>{siteData.hero.secondaryCta[language]}</span>
              </button>
            </div>

            {/* Minimalist Prev/Next Arrows ONLY */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-light)',
                maxWidth: '420px',
              }}
            >
              <button
                onClick={handlePrev}
                aria-label="Previous look"
                className="hero-arrow-btn"
                id="hero-arrow-prev"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next look"
                className="hero-arrow-btn"
                id="hero-arrow-next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulseHeight {
          0%,
          100% {
            transform: scaleY(0.6);
            opacity: 0.4;
          }
          50% {
            transform: scaleY(1.2);
            opacity: 1;
          }
        }
        .hero-left-feather-overlay {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: clamp(220px, 32vw, 420px);
          z-index: 5;
          pointer-events: none;
          background: linear-gradient(
            to right,
            #faf8f5 0%,
            rgba(250, 248, 245, 0.98) 22%,
            rgba(250, 248, 245, 0.75) 50%,
            rgba(250, 248, 245, 0.25) 78%,
            transparent 100%
          );
        }
        .hero-morphing-image-pane {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            rgba(0, 0, 0, 0.3) 8%,
            rgba(0, 0, 0, 0.8) 20%,
            black 32%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            rgba(0, 0, 0, 0.3) 8%,
            rgba(0, 0, 0, 0.8) 20%,
            black 32%
          );
        }
        @media (max-width: 1023px) {
          .hero-morphing-image-pane {
            left: 0% !important;
            width: 100% !important;
            -webkit-mask-image: linear-gradient(
              to bottom,
              transparent 0%,
              rgba(0, 0, 0, 0.4) 12%,
              black 35%
            );
            mask-image: linear-gradient(
              to bottom,
              transparent 0%,
              rgba(0, 0, 0, 0.4) 12%,
              black 35%
            );
          }
          .hero-left-feather-overlay {
            width: 100% !important;
            height: 250px !important;
            background: linear-gradient(
              to bottom,
              #faf8f5 0%,
              rgba(250, 248, 245, 0.85) 45%,
              transparent 100%
            );
          }
          .hero-split-content-container {
            align-items: flex-start;
          }
          .hero-left-text-column {
            padding-top: clamp(11.5rem, 20vh, 14.5rem) !important;
          }
          .hero-floating-brand-title {
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
          }
        }
        .hero-bottom-gradient-mask {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 120px;
          z-index: 4;
          pointer-events: none;
          background: linear-gradient(
            to top,
            #faf8f5 0%,
            rgba(250, 248, 245, 0) 100%
          );
        }
        .hero-editorial-title {
          font-size: clamp(1.8rem, 3.2vw, 2.8rem);
        }
        .hero-arrow-btn {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: transparent;
          border: 1px solid var(--border-light);
          color: var(--text-main);
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-arrow-btn:hover {
          background-color: var(--text-main);
          color: #ffffff;
          border-color: var(--text-main);
        }
      `}</style>
    </div>
  );
}
