'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { siteData } from '@/data/siteData';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

export function ContactBoutique() {
  const { language } = useLanguage();
  const { contact, brand } = siteData;

  return (
    <section
      id="contact"
      className="section-padding"
      style={{
        backgroundColor: 'var(--bg-body)',
        borderTop: '1px solid var(--border-light)',
      }}
    >
      <div className="container-luxury">
        {/* Header: Clean, Minimalist, No Cheesy Badges */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--accent-gold)',
              display: 'inline-block',
              marginBottom: '1rem',
            }}
          >
            {language === 'hu' ? 'Nyíregyházi Szalonunk' : 'Our Nyíregyháza Boutique'}
          </span>

          <h2
            className="font-serif title-editorial"
            style={{ marginBottom: '1rem', textAlign: 'center' }}
          >
            {contact.title[language]}
          </h2>

          <p
            className="subtitle-editorial"
            style={{ textAlign: 'center' }}
          >
            {contact.subtitle[language]}
          </p>
        </div>

        {/* 2 Column: Info Card & Embedded Interactive Map - Sharp Architecture */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'stretch',
          }}
        >
          {/* Info Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              padding: 'clamp(1.75rem, 4vw, 3rem)',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '2rem',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {/* Address */}
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    backgroundColor: 'var(--accent-gold-soft)',
                    border: '1px solid var(--accent-gold-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-gold)',
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '0.35rem' }}>
                    {contact.addressLabel[language]}
                  </h4>
                  <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.4 }}>
                    {brand.address}
                  </p>
                </div>
              </div>

              {/* Opening Hours - Clean Tabular Layout */}
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    backgroundColor: 'var(--accent-gold-soft)',
                    border: '1px solid var(--accent-gold-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-gold)',
                    flexShrink: 0,
                  }}
                >
                  <Clock size={20} />
                </div>
                <div style={{ width: '100%' }}>
                  <h4 style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '0.45rem' }}>
                    {contact.hoursLabel[language]}
                  </h4>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'minmax(120px, auto) 1fr',
                      columnGap: '1.25rem',
                      rowGap: '0.35rem',
                      fontSize: '0.92rem',
                    }}
                  >
                    <span style={{ color: 'var(--text-muted)' }}>
                      {language === 'hu' ? 'Hétfő – Péntek:' : 'Monday – Friday:'}
                    </span>
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>10:00 – 17:00</span>

                    <span style={{ color: 'var(--text-muted)' }}>
                      {language === 'hu' ? 'Szombat:' : 'Saturday:'}
                    </span>
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>10:00 – 13:00</span>

                    <span style={{ color: 'var(--text-muted)' }}>
                      {language === 'hu' ? 'Vasárnap:' : 'Sunday:'}
                    </span>
                    <span style={{ fontWeight: 500, color: 'var(--text-dim)' }}>
                      {language === 'hu' ? 'Zárva' : 'Closed'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Phone Line */}
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    backgroundColor: 'var(--accent-gold-soft)',
                    border: '1px solid var(--accent-gold-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-gold)',
                    flexShrink: 0,
                  }}
                >
                  <Phone size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '0.35rem' }}>
                    {contact.phoneLabel[language]}
                  </h4>
                  <a
                    href={`tel:${brand.phone}`}
                    style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-gold)', letterSpacing: '0.02em' }}
                  >
                    {brand.phoneFormatted}
                  </a>
                </div>
              </div>
            </div>

            {/* Actions - Interactive Hover Reveal Buttons (Compact & Left-Aligned) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', alignItems: 'flex-start' }}>
              <a
                href={`tel:${brand.phone}`}
                className="btn-interactive-reveal gold"
                id="contact-call-btn"
                aria-label={contact.callCta[language]}
                title={brand.phoneFormatted}
              >
                <span className="btn-icon-wrapper">
                  <Phone size={18} />
                </span>
                <span className="btn-reveal-text">{contact.callCta[language]}</span>
              </a>

              <a
                href={brand.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-interactive-reveal outline"
                id="contact-maps-btn"
                aria-label={contact.mapsCta[language]}
                title={language === 'hu' ? 'Útvonaltervezés Google Térképen' : 'Get directions'}
              >
                <span className="btn-icon-wrapper">
                  <Navigation size={18} />
                </span>
                <span className="btn-reveal-text">{contact.mapsCta[language]}</span>
              </a>
            </div>
          </div>

          {/* Embedded Google Map - Sharp Border */}
          <div
            id="contact-map-container"
            style={{
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border-light)',
              minHeight: '460px',
              height: '100%',
              backgroundColor: '#ECE8E1',
              position: 'relative',
              width: '100%',
            }}
          >
            <iframe
              src={brand.googleMapsEmbedUrl}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0,
              }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Grácia Divat Nyíregyháza Google Maps"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .btn-interactive-reveal {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 52px;
          width: fit-content;
          min-width: 190px;
          align-self: flex-start;
          padding: 0 1.6rem;
          overflow: hidden;
          cursor: pointer;
          text-decoration: none;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-interactive-reveal.gold {
          background-color: var(--accent-gold);
          color: #1a1612;
          border: 1px solid var(--accent-gold);
        }
        .btn-interactive-reveal.gold:hover {
          background-color: #b89358;
          border-color: #b89358;
          color: #0d0a07;
          box-shadow: 0 8px 24px rgba(197, 168, 128, 0.35);
        }
        .btn-interactive-reveal.outline {
          background-color: transparent;
          color: var(--text-main);
          border: 1px solid var(--border-light);
        }
        .btn-interactive-reveal.outline:hover {
          background-color: var(--text-main);
          color: #ffffff;
          border-color: var(--text-main);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }
        .btn-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-reveal-text {
          max-width: 0;
          opacity: 0;
          white-space: nowrap;
          overflow: hidden;
          margin-left: 0;
          transform: translateX(10px);
          transition: max-width 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      margin-left 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-interactive-reveal:hover .btn-icon-wrapper {
          transform: translateX(-4px);
        }
        .btn-interactive-reveal:hover .btn-reveal-text {
          max-width: 220px;
          opacity: 1;
          margin-left: 0.65rem;
          transform: translateX(0);
        }
      `}</style>
    </section>
  );
}
