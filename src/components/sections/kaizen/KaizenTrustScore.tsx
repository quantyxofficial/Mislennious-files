import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── before state ── */
const before = [
  { label: 'Accuracy',    pct: 94, note: '94.2%',         status: 'pass' },
  { label: 'Robustness',  pct: 52, note: '52% minority',  status: 'fail' },
  { label: 'Calibration', pct: 36, note: 'gap = 14%',     status: 'fail' },
  { label: 'Uncertainty', pct: 48, note: '28% unsure',    status: 'warn' },
];

/* ─── after state ── */
const after = [
  { label: 'Accuracy',    pct: 87, note: '87.4% real',    status: 'pass' },
  { label: 'Robustness',  pct: 81, note: '81% minority',  status: 'pass' },
  { label: 'Calibration', pct: 98, note: 'gap < 2%',      status: 'pass' },
  { label: 'Uncertainty', pct: 82, note: '9% unsure',     status: 'pass' },
];

/* ─── animated counter ── */
function AnimatedNumber({ to, duration = 1100 }: { to: number; duration?: number }) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick  = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - t, 3)) * to));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration]);

  return <span ref={ref}>{val}</span>;
}

/* ─── metric bar ── */
function Bar({ pct, status, delay, color }: { pct: number; status: string; delay: number; color: string }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  /* lightweight: use color with opacity for visual hierarchy */
  const fill =
    status === 'pass' ? color + 'cc' :
    status === 'warn' ? color + '80' :
    color + '40';

  return (
    <div ref={ref} className="h-px w-full rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: fill }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${pct}%` } : undefined}
        transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

/* ─── single report card ── */
function ReportCard({
  label, model, metrics, score, verdict, side, delay
}: {
  label: string; model: string;
  metrics: typeof before; score: number; verdict: string;
  side: 'before' | 'after'; delay: number;
}) {
  const isAfter = side === 'after';
  const accentColor = isAfter ? '#10b981' : '#a78bfa'; /* emerald-400 for after, violet-400 for before */
  const accentColorHex = isAfter ? '#10b981' : '#a78bfa';
  const accentRGB = isAfter ? '16, 185, 129' : '167, 139, 250';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border overflow-hidden backdrop-blur-sm"
      style={{
        background: `rgba(${accentRGB}, 0.05)`,
        borderColor: `${accentColorHex}40`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.05]">
        <div className="space-y-1">
          <div
            className="text-xl font-bold tracking-tight"
            style={{ color: accentColorHex }}
          >
            {label}
          </div>
          <div className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.35)' }}>{model}</div>
        </div>
        <div
          className="text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded border"
          style={{
            color: `${accentColorHex}99`,
            borderColor: `${accentColorHex}25`,
            background: `${accentColorHex}08`,
          }}
        >
          {verdict}
        </div>
      </div>

      <div className="px-6 py-5 space-y-5">
        {/* Score */}
        <div className="flex items-end gap-2.5 pb-1">
          <div>
            <div className="text-[9px] font-mono uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Trust Score
            </div>
            <div
              className="text-5xl font-bold font-mono tracking-tighter"
              style={{ color: accentColorHex }}
            >
              <AnimatedNumber to={score} duration={isAfter ? 1400 : 1100} />
            </div>
          </div>
          <div className="pb-1.5 text-2xl font-mono" style={{ color: 'rgba(255,255,255,0.15)' }}>/ 100</div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.04]" />

        {/* Metrics */}
        <div className="space-y-3.5">
          {metrics.map((m, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    className="text-[10px] font-mono"
                    style={{
                      color: m.status === 'pass'
                        ? `${accentColorHex}80`
                        : m.status === 'warn'
                        ? `${accentColorHex}cc`
                        : `${accentColorHex}ff`,
                    }}
                  >
                    {m.status === 'pass' ? '✓' : m.status === 'warn' ? '?' : '✗'}
                  </span>
                  <span className="text-[11px] font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>{m.label}</span>
                </div>
                <span
                  className="text-[10px] font-mono"
                  style={{
                    color: m.status === 'pass'
                      ? 'rgba(255,255,255,0.4)'
                      : `${accentColorHex}99`,
                  }}
                >
                  {m.note}
                </span>
              </div>
              <Bar pct={m.pct} status={m.status} delay={delay + 0.15 + i * 0.07} color={accentColorHex} />
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="pt-1 border-t border-white/[0.04]">
          <span
            className="text-[10px] font-mono"
            style={{ color: `${accentColorHex}80` }}
          >
            {isAfter ? 'All checks passed — safe to deploy' : '3 issues blocking production readiness'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── main section ── */
export function KaizenTrustScore() {
  return (
    <section className="py-24 relative border-t border-white/5 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/50 text-[10px] font-mono uppercase tracking-wider bg-white/[0.02]">
            Production Readiness
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter text-white leading-tight max-w-3xl">
            Your model reports 94% accuracy.{' '}
            <span className="text-white/30">Is it safe to ship?</span>
          </h2>
          <p className="text-sm text-slate-500 font-light leading-relaxed max-w-xl">
            Accuracy is one dimension. KaizenStat scores robustness, calibration, and uncertainty — and returns a single production-readiness number.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ReportCard
            label="Before KaizenStat"
            model="XGBoostClassifier — v1"
            metrics={before}
            score={67}
            verdict="not ready"
            side="before"
            delay={0}
          />
          <ReportCard
            label="After KaizenStat"
            model="XGBoostClassifier — v2 · fixed"
            metrics={after}
            score={82}
            verdict="production ready"
            side="after"
            delay={0.1}
          />
        </div>

        {/* Formula */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-12 text-center px-4 py-5 rounded-xl border border-white/10 bg-white/[0.03]"
        >
          <div className="text-[10px] font-mono text-slate-400 mb-2">Trust Score Formula</div>
          <span className="text-xs md:text-sm font-mono text-slate-300 leading-relaxed block">
            trust_score = 0.40 × accuracy + 0.25 × robustness + 0.20 × (1 − calibration_gap) + 0.15 × (1 − uncertain_fraction)
          </span>
        </motion.div>

      </div>
    </section>
  );
}
