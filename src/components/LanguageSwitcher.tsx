import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-white/70 backdrop-blur-xl rounded-full border border-gray-200/50 p-1.5 shadow-lg">
      <Globe className="text-gray-600 ml-2" size={18} />
      <button
        onClick={() => setLanguage('pl')}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
          language === 'pl'
            ? 'bg-gray-900 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        PL
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
          language === 'en'
            ? 'bg-gray-900 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        EN
      </button>
    </div>
  );
}
