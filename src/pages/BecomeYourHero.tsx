import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Sparkles, Save, Loader2 } from 'lucide-react';
import { useAIChat } from '@/hooks/useAIChat';
import { useToast } from '@/hooks/use-toast';

interface WorkoutPlan {
    heroName: string;
    description: string;
    plan: string;
}

export const BecomeYourHero = () => {
    const [heroDescription, setHeroDescription] = useState('');
    const [generatedPlan, setGeneratedPlan] = useState<WorkoutPlan | null>(null);
    const { streamChat, isStreaming } = useAIChat();
    const { toast } = useToast();

    const generateWorkoutPlan = async () => {
        if (!heroDescription.trim()) {
            toast({
                title: 'Error',
                description: 'Please describe your hero first',
                variant: 'destructive',
            });
            return;
        }

        setGeneratedPlan(null);
        let fullResponse = '';

        const prompt = `Based on this hero description: "${heroDescription}"
    
Create a detailed workout plan that matches this hero's characteristics. Format your response EXACTLY like this:

HERO NAME: [A cool name based on the description]

HERO PROFILE:
[2-3 sentences describing the hero's traits and abilities]

WORKOUT PLAN:
[Detailed workout routine with specific exercises, sets, and reps that match the hero's style]

TRAINING PHILOSOPHY:
[1-2 sentences about the mindset and approach]`;

        await streamChat({
            messages: [{ role: 'user', content: prompt }],
            onDelta: (delta) => {
                fullResponse += delta;
            },
            onDone: () => {
                // Parse the response
                const lines = fullResponse.split('\n');
                const heroNameMatch = fullResponse.match(/HERO NAME:\s*(.+)/i);
                const heroName = heroNameMatch ? heroNameMatch[1].trim() : 'Custom Hero';

                setGeneratedPlan({
                    heroName,
                    description: heroDescription,
                    plan: fullResponse,
                });
            },
        });
    };

    const saveToHeroes = () => {
        if (!generatedPlan) return;

        // Save to localStorage
        const savedHeroes = JSON.parse(localStorage.getItem('customHeroes') || '[]');
        savedHeroes.push({
            ...generatedPlan,
            id: Date.now(),
            createdAt: new Date().toISOString(),
        });
        localStorage.setItem('customHeroes', JSON.stringify(savedHeroes));

        toast({
            title: 'Hero Saved!',
            description: `${generatedPlan.heroName} has been added to your Heroes section.`,
        });
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-6 space-y-8 animate-slideUp">
            <div className="text-center mb-12">
                <h1 className="text-6xl md:text-8xl font-display mb-4">
                    Become Your <span className="bg-accent text-accent-foreground px-4 inline-block transform skew-x-[-10deg]">HERO</span>
                </h1>
                <p className="text-2xl font-bold opacity-80">Describe your ideal hero and get a personalized workout plan</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <Card className="p-8 border-4 border-border bg-card shadow-brutal">
                    <h2 className="text-3xl font-black uppercase mb-6 flex items-center gap-2">
                        <Sparkles className="w-8 h-8 text-accent" />
                        Describe Your Hero
                    </h2>
                    <Textarea
                        value={heroDescription}
                        onChange={(e) => setHeroDescription(e.target.value)}
                        placeholder="Example: A hero with superhuman speed and agility, inspired by The Flash. Focuses on explosive power and endurance..."
                        className="min-h-[300px] border-4 border-border font-bold text-lg resize-none"
                        disabled={isStreaming}
                    />
                    <Button
                        onClick={generateWorkoutPlan}
                        disabled={isStreaming || !heroDescription.trim()}
                        className="w-full mt-6 py-6 bg-accent text-accent-foreground font-black text-xl uppercase tracking-widest hover:scale-[1.02] transition-all shadow-brutal border-4 border-border"
                    >
                        {isStreaming ? (
                            <>
                                <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-6 h-6 mr-2" />
                                Generate Workout Plan
                            </>
                        )}
                    </Button>
                </Card>

                {/* Output Section */}
                <Card className="p-8 border-4 border-border bg-card shadow-brutal">
                    <h2 className="text-3xl font-black uppercase mb-6">Your Hero's Plan</h2>
                    {!generatedPlan && !isStreaming && (
                        <div className="h-[400px] flex items-center justify-center border-4 border-dashed border-muted-foreground/20 rounded-lg">
                            <p className="text-xl font-bold text-muted-foreground text-center px-8">
                                Your personalized workout plan will appear here
                            </p>
                        </div>
                    )}
                    {isStreaming && (
                        <div className="h-[400px] flex items-center justify-center">
                            <div className="text-center">
                                <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4 text-accent" />
                                <p className="text-xl font-black uppercase">Analyzing...</p>
                            </div>
                        </div>
                    )}
                    {generatedPlan && !isStreaming && (
                        <div className="space-y-6">
                            <div className="bg-muted/50 p-6 rounded-lg border-2 border-border max-h-[400px] overflow-y-auto">
                                <pre className="whitespace-pre-wrap font-mono text-sm font-bold">{generatedPlan.plan}</pre>
                            </div>
                            <Button
                                onClick={saveToHeroes}
                                className="w-full py-4 bg-primary text-primary-foreground font-black text-lg uppercase tracking-widest hover:scale-[1.02] transition-all border-4 border-border"
                            >
                                <Save className="w-5 h-5 mr-2" />
                                Save to My Heroes
                            </Button>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};
