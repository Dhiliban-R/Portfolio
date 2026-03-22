import React, { useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import { About, Skills, Projects, Certifications, Contact } from './components/Sections';
import Footer from './components/Footer';
import ArthurShell from './components/ArthurShell';
import ErrorBoundary from './components/ErrorBoundary';

function AppContent() {
  const { updateTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollPercent = (scrollY / (docHeight - windowHeight)) * 100;

      // Logic: Start Blue (#0066AE), transition to Green (#14E885) at Skills/Projects, back to Blue at Contact
      if (scrollPercent < 25) {
        updateTheme('#0066AE'); // Home/About -> Blue
      } else if (scrollPercent >= 25 && scrollPercent < 75) {
        updateTheme('#14E885'); // Skills/Projects -> Green
      } else {
        updateTheme('#0066AE'); // Certs/Contact -> Blue
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateTheme]);

  return (
    <div className="relative min-h-screen">
      <Header />
      <main>
        <ErrorBoundary><Hero /></ErrorBoundary>
        <ErrorBoundary><About /></ErrorBoundary>
        <ErrorBoundary><Skills /></ErrorBoundary>
        <ErrorBoundary><Projects /></ErrorBoundary>
        <ErrorBoundary><Certifications /></ErrorBoundary>
        <ErrorBoundary><Contact /></ErrorBoundary>
      </main>
      <Footer />
      <ErrorBoundary><ArthurShell /></ErrorBoundary>
      
      {/* Global Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20 transition-colors duration-1000"
           style={{ background: `radial-gradient(circle at 50% 50%, var(--theme-color) 0%, transparent 70%)` }} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
