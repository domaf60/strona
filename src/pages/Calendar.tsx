import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Calendar as CalendarIcon, Clock, CheckCircle } from 'lucide-react';
import type { Database } from '../lib/database.types';

type Event = Database['public']['Tables']['events']['Row'];

interface CalendarProps {
  onNavigate: (page: string) => void;
}

export function Calendar({ onNavigate }: CalendarProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    event_date: '',
    event_time: '',
    type: 'milestone',
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true });

    if (!error && data) {
      setEvents(data);
    }
    setLoading(false);
  };

  const addEvent = async () => {
    const { error } = await supabase.from('events').insert([newEvent]);

    if (!error) {
      setShowAddModal(false);
      setNewEvent({
        title: '',
        description: '',
        event_date: '',
        event_time: '',
        type: 'milestone',
      });
      loadEvents();
    }
  };

  const toggleComplete = async (event: Event) => {
    const { error } = await supabase
      .from('events')
      .update({ completed: !event.completed })
      .eq('id', event.id);

    if (!error) {
      loadEvents();
    }
  };

  const groupEventsByMonth = (events: Event[]) => {
    const grouped: Record<string, Event[]> = {};

    events.forEach((event) => {
      const date = new Date(event.event_date);
      const monthKey = date.toLocaleDateString('pl-PL', { year: 'numeric', month: 'long' });

      if (!grouped[monthKey]) {
        grouped[monthKey] = [];
      }
      grouped[monthKey].push(event);
    });

    return grouped;
  };

  const groupedEvents = groupEventsByMonth(events);

  const eventTypeConfig: Record<string, { label: string; color: string }> = {
    deadline: { label: 'Deadline', color: 'bg-red-100 text-red-700' },
    meeting: { label: 'Spotkanie', color: 'bg-blue-100 text-blue-700' },
    milestone: { label: 'Kamień milowy', color: 'bg-purple-100 text-purple-700' },
    personal: { label: 'Osobiste', color: 'bg-gray-100 text-gray-700' },
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Kalendarz projektów
            </h1>
            <p className="text-gray-600">Zarządzaj terminami i wydarzeniami</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 md:mt-0 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all hover:scale-105 flex items-center gap-2"
          >
            <Plus size={20} />
            Dodaj wydarzenie
          </button>
        </div>

        {Object.keys(groupedEvents).length === 0 ? (
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-12 text-center">
            <CalendarIcon className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-600">Brak zaplanowanych wydarzeń</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedEvents).map(([month, monthEvents]) => (
              <div key={month}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 capitalize">{month}</h2>
                <div className="space-y-3">
                  {monthEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`bg-white/70 backdrop-blur-xl rounded-xl border border-gray-200/50 p-6 hover:scale-[1.02] transition-all ${
                        event.completed ? 'opacity-60' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <button
                              onClick={() => toggleComplete(event)}
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                event.completed
                                  ? 'bg-green-500 border-green-500'
                                  : 'border-gray-300 hover:border-gray-900'
                              }`}
                            >
                              {event.completed && <CheckCircle className="text-white" size={16} />}
                            </button>
                            <h3
                              className={`text-lg font-bold ${
                                event.completed ? 'line-through text-gray-500' : 'text-gray-900'
                              }`}
                            >
                              {event.title}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                eventTypeConfig[event.type]?.color || 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {eventTypeConfig[event.type]?.label || event.type}
                            </span>
                          </div>
                          {event.description && (
                            <p className="text-gray-600 mb-3 ml-9">{event.description}</p>
                          )}
                          <div className="flex items-center gap-4 ml-9 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <CalendarIcon size={16} />
                              {new Date(event.event_date).toLocaleDateString('pl-PL')}
                            </div>
                            {event.event_time && (
                              <div className="flex items-center gap-1">
                                <Clock size={16} />
                                {event.event_time}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Nowe wydarzenie</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tytuł</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                  placeholder="Nazwa wydarzenia"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Opis</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none resize-none"
                  rows={3}
                  placeholder="Szczegóły"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
                  <input
                    type="date"
                    value={newEvent.event_date}
                    onChange={(e) => setNewEvent({ ...newEvent, event_date: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Godzina</label>
                  <input
                    type="time"
                    value={newEvent.event_time}
                    onChange={(e) => setNewEvent({ ...newEvent, event_time: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Typ</label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                >
                  <option value="milestone">Kamień milowy</option>
                  <option value="deadline">Deadline</option>
                  <option value="meeting">Spotkanie</option>
                  <option value="personal">Osobiste</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-all"
              >
                Anuluj
              </button>
              <button
                onClick={addEvent}
                disabled={!newEvent.title || !newEvent.event_date}
                className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Dodaj
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
