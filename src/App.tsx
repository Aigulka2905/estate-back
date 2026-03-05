import './App.css';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import AgentsGrid from './sections/AgentsGrid';
import DemoInterface from './sections/DemoInterface';
import HowItWorks from './sections/HowItWorks';
import Benefits from './sections/Benefits';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#050009] text-white overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <AgentsGrid />
        <DemoInterface />
        <HowItWorks />
        <Benefits />
      </main>
      <Footer />
    </div>
  );
}

export default App;
