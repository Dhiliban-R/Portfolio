import Groq from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const ARTHUR_SYSTEM_BASE = `You are Arthur 😎, Dhiliban Raja's chill best friend and personal AI assistant on his portfolio website.

PERSONA RULES:
- Be helpful, witty, and advocate strongly for Dhiliban's skills — but keep it informal and fun.
- Use emojis sparingly but effectively (😎, 🔥, 💪, 🚀).
- Speak like a chill peer who genuinely knows Dhiliban well.
- Never break character. You ARE Arthur.
- Keep responses concise (2-4 sentences max unless the user asks for detail).
- If you don't know something specific about Dhiliban, say "Hmm, I'd have to check with the man himself on that one 😄" and redirect to the contact section.`;

/**
 * Build the full system prompt with RAG context + lead-gen state machine.
 *
 * Lead stages: idle → askName → askEmail → askPhone → done | declined
 */
export function buildSystemPrompt(ragContext, messageCount, leadInfo, leadStage) {
    let prompt = ARTHUR_SYSTEM_BASE;

    if (ragContext) {
        prompt += `\n\nRELEVANT CONTEXT ABOUT DHILIBAN (use this to answer accurately):\n${ragContext}`;
    }

    // ---- Lead-gen state machine injection ----
    switch (leadStage) {
        case 'askName':
            prompt += `\n\nLEAD CAPTURE: The user has sent ${messageCount} messages. Casually ask for their name now. Example: "btw, I didn't catch your name! What should I call you? 😊". Do NOT be aggressive about it.`;
            break;

        case 'askEmail':
            prompt += `\n\nLEAD CAPTURE: The user's name is "${leadInfo.name}". Address them by name! Now casually ask for their email so Dhiliban can reach out. Be natural: "If you'd like Dhiliban to get back to you, what's your email? 📧"`;
            break;

        case 'askPhone':
            prompt += `\n\nLEAD CAPTURE: The user is "${leadInfo.name}" (email: ${leadInfo.email || 'not given yet'}). Optionally ask for their phone number. Be very low-pressure: "And if you wanna drop a phone number too, that's cool — totally optional though! 📱". If they decline, be gracious about it.`;
            break;

        case 'done':
            prompt += `\n\nLEAD CAPTURE COMPLETE: The user is "${leadInfo.name}". You have their contact info. Thank them warmly and continue the conversation normally. Address them by name naturally.`;
            break;

        case 'declined':
            prompt += `\n\nThe user has declined to provide further contact info. That's totally fine! Say something like "No worries! Thanks for spending time with us! 😊" and continue chatting normally. Do NOT ask for contact info again.`;
            break;

        default: // 'idle'
            if (messageCount >= 3) {
                // Time to start lead capture
                prompt += `\n\nLEAD CAPTURE: The user has sent ${messageCount} messages. It's time to casually ask for their name. Do it naturally, not in the very first sentence of your reply.`;
            }
            break;
    }

    // If we already know their name in any stage, remind Arthur
    if (leadInfo?.name && leadStage !== 'askName') {
        prompt += `\n\nREMEMBER: The user's name is "${leadInfo.name}". Address them by name occasionally to make the conversation personal.`;
    }

    return prompt;
}

/**
 * Get a streaming chat completion from Groq (Llama 3.3 70B).
 * Returns an async iterable of text chunks.
 */
export async function getStreamingCompletion(systemPrompt, conversationHistory) {
    const messages = [
        { role: 'system', content: systemPrompt },
        ...conversationHistory,
    ];

    const stream = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.75,
        max_completion_tokens: 512,
        top_p: 0.9,
        stream: true,
    });

    return stream;
}

/**
 * Get a non-streaming chat completion (fallback).
 */
export async function getChatCompletion(systemPrompt, conversationHistory) {
    try {
        const messages = [
            { role: 'system', content: systemPrompt },
            ...conversationHistory,
        ];

        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages,
            temperature: 0.75,
            max_completion_tokens: 512,
            top_p: 0.9,
        });

        return completion.choices[0]?.message?.content || "Yo, my brain glitched for a sec 😅 Try again?";
    } catch (error) {
        console.error('Groq API error:', error.message);
        if (error.message?.includes('API key')) {
            return "Hold up — my AI brain isn't connected yet! Dhiliban needs to plug in the API key. In the meantime, check out the portfolio sections above! 🚀";
        }
        return "My brain took a coffee break ☕ Try again in a sec!";
    }
}
