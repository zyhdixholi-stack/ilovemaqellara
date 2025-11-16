import React from 'react';
import { CONTACTS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const PoliceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);

const AmbulanceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01" />
    </svg>
);

const FirefighterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 15 8 15 10c2-1 2.657-1.343 2.657-1.343a8 8 0 010 10z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const MunicipalIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
);


const iconMap: { [key: string]: React.FC } = {
  police: PoliceIcon,
  ambulance: AmbulanceIcon,
  firefighters: FirefighterIcon,
  municipalServices: MunicipalIcon,
};


const ContactsPage: React.FC = () => {
  const { t } = useLanguage();

  const colors = [
    'bg-blue-500 hover:bg-blue-600',
    'bg-red-500 hover:bg-red-600',
    'bg-orange-500 hover:bg-orange-600',
    'bg-gray-500 hover:bg-gray-600'
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl text-center">
        <h1 className="text-4xl font-extrabold text-emerald-800 mb-6">{t('contactsPageTitle')}</h1>
        <div className="max-w-3xl mx-auto space-y-4 text-lg text-gray-700">
          <p>
            {t('contactsPageIntro')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CONTACTS.map((contact, index) => {
          const Icon = iconMap[contact.nameKey];
          return (
            <a 
              key={contact.nameKey} 
              href={`tel:${contact.number}`}
              className={`group p-6 rounded-xl shadow-lg text-white flex flex-col items-center justify-center text-center transform hover:-translate-y-2 transition-all duration-300 ${colors[index % colors.length]}`}
            >
                <div className="mb-4 p-4 bg-black bg-opacity-20 rounded-full">
                    {Icon && <Icon />}
                </div>
                <h2 className="text-2xl font-bold mb-1">{t(contact.nameKey)}</h2>
                <p className="text-3xl font-mono tracking-widest">{contact.number}</p>
                 <span className="mt-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    Kliko për të telefonuar
                </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ContactsPage;