import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useChat } from '../hooks/useChat';

export default function ArthurShell() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const { themeColor } = useTheme();
  const { messages, sendMessage, isStreaming, leadInfo, leadStage } = useChat();
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = () => {
    if (!input.trim() || isStreaming) return;
    sendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 z-[100] px-6 py-4 rounded-2xl bg-white text-dark-slate shadow-2xl flex items-center gap-3 font-bold text-xs uppercase tracking-widest"
        >
          <span>Ask Arthur</span>
          <span className="text-lg">😎</span>
        </motion.button>
      )}

      {/* Floating Side Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full md:w-[450px] z-[110] bg-dark-slate border-l border-white/5 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl border border-white/10">
                  😎
                </div>
                <div>
                  <h2 className="font-bold text-lg text-white">
                    Arthur <span className="text-slate-500 font-medium text-sm ml-1">AI Assistant</span>
                  </h2>
                  <div className="flex items-center gap-2 text-[9px] font-bold text-slate-500 tracking-widest uppercase mt-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${isStreaming ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`} />
                    {isStreaming ? 'Processing...' : 'Online'}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setOpen(false)}
                className="w-10 h-10 rounded-xl hover:bg-white/5 transition-colors flex items-center justify-center text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin">
              {messages.map((msg, idx) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex flex-col ${msg.from === 'user' ? 'items-end' : 'items-start'} max-w-[85%]`}>
                    <div 
                      className={`p-5 rounded-2xl text-sm leading-relaxed ${
                        msg.from === 'user' 
                          ? 'bg-white text-dark-slate font-medium' 
                          : 'bg-white/5 text-slate-300 border border-white/5'
                      }`}
                    >
                      {msg.text}
                      {msg.from === 'bot' && isStreaming && idx === messages.length - 1 && (
                        <span className="inline-block w-1.5 h-4 ml-1 bg-[var(--theme-color)] animate-pulse align-middle" />
                      )}
                    </div>
                    <span className="text-[8px] text-slate-600 mt-2 font-bold uppercase tracking-widest">{msg.time}</span>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <div className="p-8 border-t border-white/5 bg-dark-slate/50 backdrop-blur-xl">
              <div className="flex items-center gap-3 p-2 bg-white/5 rounded-2xl border border-white/5 focus-within:border-white/20 transition-all">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    leadStage === 'askingName' ? "What's your name?" :
                    leadStage === 'askingEmail' ? "And your email?" :
                    "Ask about Dhiliban..."
                  } 
                  disabled={isStreaming}
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-600 text-sm px-4 py-2 disabled:opacity-50"
                />
                <button 
                  onClick={handleSend}
                  disabled={isStreaming || !input.trim()}
                  className="w-10 h-10 rounded-xl bg-white text-dark-slate flex items-center justify-center font-bold shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:scale-100"
                >
                  ↑
                </button>
              </div>
              <p className="text-[8px] text-center text-slate-700 mt-6 uppercase tracking-[0.2em] font-bold">
                Powered by Llama 3 • Specialized Knowledge Base
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
