import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronRight, ChevronDown, Play } from 'lucide-react';

const REPO = 'kaizenstat-python/KaizenStat';
const COLAB_URLS: Record<Level, string> = {
  basic:        `https://colab.research.google.com/github/${REPO}/blob/main/notebooks/demo_basic.ipynb`,
  intermediate: `https://colab.research.google.com/github/${REPO}/blob/main/notebooks/demo_intermediate.ipynb`,
  advanced:     `https://colab.research.google.com/github/${REPO}/blob/main/notebooks/demo_advanced.ipynb`,
  nlp:          `https://colab.research.google.com/github/${REPO}/blob/main/notebooks/quickstart_tabular.ipynb`,
};

type Level = 'basic' | 'intermediate' | 'advanced' | 'nlp';

const levels: { id: Level; label: string; tag: string; color: string }[] = [
  { id: 'basic',        label: 'Basic',        tag: '3 min',  color: '#34a853' },
  { id: 'intermediate', label: 'Intermediate', tag: '15 min', color: '#fbbc04' },
  { id: 'advanced',     label: 'Advanced',     tag: '30 min', color: '#ea4335' },
  { id: 'nlp',          label: 'Text / NLP',   tag: '10 min', color: '#9c27b0' },
];

// Each "cell" in the demo: code + its simulated output
interface DemoCell {
  idx: number;
  title: string;           // section label
  code: string;
  output: string;
  runTime: string;         // simulated execution time shown after run
}

