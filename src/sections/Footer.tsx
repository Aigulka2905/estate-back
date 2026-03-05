import { Bot, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-[#6804ab]/30">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#6804ab] rounded-full opacity-5 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main CTA */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Готовы <span className="text-gradient">автоматизировать</span> агентство?
          </h2>
          <p className="text-lg text-[#adadb5] max-w-xl mx-auto mb-8">
            Протестируйте ИИ-агентов прямо сейчас. Без регистрации и обязательств.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-xl bg-gradient-purple text-white font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 glow-purple"
            >
              Протестировать агентов
            </button>
            <a
              href="mailto:info@ai-agents.estate"
              className="px-8 py-4 rounded-xl border border-[#6804ab]/50 text-white font-semibold hover:bg-[#1a0a23] transition-all duration-300"
            >
              Связаться с нами
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#6804ab]/50 to-transparent mb-12" />

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-purple flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">ИИ-Агенты</span>
            </div>
            <p className="text-[#adadb5] mb-6 max-w-sm">
              Платформа ИИ-агентов для агентств недвижимости. 
              Автоматизируем рутину, повышаем продажи.
            </p>
            <div className="flex items-center gap-2 text-sm text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Все агенты online
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Разделы</h4>
            <ul className="space-y-3">
              {[
                { label: 'Агенты', href: '#agents' },
                { label: 'Демо', href: '#demo' },
                { label: 'Как работает', href: '#how-it-works' },
                { label: 'Преимущества', href: '#benefits' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#adadb5] hover:text-[#8729ff] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-[#adadb5]">
                <Mail className="w-4 h-4 text-[#8729ff]" />
                <a href="mailto:info@ai-agents.estate" className="hover:text-white transition-colors">
                  info@ai-agents.estate
                </a>
              </li>
              <li className="flex items-center gap-2 text-[#adadb5]">
                <Phone className="w-4 h-4 text-[#8729ff]" />
                <a href="tel:+79991234567" className="hover:text-white transition-colors">
                  +7 (927) 300-34-02
                </a>
              </li>
              <li className="flex items-start gap-2 text-[#adadb5]">
                <MapPin className="w-4 h-4 text-[#8729ff] mt-0.5" />
                <span>Уфа, Менделеева, 130</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#6804ab]/20">
          <p className="text-sm text-[#adadb5]">
            © 2026 ИИ-Агенты для Недвижимости. Все права защищены.
          </p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-[#adadb5] hover:text-[#8729ff] transition-colors"
          >
            Наверх
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
