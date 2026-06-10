import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const failures = [
  {
    num:   '01',
    type:  'Data Leakage',
    color: '#f87171',
    title: 'Your 99% accuracy is fake.',
    desc:  'A feature with 99.8% correlation to the target is leaking the answer. Remove it — real accuracy drops to 64%. KaizenStat catches this before you train.',
    before: { label: 'With leaking feature', val: '99.1%' },
    after:  { label: 'Real accuracy',         val: '64.0%' },
    code: `$ kz validate fraud.csv --target churn

  LEAKAGE DETECTED   ⚠

  payment_id   corr=0.998 to target
  Accuracy without it:  64.0%  (was 99.1%)

  Action: Remove payment_id before training
  Done  (0.52 s)`,
  },
  {
    num:   '02',
    type:  'Overconfident Model',
    color: '#fbbf24',
    title: 'It says 90% sure. Right 76% of the time.',
    desc:  'A calibration gap of 14% means your model\'s confidence scores are inflated. Platt scaling closes the gap to under 2% — automatically.',
    before: { label: 'Stated confidence', val: '90%' },
    after:  { label: 'Actual hit rate',    val: '76%' },
    code: `$ kz report --trust model.pkl

  CALIBRATION GAP   ⚠

  Predicted confidence:   90%
  Actual accuracy:        76%
  Gap:                    14%  →  overconfident

  Action: Platt scaling applied
  Gap after calibration:  < 2%
  Done  (0.3 s)`,
  },
  {
    num:   '03',
    type:  'Hidden Failing Groups',
    color: '#a78bfa',
    title: '81% overall. 52% on your largest city.',
    desc:  'Aggregate metrics hide subgroup failures. KaizenStat\'s failure clustering surfaces which slices are underperforming — before your users find out.',
    before: { label: 'Overall accuracy',     val: '81%' },
    after:  { label: 'City="NYC" (n=412)',    val: '52%' },
    code: `$ kz debug model.pkl --data test.csv

  FAILURE SLICE DETECTED   ⚠

  Overall accuracy:         81%
  City="NYC"  (n=412):      52%   ← failing
  City="LA"   (n=891):      79%   ← ok
  Age < 25    (n=203):      61%   ← failing

  Action: Collect more NYC + Age<25 data
  Done  (1.2 s)`,
  },
];

const N = failures.length;

