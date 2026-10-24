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

  useEffect(() => {
    const saved = localStorage.getItem('gracia_lang') as Language;
    if (saved === 'hu' || saved === 'en') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('gracia_lang', lang);
  };

  const toggleLanguage = () => {
    const nextLang = language === 'hu' ? 'en' : 'hu';
    setLanguage(nextLang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
