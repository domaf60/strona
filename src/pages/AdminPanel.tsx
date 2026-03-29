import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Search, FileText, Calendar, Star, Mail } from 'lucide-react';
import type { Database } from '../lib/database.types';

type Project = Database['public']['Tables']['projects']['Row'];

interface AdminPanelProps {
  onNavigate: (page: string) => void;
}

export function AdminPanel({ onNavigate }: AdminPanelProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProjects(data);
    }
    setLoading(false);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client_email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      icon: FileText,
      label: 'Wszystkie projekty',
      value: projects.length,
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Calendar,
      label: 'W trakcie',
      value: projects.filter((p) => p.status === 'in_progress').length,
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Star,
      label: 'Ukończone',
      value: projects.filter((p) => p.status === 'completed').length,
      color: 'from-green-500 to-green-600',
    },
  ];

  const statusConfig: Record<string, { label: string; color: string }> = {
    briefing: { label: 'Briefing', color: 'bg-blue-100 text-blue-700' },
    in_progress: { label: 'W trakcie', color: 'bg-orange-100 text-orange-700' },
    review: { label: 'Do weryfikacji', color: 'bg-purple-100 text-purple-700' },
    completed: { label: 'Ukończony', color: 'bg-green-100 text-green-700' },
    cancelled: { label: 'Anulowany', color: 'bg-red-100 text-red-700' },
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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Panel zarządzania
            </h1>
            <p className="text-gray-600">Zarządzaj projektami i klientami</p>
          </div>
          <button
            onClick={() => onNavigate('new-project')}
            className="mt-4 md:mt-0 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all hover:scale-105 flex items-center gap-2"
          >
            <Plus size={20} />
            Nowy projekt
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6 hover:scale-105 transition-all"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4`}
              >
                <stat.icon className="text-white" size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Szukaj po nazwie lub emailu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
            >
              <option value="all">Wszystkie statusy</option>
              <option value="briefing">Briefing</option>
              <option value="in_progress">W trakcie</option>
              <option value="review">Do weryfikacji</option>
              <option value="completed">Ukończone</option>
              <option value="cancelled">Anulowane</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredProjects.length === 0 ? (
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-12 text-center">
              <p className="text-gray-600">Brak projektów do wyświetlenia</p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6 hover:border-gray-300 transition-all hover:scale-[1.02] cursor-pointer"
                onClick={() => onNavigate(`project-${project.id}`)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{project.client_name}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          statusConfig[project.status]?.color || 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {statusConfig[project.status]?.label || project.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail size={16} />
                      {project.client_email}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(project.created_at).toLocaleDateString('pl-PL')}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
