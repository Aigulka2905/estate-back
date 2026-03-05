import AIAgentChat from '@/components/AIAgentChat';

export default function DemoInterface() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black to-purple-950/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gradient">
          Попробуй ИИ-агентов прямо сейчас
        </h2>

        <AIAgentChat />
      </div>
    </section>
  );
}