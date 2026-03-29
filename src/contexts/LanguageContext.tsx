import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pl' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  pl: {
    // Navbar
    'nav.home': 'Start',
    'nav.portfolio': 'Portfolio',
    'nav.about': 'O mnie',
    'nav.contact': 'Kontakt',
    'nav.reviews': 'Recenzje',
    'nav.login': 'Zaloguj',

    // Home
    'home.hero.title': 'Tworzę Cyfrowe',
    'home.hero.experiences': 'Doświadczenia',
    'home.hero.subtitle': 'Przekształcam pomysły w wyjątkowe produkty cyfrowe przez design i technologię',
    'home.hero.available': 'Dostępny do nowych projektów',
    'home.hero.startProject': 'Rozpocznij projekt',
    'home.hero.viewWork': 'Zobacz projekty',

    // Services
    'services.title': 'Usługi',
    'services.subtitle': 'Kompleksowe rozwiązania dla Twoich potrzeb cyfrowych',
    'services.webdev.title': 'Web Development',
    'services.webdev.description': 'Nowoczesne, responsywne strony zbudowane z najnowszymi technologiami.',
    'services.webdev.feature1': 'React & TypeScript',
    'services.webdev.feature2': 'Rozwiązania na zamówienie',
    'services.webdev.feature3': 'Zoptymalizowana wydajność',
    'services.design.title': 'UI/UX Design',
    'services.design.description': 'Piękne, intuicyjne interfejsy, które użytkownicy uwielbiają.',
    'services.design.feature1': 'Design zorientowany na użytkownika',
    'services.design.feature2': 'Prototypowanie',
    'services.design.feature3': 'Identyfikacja wizualna',
    'services.strategy.title': 'Strategia Cyfrowa',
    'services.strategy.description': 'Strategiczne rozwiązania, które przynoszą realne rezultaty biznesowe.',
    'services.strategy.feature1': 'Doradztwo',
    'services.strategy.feature2': 'Strategia wzrostu',
    'services.strategy.feature3': 'Analityka',

    // Work
    'work.title': 'Wybrane prace',
    'work.subtitle': 'Wybrane projekty, które pokazują moje podejście',
    'work.project': 'Projekt',
    'work.viewCase': 'Zobacz studium przypadku',

    // Contact
    'contact.title': 'Współpracujmy',
    'contact.subtitle': 'Masz projekt w głowie? Stwórzmy coś niesamowitego',
    'contact.success': 'Dziękuję! Odpiszę najszybciej jak to możliwe.',
    'contact.name': 'Imię',
    'contact.namePlaceholder': 'Twoje imię',
    'contact.email': 'Email',
    'contact.emailPlaceholder': 'twoj@email.com',
    'contact.budget': 'Budżet',
    'contact.budgetSelect': 'Wybierz budżet',
    'contact.budgetLess5': '< 5 000 zł',
    'contact.budget5to10': '5 000 - 10 000 zł',
    'contact.budget10to25': '10 000 - 25 000 zł',
    'contact.budget25plus': '25 000 zł+',
    'contact.description': 'Opis projektu',
    'contact.descriptionPlaceholder': 'Opowiedz mi o swoim projekcie...',
    'contact.sending': 'Wysyłanie...',
    'contact.send': 'Wyślij wiadomość',

    // Footer
    'footer.rights': 'Wszelkie prawa zastrzeżone.',

    // Reviews page
    'reviews.title': 'Recenzje klientów',
    'reviews.subtitle': 'Zobacz, co mówią o mnie klienci, z którymi miałem przyjemność współpracować',
    'reviews.empty': 'Brak opublikowanych recenzji',
    'reviews.cta.title': 'Dołącz do zadowolonych klientów',
    'reviews.cta.subtitle': 'Rozpocznij współpracę już dziś i przekonaj się, dlaczego klienci polecają moje usługi',
    'reviews.cta.button': 'Skontaktuj się',

    // Portfolio page
    'portfolio.title': 'Portfolio',
    'portfolio.subtitle': 'Wybrane projekty, które pokazują moją pracę',

    // About page
    'about.title': 'O mnie',
    'about.subtitle': 'Poznaj mnie lepiej',

    // Contact page
    'contactPage.title': 'Skontaktuj się',
    'contactPage.subtitle': 'Masz pytania? Chcesz omówić projekt? Napisz do mnie!',
    'contactPage.email': 'Email',
    'contactPage.preferDirect': 'Preferujesz bezpośredni kontakt? Wyślij wiadomość na mój adres email, a odpowiem w ciągu 24 godzin.',
    'contactPage.whyWork.title': 'Dlaczego warto ze mną pracować?',
    'contactPage.whyWork.1': 'Indywidualne podejście do każdego projektu',
    'contactPage.whyWork.2': 'Regularna komunikacja i transparentność',
    'contactPage.whyWork.3': 'Najnowsze technologie i best practices',
    'contactPage.whyWork.4': 'Wsparcie po wdrożeniu projektu',
    'contactPage.formTitle': 'Formularz kontaktowy',
    'contactPage.name': 'Imię',
    'contactPage.namePlaceholder': 'Twoje imię',
    'contactPage.message': 'Wiadomość',
    'contactPage.messagePlaceholder': 'Opisz swój projekt...',
    'contactPage.successTitle': 'Wiadomość wysłana!',
    'contactPage.successMessage': 'Dziękuję za kontakt. Odpowiem na Twoją wiadomość najszybciej jak to możliwe.',
    'contactPage.sendAnother': 'Wyślij kolejną wiadomość',

    // Client Panel
    'client.hello': 'Cześć',
    'client.status.briefing': 'Wypełnianie briefu',
    'client.status.inProgress': 'Projekt w realizacji',
    'client.status.review': 'Oczekuje na Twoją weryfikację',
    'client.status.completed': 'Projekt ukończony',
    'client.depositInvoice': 'Faktura zaliczkowa',
    'client.downloadInvoice': 'Pobierz fakturę',
    'client.preview.title': 'Podgląd projektu',
    'client.preview.description': 'Twój projekt jest gotowy do weryfikacji. Sprawdź podgląd i daj nam znać, jeśli potrzebujesz jakichś zmian.',
    'client.preview.button': 'Zobacz podgląd',
    'client.finalFiles.title': 'Pliki końcowe',
    'client.finalFiles.description': 'Twój projekt jest ukończony! Możesz pobrać wszystkie pliki końcowe.',
    'client.finalFiles.button': 'Pobierz pliki',
    'client.finalInvoice': 'Faktura końcowa',
    'client.nextStep.title': 'Następny krok',
    'client.nextStep.description': 'Wypełnij brief projektowy, abyśmy mogli lepiej zrozumieć Twoje potrzeby i rozpocząć pracę nad projektem.',
    'client.questions': 'Masz pytania?',
    'client.error': 'Błąd',
    'client.notFound': 'Nie znaleziono projektu',

    // Calendar
    'calendar.title': 'Kalendarz projektów',
    'calendar.subtitle': 'Zarządzaj terminami i wydarzeniami',
    'calendar.addEvent': 'Dodaj wydarzenie',
    'calendar.empty': 'Brak zaplanowanych wydarzeń',
    'calendar.loading': 'Ładowanie...',
    'calendar.newEvent': 'Nowe wydarzenie',
    'calendar.eventTitle': 'Tytuł',
    'calendar.eventTitlePlaceholder': 'Nazwa wydarzenia',
    'calendar.eventDescription': 'Opis',
    'calendar.eventDescriptionPlaceholder': 'Szczegóły',
    'calendar.eventDate': 'Data',
    'calendar.eventTime': 'Godzina',
    'calendar.eventType': 'Typ',
    'calendar.type.milestone': 'Kamień milowy',
    'calendar.type.deadline': 'Deadline',
    'calendar.type.meeting': 'Spotkanie',
    'calendar.type.personal': 'Osobiste',
    'calendar.cancel': 'Anuluj',
    'calendar.add': 'Dodaj',

    // Brief
    'brief.title': 'Brief projektowy',
    'brief.subtitle': 'Odpowiedz na kilka pytań, abyśmy mogli lepiej zrozumieć Twoje potrzeby',
    'brief.step': 'Krok',
    'brief.of': 'z',
    'brief.back': 'Wstecz',
    'brief.next': 'Dalej',
    'brief.send': 'Wyślij brief',
    'brief.selectOption': 'Wybierz opcję...',
    'brief.step1.title': 'Typ projektu',
    'brief.step1.question': 'Jaki typ projektu potrzebujesz?',
    'brief.step1.opt1': 'Strona wizytówka',
    'brief.step1.opt2': 'Sklep internetowy',
    'brief.step1.opt3': 'Aplikacja webowa',
    'brief.step1.opt4': 'Landing page',
    'brief.step1.opt5': 'Blog / Portfolio',
    'brief.step1.opt6': 'Inne',
    'brief.step2.title': 'Cel projektu',
    'brief.step2.question': 'Jaki jest główny cel Twojego projektu?',
    'brief.step2.placeholder': 'Opisz, co chcesz osiągnąć...',
    'brief.step3.title': 'Grupa docelowa',
    'brief.step3.question': 'Kto jest Twoją grupą docelową?',
    'brief.step3.placeholder': 'Opisz swoich odbiorców...',
    'brief.step4.title': 'Budżet',
    'brief.step4.question': 'Jaki jest Twój przewidywany budżet?',
    'brief.step4.opt1': '< 5000 PLN',
    'brief.step4.opt2': '5000 - 10000 PLN',
    'brief.step4.opt3': '10000 - 20000 PLN',
    'brief.step4.opt4': '> 20000 PLN',
    'brief.step4.opt5': 'Do ustalenia',
    'brief.step5.title': 'Termin',
    'brief.step5.question': 'Jaki masz preferowany termin realizacji?',
    'brief.step5.opt1': 'Jak najszybciej',
    'brief.step5.opt2': '1 miesiąc',
    'brief.step5.opt3': '2-3 miesiące',
    'brief.step5.opt4': 'Elastyczny termin',
    'brief.step6.title': 'Funkcjonalności',
    'brief.step6.question': 'Jakie funkcjonalności musi mieć projekt?',
    'brief.step6.placeholder': 'Wymień potrzebne funkcje...',
    'brief.step7.title': 'Styl wizualny',
    'brief.step7.question': 'Jaki styl designu preferujesz?',
    'brief.step7.placeholder': 'Opisz swoje preferencje wizualne...',
    'brief.step8.title': 'Przykłady',
    'brief.step8.question': 'Czy masz przykłady stron/projektów, które Ci się podobają?',
    'brief.step8.placeholder': 'Wklej linki lub opisz...',
    'brief.step9.title': 'Dodatkowe informacje',
    'brief.step9.question': 'Czy jest coś jeszcze, co powinniśmy wiedzieć?',
    'brief.step9.placeholder': 'Dodatkowe uwagi...',

    // Login
    'login.title': 'Panel admina',
    'login.subtitle': 'Zaloguj się do panelu zarządzania',
    'login.email': 'Email',
    'login.emailPlaceholder': 'twoj@email.com',
    'login.password': 'Hasło',
    'login.passwordPlaceholder': '••••••••',
    'login.submit': 'Zaloguj się',
    'login.submitting': 'Logowanie...',
    'login.backToHome': 'Powrót do strony głównej',
    'login.error': 'Nieprawidłowy email lub hasło',

    // About - Adobe section
    'about.programs.title': 'Programy z których korzystam',
    'about.programs.subtitle': 'Profesjonalne narzędzia Adobe, które wykorzystuję w pracy',
    'about.intro1': 'Jestem deweloperem i designerem z pasją do tworzenia wyjątkowych doświadczeń cyfrowych. Od kilku lat pomagam firmom i przedsiębiorcom realizować ich wizje w formie pięknych, funkcjonalnych aplikacji webowych.',
    'about.intro2': 'Specjalizuję się w nowoczesnych technologiach frontend takich jak React i TypeScript, a także w projektowaniu interfejsów użytkownika, które są intuicyjne i przyjemne w użyciu.',
    'about.intro3': 'Każdy projekt traktuję indywidualnie, dbając o to, aby finalny produkt nie tylko spełniał wymagania techniczne, ale też zachwycał swoim wyglądem i funkcjonalnością.',
    'about.skills': 'Umiejętności',
    'about.values.title': 'Moje wartości',
    'about.value1.title': 'Design pierwszej klasy',
    'about.value1.description': 'Dbam o każdy piksel, tworząc estetyczne interfejsy',
    'about.value2.title': 'Wydajność',
    'about.value2.description': 'Optymalizuję każdy aspekt dla najlepszej wydajności',
    'about.value3.title': 'Jakość',
    'about.value3.description': 'Dostarczam projekty, z których mogę być dumny',
    'about.cta.title': 'Pracujmy razem',
    'about.cta.description': 'Jeśli masz projekt, który chciałbyś zrealizować, lub po prostu chcesz porozmawiać o możliwościach współpracy, skontaktuj się ze mną.',

    // Portfolio page details
    'portfolio.category.ecommerce': 'Sklep internetowy',
    'portfolio.category.webapp': 'Aplikacja webowa',
    'portfolio.category.business': 'Strona wizytówka',
    'portfolio.category.landing': 'Landing page',
    'portfolio.category.mobile': 'Aplikacja mobilna',
    'portfolio.category.cms': 'CMS',
    'portfolio.project1.description': 'Nowoczesny sklep internetowy z systemem płatności i zarządzaniem produktami',
    'portfolio.project2.description': 'Panel administracyjny dla platformy SaaS z analityką i raportami',
    'portfolio.project3.description': 'Eleganckie portfolio dla agencji kreatywnej z animacjami',
    'portfolio.project4.description': 'System rezerwacji stolików dla restauracji z kalendarzem',
    'portfolio.project5.description': 'Aplikacja do śledzenia treningów i postępów',
    'portfolio.project6.description': 'Platforma blogowa z edytorem treści i zarządzaniem użytkownikami',
    'portfolio.startProject': 'Rozpocznij projekt',
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.portfolio': 'Portfolio',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.reviews': 'Reviews',
    'nav.login': 'Login',

    // Home
    'home.hero.title': 'Crafting Digital',
    'home.hero.experiences': 'Experiences',
    'home.hero.subtitle': 'Transforming ideas into exceptional digital products through design and technology',
    'home.hero.available': 'Available for new projects',
    'home.hero.startProject': 'Start a Project',
    'home.hero.viewWork': 'View Work',

    // Services
    'services.title': 'Services',
    'services.subtitle': 'End-to-end solutions for your digital needs',
    'services.webdev.title': 'Web Development',
    'services.webdev.description': 'Modern, responsive websites built with cutting-edge technologies.',
    'services.webdev.feature1': 'React & TypeScript',
    'services.webdev.feature2': 'Custom Solutions',
    'services.webdev.feature3': 'Performance Optimized',
    'services.design.title': 'UI/UX Design',
    'services.design.description': 'Beautiful, intuitive interfaces that users love.',
    'services.design.feature1': 'User-Centered Design',
    'services.design.feature2': 'Prototyping',
    'services.design.feature3': 'Brand Identity',
    'services.strategy.title': 'Digital Strategy',
    'services.strategy.description': 'Strategic solutions that drive real business results.',
    'services.strategy.feature1': 'Consulting',
    'services.strategy.feature2': 'Growth Strategy',
    'services.strategy.feature3': 'Analytics',

    // Work
    'work.title': 'Featured Work',
    'work.subtitle': 'Selected projects that showcase my approach',
    'work.project': 'Project',
    'work.viewCase': 'View Case Study',

    // Contact
    'contact.title': "Let's Work Together",
    'contact.subtitle': "Have a project in mind? Let's create something amazing",
    'contact.success': "Thank you! I'll get back to you soon.",
    'contact.name': 'Name',
    'contact.namePlaceholder': 'Your name',
    'contact.email': 'Email',
    'contact.emailPlaceholder': 'your@email.com',
    'contact.budget': 'Budget Range',
    'contact.budgetSelect': 'Select budget',
    'contact.budgetLess5': '< $5,000',
    'contact.budget5to10': '$5,000 - $10,000',
    'contact.budget10to25': '$10,000 - $25,000',
    'contact.budget25plus': '$25,000+',
    'contact.description': 'Project Description',
    'contact.descriptionPlaceholder': 'Tell me about your project...',
    'contact.sending': 'Sending...',
    'contact.send': 'Send Message',

    // Footer
    'footer.rights': 'All rights reserved.',

    // Reviews page
    'reviews.title': 'Client Reviews',
    'reviews.subtitle': 'See what clients I had the pleasure to work with are saying',
    'reviews.empty': 'No published reviews yet',
    'reviews.cta.title': 'Join Happy Clients',
    'reviews.cta.subtitle': 'Start working together today and see why clients recommend my services',
    'reviews.cta.button': 'Get in touch',

    // Portfolio page
    'portfolio.title': 'Portfolio',
    'portfolio.subtitle': 'Selected projects showcasing my work',

    // About page
    'about.title': 'About Me',
    'about.subtitle': 'Get to know me better',

    // Contact page
    'contactPage.title': 'Get in Touch',
    'contactPage.subtitle': 'Have questions? Want to discuss a project? Write to me!',
    'contactPage.email': 'Email',
    'contactPage.preferDirect': 'Prefer direct contact? Send a message to my email address, and I will respond within 24 hours.',
    'contactPage.whyWork.title': 'Why work with me?',
    'contactPage.whyWork.1': 'Individual approach to each project',
    'contactPage.whyWork.2': 'Regular communication and transparency',
    'contactPage.whyWork.3': 'Latest technologies and best practices',
    'contactPage.whyWork.4': 'Post-launch support',
    'contactPage.formTitle': 'Contact Form',
    'contactPage.name': 'Name',
    'contactPage.namePlaceholder': 'Your name',
    'contactPage.message': 'Message',
    'contactPage.messagePlaceholder': 'Describe your project...',
    'contactPage.successTitle': 'Message sent!',
    'contactPage.successMessage': 'Thank you for contacting me. I will reply to your message as soon as possible.',
    'contactPage.sendAnother': 'Send another message',

    // Client Panel
    'client.hello': 'Hello',
    'client.status.briefing': 'Filling out brief',
    'client.status.inProgress': 'Project in progress',
    'client.status.review': 'Awaiting your review',
    'client.status.completed': 'Project completed',
    'client.depositInvoice': 'Deposit Invoice',
    'client.downloadInvoice': 'Download Invoice',
    'client.preview.title': 'Project Preview',
    'client.preview.description': 'Your project is ready for review. Check the preview and let us know if you need any changes.',
    'client.preview.button': 'View Preview',
    'client.finalFiles.title': 'Final Files',
    'client.finalFiles.description': 'Your project is complete! You can download all final files.',
    'client.finalFiles.button': 'Download Files',
    'client.finalInvoice': 'Final Invoice',
    'client.nextStep.title': 'Next Step',
    'client.nextStep.description': 'Fill out the project brief so we can better understand your needs and start working on the project.',
    'client.questions': 'Have questions?',
    'client.error': 'Error',
    'client.notFound': 'Project not found',

    // Calendar
    'calendar.title': 'Project Calendar',
    'calendar.subtitle': 'Manage deadlines and events',
    'calendar.addEvent': 'Add Event',
    'calendar.empty': 'No scheduled events',
    'calendar.loading': 'Loading...',
    'calendar.newEvent': 'New Event',
    'calendar.eventTitle': 'Title',
    'calendar.eventTitlePlaceholder': 'Event name',
    'calendar.eventDescription': 'Description',
    'calendar.eventDescriptionPlaceholder': 'Details',
    'calendar.eventDate': 'Date',
    'calendar.eventTime': 'Time',
    'calendar.eventType': 'Type',
    'calendar.type.milestone': 'Milestone',
    'calendar.type.deadline': 'Deadline',
    'calendar.type.meeting': 'Meeting',
    'calendar.type.personal': 'Personal',
    'calendar.cancel': 'Cancel',
    'calendar.add': 'Add',

    // Brief
    'brief.title': 'Project Brief',
    'brief.subtitle': 'Answer a few questions so we can better understand your needs',
    'brief.step': 'Step',
    'brief.of': 'of',
    'brief.back': 'Back',
    'brief.next': 'Next',
    'brief.send': 'Send Brief',
    'brief.selectOption': 'Select option...',
    'brief.step1.title': 'Project Type',
    'brief.step1.question': 'What type of project do you need?',
    'brief.step1.opt1': 'Business Website',
    'brief.step1.opt2': 'E-commerce Store',
    'brief.step1.opt3': 'Web Application',
    'brief.step1.opt4': 'Landing Page',
    'brief.step1.opt5': 'Blog / Portfolio',
    'brief.step1.opt6': 'Other',
    'brief.step2.title': 'Project Goal',
    'brief.step2.question': 'What is the main goal of your project?',
    'brief.step2.placeholder': 'Describe what you want to achieve...',
    'brief.step3.title': 'Target Audience',
    'brief.step3.question': 'Who is your target audience?',
    'brief.step3.placeholder': 'Describe your audience...',
    'brief.step4.title': 'Budget',
    'brief.step4.question': 'What is your estimated budget?',
    'brief.step4.opt1': '< $1,500',
    'brief.step4.opt2': '$1,500 - $3,000',
    'brief.step4.opt3': '$3,000 - $6,000',
    'brief.step4.opt4': '> $6,000',
    'brief.step4.opt5': 'To be determined',
    'brief.step5.title': 'Timeline',
    'brief.step5.question': 'What is your preferred timeline?',
    'brief.step5.opt1': 'As soon as possible',
    'brief.step5.opt2': '1 month',
    'brief.step5.opt3': '2-3 months',
    'brief.step5.opt4': 'Flexible timeline',
    'brief.step6.title': 'Features',
    'brief.step6.question': 'What features must the project have?',
    'brief.step6.placeholder': 'List needed features...',
    'brief.step7.title': 'Visual Style',
    'brief.step7.question': 'What design style do you prefer?',
    'brief.step7.placeholder': 'Describe your visual preferences...',
    'brief.step8.title': 'Examples',
    'brief.step8.question': 'Do you have examples of sites/projects you like?',
    'brief.step8.placeholder': 'Paste links or describe...',
    'brief.step9.title': 'Additional Information',
    'brief.step9.question': 'Is there anything else we should know?',
    'brief.step9.placeholder': 'Additional notes...',

    // Login
    'login.title': 'Admin Panel',
    'login.subtitle': 'Log in to management panel',
    'login.email': 'Email',
    'login.emailPlaceholder': 'your@email.com',
    'login.password': 'Password',
    'login.passwordPlaceholder': '••••••••',
    'login.submit': 'Log In',
    'login.submitting': 'Logging in...',
    'login.backToHome': 'Back to homepage',
    'login.error': 'Invalid email or password',

    // About - Adobe section
    'about.programs.title': 'Programs I Use',
    'about.programs.subtitle': 'Professional Adobe tools I use in my work',
    'about.intro1': 'I am a developer and designer passionate about creating exceptional digital experiences. For several years, I have been helping companies and entrepreneurs realize their visions in the form of beautiful, functional web applications.',
    'about.intro2': 'I specialize in modern frontend technologies such as React and TypeScript, as well as designing user interfaces that are intuitive and pleasant to use.',
    'about.intro3': 'I treat each project individually, making sure that the final product not only meets technical requirements but also delights with its appearance and functionality.',
    'about.skills': 'Skills',
    'about.values.title': 'My Values',
    'about.value1.title': 'First-Class Design',
    'about.value1.description': 'I care about every pixel, creating aesthetic interfaces',
    'about.value2.title': 'Performance',
    'about.value2.description': 'I optimize every aspect for the best performance',
    'about.value3.title': 'Quality',
    'about.value3.description': 'I deliver projects I can be proud of',
    'about.cta.title': "Let's Work Together",
    'about.cta.description': 'If you have a project you would like to realize, or just want to talk about collaboration opportunities, contact me.',

    // Portfolio page details
    'portfolio.category.ecommerce': 'E-commerce Store',
    'portfolio.category.webapp': 'Web Application',
    'portfolio.category.business': 'Business Website',
    'portfolio.category.landing': 'Landing Page',
    'portfolio.category.mobile': 'Mobile App',
    'portfolio.category.cms': 'CMS',
    'portfolio.project1.description': 'Modern e-commerce store with payment system and product management',
    'portfolio.project2.description': 'Admin panel for SaaS platform with analytics and reports',
    'portfolio.project3.description': 'Elegant portfolio for creative agency with animations',
    'portfolio.project4.description': 'Restaurant table booking system with calendar',
    'portfolio.project5.description': 'App for tracking workouts and progress',
    'portfolio.project6.description': 'Blog platform with content editor and user management',
    'portfolio.startProject': 'Start a Project',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pl');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.pl] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
