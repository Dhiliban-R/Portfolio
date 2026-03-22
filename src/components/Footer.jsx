import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { themeColor } = useTheme();

  return (
    <footer className="py-20 bg-dark-slate border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="max-w-sm text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-4">
              Dhiliban <span className="text-slate-500">R</span>
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Engineering scalable solutions and exploring the future of decentralized AI and web technologies.
            </p>
          </div>
          
          <div className="flex gap-8">
            {['GitHub', 'LinkedIn', 'Twitter', 'Email'].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] text-slate-600 uppercase tracking-[0.3em] font-bold">
            © 2026 DHILIBAN R. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-3">
             <span className="text-[9px] text-slate-600 uppercase tracking-[0.3em] font-bold">Powered by Arthur</span>
             <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
}
