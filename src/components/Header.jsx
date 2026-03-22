import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = [
  { name: 'About', to: 'about' },
  { name: 'Skills', to: 'skills' },
  { name: 'Projects', to: 'projects' },
  { name: 'Credentials', to: 'certifications' },
  { name: 'Contact', to: 'contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { themeColor } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark-slate/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="home" smooth={true} duration={500} className="cursor-pointer group">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white tracking-tighter">Dhiliban</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-color)] group-hover:scale-150 transition-transform" />
          </div>
        </Link>
        
        <nav className="hidden md:flex gap-10 items-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth={true}
              duration={500}
              spy={true}
              offset={-80}
              activeClass="active-nav"
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white cursor-pointer transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-6">
          <a 
            href="/My Resume.pdf" 
            target="_blank"
            className="hidden sm:block text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors border-b border-transparent hover:border-white/20 pb-1"
          >
            Resume
          </a>
          <button className="px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-white text-dark-slate hover:bg-slate-100 transition-all active:scale-95 shadow-lg">
            Connect
          </button>
        </div>
      </div>
      
      <style>{`
        .active-nav {
          color: white !important;
        }
      `}</style>
    </header>
  );
}
