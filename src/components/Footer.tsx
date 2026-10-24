'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { siteData } from '@/data/siteData';
import { MapPin, Phone, MessageCircle } from 'lucide-react';

// Custom clean SVG icons for Facebook, Instagram, TikTok
function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
    </svg>
  );
}

export function Footer() {
  const { language } = useLanguage();
  const { brand, footer, navigation, social } = siteData;
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleNavClick = (href: string) => {
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
        return <FacebookIcon size={16} />;
      case 'instagram':
        return <InstagramIcon size={16} />;
      case 'tiktok':
        return <TikTokIcon size={16} />;
      case 'messenger':
        return <MessageCircle size={16} />;
      case 'maps':
        return <MapPin size={16} />;
      default:
        return null;
    }
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-dark)',
        color: 'var(--text-on-dark)',
        paddingTop: '5rem',
        paddingBottom: '3.5rem',
        borderTop: '1px solid var(--border-on-dark)',
        position: 'relative',
      }}
    >
      <div className="container-luxury">
        {/* Top Demonstration Notice Banner (Mandatory E-Brolo Rule 11) - Sharp Square */}
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(197, 168, 128, 0.3)',
            padding: '1.1rem 1.5rem',
            marginBottom: '3.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: 'var(--accent-gold)',
                display: 'inline-block',
                boxShadow: '0 0 10px var(--accent-gold)',
              }}
            />
            <span style={{ fontSize: '0.85rem', color: '#E2CCA9', fontWeight: 500 }}>
              {footer.ebroloNotice[language]}
            </span>
          </div>

          <a
            href={footer.ebroloUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--accent-gold)',
              letterSpacing: '0.05em',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
            }}
          >
            ebrolo.hu →
          </a>
        </div>

        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Brand Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span
              className="font-serif"
              style={{
                fontSize: '2rem',
                fontWeight: 500,
                letterSpacing: '0.22em',
                lineHeight: 1,
                color: '#FFFFFF',
              }}
            >
              {brand.wordmark}
            </span>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', color: 'var(--accent-gold)', fontWeight: 600 }}>
              {brand.submark}
            </span>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-on-dark-muted)', maxWidth: '340px' }}>
              {footer.brandDescription[language]}
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4
              style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--accent-gold)',
                marginBottom: '1.25rem',
              }}
            >
              {language === 'hu' ? 'Navigáció' : 'Navigation'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {navigation.links.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-on-dark-muted)',
                    transition: 'color 0.2s',
                  }}
                  className="footer-nav-link"
                >
                  {link.label[language]}
                </a>
              ))}
            </div>
          </div>

          {/* Boutique Details & Hours */}
          <div>
            <h4
              style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--accent-gold)',
                marginBottom: '1.25rem',
              }}
            >
              {language === 'hu' ? 'Szalon & Nyitvatartás' : 'Salon & Hours'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.88rem', color: 'var(--text-on-dark-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FFFFFF' }}>
                <MapPin size={16} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                <span>{brand.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                <a href={`tel:${brand.phone}`} style={{ color: '#FFFFFF', fontWeight: 600 }}>
                  {brand.phoneFormatted}
                </a>
              </div>
              <div
                style={{
                  marginTop: '0.65rem',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'grid',
                  gridTemplateColumns: 'minmax(120px, auto) 1fr',
                  columnGap: '1.25rem',
                  rowGap: '0.55rem',
                  fontSize: '0.86rem',
                }}
              >
                <span style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
                  {language === 'hu' ? 'Hétfő – Péntek:' : 'Monday – Friday:'}
                </span>
                <span style={{ fontWeight: 600, color: '#FFFFFF' }}>10:00 – 17:00</span>

                <span style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
                  {language === 'hu' ? 'Szombat:' : 'Saturday:'}
                </span>
                <span style={{ fontWeight: 600, color: '#FFFFFF' }}>10:00 – 13:00</span>

                <span style={{ color: 'rgba(255, 255, 255, 0.45)' }}>
                  {language === 'hu' ? 'Vasárnap:' : 'Sunday:'}
                </span>
                <span style={{ color: 'rgba(255, 255, 255, 0.45)' }}>
                  {language === 'hu' ? 'Zárva' : 'Closed'}
                </span>
              </div>
            </div>
          </div>

          {/* Social Media Docking Column */}
          <div id="footer-social-dock">
            <h4
              style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--accent-gold)',
                marginBottom: '1.25rem',
              }}
            >
              {language === 'hu' ? 'Közösségi Média' : 'Social Media'}
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-on-dark-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              {language === 'hu'
                ? 'Kövess minket a legfrissebb darabokért, aktuális kedvezményekért és divatinspirációkért!'
                : 'Follow our channels for new arrivals, current promotions and fashion inspiration!'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {social.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#FAF8F5',
                    transition: 'all 0.2s',
                  }}
                  className="footer-social-icon-btn"
                >
                  {getSocialIcon(item.id)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright Line with E-Brolo clickable link (Mandatory Rule 11) */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.82rem',
            color: 'var(--text-on-dark-muted)',
          }}
        >
          <div>
            © <span suppressHydrationWarning>{currentYear}</span>{' '}
            <a
              href="https://ebrolo.hu/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--accent-gold)',
                fontWeight: 600,
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              E-Brolo
            </a>
            . {footer.rightsReserved[language]}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>{brand.name}</span>
            <span>•</span>
            <span>Nyíregyháza</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .footer-nav-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          position: relative;
          width: fit-content;
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .footer-nav-link::before {
          content: '→';
          font-size: 0.82rem;
          color: var(--accent-gold);
          opacity: 0;
          transform: translateX(-6px);
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .footer-nav-link:hover {
          color: var(--accent-gold) !important;
          transform: translateX(6px);
        }
        .footer-nav-link:hover::before {
          opacity: 1;
          transform: translateX(0);
        }
        .footer-social-icon-btn:hover {
          background-color: var(--accent-gold) !important;
          border-color: var(--accent-gold) !important;
          color: #141414 !important;
        }
      `}</style>
    </footer>
  );
}
