import React from 'react';
import { EVENTS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const EventsPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl text-center">
        <h1 className="text-4xl font-extrabold text-emerald-800 mb-6">{t('eventsPageTitle')}</h1>
        <div className="max-w-3xl mx-auto space-y-4 text-lg text-gray-700">
          <p>
            {t('eventsPageIntro')}
          </p>
        </div>
      </div>

      <div>
        {EVENTS.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EVENTS.map(event => (
              <div key={event.id} className="bg-gray-50 rounded-xl shadow-lg overflow-hidden flex flex-col group">
                <div className="overflow-hidden">
                    <img 
                        src={event.imageUrl} 
                        alt={`Imazh për ${event.title}`} 
                        className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-2xl font-bold text-emerald-700 mb-3">{event.title}</h2>
                    <p className="text-gray-600 flex-grow mb-4">{event.description}</p>
                    <div className="mt-auto border-t border-gray-200 pt-4 space-y-2 text-sm">
                        <p className="flex items-center text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="font-semibold">{t('date')}&nbsp;</span> {event.date}
                        </p>
                        <p className="flex items-center text-gray-700">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="font-semibold">{t('location')}&nbsp;</span> {event.location}
                        </p>
                    </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-100 rounded-lg">
            <p className="text-gray-500">{t('noEvents')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;