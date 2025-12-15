import { Zap, Camera, Swords, Utensils } from 'lucide-react';
import { AISkeletonDemo } from '@/components/features/AISkeletonDemo';
import { Button } from '@/components/ui/button';

interface DashboardProps {
  setActiveTab: (tab: string) => void;
}

export const Dashboard = ({ setActiveTab }: DashboardProps) => {
  const quickNavs = [
    { id: 'heroes', label: 'Heroes', icon: Zap, color: '#ff9900' },
    { id: 'coach', label: 'AI Coach', icon: Camera, color: '#ff3333' },
    { id: 'arena', label: 'Arena', icon: Swords, color: '#33cc33' },
    { id: 'diet', label: 'Diet', icon: Utensils, color: '#3399ff' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-24">
      {/* Hero Section */}
      <div className="relative py-24 px-6 md:px-16 border-8 border-border overflow-hidden group hover:shadow-brutal-hover transition-all animate-slideUp bg-card shadow-brutal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-block px-6 py-2 mb-8 bg-primary text-primary-foreground font-black text-lg uppercase tracking-widest transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              v2.0 Release Candidate
            </div>
            <h1 className="text-7xl md:text-8xl font-display leading-[0.8] mb-8 tracking-tighter">
              Fitness <br />
              <span className="text-accent">Reimagined</span>
            </h1>
            <p className="text-2xl max-w-xl mb-12 font-bold opacity-90 leading-relaxed">
              Real-time camera analysis meets retro simplicity. No subscriptions. Just code & gains.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                onClick={() => setActiveTab('coach')}
                className="px-10 py-6 bg-primary text-primary-foreground font-black text-2xl uppercase tracking-widest border-4 border-border hover:scale-105 hover:shadow-brutal transition-all"
              >
                Try AI Camera
              </Button>
            </div>
          </div>
          <div className="w-full h-96 transform rotate-2 hover:rotate-0 transition-transform shadow-brutal">
            <div className="absolute -top-3 -left-3 bg-destructive text-destructive-foreground font-black px-4 py-1 transform -rotate-3 z-30">
              LIVE DEMO
            </div>
            <AISkeletonDemo />
          </div>
        </div>
      </div>

      {/* Command Center */}
      <div className="py-10 animate-slideUp delay-100">
        <h2 className="text-4xl font-display mb-8 text-center flex items-center justify-center gap-4">
          <div className="h-2 flex-1 bg-primary"></div>
          Command Center
          <div className="h-2 flex-1 bg-primary"></div>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
          {quickNavs.map((nav, i) => (
            <button
              key={nav.id}
              onClick={() => setActiveTab(nav.id)}
              className="p-8 border-4 border-border flex flex-col items-center gap-4 hover:scale-105 transition-transform hover:shadow-brutal group bg-card"
            >
              <div
                className="w-20 h-20 rounded-full border-4 border-border flex items-center justify-center group-hover:rotate-12 transition-transform"
                style={{ backgroundColor: nav.color }}
              >
                <nav.icon className="w-10 h-10 text-white" />
              </div>
              <span className="text-2xl font-black uppercase">{nav.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="flex flex-col md:flex-row border-y-8 border-border py-16 gap-12 animate-slideUp delay-200">
        <div className="flex-1">
          <h2 className="text-6xl font-display mb-6 leading-none">
            Paper-Thin Latency.
            <br />
            Heavy Lifting.
          </h2>
          <p className="text-2xl font-bold opacity-90">
            Built on Rust and WebAssembly. FitNimbus runs locally on your device, ensuring privacy and zero lag.
          </p>
        </div>
        <div className="flex-1 flex justify-around items-center text-center">
          <div className="group cursor-pointer">
            <div className="text-8xl font-black group-hover:scale-110 transition-transform text-accent">12ms</div>
            <div className="uppercase font-black text-xl tracking-widest">Inference Time</div>
          </div>
          <div className="group cursor-pointer">
            <div className="text-8xl font-black group-hover:scale-110 transition-transform text-secondary">100%</div>
            <div className="uppercase font-black text-xl tracking-widest">Client Side</div>
          </div>
        </div>
      </div>
    </div>
  );
};
