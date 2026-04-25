import React, { useState, useEffect, Component, ReactNode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { motion, AnimatePresence } from 'framer-motion';
import { AIProvider } from './contexts/AIContext';
import { AuthProvider } from './contexts/AuthContext';

const AppWrapper = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#e0e5ec] flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
              className="font-serif text-3xl text-lux-text italic tracking-wide"
            >
              KaizenStat.
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {!loading && (
        <AuthProvider>
          <AIProvider>
            <Suspense fallback={<div className="min-h-screen bg-[#F0F4F8]" />}>
              <RouterProvider router={router} />
            </Suspense>
          </AIProvider>
        </AuthProvider>
      )}
    </>
  );
};

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-[500] flex items-center justify-center bg-[#e0e5ec] text-lux-text p-4 text-center">
          <div className="max-w-md">
            <h1 className="text-3xl font-serif mb-4">Something went wrong.</h1>
            <p className="text-base opacity-70 mb-8">An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-lux-text text-lux-cream rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppWrapper />
    </ErrorBoundary>
  </React.StrictMode>
);
