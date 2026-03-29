import { Palette, Zap, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function About() {
  const { t } = useLanguage();

  const skills = [
    { name: 'React & TypeScript', level: 95 },
    { name: 'UI/UX Design', level: 90 },
    { name: 'Node.js & APIs', level: 85 },
    { name: 'Supabase & Databases', level: 90 },
  ];

  const values = [
    {
      icon: Palette,
      title: t('about.value1.title'),
      description: t('about.value1.description'),
    },
    {
      icon: Zap,
      title: t('about.value2.title'),
      description: t('about.value2.description'),
    },
    {
      icon: Award,
      title: t('about.value3.title'),
      description: t('about.value3.description'),
    },
  ];

  const adobePrograms = [
    {
      name: 'Photoshop',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg',
    },
    {
      name: 'Illustrator',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg',
    },
    {
      name: 'InDesign',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {t('about.title')}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              {t('about.intro1')}
            </p>
            <p className="text-lg text-gray-400 leading-relaxed mb-6">
              {t('about.intro2')}
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              {t('about.intro3')}
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12">
            <h3 className="text-2xl font-bold mb-8">{t('about.skills')}</h3>
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-white">{skill.name}</span>
                    <span className="text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">{t('about.values.title')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 hover:scale-105 hover:bg-white/10 hover:border-white/20 transition-all text-center"
              >
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="text-white" size={28} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-4">{t('about.programs.title')}</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            {t('about.programs.subtitle')}
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {adobePrograms.map((program) => (
              <div
                key={program.name}
                className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 hover:scale-105 hover:bg-white/10 hover:border-white/20 transition-all text-center"
              >
                <img
                  src={program.icon}
                  alt={program.name}
                  className="w-20 h-20 mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-white">{program.name}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('about.cta.title')}</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            {t('about.cta.description')}
          </p>
          <a
            href="mailto:dominik@ndes1gn.com"
            className="inline-block px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-all hover:scale-105"
          >
            dominik@ndes1gn.com
          </a>
        </div>
      </div>
    </div>
  );
}
