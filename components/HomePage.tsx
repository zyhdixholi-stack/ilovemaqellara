import React, { useState, useMemo } from 'react';
import { Village } from '../types';
import { VILLAGES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

interface HomePageProps {
  onSelectVillage: (village: Village) => void;
  lastVisitedVillage?: Village | null;
}

const HomePage: React.FC<HomePageProps> = ({ onSelectVillage, lastVisitedVillage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useLanguage();

  const filteredVillages = useMemo(() => {
    if (!searchTerm.trim()) {
      return VILLAGES;
    }
    return VILLAGES.filter(village =>
      village.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="space-y-12">
       {lastVisitedVillage && (
        <section className="bg-emerald-100 border-l-4 border-emerald-500 text-emerald-800 p-4 rounded-r-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" role="alert">
          <div>
            <h2 className="font-bold text-lg">{t('welcomeBack')}</h2>
            <p>{t('lastVisited', { villageName: lastVisitedVillage.name })}</p>
          </div>
          <button
            onClick={() => onSelectVillage(lastVisitedVillage)}
            className="bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors duration-300 shadow-sm flex-shrink-0"
          >
            {t('returnToVillage')}
          </button>
        </section>
      )}

      <section 
        className="relative bg-cover bg-center h-96 rounded-2xl shadow-2xl overflow-hidden"
        style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Maqellare_2016.jpg/1280px-Maqellare_2016.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-wide">{t('welcomeToMaqellara')}</h1>
          <p className="mt-4 text-xl text-gray-200 max-w-2xl">
            {t('homeSubtitle')}
          </p>
        </div>
      </section>

      <section>
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-center text-emerald-700 mb-2">{t('historyAndGeography')}</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto">
            {t('homeHistoryText')}
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-4xl font-bold text-center mb-8">{t('exploreVillages')}</h2>
        
        <div className="mb-8 max-w-lg mx-auto">
          <label htmlFor="village-search" className="sr-only">{t('searchVillage')}</label>
          <input
            id="village-search"
            type="text"
            placeholder={t('searchVillage')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 text-lg border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow duration-200"
            aria-label="Kërko fshatrat sipas emrit"
          />
        </div>

        {filteredVillages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredVillages.map((village) => (
              <div
                key={village.name}
                onClick={() => onSelectVillage(village)}
                className="group cursor-pointer bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
              >
                <img 
                  src={village.imageUrl} 
                  alt={`Pamje nga ${village.name}`}
                  className="w-full h-40 object-cover group-hover:opacity-90 transition-opacity"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-emerald-800">{village.name}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-100 rounded-lg">
            <p className="text-gray-500">{t('noVillagesFound')}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;