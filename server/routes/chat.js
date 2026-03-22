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

export default router;
