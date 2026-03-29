import { useState, useEffect } from 'react';
import { Menu, X, Mail, Code, Palette, Sparkles, ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', budget: '', description: '' });

    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const services = [
    {
      icon: Code,
      title: t('services.webdev.title'),
      description: t('services.webdev.description'),
      features: [t('services.webdev.feature1'), t('services.webdev.feature2'), t('services.webdev.feature3')]
    },
    {
      icon: Palette,
      title: t('services.design.title'),
      description: t('services.design.description'),
      features: [t('services.design.feature1'), t('services.design.feature2'), t('services.design.feature3')]
    },
    {
      icon: Sparkles,
      title: t('services.strategy.title'),
      description: t('services.strategy.description'),
      features: [t('services.strategy.feature1'), t('services.strategy.feature2'), t('services.strategy.feature3')]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-14">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
            <span className="text-sm text-gray-300">{t('home.hero.available')}</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6 leading-tight">
            {t('home.hero.title')}
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              {t('home.hero.experiences')}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            {t('home.hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="group px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-all flex items-center space-x-2"
            >
              <span>{t('home.hero.startProject')}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#work"
              className="px-8 py-4 bg-white/5 backdrop-blur-xl rounded-full font-medium hover:bg-white/10 transition-all border border-white/10"
            >
              {t('home.hero.viewWork')}
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 lg:py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">{t('services.title')}</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon size={28} className="text-blue-400" />
                  </div>

                  <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>

                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-gray-400">
                        <Check size={16} className="text-blue-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="work" className="py-24 lg:py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">{t('work.title')}</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('work.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="group relative aspect-video bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold mb-2">{t('work.project')} {item}</h3>
                    <p className="text-gray-300">{t('work.viewCase')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 lg:py-32 px-6 relative">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">{t('contact.title')}</h2>
            <p className="text-gray-400 text-lg">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 lg:p-12">
            {submitSuccess && (
              <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400 text-center">
                {t('contact.success')}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">{t('contact.name')}</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 transition-colors text-white placeholder-gray-500"
                  placeholder={t('contact.namePlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">{t('contact.email')}</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 transition-colors text-white placeholder-gray-500"
                  placeholder={t('contact.emailPlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">{t('contact.budget')}</label>
                <select
                  required
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 transition-colors text-white"
                >
                  <option value="" className="bg-black">{t('contact.budgetSelect')}</option>
                  <option value="<5k" className="bg-black">{t('contact.budgetLess5')}</option>
                  <option value="5k-10k" className="bg-black">{t('contact.budget5to10')}</option>
                  <option value="10k-25k" className="bg-black">{t('contact.budget10to25')}</option>
                  <option value="25k+" className="bg-black">{t('contact.budget25plus')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">{t('contact.description')}</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-white/30 transition-colors text-white placeholder-gray-500 resize-none"
                  placeholder={t('contact.descriptionPlaceholder')}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <span>{t('contact.sending')}</span>
                ) : (
                  <>
                    <Mail size={18} />
                    <span>{t('contact.send')}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
              <span className="text-lg font-semibold">ndes1gn</span>
            </div>

            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Dominik Niewiadomski. {t('footer.rights')}
            </p>

            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
