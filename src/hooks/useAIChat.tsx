import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const useAIChat = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const { toast } = useToast();

  const streamChat = async ({
    messages,
    onDelta,
    onDone,
    model = 'google/gemini-2.5-flash',
  }: {
    messages: Message[];
    onDelta: (deltaText: string) => void;
    onDone: () => void;
    model?: string;
  }) => {
    setIsStreaming(true);

    try {
      // Direct client-side call to Gemini API (Bypassing Supabase Edge Function for immediate usage)
      const GEMINI_API_KEY = "AIzaSyCbNstztsTx51BMuiAxzuf51OUcsSQIjFQ"; // Note: In production, use environment variables

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: messages.map((msg) => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }]
          })),
          systemInstruction: {
            parts: [{
              text: `You are FitNimbus AI, the central intelligence of the FitNimbus platform. 
Your goal is to assist users with fitness, navigation, and explaining the app's features.
You have access to the following modules:
1. **Dashboard**: The command center for quick navigation.
2. **Heroes**: A workout section where users can choose hero personas (e.g., 'Iron Titan', 'Speedster').
3. **AI Coach**: A real-time camera analysis tool that checks form (Squats, Lunges, Jumping Jacks).
4. **Battle Arena**: A global leaderboard to compete with other users.
5. **Diet Planner**: A tool for nutrition planning.
6. **Community**: An open-source hub for developers.

Keep responses energetic, motivating, and concise. Use the app's brutalist/retro theme in your tone (e.g., 'SYSTEM ONLINE', 'ANALYSIS COMPLETE').
If a user asks about a specific feature, explain how to use it based on the modules above.` }]
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to fetch response from Gemini');
      }

      const data = await response.json();

      // Gemini API returns the full text in the response structure
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (text) {
        // Simulate streaming for UI consistency
        const words = text.split(' ');
        for (const word of words) {
          onDelta(word + ' ');
          await new Promise(resolve => setTimeout(resolve, 20)); // Small delay for typing effect
        }
      }

      onDone();
    } catch (error: any) {
      console.error('Chat error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to get response',
        variant: 'destructive',
      });
    } finally {
      setIsStreaming(false);
    }
  };



  return {
    streamChat,
    isStreaming,
  };
};
