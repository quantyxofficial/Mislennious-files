import { motion } from 'framer-motion';
import { ArrowRight, TerminalSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function KaizenHero() {
  const [typedText, setTypedText] = useState('');
  const fullText = '$ kz auto dataset.csv --target <target_column>';

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center pb-4 pt-20 md:pt-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]/40 h-full -z-10 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/70 text-xs font-mono uppercase tracking-wide mb-6 backdrop-blur-md">
            v0.2.13 is now live
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tighter text-white mb-6 leading-tight transition-all duration-500">
            Intelligent <br/>
            <span className="text-white">
              AutoML & Data
            </span><br/>
            Diagnostics
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-xl mb-10 font-light leading-relaxed">
            Deliver robust, production-ready machine learning pipelines in a single command. Automatically heal messy datasets, benchmark models, and export explainable Python code with absolute parity between CLI and Python SDK.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link 
              to="/docs"
              className="group w-full sm:w-auto px-8 py-3.5 bg-white text-black rounded-full transition-all active:scale-95 font-medium text-sm flex items-center justify-center gap-2 hover:bg-slate-100"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/docs"
              className="w-full sm:w-auto px-8 py-3.5 border border-white/10 rounded-full hover:bg-white/5 transition-all text-slate-300 font-medium text-sm flex items-center justify-center gap-2 backdrop-blur-md"
            >
              <TerminalSquare className="w-4 h-4 text-slate-400" />
              Read Docs
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Terminal window mockup */}
          <div className="rounded-xl overflow-hidden bg-[#0a0a14] border border-slate-800 shadow-2xl shadow-cyan-900/20">
            <div className="px-4 py-3 border-b border-slate-800 bg-[#12121a] flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs text-slate-500 font-mono">bash</span>
            </div>
            <div className="p-6 font-mono text-sm">
              <div className="text-white mb-4">{typedText}<span className="animate-pulse">_</span></div>
              
              {typedText === fullText && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <span className="text-pink-500">✔</span> Healing missing values...
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <span className="text-pink-500">✔</span> Encoding categorical features...
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 mb-4">
                    <span className="text-pink-500">✔</span> Training 5 models...
                  </div>
                  
                  <div className="text-slate-300 mb-2 font-semibold">🏆 Leaderboard</div>
                  <div className="border border-slate-800 rounded-md overflow-hidden">
                    <div className="grid grid-cols-3 bg-slate-800/50 p-2 text-xs text-slate-400">
                      <div>Model</div>
                      <div>Accuracy</div>
                      <div>Time</div>
                    </div>
                    <div className="grid grid-cols-3 p-2 text-xs border-b border-slate-800/50 text-green-400 bg-green-400/5">
                      <div>XGBoost</div>
                      <div>94.2%</div>
                      <div>1.2s</div>
                    </div>
                    <div className="grid grid-cols-3 p-2 text-xs border-b border-slate-800/50 text-slate-300">
                      <div>LightGBM</div>
                      <div>93.8%</div>
                      <div>0.8s</div>
                    </div>
                    <div className="grid grid-cols-3 p-2 text-xs text-slate-300">
                      <div>RandomForest</div>
                      <div>91.5%</div>
                      <div>2.1s</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
