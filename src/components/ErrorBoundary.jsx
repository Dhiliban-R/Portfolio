import { Component } from 'react';

/**
 * React Error Boundary — catches rendering errors, API limit crashes, etc.
 * Falls back to a styled error message instead of crashing the entire app.
 */
export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div
                    style={{
                        padding: '40px 24px',
                        textAlign: 'center',
                        color: '#f0f4ff',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '20px',
                        border: '1px solid rgba(255,255,255,0.08)',
                        margin: '20px',
                    }}
                >
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚡</div>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', marginBottom: '8px' }}>
                        Something went wrong
                    </h2>
                    <p style={{ color: '#8b9ab5', fontSize: '14px', marginBottom: '20px' }}>
                        {this.state.error?.message || 'An unexpected error occurred. Please refresh the page.'}
                    </p>
                    <button
                        onClick={() => {
                            this.setState({ hasError: false, error: null });
                            window.location.reload();
                        }}
                        style={{
                            padding: '10px 24px',
                            background: 'linear-gradient(135deg, #0066AE, #14E885)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '14px',
                        }}
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
