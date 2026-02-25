import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Geometric avatar SVG component
function GeometricAvatar({ primaryColor }) {
    return (
        <svg viewBox="0 0 300 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="avatarGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={primaryColor} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
                </radialGradient>
                <linearGradient id="faceGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0066AE" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#14E885" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="shapeGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={primaryColor} stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
                </linearGradient>
                <filter id="blur">
                    <feGaussianBlur stdDeviation="12" />
                </filter>
                <clipPath id="hexClip">
                    <polygon points="150,20 270,85 270,215 150,280 30,215 30,85" />
                </clipPath>
            </defs>

            {/* Glow behind */}
            <circle cx="150" cy="150" r="130" fill="url(#avatarGrad)" filter="url(#blur)" />

            {/* Hexagon background */}
            <polygon points="150,20 270,85 270,215 150,280 30,215 30,85"
                fill="rgba(255,255,255,0.04)" stroke={primaryColor} strokeWidth="1.5" strokeOpacity="0.3" />

            {/* Inner glass panel */}
            <rect x="90" y="80" width="120" height="140" rx="16"
                fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

            {/* "Head" circle */}
            <circle cx="150" cy="120" r="32" fill="url(#faceGrad)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />

            {/* Eyes */}
            <circle cx="140" cy="116" r="5" fill="white" fillOpacity="0.9" />
            <circle cx="160" cy="116" r="5" fill="white" fillOpacity="0.9" />
            <circle cx="141.5" cy="117" r="2.5" fill="#060b14" />
            <circle cx="161.5" cy="117" r="2.5" fill="#060b14" />

            {/* Smile */}
            <path d="M140 128 Q150 136 160 128" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" strokeOpacity="0.8" />

            {/* Body lines */}
            <rect x="120" y="162" width="60" height="6" rx="3" fill="rgba(255,255,255,0.2)" />
            <rect x="110" y="176" width="80" height="4" rx="2" fill="rgba(255,255,255,0.12)" />
            <rect x="118" y="188" width="64" height="4" rx="2" fill="rgba(255,255,255,0.1)" />

            {/* Floating tech dots */}
            {[[50, 60], [250, 80], [60, 220], [240, 200], [150, 290], [30, 145]].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="4" fill={primaryColor} fillOpacity={0.5 - i * 0.05} />
            ))}

            {/* Corner accent triangles */}
            <polygon points="30,30 60,30 30,60" fill={primaryColor} fillOpacity="0.15" />
            <polygon points="270,270 240,270 270,240" fill={primaryColor} fillOpacity="0.15" />

            {/* Connecting lines */}
            <line x1="86" y1="86" x2="30" y2="30" stroke={primaryColor} strokeWidth="0.8" strokeOpacity="0.25" />
            <line x1="214" y1="214" x2="270" y2="270" stroke={primaryColor} strokeWidth="0.8" strokeOpacity="0.25" />
        </svg>
    );
}

const WORDS = ['Full-Stack Developer', 'React & Node.js Specialist', 'Web3 Implementer', 'Problem Solver'];

function TypingText() {
    const wordRef = useRef(null);
    const wordIdx = useRef(0);
    const charIdx = useRef(0);
    const deleting = useRef(false);
    const { primaryColor } = useTheme();

    useEffect(() => {
        let timer;
        const tick = () => {
            const word = WORDS[wordIdx.current];
            if (!deleting.current) {
                charIdx.current++;
                if (wordRef.current) wordRef.current.textContent = word.slice(0, charIdx.current);
                if (charIdx.current === word.length) {
                    deleting.current = true;
                    timer = setTimeout(tick, 1800);
                    return;
                }
            } else {
                charIdx.current--;
                if (wordRef.current) wordRef.current.textContent = word.slice(0, charIdx.current);
                if (charIdx.current === 0) {
                    deleting.current = false;
                    wordIdx.current = (wordIdx.current + 1) % WORDS.length;
                    timer = setTimeout(tick, 400);
                    return;
                }
            }
            timer = setTimeout(tick, deleting.current ? 60 : 90);
        };
        timer = setTimeout(tick, 600);
        return () => clearTimeout(timer);
    }, []);

    return (
        <span className="inline-flex items-center gap-0.5">
            <span ref={wordRef} style={{ color: primaryColor }} className="transition-colors duration-500" />
            <span
                className="inline-block w-0.5 h-6 animate-pulse"
                style={{ backgroundColor: primaryColor }}
            />
        </span>
    );
}

