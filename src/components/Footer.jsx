import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const FULL_TEXT = "Welcome to my portfolio! Got questions? Chat with Arthur 😎 — my AI buddy who knows everything about me.";

export default function Footer() {
    const textRef = useRef(null);
    const { primaryColor } = useTheme();
    const idx = useRef(0);
    const deleting = useRef(false);
    const paused = useRef(false);

    useEffect(() => {
        let timer;
        const tick = () => {
            if (paused.current) {
                timer = setTimeout(tick, 50);
                return;
            }
            if (!deleting.current) {
                idx.current++;
                if (textRef.current) textRef.current.textContent = FULL_TEXT.slice(0, idx.current);
                if (idx.current >= FULL_TEXT.length) {
                    deleting.current = true;
                    timer = setTimeout(tick, 3200);
                    return;
                }
            } else {
                idx.current--;
                if (textRef.current) textRef.current.textContent = FULL_TEXT.slice(0, idx.current);
                if (idx.current <= 0) {
                    deleting.current = false;
                    timer = setTimeout(tick, 800);
                    return;
                }
            }
            timer = setTimeout(tick, deleting.current ? 30 : 55);
        };
        timer = setTimeout(tick, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <footer className="py-16 px-6 relative overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {/* Background decoration */}
            <div
                className="absolute inset-0 pointer-events-none opacity-5"
                style={{
                    backgroundImage: `radial-gradient(${primaryColor} 1px, transparent 1px)`,
                    backgroundSize: '30px 30px',
                }}
            />

            <div className="max-w-[1400px] mx-auto text-center relative z-10 px-8 md:px-12">
                {/* Auto-typing message */}
                <div className="glass-card py-8 px-6 md:px-12 mb-10 relative overflow-hidden">
                    <div
                        className="absolute top-0 left-0 right-0 h-0.5"
                        style={{ background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)` }}
                    />
                    <p className="text-sm font-medium text-slate-400 italic leading-relaxed min-h-[3rem] flex items-center justify-center gap-0.5">
                        <span className="text-slate-500 mr-1 select-none">"</span>
                        <span ref={textRef} style={{ color: primaryColor }} className="transition-colors duration-500" />
                        <span
                            className="inline-block w-0.5 h-4 ml-0.5 animate-pulse"
                            style={{ backgroundColor: primaryColor }}
                        />
                        <span className="text-slate-500 ml-1 select-none">"</span>
                    </p>
                </div>

                {/* Nav links */}
                <div className="flex flex-wrap justify-center gap-6 mb-10">
                    {['Home', 'About', 'Skills', 'Projects', 'Certifications', 'Contact'].map((link) => (
                        <button
                            key={link}
                            onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                            className="text-sm text-slate-500 hover:text-slate-200 transition-colors duration-200"
                        >
                            {link}
                        </button>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    <span className="font-bold text-lg" style={{ color: primaryColor }}>
                        Dhiliban Raja
                    </span>
                    <p className="text-xs text-slate-600">
                        © {new Date().getFullYear()} Dhiliban Raja. Crafted with ❤️, React & Framer Motion.
                    </p>
                    <div className="flex gap-4">
                        {[
                            {
                                icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>,
                                href: 'https://github.com/Dhiliban-R'
                            },
                            {
                                icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
                                href: 'https://linkedin.com/in/dhilibanraja'
                            },
                            {
                                icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
                                href: 'mailto:dhilipanrc@gmail.com'
                            },
                        ].map(({ icon, href }, i) => (
                            <a
                                key={i}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full flex items-center justify-center font-bold border transition-all duration-200 hover:scale-110"
                                style={{ borderColor: `${primaryColor}40`, color: primaryColor, background: `${primaryColor}10` }}
                            >
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
