import { motion } from 'framer-motion';

const stats = [
  { value: '760', label: 'Tests Passing', sub: '100% pass rate' },
  { value: '100%', label: 'Code Coverage', sub: '3,127 statements · 0 missed' },
  { value: '18', label: 'Modules', sub: 'All at 100% coverage' },
  { value: '2:29', label: 'Test Suite', sub: 'Full run in 2 min 29 sec' },
];

const badges = [
  'Deterministic pipelines',
  'random_state=42 everywhere',
  'CI/CD ready',
  'No silent data mutations',
  'Preview-first fix engine',
  'Reproducible results',
];

export function KaizenTrustStats() {
  return (
    <section className="py-20 relative border-t border-white/5 bg-transparent overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-blue-600/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/50 text-[10px] font-mono uppercase tracking-wider bg-white/[0.02]">
            Built Like Production Software
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tighter text-white">
            Engineered for trust, <span className="text-white/40">not just demos.</span>
          </h2>
          <p className="text-sm text-slate-500 font-light max-w-md mx-auto">
            Every feature is battle-tested. Every line is covered. Ship to production with confidence.
          </p>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="p-5 rounded-xl border border-white/5 bg-white/[0.01] text-center hover:border-white/10 hover:bg-white/[0.02] transition-all"
            >
              <div className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-1">{s.value}</div>
              <div className="text-xs font-medium text-slate-300 mb-1">{s.label}</div>
              <div className="text-[10px] text-slate-600 font-light">{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Badge row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap justify-center gap-2"
        >
          {badges.map((badge, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[11px] text-emerald-400 font-light"
            >
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              {badge}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
