


import React from 'react';
import { Page } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto py-6 px-4 text-center">
        <p>&copy; {new Date().getFullYear()} {t('footerRights')}</p>
        <p className="text-sm text-gray-400 mt-1">
          {t('footerSlogan')}
        </p>
         <div className="mt-4 flex justify-center items-center space-x-4 flex-wrap">
            <button 
              onClick={() => onNavigate(Page.TermsOfService)} 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {t('termsOfService')}
            </button>
            <span className="text-gray-500 hidden sm:inline">|</span>
             <button 
              onClick={() => onNavigate(Page.PrivacyPolicy)} 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {t('privacyPolicy')}
            </button>
            <span className="text-gray-500 hidden sm:inline">|</span>
            <button 
              onClick={() => onNavigate(Page.Admin)} 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {t('adminPanel')}
            </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;