export default function Hero() {
    const containerRef = useRef(null);
    const { primaryColor } = useTheme();
    const { scrollY } = useScroll();

    const y = useSpring(useTransform(scrollY, [0, 600], [0, 100]), { stiffness: 80, damping: 20 });
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const avatarY = useSpring(useTransform(scrollY, [0, 600], [0, -60]), { stiffness: 60, damping: 18 });
    const avatarRotate = useTransform(scrollY, [0, 600], [0, 8]);

    return (
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden" ref={containerRef}>
            {/* Background blobs for deeper glassmorphism refraction */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full opacity-30 blur-[100px]"
                    style={{ backgroundColor: '#0066AE' }}
                    animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-1/4 -right-32 w-[450px] h-[450px] rounded-full opacity-20 blur-[100px]"
                    style={{ backgroundColor: '#14E885' }}
                    animate={{ scale: [1, 1.25, 1], x: [0, -30, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                />
                {/* Grid lines */}
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                        backgroundSize: '80px 80px'
                    }}
                />
            </div>

            <div className="max-w-[1600px] mx-auto px-8 md:px-12 w-full flex flex-col lg:flex-row justify-between items-center gap-16 lg:gap-24 pt-24 pb-16">
                {/* Text content */}
                <motion.div style={{ y, opacity }} className="relative z-10 w-full lg:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span className="section-label mb-4 block">👋 Hey there, I'm</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.35 }}
                        className="text-6xl md:text-8xl font-black tracking-tight leading-tight mb-6"
                    >
                        Dhiliban{' '}
                        <span
                            className="relative"
                            style={{
                                background: `linear-gradient(135deg, var(--brand-blue), var(--brand-green))`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Raja
                        </span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-xl md:text-2xl font-medium mb-8 inline-flex items-center px-4 py-2 glass-panel"
                    >
                        <TypingText />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.65 }}
                        className="text-slate-400 text-lg leading-relaxed mb-10 max-w-lg"
                    >
                        Full-Stack Developer specializing in React, Node.js & Web3 — building scalable, production-ready applications.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="flex flex-wrap gap-4"
                    >
                        <button
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            style={{
                                background: `linear-gradient(135deg, #0066AE, #14E885)`,
                                boxShadow: `0 4px 24px rgba(0, 102, 174, 0.4)`,
                                color: 'white'
                            }}
                        >
                            View Projects →
                        </button>
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-7 py-3.5 rounded-xl font-semibold text-sm border transition-all duration-300 hover:scale-105 hover:bg-white/5"
                            style={{ borderColor: primaryColor, color: primaryColor }}
                        >
                            Get In Touch
                        </button>
                    </motion.div>

                    {/* Floating badges */}
                    <motion.div
                        className="flex flex-wrap gap-2 mt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1, duration: 0.6 }}
                    >
                        {['React', 'Python', 'Java', 'AI/ML', 'C'].map((t, i) => (
                            <span
                                key={t}
                                className="px-3 py-1 rounded-full text-xs font-medium border"
                                style={{ borderColor: `${primaryColor}40`, color: primaryColor, background: `${primaryColor}12` }}
                            >
                                {t}
                            </span>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Avatar */}
                <motion.div
                    style={{ y: avatarY, rotate: avatarRotate }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex justify-center lg:justify-end relative w-full lg:w-1/2"
                >
                    <div className="relative w-72 h-72 md:w-96 md:h-96 animate-floating">
                        {/* Outer glow rings */}
                        <motion.div
                            className="absolute inset-0 rounded-full border opacity-20"
                            style={{ borderColor: primaryColor }}
                            animate={{ scale: [1, 1.08, 1] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <motion.div
                            className="absolute inset-4 rounded-full border opacity-15"
                            style={{ borderColor: primaryColor }}
                            animate={{ scale: [1, 1.06, 1], rotate: [0, 180, 360] }}
                            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                        />

                        {/* Glass panel container */}
                        <div
                            className="absolute inset-8 rounded-3xl flex items-center justify-center p-6"
                            style={{
                                background: 'rgba(255,255,255,0.04)',
                                backdropFilter: 'blur(20px)',
                                border: `1px solid ${primaryColor}30`,
                                boxShadow: `0 0 60px ${primaryColor}25, inset 0 1px 0 rgba(255,255,255,0.1)`,
                            }}
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                                className="w-full h-full"
                            >
                                <GeometricAvatar primaryColor={primaryColor} />
                            </motion.div>
                        </div>

                        {/* Orbiting particles */}
                        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 rounded-full"
                                style={{
                                    backgroundColor: primaryColor,
                                    top: `${50 - 48 * Math.cos((deg * Math.PI) / 180)}%`,
                                    left: `${50 + 48 * Math.sin((deg * Math.PI) / 180)}%`,
                                    opacity: 0.3 + i * 0.08,
                                }}
                                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
                                transition={{ duration: 2 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                style={{ opacity: 0.5, color: primaryColor }}
            >
                <span className="text-xs tracking-widest uppercase" style={{ color: primaryColor }}>Scroll</span>
                <div className="w-px h-8" style={{ background: `linear-gradient(to bottom, ${primaryColor}, transparent)` }} />
            </motion.div>
        </section>
    );
}
