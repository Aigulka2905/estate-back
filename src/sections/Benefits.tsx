import { useEffect, useRef } from 'react';
import { Clock, Target, TrendingUp, Shield, Users, Sparkles } from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: 'Экономия времени',
    description: 'До 70% времени на рутинных задачах. Агенты работают за вас, пока вы занимаетесь клиентами.',
    stat: '70%'
  },
  {
    icon: Target,
    title: 'Точность',
    description: 'ИИ не упускает детали. Каждый запрос обрабатывается с максимальной внимательностью.',
    stat: '99%'
  },
  {
    icon: TrendingUp,
    title: 'Масштабирование',
    description: 'Больше клиентов без найма. Один агент заменяет несколько сотрудников.',
    stat: '3x'
  },
  {
    icon: Shield,
    title: 'Контроль',
    description: 'Все ответы из вашей базы знаний. Нет случайной информации — только проверенные данные.',
    stat: '100%'
  },
  {
    icon: Users,
    title: 'Клиентский опыт',
    description: 'Мгновенные ответы в любое время. Клиенты получают информацию без ожидания.',
    stat: '24/7'
  },
  {
    icon: Sparkles,
    title: 'Премиум-качество',
    description: 'Профессиональные тексты и фото. Ваши объявления выделяются на фоне конкурентов.',
    stat: 'A+'
  }
];

const Benefits = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.benefit-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fade-in-up');
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#6804ab] rounded-full opacity-10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#8729ff] rounded-full opacity-10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Преимущества для <span className="text-gradient">агентства</span>
          </h2>
          <p className="text-lg text-[#adadb5] max-w-xl mx-auto">
            Почему агентства выбирают ИИ-агентов
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="benefit-card opacity-0 group relative p-6 rounded-2xl bg-[#1a0a23]/80 border border-[#6804ab]/30 backdrop-blur-sm hover:border-[#8729ff]/50 transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Stat Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-purple text-white text-sm font-bold">
                  {benefit.stat}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#050009] border border-[#6804ab]/30 flex items-center justify-center mb-4 group-hover:border-[#8729ff]/50 transition-colors">
                  <Icon className="w-6 h-6 text-[#8729ff]" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gradient transition-all">
                  {benefit.title}
                </h3>
                <p className="text-[#adadb5] text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#6804ab]/20 to-[#8729ff]/20 border border-[#6804ab]/30">
            <div className="text-left">
              <p className="text-white font-semibold">Готовы автоматизировать агентство?</p>
              <p className="text-sm text-[#adadb5]">Протестируйте агентов бесплатно</p>
            </div>
            <button
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 rounded-xl bg-gradient-purple text-white font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Начать тестирование
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
