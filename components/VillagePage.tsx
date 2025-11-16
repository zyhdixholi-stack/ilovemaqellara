import React, { useState, useEffect } from 'react';
import { Village, Post } from '../types';
import { generateContent } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import { useLanguage } from '../contexts/LanguageContext';
import PostList from './PostList';

interface VillagePageProps {
  village: Village;
  posts: Post[];
  onAddPost: () => void;
}

const VillagePage: React.FC<VillagePageProps> = ({ village, posts, onAddPost }) => {
  const [description, setDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetchDescription = async () => {
      setIsLoading(true);
      try {
        const prompt = `Shkruaj një përshkrim të detajuar dhe tërheqës (rreth 100-150 fjalë) për fshatin ${village.name} në njësinë administrative Maqellarë, Shqipëri. Përdor informacion nga uebi për të përfshirë fakte interesante historike, gjeografike, ose kulturore. Ji pozitiv dhe promovues.`;
        const result = await generateContent(prompt, true, language);
        setDescription(result.text);
      } catch (error) {
        console.error("Problem gjatë gjenerimit të përshkrimit të fshatit:", error);
        setDescription("Ky fshat është një perlë e rajonit, i pasur me histori dhe bukuri natyrore që presin të zbulohen.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDescription();
  }, [village.name, language]);

  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Zbulo bukuritë e fshatit ${village.name} në platformën Zbulo Maqellarën!`;
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedText = encodeURIComponent(shareText);

  const socialLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
  };
  
  const googleMapsUrl = `https://www.google.com/maps?q=${village.lat},${village.lng}&z=15`;

  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl space-y-8">
      <div className="border-b-2 border-emerald-100 pb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-800">{village.name}</h1>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-sm font-semibold text-gray-600 hidden md:block">{t('share')}</span>
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label={t('shareOnFacebook')} title={t('shareOnFacebook')} className="text-gray-500 hover:text-blue-600 transition-colors p-2 bg-gray-100 hover:bg-blue-50 rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
            </a>
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label={t('shareOnTwitter')} title={t('shareOnTwitter')} className="text-gray-500 hover:text-blue-400 transition-colors p-2 bg-gray-100 hover:bg-blue-50 rounded-full">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
            </a>
            <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={t('shareOnWhatsapp')} title={t('shareOnWhatsapp')} className="text-gray-500 hover:text-green-500 transition-colors p-2 bg-gray-100 hover:bg-green-50 rounded-full">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12.04 20.15c-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.32a8.19 8.19 0 01-1.26-4.37c0-4.54 3.68-8.22 8.22-8.22s8.22 3.68 8.22 8.22-3.68 8.22-8.22 8.22zm4.52-6.13c-.25-.12-1.47-.72-1.7-.82s-.39-.12-.56.12c-.17.25-.64.82-.79.98s-.29.17-.54.05c-.25-.12-1.06-.39-2.02-1.25s-1.45-1.94-1.62-2.27c-.17-.33-.02-.51.11-.64s.25-.29.37-.44c.12-.14.17-.25.25-.41s.12-.3.06-.49c-.06-.2-.56-1.34-.76-1.84s-.4-.42-.55-.42h-.5c-.17 0-.44.06-.68.29s-.87.85-1.06 2.07c-.2 1.22.89 2.4 1.01 2.56.12.17 1.76 2.68 4.27 3.75 2.5 1.07 2.5 1.15 2.95 1.15.45 0 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.05-.1-.17-.15-.42-.28z" /></svg>
            </a>
          </div>
        </div>
        {isLoading ? <LoadingSpinner /> : (
            <div>
                <p className="mt-4 text-lg text-gray-600 whitespace-pre-wrap">{description}</p>
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">{t('interactiveMap')}</h2>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md bg-gray-200 flex flex-col items-center justify-center p-6 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 13v-3m6 3v-3m0 0V7" />
              </svg>
              <p className="text-gray-600 mb-5 max-w-sm">
                  {t('mapDescription')}
              </p>
              <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-emerald-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-emerald-700 transition-colors duration-300 shadow-lg transform hover:scale-105"
              >
                  {t('openGoogleMaps')}
              </a>
            </div>
        </div>

        <div className="space-y-4">
            <h2 className="text-2xl font-bold">{t('promoteActivity')}</h2>
            <p className="text-gray-600">{t('promoteActivityPrompt')}</p>
            <button
                onClick={onAddPost}
                className="w-full bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors duration-300 shadow-lg transform hover:scale-105"
            >
                {t('addPost')}
            </button>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold border-b-2 border-emerald-200 pb-2 mb-6">{t('communityGallery')}</h2>
        <PostList posts={posts} noPostsMessageKey="noPostsVillage" />
      </div>
    </div>
  );
};

export default VillagePage;