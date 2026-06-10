import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const rows = [
  {
    feature: 'Class Imbalance Detection',
    kaizen:      { label: 'Automatic',          supported: true },
    competitors: { label: 'Manual',             supported: false },
  },
  {
    feature: 'Data Leakage Detection',
    kaizen:      { label: 'Built-in',           supported: true },
    competitors: { label: 'Not available',      supported: false },
  },
  {
    feature: 'Auto-fix Engine',
    kaizen:      { label: 'Yes',                supported: true },
    competitors: { label: 'Reports only',       supported: false },
  },
  {
    feature: 'Production Trust Score',
    kaizen:      { label: 'Built-in',           supported: true },
    competitors: { label: 'Not available',      supported: false },
  },
  {
    feature: 'Failure Clustering by Subgroup',
    kaizen:      { label: 'Automatic',          supported: true },
    competitors: { label: 'Manual',             supported: false },
  },
  {
    feature: 'End-to-End Pipeline',
    kaizen:      { label: '1 Tool',             supported: true },
    competitors: { label: '5+ Tools',           supported: false },
  },
];

export function KaizenComparison() {
  return (
    <section className="py-20 relative border-t border-white/5 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/50 text-[10px] font-mono uppercase tracking-wider bg-white/[0.02] mb-4">
            vs The Rest
          </div>
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tighter text-white leading-tight">
            Why ML Teams <span className="text-white/50">Choose KaizenStat</span>
          </h2>
          <p className="text-sm text-slate-500 font-light mt-3 max-w-lg mx-auto">
            Others find the best model. KaizenStat tells you when that model is <span className="text-slate-300">lying to you</span>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full overflow-hidden rounded-2xl border border-white/8 bg-white/[0.01] backdrop-blur-sm"
        >
          {/* Table header */}
          <div className="grid grid-cols-3 border-b border-white/8 bg-white/[0.02]">
            <div className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-500">
              Feature
            </div>
            <div className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-white/70 text-center border-l border-white/5">
              KaizenStat
            </div>
            <div className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-500 text-center border-l border-white/5">
              Competitors
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-3 ${i < rows.length - 1 ? 'border-b border-white/5' : ''} hover:bg-white/[0.015] transition-colors`}
            >
              <div className="px-6 py-4 text-sm text-slate-300 font-light flex items-center">
                {row.feature}
              </div>
              <div className="px-6 py-4 flex items-center justify-center gap-2 border-l border-white/5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-emerald-400" />
                </span>
                <span className="text-sm text-emerald-300 font-medium">{row.kaizen.label}</span>
              </div>
              <div className="px-6 py-4 flex items-center justify-center gap-2 border-l border-white/5">
                <span className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                  <X className="w-3 h-3 text-red-400" />
                </span>
                <span className="text-sm text-slate-500">{row.competitors.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
