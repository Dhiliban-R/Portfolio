import React from 'react';
import { motion } from 'framer-motion';

const SectionWrapper = ({ id, children, title, subtitle }) => (
  <section id={id} className="py-20 md:py-32 container mx-auto px-6 relative">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mb-12 md:mb-20"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px w-8 bg-[var(--theme-color)] opacity-50" />
        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[var(--theme-color)]">
          {subtitle || id}
        </span>
      </div>
      <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
        {title}
      </h2>
    </motion.div>
    {children}
  </section>
);

export const About = () => (
  <SectionWrapper id="about" title="Engineering with Purpose" subtitle="About Me">
    <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-start">
      <div className="space-y-6 text-base md:text-lg text-slate-400 leading-relaxed">
        <p>
          I'm <span className="text-white font-semibold">Dhiliban R</span>, a Computer Science undergraduate at <span className="text-white">Government College of Engineering, Salem</span>. I specialize in building full-stack applications that are not only functional but also scalable and user-centric.
        </p>
        <p>
          Currently, I am deeply involved in exploring <span className="text-white">Agentic AI</span> and <span className="text-white">Zero-Knowledge Proofs</span>. My goal is to bridge the gap between complex backend systems and intuitive frontend experiences.
        </p>
        <div className="grid grid-cols-3 gap-8 pt-6 border-t border-white/5">
          <div>
            <div className="text-2xl font-bold text-white mb-1">7.0</div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">CGPA</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white mb-1">10+</div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Projects</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white mb-1">2+</div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Internships</div>
          </div>
        </div>
      </div>
      
      <div className="relative glassmorphism rounded-2xl p-8 border-white/5 overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--theme-color)] opacity-10 blur-3xl -mr-16 -mt-16 group-hover:opacity-20 transition-opacity" />
        <h3 className="text-xs uppercase font-black text-slate-500 tracking-widest mb-6">Education</h3>
        <div className="space-y-4">
          <div>
            <div className="text-white font-bold text-lg leading-tight">Bachelor of Engineering</div>
            <div className="text-sm text-slate-400 mt-1">Computer Science and Engineering</div>
            <div className="text-[var(--theme-color)] font-bold text-[10px] uppercase mt-2">GCE Salem • 2022 - 2026</div>
          </div>
          <div className="pt-4 border-t border-white/5">
            <div className="text-[10px] uppercase font-bold text-slate-500 mb-2">Relevant Coursework</div>
            <div className="flex flex-wrap gap-2">
              {['DSA', 'Java', 'DBMS', 'Web Tech'].map(tag => (
                <span key={tag} className="px-2 py-1 rounded-md bg-white/5 text-[9px] text-slate-400 border border-white/5 font-bold uppercase">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </SectionWrapper>
);

const SKILL_CATEGORIES = [
  {
    title: 'Development',
    skills: ['JavaScript (ES6+)', 'React.js', 'Node.js', 'HTML/CSS']
  },
  {
    title: 'Languages & DB',
    skills: ['C', 'Java', 'SQL', 'MySQL', 'MongoDB', 'Firebase']
  },
  {
    title: 'Advanced Tech',
    skills: ['Agentic AI', 'ZK-Proofs', 'DeFi Protocols', 'Smart Contracts']
  },
  {
    title: 'Tools & Others',
    skills: ['Linux', 'Git/GitHub', 'Figma/Canva', 'Tech Documentation']
  }
];

export const Skills = () => (
  <SectionWrapper id="skills" title="Technical Proficiency" subtitle="Arsenal">
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {SKILL_CATEGORIES.map((category, i) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="p-8 glassmorphism rounded-2xl border-white/5 hover:border-[var(--theme-color)]/20 transition-all group"
        >
          <h3 className="text-[10px] font-black text-slate-500 mb-6 uppercase tracking-widest group-hover:text-[var(--theme-color)] transition-colors">
            {category.title}
          </h3>
          <ul className="space-y-4">
            {category.skills.map(skill => (
              <li key={skill} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-color)] opacity-40" />
                <span className="text-sm font-medium text-slate-300">{skill}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);

const PROJECTS = [
  {
    title: 'LockedFI',
    description: "Privacy-Preserving ZK-Income Attestation & AI-Governed Smart Vaults. Bridging off-chain identity with on-chain execution using ZK-Email and DKIM proofs.",
    tags: ['Web3', 'ZK-Proofs', 'ERC-4337', 'Smart Contracts', 'AI Integration'],
    link: '#'
  },
  {
    title: 'Food Donation System',
    description: 'Full-stack application for real-time donor-recipient matching. Features geolocation tracking and real-time updates via Firebase.',
    tags: ['React', 'Firebase', 'Geolocation', 'Real-time'],
    link: '#'
  },
  {
    title: 'Arthur AI Chatbot',
    description: 'Custom AI companion using Groq & RAG to provide interactive resume insights and lead generation with Telegram integration.',
    tags: ['LLMs', 'Node.js', 'RAG', 'Vector DB'],
    link: '#'
  },
  {
    title: 'Admin Dashboard',
    description: 'Comprehensive management engine focused on relational data integrity and efficient administrative workflows.',
    tags: ['MySQL', 'Express', 'Auth', 'Rest API'],
    link: '#'
  }
];

export const Projects = () => (
  <SectionWrapper id="projects" title="Built with Innovation" subtitle="Selected Projects">
    <div className="grid md:grid-cols-2 gap-8">
      {PROJECTS.map((project, i) => (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="group p-8 rounded-3xl glassmorphism border-white/5 hover:border-[var(--theme-color)]/20 transition-all flex flex-col h-full"
        >
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(tag => (
              <span key={tag} className="px-2 py-1 rounded-md bg-white/5 text-[9px] font-bold text-slate-400 uppercase border border-white/5 tracking-wider">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[var(--theme-color)] transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-8 flex-1">
            {project.description}
          </p>
          <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
             <button className="text-[10px] font-bold uppercase tracking-widest text-white hover:text-[var(--theme-color)] transition-colors">
               Case Study →
             </button>
             <div className="flex gap-4">
                <span className="w-8 h-8 rounded-lg glassmorphism border-white/5 flex items-center justify-center text-xs opacity-50 cursor-not-allowed">GitHub</span>
                <span className="w-8 h-8 rounded-lg glassmorphism border-white/5 flex items-center justify-center text-xs opacity-50 cursor-not-allowed">Live</span>
             </div>
          </div>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);

const CERTS = [
  { name: 'JavaScript Programming Specialization', org: 'Scalar Topics', date: 'May 2024' },
  { name: 'SOLID Principles Masterclass', org: 'Scalar Topics', date: 'May 2024' },
  { name: 'Software Engineering Job Simulation', org: 'Electronic Arts (EA)', date: 'Apr 2025' },
];

export const Certifications = () => (
  <SectionWrapper id="certifications" title="Verified Expertise" subtitle="Credentials">
    <div className="grid md:grid-cols-3 gap-6">
      {CERTS.map((cert, i) => (
        <motion.div
          key={cert.name}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="p-6 glassmorphism rounded-2xl border-white/5 hover:bg-white/5 transition-all"
        >
          <div className="text-2xl mb-4">📜</div>
          <h3 className="text-base font-bold text-white mb-2 leading-tight">{cert.name}</h3>
          <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--theme-color)] mb-1">{cert.org}</div>
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{cert.date}</div>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);

export const Contact = () => (
  <SectionWrapper id="contact" title="Get in Touch" subtitle="Connection">
    <div className="max-w-4xl">
      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-8">
          <p className="text-lg text-slate-400 leading-relaxed">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl glassmorphism flex items-center justify-center border-white/5 group-hover:border-[var(--theme-color)]/20 transition-all">📧</div>
              <div className="text-white font-medium">dhilipanrc@gmail.com</div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl glassmorphism flex items-center justify-center border-white/5 group-hover:border-[var(--theme-color)]/20 transition-all">📍</div>
              <div className="text-white font-medium">Kallakurichi, Tamil Nadu</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
           <div className="space-y-2">
             <label className="text-[10px] uppercase tracking-widest font-black text-slate-500">Full Name</label>
             <input className="w-full bg-white/5 border border-white/5 p-4 rounded-xl outline-none focus:border-[var(--theme-color)]/30 transition-all text-sm text-white" placeholder="John Doe" />
           </div>
           <div className="space-y-2">
             <label className="text-[10px] uppercase tracking-widest font-black text-slate-500">Message</label>
             <textarea className="w-full bg-white/5 border border-white/5 p-4 rounded-xl outline-none focus:border-[var(--theme-color)]/30 transition-all text-sm text-white h-32 resize-none" placeholder="Hey, let's work together!" />
           </div>
           <button className="px-8 py-4 bg-[var(--theme-color)] text-white text-xs font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[var(--theme-color)]/20">
             Send Message
           </button>
        </div>
      </div>
    </div>
  </SectionWrapper>
);

