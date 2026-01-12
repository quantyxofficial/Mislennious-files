import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ArrowRight, Loader2 } from 'lucide-react';
import { generateStrategy } from '../services/geminiService';

export const GeminiStrategist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [strategy, setStrategy] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input) return;
    setLoading(true);
    const result = await generateStrategy(input);
    setStrategy(result);
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[60] flex items-center gap-2 md:gap-3 px-5 py-3 md:px-6 md:py-4 bg-lux-text/90 backdrop-blur-md text-white rounded-full text-xs md:text-sm font-bold shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 group border border-white/10"
        data-hover
      >
        <Sparkles className="w-4 h-4 text-white/80 group-hover:rotate-12 transition-transform" />
        <span className="tracking-wide">KaizenStat AI</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 md:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-xl bg-white/80 md:bg-white/60 backdrop-blur-3xl border border-white/60 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.12)] relative"
            >
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-white/20 flex justify-between items-center bg-white/20">
                <h3 className="font-serif text-xl md:text-2xl italic text-lux-text flex items-center gap-2 md:gap-3">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-lux-text/50" />
                  KaizenStat Intelligence
                </h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 md:p-3 hover:bg-white/40 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-lux-text/50" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 md:p-10 space-y-6 md:space-y-8">
                {!strategy ? (
                  <>
                    <p className="text-lux-text/70 text-base md:text-lg font-light leading-relaxed">
                      Enter your niche. Our IITM-trained models will generate a growth vector.
                    </p>
                    <div className="relative">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g. Luxury Real Estate..."
                        className="w-full bg-white/5 border border-white/40 rounded-xl py-4 px-5 md:py-5 md:px-6 text-lux-text placeholder-lux-text/30 focus:outline-none focus:ring-2 focus:ring-lux-text/10 transition-all text-base md:text-lg backdrop-blur-sm"
                      />
                      <button
                        onClick={handleGenerate}
                        disabled={loading || !input}
                        className="absolute right-2 top-2 bottom-2 md:right-3 md:top-3 md:bottom-3 bg-lux-text text-white px-4 md:px-5 rounded-lg font-medium text-sm hover:bg-black transition-colors disabled:opacity-50 flex items-center gap-2"
                        data-hover
                      >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 md:space-y-8"
                  >
                    <div className="bg-white/40 p-6 md:p-8 rounded-2xl border border-white/30 shadow-sm backdrop-blur-sm max-h-[40vh] overflow-y-auto custom-scrollbar">
                      <p className="text-lux-text font-serif text-xl md:text-2xl italic leading-relaxed">
                        "{strategy}"
                      </p>
                    </div>
                    <button
                      onClick={() => setStrategy('')}
                      className="text-xs md:text-sm text-lux-text/60 hover:text-lux-text transition-colors underline underline-offset-4 font-semibold uppercase tracking-wide"
                    >
                      Analyze another niche
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};