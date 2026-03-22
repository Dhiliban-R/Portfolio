import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 glassmorphism rounded-3xl border-red-500/20 text-center">
          <h2 className="text-xl font-black text-white mb-2">Something went sideways! 🧠💨</h2>
          <p className="text-sm text-slate-400 mb-4">Arthur is rebooting this section...</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all"
          >
            Reload App
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
