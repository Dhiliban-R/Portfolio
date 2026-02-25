<div align="center">
  <img src="public/favicon.svg" alt="Logo" width="80" height="80">
  <h1 align="center">Modern Developer Portfolio & AI Chatbot</h1>

  <p align="center">
    An immersive, high-performance portfolio built with React & Framer Motion.<br />
    Features a custom Llama 3.3 AI Chatbot (Arthur) with RAG Memory and Lead Generation.
    <br />
    <br />
    <a href="#features"><strong>Explore Features »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Dhiliban-R">GitHub</a>
    ·
    <a href="https://linkedin.com/in/dhilibanraja">LinkedIn</a>
  </p>
</div>

---

## 🚀 Overview

This repository houses my personal developer portfolio, designed to be more than just a digital resume. It is a fully interactive experience showcasing my skills in **Full-Stack Development, React, UI/UX Design**, and **Agentic AI**.

At the core of this portfolio is **Arthur 😎**, a custom-built AI chatbot that knows my entire resume. Arthur can answer recruiter questions, stream responses in real-time using Server-Sent Events (SSE), and capture visitor leads directly into a Telegram bot.

## ✨ Key Features

### 🎨 Frontend (The Experience)

- **Immersive Glassmorphism UI**: High-end CSS styling with deep blurs, tailored box-shadows, and smooth gradients.
- **Adaptive Ambient Palette**: Background accents and primary colors dynamically shift based on the active section (Home, Projects, Skills, Contact).
- **Framer Motion Animations**: Flawless enter/exit animations, scroll-triggered reveals, and micro-interactions across the board.
- **Responsive Design**: Built Mobile-first using Tailwind CSS v4, perfectly optimized for desktop, tablet, and mobile viewing.
- **React Error Boundaries**: Graceful fallback UI built-in to prevent entire app crashes upon API rate limits or render errors.

### 🧠 Backend (The 'Arthur' AI Brain)

- **Groq API & Llama 3.3 70B**: Lightning-fast inference delivering responses at >300 tokens per second.
- **Retrieval-Augmented Generation (RAG)**: A dedicated memory layer (`rag.js`) that injects my resume, projects, and skills into Arthur's context window.
- **SSE Streaming**: Real-time typing experience just like ChatGPT; no waiting for long API round-trips.
- **Lead Generation State Machine**: Arthur intelligently pivots the conversation to ask for the visitor's Name, Email, and Phone Number if they show high interest.
- **Telegram Integration**: Captured leads and contact form submissions are instantly pinged to my personal Telegram via bot callback polling.
- **Resend Email Fallback**: Automated confirmation emails sent to visitors who submit the contact form.

## 🛠️ Tech Stack

### Client

* **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: Hand-crafted SVGs + Heroicons

### Server

* **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: Express.js
- **AI Inference**: [Groq SDK](https://groq.com/)
- **Integrations**: `node-telegram-bot-api`, `resend`

## 💻 Local Setup & Installation

To get a local copy up and running, follow these steps.

### Prerequisites

* Node.js (v18+ recommended)
- A Groq API Key
- A Telegram Bot Token & Chat ID
- A Resend API Key

### Installation

1. **Clone the repo**
   \`\`\`bash
   git clone <https://github.com/Dhiliban-R/dhiliban-portfolio.git>
   cd dhiliban-portfolio
   \`\`\`

2. **Install Frontend Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Install Backend Dependencies**
   \`\`\`bash
   cd server
   npm install
   \`\`\`

4. **Environment Variables**
   Create a \`.env\` file inside the \`server/\` directory and add your keys:
   \`\`\`env
   PORT=3001
   GROQ_API_KEY="your-groq-api-key"
   TELEGRAM_BOT_TOKEN="your-telegram-bot-token"
   TELEGRAM_CHAT_ID="your-telegram-chat-id"
   RESEND_API_KEY="your-resend-api-key"
   \`\`\`

5. **Run the Development Servers**
   Open two terminal tabs.

   *Tab 1 (Backend):*
   \`\`\`bash
   cd server
   npm run dev
   \`\`\`

   *Tab 2 (Frontend):*
   \`\`\`bash

   # from the root directory

   npm run dev
   \`\`\`

6. **Build for Production**
   \`\`\`bash
   npm run build
   \`\`\`

## 👨‍💻 About The Developer

I am heavily focused on building production-ready apps using **React, Node.js, Firebase, and integrating AI workflows**. I'm currently learning Rust to master memory management and system-level performance. I daily-drive Arch Linux (built from scratch with Hyprland) and Fedora, and automate my workflow heavily utilizing AI and Bash scripts.

---
<div align="center">
  Crafted with ❤️ by Dhiliban Raja.
</div>
