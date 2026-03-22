/**
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
}
