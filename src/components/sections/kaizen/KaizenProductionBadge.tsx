import { motion } from 'framer-motion';
import { ShieldCheck, TestTube2, GitBranch, Zap, Lock } from 'lucide-react';

const stats = [
  { icon: TestTube2,   color: 'text-blue-400',     value: '760',   label: 'Unit Tests',               sub: '100% pass rate' },
  { icon: ShieldCheck, color: 'text-emerald-400',  value: '100%',  label: 'Code Coverage',           sub: '3,127 statements' },
  { icon: Zap,         color: 'text-amber-400',    value: 'CI',    label: 'Continuous Integration',  sub: 'GitHub Actions' },
  { icon: GitBranch,   color: 'text-cyan-400',     value: 'PyPI',  label: 'Production Deploy',      sub: 'Stable release' },
  { icon: Lock,        color: 'text-slate-400',    value: 'MIT',   label: 'Open Source',            sub: 'No vendor lock-in' },
];

export function KaizenProductionBadge() {
  return (
    <section className="py-20 relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(59,130,246,0.03) 0%, transparent 75%)'
      }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Production Ready</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Built for Production
          </h2>
          <p className="text-base text-slate-400 max-w-2xl mx-auto">
            Verified, deterministic, and thoroughly tested. Enterprise-grade reliability with no shortcuts.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-xl border border-white/[0.08] bg-white/[0.01] p-6 hover:bg-white/[0.02] transition-colors duration-300"
              >
                {/* Subtle accent glow on hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                  background: `radial-gradient(circle at 50% 0%, ${s.color.replace('text-', 'rgba(').replace('-400', ', 0.05)')} 0%, transparent 70%)`
                }} />

                <div className="relative z-10 space-y-4">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.08]">
                    <Icon className={`w-5 h-5 ${s.color}`} />
                  </div>

                  {/* Value */}
                  <div>
                    <div className={`text-2xl font-bold ${s.color} mb-1`}>{s.value}</div>
                    <div className="text-sm font-semibold text-white">{s.label}</div>
                  </div>

                  {/* Sub */}
                  <div className="text-xs text-slate-500 border-t border-white/[0.06] pt-3">
                    {s.sub}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
