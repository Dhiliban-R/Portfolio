import React from 'react';

export default class ErrorBoundary extends React.Component {
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
        <div className="p-8 text-center glassmorphism rounded-2xl border-red-500/20 m-4">
          <h2 className="text-xl font-bold text-white mb-2">Something went wrong.</h2>
          <p className="text-sm text-slate-400">Please refresh the page or contact support if the issue persists.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
