import { motion } from 'framer-motion';
import { FlaskConical, Server, Users } from 'lucide-react';

const personas = [
  {
    icon: <FlaskConical className="w-5 h-5" />,
    role:   'Data Scientists',
    action: 'Build models faster',
    points: [
      'Skip repetitive data-cleaning boilerplate',
      'Get a ranked model benchmark in one command',
      'Export reproducible code you can hand off',
    ],
    color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
  },
  {
    icon: <Server className="w-5 h-5" />,
    role:   'ML Engineers',
    action: 'Deploy pipelines reliably',
    points: [
      'Validate data contracts before each training run',
      'Codegen outputs pure scikit-learn — no runtime dep',
      'Structured diagnostics that fit CI/CD workflows',
    ],
    color: 'text-violet-400 border-violet-500/20 bg-violet-500/5',
  },
  {
    icon: <Users className="w-5 h-5" />,
    role:   'Data Teams',
    action: 'Maintain quality continuously',
    points: [
      'Shared framework everyone on the team can run',
      'Consistent audit reports across all projects',
      'Track model health over time, not just at launch',
    ],
    color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
  },
];

export function KaizenAudience() {
  return (
    <section className="py-24 relative border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/50 text-[10px] font-mono uppercase tracking-wider bg-white/[0.02] mb-5">
            Who Uses KaizenStat
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-white leading-tight">
            Built for practitioners,{' '}
            <span className="text-white/50">not demos.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {personas.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-7 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.025] hover:border-white/10 transition-all flex flex-col"
            >
              <div className={`w-fit p-2.5 rounded-xl border mb-5 ${p.color}`}>
                {p.icon}
              </div>

              <div className="mb-1 text-xs font-mono text-slate-500 uppercase tracking-widest">{p.role}</div>
              <div className="text-lg font-semibold text-white mb-5 leading-snug">{p.action}</div>

              <ul className="space-y-2.5 mt-auto">
                {p.points.map((pt, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-white/20 shrink-0 mt-[7px]" />
                    <span className="text-xs text-slate-400 font-light leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
