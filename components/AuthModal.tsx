
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Sparkles, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signInWithEmail, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmail(email);
      setSent(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send magic link');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Failed to initialize Google login');
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 md:p-10 pt-12">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-16 h-16 rounded-3xl bg-brand-purple/10 flex items-center justify-center mb-4 border border-brand-purple/20">
                  <Sparkles className="w-8 h-8 text-brand-purple" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome to KaizenStat
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {sent ? "Check your inbox to continue" : "Join our community of learners and professionals"}
                </p>
              </div>

              {!sent ? (
                <div className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-purple transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 focus:border-brand-purple/50 focus:ring-4 focus:ring-brand-purple/5 outline-none transition-all text-gray-900 dark:text-white"
                      />
                    </div>
                    
                    {error && (
                      <p className="text-xs text-red-500 px-2">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-2xl bg-lux-text dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Get Magic Link"}
                      {!loading && <ArrowRight className="w-4 h-4" />}
                    </button>
                  </form>

                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-gray-100 dark:border-white/10"></div>
                    <span className="flex-shrink mx-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">or</span>
                    <div className="flex-grow border-t border-gray-100 dark:border-white/10"></div>
                  </div>

                  <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full py-4 rounded-2xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-3 group"
                  >
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-300">Continue with Google</span>
                  </button>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 rounded-3xl p-6 text-center"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-bold text-green-800 dark:text-green-400 mb-2">Magic Link Sent!</h3>
                  <p className="text-sm text-green-700 dark:text-green-500/80 mb-6">
                    We've sent a login link to <strong>{email}</strong>. Please check your email and click the link to sign in.
                  </p>
                  <button 
                    onClick={() => setSent(false)}
                    className="text-xs font-bold uppercase tracking-widest text-green-800 dark:text-green-400 hover:underline"
                  >
                    Use a different email
                  </button>
                </motion.div>
              )}

              <p className="mt-8 text-center text-[10px] text-gray-400 leading-relaxed uppercase tracking-[0.05em]">
                By continuing, you agree to our <br />
                <a href="/terms" className="text-gray-900 dark:text-white hover:underline">Terms of Service</a> & <a href="/privacy" className="text-gray-900 dark:text-white hover:underline">Privacy Policy</a>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
