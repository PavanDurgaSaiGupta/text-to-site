import { useState, useEffect } from 'react';
import { Send, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAIChat } from '@/hooks/useAIChat';

interface HeroPersona {
  id: string;
  name: string;
  icon: string;
  color: string;
  prompt: string;
  style: string;
  workoutPlan?: string;
}

const defaultHeroPersonas: HeroPersona[] = [
  {
    id: 'goku',
    name: 'Saiyan Strength',
    icon: '🐉',
    color: '#ff9900',
    prompt: "Yo! I'm Goku. We're training to surpass our limits today. Let's hit 100x gravity!",
    style: 'High Volume / Explosive',
    workoutPlan: `WORKOUT PLAN:
• Warm-up: 10 min dynamic stretching
• Power Squats: 5 sets x 8 reps
• Explosive Push-ups: 4 sets x 15 reps
• Box Jumps: 4 sets x 12 reps
• Deadlifts: 5 sets x 6 reps
• Burpees: 3 sets x 20 reps
• Cool-down: 10 min stretching

PHILOSOPHY: Push beyond your limits every session!`
  },
  {
    id: 'batman',
    name: 'Dark Knight Protocol',
    icon: '🦇',
    color: '#333333',
    prompt: "I am Batman. Precision. Tactical strength. No wasted movement.",
    style: 'Functional / Combat',
    workoutPlan: `WORKOUT PLAN:
• Warm-up: Shadow boxing 5 min
• Pull-ups: 4 sets x 10 reps
• Tactical Push-ups: 4 sets x 15 reps
• Kettlebell Swings: 4 sets x 20 reps
• Plank Variations: 3 sets x 60 sec
• Combat Drills: 15 min
• Cool-down: Mobility work

PHILOSOPHY: Every movement serves a purpose.`
  },
  {
    id: 'goggins',
    name: 'Stay Hard',
    icon: '💪',
    color: '#4b5563',
    prompt: "They don't know me son! We are running until your legs fall off. Callous your mind!",
    style: 'Endurance / Mental',
    workoutPlan: `WORKOUT PLAN:
• 5 mile run (no excuses)
• 100 Push-ups (broken sets)
• 100 Sit-ups (broken sets)
• 100 Air Squats (broken sets)
• 3 mile run
• Plank: 3 min total
• Mental toughness meditation: 10 min

PHILOSOPHY: Embrace the suck. Callous your mind.`
  },
  {
    id: 'saitama',
    name: 'One Punch',
    icon: '👊',
    color: '#ef4444',
    prompt: "100 Pushups. 100 Situps. 100 Squats. 10km Run. Every single day.",
    style: 'Calisthenics',
    workoutPlan: `WORKOUT PLAN:
• 100 Push-ups
• 100 Sit-ups
• 100 Squats
• 10km Run
• NO REST DAYS
• NO AIR CONDITIONING

PHILOSOPHY: Simple. Consistent. Unstoppable.`
  },
];

