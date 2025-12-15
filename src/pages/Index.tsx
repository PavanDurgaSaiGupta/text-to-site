import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AuthPage } from '@/components/auth/AuthPage';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { Navigation } from '@/components/navigation/Navigation';
import { Dashboard } from './Dashboard';
import { HeroWorkout } from './HeroWorkout';
import { DietPlanner } from './DietPlanner';
import { AICoach } from './AICoach';
import { BattleArena } from './BattleArena';
import { Community } from './Community';
import { GlobalChatbot } from '@/components/features/GlobalChatbot';
import { BecomeYourHero } from './BecomeYourHero';

const Index = () => {
  const { user, loading, signOut } = useAuth();
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xl font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  // Auth Check
  if (!user) {
    return <AuthPage />;
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
        onLogout={signOut}
      />

      <main className="relative z-10 pt-36 px-4 sm:px-6 lg:px-8 flex flex-col items-center min-h-[80vh] pb-20">
        {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
        {activeTab === 'heroes' && <HeroWorkout />}
        {activeTab === 'coach' && <AICoach />}
        {activeTab === 'diet' && <DietPlanner />}
        {activeTab === 'arena' && <BattleArena />}
        {activeTab === 'becomehero' && <BecomeYourHero />}
        {activeTab === 'community' && <Community />}
      </main>

      <GlobalChatbot />
    </div>
  );
};

export default Index;
