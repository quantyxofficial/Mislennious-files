import { motion } from 'framer-motion';
import { CheckCircle, Lock, Package, TrendingUp } from 'lucide-react';

const trustSignals = [
  { icon: CheckCircle, color: 'text-emerald-400', label: '100% Test Coverage', detail: '760 tests · 3,127 statements' },
  { icon: Package,     color: 'text-blue-400',    label: 'Production Deployed', detail: 'PyPI · proven at scale' },
  { icon: Lock,        color: 'text-slate-400',   label: 'Open Source',         detail: 'MIT license' },
];

const mlAlgorithms = [
  { title: 'Stacked Ensemble Learning',       desc: 'Auto-combines XGBoost, LightGBM, and RF with optimal meta-learner weighting.', metric: 'AUC',      result: '0.9571', gain: '+1.5%',  gainColor: 'text-emerald-400', resultColor: 'text-blue-400' },
  { title: 'Bayesian Hyperparameter Tuning',  desc: 'Two-stage optimization: random exploration → precision refinement.',           metric: 'Accuracy', result: '94.21%', gain: '+0.39%', gainColor: 'text-emerald-400', resultColor: 'text-blue-400' },
  { title: 'Prediction Calibration',          desc: 'Platt scaling aligns predicted probabilities to observed accuracy.',           metric: 'ECE',      result: '0.8%',   gain: '−3.2%',  gainColor: 'text-emerald-400', resultColor: 'text-blue-400' },
];

export function KaizenFeatures() {
  return (
    <section id="features" className="py-12 relative border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10 space-y-10">

        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Framework</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">Complete Data Intelligence Platform</h2>
          </div>
          <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
            Validation, diagnostics, and model optimization — automated in a single framework.
          </p>
        </motion.div>

        {/* Problem / Solution + Trust signals in one row */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* The Challenge */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0 }} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 space-y-3">
            <div className="text-[9px] font-mono uppercase tracking-widest text-slate-500">The Challenge</div>
            <h3 className="text-sm font-semibold text-white">Manual Validation is a Bottleneck</h3>
            <ul className="space-y-2">
              {['Data issues discovered late, after training', 'Diagnostics lack context — engineers waste time', 'No systematic remediation approach'].map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300 leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* The Solution */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 space-y-3">
            <div className="text-[9px] font-mono uppercase tracking-widest text-slate-500">The Solution</div>
            <h3 className="text-sm font-semibold text-white">Automated Data Intelligence</h3>
            <ul className="space-y-2">
              {['Detects issues before training begins', 'Structured, actionable diagnostics', 'Integrates into existing ML workflows'].map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300 leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Trust signals */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 space-y-4">
            <div className="text-[9px] font-mono uppercase tracking-widest text-slate-500">Verified</div>
            {trustSignals.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 shrink-0 ${s.color}`} />
                  <div>
                    <div className="text-xs font-semibold text-white">{s.label}</div>
                    <div className="text-[10px] text-slate-500">{s.detail}</div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* ML Algorithms row */}
        <div>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-semibold text-white">Advanced ML Optimization</h3>
            <span className="text-[10px] text-slate-500 font-mono">automatically applied · v0.5.9</span>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4">
            {mlAlgorithms.map((alg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 space-y-3">
                <div>
                  <h4 className="text-xs font-semibold text-white mb-1">{alg.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{alg.desc}</p>
                </div>
                <div className="flex gap-6 pt-3 border-t border-white/[0.06]">
                  <div>
                    <div className="text-[9px] font-mono text-slate-600 uppercase tracking-wider mb-0.5">{alg.metric}</div>
                    <div className={`text-base font-bold ${alg.resultColor}`}>{alg.result}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-slate-600 uppercase tracking-wider mb-0.5">vs Baseline</div>
                    <div className={`text-base font-bold ${alg.gainColor}`}>{alg.gain}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
