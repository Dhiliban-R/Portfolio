import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Arthur from './components/Arthur';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <div className="relative min-h-screen" style={{ backgroundColor: '#060b14' }}>
          <Header />
          <main>
            <ErrorBoundary>
              <Hero />
            </ErrorBoundary>
            <ErrorBoundary>
              <About />
            </ErrorBoundary>
            <ErrorBoundary>
              <Skills />
            </ErrorBoundary>
            <ErrorBoundary>
              <Projects />
            </ErrorBoundary>
            <ErrorBoundary>
              <Certifications />
            </ErrorBoundary>
            <ErrorBoundary>
              <Contact />
            </ErrorBoundary>
          </main>
          <Footer />
          <ErrorBoundary>
            <Arthur />
          </ErrorBoundary>
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
