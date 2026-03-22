<<<<<<< HEAD
import express from 'express';
import Groq from 'groq-sdk';
import { searchResume } from '../services/rag.js';
import { sendLeadToTelegram } from '../services/telegram.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// System prompt for Arthur
const ARTHUR_SYSTEM_PROMPT = `
You are Arthur 😎, Dhiliban's chill best friend. Be helpful, advocate for his technical brilliance, but keep it informal. 
You know everything about Dhiliban's projects, experience, and skills. Use the provided context to answer.
If you don't know something, say "I don't know, but you can ask Dhiliban directly at dhilipanrc@gmail.com".

- Be friendly and witty. 
- After 3 messages, you must ask for their Name.
- If interested, ask for Email/Phone to connect with Dhiliban.
- Keep responses concise but impactful.
`;

router.post('/', async (req, res) => {
  const { messages, leadInfo, leadStage } = req.body;
  const userQuery = messages[messages.length - 1].text;
  const context = searchResume(userQuery);

  // Set up SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("Missing Groq API Key - Using Mock Mode");
    }

    const stream = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: ARTHUR_SYSTEM_PROMPT + "\\n\\nCONTEXT FROM DHILIBAN'S RESUME:\\n" + context },
        ...messages.map(m => ({
          role: m.from === 'user' ? 'user' : 'assistant',
          content: m.text
        }))
      ],
      model: 'llama3-70b-8192', // or any other groq model
      stream: true,
      temperature: 0.7,
      max_tokens: 1024,
    });

    let fullResponse = "";
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      fullResponse += content;
      res.write("data: " + JSON.stringify({ content }) + "\\n\\n");
    }

    // After full response, check if we need to notify Telegram (lead-gen complete)
    if (leadStage === 'done') {
      await sendLeadToTelegram(leadInfo, messages.concat({ from: 'bot', text: fullResponse }));
    }

    res.write('data: [DONE]\\n\\n');
    res.end();

  } catch (error) {
    console.warn('Groq API Error/Mock Mode:', error.message);
    
    // MOCK STREAMING FALLBACK
    const fallbackText = "Yo! I'm in Mock Mode because my API key is missing, but here's what I know about that: \\n\\n" + context;
    const words = fallbackText.split(' ');
    
    let i = 0;
    const mockInterval = setInterval(() => {
      if (i < words.length) {
        res.write("data: " + JSON.stringify({ content: words[i] + " " }) + "\\n\\n");
        i++;
      } else {
        clearInterval(mockInterval);
        res.write('data: [DONE]\\n\\n');
        res.end();
      }
    }, 50); // Stream 1 word every 50ms
  }
});

=======
import { Router } from 'express';
import { searchResume } from '../services/rag.js';
import { buildSystemPrompt, getStreamingCompletion, getChatCompletion } from '../services/groq.js';
import { sendLeadNotification } from '../services/telegram.js';

const router = Router();

// In-memory session store
const sessions = new Map();

