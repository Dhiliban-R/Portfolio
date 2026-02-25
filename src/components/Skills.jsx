import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const SKILLS = [
    { name: 'JavaScript', level: 85, category: 'Languages', icon: '🌐' },
    { name: 'Java', level: 82, category: 'Languages', icon: '☕' },
    { name: 'C Programming', level: 80, category: 'Languages', icon: '⚡' },
    { name: 'Rust (Learning)', level: 65, category: 'Languages', icon: '🦀' },
    { name: 'React.js', level: 82, category: 'Web', icon: '⚛️' },
    { name: 'Node.js', level: 78, category: 'Web', icon: '🟢' },
    { name: 'Arch / Fedora', level: 90, category: 'OS / Environment', icon: '🐧' },
    { name: 'AI Tooling', level: 95, category: 'Workflow', icon: '🤖' },
    { name: 'SQL', level: 78, category: 'Databases', icon: '🗃️' },
    { name: 'Firebase', level: 76, category: 'Databases', icon: '🔥' },
    { name: 'Git & GitHub', level: 84, category: 'Tools', icon: '🔧' },
    { name: 'Bash / Scripting', level: 80, category: 'Tools', icon: '⚡' },
];

const TECH_ICONS = [
    { label: 'Arch Linux', bg: '#1793d120', border: '#1793d140', text: '#1793d1' },
    { label: 'Rust', bg: '#dea58420', border: '#dea58440', text: '#dea584' },
    { label: 'JavaScript', bg: '#f0db4f20', border: '#f0db4f40', text: '#f0db4f' },
    { label: 'React', bg: '#61dafb20', border: '#61dafb40', text: '#61dafb' },
    { label: 'AI Tools', bg: '#14E88520', border: '#14E88540', text: '#14E885' },
    { label: 'Node.js', bg: '#33993320', border: '#33993340', text: '#339933' },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Skills() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const { primaryColor } = useTheme();

    return (
        <section id="skills" className="py-28 px-6 relative">
            {/* Background accent */}
            <div
                className="absolute top-0 right-0 w-1/2 h-1/2 pointer-events-none opacity-10 blur-3xl"
                style={{ background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)` }}
            />

            <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="max-w-[1400px] mx-auto px-8 md:px-12"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="mb-16">
                    <span className="section-label mb-3 block">02 — Skills</span>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tight">My Tech Stack</h2>
                    <p className="text-slate-300 mt-5 text-lg max-w-lg leading-relaxed">
                        A blend of languages, frameworks, and AI tools I've been sharpening.
                    </p>
                </motion.div>

                {/* Tech pill cards */}
                <motion.div
                    variants={containerVariants}
                    className="flex flex-wrap gap-3 mb-14"
                >
                    {TECH_ICONS.map(({ label, bg, border, text }) => (
                        <motion.span
                            key={label}
                            variants={cardVariants}
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="px-6 py-3 rounded-full text-base font-bold border cursor-default glass-panel animate-floating"
                            style={{
                                background: bg,
                                borderColor: border,
                                color: text,
                                animationDelay: `${Math.random() * 2}s` // Stagger the floating animation
                            }}
                        >
                            {label}
                        </motion.span>
                    ))}
                </motion.div>

                {/* Skill bars */}
                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                >
                    {SKILLS.map(({ name, level, category, icon }, i) => (
                        <motion.div
                            key={name}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, x: 5 }}
                            className="glass-card p-6 group transition-all duration-300 relative overflow-hidden"
                            style={{ boxShadow: `0 4px 20px -5px ${primaryColor}20` }}
                        >
                            {/* Hover background glow */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{ background: `radial-gradient(circle at 100% 50%, ${primaryColor}15, transparent 60%)` }} />
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl pt-1 drop-shadow-lg">{icon}</span>
                                    <div>
                                        <span className="text-lg font-bold text-white tracking-wide">{name}</span>
                                        <span className="block text-sm font-medium text-slate-400 mt-0.5">{category}</span>
                                    </div>
                                </div>
                                <span className="text-sm font-bold" style={{ color: primaryColor }}>{level}%</span>
                            </div>
                            {/* Progress bar */}
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{ background: `linear-gradient(90deg, #0066AE, ${primaryColor})` }}
                                    initial={{ width: 0 }}
                                    animate={inView ? { width: `${level}%` } : { width: 0 }}
                                    transition={{ duration: 1, delay: 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
