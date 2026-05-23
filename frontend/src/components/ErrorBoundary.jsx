import React, { Component } from 'react';

// A premium looking error boundary with glassmorphism styling
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You could log the error to an external service here.
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl shadow-2xl p-8 max-w-md text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Something went wrong</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We encountered an unexpected problem. Please refresh the page or try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#c5a059] hover:bg-[#d4b574] text-white rounded-lg transition-colors"
            >
              Reload
            </button>
            {/* Optional: show error details for debugging */}
            {this.state.errorInfo && (
              <details className="mt-4 text-left whitespace-pre-wrap text-xs text-gray-500 dark:text-gray-400">
                {this.state.errorInfo.componentStack}
              </details>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
