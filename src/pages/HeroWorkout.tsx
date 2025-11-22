import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAIChat } from '@/hooks/useAIChat';

const heroPersonas = [
  { id: 'goku', name: 'Saiyan Strength', icon: '🐉', color: '#ff9900', prompt: "Yo! I'm Goku. We're training to surpass our limits today. Let's hit 100x gravity!", style: 'High Volume / Explosive' },
  { id: 'batman', name: 'Dark Knight Protocol', icon: '🦇', color: '#333333', prompt: "I am Batman. Precision. Tactical strength. No wasted movement.", style: 'Functional / Combat' },
  { id: 'goggins', name: 'Stay Hard', icon: '💪', color: '#4b5563', prompt: "They don't know me son! We are running until your legs fall off. callous your mind!", style: 'Endurance / Mental' },
  { id: 'saitama', name: 'One Punch', icon: '👊', color: '#ef4444', prompt: "100 Pushups. 100 Situps. 100 Squats. 10km Run. Every single day.", style: 'Calisthenics' },
];

export const HeroWorkout = () => {
  const [selectedHero, setSelectedHero] = useState<typeof heroPersonas[0] | null>(null);
  const [chatLog, setChatLog] = useState<Array<{ sender: string; text: string }>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const { streamChat, isStreaming } = useAIChat();

  const handleHeroSelect = (hero: typeof heroPersonas[0]) => {
    setSelectedHero(hero);
    setChatLog([{ sender: 'ai', text: hero.prompt }]);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isStreaming) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');

    // Add user message to chat
    const newUserMessage = { sender: 'user', text: userMessage };
    setChatLog(prev => [...prev, newUserMessage]);

    // Create messages for AI
    const messages = [
      ...chatLog.map(msg => ({
        role: (msg.sender === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: msg.text,
      })),
      { role: 'user' as const, content: userMessage },
    ];

    // Stream AI response
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
        onDone: () => {},
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
          {heroPersonas.map((hero, i) => (
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
            <Button
              onClick={() => {
                setSelectedHero(null);
                setChatLog([]);
              }}
              variant="destructive"
              className="font-black underline hover:scale-105 text-xl border-4 border-border"
            >
              END SESSION
            </Button>
          </div>

          {/* Chat Log */}
          <div className="flex-1 overflow-y-auto space-y-6 mb-6 pr-4">
            {chatLog.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slideUp`}>
                <div
                  className={`max-w-[80%] p-6 font-black text-xl border-4 border-border ${
                    msg.sender === 'user'
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
      )}
    </div>
  );
};
