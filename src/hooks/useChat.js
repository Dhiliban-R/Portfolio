import { useState, useCallback, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const useChat = () => {
  const [messages, setMessages] = useState([
    { id: '1', from: 'bot', text: "Yo! I'm Arthur, Dhiliban's chill best friend. Ask me anything about him! 😎", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [leadInfo, setLeadInfo] = useState({ name: '', email: '', phone: '' });
  const [leadStage, setLeadStage] = useState('none'); // none, askingName, askingEmail, askingPhone, done, declined
  const { setSentiment } = useTheme();

  const msgCountRef = useRef(1);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;

    // 1. Add User Message
    const userMsg = { 
      id: Date.now().toString(), 
      from: 'user', 
      text, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsStreaming(true);

    // 2. Sentiment Check (Local)
    if (text.toLowerCase().includes('wow') || text.toLowerCase().includes('cool') || text.toLowerCase().includes('awesome')) {
      setSentiment('positive');
    }

    // 3. Lead Generation Logic (Local Interception)
    let updatedLeadInfo = { ...leadInfo };
    let nextStage = leadStage;

    if (leadStage === 'askingName') {
      updatedLeadInfo.name = text;
      nextStage = 'askingEmail';
      setLeadInfo(updatedLeadInfo);
      setLeadStage(nextStage);
    } else if (leadStage === 'askingEmail') {
      if (text.toLowerCase().includes('@')) {
        updatedLeadInfo.email = text;
        nextStage = 'askingPhone';
      } else if (text.toLowerCase().includes('no') || text.toLowerCase().includes('skip')) {
        nextStage = 'declined';
      }
      setLeadInfo(updatedLeadInfo);
      setLeadStage(nextStage);
    } else if (leadStage === 'askingPhone') {
      updatedLeadInfo.phone = text;
      nextStage = 'done';
      setLeadInfo(updatedLeadInfo);
      setLeadStage(nextStage);
    } else if (msgCountRef.current >= 3 && leadStage === 'none') {
      nextStage = 'askingName';
      setLeadStage(nextStage);
    }

    msgCountRef.current += 1;

    // 4. Call Backend SSE
    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMsg],
          leadInfo: updatedLeadInfo,
          leadStage: nextStage
        }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      let botMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: botMsgId, from: 'bot', text: '', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);

      let accumulatedContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '');
            if (dataStr === '[DONE]') break;
            
            try {
              const data = JSON.parse(dataStr);
              if (data.error) {
                setMessages(prev => prev.map(m => 
                  m.id === botMsgId ? { ...m, text: "My AI brain isn't connected right now! Add your Groq API Key to .env. 😎" } : m
                ));
                break;
              }
              if (data.content !== undefined) {
                accumulatedContent += data.content;
                setMessages(prev => prev.map(m => 
                  m.id === botMsgId ? { ...m, text: accumulatedContent } : m
                ));
              }
            } catch (e) {
              // Partial JSON or heartbeat
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { id: Date.now().toString(), from: 'bot', text: "My brain hit a snag! Let's try again in a bit. 🧠💨" }]);
    } finally {
      setIsStreaming(false);
    }
  }, [messages, leadInfo, leadStage, setSentiment]);

  return { messages, sendMessage, isStreaming, leadInfo, leadStage };
};
