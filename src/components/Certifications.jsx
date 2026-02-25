import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const CERTS = [
    {
        id: 1,
        org: 'Electronic Arts via Forage',
        title: 'Software Engineering Job Simulation',
        description: 'Completed a virtual software engineering job simulation at Electronic Arts covering system design, full-stack development, and collaborative coding in agile environments.',
        date: 'Apr 2025',
        badge: '🎮',
        color: '#14E885',
        skills: ['System Design', 'Full-Stack Dev', 'Agile'],
        verify: '#',
    },
    {
        id: 2,
        org: 'Scalar Topics',
        title: 'JavaScript Programming Specialization',
        description: 'Intensive specialization covering modern JavaScript, ES6+ features, asynchronous programming, and building production-grade web applications.',
        date: 'May 2024',
        badge: '🌐',
        color: '#f0db4f',
        skills: ['JavaScript', 'ES6+', 'Web Dev'],
        verify: '#',
    },
    {
        id: 3,
        org: 'Scalar Topics',
        title: 'SOLID Principles Masterclass',
        description: 'Deep-dive into SOLID design principles, clean code practices, object-oriented programming patterns, and writing maintainable software architecture.',
        date: 'May 2024',
        badge: '🏗️',
        color: '#0066AE',
        skills: ['SOLID', 'Clean Code', 'OOP'],
        verify: '#',
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};
const cardVariants = {
    hidden: { opacity: 0, scale: 0.93, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Certifications() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const { primaryColor } = useTheme();

    return (
        <section id="certifications" className="py-28 px-6 relative overflow-hidden">
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none opacity-8 blur-3xl"
                style={{ background: `radial-gradient(circle, ${primaryColor}, transparent)` }}
            />

            <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="max-w-6xl mx-auto"
            >
                <motion.div variants={cardVariants} className="mb-16">
                    <span className="section-label mb-3 block">04 — Certifications</span>
                    <h2 className="text-4xl md:text-5xl font-bold">Credentials</h2>
                    <p className="text-slate-400 mt-4 max-w-lg">
                        Industry-recognized certifications validating my skills and commitment to continuous learning.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {CERTS.map((cert) => (
                        <motion.div
                            key={cert.id}
                            variants={cardVariants}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="glass-card p-6 relative group overflow-hidden"
                        >
                            {/* Top glow line */}
                            <div
                                className="absolute top-0 left-0 right-0 h-0.5"
                                style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
                            />

                            {/* Badge + org */}
                            <div className="flex items-center gap-3 mb-5">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                                    style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}
                                >
                                    {cert.badge}
                                </div>
                                <div>
                                    <div
                                        className="text-xs font-bold tracking-wider uppercase"
                                        style={{ color: cert.color }}
                                    >
                                        {cert.org}
                                    </div>
                                    <div className="text-xs text-slate-500">{cert.date}</div>
                                </div>
                            </div>

                            <h3 className="text-base font-bold text-white mb-3 leading-snug">{cert.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-5">{cert.description}</p>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-1.5 mb-5">
                                {cert.skills.map((s) => (
                                    <span
                                        key={s}
                                        className="px-2 py-0.5 rounded text-xs"
                                        style={{ background: `${cert.color}15`, color: cert.color }}
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>

                            {/* Verify link */}
                            <a
                                href={cert.verify}
                                className="text-xs font-semibold tracking-wide uppercase hover:underline transition-all"
                                style={{ color: cert.color }}
                            >
                                Verify Certificate ↗
                            </a>

                            {/* Hover glow */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                                style={{ background: `radial-gradient(circle at 50% 0%, ${cert.color}08, transparent 60%)` }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
