import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { language, setLanguage } = useLanguage();

  const navItems = user
    ? [
        { id: 'admin', label: 'Panel Admin' },
        { id: 'calendar', label: 'Kalendarz' },
        { id: 'reviews', label: 'Recenzje' },
      ]
    : [
        { id: 'home', label: 'Home' },
        { id: 'portfolio', label: 'Portfolio' },
        { id: 'about', label: 'O mnie' },
        { id: 'contact', label: 'Kontakt' },
      ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <button
            onClick={() => onNavigate('home')}
            className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            NDES1GN
          </button>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            {user ? (
              <button
                onClick={() => signOut()}
                className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
              >
                Wyloguj
              </button>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-full">
                <Globe className="text-gray-400" size={16} />
                <button
                  onClick={() => setLanguage('pl')}
                  className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${
                    language === 'pl'
                      ? 'bg-white text-gray-900'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  PL
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${
                    language === 'en'
                      ? 'bg-white text-gray-900'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  EN
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                {item.label}
              </button>
            ))}
            {user ? (
              <button
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-gray-800/50 transition-colors"
              >
                Wyloguj
              </button>
            ) : (
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-lg">
                <Globe className="text-gray-400" size={16} />
                <button
                  onClick={() => setLanguage('pl')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    language === 'pl'
                      ? 'bg-white text-gray-900'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  PL
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    language === 'en'
                      ? 'bg-white text-gray-900'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  EN
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