export function KaizenFailures() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = failures[activeIndex];

  /* scroll-linked horizontal translation of right panel */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  /* strip is N cards wide; translate from 0 → -((N-1)/N * 100)% of strip */
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${((N - 1) / N) * 100}%`]
  );

  /* update active index from scroll progress */
  useEffect(() => {
    return scrollYProgress.on('change', v => {
      const idx = Math.min(N - 1, Math.floor(v * N + 0.15));
      setActiveIndex(idx);
    });
  }, [scrollYProgress]);

  return (
    /* section is N×100vh tall so we have scroll room */
    <section
      ref={sectionRef}
      className="relative border-t border-white/5"
      style={{ height: `${N * 100}vh` }}
    >
      {/* sticky wrapper — stays in viewport for the whole scroll */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl h-full flex flex-col">

          {/* ── Header ── */}
          <div className="pt-16 pb-6 space-y-2 shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/50 text-[10px] font-mono uppercase tracking-wider bg-white/[0.02]">
              Diagnostics
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white leading-snug">
              The problems we catch{' '}
              <span className="text-white/35">before you ship.</span>
            </h2>
          </div>

          {/* ── Desktop: left info + right horizontal cards ── */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-16 flex-1 min-h-0 pb-16">

            {/* LEFT — stays put, content swaps */}
            <div className="flex flex-col justify-center">
              <div className="space-y-6">

                {/* Progress dots */}
                <div className="flex items-center gap-2">
                  {failures.map((f, i) => (
                    <div
                      key={i}
                      className="transition-all duration-300"
                      style={{
                        height: '2px',
                        width: i === activeIndex ? '28px' : '8px',
                        background: i === activeIndex ? active.color : 'rgba(255,255,255,0.1)',
                        borderRadius: '2px',
                      }}
                    />
                  ))}
                  <span className="text-[10px] font-mono text-slate-600 ml-2">
                    {active.num} / 0{N}
                  </span>
                </div>

                {/* Tag */}
                <motion.div
                  key={`tag-${activeIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-fit text-[10px] font-mono font-bold px-2.5 py-1 rounded border"
                  style={{ color: active.color, borderColor: `${active.color}40`, background: `${active.color}12` }}
                >
                  {active.type}
                </motion.div>

                {/* Title */}
                <motion.h3
                  key={`title-${activeIndex}`}
                  initial={{ opacity: 0.3, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-2xl md:text-3xl font-semibold tracking-tight text-white leading-snug"
                >
                  {active.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  key={`desc-${activeIndex}`}
                  initial={{ opacity: 0.3, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="text-sm text-slate-400 font-light leading-relaxed max-w-xs"
                >
                  {active.desc}
                </motion.p>

                {/* Before → after chips */}
                <motion.div
                  key={`ba-${activeIndex}`}
                  initial={{ opacity: 0.3, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-3 flex-wrap"
                >
                  <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/8 bg-white/[0.02]">
                    <span className="text-[10px] font-mono text-slate-500">{active.before.label}</span>
                    <span className="text-sm font-semibold font-mono text-white/80">{active.before.val}</span>
                  </div>
                  <span className="text-slate-700 text-sm">→</span>
                  <div
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg border"
                    style={{ borderColor: `${active.color}35`, background: `${active.color}0a` }}
                  >
                    <span className="text-[10px] font-mono text-slate-500">{active.after.label}</span>
                    <span className="text-sm font-semibold font-mono" style={{ color: active.color }}>{active.after.val}</span>
                  </div>
                </motion.div>

                {/* Failure list nav */}
                <div className="space-y-2 pt-2">
                  {failures.map((f, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span
                        className="text-[9px] font-mono transition-colors duration-300"
                        style={{ color: i === activeIndex ? active.color : 'rgba(255,255,255,0.18)' }}
                      >
                        {f.num}
                      </span>
                      <span
                        className="text-xs font-medium transition-colors duration-300"
                        style={{ color: i === activeIndex ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.22)' }}
                      >
                        {f.type}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* RIGHT — smooth fade gates on all edges */}
            <div
              className="relative overflow-hidden flex items-center"
              style={{
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
                maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
              }}
            >
              <motion.div
                style={{ x, width: `${N * 100}%` }}
                className="flex gap-6 items-stretch"
              >
                {failures.map((f, i) => (
                  <div
                    key={i}
                    style={{ width: `${100 / N}%` }}
                    className="shrink-0"
                  >
                    <div
                      className="rounded-2xl border overflow-hidden h-full transition-colors duration-500"
                      style={{
                        background: '#0d0d12',
                        borderColor: activeIndex === i ? `${f.color}30` : 'rgba(255,255,255,0.06)',
                      }}
                    >
                      {/* Card header */}
                      <div
                        className="flex items-center justify-between px-5 py-3 border-b border-white/5 transition-colors duration-500"
                        style={{ background: activeIndex === i ? `${f.color}08` : 'transparent' }}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="text-[9px] font-mono font-bold px-2 py-0.5 rounded border"
                            style={{ color: f.color, borderColor: `${f.color}35`, background: `${f.color}12` }}
                          >
                            {f.type}
                          </span>
                          <span className="text-[9px] font-mono text-slate-600">{f.num} / 0{N}</span>
                        </div>
                        <span
                          className="text-[9px] font-mono animate-pulse"
                          style={{ color: activeIndex === i ? f.color : 'transparent' }}
                        >
                          ⚠ detected
                        </span>
                      </div>

                      {/* Terminal */}
                      <pre className="px-6 py-5 font-mono text-[11px] leading-[1.85] overflow-x-auto whitespace-pre">
                        {f.code.split('\n').map((line, li) => {
                          const isCmd  = line.startsWith('$');
                          const isDone = line.includes('Done') || line.includes('Action');
                          const isWarn = line.includes('⚠') || line.includes('DETECTED') || line.includes('FLAGGED');
                          const isEmpty = line.trim() === '';
                          return (
                            <div
                              key={li}
                              style={{
                                color: isWarn   ? f.color
                                     : isDone   ? '#4ec9b0'
                                     : isCmd    ? 'rgba(255,255,255,0.75)'
                                     : isEmpty  ? undefined
                                     : 'rgba(148,163,184,1)',
                              }}
                            >
                              {line || ' '}
                            </div>
                          );
                        })}
                      </pre>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

          </div>

          {/* scroll hint */}
          <div className="hidden lg:flex items-center justify-end pb-6 shrink-0">
            <span className="text-[9px] font-mono text-white/20 tracking-widest uppercase">scroll to navigate →</span>
          </div>
        </div>
      </div>

      {/* ── Mobile: vertical stack ── */}
      <div className="lg:hidden px-4 sm:px-6 py-14 space-y-10">
        {failures.map((f, i) => (
          <div key={i} className="space-y-4">
            <div className="flex items-center gap-3">
              <span
                className="text-[10px] font-mono font-bold px-2.5 py-1 rounded border"
                style={{ color: f.color, borderColor: `${f.color}40`, background: `${f.color}10` }}
              >
                {f.type}
              </span>
              <span className="text-[10px] font-mono text-slate-600">{f.num} / 0{N}</span>
            </div>
            <h3 className="text-xl font-semibold text-white leading-snug">{f.title}</h3>
            <p className="text-sm text-slate-400 font-light leading-relaxed">{f.desc}</p>
            <div
              className="rounded-xl border overflow-hidden"
              style={{ background: '#0d0d12', borderColor: `${f.color}25` }}
            >
              <pre className="p-5 font-mono text-[10px] leading-[1.8] text-slate-300 overflow-x-auto whitespace-pre">
                {f.code}
              </pre>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
