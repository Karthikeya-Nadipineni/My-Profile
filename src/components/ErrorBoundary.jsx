import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#020704',
          color: '#f0fdf4',
          fontFamily: 'system-ui, sans-serif',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '500px',
            background: 'rgba(5, 18, 9, 0.9)',
            border: '1px solid rgba(0, 255, 102, 0.25)',
            borderRadius: '1rem',
            padding: '2.5rem',
            boxShadow: '0 0 40px rgba(0, 255, 102, 0.15)'
          }}>
            <h2 style={{ color: '#00ff66', marginBottom: '1rem', fontSize: '1.5rem' }}>
              System Alert
            </h2>
            <p style={{ color: '#a7f3d0', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              A graphics or runtime error occurred while loading this page.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: 'linear-gradient(135deg, #00e85a, #39ff14)',
                border: 'none',
                color: '#020704',
                fontWeight: '700',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              Reload Interface
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
