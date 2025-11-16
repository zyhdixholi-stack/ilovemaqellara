



import React, { useState, useEffect } from 'react';
import { Post, Page, PostStatus, Village } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import VillagePage from './components/VillagePage';
import PersonalitiesPage from './components/PersonalitiesPage';
import TraditionsPage from './components/TraditionsPage';
import DiasporaPage from './components/DiasporaPage';
import EventsPage from './components/EventsPage';
import ContactsPage from './components/ContactsPage';
import AdminDashboard from './components/AdminDashboard';
import PostForm from './components/PostForm';
import Chatbot from './components/Chatbot';
import AdminLogin from './components/AdminLogin';
import TermsOfServicePage from './components/TermsOfServicePage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import { LanguageProvider } from './contexts/LanguageContext';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [selectedVillage, setSelectedVillage] = useState<Village | null>(null);
  const [lastVisitedVillage, setLastVisitedVillage] = useState<Village | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isVillagePostFormOpen, setIsVillagePostFormOpen] = useState<boolean>(false);
  const [isDiasporaPostFormOpen, setIsDiasporaPostFormOpen] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => sessionStorage.getItem('isAdminAuthenticated') === 'true');
  const [initialPostData, setInitialPostData] = useState<Partial<Omit<Post, 'id' | 'status'>> | null>(null);

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      switch (path) {
        case '/personalities':
          setCurrentPage(Page.Personalities);
          break;
        case '/traditions':
          setCurrentPage(Page.Traditions);
          break;
        case '/diaspora':
          setCurrentPage(Page.Diaspora);
          break;
        case '/events':
          setCurrentPage(Page.Events);
          break;
        case '/contacts':
          setCurrentPage(Page.Contacts);
          break;
        case '/admin':
          setCurrentPage(Page.Admin);
          break;
        case '/terms':
          setCurrentPage(Page.TermsOfService);
          break;
        case '/privacy':
          setCurrentPage(Page.PrivacyPolicy);
          break;
        case '/':
        default:
          setCurrentPage(Page.Home);
          break;
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    handleLocationChange(); // Set initial page based on URL

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    if ('launchQueue' in window) {
      (window as any).launchQueue.setConsumer(async (launchParams: { files: any[] }) => {
        if (launchParams.files && launchParams.files.length > 0) {
          const fileHandle = launchParams.files[0];
          const file = await fileHandle.getFile();

          if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = (e) => {
              if (e.target?.result) {
                const imageUrl = e.target.result as string;
                // Hapim formularin e diasporës si pikë hyrjeje gjenerike për përmbajtjen e shpërndarë
                setInitialPostData({ imageUrl });
                setIsDiasporaPostFormOpen(true);
              }
            };
            reader.readAsDataURL(file);
          }
        }
      });
    }
  }, []);

  const handleNavigate = (page: Page) => {
    if (page === Page.Home && selectedVillage) {
      setLastVisitedVillage(selectedVillage);
    }

    const pathMap: Record<Page, string> = {
      [Page.Home]: '/',
      [Page.Villages]: '/', // Villages don't have a unique path, they are a state of home
      [Page.Personalities]: '/personalities',
      [Page.Traditions]: '/traditions',
      [Page.Diaspora]: '/diaspora',
      [Page.Events]: '/events',
      [Page.Contacts]: '/contacts',
      [Page.Admin]: '/admin',
      [Page.TermsOfService]: '/terms',
      [Page.PrivacyPolicy]: '/privacy',
    };

    const path = pathMap[page] || '/';

    // Update the state to trigger re-render
    setCurrentPage(page);
    setSelectedVillage(null); // Clear selected village when navigating to a main page

    // Then update URL if it's different
    if (window.location.pathname !== path) {
      window.history.pushState({ page }, '', path);
    }
     // Scroll to top of the page on navigation
    window.scrollTo(0, 0);
  };
  
  const handleSelectVillage = (village: Village) => {
    setLastVisitedVillage(null); // Clear when selecting a new village
    setSelectedVillage(village);
    setCurrentPage(Page.Villages);
     // Scroll to top of the page on navigation
    window.scrollTo(0, 0);
  };
  
  const handleAddPost = (post: Omit<Post, 'id' | 'status'>) => {
    const newPost: Post = {
      ...post,
      id: crypto.randomUUID(),
      status: PostStatus.Pending,
    };
    setPosts(prevPosts => [...prevPosts, newPost]);
    setIsVillagePostFormOpen(false);
    setIsDiasporaPostFormOpen(false);
  };

  const handleUpdatePostStatus = (postId: string, status: PostStatus) => {
    setPosts(prevPosts =>
      prevPosts.map(p => (p.id === postId ? { ...p, status } : p))
    );
  };

  const handleDeletePost = (postId: string) => {
     if (window.confirm("Jeni i sigurt? Ky veprim do ta heqë postimin përfundimisht.")) {
        setPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
     }
  };

  const handleLoginSuccess = () => {
    sessionStorage.setItem('isAdminAuthenticated', 'true');
    setIsAdminAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    setIsAdminAuthenticated(false);
    handleNavigate(Page.Home); // Redirect to home after logout
  };
  
  const approvedPostsForVillages = selectedVillage 
    ? posts.filter(p => p.status === PostStatus.Approved && p.villageName === selectedVillage.name)
    : [];

  const approvedPostsForDiaspora = posts.filter(p => p.status === PostStatus.Approved && !p.villageName);

  const renderContent = () => {
    switch (currentPage) {
      case Page.Home:
        return <HomePage onSelectVillage={handleSelectVillage} lastVisitedVillage={lastVisitedVillage} />;
      case Page.Villages:
        if (selectedVillage) {
          return <VillagePage village={selectedVillage} posts={approvedPostsForVillages} onAddPost={() => setIsVillagePostFormOpen(true)} />;
        }
        // If no village is selected, go back to home
        handleNavigate(Page.Home);
        return <HomePage onSelectVillage={handleSelectVillage} lastVisitedVillage={lastVisitedVillage} />;
      case Page.Personalities:
        return <PersonalitiesPage />;
      case Page.Traditions:
        return <TraditionsPage />;
      case Page.Diaspora:
        return <DiasporaPage posts={approvedPostsForDiaspora} onAddPost={() => setIsDiasporaPostFormOpen(true)} />;
      case Page.Events:
        return <EventsPage />;
      case Page.Contacts:
        return <ContactsPage />;
      case Page.Admin:
        return isAdminAuthenticated ? (
          <AdminDashboard 
            posts={posts} 
            onUpdateStatus={handleUpdatePostStatus}
            onDeletePost={handleDeletePost}
            onLogout={handleLogout}
          />
        ) : (
          <AdminLogin onLoginSuccess={handleLoginSuccess} />
        );
      case Page.TermsOfService:
        return <TermsOfServicePage />;
      case Page.PrivacyPolicy:
        return <PrivacyPolicyPage />;
      default:
        return <HomePage onSelectVillage={handleSelectVillage} lastVisitedVillage={lastVisitedVillage} />;
    }
  };
  
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header onNavigate={handleNavigate} />
      <main className="container mx-auto p-4 md:p-6 flex-grow">
        {renderContent()}
      </main>
      <Footer onNavigate={handleNavigate} />
      {isVillagePostFormOpen && selectedVillage && (
        <PostForm
          villageName={selectedVillage.name}
          onClose={() => setIsVillagePostFormOpen(false)}
          onSubmit={handleAddPost}
        />
      )}
      {isDiasporaPostFormOpen && (
        <PostForm
          onClose={() => {
            setIsDiasporaPostFormOpen(false);
            setInitialPostData(null);
          }}
          onSubmit={handleAddPost}
          initialData={initialPostData}
        />
      )}
      <Chatbot />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;