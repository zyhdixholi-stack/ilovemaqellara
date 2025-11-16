import React, { useState, useEffect } from 'react';
import { TRADITIONS, FOODS } from '../constants';
import { generateContent } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import { useLanguage } from '../contexts/LanguageContext';
import { Tradition, Food } from '../types';

interface DescriptionInfo {
  text: string;
  isLoading: boolean;
}

const TraditionsPage: React.FC = () => {
  const [descriptions, setDescriptions] = useState<Record<string, DescriptionInfo>>({});
  const { language, t } = useLanguage();

  const fetchAllDescriptions = async () => {
    const allItems: (Tradition | Food)[] = [...TRADITIONS, ...FOODS];
    const initialDescriptions: Record<string, DescriptionInfo> = {};
    allItems.forEach(item => {
      initialDescriptions[item.nameKey] = { text: '', isLoading: true };
    });
    setDescriptions(initialDescriptions);

    for (const item of allItems) {
      try {
        let prompt = '';
        if (item.nameKey === 'odaDibrane') {
            prompt = `Shkruaj një përshkrim të detajuar dhe tërheqës (rreth 80-120 fjalë) për 'Oda Dibrane'. Përqendrohu në rëndësinë e saj kulturore dhe rolin shoqëror në Dibër. Shpjego se si Oda shërbente si një institucion social ku merreshin vendime të rëndësishme, zgjidheshin mosmarrëveshjet dhe përcillej tradita gojore me këngë e histori. Thekso vlerat e mikpritjes, besës dhe burrërisë që ajo përfaqëson.`;
        } else {
            const isTradition = 'nameKey' in item && TRADITIONS.some(t => t.nameKey === item.nameKey);
            const itemType = isTradition ? 'traditën' : 'gatimin';
            prompt = `Shkruaj një përshkrim të shkurtër dhe tërheqës (rreth 40-60 fjalë) për ${itemType} "${t(item.nameKey)}" në kulturën e Dibrës. Përshkrimi duhet të jetë informues dhe të nxisë interesin e vizitorëve.`;
        }

        const result = await generateContent(prompt, false, language);
        setDescriptions(prev => ({
          ...prev,
          [item.nameKey]: { text: result.text, isLoading: false }
        }));
      } catch (error) {
        console.error(`Problem gjatë gjenerimit të përshkrimit për ${item.nameKey}:`, error);
        setDescriptions(prev => ({
          ...prev,
          [item.nameKey]: { text: 'Përshkrimi për këtë element është duke u përgatitur.', isLoading: false }
        }));
      }
    }
  };

  useEffect(() => {
    fetchAllDescriptions();
  }, [language, t]);
  
  const renderCard = (item: Tradition | Food) => (
    <div key={item.nameKey} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group">
      <div className="relative h-56">
        <img 
            src={item.imageUrl} 
            alt={t(item.nameKey)} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
        <h3 className="absolute bottom-0 left-0 p-4 text-2xl font-bold text-white tracking-wide">
          {t(item.nameKey)}
        </h3>
      </div>
      <div className="p-5 flex-grow">
        {descriptions[item.nameKey]?.isLoading ? (
          <LoadingSpinner />
        ) : (
          <p className="text-gray-600">
            {descriptions[item.nameKey]?.text}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-12">
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl text-center">
        <h1 className="text-4xl font-extrabold text-emerald-800 mb-6">{t('traditionsPageTitle')}</h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-700">
          {t('traditionsPageIntro')}
        </p>
      </div>

      <section>
        <h2 className="text-3xl font-bold text-center mb-8 border-b-2 border-emerald-200 pb-3">{t('traditionsTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TRADITIONS.map(renderCard)}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-8 border-b-2 border-emerald-200 pb-3">{t('gastronomyTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FOODS.map(renderCard)}
        </div>
      </section>
    </div>
  );
};

export default TraditionsPage;