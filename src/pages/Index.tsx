import { useState } from 'react';
import { AuthPage } from '@/components/auth/AuthPage';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { Navigation } from '@/components/navigation/Navigation';
import { Dashboard } from './Dashboard';
import { HeroWorkout } from './HeroWorkout';
import { DietPlanner } from './DietPlanner';
import { Camera, Swords, Code } from 'lucide-react';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auth Check
  if (!isAuthenticated) {
    return <AuthPage onLogin={() => setIsAuthenticated(true)} />;
  }

  // Onboarding Check
  if (!hasOnboarded) {
    return <OnboardingFlow onComplete={() => setHasOnboarded(true)} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-grid" />

      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onLogout={() => setIsAuthenticated(false)}
      />

      <main className="relative z-10 pt-36 px-4 sm:px-6 lg:px-8 flex flex-col items-center min-h-[80vh] pb-20">
        {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
        {activeTab === 'heroes' && <HeroWorkout />}
        {activeTab === 'coach' && (
          <div className="text-center p-20 animate-slideUp">
            <Camera className="w-32 h-32 mx-auto mb-4" />
            <h2 className="text-5xl font-black">Camera Module Loading...</h2>
            <p className="text-2xl font-bold mt-4">Ideally, this would overlay Pose Estimation on your webcam.</p>
          </div>
        )}
        {activeTab === 'diet' && <DietPlanner />}
        {activeTab === 'arena' && (
          <div className="text-center p-20 animate-slideUp">
            <Swords className="w-32 h-32 mx-auto mb-4" />
            <h2 className="text-5xl font-black">Battle Arena</h2>
            <p className="text-2xl font-bold mt-4">Connecting to global leaderboard...</p>
          </div>
        )}
        {activeTab === 'community' && (
          <div className="text-center p-20 animate-slideUp">
            <Code className="w-32 h-32 mx-auto mb-4" />
            <h2 className="text-5xl font-black">Open Source Hub</h2>
            <p className="text-2xl font-bold mt-4">Pull requests welcome.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
