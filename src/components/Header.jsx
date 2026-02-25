import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = ['Home', 'About', 'Skills', 'Projects', 'Certifications', 'Contact'];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { primaryColor } = useTheme();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTo = (id) => {
        const el = document.getElementById(id.toLowerCase());
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
    };

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
            style={{
                background: scrolled
                    ? 'rgba(6, 11, 20, 0.85)'
                    : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
                transition: 'background 500ms ease-in-out, backdrop-filter 500ms ease-in-out, border-bottom 500ms ease-in-out',
            }}
        >
            <div className="max-w-[1600px] w-full mx-auto flex items-center justify-between">
                {/* Logo / Welcome */}
                <motion.span
                    className="text-xl font-bold tracking-wide"
                    style={{
                        color: scrolled ? '#ffffff' : primaryColor,
                        textShadow: scrolled ? `0 0 10px ${primaryColor}40` : 'none',
                        transition: 'color 500ms ease-in-out, text-shadow 500ms ease-in-out',
                    }}
                    whileHover={{ scale: 1.05 }}
                >
                    Welcome
                </motion.span>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {NAV_LINKS.map((link) => (
                        <button
                            key={link}
                            onClick={() => scrollTo(link)}
                            className="px-3 py-2 rounded-lg text-sm font-medium relative group hover:bg-white/5"
                            style={{
                                color: scrolled ? '#ffffff' : '#cbd5e1',
                                transition: 'color 500ms ease-in-out',
                            }}
                        >
                            {link}
                            <span
                                className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-4/5 rounded-full"
                                style={{
                                    backgroundColor: scrolled ? '#ffffff' : primaryColor,
                                    transition: 'width 300ms ease, background-color 500ms ease-in-out',
                                }}
                            />
                        </button>
                    ))}

                    {/* Download Resume button */}
                    <a
                        href="/resume.pdf"
                        download="Dhiliban_Raja_Resume.pdf"
                        className="ml-2 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:scale-105 active:scale-95"
                        style={{
                            background: `linear-gradient(135deg, #0066AE, ${primaryColor})`,
                            color: '#ffffff',
                            boxShadow: `0 4px 20px ${primaryColor}30`,
                            transition: 'box-shadow 500ms ease-in-out, background 500ms ease-in-out, transform 200ms ease',
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Resume
                    </a>
                </nav>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            className="block h-0.5 w-6 rounded"
                            style={{
                                backgroundColor: scrolled ? '#ffffff' : primaryColor,
                                transition: 'background-color 500ms ease-in-out',
                            }}
                        />
                    ))}
                </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden mt-4 glass-card overflow-hidden"
                    >
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link}
                                onClick={() => scrollTo(link)}
                                className="block w-full text-left px-6 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5"
                                style={{ transition: 'color 500ms ease-in-out, background 500ms ease-in-out' }}
                            >
                                {link}
                            </button>
                        ))}
                        {/* Mobile Resume download */}
                        <a
                            href="/resume.pdf"
                            download="Dhiliban_Raja_Resume.pdf"
                            className="flex items-center gap-2 px-6 py-3 text-sm font-semibold"
                            style={{
                                color: primaryColor,
                                borderTop: '1px solid rgba(255,255,255,0.06)',
                                transition: 'color 500ms ease-in-out',
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Download Resume
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
