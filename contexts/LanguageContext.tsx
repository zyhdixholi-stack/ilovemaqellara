import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, replacements?: { [key: string]: string }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('standard');

  const t = useCallback((key: string, replacements?: { [key: string]: string }): string => {
    const translationSet = translations[key];
    if (!translationSet) {
      console.warn(`Çelësi i përkthimit '${key}' nuk u gjet.`);
      return key; // Return the key if translation is not found
    }
    
    let text = translationSet[language] || translationSet['standard'];
    
    if (replacements) {
        Object.keys(replacements).forEach(placeholder => {
            text = text.replace(`{${placeholder}}`, replacements[placeholder]);
        });
    }

    return text;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};