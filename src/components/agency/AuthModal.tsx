import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAgencyAuth } from '../../context/AgencyAuthContext';
import { Logo } from '../ui/Logo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signInWithEmail } = useAgencyAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmail(email);
      setSent(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send magic link. Please try again.');
    } finally {
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
                  <Logo className="w-10 h-10 text-brand-purple" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome to KaizenStat
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {sent ? 'Check your inbox to continue' : 'Enter your email — we\'ll send you a magic link'}
                </p>
              </div>

              {!sent ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-purple transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      autoFocus
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 focus:border-brand-purple/50 focus:ring-4 focus:ring-brand-purple/5 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-red-500 px-2">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !email}
                    className="w-full py-4 rounded-2xl bg-lux-text dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-60"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>Send Magic Link <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>

                  <p className="text-center text-[10px] text-gray-400 pt-2 leading-relaxed uppercase tracking-[0.05em]">
                    By continuing, you agree to our{' '}
                    <a href="/terms" className="text-gray-900 dark:text-white hover:underline">Terms</a>
                    {' '}&amp;{' '}
                    <a href="/privacy" className="text-gray-900 dark:text-white hover:underline">Privacy Policy</a>
                  </p>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 rounded-3xl p-6 text-center"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-bold text-green-800 dark:text-green-400 mb-2">Magic Link Sent!</h3>
                  <p className="text-sm text-green-700 dark:text-green-500/80 mb-6">
                    We've sent a sign-in link to <strong>{email}</strong>.<br />
                    Click the link in your inbox to access your dashboard.
                  </p>
                  <button
                    onClick={() => { setSent(false); setEmail(''); }}
                    className="text-xs font-bold uppercase tracking-widest text-green-800 dark:text-green-400 hover:underline"
                  >
                    Use a different email
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
