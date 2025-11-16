import React, { useState } from 'react';
import { Post, PostStatus } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface AdminDashboardProps {
  posts: Post[];
  onUpdateStatus: (postId: string, status: PostStatus) => void;
  onDeletePost: (postId: string) => void;
  onLogout: () => void;
}

type ActiveTab = 'pending' | 'approved' | 'archived';
const PASSWORD_STORAGE_KEY = 'adminPassword';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ posts, onUpdateStatus, onDeletePost, onLogout }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('pending');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });
  const { t } = useLanguage();
  
  const pendingPosts = posts.filter(post => post.status === PostStatus.Pending);
  const approvedPosts = posts.filter(post => post.status === PostStatus.Approved);
  const archivedPosts = posts.filter(post => post.status === PostStatus.Archived);

  const handleReject = (postId: string) => {
    if (window.confirm(t('confirmReject'))) {
      onDeletePost(postId);
    }
  };

  const handleDeletePermanently = (postId: string) => {
    if (window.confirm(t('confirmDelete'))) {
      onDeletePost(postId);
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage({ type: '', text: '' });

    const currentPassword = localStorage.getItem(PASSWORD_STORAGE_KEY);

    if (oldPassword !== currentPassword) {
      setPasswordMessage({ type: 'error', text: t('wrongOldPassword') });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: t('passwordTooShort') });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: t('passwordsDoNotMatch') });
      return;
    }

    localStorage.setItem(PASSWORD_STORAGE_KEY, newPassword);
    setPasswordMessage({ type: 'success', text: t('passwordChangedSuccess') });

    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    
    // Hide form and clear success message after a delay
    setTimeout(() => {
        setShowPasswordForm(false);
        setPasswordMessage({ type: '', text: '' });
    }, 2000);
  };


  const renderPostList = (postList: Post[], tab: ActiveTab) => {
    if (postList.length === 0) {
      return <p className="text-gray-500 mt-4">{t('noPostsInCategory')}</p>;
    }

    return (
      <div className="space-y-6">
        {postList.map(post => (
          <div
            key={post.id}
            className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row gap-4 items-start"
          >
            {(post.imageUrl || post.videoUrl) && (
              <div className="w-full md:w-48 flex-shrink-0">
                {post.imageUrl && (
                  <img src={post.imageUrl} alt="Postim" className="w-full h-auto object-cover rounded-md" />
                )}
                {post.videoUrl && (
                  <div className="aspect-video">
                    <iframe
                      className="w-full h-full rounded-md"
                      src={post.videoUrl}
                      title="Video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
            )}
            <div className="flex-grow">
              <p className="font-bold">
                {post.author}
                <span className="font-normal text-gray-500">
                  {post.villageName ? ` nga ${post.villageName}` : ' nga Diaspora'}
                </span>
              </p>
              {post.comment && <p className="mt-1 text-gray-700">{post.comment}</p>}
            </div>
            <div className="flex space-x-2 mt-4 md:mt-0 flex-shrink-0">
              {tab === 'pending' && (
                <>
                  <button
                    onClick={() => onUpdateStatus(post.id, PostStatus.Approved)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors text-sm font-semibold"
                    aria-label={`Approvo postimin nga ${post.author}`}
                  >
                    {t('approve')}
                  </button>
                  <button
                    onClick={() => handleReject(post.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-sm font-semibold"
                    aria-label={`Refuzo postimin nga ${post.author}`}
                  >
                    {t('reject')}
                  </button>
                </>
              )}
              {tab === 'approved' && (
                 <button
                  onClick={() => onUpdateStatus(post.id, PostStatus.Archived)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors text-sm font-semibold"
                  aria-label={`Arkivo postimin nga ${post.author}`}
                >
                  {t('archive')}
                </button>
              )}
               {tab === 'archived' && (
                <>
                  <button
                    onClick={() => onUpdateStatus(post.id, PostStatus.Approved)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm font-semibold"
                    aria-label={`Rivendos postimin nga ${post.author}`}
                  >
                    {t('restore')}
                  </button>
                   <button
                    onClick={() => handleDeletePermanently(post.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-sm font-semibold"
                    aria-label={`Fshij përfundimisht postimin nga ${post.author}`}
                  >
                    {t('deletePermanently')}
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const getListAndTitle = () => {
    switch (activeTab) {
      case 'pending':
        return { list: pendingPosts, title: t('pendingPostsTitle') };
      case 'approved':
        return { list: approvedPosts, title: t('approvedPostsTitle') };
      case 'archived':
        return { list: archivedPosts, title: t('archivedPostsTitle') };
    }
  }

  const { list, title } = getListAndTitle();
  
  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-emerald-800">{t('adminDashboardTitle')}</h1>
        <button
          onClick={onLogout}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors text-sm font-semibold"
        >
          {t('logout')}
        </button>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('pending')}
            className={`${activeTab === 'pending' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            {t('pending')} <span className="bg-yellow-200 text-yellow-800 ml-2 px-2 py-0.5 rounded-full text-xs">{pendingPosts.length}</span>
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`${activeTab === 'approved' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            {t('approved')} <span className="bg-green-200 text-green-800 ml-2 px-2 py-0.5 rounded-full text-xs">{approvedPosts.length}</span>
          </button>
           <button
            onClick={() => setActiveTab('archived')}
            className={`${activeTab === 'archived' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            {t('archived')} <span className="bg-gray-200 text-gray-800 ml-2 px-2 py-0.5 rounded-full text-xs">{archivedPosts.length}</span>
          </button>
        </nav>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          {title} ({list.length})
        </h2>
        {renderPostList(list, activeTab)}
      </div>

      <div className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-semibold mb-4">{t('managePassword')}</h2>
        {!showPasswordForm ? (
            <button
                onClick={() => {
                    setShowPasswordForm(true);
                    setPasswordMessage({ type: '', text: '' });
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm font-semibold"
            >
                {t('changePassword')}
            </button>
        ) : (
            <form onSubmit={handlePasswordChange} className="max-w-md space-y-4">
            <div>
                <label htmlFor="old-password" className="block text-sm font-medium text-gray-700">{t('oldPassword')}</label>
                <input
                type="password"
                id="old-password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                required
                />
            </div>
            <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">{t('newPassword')}</label>
                <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                required
                />
            </div>
            <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">{t('confirmNewPassword')}</label>
                <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                required
                />
            </div>
            {passwordMessage.text && (
                <p className={`text-sm ${passwordMessage.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>
                {passwordMessage.text}
                </p>
            )}
            <div className="flex space-x-2">
                <button
                    type="submit"
                    className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors text-sm font-semibold"
                >
                    {t('saveChanges')}
                </button>
                <button
                    type="button"
                    onClick={() => setShowPasswordForm(false)}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm font-semibold"
                >
                    {t('cancel')}
                </button>
            </div>
            </form>
        )}
      </div>

    </div>
  );
};

export default AdminDashboard;