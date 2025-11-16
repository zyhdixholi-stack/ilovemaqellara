import React from 'react';
import { Post } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import PostList from './PostList';

interface DiasporaPageProps {
  posts: Post[];
  onAddPost: () => void;
}

const DiasporaPage: React.FC<DiasporaPageProps> = ({ posts, onAddPost }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl text-center">
        <h1 className="text-4xl font-extrabold text-emerald-800 mb-6">{t('maqellaraDiaspora')}</h1>
        <div className="max-w-3xl mx-auto space-y-4 text-lg text-gray-700">
          <p>
            {t('diasporaIntro1')}
          </p>
          <p>
            {t('diasporaIntro2')}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl space-y-4">
        <h2 className="text-2xl font-bold text-center">{t('shareYourStory')}</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto">
          {t('shareYourStoryPrompt')}
        </p>
        <div className="flex justify-center pt-4">
            <button
                onClick={onAddPost}
                className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-emerald-700 transition-colors duration-300 shadow-lg transform hover:scale-105"
            >
                {t('addPost')}
            </button>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-center border-b-2 border-emerald-200 pb-2 mb-6">{t('diasporaGallery')}</h2>
        <PostList posts={posts} noPostsMessageKey="noPostsDiaspora" />
      </div>
    </div>
  );
};

export default DiasporaPage;