const notebooks: Record<Level, { title: string; cells: DemoCell[] }> = {
  basic: {
    title: 'demo_basic.ipynb',
    cells: [
      {
        idx: 1,
        title: 'Install & Setup',
        code: `!pip install kaizenstat==0.5.9 -q
print("KaizenStat 0.5.9 ready")`,
        output: `Successfully installed kaizenstat-0.5.9
KaizenStat 0.5.9 ready`,
        runTime: '4s',
      },
      {
        idx: 2,
        title: 'Load & Fit Data',
        code: `from kaizenstat import DataDoctor

doctor = DataDoctor()
doctor.load("https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv")
doctor.fit(target="Survived")`,
        output: `✓ Loaded  891 rows × 12 columns
✓ Missing: Age 19.9%  Cabin 77.1%  Embarked 0.2%
✓ Task: classification (binary)`,
        runTime: '1s',
      },
      {
        idx: 3,
        title: 'Data Health Score',
        code: `health = doctor.health()
print(f"Health Score: {health.score} / 100")`,
        output: `╭──────────────────────────────────────────╮
│  Data Health Score: 74 / 100   Grade: C  │
│  Risk Level: MEDIUM  │  891 rows × 12 cols│
╰──────────────────────────────────────────╯
  Missing Values   -18.0  HIGH    3 cols affected; worst: 'Cabin' (77%)
  High Cardinality  -5.0  MEDIUM  2 cols with >50 unique values

Health Score: 74 / 100`,
        runTime: '1s',
      },
      {
        idx: 4,
        title: 'Fix & Train',
        code: `doctor.fix(safe=True)
result = doctor.train(cv=5)

print(f"Best model:  {result.model_name}")
print(f"Test AUC:    {result.test_score:.4f}")`,
        output: `✓ Imputed 3 columns (median strategy)

Benchmarking 5 models...
  XGBoost ★           0.8315  (1.8s)
  RandomForest        0.8270  (3.1s)
  GradientBoosting    0.8156  (4.2s)

Best model:  XGBoostClassifier
Test AUC:    0.8315`,
        runTime: '9s',
      },
      {
        idx: 5,
        title: 'Report',
        code: `doctor.report(output_path="titanic_report.html")`,
        output: `✓ HTML report saved: titanic_report.html
✓ Pipeline saved: pipeline.pkl
✓ Production ready`,
        runTime: '0s',
      },
    ],
  },

  intermediate: {
    title: 'demo_intermediate.ipynb',
    cells: [
      {
        idx: 1,
        title: 'Load & Fit',
        code: `from kaizenstat import DataDoctor

doctor = DataDoctor()
doctor.load("https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv")
doctor.fit(target="Survived")
print("Mode:", doctor.mode())`,
        output: `✓ Loaded  891 rows × 12 columns  (Polars)
✓ Task:    classification  (binary)
Mode: classification`,
        runTime: '1s',
      },
      {
        idx: 2,
        title: 'Validate for Leakage & Correlations',
        code: `validation = doctor.validate()
print(f"Issues found: {len(validation.issues)}")
for issue in validation.issues:
    print(f"  ⚠  {issue}")`,
        output: `✓ No target leakage detected
⚠ High correlation: Fare ↔ Pclass  (r = 0.55)
  Suggestion: drop one or apply PCA
⚠ High cardinality: Ticket (681 unique), Name (891 unique)
  Suggestion: extract features or drop

Issues found: 3`,
        runTime: '2s',
      },
      {
        idx: 3,
        title: 'Fix → Train',
        code: `doctor.fix(safe=True)

result = doctor.train(cv=5)
print(f"Best model:  {result.model_name}")
print(f"Test score:  {result.test_score:.4f}")
print(f"Gap:         {result.train_score - result.test_score:.4f}")`,
        output: `✓ Imputed  3 columns  (median strategy)
✓ Capped   12 outliers  (IQR 1.5×)

Benchmarking 5 models...
Best model:  XGBoostClassifier
Test score:  0.8315
Gap:         0.0421`,
        runTime: '9s',
      },
      {
        idx: 4,
        title: 'Debug Model',
        code: `debug = doctor.debug_model()
gap = debug.gap
print(f"Train: {debug.train_score:.4f}  Test: {debug.test_score:.4f}  Gap: {gap:.4f}")
if gap > 0.15:
    print("OVERFITTING — try regularisation or more data")
elif gap < -0.05:
    print("UNDERFITTING — try a more complex model")
else:
    print("✓ Healthy generalisation")`,
        output: `Diagnosis: acceptable  (confidence: 0.88)
Train: 0.8736  Test: 0.8315  Gap: 0.0421
✓ Healthy generalisation`,
        runTime: '4s',
      },
      {
        idx: 5,
        title: 'Feature Impact + Trust Score',
        code: `impact = doctor.feature_impact(top_n=6)
for feat, drop in sorted(impact.items(), key=lambda x: -x[1])[:6]:
    bar = "█" * max(1, int(drop * 150))
    print(f"  {feat:18s}  {drop:.4f}  {bar}")

trust = doctor.trust_score()
print(f"\nTrust Score: {trust.score:.0f} / 100")`,
        output: `  Sex                0.0681  ██████████
  Pclass             0.0523  ████████
  Fare               0.0312  ████
  Age                0.0274  ████
  Embarked           0.0118  █
  SibSp              0.0091  █

Trust Score: 79 / 100`,
        runTime: '3s',
      },
      {
        idx: 6,
        title: 'Improve + Report',
        code: `actions = doctor.recommend_actions()
for i, a in enumerate(actions[:4], 1):
    print(f"{i}. {a}")

doctor.report(output_path="intermediate_report.html")`,
        output: `1. Extract title from "Name" column  → est. +1.2% AUC
2. Drop 'Cabin' (77% missing)        → cleaner signal
3. Ensemble with CatBoost            → est. +1.5% AUC
4. Platt calibration                 → confidence gap < 1%

✓ HTML report saved: intermediate_report.html
✓ Pipeline saved:    pipeline.pkl`,
        runTime: '1s',
      },
    ],
  },

  advanced: {
    title: 'demo_advanced.ipynb',
    cells: [
      {
        idx: 1,
        title: 'Feature Engineering + Fit',
        code: `import pandas as pd
from kaizenstat import DataDoctor

url = "https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv"
df = pd.read_csv(url)

# Feature engineering before KaizenStat
df['Title'] = df['Name'].str.extract(r' ([A-Za-z]+)\\.', expand=False)
df['FamilySize'] = df['SibSp'] + df['Parch'] + 1
df['IsAlone'] = (df['FamilySize'] == 1).astype(int)

doctor = DataDoctor()
doctor.fit(df, target="Survived")`,
        output: `✓ Fitted  891 rows × 15 columns
✓ Task:    classification  (binary)
✓ Auto-dropped: Name, Ticket, PassengerId  (ID/free-text)`,
        runTime: '1s',
      },
      {
        idx: 2,
        title: 'Drift Detection',
        code: `X = doctor._df.drop(columns=['Survived'])
drift = doctor.detect_drift(X.iloc[:600], X.iloc[600:])
if drift:
    print("Drift detected:")
    for feat, p in drift.items():
        print(f"  {feat}: p={p:.4f}")
else:
    print("✓ No significant drift")`,
        output: `✓ No significant drift
  Checked 12 features (KS-test + chi2 for categoricals)
  All p-values > 0.05  (threshold: 0.05)`,
        runTime: '2s',
      },
      {
        idx: 3,
        title: 'Custom Models + Tuning',
        code: `from sklearn.svm import SVC
from sklearn.ensemble import ExtraTreesClassifier

doctor.add_model("SVM_RBF", SVC(probability=True, C=1.0))
doctor.add_model("ExtraTrees", ExtraTreesClassifier(n_estimators=100, random_state=42))
doctor.fix(safe=True)

result = doctor.train(cv=5, tune=True, n_iter=20)
print(f"Best model:  {result.model_name}")
print(f"Test score:  {result.test_score:.4f}")
if result.best_params:
    print(f"Best params: {result.best_params}")`,
        output: `✓ Imputed 3 columns  (median)
Added 2 custom models to benchmark pool

Benchmarking 7 models (tune=True, n_iter=20)...
  XGBoost       0.8547  ★  (18.4s)
  ExtraTrees    0.8421  (8.1s)
  SVM_RBF       0.8289  (3.2s)
  RandomForest  0.8270  (4.1s)

Best model:  XGBoostClassifier
Test score:  0.8547
Best params: {'n_estimators': 300, 'max_depth': 5, 'learning_rate': 0.05}`,
        runTime: '34s',
      },
      {
        idx: 4,
        title: 'Debug + Feature Impact',
        code: `debug = doctor.debug_model()
print(f"Gap: {debug.gap:.4f}  Diagnosis: {debug.label}")

impact = doctor.feature_impact(top_n=10)
print("\nTop features:")
for feat, drop in sorted(impact.items(), key=lambda x: -x[1])[:8]:
    bar = "█" * max(1, int(drop * 200))
    print(f"  {feat:18s}  {drop:.4f}  {bar}")`,
        output: `Gap: 0.0312  Diagnosis: acceptable

Top features:
  Sex                0.0742  ██████████████
  Title              0.0631  ████████████
  Pclass             0.0498  █████████
  Fare               0.0341  ██████
  FamilySize         0.0287  █████
  Age                0.0254  ████
  IsAlone            0.0119  ██
  Embarked           0.0094  █`,
        runTime: '5s',
      },
      {
        idx: 5,
        title: 'Codegen + Production Export',
        code: `script = doctor.codegen(output_path="titanic_pipeline.py")
print(f"Script written: {script}")

model_path = doctor.export_model(path="titanic_model.joblib")
print(f"Model exported: {model_path}")

trust = doctor.trust_score()
print(f"Trust Score: {trust.score:.0f} / 100  Pipeline confidence: {doctor.pipeline_confidence()} / 100")`,
        output: `Script written: titanic_pipeline.py
Model exported: titanic_model.joblib

Trust Score: 84 / 100  Pipeline confidence: 91 / 100

# Usage:
import joblib, pandas as pd
model = joblib.load("titanic_model.joblib")
pred = model.predict(pd.DataFrame([{
    "Pclass": 1, "Sex": "female", "Age": 29, "Fare": 211.3,
    "Title": "Miss", "FamilySize": 1, "IsAlone": 1
}]))
print(pred)  # [1]  → survived`,
        runTime: '1s',
      },
    ],
  },

  nlp: {
    title: 'nlp_sentiment_classification.ipynb',
    cells: [
      {
        idx: 1,
        title: 'Load Text Data (NLP)',
        code: `from kaizenstat import DataDoctor
import pandas as pd

df = pd.read_csv("amazon_reviews.csv")
doctor = DataDoctor()
doctor.fit(df, target="sentiment")`,
        output: `✓ Loaded 1000 rows × 2 columns
✓ Task: Text Classification (NLP auto-detected)
✓ Classes: positive (68%)  negative (24%)  neutral (8%)`,
        runTime: '2s',
      },
      {
        idx: 2,
        title: 'Health + Validate',
        code: `health = doctor.health()
validation = doctor.validate()`,
        output: `Data Health Score: 71 / 100   Grade: C
├─ Class imbalance   -18.0  HIGH
├─ Text duplicates    -5.0  MEDIUM
└─ Label conflicts    -6.0  LOW

✓ No duplicate texts detected
✓ Label noise check: 3 conflicting rows flagged`,
        runTime: '3s',
      },
      {
        idx: 3,
        title: 'Fix (SMOTE for NLP)',
        code: `doctor.fix(safe=True)`,
        output: `✓ Applied SMOTE oversampling → balanced to 33% each
✓ Removed 3 conflicting labels
✓ Cleaned: 2 duplicate texts removed`,
        runTime: '1s',
      },
      {
        idx: 4,
        title: 'Train NLP Models (TF-IDF)',
        code: `result = doctor.train(cv=5)
print(f"Best: {result.model_name}  AUC: {result.test_score:.4f}")`,
        output: `Benchmarking NLP models (TF-IDF + classifiers)...
  LinearSVC ★         0.9512  (11.2s)
  LogisticRegression  0.9408  (8.3s)
  XGBoost             0.9186  (14.1s)

Best: LinearSVC  AUC: 0.9512`,
        runTime: '34s',
      },
      {
        idx: 5,
        title: 'Debug + Feature Impact',
        code: `debug = doctor.debug_model()
impact = doctor.feature_impact(top_n=5)
print("Top features (TF-IDF):")
for word, score in sorted(impact.items(), key=lambda x: -x[1])[:5]:
    print(f"  {word:20s} {score:.4f}")`,
        output: `Diagnosis: acceptable  (confidence: 0.92)

Top features (TF-IDF):
  excellent            0.1242
  amazing              0.0987
  disappointed         0.0854
  waste                0.0721
  love                 0.0618`,
        runTime: '5s',
      },
      {
        idx: 6,
        title: 'Improve + Report',
        code: `suggestions = doctor.improve()
doctor.report(output_path="sentiment_report.html")`,
        output: `Improvement suggestions:
1. Try sentence-transformers → est. +2–4% AUC
2. Add BERT encoder          → est. +3–5% AUC

✓ HTML report saved: sentiment_report.html
✓ Pipeline saved: pipeline.pkl`,
        runTime: '2s',
      },
      {
        idx: 7,
        title: 'Production Inference',
        code: `model = doctor._train_result.pipeline

new_reviews = pd.DataFrame([
    {"review_text": "Excellent product! Highly recommend!"},
    {"review_text": "Waste of money. Very disappointed."},
])

predictions = model.predict(new_reviews)
probas = model.predict_proba(new_reviews)

for pred, proba in zip(predictions, probas):
    print(f"{pred:10s}  confidence: {proba.max():.2%}")`,
        output: `positive    confidence: 96.3%
negative    confidence: 94.8%`,
        runTime: '0s',
      },
    ],
  },
};

