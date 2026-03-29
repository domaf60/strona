import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Database } from '../lib/database.types';

type Review = Database['public']['Tables']['reviews']['Row'];

export function Reviews() {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setReviews(data);
    }
    setLoading(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={20}
        className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Ładowanie...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {t('reviews.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('reviews.subtitle')}
          </p>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600">{t('reviews.empty')}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-8 hover:scale-105 transition-all hover:shadow-xl"
              >
                <Quote className="text-gray-300 mb-4" size={40} />
                <div className="flex gap-1 mb-4">{renderStars(review.rating)}</div>
                <p className="text-gray-700 leading-relaxed mb-6">{review.review_text}</p>
                <div className="border-t border-gray-200 pt-4">
                  <div className="font-bold text-gray-900">{review.client_name}</div>
                  {review.client_company && (
                    <div className="text-sm text-gray-600">{review.client_company}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-700 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">{t('reviews.cta.title')}</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('reviews.cta.subtitle')}
          </p>
          <button className="px-8 py-4 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-100 transition-all hover:scale-105">
            {t('reviews.cta.button')}
          </button>
        </div>
      </div>
    </div>
  );
}
