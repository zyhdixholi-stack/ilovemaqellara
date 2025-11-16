import React, { useState, useEffect } from 'react';
import { Post } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface PostFormProps {
  villageName?: string;
  onClose: () => void;
  onSubmit: (post: Omit<Post, 'id' | 'status'>) => void;
  initialData?: Partial<Omit<Post, 'id' | 'status'>> | null;
}

type MediaType = 'image' | 'video';

const PostForm: React.FC<PostFormProps> = ({ villageName, onClose, onSubmit, initialData }) => {
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [mediaType, setMediaType] = useState<MediaType>('image');
  const { t } = useLanguage();

  useEffect(() => {
    if (initialData) {
      if (initialData.imageUrl) {
        setMediaType('image');
        setPreview(initialData.imageUrl);
      }
      if (initialData.author) {
        setAuthor(initialData.author);
      }
      if (initialData.comment) {
        setComment(initialData.comment);
      }
    }
  }, [initialData]);


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setVideoUrl('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
     if (!author.trim()) {
      alert('Ju lutem plotësoni emrin tuaj.');
      return;
    }
    if (!comment.trim() && !image && !videoUrl.trim() && !preview) {
      alert('Duhet të shtoni të paktën një koment, një foto, ose një video.');
      return;
    }
    
    let finalVideoUrl = videoUrl.trim();
    if (finalVideoUrl && mediaType === 'video') {
      const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = finalVideoUrl.match(youtubeRegex);
      if (match && match[1]) {
        finalVideoUrl = `https://www.youtube.com/embed/${match[1]}`;
      } else {
        alert('Ju lutem vendosni një URL të vlefshme nga YouTube (psh: https://www.youtube.com/watch?v=...).');
        return;
      }
    }

    const postData: Omit<Post, 'id' | 'status'> = {
        author: author.trim(),
        ...(comment.trim() && { comment: comment.trim() }),
        ...(preview && mediaType === 'image' && { imageUrl: preview }),
        ...(finalVideoUrl && mediaType === 'video' && { videoUrl: finalVideoUrl }),
        ...(villageName && { villageName }),
    };
    onSubmit(postData);
  };
  
  const title = villageName ? t('newPostFor', { villageName }) : t('shareWithDiaspora');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg relative transform transition-all animate-fade-in-up max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4 text-emerald-800">{title}</h2>
        
        <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 rounded-r-lg mb-6 text-sm">
          <p className="font-bold mb-2">{t('postingRules')}</p>
          <ul className="list-disc list-inside space-y-1">
            <li>{t('rule1')}</li>
            <li>{t('rule2')}</li>
            <li>{t('rule3')}</li>
            <li className="font-semibold">{t('rule4')}</li>
          </ul>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">{t('yourName')} <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700">{t('commentOrDescription')}</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('addMedia')}</label>
            <div className="flex border border-gray-300 rounded-lg p-1 bg-gray-50">
                <button type="button" onClick={() => setMediaType('image')} className={`w-1/2 py-2 text-sm font-medium rounded-md transition-colors ${mediaType === 'image' ? 'bg-emerald-600 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}>
                    {t('uploadPhoto')}
                </button>
                 <button type="button" onClick={() => setMediaType('video')} className={`w-1/2 py-2 text-sm font-medium rounded-md transition-colors ${mediaType === 'video' ? 'bg-emerald-600 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}>
                    {t('addVideo')}
                </button>
            </div>
          </div>
          
          {mediaType === 'image' && (
             <div>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    {preview ? (
                    <img src={preview} alt="Preview" className="mx-auto h-32 w-auto rounded-md object-contain" />
                    ) : (
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    )}
                    <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none">
                        <span>{t('chooseFile')}</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                    </label>
                    <p className="pl-1">{t('dragHere')}</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF deri në 10MB</p>
                </div>
                </div>
            </div>
          )}

          {mediaType === 'video' && (
             <div>
                <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">{t('youtubeUrl')}</label>
                <input
                    type="text"
                    id="videoUrl"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={videoUrl}
                    onChange={(e) => {
                      setVideoUrl(e.target.value);
                      setImage(null);
                      setPreview(null);
                    }}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
            </div>
          )}

          <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors duration-300 shadow-lg">
            {t('submitForApproval')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;