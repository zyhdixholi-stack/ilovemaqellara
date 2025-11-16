

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LoadingSpinner: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="flex justify-center items-center py-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      <p className="ml-3 text-gray-600">{t('generatingContent')}</p>
    </div>
  );
};

export default LoadingSpinner;
