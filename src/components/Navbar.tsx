'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { siteData } from '@/data/siteData';
import { Phone, Menu, X, Globe, MessageCircle, MapPin } from 'lucide-react';

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

export function Navbar() {
  const { language, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setHeaderVisible(scrollY > 50);
      setIsScrolled(scrollY > 120);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    let lenisUnsubscribe: (() => void) | undefined;
    if (window.__lenis) {
      window.__lenis.on('scroll', handleScroll);
      lenisUnsubscribe = () => window.__lenis?.off('scroll', handleScroll);
    }

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (lenisUnsubscribe) lenisUnsubscribe();
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el && window.__lenis) {
        window.__lenis.scrollTo(el as HTMLElement, { offset: -70 });
      }
    }
  };

  const getSocialIcon = (id: string) => {
    switch (id) {
      case 'facebook':
        return <FacebookIcon size={18} />;
      case 'instagram':
        return <InstagramIcon size={18} />;
      case 'tiktok':
        return <TikTokIcon size={18} />;
      case 'messenger':
        return <MessageCircle size={18} />;
      case 'maps':
        return <MapPin size={18} />;
      default:
        return null;
    }
  };

  return (
    <>
      <header className={`header-glass ${headerVisible ? 'visible' : 'hidden-top'} ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container-luxury" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
          {/* Brand Wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              textAlign: 'left',
              gap: '2px',
              textDecoration: 'none',
            }}
          >
            <span
              className="font-serif"
              style={{
                fontSize: '1.75rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                lineHeight: 1,
                color: 'var(--text-main)',
                display: 'block',
                margin: 0,
                padding: 0,
              }}
            >
              {siteData.brand.wordmark}
            </span>
            <span
              style={{
                fontSize: '0.62rem',
                letterSpacing: '0.12em',
                color: 'var(--text-muted)',
                fontWeight: 500,
                display: 'block',
                margin: 0,
                padding: 0,
                paddingLeft: '2px',
              }}
            >
              {siteData.brand.submark}
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '2.2rem',
            }}
            className="desktop-nav"
          >
            {siteData.navigation.links
              .filter((link) => link.id !== 'hero' && link.id !== 'about')
              .map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--text-main)',
                    position: 'relative',
                    padding: '4px 0',
                  }}
                  className="nav-link-hover"
                >
                  {link.label[language]}
                </a>
              ))}
          </nav>

          {/* Actions: Lang toggle & Phone Call */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              aria-label="Toggle language"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-light)',
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                color: 'var(--text-main)',
                transition: 'all 0.2s ease',
              }}
              title="Váltás magyar / angol nyelvre"
            >
              <Globe size={14} style={{ color: 'var(--accent-gold)' }} />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* Direct Phone Call Icon Button */}
            <a
              href={`tel:${siteData.brand.phone}`}
              className="header-phone-icon-btn"
              aria-label={language === 'hu' ? 'Telefonos hívás' : 'Call boutique'}
              title={siteData.brand.phoneFormatted}
              id="header-phone-btn"
            >
              <Phone size={16} />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-main)',
              }}
              className="mobile-hamburger"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Drawer with Backdrop */}
      <div
        className={`mobile-menu-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`mobile-menu-panel ${mobileMenuOpen ? 'open' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          {siteData.navigation.links
            .filter((link) => link.id !== 'hero' && link.id !== 'about')
            .map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="mobile-menu-link"
            >
              {link.label[language]}
            </a>
          ))}

          {/* Direct Phone Action */}
          <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a
              href={`tel:${siteData.brand.phone}`}
              className="btn-luxury-gold"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Phone size={16} />
              <span>{siteData.brand.phoneFormatted}</span>
            </a>
          </div>

          {/* Social Media Links in Mobile Menu Drawer */}
          <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}>
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--accent-gold)',
                display: 'block',
                marginBottom: '0.85rem',
              }}
            >
              {language === 'hu' ? 'Közösségi média' : 'Social Channels'}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
              {siteData.social.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="mobile-drawer-social-btn"
                  title={item.name}
                >
                  {getSocialIcon(item.id)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style jsx global>{`
        .header-phone-icon-btn {
          display: none;
          width: 40px;
          height: 40px;
          align-items: center;
          justify-content: center;
          background-color: var(--text-main);
          color: #FFFFFF;
          border: 1px solid var(--text-main);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .header-phone-icon-btn:hover {
          background-color: var(--accent-gold);
          border-color: var(--accent-gold);
          color: #141414;
        }
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
          }
          .header-phone-icon-btn {
            display: inline-flex !important;
          }
          .mobile-hamburger {
            display: none !important;
          }
        }
        .nav-link-hover::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 1.5px;
          background-color: var(--accent-gold);
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-link-hover:hover::after {
          width: 100%;
        }

        /* Mobile Menu Drawer Animation Styles */
        .mobile-menu-backdrop {
          position: fixed;
          inset: 0;
          z-index: 99;
          background-color: rgba(15, 15, 15, 0.65);
          backdrop-filter: blur(8px);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding-top: 76px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .mobile-menu-backdrop.open {
          opacity: 1;
          pointer-events: auto;
        }
        .mobile-menu-panel {
          background-color: var(--bg-body);
          border-bottom: 1px solid var(--border-light);
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          box-shadow: var(--shadow-lg);
          transform: translateY(-20px);
          opacity: 0;
          transition: transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.32s ease;
        }
        .mobile-menu-backdrop.open .mobile-menu-panel {
          transform: translateY(0);
          opacity: 1;
        }
        .mobile-menu-link {
          font-size: 1.1rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: var(--text-main);
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
          transition: color 0.2s, padding-left 0.2s;
        }
        .mobile-menu-link:hover {
          color: var(--accent-gold);
          padding-left: 0.5rem;
        }
        .mobile-drawer-social-btn {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #FFFFFF;
          border: 1px solid var(--border-light);
          color: var(--text-main);
          border-radius: 0;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .mobile-drawer-social-btn:hover {
          background-color: var(--accent-gold);
          border-color: var(--accent-gold);
          color: #141414;
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}