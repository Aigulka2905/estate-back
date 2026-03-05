import { useEffect, useRef } from 'react';
import { Search, FileText, Image, BookOpen, Sparkles, Wand2 } from 'lucide-react';

interface AgentCard {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  tag: string;
  tagColor: string;
  features: string[];
}

const agents: AgentCard[] = [
  {
    id: 'search',
    icon: Search,
    title: 'Подбор квартир',
    description: 'Голосовой поиск по базе. Просто скажите требования — агент найдет подходящие варианты.',
    tag: 'Voice-first',
    tagColor: 'bg-emerald-500/20 text-emerald-400',
    features: ['Голосовой ввод', 'Фильтрация по параметрам', 'Сортировка по релевантности']
  },
  {
    id: 'ad',
    icon: FileText,
    title: 'Генерация объявлений',
    description: 'Создает продающие тексты за секунды. Учитывает особенности объекта и целевую аудиторию.',
    tag: 'AI Copywriting',
    tagColor: 'bg-blue-500/20 text-blue-400',
    features: ['Продающие тексты', 'Адаптация под ЦА', 'SEO-оптимизация']
  },
  {
    id: 'photo',
    icon: Image,
    title: 'Обработка фото',
    description: 'Улучшает качество, убирает мусор, виртуально расставляет мебель. Профессиональные фото без фотографа.',
    tag: 'AI Vision',
    tagColor: 'bg-purple-500/20 text-purple-400',
    features: ['Улучшение качества', 'Удаление объектов', 'Виртуальная стaging']
  },
  {
    id: 'qa',
    icon: BookOpen,
    title: 'Ответы на вопросы',
    description: 'Мгновенные ответы по комиссии, документам, ипотеке. Вся база знаний агентства в одном месте.',
    tag: 'Q&A',
    tagColor: 'bg-amber-500/20 text-amber-400',
    features: ['Комиссия и условия', 'Документы', 'Ипотечные программы']
  }
];

const AgentsGrid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.agent-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fade-in-up');
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToDemo = (agentId: string) => {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
      // Set active tab after scroll
      setTimeout(() => {
        const tabButton = document.querySelector(`[data-agent-tab="${agentId}"]`) as HTMLButtonElement;
        if (tabButton) tabButton.click();
      }, 500);
    }
  };

  return (
    <section
      id="agents"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#6804ab] rounded-full opacity-10 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#3f0864] rounded-full opacity-10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Четыре ИИ-агента для вашего <span className="text-gradient">агентства</span>
          </h2>
          <p className="text-lg text-[#adadb5] max-w-2xl mx-auto">
            Каждый агент специализируется на своей задаче. Работают вместе или по отдельности — 
            как вам удобно.
          </p>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agents.map((agent) => {
            const Icon = agent.icon;
            return (
              <div
                key={agent.id}
                className="agent-card opacity-0 group relative p-6 sm:p-8 rounded-2xl bg-[#1a0a23]/80 border border-[#6804ab]/30 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:border-[#8729ff] hover:shadow-[0_0_30px_rgba(104,4,171,0.3)] hover:scale-[1.02]"
                onClick={() => scrollToDemo(agent.id)}
              >
                {/* Status Indicator */}
                <div className="absolute top-6 right-6 flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs text-emerald-400">Online</span>
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-purple flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Tag */}
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${agent.tagColor}`}>
                  {agent.tag}
                </span>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gradient transition-all duration-300">
                  {agent.title}
                </h3>

                {/* Description */}
                <p className="text-[#adadb5] mb-6 leading-relaxed">
                  {agent.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {agent.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-[#050009] border border-[#6804ab]/30 text-sm text-[#dedee1]"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="w-5 h-5 text-[#8729ff]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-[#adadb5] mb-4">
            Хотите увидеть агентов в действии?
          </p>
          <button
            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-[#8729ff] hover:text-white transition-colors duration-300"
          >
            <span className="font-medium">Перейти к демо</span>
            <Wand2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AgentsGrid;
