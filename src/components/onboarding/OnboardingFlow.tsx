import { useState } from 'react';
import { RefreshCw, Bot, Stethoscope, Bed, Dumbbell, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    goal: 'Build Muscle (Hypertrophy)',
    diet: 'None (Balanced)',
    experience: 'beginner',
    environment: 'gym',
    injuries: 'none',
    sleep: 7,
  });

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setIsProcessing(true);
      setTimeout(() => {
        onComplete();
      }, 2500);
    }
  };

  const goals = ['Build Muscle (Hypertrophy)', 'Lose Fat (Cut)', 'Improve Endurance', 'Mobility & Health'];
  const diets = ['None (Balanced)', 'Vegan', 'Keto', 'Vegetarian', 'Paleo', 'Gluten Free'];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-grid" />

      <div className="w-full max-w-2xl bg-card p-8 md:p-12 border-4 border-border relative shadow-brutal animate-popIn">
        {/* Progress Bar */}
        <div className="w-full h-4 bg-muted mb-8 border-2 border-border">
          <div
            className="h-full transition-all duration-500 bg-accent"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Step 1: Basics */}
        {step === 1 && (
          <div className="space-y-6 animate-slideUp">
            <h2 className="text-4xl font-display mb-2">Step 1: The Basics</h2>
            <p className="text-muted-foreground font-bold">Let's calibrate the AI to your biometrics.</p>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Name"
                className="p-4 border-4 border-border font-bold"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Age"
                className="p-4 border-4 border-border font-bold"
                value={formData.age}
                onChange={e => setFormData({ ...formData, age: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Weight (kg)"
                className="p-4 border-4 border-border font-bold"
                value={formData.weight}
                onChange={e => setFormData({ ...formData, weight: e.target.value })}
              />
              <select
                className="p-4 border-4 border-border font-bold bg-card"
                value={formData.experience}
                onChange={e => setFormData({ ...formData, experience: e.target.value })}
              >
                <option value="beginner">Beginner (0-1 yrs)</option>
                <option value="intermediate">Intermediate (1-3 yrs)</option>
                <option value="advanced">Advanced (3+ yrs)</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 2: Mission */}
        {step === 2 && (
          <div className="space-y-6 animate-slideUp">
            <h2 className="text-4xl font-display mb-2">Step 2: Your Mission</h2>
            <p className="text-muted-foreground font-bold">What are we optimizing for?</p>
            <div className="grid grid-cols-1 gap-4">
              {goals.map(g => (
                <button
                  key={g}
                  onClick={() => setFormData({ ...formData, goal: g })}
                  className={`p-4 border-4 border-border font-black uppercase text-left hover:scale-[1.02] transition-transform flex justify-between items-center ${
                    formData.goal === g ? 'bg-secondary text-secondary-foreground' : 'bg-card'
                  }`}
                >
                  <span>{g}</span>
                  {formData.goal === g && <span className="text-2xl">✓</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Environment */}
        {step === 3 && (
          <div className="space-y-6 animate-slideUp">
            <h2 className="text-4xl font-display mb-2">Step 3: Environment</h2>
            <p className="text-muted-foreground font-bold">Where will you be training?</p>
            <div className="grid grid-cols-2 gap-6">
              <button
                onClick={() => setFormData({ ...formData, environment: 'gym' })}
                className={`p-8 border-4 border-border flex flex-col items-center justify-center gap-4 hover:scale-105 transition-transform ${
                  formData.environment === 'gym' ? 'bg-primary text-primary-foreground' : 'bg-card'
                }`}
              >
                <Dumbbell className="w-16 h-16" />
                <span className="font-black text-xl uppercase">Commercial Gym</span>
              </button>
              <button
                onClick={() => setFormData({ ...formData, environment: 'home' })}
                className={`p-8 border-4 border-border flex flex-col items-center justify-center gap-4 hover:scale-105 transition-transform ${
                  formData.environment === 'home' ? 'bg-primary text-primary-foreground' : 'bg-card'
                }`}
              >
                <Home className="w-16 h-16" />
                <span className="font-black text-xl uppercase">Home Workout</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Fuel Source */}
        {step === 4 && (
          <div className="space-y-6 animate-slideUp">
            <h2 className="text-4xl font-display mb-2">Step 4: Fuel Source</h2>
            <div className="grid grid-cols-2 gap-4">
              {diets.map(d => (
                <button
                  key={d}
                  onClick={() => setFormData({ ...formData, diet: d })}
                  className={`p-4 border-2 border-border font-bold uppercase hover:scale-[1.05] transition-transform ${
                    formData.diet === d ? 'bg-accent text-accent-foreground' : 'bg-card'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Health Check */}
        {step === 5 && (
          <div className="space-y-6 animate-slideUp">
            <h2 className="text-4xl font-display mb-2">Step 5: Health Check</h2>

            <div>
              <label className="block font-bold uppercase mb-2 text-muted-foreground flex items-center gap-2">
                <Stethoscope className="w-4 h-4" /> Any Injuries?
              </label>
              <Input
                type="text"
                placeholder="e.g., Lower back pain, bad knees (Optional)"
                className="w-full p-4 border-2 border-border font-bold"
                value={formData.injuries}
                onChange={e => setFormData({ ...formData, injuries: e.target.value })}
              />
            </div>

            <div>
              <label className="block font-bold uppercase mb-2 text-muted-foreground flex items-center gap-2">
                <Bed className="w-4 h-4" /> Average Sleep (Hours)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="4"
                  max="12"
                  step="0.5"
                  value={formData.sleep}
                  onChange={e => setFormData({ ...formData, sleep: Number(e.target.value) })}
                  className="w-full h-2 bg-muted appearance-none cursor-pointer"
                  style={{ accentColor: 'hsl(var(--accent))' }}
                />
                <span className="font-black text-2xl w-16">{formData.sleep}h</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Summary */}
        {step === 6 && (
          <div className="text-center py-8 animate-slideUp">
            {isProcessing ? (
              <>
                <RefreshCw className="w-24 h-24 mx-auto mb-6 animate-spin text-accent" />
                <h3 className="text-3xl font-black uppercase mb-2">Compiling Data...</h3>
                <p className="font-mono text-muted-foreground">Structuring neural network weights...</p>
              </>
            ) : (
              <>
                <Bot className="w-20 h-20 mx-auto mb-4" />
                <h3 className="text-3xl font-black uppercase mb-6">Profile Summary</h3>
                <div className="bg-muted p-6 border-2 border-border mb-8 text-left space-y-2">
                  <div className="flex justify-between">
                    <span>GOAL:</span> <span className="font-bold">{formData.goal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DIET:</span> <span className="font-bold">{formData.diet}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ENV:</span>{' '}
                    <span className="font-bold">{formData.environment === 'gym' ? 'Commercial Gym' : 'Home Setup'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SLEEP:</span> <span className="font-bold">{formData.sleep} hrs</span>
                  </div>
                </div>
                <p className="mb-4 font-bold text-muted-foreground">Ready to initialize your AI Coach?</p>
              </>
            )}
          </div>
        )}

        {/* Navigation */}
        {!isProcessing && (
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <Button
                onClick={() => setStep(step - 1)}
                variant="outline"
                className="px-6 py-4 font-bold uppercase border-4 border-border"
              >
                Back
              </Button>
            )}
            <Button
              onClick={nextStep}
              className="flex-1 py-6 bg-primary text-primary-foreground font-black text-xl uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-brutal border-4 border-border"
            >
              {step === totalSteps ? 'Launch FitNimbus' : 'Next ->'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
