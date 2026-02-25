import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const STATS = [
    { value: '3+', label: 'Projects Built' },
    { value: '2+', label: 'Internships' },
    { value: '3', label: 'Certifications' },
    { value: 'AI', label: 'Workflow' },
];

export default function About() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const { primaryColor } = useTheme();

    return (
        <section id="about" className="py-28 px-6 relative overflow-hidden">
            {/* Subtle grid background */}
            <div className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                    backgroundImage: `radial-gradient(${primaryColor}15 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="max-w-[1400px] mx-auto px-8 md:px-12"
            >
                {/* Section header */}
                <motion.div variants={itemVariants} className="mb-16">
                    <span className="section-label mb-3 block">01 — About</span>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tight">Who am I?</h2>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-16 items-start justify-between">
                    {/* Text content */}
                    <div className="space-y-6 w-full lg:w-7/12">
                        <motion.p variants={itemVariants} className="text-slate-300 text-xl leading-relaxed">
                            I am a <strong className="text-white font-bold">Full-Stack Developer</strong> specializing in building comprehensive web applications using React.js, Node.js, and Firebase.
                        </motion.p>
                        <motion.p variants={itemVariants} className="text-slate-300 text-lg leading-relaxed">
                            Currently pursuing my B.E. in Computer Science at <span style={{ color: primaryColor }} className="font-bold transition-colors duration-500">Government College of Engineering, Salem</span>. I focus on developing scalable architecture and writing clean, maintainable code for production environments.
                        </motion.p>
                        <motion.p variants={itemVariants} className="text-slate-300 text-lg leading-relaxed">
                            My development workflow is heavily augmented by AI tooling, leveraging platforms like <strong className="text-white">Cursor, GitHub Copilot, and Claude/Groq LLMs</strong> to drastically accelerate prototyping and debugging. Concurrently, protecting execution performance is a priority; I am migrating learning focus toward <strong className="text-white">Rust</strong> for memory-safe systems engineering.
                        </motion.p>
                        <motion.p variants={itemVariants} className="text-slate-300 text-lg leading-relaxed">
                            <strong className="text-white">Beyond the Code:</strong> I possess deep systems knowledge through daily-driving custom Linux environments (Arch/Hyprland), demonstrating strong OS-level troubleshooting capabilities. I also exercise leadership and event management through my role as an active NSS Incharge.
                        </motion.p>

                        {/* Links */}
                        <motion.div variants={itemVariants} className="flex gap-4 pt-4">
                            {[
                                { label: 'GitHub', href: 'https://github.com/Dhiliban-R' },
                                { label: 'LinkedIn', href: 'https://linkedin.com/in/dhilibanraja' },
                                { label: 'Resume', href: '/resume.pdf' },
                            ].map(({ label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2.5 rounded-lg text-sm font-medium border transition-all duration-300 hover:scale-105"
                                    style={{ borderColor: `${primaryColor}50`, color: primaryColor, background: `${primaryColor}10` }}
                                >
                                    {label} ↗
                                </a>
                            ))}
                        </motion.div>
                    </div>

                    {/* Stats grid */}
                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-2 gap-6 w-full lg:w-5/12"
                    >
                        {STATS.map(({ value, label }, i) => (
                            <motion.div
                                key={label}
                                variants={itemVariants}
                                whileHover={{ scale: 1.08, y: -8, boxShadow: `0 20px 40px -10px ${primaryColor}40`, borderColor: `${primaryColor}80` }}
                                className="glass-card p-6 text-center relative overflow-hidden group"
                                style={{ transitionDelay: `${i * 0.05}s` }}
                            >
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ background: `radial-gradient(circle at center, ${primaryColor}12, transparent 70%)` }}
                                />
                                <span
                                    className="block text-4xl font-bold mb-2 transition-colors duration-500"
                                    style={{ color: primaryColor }}
                                >
                                    {value}
                                </span>
                                <span className="text-sm text-slate-400">{label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
