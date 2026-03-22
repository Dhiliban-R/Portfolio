import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useChat } from '../hooks/useChat';

const QUICK_PROMPTS = ['Skills?', 'Projects?', 'Certifications?', 'Contact him?'];

export default function Arthur() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const { primaryColor } = useTheme();
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    const { messages, leadInfo, leadStage, isStreaming, sentiment, sendMessage } = useChat();

    const [sentimentPulse, setSentimentPulse] = useState(false);

    // Scroll to bottom on new messages
    useEffect(() => {
        if (open) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [messages, open]);

    // Trigger visual pulse when sentiment is positive
    useEffect(() => {
        if (sentiment === 'positive') {
            setSentimentPulse(true);
            const timer = setTimeout(() => setSentimentPulse(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [sentiment]);

    const handleSend = (text) => {
        const msg = text || input;
        if (!msg.trim()) return;
        sendMessage(msg);
        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend(input);
        }
    };

    // Subtitle based on lead stage
    const getSubtitle = () => {
        if (leadInfo.name && (leadStage === 'done' || leadStage === 'declined')) {
            return `Chatting with ${leadInfo.name}`;
        }
        if (leadInfo.name) return `Hey ${leadInfo.name}! 👋`;
        return "Dhiliban's AI Buddy";
    };

    return (
        <>
            {/* Floating trigger button */}
            <motion.button
                onClick={() => setOpen((o) => !o)}
                className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[60] w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-2xl"
                style={{
                    background: `linear-gradient(135deg, #0066AE, ${primaryColor})`,
                    boxShadow: `0 8px 32px ${primaryColor}40`,
                }}
                whileHover={{ scale: 1.1, rotate: open ? 0 : 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open Arthur chat"
            >
                {open ? '✕' : '😎'}
            </motion.button>

            {/* Pulse ring around button */}
            {!open && (
                <motion.div
                    className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-14 h-14 rounded-2xl pointer-events-none"
                    style={{ border: `2px solid ${primaryColor}` }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                />
            )}

            {/* Chat panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.92 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className={`fixed inset-0 z-50 md:inset-auto md:bottom-28 md:right-8 md:w-[380px] md:h-[540px] md:rounded-3xl flex flex-col transition-shadow duration-500 ${sentimentPulse ? 'glow-green' : ''}`}
                        style={{
                            background: 'rgba(10, 16, 28, 0.95)',
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                            border: `1px solid ${sentimentPulse ? '#14E885' : `${primaryColor}30`}`,
                            boxShadow: `0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 60px ${primaryColor}15`,
                        }}
                    >
                        {/* Header */}
                        <div
                            className="flex items-center gap-3 px-5 py-4 flex-shrink-0 safe-top"
                            style={{ borderBottom: `1px solid ${sentimentPulse ? '#14E88540' : `${primaryColor}20`}` }}
                        >
                            <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-colors duration-500"
                                style={{
                                    background: `linear-gradient(135deg, ${sentimentPulse ? '#14E88540' : '#0066AE30'}, ${sentimentPulse ? '#14E88560' : `${primaryColor}30`})`,
                                    border: `1px solid ${sentimentPulse ? '#14E885' : `${primaryColor}40`}`,
                                }}
                            >
                                😎
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className={`font-bold text-sm transition-colors duration-500 ${sentimentPulse ? 'text-[#14E885]' : 'text-white'}`}>
                                    Arthur
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-yellow-400' : 'bg-green-400'} animate-pulse`} />
                                    <span className="text-xs text-slate-400 truncate">{getSubtitle()}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="w-10 h-10 md:w-8 md:h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all text-xl md:text-base"
                                aria-label="Close chat"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Messages area */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {msg.from === 'bot' && (
                                        <div
                                            className="w-7 h-7 rounded-lg flex items-center justify-center text-base mr-2 flex-shrink-0 mt-0.5"
                                            style={{ background: `${primaryColor}20`, border: `1px solid ${primaryColor}30` }}
                                        >
                                            😎
                                        </div>
                                    )}
                                    <div className="max-w-[85%] md:max-w-[75%]">
                                        <div
                                            className="px-4 py-2.5 rounded-2xl text-[15px] md:text-sm leading-relaxed whitespace-pre-line"
                                            style={
                                                msg.from === 'user'
                                                    ? {
                                                        background: `linear-gradient(135deg, #0066AE, ${primaryColor})`,
                                                        color: 'white',
                                                        borderBottomRightRadius: '6px',
                                                    }
                                                    : {
                                                        background: 'rgba(255,255,255,0.06)',
                                                        border: '1px solid rgba(255,255,255,0.08)',
                                                        color: '#e2e8f0',
                                                        borderBottomLeftRadius: '6px',
                                                    }
                                            }
                                        >
                                            {msg.text || (
                                                <span className="inline-flex gap-1 items-center">
                                                    {[0, 1, 2].map((i) => (
                                                        <motion.span
                                                            key={i}
                                                            className="w-1.5 h-1.5 rounded-full"
                                                            style={{ backgroundColor: primaryColor }}
                                                            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                                                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                                                        />
                                                    ))}
                                                </span>
                                            )}
                                        </div>
                                        {msg.time && (
                                            <div className={`text-[11px] text-slate-600 mt-1 ${msg.from === 'user' ? 'text-right' : 'text-left'}`}>
                                                {msg.time}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                            {/* Arthur is thinking indicator */}
                            {isStreaming && !messages[messages.length - 1]?.text && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 px-1 py-2"
                                >
                                    <span className="text-lg animate-thinking">🧠</span>
                                    <span className="text-xs text-slate-400 italic">Arthur is thinking...</span>
                                </motion.div>
                            )}

                            {/* Streaming cursor */}
                            {isStreaming && messages[messages.length - 1]?.text && (
                                <motion.span
                                    className="inline-block w-2 h-4 ml-0.5 rounded-sm"
                                    style={{ backgroundColor: primaryColor }}
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                />
                            )}

                            <div ref={bottomRef} />
                        </div>

                        {/* Quick prompts */}
                        <div className="px-4 pb-2 flex gap-2 overflow-x-auto flex-shrink-0 border-t border-white/5 pt-3">
                            {QUICK_PROMPTS.map((p) => (
                                <button
                                    key={p}
                                    onClick={() => handleSend(p)}
                                    disabled={isStreaming}
                                    className="flex-shrink-0 px-3 py-1.5 md:py-1 rounded-full text-xs border transition-all hover:scale-105 whitespace-nowrap disabled:opacity-30"
                                    style={{ borderColor: `${primaryColor}40`, color: primaryColor, background: `${primaryColor}10` }}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="px-4 pb-6 md:pb-4 flex-shrink-0 safe-bottom">
                            <div
                                className="flex items-center gap-2 rounded-xl px-3 py-2"
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: `1px solid ${primaryColor}30`,
                                }}
                            >
                                <input
                                    ref={inputRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder={leadInfo.name ? `Message Arthur, ${leadInfo.name}…` : 'Ask Arthur anything…'}
                                    disabled={isStreaming}
                                    className="flex-1 bg-transparent text-sm md:text-base text-white placeholder-slate-500 outline-none h-10 md:h-8 disabled:opacity-50"
                                />
                                <button
                                    onClick={() => handleSend(input)}
                                    disabled={!input.trim() || isStreaming}
                                    className="w-10 h-10 md:w-8 md:h-8 rounded-lg flex items-center justify-center text-lg md:text-sm font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
                                    style={{
                                        background: `linear-gradient(135deg, #0066AE, ${primaryColor})`,
                                        color: 'white',
                                    }}
                                >
                                    ↑
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
