import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const CONTACT_INFO = [
    {
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
        label: 'Email',
        value: 'dhilipanrc@gmail.com',
        href: 'mailto:dhilipanrc@gmail.com'
    },
    {
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
        label: 'LinkedIn',
        value: 'linkedin.com/in/dhilibanraja',
        href: 'https://linkedin.com/in/dhilibanraja'
    },
    {
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>,
        label: 'GitHub',
        value: 'github.com/Dhiliban-R',
        href: 'https://github.com/Dhiliban-R'
    },
];

export default function Contact() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const { primaryColor } = useTheme();
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 4000);
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" className="py-28 px-6 relative overflow-hidden">
            <div
                className="absolute top-0 right-0 w-1/3 h-1/2 pointer-events-none opacity-10 blur-3xl"
                style={{ background: `radial-gradient(circle, ${primaryColor}, transparent)` }}
            />

            <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={containerVariants}
                className="max-w-6xl mx-auto"
            >
                <motion.div variants={itemVariants} className="mb-16">
                    <span className="section-label mb-3 block">05 — Contact</span>
                    <h2 className="text-4xl md:text-5xl font-bold">Let's Connect</h2>
                    <p className="text-slate-400 mt-4 max-w-lg">
                        Got a project in mind? Want to collaborate? Or just say hi? I'm all ears. 👂
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* Contact info */}
                    <motion.div variants={containerVariants} className="lg:col-span-2 space-y-5">
                        {CONTACT_INFO.map(({ icon, label, value, href }) => (
                            <motion.a
                                key={label}
                                href={href}
                                variants={itemVariants}
                                whileHover={{ x: 6, scale: 1.02 }}
                                className="flex items-center gap-4 glass-card p-5 group"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-all duration-300"
                                    style={{ background: `${primaryColor}15`, border: `1px solid ${primaryColor}30` }}
                                >
                                    {icon}
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 mb-0.5">{label}</div>
                                    <div className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                                        {value}
                                    </div>
                                </div>
                                <span className="ml-auto text-slate-600 group-hover:text-slate-300 transition-colors text-lg">↗</span>
                            </motion.a>
                        ))}

                        <motion.div variants={itemVariants} className="glass-card p-6 mt-6">
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Or try chatting with{' '}
                                <strong style={{ color: primaryColor }}>Arthur 😎</strong>{' '}
                                — my AI buddy who knows everything about me!
                                Click the panel on the right →
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Contact form */}
                    <motion.form
                        variants={itemVariants}
                        onSubmit={handleSubmit}
                        className="lg:col-span-3 glass-card p-8 space-y-5"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {['name', 'email'].map((field) => (
                                <div key={field}>
                                    <label className="block text-xs font-semibold text-slate-400 mb-2 capitalize">
                                        {field}
                                    </label>
                                    <input
                                        type={field === 'email' ? 'email' : 'text'}
                                        value={form[field]}
                                        onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                                        required
                                        placeholder={field === 'name' ? 'Your name' : 'you@example.com'}
                                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
                                        style={{
                                            background: 'rgba(255,255,255,0.04)',
                                            border: `1px solid rgba(255,255,255,0.08)`,
                                        }}
                                        onFocus={(e) => (e.target.style.borderColor = `${primaryColor}60`)}
                                        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                                    />
                                </div>
                            ))}
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-2">Message</label>
                            <textarea
                                rows={5}
                                value={form.message}
                                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                                required
                                placeholder="What's on your mind?"
                                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 outline-none resize-none transition-all duration-200"
                                style={{
                                    background: 'rgba(255,255,255,0.04)',
                                    border: `1px solid rgba(255,255,255,0.08)`,
                                }}
                                onFocus={(e) => (e.target.style.borderColor = `${primaryColor}60`)}
                                onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                            />
                        </div>
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-300"
                            style={{
                                background: sent
                                    ? 'linear-gradient(135deg, #14E885, #0bcc70)'
                                    : `linear-gradient(135deg, #0066AE, ${primaryColor})`,
                            }}
                        >
                            {sent ? '✅ Message Sent!' : 'Send Message →'}
                        </motion.button>
                    </motion.form>
                </div>
            </motion.div>
        </section>
    );
}
