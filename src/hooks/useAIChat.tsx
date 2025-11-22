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
      const { data: { session } } = await supabase.auth.getSession();
      
      const resp = await fetch(
        `https://aydbwgcphozgaunmoopu.supabase.co/functions/v1/ai-chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token || ''}`,
          },
          body: JSON.stringify({ messages, model }),
        }
      );

      if (!resp.ok) {
        const errorData = await resp.json();
        if (resp.status === 429) {
          toast({
            title: 'Rate Limit Exceeded',
            description: 'Please wait a moment before trying again.',
            variant: 'destructive',
          });
        } else if (resp.status === 402) {
          toast({
            title: 'Payment Required',
            description: 'Please add credits to your workspace.',
            variant: 'destructive',
          });
        } else {
          throw new Error(errorData.error || 'Failed to start stream');
        }
        setIsStreaming(false);
        return;
      }

      if (!resp.body) throw new Error('No response body');

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) onDelta(content);
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split('\n')) {
          if (!raw) continue;
          if (raw.endsWith('\r')) raw = raw.slice(0, -1);
          if (raw.startsWith(':') || raw.trim() === '') continue;
          if (!raw.startsWith('data: ')) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === '[DONE]') continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) onDelta(content);
          } catch {
            /* ignore partial leftovers */
          }
        }
      }

      onDone();
    } catch (error: any) {
      console.error('Stream chat error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to stream chat',
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
