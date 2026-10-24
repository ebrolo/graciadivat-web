'use client';

import React, { useState, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { siteData } from '@/data/siteData';
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

export function ReviewsSection() {
  const { language } = useLanguage();
  const { reviews, brand } = siteData;
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="reviews"
      className="section-padding"
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--border-light)',
        width: '100%',
        overflowX: 'clip',
      }}
    >
      <div className="container-luxury">
        {/* Header: Clean, Minimalist, No Box or Border around Rating */}
        <div style={{ textAlign: 'center', marginBottom: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2
            className="font-serif title-editorial"
            style={{ marginBottom: '0.75rem', textAlign: 'center' }}
          >
            {reviews.title[language]}
          </h2>

          <p
            className="subtitle-editorial"
            style={{ textAlign: 'center', marginBottom: '1.5rem' }}
          >
            {reviews.subtitle[language]}
          </p>

          {/* Clean Rating: ONLY stars and 4,7 average - NO border, NO background box */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#E8A317' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={17} fill="#E8A317" />
              ))}
            </div>
            <span
              style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                letterSpacing: '0.04em',
                fontFamily: 'var(--font-sans)',
              }}
            >
              4,7
            </span>
          </div>
        </div>

        {/* Single-Row Reviews Slider with Navigation Arrows on Both Ends */}
        <div className="reviews-carousel-wrapper" style={{ position: 'relative', width: '100%', marginBottom: '3.5rem' }}>
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            aria-label="Previous reviews"
            className="reviews-slider-arrow left"
            id="reviews-prev-btn"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Single-Row Scrollable Track */}
          <div
            ref={sliderRef}
            className="reviews-slider-track"
          >
            {reviews.items.map((item) => {
              const isLong = item.text[language].length > 180;
              const isExpanded = expandedId === item.id;
              const displayedText = isLong && !isExpanded
                ? `${item.text[language].slice(0, 180)}...`
                : item.text[language];

              return (
                <div
                  key={item.id}
                  className="review-card-single-row"
                  style={{
                    backgroundColor: 'var(--bg-body)',
                    padding: '2rem',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '1.5rem',
                  }}
                >
                  {/* TOP: Author Info (Name, Clean Avatar, Rating Stars) - NO checkmark, NO square frame, NO subtitle */}
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '1rem',
                        paddingBottom: '1rem',
                        borderBottom: '1px solid var(--border-light)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        {/* Clean Avatar without ugly box or square border */}
                        <div
                          style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={item.avatar}
                            alt={item.author}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </div>
                        {/* Only Name, no subtitle or checkmark */}
                        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>
                          {item.author}
                        </span>
                      </div>

                      {/* 5 Stars */}
                      <div style={{ display: 'flex', gap: '0.15rem', color: '#E8A317' }}>
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="#E8A317" />
                        ))}
                      </div>
                    </div>

                    {/* MIDDLE: Review Quote */}
                    <p
                      style={{
                        fontSize: '0.92rem',
                        lineHeight: 1.65,
                        color: 'var(--text-main)',
                        fontStyle: 'italic',
                        marginBottom: '0.75rem',
                      }}
                    >
                      "{displayedText}"
                    </p>

                    {isLong && (
                      <button
                        onClick={() => toggleExpand(item.id)}
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: 'var(--accent-gold)',
                          padding: 0,
                          cursor: 'pointer',
                          marginBottom: '0.5rem',
                          display: 'block',
                          background: 'none',
                          border: 'none',
                        }}
                      >
                        {isExpanded
                          ? (language === 'hu' ? 'Kevesebb' : 'Show less')
                          : (language === 'hu' ? 'Tovább olvasom' : 'Read more')}
                      </button>
                    )}
                  </div>

                  {/* BOTTOM: Direct Google Review Button */}
                  <a
                    href={item.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="review-direct-btn"
                    id={`review-btn-${item.id}`}
                  >
                    <span>{language === 'hu' ? 'Megtekintés' : 'View'}</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            aria-label="Next reviews"
            className="reviews-slider-arrow right"
            id="reviews-next-btn"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Global Google Review CTA */}
        <div style={{ textAlign: 'center' }}>
          <a
            href={brand.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury-outline"
            id="write-google-review-btn"
          >
            <span>{reviews.directReviewCta[language]}</span>
            <ExternalLink size={15} />
          </a>
        </div>
      </div>

      <style jsx global>{`
        .reviews-carousel-wrapper {
          position: relative;
          width: 100%;
        }
        .reviews-slider-track {
          display: flex;
          gap: 1.75rem;
          overflow-x: auto;
          scrollbar-width: none;
          padding: 0.5rem 0.25rem 1rem 0.25rem;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }
        .reviews-slider-track::-webkit-scrollbar {
          display: none;
        }
        .review-card-single-row {
          width: clamp(320px, 32vw, 420px);
          min-width: 320px;
          flex-shrink: 0;
          scroll-snap-align: start;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s;
        }
        .review-card-single-row:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.08);
          border-color: var(--accent-gold-border);
        }
        .reviews-slider-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #FFFFFF;
          border: 1px solid var(--border-light);
          color: var(--text-main);
          cursor: pointer;
          z-index: 10;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reviews-slider-arrow.left {
          left: -18px;
        }
        .reviews-slider-arrow.right {
          right: -18px;
        }
        .reviews-slider-arrow:hover {
          background-color: var(--text-main);
          color: #FFFFFF;
          border-color: var(--text-main);
          transform: translateY(-50%) scale(1.05);
        }
        .review-direct-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          align-self: flex-start;
          width: fit-content;
          padding: 0.55rem 1.15rem;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          background-color: transparent;
          color: var(--text-main);
          border: 1px solid var(--border-light);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .review-direct-btn:hover {
          background-color: var(--text-main);
          color: #FFFFFF;
          border-color: var(--text-main);
        }
        @media (max-width: 768px) {
          .reviews-slider-arrow {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