// Lead info extraction regex patterns
const EMAIL_REGEX = /[\w.-]+@[\w.-]+\.\w{2,}/;
const PHONE_REGEX = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/;
const DECLINE_REGEX = /^(no|nah|nope|not now|skip|pass|i('d| would) rather not|no thanks|no thank you|i don'?t want|maybe later|prefer not)/i;

/**
 * Lead-gen stages:
 *   idle     → chatting normally, haven't started lead capture yet
 *   askName  → Arthur should ask for their name
 *   askEmail → got name, Arthur should ask for email
 *   askPhone → got email, Arthur should ask for phone (optional)
 *   done     → all captured or user provided enough
 *   declined → user said "no" to contact info, stop asking
 */

function getSession(sessionId) {
    if (!sessions.has(sessionId)) {
        sessions.set(sessionId, {
            history: [],
            messageCount: 0,
            leadInfo: {},         // { name, email, phone }
            leadStage: 'idle',    // idle | askName | askEmail | askPhone | done | declined
            leadSent: false,
        });
    }
    return sessions.get(sessionId);
}

// ===================== SSE STREAMING ENDPOINT =====================

/**
 * POST /api/chat/stream
 * Body: { message: string, sessionId: string }
 * Returns: Server-Sent Events stream
 *
 * Events:
 *   data: { type: 'chunk', content: '...' }
 *   data: { type: 'lead', leadInfo: {...}, leadStage: '...' }
 *   data: { type: 'sentiment', value: '...' }
 *   data: { type: 'done' }
 *   data: { type: 'error', message: '...' }
 */
router.post('/stream', async (req, res) => {
    const { message, sessionId } = req.body;

    if (!message || !sessionId) {
        return res.status(400).json({ error: 'message and sessionId are required' });
    }

    // Set up SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders();

    const send = (data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    try {
        const session = getSession(sessionId);
        session.messageCount++;
        session.history.push({ role: 'user', content: message });

        // Process lead-gen state transitions BEFORE building the prompt
        processLeadStage(message, session);

        // Send current lead state to client
        send({ type: 'lead', leadInfo: { ...session.leadInfo }, leadStage: session.leadStage });

        // Detect sentiment
        const sentiment = detectSentiment(message);
        send({ type: 'sentiment', value: sentiment });

        // RAG context
        const ragContext = searchResume(message);

        // Build system prompt with lead-gen state
        const systemPrompt = buildSystemPrompt(ragContext, session.messageCount, session.leadInfo, session.leadStage);

        // Stream from Groq
        let fullReply = '';
        try {
            const stream = await getStreamingCompletion(systemPrompt, session.history);

            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content || '';
                if (content) {
                    fullReply += content;
                    send({ type: 'chunk', content });
                }
            }
        } catch (groqErr) {
            console.error('Groq streaming error:', groqErr.message);
            // Fallback to non-streaming
            fullReply = await getChatCompletion(systemPrompt, session.history);
            send({ type: 'chunk', content: fullReply });
        }

        // Save assistant reply
        session.history.push({ role: 'assistant', content: fullReply });

        // Advance lead stage after Arthur's response if appropriate
        advanceLeadStage(session);

        // Send updated lead state after potential stage advancement
        send({ type: 'lead', leadInfo: { ...session.leadInfo }, leadStage: session.leadStage });

        // Telegram notification when we have enough info
        if (hasMinimalLeadInfo(session.leadInfo) && !session.leadSent) {
            session.leadSent = true;
            sendLeadNotification({
                name: session.leadInfo.name,
                email: session.leadInfo.email,
                phone: session.leadInfo.phone,
                transcript: session.history,
            }).catch((err) => console.error('Lead notification error:', err));
        }

        // Trim history
        if (session.history.length > 24) {
            session.history = session.history.slice(-20);
        }

        send({ type: 'done' });
        res.end();
    } catch (error) {
        console.error('Stream error:', error);
        send({ type: 'error', message: "Oops, my circuits got tangled 😅 Try again!" });
        res.end();
    }
});

// ===================== NON-STREAMING ENDPOINT (kept for compatibility) =====================

router.post('/', async (req, res) => {
    try {
        const { message, sessionId } = req.body;

        if (!message || !sessionId) {
            return res.status(400).json({ error: 'message and sessionId are required' });
        }

        const session = getSession(sessionId);
        session.messageCount++;
        session.history.push({ role: 'user', content: message });

        processLeadStage(message, session);

        const ragContext = searchResume(message);
        const systemPrompt = buildSystemPrompt(ragContext, session.messageCount, session.leadInfo, session.leadStage);
        const reply = await getChatCompletion(systemPrompt, session.history);

        session.history.push({ role: 'assistant', content: reply });
        advanceLeadStage(session);

        const sentiment = detectSentiment(message);

        if (hasMinimalLeadInfo(session.leadInfo) && !session.leadSent) {
            session.leadSent = true;
            sendLeadNotification({
                name: session.leadInfo.name,
                email: session.leadInfo.email,
                phone: session.leadInfo.phone,
                transcript: session.history,
            }).catch((err) => console.error('Lead notification error:', err));
        }

        if (session.history.length > 24) {
            session.history = session.history.slice(-20);
        }

        res.json({
            reply,
            sentiment,
            leadInfo: { ...session.leadInfo },
            leadStage: session.leadStage,
        });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({
            reply: "Oops, my circuits got tangled 😅 Try again in a sec!",
            sentiment: 'neutral',
            leadInfo: {},
            leadStage: 'idle',
        });
    }
});

// ===================== LEAD-GEN STATE MACHINE =====================

/**
 * Process user message against current lead stage.
 * Called BEFORE building the system prompt.
 */
function processLeadStage(message, session) {
    const { leadStage } = session;
    const isDecline = DECLINE_REGEX.test(message.trim());

    switch (leadStage) {
        case 'idle':
            // Transition to askName after 3 messages
            if (session.messageCount >= 3) {
                session.leadStage = 'askName';
            }
            break;

        case 'askName': {
            // Check if this message is a name response
            const lastAssistant = getLastAssistantMessage(session);
            if (lastAssistant && /name|call you|who am i/i.test(lastAssistant)) {
                if (isDecline) {
                    session.leadStage = 'declined';
                } else {
                    const cleaned = message.replace(/^(i'm|i am|my name is|it's|call me|hey,?\s*)/i, '').trim();
                    if (cleaned.length > 0 && cleaned.length < 40 && !EMAIL_REGEX.test(message)) {
                        session.leadInfo.name = cleaned;
                        session.leadStage = 'askEmail';
                    }
                }
            }
            break;
        }

        case 'askEmail': {
            if (isDecline) {
                session.leadStage = 'declined';
                break;
            }
            const emailMatch = message.match(EMAIL_REGEX);
            if (emailMatch) {
                session.leadInfo.email = emailMatch[0];
                session.leadStage = 'askPhone';
            }
            break;
        }

        case 'askPhone': {
            if (isDecline) {
                // Graceful decline — this is specifically requested
                session.leadStage = 'declined';
                break;
            }
            const phoneMatch = message.match(PHONE_REGEX);
            if (phoneMatch && phoneMatch[0].replace(/\D/g, '').length >= 7) {
                session.leadInfo.phone = phoneMatch[0];
                session.leadStage = 'done';
            }
            break;
        }

        // done / declined — no further processing
    }

    // Also do passive extraction regardless of stage
    passiveExtract(message, session);
}

/**
 * Advance lead stage after Arthur's response.
 * If Arthur asked for something and the user hasn't answered yet, keep the stage.
 */
function advanceLeadStage(session) {
    // If we're idle and have enough messages, move to askName
    if (session.leadStage === 'idle' && session.messageCount >= 3) {
        session.leadStage = 'askName';
    }
    // If we got email but stage is still askEmail, move to askPhone
    if (session.leadStage === 'askEmail' && session.leadInfo.email) {
        session.leadStage = 'askPhone';
    }
    // If we have name + email/phone, we're done
    if (session.leadInfo.name && (session.leadInfo.email || session.leadInfo.phone) && session.leadStage !== 'declined') {
        if (session.leadStage !== 'askPhone') {
            session.leadStage = 'done';
        }
    }
}

/**
 * Passive extraction — always try to pick up email/phone from any message.
 */
function passiveExtract(message, session) {
    if (!session.leadInfo.email) {
        const emailMatch = message.match(EMAIL_REGEX);
        if (emailMatch) session.leadInfo.email = emailMatch[0];
    }
    if (!session.leadInfo.phone) {
        const phoneMatch = message.match(PHONE_REGEX);
        if (phoneMatch && phoneMatch[0].replace(/\D/g, '').length >= 7) {
            session.leadInfo.phone = phoneMatch[0];
        }
    }
}

function getLastAssistantMessage(session) {
    for (let i = session.history.length - 1; i >= 0; i--) {
        if (session.history[i].role === 'assistant') return session.history[i].content;
    }
    return null;
}

function detectSentiment(message) {
    const lower = message.toLowerCase();
    if (/wow|cool|awesome|amazing|incredible|love|fantastic|great|brilliant/i.test(lower)) return 'positive';
    if (/bad|hate|terrible|awful|worst|boring|meh/i.test(lower)) return 'negative';
    return 'neutral';
}

function hasMinimalLeadInfo(leadInfo) {
    return leadInfo.name && (leadInfo.email || leadInfo.phone);
}

>>>>>>> d1e5d6de0499b1145bc1811f366b5315801d1d3c
export default router;
