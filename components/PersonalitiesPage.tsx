

import React, { useState, useEffect } from 'react';
import { NOTABLE_PEOPLE } from '../constants';
import { generateContent } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import { useLanguage } from '../contexts/LanguageContext';

interface BioInfo {
  bio: string;
  sources: { uri: string; title: string }[];
  isLoading: boolean;
}

const PersonalitiesPage: React.FC = () => {
  const [bios, setBios] = useState<Record<string, BioInfo>>({});
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetchBios = async () => {
      for (const person of NOTABLE_PEOPLE) {
        setBios(prev => ({ ...prev, [person.name]: { bio: '', sources: [], isLoading: true } }));
        try {
          const prompt = `Shkruaj një biografi të detajuar dhe tërheqëse (rreth 80-120 fjalë) për ${person.name} nga Maqellara, Shqipëri. Përdor informacion nga uebi për të përfshirë arritjet kryesore dhe kontributin e tij/saj. Ji pozitiv dhe informues.`;
          const result = await generateContent(prompt, true, language);
          setBios(prev => ({ ...prev, [person.name]: { bio: result.text, sources: result.sources || [], isLoading: false } }));
        } catch (error) {
          console.error(`Problem gjatë gjenerimit të biografisë për ${person.name}:`, error);
          // Use the static bio as a fallback in case of an error
          setBios(prev => ({ ...prev, [person.name]: { bio: person.bio, sources: [], isLoading: false } }));
        }
      }
    };

    fetchBios();
  }, [language]);

  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl">
      <h1 className="text-4xl font-extrabold text-center text-emerald-800 mb-10">{t('notablePersonalities')}</h1>
      <div className="max-w-4xl mx-auto space-y-12">
        {NOTABLE_PEOPLE.map((person, index) => (
          <div 
            key={person.name} 
            className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
          >
            <img 
              src={person.imageUrl} 
              alt={person.name} 
              className="w-48 h-48 object-cover rounded-full shadow-lg border-4 border-emerald-200"
            />
            <div className="text-center md:text-left flex-1">
              <h2 className="text-3xl font-bold text-emerald-700">{person.name}</h2>
              {bios[person.name]?.isLoading ? (
                <div className="mt-2">
                  <LoadingSpinner />
                </div>
              ) : (
                <>
                  <p className="mt-2 text-gray-600 text-lg whitespace-pre-wrap">
                    {bios[person.name]?.bio || person.bio}
                  </p>
                  {bios[person.name]?.sources && bios[person.name].sources.length > 0 && (
                    <div className="mt-4 text-left">
                      <h4 className="font-semibold text-sm text-gray-800">{t('sources')}</h4>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        {bios[person.name].sources.map((source, i) => (
                          <li key={i} className="text-sm text-gray-600 truncate">
                            <a 
                              href={source.uri} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-emerald-600 hover:text-emerald-800 hover:underline"
                              title={source.title || source.uri}
                            >
                              {source.title || new URL(source.uri).hostname}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalitiesPage;