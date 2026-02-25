import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const PROJECTS = [
    {
        id: 1,
        title: 'Food Donation Platform',
        description:
            'Full-stack application supporting real-time donor-recipient matching and geolocation tracking with Firebase Realtime Database for live coordination.',
        tags: ['React', 'Firebase', 'JavaScript', 'CSS'],
        emoji: '🍱',
        color: '#14E885',
        gradient: 'from-emerald-500/20 to-teal-500/5',
        features: ['Real-time donor ↔ recipient matching', 'Geolocation navigation', 'Firebase live updates'],
        link: '#',
        github: 'https://github.com/Dhiliban-R',
        date: 'Apr–May 2025',
    },
    {
        id: 2,
        title: 'Hotel Management System',
        description:
            'A booking and billing platform with an admin dashboard for availability tracking and customer management, powered by MySQL for data persistence.',
        tags: ['JavaScript', 'HTML', 'CSS', 'MySQL'],
        emoji: '🏨',
        color: '#0066AE',
        gradient: 'from-blue-500/20 to-cyan-500/5',
        features: ['Room booking & availability', 'Admin dashboard', 'Automated billing'],
        link: '#',
        github: 'https://github.com/Dhiliban-R',
        date: 'Jun 2025',
    },
    {
        id: 3,
        title: 'LockedFI — DeFi Platform',
        description: 'My final year project bridging real-world income to decentralized finance (DeFi) using Zero-Knowledge Proofs (ZK-Proofs) and Agentic AI.',
        tags: ['ZK-Proofs', 'Agentic AI', 'DeFi', 'Web3'],
        emoji: '🌍',
        color: '#f59e0b',
        gradient: 'from-amber-500/20 to-orange-500/5',
        features: ['ZK-Proofs integration', 'Agentic AI bridging', 'Real-world income to DeFi'],
        link: '#',
        github: 'https://github.com/Dhiliban-R',
        date: 'Present',
    },
    {
        id: 4,
        title: 'Modern AI Portfolio & Chatbot',
        description:
            'This immersive portfolio built with React and Framer Motion, featuring a custom Groq-powered AI chatbot (Arthur) with RAG memory, SSE streaming, and Telegram integration.',
        tags: ['React', 'Node.js', 'Groq Llama 3', 'Framer Motion'],
        emoji: '😎',
        color: '#7c3aed',
        gradient: 'from-purple-500/20 to-violet-500/5',
        features: ['Agentic AI chatbot', 'Dynamic adaptive glassmorphism palette', 'RAG resume memory'],
        link: '#',
        github: 'https://github.com/Dhiliban-R',
        date: '2025',
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};
const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Projects() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const { primaryColor } = useTheme();

    return (
        <section id="projects" className="py-28 px-6 relative overflow-hidden">
            <div
                className="absolute bottom-0 left-0 w-1/2 h-1/2 pointer-events-none opacity-10 blur-3xl"
                style={{ background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)` }}
            />

            <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="max-w-[1400px] mx-auto px-8 md:px-12"
            >
                <motion.div variants={cardVariants} className="mb-16">
                    <span className="section-label mb-3 block">03 — Projects</span>
                    <h2 className="text-4xl md:text-5xl font-bold">What I've Built</h2>
                    <p className="text-slate-400 mt-4 max-w-lg">
                        Handcrafted projects that solve real problems — from reducing food waste to managing hospitality operations.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                    {PROJECTS.map((proj) => (
                        <motion.div
                            key={proj.id}
                            variants={cardVariants}
                            whileHover={{
                                y: -12,
                                scale: 1.02,
                                boxShadow: `0 20px 40px -10px ${proj.color}40`,
                                borderColor: `${proj.color}80`
                            }}
                            className="glass-card overflow-hidden group relative flex flex-col h-full"
                            style={{ transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)' }}
                        >
                            {/* Top accent bar */}
                            <div
                                className="h-1 w-full"
                                style={{ background: `linear-gradient(90deg, ${proj.color}, transparent)` }}
                            />

                            <div className="p-8">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-5">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                                            style={{ background: `${proj.color}15`, border: `1px solid ${proj.color}30` }}
                                        >
                                            {proj.emoji}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-white tracking-tight mb-1 group-hover:text-glow transition-all duration-300" style={{ '--tw-glow-color': proj.color }}>{proj.title}</h3>
                                            <span className="text-sm font-semibold tracking-wide uppercase" style={{ color: proj.color }}>{proj.date || 'Featured Project'}</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-slate-300 text-lg leading-relaxed mb-6 flex-grow">{proj.description}</p>

                                {/* Features */}
                                <ul className="space-y-2 mb-6">
                                    {proj.features.map((f) => (
                                        <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: proj.color }} />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {proj.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 rounded-full text-xs font-medium"
                                            style={{ background: `${proj.color}15`, color: proj.color, border: `1px solid ${proj.color}30` }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex gap-3">
                                    <a
                                        href={proj.github}
                                        className="px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 hover:scale-105"
                                        style={{ borderColor: `${proj.color}40`, color: proj.color, background: `${proj.color}10` }}
                                    >
                                        GitHub ↗
                                    </a>
                                    <a
                                        href={proj.link}
                                        className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 text-white"
                                        style={{ background: `linear-gradient(135deg, ${proj.color}, ${proj.color}90)` }}
                                    >
                                        Live Demo →
                                    </a>
                                </div>
                            </div>

                            {/* Hover glow overlay */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 rounded-[20px]"
                                style={{ background: `radial-gradient(circle at 50% 100%, ${proj.color}15, transparent 70%)` }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
