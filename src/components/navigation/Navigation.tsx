import { Activity, Camera, Zap, Swords, Utensils, Code, Menu, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onLogout: () => void;
}

export const Navigation = ({ activeTab, setActiveTab, mobileMenuOpen, setMobileMenuOpen, onLogout }: NavigationProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Activity },
    { id: 'coach', label: 'Coach', icon: Camera },
    { id: 'heroes', label: 'Heroes', icon: Zap },
    { id: 'arena', label: 'Arena', icon: Swords },
    { id: 'diet', label: 'Diet', icon: Utensils },
    { id: 'community', label: 'Code', icon: Code },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b-4 border-border bg-background">
      <div className="w-full h-3 bg-accent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setActiveTab('dashboard')}>
            <div className="w-12 h-12 flex items-center justify-center border-4 border-border font-black text-2xl bg-primary text-primary-foreground group-hover:rotate-12 transition-transform">
              F
            </div>
            <span className="text-3xl font-display tracking-tighter uppercase hidden sm:block">FitNimbus</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-6 py-3 font-black uppercase text-sm tracking-wider border-4 border-border transition-all duration-200 hover:animate-jiggle ${
                  activeTab === item.id
                    ? 'translate-y-1 shadow-none bg-secondary'
                    : 'hover:-translate-y-1 shadow-brutal bg-card'
                }`}
              >
                <span className="flex items-center gap-2">
                  <item.icon className="w-5 h-5" /> {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="border-4 border-border hover:bg-muted"
              title="Switch Theme"
            >
              <Palette className="w-6 h-6" />
            </Button>
            <Button
              onClick={onLogout}
              className="hidden sm:block px-6 py-3 font-black uppercase text-sm border-4 border-border bg-accent text-accent-foreground hover:scale-105 transition-transform"
            >
              Log Out
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-3 border-4 border-border bg-card"
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b-8 border-border absolute w-full z-50 shadow-brutal animate-slideUp bg-background">
          <div className="px-6 pt-6 pb-8 space-y-4">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-6 py-5 border-4 border-border font-black uppercase text-xl flex items-center gap-6 hover:bg-muted bg-card"
              >
                <item.icon className="w-8 h-8 text-accent" />
                {item.label}
              </button>
            ))}
            <Button
              onClick={onLogout}
              className="w-full px-6 py-5 border-4 border-border font-black uppercase text-xl bg-destructive text-destructive-foreground hover:opacity-90"
            >
              Log Out
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};
