import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

// Fjalëkalimi është vendosur këtu për thjeshtësi. 
// Në një aplikacion real, ky duhet të menaxhohet në mënyrë të sigurt përmes variablave të mjedisit ose një shërbimi backend.
const DEFAULT_ADMIN_PASSWORD = 'admin123';
const PASSWORD_STORAGE_KEY = 'adminPassword';

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { t } = useLanguage();

  // Set default password on initial load if it's not already set
  useEffect(() => {
    if (!localStorage.getItem(PASSWORD_STORAGE_KEY)) {
      localStorage.setItem(PASSWORD_STORAGE_KEY, DEFAULT_ADMIN_PASSWORD);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem(PASSWORD_STORAGE_KEY) || DEFAULT_ADMIN_PASSWORD;
    if (password === storedPassword) {
      onLoginSuccess();
    } else {
      setError(t('wrongPassword'));
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-emerald-800 mb-6">{t('adminLoginTitle')}</h1>
        <p className="text-center text-gray-600 mb-6">
          {t('adminLoginPrompt')}
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="sr-only">
              {t('password')}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-lg"
              placeholder={t('password')}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
            >
              {t('login')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;