import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function Hero() {
  const { themeColor } = useTheme();

  return (
    <section id="home" className="min-h-screen relative flex items-center pt-20 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-2/3 bg-[var(--theme-color)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-[var(--theme-color)]" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[var(--theme-color)]">
                Available for Internships
              </span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
              Dhiliban <span className="text-slate-500">R</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
                Full-Stack Engineer.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
              Crafting scalable digital solutions at the intersection of <span className="text-white">Agentic AI</span> and <span className="text-white">Robust Architecture</span>. Engineering student at GCE Salem.
            </p>
            
            <div className="flex flex-wrap gap-6 items-center">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 rounded-2xl font-bold bg-white text-dark-slate shadow-xl hover:bg-slate-100 transition-colors"
              >
                Explore Projects
              </motion.button>
              
              <a 
                href="/My Resume.pdf" 
                target="_blank"
                className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
              >
                Download Resume
                <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all">↓</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--theme-color)] to-transparent" />
        <span className="text-[9px] uppercase font-black tracking-[0.3em] text-slate-600">Scroll</span>
      </motion.div>
    </section>
  );
}
