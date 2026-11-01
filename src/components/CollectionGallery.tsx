'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { siteData, GalleryRow } from '@/data/siteData';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export function CollectionGallery() {
  const { language } = useLanguage();
  const { gallery } = siteData;

  // Lightbox State
  const [activeRowId, setActiveRowId] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Drag / Swipe tracking for Lightbox with live finger following
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState(false);

  // Active row and images for lightbox
  const activeRow = gallery.rows.find((r) => r.id === activeRowId) || null;
  const currentImages = activeRow ? activeRow.images : [];

  // Open Lightbox for a specific row and image index
  const openLightbox = (rowId: string, index: number) => {
    setActiveRowId(rowId);
    setActiveImageIndex(index);
    document.body.style.overflow = 'hidden';
    window.__lenis?.stop();
  };

  const closeLightbox = () => {
    setActiveRowId(null);
    document.body.style.overflow = '';
    window.__lenis?.start();
  };

  const handlePrevImage = useCallback(() => {
    if (!currentImages.length) return;
    setActiveImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  }, [currentImages.length]);

  const handleNextImage = useCallback(() => {
    if (!currentImages.length) return;
    setActiveImageIndex((prev) => (prev + 1) % currentImages.length);
  }, [currentImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeRowId) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeRowId, handlePrevImage, handleNextImage]);

  // Touch Swipe Handlers for Lightbox with Real-Time Finger Following
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    isDragging.current = true;
    setIsSwiping(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    touchStartX.current = clientX;
    touchEndX.current = clientX;
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging.current || touchStartX.current === null) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    touchEndX.current = clientX;
    const delta = clientX - touchStartX.current;
    // Slight dampening if pulling beyond edges
    const isAtStart = activeImageIndex === 0 && delta > 0;
    const isAtEnd = activeImageIndex === currentImages.length - 1 && delta < 0;
    const dampenedDelta = isAtStart || isAtEnd ? delta * 0.35 : delta;
    setDragOffset(dampenedDelta);
  };

  const handleTouchEnd = () => {
    if (!isDragging.current || touchStartX.current === null || touchEndX.current === null) {
      isDragging.current = false;
      setIsSwiping(false);
      setDragOffset(0);
      return;
    }
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50; // min swipe distance in px

    if (diff > threshold) {
      handleNextImage();
    } else if (diff < -threshold) {
      handlePrevImage();
    }

    isDragging.current = false;
    setIsSwiping(false);
    setDragOffset(0);
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      id="gallery"
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--border-light)',
        paddingTop: 'clamp(4rem, 7vw, 6.5rem)',
        paddingBottom: 'clamp(4rem, 7vw, 6.5rem)',
        width: '100%',
        overflowX: 'clip',
      }}
    >
      {/* Anchor alias for #collection */}
      <div id="collection" style={{ position: 'relative', top: '-80px' }} />

      {/* Full-Width Gallery Layout */}
      <div style={{ width: '100%', paddingLeft: 'clamp(1rem, 3.5vw, 4rem)', paddingRight: 'clamp(1rem, 3.5vw, 4rem)' }}>
        {/* Section Header: Large text centered: Kollekció & Galéria */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 4.5rem)' }}>
          <h2
            className="font-serif title-editorial"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              textAlign: 'center',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            {gallery.title[language]}
          </h2>
        </div>

        {/* Gallery Rows: All rows rendered directly */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          {gallery.rows.map((row, index) => (
            <PureVisualGalleryRow
              key={row.id}
              row={row}
              rowIndex={index}
              language={language}
              onImageClick={(imgIndex) => openLightbox(row.id, imgIndex)}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeRowId && currentImages.length > 0 && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.25rem',
            userSelect: 'none',
          }}
        >
          {/* Top Bar: Close button */}
          <div
            style={{
              width: '100%',
              maxWidth: '1300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              zIndex: 100,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              aria-label="Close Lightbox"
              style={{
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                color: '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              className="lightbox-close-btn"
            >
              <X size={20} />
            </button>
          </div>

          {/* Central Image Viewport */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1080px',
              height: 'calc(100vh - 190px)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              cursor: isSwiping ? 'grabbing' : 'grab',
            }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd}
          >
            {/* Prev Arrow */}
            <button
              onClick={handlePrevImage}
              aria-label="Previous Image"
              className="lightbox-nav-arrow left"
              id="lightbox-prev-btn"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Continuous Smooth Horizontal Sliding Track */}
            <div
              className="lightbox-carousel-track"
              style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                transform: `translateX(calc(-${activeImageIndex * 100}% + ${dragOffset}px))`,
                transition: isSwiping ? 'none' : 'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {currentImages.map((img, idx) => (
                <div
                  key={img.id}
                  style={{
                    width: '100%',
                    height: '100%',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 1rem',
                  }}
                >
                  <img
                    src={img.image}
                    alt={img.alt[language]}
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
                      pointerEvents: 'none',
                    }}
                    loading={Math.abs(idx - activeImageIndex) <= 1 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>

            {/* Next Arrow */}
            <button
              onClick={handleNextImage}
              aria-label="Next Image"
              className="lightbox-nav-arrow right"
              id="lightbox-next-btn"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div
            className="lightbox-thumbnails-strip"
            onClick={(e) => e.stopPropagation()}
          >
            {currentImages.map((img, i) => {
              const isSelected = i === activeImageIndex;
              return (
                <button
                  key={img.id}
                  onClick={() => setActiveImageIndex(i)}
                  className={`lightbox-thumb-btn ${isSelected ? 'active' : ''}`}
                  aria-label={`Jump to image ${i + 1}`}
                >
                  <img
                    src={img.image}
                    alt={img.alt[language]}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      <style jsx global>{`
        .pure-gallery-row-wrapper {
          position: relative;
          width: 100%;
        }
        .pure-gallery-scroll-container {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          scrollbar-width: none;
          padding: 0.5rem 0;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          cursor: grab;
          user-select: none;
        }
        .pure-gallery-scroll-container.is-dragging-mouse {
          cursor: grabbing;
          scroll-snap-type: none;
          scroll-behavior: auto;
        }
        .pure-gallery-scroll-container::-webkit-scrollbar {
          display: none;
        }
        .gallery-photo-card {
          position: relative;
          aspect-ratio: 2 / 3;
          width: clamp(240px, 22vw, 320px);
          flex-shrink: 0;
          overflow: hidden;
          background-color: #FAF8F5;
          border: 1px solid var(--border-light);
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s;
        }
        .gallery-photo-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 36px -8px rgba(0, 0, 0, 0.12);
          border-color: var(--accent-gold);
        }
        .gallery-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          pointer-events: none;
        }
        .row-nav-arrow {
          position: absolute;
          top: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-light);
          color: var(--text-main);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          cursor: pointer;
          z-index: 10;
          transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.2s,
                      color 0.2s;
        }
        .row-nav-arrow.left {
          left: -14px;
        }
        .row-nav-arrow.right {
          right: -14px;
        }
        .row-nav-arrow:hover {
          background-color: var(--text-main);
          color: #FFFFFF;
          border-color: var(--text-main);
        }

        /* Mobile Adjustments: ~2.5 cards visible per row */
        @media (max-width: 767px) {
          .pure-gallery-scroll-container {
            gap: 0.75rem !important;
          }
          .gallery-photo-card {
            width: clamp(130px, 36.5vw, 155px) !important;
          }
          .row-nav-arrow {
            width: 38px !important;
            height: 38px !important;
          }
          .row-nav-arrow.left {
            left: 2px !important;
          }
          .row-nav-arrow.right {
            right: 2px !important;
          }
        }

        .lightbox-nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          cursor: pointer;
          transition: all 0.2s;
          z-index: 20;
        }
        .lightbox-nav-arrow.left {
          left: 10px;
        }
        .lightbox-nav-arrow.right {
          right: 10px;
        }
        .lightbox-nav-arrow:hover,
        .lightbox-close-btn:hover {
          background-color: var(--accent-gold);
          border-color: var(--accent-gold);
          color: #000000;
        }
        .lightbox-thumbnails-strip {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          overflow-x: auto;
          max-width: 90vw;
          padding: 0.5rem 0.25rem;
          scrollbar-width: none;
          z-index: 100;
        }
        .lightbox-thumbnails-strip::-webkit-scrollbar {
          display: none;
        }
        .lightbox-thumb-btn {
          width: 46px;
          height: 68px;
          flex-shrink: 0;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.25);
          background-color: transparent;
          cursor: pointer;
          opacity: 0.35;
          padding: 0;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .lightbox-thumb-btn:hover {
          opacity: 0.8;
          border-color: rgba(255, 255, 255, 0.6);
        }
        .lightbox-thumb-btn.active {
          opacity: 1;
          border: 1.5px solid var(--accent-gold);
          transform: scale(1.08);
          box-shadow: 0 4px 14px rgba(197, 168, 128, 0.4);
        }
      `}</style>
    </section>
  );
}

// Subcomponent: Pure Visual Gallery Row with dynamic edge-detecting arrows and desktop mouse drag
function PureVisualGalleryRow({
  row,
  rowIndex,
  language,
  onImageClick,
}: {
  row: GalleryRow;
  rowIndex: number;
  language: 'hu' | 'en';
  onImageClick: (index: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowWrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Arrow visibility states
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Desktop mouse drag-to-scroll tracking
  const isMouseDown = useRef(false);
  const mouseStartX = useRef(0);
  const mouseScrollLeft = useRef(0);
  const dragDistance = useRef(0);
  const [isDraggingMouse, setIsDraggingMouse] = useState(false);

  // Update arrow states based on scroll position
  const updateScrollButtons = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 15);
  }, []);

  useEffect(() => {
    const el = rowWrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    updateScrollButtons();
    container.addEventListener('scroll', updateScrollButtons, { passive: true });
    window.addEventListener('resize', updateScrollButtons);

    return () => {
      container.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [updateScrollButtons]);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      const scrollAmount = Math.max(260, containerRef.current.clientWidth * 0.75);
      containerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      const scrollAmount = Math.max(260, containerRef.current.clientWidth * 0.75);
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Mouse Drag Handlers for Desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    isMouseDown.current = true;
    mouseStartX.current = e.pageX - containerRef.current.offsetLeft;
    mouseScrollLeft.current = containerRef.current.scrollLeft;
    dragDistance.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = x - mouseStartX.current;
    dragDistance.current = Math.abs(walk);
    if (Math.abs(walk) > 5) {
      setIsDraggingMouse(true);
    }
    containerRef.current.scrollLeft = mouseScrollLeft.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!isMouseDown.current) return;
    isMouseDown.current = false;
    setTimeout(() => {
      setIsDraggingMouse(false);
      dragDistance.current = 0;
    }, 60);
  };

  // Alternating entry direction
  const isEven = rowIndex % 2 === 0;
  const initialOffset = isEven ? -45 : 45;
  const translateX = isVisible ? 0 : initialOffset;

  // Staggered offset row images
  const rowImages = !isEven && row.images.length > 1
    ? [...row.images.slice(1), row.images[0]]
    : row.images;

  return (
    <div
      ref={rowWrapperRef}
      className="pure-gallery-row-wrapper"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateX(${translateX}px)`,
        transition: 'opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, transform',
      }}
    >
      {/* Left Navigation Arrow (Smooth Fade/Scale on bounds) */}
      <button
        onClick={handleScrollLeft}
        aria-label="Previous photos"
        className="row-nav-arrow left"
        style={{
          opacity: canScrollLeft ? 1 : 0,
          pointerEvents: canScrollLeft ? 'auto' : 'none',
          transform: `translateY(-50%) scale(${canScrollLeft ? 1 : 0.85})`,
        }}
      >
        <ChevronLeft size={22} />
      </button>

      {/* Row Horizontal Scroller with Desktop Drag & Mobile Swipe */}
      <div
        ref={containerRef}
        className={`pure-gallery-scroll-container ${isDraggingMouse ? 'is-dragging-mouse' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {rowImages.map((img, index) => (
          <div
            key={img.id}
            onClick={() => {
              if (dragDistance.current > 8) return; // Prevent lightbox if user was dragging
              onImageClick(!isEven && row.images.length > 1 ? (index + 1) % row.images.length : index);
            }}
            className="gallery-photo-card"
          >
            <img
              src={img.image}
              alt={img.alt[language]}
              className="gallery-card-img"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Right Navigation Arrow (Smooth Fade/Scale on bounds) */}
      <button
        onClick={handleScrollRight}
        aria-label="Next photos"
        className="row-nav-arrow right"
        style={{
          opacity: canScrollRight ? 1 : 0,
          pointerEvents: canScrollRight ? 'auto' : 'none',
          transform: `translateY(-50%) scale(${canScrollRight ? 1 : 0.85})`,
        }}
      >
        <ChevronRight size={22} />
      </button>
    </div>
  );
}