export const HeroWorkout = () => {
  const [selectedHero, setSelectedHero] = useState<HeroPersona | null>(null);
  const [chatLog, setChatLog] = useState<Array<{ sender: string; text: string }>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [customHeroes, setCustomHeroes] = useState<any[]>([]);
  const [showWorkoutPlan, setShowWorkoutPlan] = useState(false);
  const { streamChat, isStreaming } = useAIChat();

  useEffect(() => {
    // Load custom heroes from localStorage
    const saved = localStorage.getItem('customHeroes');
    if (saved) {
      setCustomHeroes(JSON.parse(saved));
    }
  }, []);

  const allHeroes = [
    ...defaultHeroPersonas,
    ...customHeroes.map((hero: any) => ({
      id: `custom-${hero.id}`,
      name: hero.heroName,
      icon: '⭐',
      color: '#9333ea',
      prompt: `I am ${hero.heroName}. ${hero.description}`,
      style: 'Custom Hero',
      workoutPlan: hero.plan,
    }))
  ];

  const handleHeroSelect = (hero: HeroPersona) => {
    setSelectedHero(hero);
    setChatLog([{ sender: 'ai', text: hero.prompt }]);
    setShowWorkoutPlan(false);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isStreaming) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');

    const newUserMessage = { sender: 'user', text: userMessage };
    setChatLog(prev => [...prev, newUserMessage]);

    const messages = [
      ...chatLog.map(msg => ({
        role: (msg.sender === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: msg.text,
      })),
      { role: 'user' as const, content: userMessage },
    ];

    let assistantMessage = '';
    const updateAssistant = (chunk: string) => {
      assistantMessage += chunk;
      setChatLog(prev => {
        const last = prev[prev.length - 1];
        if (last?.sender === 'ai') {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, text: assistantMessage } : m
          );
        }
        return [...prev, { sender: 'ai', text: assistantMessage }];
      });
    };

    try {
      await streamChat({
        messages,
        onDelta: updateAssistant,
        onDone: () => { },
      });
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 animate-slideUp">
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-8xl font-display mb-4">
          Celebrity <span className="bg-primary text-primary-foreground px-4 inline-block transform skew-x-[-10deg]">Protocol</span>
        </h2>
        <p className="text-2xl max-w-2xl mx-auto font-bold opacity-80">Select your mentor. The AI will adopt their persona.</p>
      </div>

      {!selectedHero ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allHeroes.map((hero, i) => (
            <div
              key={hero.id}
              onClick={() => handleHeroSelect(hero)}
              className="cursor-pointer group relative p-8 border-4 border-border transition-all hover:-translate-y-4 animate-slideUp bg-card shadow-brutal"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">{hero.icon}</div>
              <h3 className="text-3xl font-display mb-2">{hero.name}</h3>
              <span
                className="inline-block px-3 py-1 text-sm font-black text-white uppercase transform -rotate-2"
                style={{ backgroundColor: hero.color }}
              >
                {hero.style}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="border-8 border-border p-8 min-h-[600px] flex flex-col relative animate-popIn bg-card shadow-brutal">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b-4 border-border pb-4">
              <div className="flex items-center gap-6">
                <div className="text-5xl animate-bounce">{selectedHero.icon}</div>
                <div>
                  <h3 className="text-4xl font-black uppercase">{selectedHero.name} AI</h3>
                  <span className="text-sm font-bold uppercase bg-green-400 text-black px-2">Online</span>
                </div>
              </div>
              <div className="flex gap-4">
                {selectedHero.workoutPlan && (
                  <Button
                    onClick={() => setShowWorkoutPlan(!showWorkoutPlan)}
                    className="font-black uppercase border-4 border-border bg-secondary text-secondary-foreground"
                  >
                    <Dumbbell className="w-5 h-5 mr-2" />
                    {showWorkoutPlan ? 'Hide' : 'Show'} Plan
                  </Button>
                )}
                <Button
                  onClick={() => {
                    setSelectedHero(null);
                    setChatLog([]);
                    setShowWorkoutPlan(false);
                  }}
                  variant="destructive"
                  className="font-black underline hover:scale-105 text-xl border-4 border-border"
                >
                  END SESSION
                </Button>
              </div>
            </div>

            {/* Chat Log */}
            <div className="flex-1 overflow-y-auto space-y-6 mb-6 pr-4">
              {chatLog.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slideUp`}>
                  <div
                    className={`max-w-[80%] p-6 font-black text-xl border-4 border-border ${msg.sender === 'user'
                        ? 'bg-accent text-accent-foreground transform rotate-1'
                        : 'bg-secondary text-secondary-foreground transform -rotate-1'
                      }`}
                    style={{ boxShadow: '6px 6px 0 0 rgba(0,0,0,0.2)' }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-4 mt-auto">
              <Input
                placeholder="Type your response..."
                className="flex-1 p-6 border-4 border-border font-black text-xl bg-card"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && sendMessage()}
                disabled={isStreaming}
              />
              <Button
                onClick={sendMessage}
                disabled={isStreaming || !inputMessage.trim()}
                className="px-8 font-black bg-accent text-accent-foreground uppercase text-xl hover:scale-105 transition-transform border-4 border-border"
              >
                {isStreaming ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Send className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Workout Plan Display */}
          {showWorkoutPlan && selectedHero.workoutPlan && (
            <Card className="p-8 border-4 border-border bg-card shadow-brutal animate-slideUp">
              <h3 className="text-3xl font-black uppercase mb-6 flex items-center gap-2">
                <Dumbbell className="w-8 h-8 text-accent" />
                {selectedHero.name} Workout Plan
              </h3>
              <div className="bg-muted/50 p-6 rounded-lg border-2 border-border">
                <pre className="whitespace-pre-wrap font-mono text-sm font-bold">{selectedHero.workoutPlan}</pre>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
