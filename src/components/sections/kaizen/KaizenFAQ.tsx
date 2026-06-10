import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, GitCompare, Code2, Layers, Clock, Type, Cpu } from 'lucide-react';

const faqs = [
  {
    icon: GitCompare,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    tag: 'Integration',
    q: 'Do I need to replace my existing pipeline?',
    a: 'No. KaizenStat wraps around whatever you already have. You call doctor.fit(df, target="...") and it runs diagnostics and improvements on top of your existing data — nothing gets removed, nothing gets replaced. Use it alongside your current sklearn/XGBoost workflow.',
  },
  {
    icon: Clock,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    tag: 'Performance',
    q: 'How long does a full run take?',
    a: 'On a typical 50k-row CSV: health check under 3s, validation under 5s, full model benchmark under 60s on CPU. GPU/fast extras cut training time by 4–10×. The report export adds ~1s. Total end-to-end for most datasets: under 2 minutes.',
  },
  {
    icon: Cpu,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    tag: 'Custom Models',
    q: 'Can I use my own models?',
    a: 'Yes — pass any scikit-learn-compatible estimator via doctor.train(estimators=[MyModel()]). KaizenStat benchmarks it alongside its defaults, applies its tuning and calibration logic, and includes it in the report. No rewrite required.',
  },
  {
    icon: Type,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    tag: 'NLP / Text',
    q: 'What if my data is text, not tabular?',
    a: 'DataDoctor auto-detects string columns and switches to NLP mode — TF-IDF vectorisation, class-imbalance checks, text deduplication, and a classifier benchmark (Logistic Regression, LinearSVC, XGBoost). Just point it at your CSV with a text column and a label column.',
  },
  {
    icon: Code2,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    tag: 'No Lock-in',
    q: 'Can I export the code and remove KaizenStat as a dependency?',
    a: 'Yes — `kz codegen` outputs a pure scikit-learn pipeline script with your exact preprocessing logic, model parameters, and training loop. No KaizenStat runtime required in production.',
  },
  {
    icon: Layers,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    tag: 'Compatibility',
    q: 'Does this work with my existing ML stack?',
    a: 'Yes — KaizenStat integrates with pandas, scikit-learn, XGBoost, LightGBM, Jupyter, Google Colab, NVIDIA CUDA, and Apple MPS. If your data loads into a DataFrame and your target is a column name, it works.',
  },
];

export function KaizenFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 relative border-t border-white/5 bg-transparent">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] h-[300px] bg-indigo-500/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/50 text-[10px] font-mono uppercase tracking-wider bg-white/[0.02]">
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-white leading-tight">
            Questions we hear often
          </h2>
          <p className="text-sm text-slate-500">Click any question to expand.</p>
        </motion.div>

        <div className="space-y-2.5">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const Icon   = faq.icon;
            return (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-2xl border cursor-pointer select-none transition-colors duration-200 ${
                  isOpen
                    ? 'border-white/[0.12] bg-white/[0.025]'
                    : 'border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.015]'
                }`}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <div className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg border ${faq.bg} ${faq.border} shrink-0`}>
                        <Icon className={`w-4 h-4 ${faq.color}`} />
                      </div>
                      <div>
                        <div className={`text-[9px] font-mono uppercase tracking-widest mb-0.5 ${faq.color}`}>{faq.tag}</div>
                        <h3 className="text-sm font-medium text-white leading-snug">{faq.q}</h3>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="shrink-0"
                    >
                      <ChevronDown className={`w-4 h-4 ${isOpen ? 'text-white' : 'text-slate-600'}`} />
                    </motion.div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-slate-400 font-light leading-relaxed pt-4 mt-4 border-t border-white/5">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
