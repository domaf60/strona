import { useState } from 'react';
import { ChevronRight, Send } from 'lucide-react';

interface BriefProps {
  projectToken?: string;
  onSubmit?: (data: any) => void;
}

export function Brief({ projectToken, onSubmit }: BriefProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    projectType: '',
    projectGoal: '',
    targetAudience: '',
    budget: '',
    deadline: '',
    features: '',
    design: '',
    examples: '',
    additional: '',
  });

  const steps = [
    {
      title: 'Typ projektu',
      question: 'Jaki typ projektu potrzebujesz?',
      field: 'projectType',
      type: 'select',
      options: [
        'Strona wizytówka',
        'Sklep internetowy',
        'Aplikacja webowa',
        'Landing page',
        'Blog / Portfolio',
        'Inne',
      ],
    },
    {
      title: 'Cel projektu',
      question: 'Jaki jest główny cel Twojego projektu?',
      field: 'projectGoal',
      type: 'textarea',
      placeholder: 'Opisz, co chcesz osiągnąć...',
    },
    {
      title: 'Grupa docelowa',
      question: 'Kto jest Twoją grupą docelową?',
      field: 'targetAudience',
      type: 'textarea',
      placeholder: 'Opisz swoich odbiorców...',
    },
    {
      title: 'Budżet',
      question: 'Jaki jest Twój przewidywany budżet?',
      field: 'budget',
      type: 'select',
      options: ['< 5000 PLN', '5000 - 10000 PLN', '10000 - 20000 PLN', '> 20000 PLN', 'Do ustalenia'],
    },
    {
      title: 'Termin',
      question: 'Jaki masz preferowany termin realizacji?',
      field: 'deadline',
      type: 'select',
      options: ['Jak najszybciej', '1 miesiąc', '2-3 miesiące', 'Elastyczny termin'],
    },
    {
      title: 'Funkcjonalności',
      question: 'Jakie funkcjonalności musi mieć projekt?',
      field: 'features',
      type: 'textarea',
      placeholder: 'Wymień potrzebne funkcje...',
    },
    {
      title: 'Styl wizualny',
      question: 'Jaki styl designu preferujesz?',
      field: 'design',
      type: 'textarea',
      placeholder: 'Opisz swoje preferencje wizualne...',
    },
    {
      title: 'Przykłady',
      question: 'Czy masz przykłady stron/projektów, które Ci się podobają?',
      field: 'examples',
      type: 'textarea',
      placeholder: 'Wklej linki lub opisz...',
    },
    {
      title: 'Dodatkowe informacje',
      question: 'Czy jest coś jeszcze, co powinniśmy wiedzieć?',
      field: 'additional',
      type: 'textarea',
      placeholder: 'Dodatkowe uwagi...',
    },
  ];

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Brief projektowy
          </h1>
          <p className="text-gray-600">
            Odpowiedz na kilka pytań, abyśmy mogli lepiej zrozumieć Twoje potrzeby
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Krok {currentStep + 1} z {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-gray-900 to-gray-700 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentStepData.title}</h2>
          <p className="text-gray-600 mb-6">{currentStepData.question}</p>

          {currentStepData.type === 'select' ? (
            <select
              value={formData[currentStepData.field as keyof typeof formData]}
              onChange={(e) => updateField(currentStepData.field, e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
            >
              <option value="">Wybierz opcję...</option>
              {currentStepData.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <textarea
              value={formData[currentStepData.field as keyof typeof formData]}
              onChange={(e) => updateField(currentStepData.field, e.target.value)}
              placeholder={currentStepData.placeholder}
              rows={6}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all resize-none"
            />
          )}
        </div>

        <div className="flex gap-4">
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-6 py-3 bg-white border border-gray-200 text-gray-900 rounded-lg font-medium hover:border-gray-900 transition-all hover:scale-105"
            >
              Wstecz
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!formData[currentStepData.field as keyof typeof formData]}
            className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {currentStep === steps.length - 1 ? (
              <>
                <Send size={20} />
                Wyślij brief
              </>
            ) : (
              <>
                Dalej
                <ChevronRight size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
