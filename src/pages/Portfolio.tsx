import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PortfolioProps {
  onNavigate: (page: string) => void;
}

export function Portfolio({ onNavigate }: PortfolioProps) {
  const { t } = useLanguage();

  const projects = [
    {
      title: 'E-commerce Platform',
      category: t('portfolio.category.ecommerce'),
      description: t('portfolio.project1.description'),
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'TypeScript', 'Supabase'],
    },
    {
      title: 'SaaS Dashboard',
      category: t('portfolio.category.webapp'),
      description: t('portfolio.project2.description'),
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'Charts', 'API'],
    },
    {
      title: 'Portfolio Agency',
      category: t('portfolio.category.business'),
      description: t('portfolio.project3.description'),
      image: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'Animations', 'Design'],
    },
    {
      title: 'Restaurant Booking',
      category: t('portfolio.category.landing'),
      description: t('portfolio.project4.description'),
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'Calendar', 'Bookings'],
    },
    {
      title: 'Fitness App',
      category: t('portfolio.category.mobile'),
      description: t('portfolio.project5.description'),
      image: 'https://images.pexels.com/photos/3490348/pexels-photo-3490348.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React Native', 'Mobile', 'Health'],
    },
    {
      title: 'Blog Platform',
      category: t('portfolio.category.cms'),
      description: t('portfolio.project6.description'),
      image: 'https://images.pexels.com/photos/267569/pexels-photo-267569.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'CMS', 'Editor'],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {t('portfolio.title')}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('portfolio.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden hover:scale-105 hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 right-4">
                    <ExternalLink className="text-white" size={24} />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm font-medium text-gray-400 mb-2">{project.category}</div>
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/10 text-gray-300 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-all hover:scale-105"
          >
            {t('portfolio.startProject')}
          </button>
        </div>
      </div>
    </div>
  );
}
