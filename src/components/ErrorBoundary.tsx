import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { logError } from '../utils/errors';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-monks-light-gray flex items-center justify-center px-6">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <AlertTriangle size={32} className="text-red-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-monks-black mb-4">
              Something went wrong
            </h1>
            
            <p className="text-monks-gray mb-8 leading-relaxed">
              We're sorry, but something unexpected happened. Our team has been notified 
              and is working to fix the issue.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 flex items-center justify-center gap-2"
              >
                <RefreshCw size={16} />
                Try Again
              </button>
              
              <Link
                to="/"
                className="w-full border border-monks-gray text-monks-gray px-6 py-3 rounded-full font-medium hover:border-monks-black hover:text-monks-black transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Home size={16} />
                Go Home
              </Link>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-monks-gray hover:text-monks-black">
                  Error Details (Development)
                </summary>
                <pre className="mt-4 p-4 bg-red-50 rounded-lg text-sm text-red-800 overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}