import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Navbar } from './components/Navbar';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { AdminPanel } from './pages/AdminPanel';
import { ClientPanel } from './pages/ClientPanel';
import { Brief } from './pages/Brief';
import { Portfolio } from './pages/Portfolio';
import { Reviews } from './pages/Reviews';
import { Calendar } from './pages/Calendar';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { user, loading } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      setCurrentPage(`client-${token}`);
    } else {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setCurrentPage(hash);
      }
    }
  }, []);

  const navigate = (page: string) => {
    setCurrentPage(page);
    if (page.startsWith('client-')) {
      const token = page.replace('client-', '');
      window.history.pushState({}, '', `?token=${token}`);
    } else {
      window.history.pushState({}, '', `#${page}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Ładowanie...</div>
      </div>
    );
  }

  if (currentPage.startsWith('client-')) {
    const token = currentPage.replace('client-', '');
    return <ClientPanel token={token} />;
  }

  const renderPage = () => {
    if (user) {
      switch (currentPage) {
        case 'admin':
          return <AdminPanel onNavigate={navigate} />;
        case 'calendar':
          return <Calendar onNavigate={navigate} />;
        case 'reviews':
          return <Reviews />;
        case 'brief':
          return <Brief />;
        default:
          return <AdminPanel onNavigate={navigate} />;
      }
    }

    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigate} />;
      case 'portfolio':
        return <Portfolio onNavigate={navigate} />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'login':
        return <Login onNavigate={navigate} />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen">
      {!currentPage.startsWith('client-') && (
        <Navbar onNavigate={navigate} currentPage={currentPage} />
      )}
      {renderPage()}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
