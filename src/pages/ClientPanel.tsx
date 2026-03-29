import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { FileText, Download, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Database } from '../lib/database.types';

type Project = Database['public']['Tables']['projects']['Row'];

interface ClientPanelProps {
  token: string;
}

export function ClientPanel({ token }: ClientPanelProps) {
  const { t } = useLanguage();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProject();
  }, [token]);

  const loadProject = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('token', token)
      .maybeSingle();

    if (error || !data) {
      setError('Nie znaleziono projektu');
    } else {
      setProject(data);
    }
    setLoading(false);
  };

  const statusConfig: Record<string, { label: string; icon: any; color: string }> = {
    briefing: {
      label: t('client.status.briefing'),
      icon: FileText,
      color: 'text-blue-600',
    },
    in_progress: {
      label: t('client.status.inProgress'),
      icon: Clock,
      color: 'text-orange-600',
    },
    review: {
      label: t('client.status.review'),
      icon: AlertCircle,
      color: 'text-purple-600',
    },
    completed: {
      label: t('client.status.completed'),
      icon: CheckCircle,
      color: 'text-green-600',
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-red-200 p-8 max-w-md">
          <AlertCircle className="text-red-600 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">{t('client.error')}</h2>
          <p className="text-gray-600 text-center">{t('client.notFound')}</p>
        </div>
      </div>
    );
  }

  const status = statusConfig[project.status] || statusConfig.briefing;
  const StatusIcon = status.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {t('client.hello')}, {project.client_name}!
          </h1>
          <div className="flex items-center justify-center gap-2 text-lg">
            <StatusIcon className={status.color} size={24} />
            <span className={`font-medium ${status.color}`}>{status.label}</span>
          </div>
        </div>

        <div className="space-y-6">
          {project.deposit_invoice_url && (
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">{t('client.depositInvoice')}</h3>
              <a
                href={project.deposit_invoice_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all hover:scale-105"
              >
                <Download size={20} />
                {t('client.downloadInvoice')}
              </a>
            </div>
          )}

          {project.preview_url && (
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">{t('client.preview.title')}</h3>
              <p className="text-gray-600 mb-4">
                {t('client.preview.description')}
              </p>
              <a
                href={project.preview_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all hover:scale-105"
              >
                {t('client.preview.button')}
              </a>
            </div>
          )}

          {project.final_files_url && (
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">{t('client.finalFiles.title')}</h3>
              <p className="text-gray-600 mb-4">
                {t('client.finalFiles.description')}
              </p>
              <a
                href={project.final_files_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all hover:scale-105"
              >
                <Download size={20} />
                {t('client.finalFiles.button')}
              </a>
            </div>
          )}

          {project.final_invoice_url && (
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">{t('client.finalInvoice')}</h3>
              <a
                href={project.final_invoice_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all hover:scale-105"
              >
                <Download size={20} />
                {t('client.downloadInvoice')}
              </a>
            </div>
          )}

          {project.status === 'briefing' && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-2">{t('client.nextStep.title')}</h3>
              <p className="text-blue-700">
                {t('client.nextStep.description')}
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-2">{t('client.questions')}</p>
          <a
            href={`mailto:dominik@ndes1gn.com?subject=Projekt: ${project.client_name}`}
            className="text-gray-900 font-medium hover:underline"
          >
            dominik@ndes1gn.com
          </a>
        </div>
      </div>
    </div>
  );
}
