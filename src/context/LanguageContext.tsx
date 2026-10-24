'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/data/siteData';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'hu',
  setLanguage: () => {},
  toggleLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('hu');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('gracia_lang') as Language;
    if (saved === 'hu' || saved === 'en') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    if (lang === language) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setLanguageState(lang);
      localStorage.setItem('gracia_lang', lang);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 40);
    }, 130);
  };

  const toggleLanguage = () => {
    const nextLang = language === 'hu' ? 'en' : 'hu';
    setLanguage(nextLang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      <div
        className="language-transition-root"
        style={{
          opacity: isTransitioning ? 0.45 : 1,
          transition: 'opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
          minHeight: '100vh',
          width: '100%',
        }}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
