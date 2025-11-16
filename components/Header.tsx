

import React, { useState } from 'react';
import { Page, Language } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  onNavigate: (page: Page) => void;
}

const NavLink: React.FC<{ children: React.ReactNode; href: string; onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void, isMobile?: boolean }> = ({ children, href, onClick, isMobile }) => (
    <a 
      href={href}
      onClick={onClick} 
      className={`font-medium transition-colors ${isMobile 
        ? 'block text-left w-full px-4 py-3 text-lg text-gray-700 hover:bg-emerald-100' 
        : 'text-white hover:bg-emerald-600 px-3 py-2 rounded-md text-sm'
      }`}
    >
        {children}
    </a>
);

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, page: Page) => {
    event.preventDefault();
    onNavigate(page);
  };
  
  const handleMobileNavClick = (event: React.MouseEvent<HTMLAnchorElement>, page: Page) => {
    event.preventDefault();
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-emerald-700 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="/" onClick={(e) => handleNavClick(e, Page.Home)} className="flex items-center cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wider">{t('appName')}</h1>
          </a>
          <nav className="hidden md:flex items-center space-x-4">
            <NavLink href="/" onClick={(e) => handleNavClick(e, Page.Home)}>{t('navHome')}</NavLink>
            <NavLink href="/personalities" onClick={(e) => handleNavClick(e, Page.Personalities)}>{t('navPersonalities')}</NavLink>
            <NavLink href="/traditions" onClick={(e) => handleNavClick(e, Page.Traditions)}>{t('navTraditions')}</NavLink>
            <NavLink href="/diaspora" onClick={(e) => handleNavClick(e, Page.Diaspora)}>{t('navDiaspora')}</NavLink>
            <NavLink href="/events" onClick={(e) => handleNavClick(e, Page.Events)}>{t('navEvents')}</NavLink>
            <NavLink href="/contacts" onClick={(e) => handleNavClick(e, Page.Contacts)}>{t('navContacts')}</NavLink>
            
            {/* Language Switcher Dropdown */}
            <div className="relative">
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="bg-emerald-700 text-white font-medium text-sm rounded-md border-none focus:ring-2 focus:ring-white focus:outline-none appearance-none py-2 pl-3 pr-8 cursor-pointer hover:bg-emerald-600"
                    aria-label={t('language')}
                >
                    <option value="standard">{t('standardAlbanian')}</option>
                    <option value="dibran">{t('dibraDialect')}</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>

          </nav>
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-emerald-600 p-2 rounded-md"
              aria-label={t('openMenu')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-16 left-0 right-0 z-40">
          <div className="py-2">
            <NavLink href="/" onClick={(e) => handleMobileNavClick(e, Page.Home)} isMobile>{t('navHome')}</NavLink>
            <NavLink href="/personalities" onClick={(e) => handleMobileNavClick(e, Page.Personalities)} isMobile>{t('navPersonalities')}</NavLink>
            <NavLink href="/traditions" onClick={(e) => handleMobileNavClick(e, Page.Traditions)} isMobile>{t('navTraditions')}</NavLink>
            <NavLink href="/diaspora" onClick={(e) => handleMobileNavClick(e, Page.Diaspora)} isMobile>{t('navDiaspora')}</NavLink>
            <NavLink href="/events" onClick={(e) => handleMobileNavClick(e, Page.Events)} isMobile>{t('navEvents')}</NavLink>
            <NavLink href="/contacts" onClick={(e) => handleMobileNavClick(e, Page.Contacts)} isMobile>{t('navContacts')}</NavLink>
          </div>
          <div className="px-4 py-3 border-t border-gray-200">
            <label htmlFor="mobile-lang-select" className="block text-sm font-medium text-gray-700">{t('language')}</label>
            <select
                id="mobile-lang-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md"
            >
                <option value="standard">{t('standardAlbanian')}</option>
                <option value="dibran">{t('dibraDialect')}</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;