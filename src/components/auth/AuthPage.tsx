import { useState } from 'react';
import { Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AISkeletonDemo } from '@/components/features/AISkeletonDemo';

interface AuthPageProps {
  onLogin: () => void;
}

export const AuthPage = ({ onLogin }: AuthPageProps) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-grid" />

      <div className="w-full max-w-5xl h-[650px] bg-card flex overflow-hidden relative shadow-brutal border-4 border-border animate-popIn">
        {/* Form Section */}
        <div className={`w-full md:w-1/2 p-12 flex flex-col justify-center transition-all duration-500 ${isLogin ? 'order-1' : 'order-2'}`}>
          <div className="mb-8">
            <Activity className="w-16 h-16 mb-4 text-accent animate-slideUp" />
            <h2 className="text-5xl font-display mb-2 animate-slideUp delay-100">
              {isLogin ? 'Welcome Back' : 'Join Corps'}
            </h2>
            <p className="text-muted-foreground font-bold animate-slideUp delay-200">
              Enter your credentials to access the mainframe.
            </p>
          </div>

          <div className="space-y-4 animate-slideUp delay-300">
            <Input
              type="email"
              placeholder="Email Address"
              className="w-full p-4 bg-input border-4 border-border font-bold"
            />
            <Input
              type="password"
              placeholder="Password"
              className="w-full p-4 bg-input border-4 border-border font-bold"
            />
            <Button
              onClick={onLogin}
              className="w-full py-6 bg-accent text-accent-foreground font-black text-xl uppercase tracking-widest hover:scale-[1.02] transition-all shadow-brutal border-4 border-border"
            >
              {isLogin ? 'Log In' : 'Sign Up'}
            </Button>
          </div>

          <div className="mt-6 text-center animate-slideUp delay-400">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-black underline text-lg hover:text-accent transition-colors"
            >
              {isLogin ? 'Create Account ->' : '<- Back to Login'}
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className={`hidden md:flex w-1/2 items-center justify-center p-12 relative overflow-hidden transition-all duration-500 ${isLogin ? 'order-2' : 'order-1'} bg-primary`}>
          <div className="absolute inset-0 opacity-10 bg-grid" />
          <AISkeletonDemo />
        </div>
      </div>
    </div>
  );
};
