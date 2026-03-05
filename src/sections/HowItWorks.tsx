import { useEffect, useRef } from 'react';
import { MousePointer, MessageSquare, Zap } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: MousePointer,
    title: 'Выберите агента',
    description: 'Каждый агент специализируется на своей задаче. Выберите подходящий под вашу текущую потребность.',
    color: 'from-emerald-500 to-emerald-700'
  },
  {
    number: '02',
    icon: MessageSquare,
    title: 'Введите запрос',
    description: 'Текст или голос — агент поймет. Опишите что нужно максимально естественно, как клиенту.',
    color: 'from-blue-500 to-blue-700'
  },
  {
    number: '03',
    icon: Zap,
    title: 'Получите результат',
    description: 'Готовый ответ за секунды. Не нужно ждать — агент работает мгновенно, 24/7.',
    color: 'from-purple-500 to-purple-700'
  }
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.step-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fade-in-up');
              }, index * 150);
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

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#6804ab] rounded-full opacity-10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#3f0864] rounded-full opacity-10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Как это <span className="text-gradient">работает</span>
          </h2>
          <p className="text-lg text-[#adadb5] max-w-xl mx-auto">
            Три простых шага от запроса к результату
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="step-card opacity-0 relative group"
              >
                {/* Connector Line (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-[#6804ab]/50 to-transparent" />
                )}

                <div className="relative p-8 rounded-2xl bg-[#1a0a23]/80 border border-[#6804ab]/30 backdrop-blur-sm hover:border-[#8729ff]/50 transition-all duration-300 hover:scale-[1.02]">
                  {/* Step Number */}
                  <div className={`absolute -top-4 -left-2 w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-[#050009] border border-[#6804ab]/30 flex items-center justify-center mb-6 mt-4 group-hover:border-[#8729ff]/50 transition-colors">
                    <Icon className="w-7 h-7 text-[#8729ff]" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#adadb5] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '< 3 сек', label: 'Время ответа' },
            { value: '24/7', label: 'Доступность' },
            { value: '99.9%', label: 'Точность' },
            { value: '0 ₽', label: 'Стоимость демо' },
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 rounded-xl bg-[#050009]/50 border border-[#6804ab]/20">
              <div className="text-2xl font-bold text-gradient">{stat.value}</div>
              <div className="text-sm text-[#adadb5] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
