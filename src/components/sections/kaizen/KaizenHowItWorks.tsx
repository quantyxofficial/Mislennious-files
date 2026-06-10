import { motion } from 'framer-motion';
import { Search, ShieldCheck, Wrench, BrainCircuit, Bug, TrendingUp } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: <Search       className="w-5 h-5" />,
    label: 'Health Check',
    desc:  'Audit your dataset for missing values, duplicates, imbalance, and dead features.',
    cmd:   'kz audit',
    color: 'text-cyan-400   border-cyan-500/20   bg-cyan-500/5',
  },
  {
    num: '02',
    icon: <ShieldCheck  className="w-5 h-5" />,
    label: 'Validate',
    desc:  'Confirm schema, types, distributions, and target integrity before any training run.',
    cmd:   'kz audit --strict',
    color: 'text-violet-400 border-violet-500/20 bg-violet-500/5',
  },
  {
    num: '03',
    icon: <Wrench       className="w-5 h-5" />,
    label: 'Fix',
    desc:  'Heal the dataset — impute, encode, parse datetimes, drop constants, balance classes.',
    cmd:   'kz heal',
    color: 'text-amber-400  border-amber-500/20  bg-amber-500/5',
  },
  {
    num: '04',
    icon: <BrainCircuit className="w-5 h-5" />,
    label: 'Train',
    desc:  'Benchmark multiple models end-to-end and select the best pipeline automatically.',
    cmd:   'kz benchmark',
    color: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/5',
  },
  {
    num: '05',
    icon: <Bug          className="w-5 h-5" />,
    label: 'Debug',
    desc:  'Inspect feature importance, ROC curves, and model diagnostics in one report.',
    cmd:   'kz report',
    color: 'text-rose-400   border-rose-500/20   bg-rose-500/5',
  },
  {
    num: '06',
    icon: <TrendingUp   className="w-5 h-5" />,
    label: 'Improve',
    desc:  'Get AI-generated improvement plans and export clean, production-ready Python.',
    cmd:   'kz improve',
    color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
  },
];

export function KaizenHowItWorks() {
  return (
    <section className="py-24 relative border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/50 text-[10px] font-mono uppercase tracking-wider bg-white/[0.02] mb-5">
            Workflow
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-white leading-tight">
            How It Works
          </h2>
          <p className="text-sm text-slate-400 font-light mt-3 max-w-xl leading-relaxed">
            A structured six-stage loop that runs as often as your data changes — not just once at setup.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="relative p-7 bg-[#0d0d12] hover:bg-white/[0.02] transition-colors group"
            >
              {/* Connector arrow — right edge on desktop, hidden on last in row */}
              {i % 3 !== 2 && i < 5 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-white/5 hidden lg:block" />
              )}

              <div className="flex items-start justify-between mb-5">
                <div className={`p-2.5 rounded-xl border ${step.color}`}>
                  {step.icon}
                </div>
                <span className="text-[10px] font-mono text-slate-700">{step.num}</span>
              </div>

              <div className="mb-3">
                <div className="text-sm font-semibold text-white mb-1.5">{step.label}</div>
                <p className="text-xs text-slate-500 font-light leading-relaxed">{step.desc}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-white/4">
                <code className="text-[10px] font-mono text-slate-500 group-hover:text-slate-400 transition-colors">
                  {step.cmd}
                </code>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Repeat indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex items-center justify-center gap-3 text-[10px] font-mono text-slate-600"
        >
          <div className="flex-1 max-w-[120px] h-px bg-white/5" />
          <span>↺  repeat as your data evolves</span>
          <div className="flex-1 max-w-[120px] h-px bg-white/5" />
        </motion.div>

      </div>
    </section>
  );
}
