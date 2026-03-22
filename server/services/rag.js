/**
<<<<<<< HEAD
 * RAG service synchronized with Dhiliban's official resume.
 */

const RESUME_CHUNKS = [
  {
    category: 'Experience',
    keywords: ['experience', 'work', 'job', 'intern', 'ideal', 'formatic'],
    content: "WORK EXPERIENCE: Web Development Intern at Ideal Formatic Group of Companies (Salem, TN — Jun 2025). Developed responsive web interfaces using HTML, CSS, and JavaScript. Integrated MongoDB for application data storage and optimized common queries. Participated in code reviews and QA processes to improve code quality."
  },
  {
    category: 'Projects',
    keywords: ['projects', 'lockedfi', 'defi', 'zk', 'smart vaults', 'food donation', 'navigation'],
    content: "PROJECTS: 1. LockedFI (Present): Privacy-Preserving ZK-Income Attestation & AI-Governed Smart Vaults. Utilizes Zero-Knowledge Proofs (ZK-Email/DKIM) for privacy and an AI-driven 'Guardian' layer with ERC-4337 Smart Vaults for secure asset management. 2. Food Donation Management System (Apr-May 2025): Full-stack application supporting real-time donor-recipient matching and geolocation tracking using Firebase Realtime Database."
  },
  {
    category: 'Skills',
    keywords: ['skills', 'stack', 'tech', 'react', 'node', 'java', 'sql', 'firebase', 'mongo', 'linux', 'ai', 'zk-proofs'],
    content: "TECHNICAL SKILLS: Proficient in JavaScript, React.js, Node.js, Firebase, MySQL, and MongoDB. Languages include C, Java, and SQL. Specialized in AI Standard Skills & Integration, ZK-Proofs, and Technical Documentation. Skilled with Linux, Git/GitHub, and design tools like Figma/Canva."
  },
  {
    category: 'Achievements',
    keywords: ['achievements', 'leadership', 'nss', 'incharge', 'internships'],
    content: "LEADERSHIP & ACHIEVEMENTS: NSS Incharge at Government College of Engineering, Salem (2024-Present). Spearheaded high-impact community outreach programs and led technical workshops. Completed 2+ internships in web development and delivered production-ready features. Built multiple full-stack projects using modern web technologies."
  },
  {
    category: 'Education',
    keywords: ['education', 'college', 'gce', 'salem', 'study', 'cgpa', 'coursework'],
    content: "EDUCATION: Bachelor of Engineering, Computer Science and Engineering at Government College of Engineering, Salem (Expected May 2026). CGPA: 7.0/10.0. Relevant coursework: Data Structures & Algorithms, Java Programming, Database Management, Web Technologies."
  },
  {
    category: 'Personal',
    keywords: ['who', 'about', 'dhiliban', 'location', 'contact', 'email', 'linkedin'],
    content: "ABOUT DHILIBAN R: A Computer Science undergraduate focused on building full-stack web applications. Based in Kallakurichi, Tamil Nadu. Email: dhilipanrc@gmail.com. LinkedIn: linkedin.com/in/dhilibanr. GitHub: github.com/Dhiliban-R."
  }
];

