import { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, Copy, Check, ExternalLink, Star } from 'lucide-react';

const installOptions = [
  { id: 'core', label: 'Core', cmd: 'pip install kaizenstat' },
  { id: 'ui',   label: 'UI',   cmd: 'pip install kaizenstat[ui]' },
  { id: 'gpu',  label: 'GPU',  cmd: 'pip install kaizenstat[gpu]' },
  { id: 'fast', label: 'Fast', cmd: 'pip install kaizenstat[fast]' },
  { id: 'all',  label: 'All',  cmd: 'pip install kaizenstat[all]' },
];

const pillars = ['Data Health', 'Validation', 'Debugging', 'Model Improvement'];

export function Hero() {
  const [copied, setCopied]         = useState(false);
  const [selectedOpt, setSelectedOpt] = useState('core');

  const activeCmd = installOptions.find(o => o.id === selectedOpt)?.cmd ?? 'pip install kaizenstat';

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-end pb-4 pt-20 md:pt-32 pointer-events-none"
      id="hero"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]/40 -z-10 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl flex flex-col items-center pointer-events-auto mt-auto">


        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tighter text-center mb-4"
        >
          <span className="text-white">Continuous improvement</span>
          <span className="text-slate-400"> for ML pipelines.</span>
        </motion.h1>

        {/* Hook line */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm md:text-base text-slate-400 font-light text-center mb-6 max-w-lg"
        >
          Your model says <span className="text-white font-semibold">94% accuracy</span>.{' '}
          <span className="text-white font-medium">KaizenStat tells you if it's lying.</span>
        </motion.p>

        {/* Pillars — dot-separated */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mb-8"
        >
          {pillars.map((p, i) => (
            <span key={p} className="flex items-center gap-3">
              <span className="text-sm text-slate-400 font-light">{p}</span>
              {i < pillars.length - 1 && (
                <span className="w-1 h-1 rounded-full bg-white/20" />
              )}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-3 mb-10"
        >
          <a
            href="https://colab.research.google.com/github/kaizenstat-python/KaizenStat/blob/main/notebooks/quickstart_tabular.ipynb"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95 shadow-lg"
          >
            Try in Colab (Free) <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://github.com/kaizenstat-python"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-slate-300 font-medium hover:border-white/20 hover:text-white transition-all"
          >
            <Star className="w-3.5 h-3.5" /> Star on GitHub
          </a>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 mb-8"
        >
          {[
            '760 tests · 100% coverage',
            'Production-ready pipelines',
            'Open source (MIT)',
          ].map(item => (
            <div key={item} className="flex items-center gap-1.5">
              <span className="text-emerald-400 text-xs">✔</span>
              <span className="text-xs text-slate-400 font-light">{item}</span>
            </div>
          ))}
        </motion.div>

        {/* Install picker */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex gap-1 p-0.5 bg-white/[0.02] border border-white/5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
            {installOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => { setSelectedOpt(opt.id); setCopied(false); }}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  selectedOpt === opt.id
                    ? 'bg-white text-black font-extrabold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="text-xs text-slate-400 font-mono tracking-wide flex items-center gap-2 bg-white/[0.03] hover:bg-white/[0.07] px-5 py-2.5 rounded-full border border-white/10 shadow-lg backdrop-blur-sm cursor-pointer select-none transition-colors active:scale-95"
          >
            <Terminal className="w-3.5 h-3.5 text-white/60" />
            <span>{activeCmd}</span>
            <span className="w-px h-3 bg-white/10 mx-1" />
            {copied
              ? <Check className="w-3.5 h-3.5 text-emerald-400" />
              : <Copy  className="w-3.5 h-3.5 text-slate-500" />}
          </button>
        </motion.div>

      </div>
    </section>
  );
}
