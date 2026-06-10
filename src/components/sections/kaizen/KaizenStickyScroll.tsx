import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/* ─── step data ─────────────────────────────────────────────────────────── */
const tabularSteps = [
  {
    num: '01', tag: 'Fit', color: '#6366f1',
    title: 'Load and register your dataset.',
    desc: 'One command reads any CSV, Parquet, or SQL table, registers a session, and auto-detects column types and the target.',
    code: `$ kz fit fraud.csv --target Class

Loading fraud.csv ...
  Rows:   12,000   Cols:  23
  Mode:   tabular  (auto-detected)
  Target: Class    (binary, 0/1)
  Types:  18 numeric · 5 categorical

Session → .kz/session.json
Done  (0.04 s)`,
  },
  {
    num: '02', tag: 'Audit', color: '#06b6d4',
    title: 'Score your data health.',
    desc: 'Runs a full diagnostic sweep — missing values, class imbalance, duplicates, dead features — and returns a single 0–100 Health Score.',
    code: `$ kz audit .kz/session

Auditing fraud.csv ...

  DATA HEALTH SCORE   61 / 100

  MISSING VALUES
  age            12.4 %   →  impute:median
  income          3.1 %   →  impute:mean

  CLASS IMBALANCE
  Class=0        99.83 %
  Class=1         0.17 %   →  SMOTE recommended

  DEAD FEATURES   2 constant columns
  DUPLICATES      4 rows flagged

Done  (0.31 s)`,
  },
  {
    num: '03', tag: 'Validate', color: '#f59e0b',
    title: 'Catch leakage, drift, and hidden traps.',
    desc: "Detects data leakage (correlation >0.95 to target), train/test drift via KS-test, multicollinearity, and skewness. This is why KaizenStat catches what others miss.",
    code: `$ kz validate .kz/session

Checking leakage, drift, statistics ...

  LEAKAGE DETECTED   ⚠
  payment_id   corr=0.998 to target
  Accuracy without it: 64% (was 99.1%)

  DRIFT  (KS-test, train vs test)
  3 features above p<0.05 threshold

  MULTICOLLINEARITY
  2 feature pairs  VIF > 10

Done  (0.52 s)`,
  },
  {
    num: '04', tag: 'Heal', color: '#10b981',
    title: 'Auto-apply every safe fix.',
    desc: "Imputes, encodes, parses datetimes, balances skewed classes. One pass transforms your raw CSV into a training-ready dataset.",
    code: `$ kz heal .kz/session --output healed.csv

Applying fixes ...
  Imputed  "age"     (median strategy)
  Imputed  "income"  (mean strategy)
  Encoded  5 categorical columns
  Parsed   "timestamp"  →  year / month / day
  Applied  SMOTE  (0.17 % → 50/50 ratio)
  Dropped  2 constant cols · 4 duplicates

Output →  healed.csv  (12,004 rows)
Done  (0.89 s)`,
  },
  {
    num: '05', tag: 'Benchmark', color: '#8b5cf6',
    title: 'Train, tune, and ensemble automatically.',
    desc: 'Trains 5 estimators, auto-tunes in two stages (coarse → fine), then builds a stacking ensemble. Platt scaling applied automatically when overconfidence is detected.',
    code: `$ kz benchmark .kz/session

Training 5 estimators + ensemble ...

  RANK  MODEL                ACCURACY   F1
  ────  ───────────────────  ─────────  ──────
  1     XGBoostClassifier    0.9420     0.9381
  2     LGBMClassifier       0.9382     0.9340
  3     RandomForestClassif  0.9150     0.9103

  STACKING ENSEMBLE
  XGBoost + LGBM + RF  →  0.957  (+1.5%)
  2-stage tuning:  coarse → fine
  Platt scaling:   calibration applied

Done  (8.4 s)`,
  },
  {
    num: '06', tag: 'Debug', color: '#f97316',
    title: 'Is it your data or your model?',
    desc: 'Fits a RandomForest baseline to decide root cause. Surfaces failure slices by subgroup so you know exactly which segment to fix — before users find out.',
    code: `$ kz debug .kz/session

Root-cause analysis ...

  DATA vs MODEL BLAME
  RandomForest baseline:  0.55
  Best tuned model:       0.57
  Verdict: DATA problem, not model choice

  FAILURE SLICES
  City="NYC"   52% acc  (n=412)  →  underfit
  City="LA"    79% acc  (n=891)  →  ok
  Age<25       61% acc  (n=203)  →  underfit

Done  (1.2 s)`,
  },
  {
    num: '07', tag: 'Improve', color: '#ec4899',
    title: 'Quantified recommendations, not guesses.',
    desc: 'Generates a ranked list of improvements with expected gain ranges — so you know what to work on next and roughly what it will be worth.',
    code: `$ kz improve .kz/session

Improvement plan ...

  [HIGH]   Ensemble / AutoML    +8–14%  expected gain
  [HIGH]   Class Imbalance      +20–30% minority recall
  [MEDIUM] Calibration          +0.03–0.08 gap reduction
  [HIGH]   Subgroup: City=NYC   +3–8%   overall F1

  4 recommendations generated
Done  (0.3 s)`,
  },
  {
    num: '08', tag: 'Trust', color: '#4ade80',
    title: 'Score production readiness. Ship with confidence.',
    desc: 'Computes a 0–100 Trust Score across accuracy, robustness, calibration, and uncertainty. Generates a self-contained HTML report. Anything above 75 is production-ready.',
    code: `$ kz report --trust .kz/session --serve

Generating production readiness report ...

  TRUST SCORE BREAKDOWN
  Accuracy:    87.4%  ✓   (weight 0.40)
  Robustness:  81.0%  ✓   (weight 0.25)
  Calibration: gap<2% ✓   (weight 0.20)
  Uncertainty: 9% unsure  (weight 0.15)

  Trust Score:  82 / 100  ← PRODUCTION READY

  Serving  →  http://127.0.0.1:8000/report.html
Done  (0.44 s)`,
  },
];

