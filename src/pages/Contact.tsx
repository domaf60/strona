import { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-12">
            <CheckCircle className="mx-auto mb-6 text-green-400" size={64} />
            <h2 className="text-3xl font-bold text-white mb-4">{t('contactPage.successTitle')}</h2>
            <p className="text-gray-400 mb-8">
              {t('contactPage.successMessage')}
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-all hover:scale-105"
            >
              {t('contactPage.sendAnother')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {t('contactPage.title')}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('contactPage.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-400">{t('contactPage.email')}</div>
                  <a
                    href="mailto:dominik@ndes1gn.com"
                    className="text-lg font-bold text-white hover:underline"
                  >
                    dominik@ndes1gn.com
                  </a>
                </div>
              </div>
              <p className="text-gray-400">
                {t('contactPage.preferDirect')}
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-4">{t('contactPage.whyWork.title')}</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="flex-shrink-0 mt-1 text-blue-400" size={20} />
                  <span className="text-gray-300">{t('contactPage.whyWork.1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="flex-shrink-0 mt-1 text-blue-400" size={20} />
                  <span className="text-gray-300">{t('contactPage.whyWork.2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="flex-shrink-0 mt-1 text-blue-400" size={20} />
                  <span className="text-gray-300">{t('contactPage.whyWork.3')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="flex-shrink-0 mt-1 text-blue-400" size={20} />
                  <span className="text-gray-300">{t('contactPage.whyWork.4')}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">{t('contactPage.formTitle')}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{t('contactPage.name')}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 transition-colors text-white placeholder-gray-500"
                  placeholder={t('contactPage.namePlaceholder')}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{t('contact.email')}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 transition-colors text-white placeholder-gray-500"
                  placeholder={t('contact.emailPlaceholder')}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{t('contactPage.message')}</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 transition-colors text-white placeholder-gray-500 resize-none"
                  rows={6}
                  placeholder={t('contactPage.messagePlaceholder')}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? (
                  t('contact.sending')
                ) : (
                  <>
                    <Send size={20} />
                    {t('contact.send')}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