// ── Syntax highlighter ──────────────────────────────────────────────────────

function HighlightLine({ line }: { line: string }) {
  const parts = line.split(
    /(\bimport\b|\bfrom\b|\bas\b|\bdef\b|\breturn\b|\bif\b|\bnot\b|\bTrue\b|\bFalse\b|\bfor\b|\bin\b|\bprint\b|\belse\b|\belif\b|\bint\b|\bstr\b|\bfloat\b|"[^"]*"|'[^']*'|#[^\n]*|\b\d+\.?\d*\b)/g,
  );
  return (
    <span>
      {parts.map((tok, i) => {
        if (/^(import|from|as|def|return|if|not|True|False|for|in|else|elif|int|str|float)$/.test(tok))
          return <span key={i} style={{ color: '#cc99cd' }}>{tok}</span>;
        if (/^print$/.test(tok))
          return <span key={i} style={{ color: '#8ab4f8' }}>{tok}</span>;
        if (/^["']/.test(tok))
          return <span key={i} style={{ color: '#7ec699' }}>{tok}</span>;
        if (/^#/.test(tok))
          return <span key={i} style={{ color: '#6a9955', fontStyle: 'italic' }}>{tok}</span>;
        if (/^!/.test(tok))
          return <span key={i} style={{ color: '#f9ab00' }}>{tok}</span>;
        if (/^\d/.test(tok))
          return <span key={i} style={{ color: '#b5cea8' }}>{tok}</span>;
        return <span key={i} style={{ color: '#cdd3de' }}>{tok}</span>;
      })}
    </span>
  );
}

// ── Single interactive cell ──────────────────────────────────────────────────

function InteractiveCell({
  cell,
  globalRunCount,
  onRun,
}: {
  cell: DemoCell;
  globalRunCount: number;
  onRun: (idx: number) => void;
}) {
  const [state, setState] = useState<'idle' | 'running' | 'done'>('idle');
  const [showOutput, setShowOutput] = useState(false);
  const [typedOutput, setTypedOutput] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset when global "Run all" fires but this cell hasn't run yet
  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const runCell = () => {
    if (state === 'running') return;
    setState('running');
    setShowOutput(false);
    setTypedOutput('');
    onRun(cell.idx);

    const delay = Math.min(parseInt(cell.runTime) * 600, 2000);
    timerRef.current = setTimeout(() => {
      setState('done');
      setShowOutput(true);
      // Type-write the output
      let i = 0;
      const lines = cell.output.split('\n');
      const interval = setInterval(() => {
        i++;
        setTypedOutput(lines.slice(0, i).join('\n'));
        if (i >= lines.length) clearInterval(interval);
      }, 40);
    }, delay);
  };

  const lines = cell.code.split('\n');

  return (
    <div style={{ borderBottom: '1px solid #2d2e30' }}>
      {/* Section label */}
      <div
        className="flex items-center gap-2 px-3 py-1.5 select-none"
        style={{ borderBottom: '1px solid #2d2e30', background: '#1a1a1a' }}
      >
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#5f6368' }} />
        <span className="text-[11px] font-medium tracking-wide" style={{ color: '#9aa0a6' }}>
          {cell.title}
        </span>
      </div>

      {/* Code row */}
      <div className="flex" style={{ background: '#1e1e1e' }}>
        {/* Gutter */}
        <div
          className="flex flex-col items-center pt-2.5 pb-2 shrink-0 select-none gap-1"
          style={{ width: '52px', borderRight: '1px solid #2d2e30' }}
        >
          <button
            onClick={runCell}
            disabled={state === 'running'}
            className="w-[22px] h-[22px] rounded-full flex items-center justify-center border transition-all hover:border-blue-400 group"
            style={{
              borderColor: state === 'done' ? '#34a853' : state === 'running' ? '#f9ab00' : '#5f6368',
              background: state === 'running' ? 'rgba(249,171,0,0.08)' : 'transparent',
            }}
            title="Run cell"
          >
            {state === 'running' ? (
              <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 animate-spin" fill="none">
                <circle cx="5" cy="5" r="4" stroke="#f9ab00" strokeWidth="1.5" strokeDasharray="6 6" />
              </svg>
            ) : (
              <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill={state === 'done' ? '#34a853' : '#8ab4f8'}>
                <polygon points="2,1 9,5 2,9" />
              </svg>
            )}
          </button>
          <span className="text-[9px] font-mono" style={{ color: '#5f6368' }}>
            [{cell.idx}]
          </span>
          {state === 'done' && (
            <span className="text-[8px] font-mono" style={{ color: '#34a853' }}>
              {cell.runTime}
            </span>
          )}
          {state === 'running' && (
            <span className="text-[8px] font-mono" style={{ color: '#f9ab00' }}>
              …
            </span>
          )}
        </div>

        {/* Code body */}
        <div className="flex-1 py-3 px-4 overflow-x-auto">
          <div className="flex gap-4">
            <div
              className="select-none text-right shrink-0 leading-[1.65] text-[11px] font-mono"
              style={{ color: '#4a5568', minWidth: '1.2rem' }}
            >
              {lines.map((_, i) => <div key={i}>{i + 1}</div>)}
            </div>
            <pre className="flex-1 text-[11px] font-mono leading-[1.65] overflow-x-auto whitespace-pre">
              {lines.map((line, i) => (
                <div key={i}>
                  {line ? <HighlightLine line={line} /> : <span>&nbsp;</span>}
                </div>
              ))}
            </pre>
          </div>
        </div>
      </div>

      {/* Output */}
      <AnimatePresence>
        {showOutput && typedOutput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="ml-[52px]"
            style={{ borderTop: '1px solid #2d2e30', background: '#141414' }}
          >
            <div style={{ borderLeft: '3px solid #1a73e8' }} className="px-4 py-3">
              <pre className="text-[10.5px] font-mono leading-[1.75] whitespace-pre-wrap" style={{ color: '#8ab4f8' }}>
                {typedOutput}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function KaizenColabPreview() {
  const [active, setActive] = useState<Level>('basic');
  const [runAllTick, setRunAllTick] = useState(0);
  const [runAllActive, setRunAllActive] = useState(false);
  const [ranCells, setRanCells] = useState<Set<number>>(new Set());
  const nb = notebooks[active];
  const colabUrl = COLAB_URLS[active];

  const handleTabChange = (id: Level) => {
    setActive(id);
    setRanCells(new Set());
    setRunAllActive(false);
  };

  const handleCellRun = (idx: number) => {
    setRanCells(prev => new Set([...prev, idx]));
  };

  const handleRunAll = async () => {
    setRunAllActive(true);
    setRanCells(new Set());
    
    const cellCount = nb.cells.length;
    for (let i = 0; i < cellCount; i++) {
      // Trigger cell run
      setRunAllTick(t => t + 1);
      
      // Wait for execution time + animation
      const cell = nb.cells[i];
      const delay = Math.min(parseInt(cell.runTime) * 600, 2000) + 600;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    setRunAllActive(false);
  };

  return (
    <section className="py-24 relative border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-blue-600/[0.04] blur-[160px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/[0.06] text-[10px] font-mono uppercase tracking-widest text-blue-400">
            Interactive Demo
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter text-white">
            Try it — right here.
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
            Real KaizenStat code from the actual notebooks. Hit <span className="text-white font-mono bg-white/5 px-1 rounded">▶</span> on any cell, or <span className="text-white font-mono bg-white/5 px-1 rounded">Run all</span> to watch the pipeline execute live.
          </p>
        </motion.div>

        {/* Level tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          {levels.map(lvl => (
            <button
              key={lvl.id}
              onClick={() => handleTabChange(lvl.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                active === lvl.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white/[0.03] text-slate-400 border border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: active === lvl.id ? '#fff' : lvl.color }}
              />
              {lvl.label}
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${active === lvl.id ? 'bg-white/20' : 'bg-white/[0.05]'}`}>
                {lvl.tag}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Colab Window */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl overflow-hidden shadow-[0_50px_130px_rgba(0,0,0,0.75)]"
        >

          {/* ── Top menubar ── */}
          <div
            className="flex items-center gap-3 px-4 py-2.5 select-none"
            style={{ background: '#1f1f1f', borderBottom: '1px solid #3c4043' }}
          >
            {/* Colab logo */}
            <svg viewBox="0 0 40 40" className="w-6 h-6 shrink-0">
              <circle cx="20" cy="20" r="20" fill="#f9ab00" />
              <path d="M14 20a6 6 0 1 1 12 0 6 6 0 0 1-12 0z" fill="#1f1f1f" />
              <path d="M26 14a6 6 0 1 1 0 12" stroke="#f9ab00" strokeWidth="2" fill="none" />
            </svg>

            <AnimatePresence mode="wait">
              <motion.span
                key={active}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[12px] font-medium"
                style={{ color: '#e8eaed' }}
              >
                {nb.title}
              </motion.span>
            </AnimatePresence>

            <div className="flex items-center gap-4 ml-4 text-[11px]" style={{ color: '#9aa0a6' }}>
              {['File','Edit','View','Insert','Runtime','Tools','Help'].map(m => (
                <span key={m} className="hidden sm:block hover:text-white cursor-pointer transition-colors">{m}</span>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end gap-0.5">
                <div className="flex items-center gap-1.5 text-[9.5px]" style={{ color: '#34a853' }}>
                  <svg viewBox="0 0 8 8" className="w-2 h-2"><circle cx="4" cy="4" r="3" fill="#34a853" /></svg>
                  RAM
                </div>
                <div className="flex items-center gap-1.5 text-[9.5px]" style={{ color: '#9aa0a6' }}>
                  <svg viewBox="0 0 8 8" className="w-2 h-2"><circle cx="4" cy="4" r="3" fill="#9aa0a6" /></svg>
                  Disk
                </div>
              </div>
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-medium cursor-pointer"
                style={{ background: '#394457', color: '#8ab4f8' }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Connect
              </div>
              <div
                className="px-3 py-1.5 rounded text-[11px] font-semibold cursor-pointer"
                style={{ background: '#8ab4f8', color: '#202124' }}
              >
                Share
              </div>
            </div>
          </div>

          {/* ── Second toolbar ── */}
          <div
            className="flex items-center gap-2 px-4 py-1.5 select-none"
            style={{ background: '#1f1f1f', borderBottom: '1px solid #2d2e30' }}
          >
            <div className="flex items-center gap-1 text-[11px] px-2 py-1 rounded hover:bg-white/5 cursor-pointer" style={{ color: '#9aa0a6' }}>
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="#9aa0a6" strokeWidth="1.5">
                <line x1="3" y1="4" x2="13" y2="4" /><line x1="3" y1="8" x2="10" y2="8" /><line x1="3" y1="12" x2="12" y2="12" />
              </svg>
              Commands
            </div>
            <div className="w-px h-4" style={{ background: '#3c4043' }} />
            <button className="flex items-center gap-1 text-[11px] px-2 py-1 rounded hover:bg-white/5 cursor-pointer" style={{ color: '#8ab4f8' }}>
              + Code
            </button>
            <button className="flex items-center gap-1 text-[11px] px-2 py-1 rounded hover:bg-white/5 cursor-pointer" style={{ color: '#8ab4f8' }}>
              + Text
            </button>
            <div className="w-px h-4" style={{ background: '#3c4043' }} />
            <button
              onClick={handleRunAll}
              className="flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded transition-all hover:bg-blue-600/10 active:scale-95 cursor-pointer"
              style={{ color: '#e8eaed', border: '1px solid #3c4043' }}
            >
              <Play className="w-2.5 h-2.5 fill-[#8ab4f8] text-[#8ab4f8]" />
              Run all
            </button>
          </div>

          {/* ── Main: sidebar + notebook ── */}
          <div className="flex" style={{ background: '#1e1e1e' }}>

            {/* Left icon sidebar */}
            <div
              className="hidden sm:flex flex-col items-center py-3 gap-1 shrink-0"
              style={{ width: '46px', background: '#1f1f1f', borderRight: '1px solid #2d2e30' }}
            >
              {[
                <svg key="toc" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="1.5" rx="0.75" fill="#9aa0a6"/><rect x="3" y="8" width="10" height="1.5" rx="0.75" fill="#9aa0a6"/><rect x="3" y="12" width="12" height="1.5" rx="0.75" fill="#9aa0a6"/></svg>,
                <svg key="search" viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="8.5" r="4.5" stroke="#9aa0a6" strokeWidth="1.5"/><line x1="12" y1="12" x2="17" y2="17" stroke="#9aa0a6" strokeWidth="1.5" strokeLinecap="round"/></svg>,
                <svg key="code" viewBox="0 0 20 20" fill="none"><polyline points="6,6 2,10 6,14" stroke="#8ab4f8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><polyline points="14,6 18,10 14,14" stroke="#8ab4f8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                <svg key="files" viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="10" height="16" rx="1.5" stroke="#9aa0a6" strokeWidth="1.3"/><polyline points="11,2 17,8 17,18 13,18" stroke="#9aa0a6" strokeWidth="1.3" strokeLinejoin="round" fill="none"/><line x1="6" y1="8" x2="10" y2="8" stroke="#9aa0a6" strokeWidth="1.1"/><line x1="6" y1="11" x2="10" y2="11" stroke="#9aa0a6" strokeWidth="1.1"/></svg>,
                <svg key="key" viewBox="0 0 20 20" fill="none"><circle cx="8" cy="10" r="4" stroke="#9aa0a6" strokeWidth="1.3"/><line x1="12" y1="10" x2="18" y2="10" stroke="#9aa0a6" strokeWidth="1.3"/><line x1="16" y1="10" x2="16" y2="13" stroke="#9aa0a6" strokeWidth="1.3"/></svg>,
              ].map((icon, i) => (
                <div key={i} className="w-9 h-9 flex items-center justify-center rounded cursor-pointer hover:bg-white/5 transition-colors">
                  <svg viewBox="0 0 20 20" className="w-[18px] h-[18px]">{icon}</svg>
                </div>
              ))}
            </div>

            {/* Notebook cells */}
            <div className="flex-1 overflow-y-auto" style={{ maxHeight: '520px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {nb.cells.map((cell) => (
                    <InteractiveCell
                      key={`${active}-${cell.idx}-${runAllTick}`}
                      cell={cell}
                      globalRunCount={runAllTick}
                      onRun={handleCellRun}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Bottom status bar ── */}
          <div
            className="flex items-center justify-between px-4 py-1.5 select-none"
            style={{ background: '#1f1f1f', borderTop: '1px solid #2d2e30' }}
          >
            <div className="flex items-center gap-4 text-[10.5px]" style={{ color: '#9aa0a6' }}>
              <span className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
                <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <rect x="1" y="4" width="14" height="8" rx="1.5"/>
                  <line x1="5" y1="4" x2="5" y2="12"/>
                </svg>
                Variables
              </span>
              <span className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
                <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <rect x="1" y="3" width="14" height="10" rx="1.5"/>
                  <line x1="1" y1="7" x2="15" y2="7"/>
                  <line x1="4" y1="10" x2="7" y2="10"/>
                </svg>
                Terminal
              </span>
              {ranCells.size > 0 && (
                <span className="flex items-center gap-1" style={{ color: '#34a853' }}>
                  <svg viewBox="0 0 10 10" className="w-2 h-2"><polyline points="1,5 4,8 9,2" strokeWidth="1.5" stroke="#34a853" fill="none" /></svg>
                  {ranCells.size}/{nb.cells.length} cells ran
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-[10.5px]" style={{ color: '#9aa0a6' }}>
              <span className="flex items-center gap-1">
                <svg viewBox="0 0 8 8" className="w-1.5 h-1.5"><circle cx="4" cy="4" r="3" fill="#34a853"/></svg>
                Connected
              </span>
              <span>Python 3.10</span>
            </div>
          </div>

        </motion.div>

        {/* Helper hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-[11px] text-slate-600 mt-4 font-mono"
        >
          ▶ click any cell to run it · or hit "Run all" · outputs appear in real-time
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={colabUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all active:scale-95 shadow-xl shadow-blue-500/20"
          >
            Open Full Notebook in Colab
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="flex items-center gap-1.5 text-xs text-slate-500">
            <ChevronRight className="w-3 h-3" />
            Free · No sign-in required · Runs in browser
          </p>
        </motion.div>

      </div>
    </section>
  );
}