export function searchResume(query) {
  const q = query.toLowerCase();
  
  const scoredChunks = RESUME_CHUNKS.map(chunk => {
    let matches = 0;
    chunk.keywords.forEach(kw => {
      if (q.includes(kw)) matches += 1;
    });
    
    let score = matches;
    if (score > 0) {
      if (chunk.category === 'Achievements') score += 5;
      if (chunk.category === 'Experience') score += 3;
      if (chunk.category === 'Projects') score += 4;
    }
    
    return { ...chunk, score };
  });

  const matches = scoredChunks
    .filter(chunk => chunk.score > 0)
    .sort((a, b) => b.score - a.score);

  if (matches.length === 0) {
    return RESUME_CHUNKS.filter(c => ['Achievements', 'Experience', 'Projects'].includes(c.category))
      .map(c => c.content).join("\\n\\n");
  }

  return matches.slice(0, 3).map(c => c.content).join("\\n\\n");
=======
 * Mock RAG service simulating Pinecone vector search against Dhiliban's resume data.
 * Prioritizes specific achievements and includes comprehensive resume context.
 * In production, replace with actual Pinecone embeddings + queries.
 */

const RESUME_DATA = {
    achievements: {
        keywords: ['achieve', 'award', 'lead', 'nss', 'incharge', 'volunteer', 'social', 'accomplishment', 'extracurricular'],
        priority: 10,
        content: `KEY ACHIEVEMENTS:
- NSS (National Service Scheme) Incharge at Government College of Engineering, Salem — Led community initiatives, organized technical workshops for student volunteers.
- 2+ Internships completed — Professional web development experience at Ideal Formatic Group of Companies.
- Built 3 production-grade full-stack projects: Food Donation Platform, Hotel Management System, and Arthur AI Chatbot.`,
    },
    experience: {
        keywords: ['experience', 'work', 'job', 'intern', 'company', 'ideal', 'formatic', 'internship', 'professional'],
        priority: 9,
        content: `WORK EXPERIENCE:
- Web Development Intern, Ideal Formatic Group of Companies (Salem, TN — Jun 2025)
  • Developed responsive web interfaces using HTML, CSS and JavaScript.
  • Integrated MongoDB for application data storage and optimized common queries.
  • Participated in code reviews and QA processes to improve code quality.`,
    },
    projects: {
        keywords: ['project', 'built', 'lockedfi', 'defi', 'zk', 'crypto', 'food', 'donation', 'hotel', 'portfolio', 'arthur', 'chatbot', 'ai'],
        priority: 8,
        content: `PROJECTS:
- LockedFI (Present) — Final year project bridging real-world income to decentralized finance (DeFi) using Zero-Knowledge Proofs (ZK-Proofs) and Agentic AI.
- Modern AI Portfolio & Arthur Chatbot (2025) — This immersive portfolio built with React, featuring a custom Groq-powered AI chatbot (Llama 3.3) with RAG memory, SSE streaming, and Telegram integration.
- Food Donation Management System with Real-Time Navigation (Apr–May 2025) — Full-stack app (React, Firebase) supporting real-time donor-recipient matching and tracking.
- Hotel Management System (Jun 2025) — Booking and billing platform with admin dashboard.`,
    },
    skills: {
        keywords: ['skill', 'tech', 'stack', 'language', 'know', 'proficien', 'react', 'node', 'java', 'javascript', 'c ', 'rust', 'sql', 'code', 'firebase', 'mongo', 'linux', 'arch', 'fedora', 'ai', 'bash', 'script', 'autom', 'deploy'],
        priority: 7,
        content: `TECHNICAL SKILLS & ENVIRONMENT:
- Languages: JavaScript, Java, C, SQL, HTML, CSS, Bash
- Currently Learning: Rust (to understand memory management like stacks vs heaps and achieve better performance than C).
- Frameworks / Libraries: React.js, Node.js
- Databases: MySQL, Firebase, MongoDB
- Operating Systems & Automation: Arch Linux (built from scratch with Hyprland), Fedora. I daily-drive Linux and leverage Bash scripting heavily to automate deployments and manage backend services.
- Tools: Git, GitHub, Figma
- Workflow: Highly proficient in using AI tools to accelerate daily workflow and solve complex problems.`,
    },
    education: {
        keywords: ['education', 'study', 'college', 'university', 'degree', 'gce', 'salem', 'undergrad', 'cs', 'engineering', 'learn'],
        priority: 6,
        content: `EDUCATION:
- Bachelor of Engineering, Computer Science and Engineering (Expected May 2026)
- Government College of Engineering, Salem
- CGPA: 7.0/10.0
- Relevant coursework: Data Structures & Algorithms, Java Programming, Database Management, Web Technologies`,
    },
    certifications: {
        keywords: ['cert', 'certificate', 'forage', 'scalar', 'course', 'credential', 'ea', 'electronic', 'solid'],
        priority: 5,
        content: `CERTIFICATIONS:
- Software Engineering Job Simulation — Electronic Arts via Forage (Apr 2025)
- JavaScript Programming Specialization — Scalar Topics (May 2024)
- SOLID Principles Masterclass — Scalar Topics (May 2024)`,
    },
    leadership: {
        keywords: ['lead', 'leadership', 'manage', 'team', 'organize', 'community', 'nss', 'service', 'social', 'volunteer'],
        priority: 9,
        content: `LEADERSHIP & ACTIVITIES:
- NSS Incharge, Government College of Engineering, Salem (2024–Present)
  • Led community initiatives and organized technical workshops for student volunteers.
  • Demonstrated strong organizational, communication, and team-building abilities.`,
    },
    personal: {
        keywords: ['who', 'about', 'dhiliban', 'name', 'person', 'himself', 'him', 'contact', 'reach', 'email', 'interest', 'hobby', 'fun', 'os', 'arch', 'fedora', 'rust', 'ai'],
        priority: 4,
        content: `ABOUT DHILIBAN RAJA:
- Full name: Dhiliban Raja
- Location: Kallakurichi, Tamil Nadu
- Email: dhilipanrc@gmail.com
- LinkedIn: linkedin.com/in/dhilibanraja
- GitHub: github.com/Dhiliban-R
- Role: B.E. CSE Undergraduate, Full-Stack Developer, NSS Incharge
- System Environment: Arch Linux with Hyprland (built from scratch). Daily drives Fedora and Arch. Highly proficient with AI tools.
- Fun fact: He built his own AI chatbot named Arthur (that's me! 😎) and integrated it into his React portfolio.`,
    },
};

/**
 * Simulate a Pinecone vector search by keyword matching against resume data.
 * Priority scoring ensures achievements and experience surface first.
 */
export function searchResume(query) {
    const q = query.toLowerCase();
    const matches = [];

    for (const [section, data] of Object.entries(RESUME_DATA)) {
        const keywordScore = data.keywords.reduce((acc, kw) => {
            return acc + (q.includes(kw) ? 1 : 0);
        }, 0);

        if (keywordScore > 0) {
            const weightedScore = keywordScore * (data.priority / 10);
            matches.push({ section, score: weightedScore, content: data.content });
        }
    }

    matches.sort((a, b) => b.score - a.score);
    const topMatches = matches.slice(0, 3);

    if (topMatches.length === 0) {
        return `${RESUME_DATA.achievements.content}\n\n${RESUME_DATA.personal.content}\n\n${RESUME_DATA.skills.content}`;
    }

    return topMatches.map((m) => m.content).join('\n\n');
>>>>>>> d1e5d6de0499b1145bc1811f366b5315801d1d3c
}
