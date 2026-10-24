'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { siteData } from '@/data/siteData';
import { Phone, Menu, X, Globe, Sparkles } from 'lucide-react';

export function Navbar() {
  const { language, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Reveal header smoothly as user starts scrolling and GRÁCIA starts sliding
      setHeaderVisible(scrollY > 50);
      setIsScrolled(scrollY > 120);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Also listen to Lenis if available
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

            {/* Direct Phone Call Icon Button (Icon only) */}
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            backgroundColor: 'rgba(15, 15, 15, 0.65)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            paddingTop: '80px',
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-body)',
              borderBottom: '1px solid var(--border-light)',
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              boxShadow: 'var(--shadow-lg)',
            }}
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
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  color: 'var(--text-main)',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
                }}
              >
                {link.label[language]}
              </a>
            ))}

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
          </div>
        </div>
      )}

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
      `}</style>
    </>
  );
}
