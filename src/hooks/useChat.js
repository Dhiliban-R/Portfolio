<<<<<<< HEAD
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
=======
import { useState, useRef, useCallback } from 'react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
const SESSION_ID = crypto.randomUUID();

// Local fallback knowledge
const FALLBACK = {
    skills: "He's skilled in: C, Java, Python, JavaScript, React.js, AI/ML, SQL. Pretty stacked! 💪",
    projects: "He's built:\n• Food Donation Platform — connects donors with NGOs\n• Hotel Management System — Java/JavaFX",
    certifications: "Certified in:\n• Forage — Software Engineering\n• Scalar — DSA Mastery\n• GUVI — Python & AI",
    contact: "You can reach Dhiliban via the Contact section on this portfolio.",
    default: "Hmm, I'm not sure about that. Try asking about Dhiliban's skills, projects, or certifications! 🤔",
    hello: "Hey there! 👋 I'm Arthur, Dhiliban's AI buddy. Ask me anything about him!",
};

function getLocalReply(input) {
    const q = input.toLowerCase();
    if (/skill|tech|stack|language/i.test(q)) return FALLBACK.skills;
    if (/project|built|work/i.test(q)) return FALLBACK.projects;
    if (/cert/i.test(q)) return FALLBACK.certifications;
    if (/contact|reach|email/i.test(q)) return FALLBACK.contact;
    if (/hello|hi|hey|sup/i.test(q)) return FALLBACK.hello;
    return FALLBACK.default;
}

/**
 * useChat — manages streaming chat with the Arthur backend.
 *
 * Returns:
 *   messages       — array of { id, from, text, time }
 *   leadInfo       — { name, email, phone }
 *   leadStage      — idle | askName | askEmail | askPhone | done | declined
 *   isStreaming     — true while a response is being streamed in
 *   sentiment      — 'positive' | 'negative' | 'neutral'
 *   sendMessage(text) — send a user message
 */
export function useChat() {
    const [messages, setMessages] = useState([
        {
            id: 0,
            from: 'bot',
            text: "Hey! I'm Arthur 😎 — Dhiliban's personal AI buddy. Got questions about him? Fire away! 🔥",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
    ]);

    const [leadInfo, setLeadInfo] = useState({});
    const [leadStage, setLeadStage] = useState('idle');
    const [isStreaming, setIsStreaming] = useState(false);
    const [sentiment, setSentiment] = useState('neutral');

    // Ref for accumulating streamed text into the latest bot message
    const streamBuffer = useRef('');

    const sendMessage = useCallback(async (text) => {
        const userMsg = text.trim();
        if (!userMsg || isStreaming) return;

        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Add user message
        const userMsgObj = { id: Date.now(), from: 'user', text: userMsg, time: now };
        setMessages((prev) => [...prev, userMsgObj]);

        // Client-side sentiment flash
        const lower = userMsg.toLowerCase();
        if (/wow|cool|awesome|amazing/i.test(lower)) {
            setSentiment('positive');
        }

        setIsStreaming(true);
        streamBuffer.current = '';

        // Create placeholder bot message for streaming
        const botId = Date.now() + 1;
        const botMsgObj = { id: botId, from: 'bot', text: '', time: '' };
        setMessages((prev) => [...prev, botMsgObj]);

        try {
            const response = await fetch(`${BACKEND_URL}/api/chat/stream`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg, sessionId: SESSION_ID }),
            });

            if (!response.ok) throw new Error('Backend error');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || ''; // Keep incomplete line in buffer

                for (const line of lines) {
                    if (!line.startsWith('data: ')) continue;
                    const jsonStr = line.slice(6).trim();
                    if (!jsonStr) continue;

                    try {
                        const event = JSON.parse(jsonStr);

                        switch (event.type) {
                            case 'chunk':
                                streamBuffer.current += event.content;
                                setMessages((prev) =>
                                    prev.map((m) =>
                                        m.id === botId
                                            ? { ...m, text: streamBuffer.current, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
                                            : m
                                    )
                                );
                                break;

                            case 'lead':
                                if (event.leadInfo) setLeadInfo(event.leadInfo);
                                if (event.leadStage) setLeadStage(event.leadStage);
                                break;

                            case 'sentiment':
                                setSentiment(event.value);
                                break;

                            case 'error':
                                streamBuffer.current = event.message;
                                setMessages((prev) =>
                                    prev.map((m) =>
                                        m.id === botId
                                            ? { ...m, text: event.message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
                                            : m
                                    )
                                );
                                break;

                            case 'done':
                                break;
                        }
                    } catch {
                        // Skip unparseable lines
                    }
                }
            }
        } catch {
            // Fallback to local reply
            const reply = getLocalReply(userMsg);
            setMessages((prev) =>
                prev.map((m) =>
                    m.id === botId
                        ? { ...m, text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
                        : m
                )
            );
        }

        setIsStreaming(false);
    }, [isStreaming]);

    return { messages, leadInfo, leadStage, isStreaming, sentiment, sendMessage };
}
>>>>>>> d1e5d6de0499b1145bc1811f366b5315801d1d3c
