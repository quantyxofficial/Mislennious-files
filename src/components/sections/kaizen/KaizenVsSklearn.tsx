import { motion } from 'framer-motion';
import { X, Check, Zap } from 'lucide-react';

const reasons = [
  {
    title: 'Data leakage detection',
    manual: 'Manually inspect correlation matrices and hope you spot it before training.',
    kaizen: 'kz validate flags any feature with corr > 0.95 to target automatically — before training starts.',
    color: '#f87171',
  },
  {
    title: 'Debugging root cause',
    manual: 'Rerun experiments, tweak hyperparameters, still unsure if the issue is data or model.',
    kaizen: 'kz debug isolates root cause in one pass — data problem vs. model problem, clearly separated.',
    color: '#fbbf24',
  },
  {
    title: 'Production trust score',
    manual: 'Check accuracy on a holdout set, call it done, hope nothing breaks in prod.',
    kaizen: 'kz report scores accuracy, robustness, calibration, and uncertainty. Anything under 75 blocks deployment.',
    color: '#a78bfa',
  },
  {
    title: 'Reproducible pipeline',
    manual: 'Preprocessing scattered across notebooks. No audit trail. No one can replicate it.',
    kaizen: 'Every run writes .kz/session.json — a full audit trail of every fix, every run, automatically.',
    color: '#34d399',
  },
];

export function KaizenVsSklearn() {
  return (
    <section className="py-24 relative border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(139,92,246,0.04) 0%, transparent 65%)',
      }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-[10px] font-mono uppercase tracking-widest text-white/40 mb-5">
            <Zap className="w-3 h-3" /> vs Manual Workflow
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white leading-snug mb-4">
            Why not just use{' '}
            <span className="font-mono bg-white/[0.06] border border-white/10 rounded-lg px-3 py-0.5 text-white/50">sklearn</span>{' '}
            + manual debugging?
          </h2>
          <p className="text-sm text-slate-500 font-light max-w-lg mx-auto">
            sklearn is a great library. KaizenStat wraps around it and handles the four things manual workflows consistently miss.
          </p>
        </motion.div>

        {/* Column labels */}
        <div className="grid grid-cols-2 gap-3 mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
              <X className="w-3 h-3 text-red-400" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-red-400/70">Without KaizenStat</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 text-emerald-400" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400/70">With KaizenStat</span>
          </div>
        </div>

        {/* Rows */}
        <div className="space-y-2">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-white/[0.07] overflow-hidden"
            >
              {/* Title strip */}
              <div
                className="px-6 py-3 flex items-center gap-2.5 border-b border-white/[0.05]"
                style={{ background: `${r.color}08` }}
              >
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: r.color }} />
                <span className="text-sm font-semibold" style={{ color: r.color }}>{r.title}</span>
              </div>

              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/[0.05]">
                {/* Manual side */}
                <div className="p-6 bg-red-500/[0.02]">
                  <p className="text-sm text-slate-400 font-light leading-relaxed">{r.manual}</p>
                </div>

                {/* KaizenStat side */}
                <div className="p-6" style={{ background: `${r.color}06` }}>
                  <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>{r.kaizen}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center text-xs text-slate-600 font-mono mt-8"
        >
          KaizenStat doesn't replace sklearn — it makes every sklearn pipeline production-ready.
        </motion.p>

      </div>
    </section>
  );
}
