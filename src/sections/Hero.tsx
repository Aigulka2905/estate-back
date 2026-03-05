import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Bot } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = heroRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6804ab] rounded-full opacity-20 blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#8729ff] rounded-full opacity-15 blur-[100px] animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3f0864] rounded-full opacity-10 blur-[150px]" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(104, 4, 171, 0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(104, 4, 171, 0.5) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="reveal opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a0a23] border border-[#6804ab]/50 mb-8">
          <Bot className="w-4 h-4 text-[#8729ff]" />
          <span className="text-sm text-[#dedee1]">AI-платформа для агентств недвижимости</span>
        </div>

        {/* Main Heading */}
        <h1 className="reveal opacity-0 stagger-1 text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          <span className="text-white">ИИ-Агенты для</span>
          <br />
          <span className="text-gradient">Агентства Недвижимости</span>
        </h1>

        {/* Subtitle */}
        <p className="reveal opacity-0 stagger-2 text-lg sm:text-xl text-[#adadb5] max-w-2xl mx-auto mb-10 leading-relaxed">
          Автоматизируйте рутину. Увеличьте продажи. 
          <br className="hidden sm:block" />
          Сосредоточьтесь на клиентах, а не на бумажной работе.
        </p>

        {/* CTA Buttons */}
        <div className="reveal opacity-0 stagger-3 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={scrollToDemo}
            size="lg"
            className="bg-gradient-purple hover:opacity-90 text-white px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105 glow-purple group"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Протестировать агентов
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="border-[#6804ab]/50 text-white hover:bg-[#1a0a23] px-8 py-6 text-lg rounded-xl transition-all duration-300"
            onClick={() => document.getElementById('agents')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Узнать больше
          </Button>
        </div>

        {/* Stats */}
        <div className="reveal opacity-0 stagger-4 mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: '4', label: 'ИИ-агента' },
            { value: '70%', label: 'Экономия времени' },
            { value: '3x', label: 'Рост продаж' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gradient">{stat.value}</div>
              <div className="text-sm text-[#adadb5] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050009] to-transparent" />
    </section>
  );
};

export default Hero;
