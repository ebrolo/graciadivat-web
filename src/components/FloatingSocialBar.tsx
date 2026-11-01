'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { siteData } from '@/data/siteData';
import { MessageCircle, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';

// Custom clean SVG icons for Facebook, Instagram, TikTok
function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
    </svg>
  );
}

export function FloatingSocialBar() {
  const socialLinks = siteData.social;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [dockSide, setDockSide] = useState<'left' | 'right'>('right');
  const [mobileY, setMobileY] = useState<number | null>(null);

  const userInteractedRef = useRef(false);
  const containerRef = useRef<HTMLElement>(null);
  const dockSideRef = useRef<'left' | 'right'>('right');
  const mobileYRef = useRef<number | null>(null);
  const lastTouchTimeRef = useRef(0);

  useEffect(() => {
    dockSideRef.current = dockSide;
  }, [dockSide]);

  useEffect(() => {
    mobileYRef.current = mobileY;
  }, [mobileY]);

  // Unified Scroll & Stopping Logic (Desktop & Mobile)
  const updatePosition = useCallback(() => {
    const bar = containerRef.current;
    if (!bar) return;

    // 1. Auto collapse/expand based on Hero scroll completion
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      const heroRect = heroEl.getBoundingClientRect();
      const heroFinished = heroRect.bottom <= window.innerHeight + 5;

      if (!userInteractedRef.current) {
        if (heroFinished) {
          setIsCollapsed(false);
        } else {
          setIsCollapsed(true);
        }
      } else if (!heroFinished && window.scrollY < 100) {
        userInteractedRef.current = false;
        setIsCollapsed(true);
      }
    }

    // 2. Stop before footer / contact map
    const mapEl =
      document.getElementById('contact-map-container') ||
      document.querySelector('#contact');
    if (!mapEl) return;

    const mapRect = mapEl.getBoundingClientRect();
    const mapBottomDoc = mapRect.bottom + window.scrollY;
    const barHeight = bar.offsetHeight || 260;
    const isDesktop = window.innerWidth >= 768;

    const currentY = mobileYRef.current;
    let barBottomDoc: number;
    if (!isDesktop && currentY !== null) {
      barBottomDoc = window.scrollY + currentY + barHeight;
    } else {
      const bottomSpacing = isDesktop ? 24 : 20;
      barBottomDoc = window.scrollY + window.innerHeight - bottomSpacing;
    }

    const currentDock = isDesktop ? 'right' : dockSideRef.current;
    const stopTopDoc = Math.round(mapBottomDoc - barHeight - 16);

    if (barBottomDoc >= mapBottomDoc - 8) {
      // Stopped above footer (absolute position in document)
      bar.style.position = 'absolute';
      bar.style.top = `${stopTopDoc}px`;
      bar.style.bottom = 'auto';
      if (currentDock === 'left') {
        bar.style.left = '8px';
        bar.style.right = 'auto';
      } else {
        bar.style.left = 'auto';
        bar.style.right = isDesktop ? 'clamp(1rem, 2vw, 1.75rem)' : '8px';
      }
    } else {
      // Floating (fixed position in viewport)
      bar.style.position = 'fixed';
      if (!isDesktop && currentY !== null) {
        bar.style.top = `${currentY}px`;
        bar.style.bottom = 'auto';
      } else {
        bar.style.top = 'auto';
        bar.style.bottom = isDesktop ? '24px' : '20px';
      }
      if (currentDock === 'left') {
        bar.style.left = '8px';
        bar.style.right = 'auto';
      } else {
        bar.style.left = 'auto';
        bar.style.right = isDesktop ? 'clamp(1rem, 2vw, 1.75rem)' : '8px';
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', updatePosition, { passive: true });
    updatePosition();
    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [updatePosition]);

  // Touch Drag Handling for Mobile Messenger Chathead
  const dragRef = useRef<{
    startX: number;
    startY: number;
    origLeft: number;
    origTop: number;
    currentX: number;
    currentY: number;
    hasMoved: boolean;
  } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.innerWidth >= 768) return;
    const touch = e.touches[0];
    const bar = containerRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();

    dragRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      origLeft: rect.left,
      origTop: rect.top,
      currentX: rect.left,
      currentY: rect.top,
      hasMoved: false,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragRef.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragRef.current.startX;
    const dy = touch.clientY - dragRef.current.startY;

    if (!dragRef.current.hasMoved && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      dragRef.current.hasMoved = true;
    }

    if (!dragRef.current.hasMoved) return;

    const bar = containerRef.current;
    if (!bar) return;
    const barWidth = bar.offsetWidth || 48;
    const barHeight = bar.offsetHeight || 100;

    let newX = dragRef.current.origLeft + dx;
    let newY = dragRef.current.origTop + dy;

    // Strict boundary clamping so it cannot be dragged offscreen or into navbar/footer
    const minX = 4;
    const maxX = window.innerWidth - barWidth - 4;
    const minY = 72; // Below top navbar
    let maxY = window.innerHeight - barHeight - 16;

    const mapEl =
      document.getElementById('contact-map-container') ||
      document.querySelector('#contact');
    if (mapEl) {
      const mapRect = mapEl.getBoundingClientRect();
      if (mapRect.bottom < window.innerHeight) {
        maxY = Math.min(maxY, mapRect.bottom - barHeight - 10);
      }
    }

    newX = Math.max(minX, Math.min(maxX, newX));
    newY = Math.max(minY, Math.min(maxY, newY));

    dragRef.current.currentX = newX;
    dragRef.current.currentY = newY;

    // 120fps direct update with zero transition delay while dragging
    bar.style.position = 'fixed';
    bar.style.left = `${newX}px`;
    bar.style.top = `${newY}px`;
    bar.style.right = 'auto';
    bar.style.bottom = 'auto';
    bar.style.transition = 'none';
  };

  const handleTouchEnd = () => {
    if (!dragRef.current) return;
    const { hasMoved, currentX, currentY } = dragRef.current;

    if (!hasMoved) {
      // Tap detected -> Toggle expand / collapse (with double-click protection)
      lastTouchTimeRef.current = Date.now();
      dragRef.current = null;
      userInteractedRef.current = true;
      setIsCollapsed((prev) => !prev);
      return;
    }

    // Drag release -> Magnetic Snap to nearest screen edge (Messenger Chathead style!)
    const bar = containerRef.current;
    if (!bar) return;
    const barWidth = bar.offsetWidth || 48;

    const screenCenter = window.innerWidth / 2;
    const barCenter = currentX + barWidth / 2;
    const snapToLeft = barCenter < screenCenter;
    const nextDock = snapToLeft ? 'left' : 'right';

    // Animate snap to edge using numeric 'left' for BOTH sides so CSS transitions smoothly!
    const targetLeft = snapToLeft ? 8 : window.innerWidth - barWidth - 8;

    bar.style.transition =
      'left 0.35s cubic-bezier(0.16, 1, 0.3, 1), top 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
    bar.style.left = `${targetLeft}px`;
    bar.style.right = 'auto';
    bar.style.top = `${currentY}px`;
    bar.style.bottom = 'auto';

    setDockSide(nextDock);
    setMobileY(currentY);
    dragRef.current = null;

    // After animation finishes, if docked right, anchor to 'right: 8px' so opening/closing grows naturally inward
    setTimeout(() => {
      if (!containerRef.current) return;
      if (dockSideRef.current === 'right') {
        containerRef.current.style.transition = 'none';
        containerRef.current.style.right = '8px';
        containerRef.current.style.left = 'auto';
      }
    }, 360);
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'facebook':
        return <FacebookIcon size={16} />;
      case 'instagram':
        return <InstagramIcon size={16} />;
      case 'tiktok':
        return <TikTokIcon size={16} />;
      case 'messenger':
        return <MessageCircle size={17} />;
      case 'maps':
        return <MapPin size={17} />;
      default:
        return null;
    }
  };

  return (
    <aside
      ref={containerRef}
      aria-label="Közösségi média gyorselérés"
      className={`floating-social-container ${isCollapsed ? 'is-collapsed' : ''} ${
        dockSide === 'left' ? 'docked-left' : 'docked-right'
      }`}
      style={{
        position: 'fixed',
        right: 'clamp(1rem, 2vw, 1.75rem)',
        bottom: '24px',
        zIndex: 95,
        display: 'flex',
        flexDirection: dockSide === 'left' ? 'row-reverse' : 'row',
        alignItems: 'center',
        gap: '0.35rem',
        width: 'fit-content',
        maxWidth: 'max-content',
        pointerEvents: 'none',
        touchAction: 'pan-y',
      }}
    >
      {/* Social Links Stack */}
      <div
        className="floating-social-links-stack"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.45rem',
          maxWidth: isCollapsed ? '0px' : '60px',
          overflow: 'hidden',
          transform: isCollapsed
            ? dockSide === 'left'
              ? 'translateX(-16px)'
              : 'translateX(16px)'
            : 'translateX(0)',
          opacity: isCollapsed ? 0 : 1,
          pointerEvents: isCollapsed ? 'none' : 'auto',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {socialLinks.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name}
            className="floating-social-btn"
            id={`social-link-${item.id}`}
            style={{ pointerEvents: 'auto' }}
          >
            {getIcon(item.id)}
            <span className="social-tooltip">{item.name}</span>
          </a>
        ))}
      </div>

      {/* Toggle Arrow Button (Touch drag handle on mobile, Messenger chathead) */}
      <button
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onClick={(e) => {
          // If a touch tap occurred within 450ms or a drag just moved, ignore synthetic desktop click
          if (Date.now() - lastTouchTimeRef.current < 450 || dragRef.current?.hasMoved) {
            e.preventDefault();
            return;
          }
          userInteractedRef.current = true;
          setIsCollapsed((prev) => !prev);
        }}
        aria-label={isCollapsed ? 'Közösségi ikonok megjelenítése' : 'Közösségi ikonok elrejtése'}
        className="floating-social-toggle-btn"
        id="social-bar-toggle-btn"
        title={isCollapsed ? 'Közösségi ikonok megjelenítése' : 'Elrejtés'}
        style={{
          pointerEvents: 'auto',
          touchAction: 'none',
        }}
      >
        {dockSide === 'left' ? (
          isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />
        ) : (
          isCollapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />
        )}
      </button>

      <style jsx global>{`
        .floating-social-container {
          width: fit-content !important;
          max-width: max-content !important;
        }
        .floating-social-toggle-btn {
          width: 28px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(20, 20, 20, 0.95);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: var(--accent-gold);
          border: 1px solid rgba(197, 168, 128, 0.45);
          border-radius: 0 !important;
          cursor: pointer;
          transition: background-color 0.25s, color 0.25s, border-color 0.25s, transform 0.2s;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
          z-index: 100;
          user-select: none;
          -webkit-user-select: none;
        }
        .floating-social-toggle-btn:hover {
          background-color: var(--accent-gold);
          color: #141414;
          border-color: var(--accent-gold);
        }
        .floating-social-btn {
          position: relative;
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(20, 20, 20, 0.92);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #FAF8F5;
          border: 1px solid rgba(197, 168, 128, 0.35);
          border-radius: 0 !important;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .floating-social-btn:hover {
          background-color: var(--accent-gold);
          color: #141414;
          border-color: var(--accent-gold);
          transform: scale(1.05);
          box-shadow: 0 12px 28px rgba(197, 168, 128, 0.35);
        }
        .social-tooltip {
          position: absolute;
          right: 50px;
          top: 50%;
          transform: translateY(-50%);
          background-color: #141414;
          color: #FAF8F5;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.35rem 0.65rem;
          border: 1px solid rgba(255, 255, 255, 0.15);
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s, transform 0.2s;
        }
        .floating-social-container.docked-left .social-tooltip {
          right: auto;
          left: 50px;
        }
        .floating-social-btn:hover .social-tooltip {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
        }
        @media (max-width: 640px) {
          .floating-social-btn {
            width: 36px;
            height: 36px;
            border-radius: 0 !important;
          }
          .floating-social-toggle-btn {
            width: 28px;
            height: 48px;
            border-radius: 0 !important;
          }
          .social-tooltip {
            display: none;
          }
        }
      `}</style>
    </aside>
  );
}