const textSteps = [
  {
    num: '01', tag: 'Fit', color: '#6366f1',
    title: 'Load your text data. Mode auto-detected.',
    desc: 'kz fit reads the CSV, detects the text column automatically, and registers a text-mode session. No config required.',
    code: `$ kz fit reviews.csv --target sentiment

Loading reviews.csv ...
  Rows:   8,500    Cols: 4
  Mode:   text  (auto-detected: "text" col)
  Target: sentiment  (3-class: pos/neg/neu)
  Avg length: 48 tokens · Vocab: 12,481

Session → .kz/session.json
Done  (0.06 s)`,
  },
  {
    num: '02', tag: 'Audit', color: '#06b6d4',
    title: 'Analyse vocabulary, noise, and balance.',
    desc: 'Checks vocab size, hapax ratio (rare tokens), empty documents, and class distribution — everything that affects NLP model quality.',
    code: `$ kz audit .kz/session

TEXT HEALTH SCORE   71 / 100

  VOCABULARY
  Unique tokens:   12,481
  Hapax ratio:     34%  (rare/noise tokens)
  Avg doc length:  48 tokens

  QUALITY
  Empty docs:      12 rows
  Class balance:   pos 42% · neg 32% · neu 26%

  Noise level:     moderate

Done  (0.44 s)`,
  },
  {
    num: '03', tag: 'Validate', color: '#f59e0b',
    title: 'Detect token leakage and text traps.',
    desc: 'Checks for tokens that directly encode the label (text leakage), stopword noise, and class imbalance specific to text data.',
    code: `$ kz validate .kz/session

Text-specific validation ...

  TOKEN LEAKAGE   ⚠
  "positive"  found in text body  →  FLAGGED
  "negative"  found in text body  →  FLAGGED

  STOPWORD NOISE
  28% of tokens are stopwords

  CLASS IMBALANCE
  Neutral underrepresented  (26%)

Done  (0.31 s)`,
  },
  {
    num: '04', tag: 'Heal', color: '#10b981',
    title: 'Clean text. Remove noise. Balance classes.',
    desc: 'Lowercases, strips punctuation, removes leaking tokens, cleans empty documents, and applies class weights where needed.',
    code: `$ kz heal .kz/session

Cleaning text data ...
  Lowercased + stripped punctuation
  Removed 12 empty documents
  Removed leaking tokens: "positive", "negative"
  Applied class weights  (neutral × 1.6)

Output →  healed.csv  (8,488 docs)
Done  (0.52 s)`,
  },
  {
    num: '05', tag: 'Benchmark', color: '#8b5cf6',
    title: 'Race TF-IDF vs embeddings. Best wins.',
    desc: 'Trains three NLP pipelines in parallel — word n-grams, char n-grams, and sentence embeddings. Auto-selects the winner. Upgrades to embeddings only if the gain justifies it.',
    code: `$ kz benchmark .kz/session

Racing NLP pipelines ...

  Pipeline 1  TF-IDF word n-grams     0.849
  Pipeline 2  TF-IDF char n-grams     0.861
  Pipeline 3  MiniLM embeddings       0.891  ← Best

  Auto-selected: MiniLM (+4.2% over TF-IDF)
  Platt scaling applied (calibration)

Done  (22.1 s)`,
  },
  {
    num: '06', tag: 'Debug', color: '#f97316',
    title: 'Rare tokens, sparsity, and failure slices.',
    desc: 'Measures matrix sparsity, identifies hapax tokens contributing noise, and surfaces which classes or slices the model fails on.',
    code: `$ kz debug .kz/session

Diagnosing text model ...

  SPARSITY
  TF-IDF matrix:  94% sparse
  Recommendation: switch to dense embeddings

  RARE TOKENS
  3,412 hapax terms contributing noise

  FAILURE SLICES
  Neutral class accuracy:   41%  (vs 89% pos)
  Short docs (<10 tokens):  38%  acc

Done  (1.6 s)`,
  },
  {
    num: '07', tag: 'Improve', color: '#ec4899',
    title: 'Upgrade to embeddings if the gain justifies it.',
    desc: 'Gives you a ranked, quantified improvement plan for your NLP pipeline — from embedding upgrades to data augmentation.',
    code: `$ kz improve .kz/session

Text improvement plan ...

  [HIGH]   Embedding upgrade         +4–8%  expected
  [MEDIUM] n-gram expansion          +1–3%  expected
  [MEDIUM] Augmentation (back-xlat)  +1–2%  expected
  [LOW]    Stopword tuning           +0–1%  expected

  4 recommendations generated
Done  (0.2 s)`,
  },
  {
    num: '08', tag: 'Trust', color: '#4ade80',
    title: 'Calibrate. Score. Ship.',
    desc: 'Runs calibration, computes the Trust Score, and generates an HTML report. Your text model is scored on accuracy, robustness across classes, and confidence calibration.',
    code: `$ kz report --trust .kz/session --serve

Generating production readiness report ...

  TRUST SCORE BREAKDOWN
  Accuracy:    89.1%  ✓   (weight 0.40)
  Robustness:  74.0%  ✓   (weight 0.25)
  Calibration: gap<3% ✓   (weight 0.20)
  Uncertainty: 11% unsure (weight 0.15)

  Trust Score:  78 / 100  ← PRODUCTION READY

  Serving  →  http://127.0.0.1:8000/report.html
Done  (0.51 s)`,
  },
];

