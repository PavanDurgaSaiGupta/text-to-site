import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAIChat } from '@/hooks/useAIChat';

interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export const GlobalChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'assistant', content: 'SYSTEM ONLINE. I am FitNimbus AI. How can I assist your training today?' }
    ]);
    const [input, setInput] = useState('');
    const { streamChat, isStreaming } = useAIChat();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isStreaming) return;

        const userMessage: ChatMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        // Add placeholder for AI response
        setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

        await streamChat({
            messages: [...messages, userMessage],
            onDelta: (delta) => {
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMsg = newMessages[newMessages.length - 1];
                    if (lastMsg.role === 'assistant') {
                        lastMsg.content += delta;
                    }
                    return newMessages;
                });
            },
            onDone: () => {
                // Optional: Any cleanup after chat is done
            }
        });
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-mono">
            {/* Toggle Button */}
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="w-16 h-16 rounded-full border-4 border-border bg-primary text-primary-foreground shadow-brutal hover:shadow-brutal-hover hover:-translate-y-1 transition-all animate-popIn"
                >
                    <MessageSquare className="w-8 h-8" />
                </Button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="w-[350px] sm:w-[400px] h-[500px] bg-card border-4 border-border shadow-brutal flex flex-col animate-slideUp">
                    {/* Header */}
                    <div className="p-4 border-b-4 border-border bg-accent text-accent-foreground flex justify-between items-center">
                        <div className="flex items-center gap-2 font-black uppercase tracking-wider">
                            <Bot className="w-6 h-6" />
                            FitNimbus AI
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-black/10 text-accent-foreground"
                        >
                            <X className="w-6 h-6" />
                        </Button>
                    </div>

                    {/* Messages */}
                    <ScrollArea className="flex-1 p-4 bg-background" ref={scrollRef}>
                        <div className="space-y-4">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 border-2 border-border font-bold text-sm ${msg.role === 'user'
                                                ? 'bg-primary text-primary-foreground rounded-tl-xl rounded-bl-xl rounded-br-xl'
                                                : 'bg-muted text-muted-foreground rounded-tr-xl rounded-br-xl rounded-bl-xl'
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isStreaming && (
                                <div className="flex justify-start">
                                    <div className="bg-muted text-muted-foreground p-2 rounded-lg text-xs font-mono animate-pulse">
                                        ANALYZING...
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                    {/* Input */}
                    <form onSubmit={handleSend} className="p-4 border-t-4 border-border bg-card flex gap-2">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter command..."
                            className="border-2 border-border font-bold focus-visible:ring-0"
                            disabled={isStreaming}
                        />
                        <Button
                            type="submit"
                            size="icon"
                            disabled={isStreaming || !input.trim()}
                            className="border-2 border-border bg-secondary text-secondary-foreground hover:opacity-90"
                        >
                            <Send className="w-4 h-4" />
                        </Button>
                    </form>
                </div>
            )}
        </div>
    );
};