/* ─── component ─────────────────────────────────────────────────────────── */
export function KaizenStickyScroll() {
  const [mode, setMode]           = useState<'tabular' | 'text'>('tabular');
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const steps  = mode === 'tabular' ? tabularSteps : textSteps;
  const active = steps[activeIndex];

  /* reset to top when mode changes */
  useEffect(() => { setActiveIndex(0); }, [mode]);

  /* IntersectionObserver — improved threshold for better accuracy */
  useEffect(() => {
    const observers = itemRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(i);
          }
        },
        { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [mode, steps.length]);

  return (
    <section className="relative border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* ── Section header + mode toggle ── */}
        <div className="pt-24 pb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/50 text-[10px] font-mono uppercase tracking-wider bg-white/[0.02]">
              Pipeline
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white leading-snug">
              The complete ML pipeline.
            </h2>
          </div>

          {/* Mode toggle */}
          <div
            className="flex items-center p-1 rounded-xl border border-white/8 shrink-0"
            style={{ background: '#0a0a10' }}
          >
            {(['tabular', 'text'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="relative px-5 py-2 rounded-lg text-xs font-mono font-medium transition-all duration-300"
                style={{
                  background: mode === m ? 'rgba(255,255,255,0.06)' : 'transparent',
                  color:      mode === m ? '#fff' : 'rgba(255,255,255,0.3)',
                  border:     mode === m ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                }}
              >
                {m === 'tabular' ? 'Tabular Data' : 'Text / NLP'}
              </button>
            ))}
          </div>
        </div>

        {/* ── Desktop layout ── */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-20">

          {/* LEFT — sticky */}
          <div className="sticky top-[80px] h-[calc(100vh-80px)] flex flex-col justify-center py-12">
            <div className="space-y-7">

              {/* Progress dots */}
              <div className="flex items-center gap-2">
                {steps.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => itemRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                    className="transition-all duration-400"
                    style={{
                      height: '2px',
                      width: i === activeIndex ? '28px' : '8px',
                      background: i === activeIndex ? active.color : 'rgba(255,255,255,0.1)',
                      borderRadius: '2px',
                    }}
                  />
                ))}
                <span className="text-[10px] font-mono text-slate-600 ml-2">
                  {activeIndex + 1} / {String(steps.length).padStart(2, '0')}
                </span>
              </div>

              {/* Mode badge */}
              <div
                className="w-fit text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded border"
                style={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
              >
                {mode === 'tabular' ? 'tabular · csv / parquet / sql' : 'text / nlp · reviews · tickets'}
              </div>

              {/* Tag */}
              <div
                className="w-fit text-[10px] font-mono font-bold px-2.5 py-1 rounded border transition-colors duration-500"
                style={{ color: active.color, borderColor: `${active.color}40`, background: `${active.color}12` }}
              >
                {active.tag}
              </div>

              {/* Title */}
              <motion.h2
                key={`title-${mode}-${activeIndex}`}
                initial={{ opacity: 0.4, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl md:text-4xl font-semibold tracking-tight text-white leading-snug"
              >
                {active.title}
              </motion.h2>

              {/* Description */}
              <motion.p
                key={`desc-${mode}-${activeIndex}`}
                initial={{ opacity: 0.4, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm text-slate-400 font-light leading-relaxed max-w-xs"
              >
                {active.desc}
              </motion.p>

              {/* Step list */}
              <div className="space-y-1.5 pt-1">
                {steps.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => itemRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                    className="flex items-center gap-3 w-full text-left"
                  >
                    <span
                      className="text-[9px] font-mono transition-colors duration-300"
                      style={{ color: i === activeIndex ? active.color : 'rgba(255,255,255,0.18)' }}
                    >
                      {s.num}
                    </span>
                    <span
                      className="text-xs font-medium transition-colors duration-300"
                      style={{ color: i === activeIndex ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.22)' }}
                    >
                      {s.tag}
                    </span>
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* RIGHT — scrollable cards */}
          <div key={mode} className="py-24 space-y-6" ref={containerRef}>
            {steps.map((step, i) => (
              <div
                key={i}
                ref={el => { itemRefs.current[i] = el; }}
                className="min-h-[45vh] flex flex-col justify-center"
              >
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl border overflow-hidden transition-colors duration-500"
                  style={{
                    background: '#0d0d12',
                    borderColor: activeIndex === i ? `${step.color}30` : 'rgba(255,255,255,0.06)',
                  }}
                >
                  {/* Card header */}
                  <div
                    className="flex items-center justify-between px-5 py-3 border-b border-white/5 transition-colors duration-500"
                    style={{ background: activeIndex === i ? `${step.color}08` : 'transparent' }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="text-[9px] font-mono font-bold px-2 py-0.5 rounded border transition-colors duration-500"
                        style={{ color: step.color, borderColor: `${step.color}35`, background: `${step.color}12` }}
                      >
                        {step.tag}
                      </span>
                      <span className="text-[9px] font-mono text-slate-600">{step.num} / 0{steps.length}</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-700">terminal</span>
                  </div>

                  {/* Code output */}
                  <pre className="px-6 py-5 font-mono text-[11px] leading-[1.85] overflow-x-auto whitespace-pre">
                    {step.code.split('\n').map((line, li) => {
                      const isCmd    = line.startsWith('$');
                      const isResult = line.includes('Done') || line.includes('→') || line.includes('Session') || line.includes('Output') || line.includes('Best') || line.includes('Serving') || line.includes('Written') || line.includes('Trust Score');
                      const isDim    = line.startsWith('  ────') || line.startsWith('  RANK') || line.startsWith('  Pipeline');
                      const isWarn   = line.includes('⚠') || line.includes('FLAGGED') || line.includes('LEAKAGE');
                      const isEmpty  = line.trim() === '';
                      return (
                        <div
                          key={li}
                          style={{
                            color: isWarn   ? '#fbbf24' :
                                   isCmd    ? 'rgba(255,255,255,0.75)' :
                                   isResult ? step.color :
                                   isDim    ? 'rgba(255,255,255,0.2)' :
                                   isEmpty  ? undefined :
                                   'rgba(148,163,184,1)',
                          }}
                        >
                          {line || ' '}
                        </div>
                      );
                    })}
                  </pre>
                </motion.div>
              </div>
            ))}
          </div>

        </div>

        {/* ── Mobile: vertical stack ── */}
        <div className="lg:hidden py-14 space-y-10">
          {steps.map((step, i) => (
            <div key={i} className="space-y-4">
              <div className="flex items-center gap-3">
                <span
                  className="text-[10px] font-mono font-bold px-2.5 py-1 rounded border"
                  style={{ color: step.color, borderColor: `${step.color}40`, background: `${step.color}10` }}
                >
                  {step.tag}
                </span>
                <span className="text-[10px] font-mono text-slate-600">{step.num} / 0{steps.length}</span>
              </div>
              <h3 className="text-xl font-semibold text-white leading-snug">{step.title}</h3>
              <p className="text-sm text-slate-400 font-light leading-relaxed">{step.desc}</p>
              <div
                className="rounded-xl border overflow-hidden"
                style={{ background: '#0d0d12', borderColor: `${step.color}25` }}
              >
                <pre className="p-5 font-mono text-[10px] leading-[1.8] text-slate-300 overflow-x-auto whitespace-pre">
                  {step.code}
                </pre>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
