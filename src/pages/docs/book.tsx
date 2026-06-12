import { ReactNode } from 'react';
import { NotebookEmbed } from '../../components/docs/NotebookCell';
import { CodeBlock, Callout, StatPills, RefTable, Mono } from '../../components/docs/DocsPrimitives';

/* ════════════════════════════════════════════════════════════════════════════
   KaizenStat — The Book
   A practical, chapter-by-chapter guide. Parts → Chapters → Sections.
   Every concept is paired with a runnable Colab notebook cell so students can
   learn the idea and immediately implement it.
   ════════════════════════════════════════════════════════════════════════════ */

const ORG = 'https://github.com/kaizenstat-python';
const REPO = 'kaizenstat-python/KaizenStat';
const colab = (nb: string) =>
  `https://colab.research.google.com/github/${REPO}/blob/main/notebooks/${nb}`;
const COLAB_QS = colab('quickstart_tabular.ipynb');
const COLAB_ADV = colab('demo_advanced.ipynb');
const COLAB_INT = colab('demo_intermediate.ipynb');
const TITANIC = 'https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv';

export interface Section { id: string; title: string; body: ReactNode; }
export interface Chapter {
  id: string;
  number: number;          // 1, 2, 3 … (continuous across the book)
  title: string;
  summary: string;         // one-line "what you'll learn"
  readTime: string;
  sections: Section[];
}
export interface Part { id: string; title: string; subtitle: string; chapters: Chapter[]; }

export { ORG, REPO, COLAB_QS };

// ── small helpers ────────────────────────────────────────────────────────────
const Pipeline = () => (
  <p className="text-center text-white font-mono text-[13px] tracking-wide my-5 py-3 rounded-xl bg-white/[0.03] border border-white/10 not-prose">
    Health → Validate → Fix → Train → Debug → Improve
  </p>
);
const Goal = ({ children }: { children: ReactNode }) => (
  <Callout type="tip"><strong>By the end of this chapter</strong> you'll be able to: {children}</Callout>
);

/* ╔══════════════════════════════════════════════════════════════════════════╗
   ║  PART I — GETTING STARTED                                                  ║
   ╚══════════════════════════════════════════════════════════════════════════╝ */

const ch1: Chapter = {
  id: 'what-is-kaizenstat', number: 1, title: 'What is KaizenStat?',
  summary: 'The problem it solves, the pipeline philosophy, and who it is for.',
  readTime: '4 min',
  sections: [
    {
      id: 'the-problem', title: '1.1 The Problem',
      body: (
        <>
          <p>
            Most beginners learn ML as a single magic line — <Mono>model.fit(X, y)</Mono>. But real
            datasets are messy: missing values, outliers, leakage, imbalance, and noise quietly wreck
            your accuracy, and a black-box <Mono>.fit()</Mono> never tells you <em>why</em>.
          </p>
          <p>
            <strong>KaizenStat</strong> ("kaizen" = continuous improvement) replaces that black box
            with one transparent, opinionated pipeline. Every step is <strong>scored, explained, and
            reproducible</strong>.
          </p>
          <Pipeline />
        </>
      ),
    },
    {
      id: 'who-is-it-for', title: '1.2 Who This Book Is For',
      body: (
        <>
          <RefTable
            headers={['You are…', 'Start at']}
            rows={[
              ['A student who has never trained a model', <>Chapter 3 — your first model in one line.</>],
              ['Comfortable with pandas / sklearn', <>Part II — the pipeline, stage by stage.</>],
              ['Shipping to production', <>Part III — trust, NLP, deployment.</>],
              ['Looking up a method', <>Appendix — the full API reference.</>],
            ]}
          />
          <Callout type="info">
            Every chapter has runnable cells. Hit <Mono>▶</Mono> on any cell, or open the full
            notebook in Colab — free, no sign-in, runs in your browser.
          </Callout>
        </>
      ),
    },
    {
      id: 'how-to-read', title: '1.3 How to Use This Book',
      body: (
        <>
          <p>Each chapter follows the same rhythm so you can <strong>learn then build</strong>:</p>
          <RefTable
            headers={['Block', 'What it means']}
            rows={[
              [<strong>Concept</strong>, 'The idea in plain English — why it matters.'],
              [<strong>Notebook cell</strong>, 'Real KaizenStat code you can run right now.'],
              [<><Callout type="tip">Tip</Callout></>, 'A shortcut or best practice.'],
              [<><Callout type="warning">Watch out</Callout></>, 'A common mistake to avoid.'],
              [<><Callout type="pro">Premium</Callout></>, 'An advanced engine feature.'],
            ]}
          />
        </>
      ),
    },
  ],
};

const ch2: Chapter = {
  id: 'install-setup', number: 2, title: 'Installation & Setup',
  summary: 'Install the core package, add optional accelerators, and verify the CLI.',
  readTime: '4 min',
  sections: [
    {
      id: 'install-core', title: '2.1 Install the Core Package',
      body: (
        <>
          <Goal>install KaizenStat and confirm it works.</Goal>
          <p>The core package ships with everything needed for the full pipeline:</p>
          <CodeBlock lang="bash" code={`pip install kaizenstat`} />
          <StatPills items={[
            { label: 'Version', value: 'v0.6.0' },
            { label: 'Python', value: '3.8+' },
            { label: 'License', value: 'MIT' },
            { label: 'Tests', value: '760 · 100%' },
          ]} />
        </>
      ),
    },
    {
      id: 'optional-extras', title: '2.2 Optional Accelerators',
      body: (
        <>
          <p>Add these only when you need them — the core works without any of them:</p>
          <CodeBlock lang="bash" code={`pip install kaizenstat[fast]   # Polars (Rust) — 10–100× faster file loading
pip install kaizenstat[gpu]    # XGBoost + LightGBM gradient boosting
pip install kaizenstat[nlp]    # sentence-transformers for text embeddings
pip install kaizenstat[ai]     # Anthropic Claude advisor (plain-English diagnosis)
pip install kaizenstat[all]    # Everything above`} />
          <Callout type="info">
            <Mono>load()</Mono> auto-installs Polars on first use, so <Mono>[fast]</Mono> is optional.
            The AI advisor needs an <Mono>ANTHROPIC_API_KEY</Mono> environment variable.
          </Callout>
        </>
      ),
    },
    {
      id: 'verify', title: '2.3 Verify the Install',
      body: (
        <>
          <p>From your terminal:</p>
          <CodeBlock lang="bash" code={`kz --help`} />
          <p>Or from a notebook:</p>
          <NotebookEmbed filename="quickstart_tabular.ipynb" colabUrl={COLAB_QS} cells={[
            { idx: 1, title: 'Install & confirm', code: `!pip install kaizenstat -q
import kaizenstat
print("✅ KaizenStat", kaizenstat.__version__, "ready!")`,
              output: `Successfully installed kaizenstat-0.6.0\n✅ KaizenStat 0.6.0 ready!`, runTime: '4s' },
          ]} />
        </>
      ),
    },
  ],
};

const ch3: Chapter = {
  id: 'first-model', number: 3, title: 'Your First Model (One Line)',
  summary: 'Train, explain, and use a real model without learning the pipeline first.',
  readTime: '6 min',
  sections: [
    {
      id: 'quick-train', title: '3.1 quick_train() — File to Model',
      body: (
        <>
          <Goal>train a working model from a CSV in a single line and predict with it.</Goal>
          <p>
            <Mono>quick_train()</Mono> runs the entire pipeline (health → fix → train → debug →
            explain → report → export) and returns a ready-to-use model. Run these cells in order:
          </p>
          <NotebookEmbed filename="quickstart_tabular.ipynb" colabUrl={COLAB_QS} cells={[
            { idx: 1, title: 'Train in one line', code: `from kaizenstat import DataDoctor

model = DataDoctor.quick_train(
    "${TITANIC}",
    target="Survived",   # the column to predict
    tune=False,          # tune=True → higher accuracy, slower
)`,
              output: `① Health 74/100  ② Fix: imputed 3 cols  ③ XGBoost test=0.8315
④ gap=0.04 (healthy)  ⑦ Survived_report.html  ⑧ Survived_model.joblib
✓ Pipeline complete!`, runTime: '11s' },
            { idx: 2, title: 'Predict on new data', code: `import pandas as pd

new_passenger = pd.DataFrame([{
    "Pclass": 1, "Sex": "female", "Age": 29.0,
    "SibSp": 0, "Parch": 0, "Fare": 100.0, "Embarked": "S",
}])

pred  = model.predict(new_passenger)[0]
proba = model.predict_proba(new_passenger)[0]
print("Survived ✅" if pred == 1 else "Did not survive ❌", f"({max(proba):.0%})")`,
              output: `Survived ✅ (94%)`, runTime: '1s' },
          ]} />
          <Callout type="tip">
            The model is a full pipeline — preprocessing is baked in, so <Mono>.predict()</Mono> works
            on raw DataFrames with no manual encoding.
          </Callout>
        </>
      ),
    },
    {
      id: 'run-autopilot', title: '3.2 run() — The AutoPilot',
      body: (
        <>
          <p>
            <Mono>run()</Mono> is the instance form. It does the same 8 steps but keeps every result
            accessible afterward (<Mono>doctor.health()</Mono>, <Mono>doctor.train_result</Mono>, …).
          </p>
          <NotebookEmbed filename="quickstart_tabular.ipynb" colabUrl={COLAB_QS} cells={[
            { idx: 1, title: 'Full pipeline, one call', code: `from kaizenstat import DataDoctor

doctor = DataDoctor("${TITANIC}", target="Survived")
doctor.run(tune=False, report=True, export_path="titanic_model.joblib")`,
              output: `KaizenStat AutoPilot — health → fix → train → debug → improve → explain → report
✓ XGBoost  test=0.8315  → titanic_model.joblib`, runTime: '12s' },
          ]} />
          <Callout type="warning">
            <Mono>target</Mono> must be a real column in your data. If you mistype it, KaizenStat
            lists the available columns so you can fix it fast.
          </Callout>
        </>
      ),
    },
  ],
};

/* ╔══════════════════════════════════════════════════════════════════════════╗
   ║  PART II — THE PIPELINE, STAGE BY STAGE                                    ║
   ╚══════════════════════════════════════════════════════════════════════════╝ */

const ch4: Chapter = {
  id: 'load-fit', number: 4, title: 'Loading & Fitting Data',
  summary: 'Load any file or URL, register a target, and let KaizenStat detect the task.',
  readTime: '5 min',
  sections: [
    {
      id: 'load', title: '4.1 load() — Any File or URL',
      body: (
        <>
          <Goal>load CSV/Excel/Parquet/JSON data from disk or the web with one call.</Goal>
          <p>
            <Mono>load()</Mono> reads <Mono>.csv .tsv .xlsx .parquet .json .jsonl .feather</Mono> —
            local or over HTTP — using <strong>Polars (Rust)</strong> where possible, then prints
            shape, dtypes, missing values, and a 5-row preview.
          </p>
          <NotebookEmbed filename="quickstart_tabular.ipynb" colabUrl={COLAB_QS} cells={[
            { idx: 1, title: 'Load + fit', code: `from kaizenstat import DataDoctor

doctor = DataDoctor()
doctor.load("${TITANIC}")
doctor.fit(target="Survived")`,
              output: `📂 Loaded 891 rows × 12 columns  (Polars ⚡)\n✓ Task: classification (binary)`, runTime: '1s' },
          ]} />
        </>
      ),
    },
    {
      id: 'fit', title: '4.2 fit() — Register the Target',
      body: (
        <>
          <p>
            <Mono>fit(df, target)</Mono> registers your data and the column to predict. On fit,
            KaizenStat <strong>auto-detects</strong> the task (classification vs regression) and the
            mode (<Mono>tabular</Mono> vs <Mono>text</Mono>).
          </p>
          <CodeBlock lang="python" code={`import pandas as pd
from kaizenstat import DataDoctor

df = pd.read_csv("titanic.csv")
doctor = DataDoctor()
doctor.fit(df, target="Survived")
print("Mode:", doctor.mode())   # 'tabular' or 'text'`} />
          <Callout type="info">
            KaizenStat auto-drops columns that look like IDs or free-text noise (e.g. PassengerId,
            Name). Keep them with <Mono>fit(df, target, keep_suspicious=True)</Mono>.
          </Callout>
        </>
      ),
    },
  ],
};

const ch5: Chapter = {
  id: 'data-health', number: 5, title: 'Measuring Data Health',
  summary: 'Score your dataset 0–100 and read the penalty breakdown before you train.',
  readTime: '5 min',
  sections: [
    {
      id: 'health-score', title: '5.1 The Data Health Score',
      body: (
        <>
          <Goal>grade any dataset 0–100 and know exactly what is hurting it.</Goal>
          <p>
            <Mono>health()</Mono> returns a single 0–100 score plus an itemised breakdown of every
            penalty — missing values, outliers, imbalance, duplicate rows, constant columns.
          </p>
          <NotebookEmbed filename="quickstart_tabular.ipynb" colabUrl={COLAB_QS} cells={[
            { idx: 1, title: 'Score the data', code: `health = doctor.health()
print(f"Score: {health.score}/100   Grade: {health.grade}")
# rule of thumb: below 70 → fix before training`,
              output: `Data Health Score: 74 / 100   Grade: C\n  Missing Values  -18.0  HIGH   worst: 'Cabin' (77%)\n  High Cardinality -5.0  MEDIUM 2 cols > 50 unique\nScore: 74/100   Grade: C`, runTime: '1s' },
          ]} />
        </>
      ),
    },
    {
      id: 'reading-penalties', title: '5.2 Reading the Penalties',
      body: (
        <>
          <RefTable
            headers={['Penalty', 'Meaning', 'Typical fix']}
            rows={[
              ['Missing Values', 'Columns with gaps the model cannot use.', 'Imputation (Chapter 7).'],
              ['Outliers', 'Extreme values that distort scaling/splits.', 'IQR capping.'],
              ['Imbalance', 'One class dominates the target.', 'class_weight="balanced".'],
              ['High Cardinality', 'Too many unique categories (IDs).', 'Drop or feature-engineer.'],
              ['Duplicates', 'Repeated rows that leak into CV.', 'Deduplicate.'],
            ]}
          />
          <Callout type="tip">
            <Mono>HealthResult</Mono> exposes <Mono>.score</Mono>, <Mono>.grade</Mono>,{' '}
            <Mono>.risk_level</Mono>, and <Mono>.penalties</Mono> so you can branch on them in code.
          </Callout>
        </>
      ),
    },
  ],
};

const ch6: Chapter = {
  id: 'validate', number: 6, title: 'Validation & Leakage Checks',
  summary: 'Catch target leakage, multicollinearity, and bad distributions before training.',
  readTime: '5 min',
  sections: [
    {
      id: 'assumptions', title: '6.1 Statistical Assumption Checks',
      body: (
        <>
          <Goal>detect leakage and correlated features that silently inflate scores.</Goal>
          <p>
            <Mono>validate()</Mono> runs skewness, multicollinearity, distribution, and{' '}
            <strong>target-leakage</strong> checks. Leakage is the #1 cause of "too good to be true"
            accuracy.
          </p>
          <NotebookEmbed filename="demo_intermediate.ipynb" colabUrl={COLAB_INT} cells={[
            { idx: 1, title: 'Validate', code: `validation = doctor.validate()
print(f"Issues found: {len(validation.issues)}")`,
              output: `✓ No target leakage detected\n⚠ High correlation: Fare ↔ Pclass (r=0.55)\n⚠ High cardinality: Ticket (681), Name (891)\nIssues found: 3`, runTime: '2s' },
          ]} />
        </>
      ),
    },
    {
      id: 'custom-checks', title: '6.2 Adding Your Own Checks',
      body: (
        <>
          <p>Register a custom rule that runs inside <Mono>validate()</Mono>:</p>
          <CodeBlock lang="python" code={`def min_classes(df, target):
    return ["Target has < 2 classes"] if df[target].nunique() < 2 else []

doctor.add_check(min_classes, name="target_classes")
doctor.validate()   # your check now runs alongside the built-ins`} />
        </>
      ),
    },
  ],
};

const ch7: Chapter = {
  id: 'fix', number: 7, title: 'Fixing & Cleaning Data',
  summary: 'Apply safe, low-risk corrections — imputation, encoding, dedup, balancing.',
  readTime: '5 min',
  sections: [
    {
      id: 'safe-fix', title: '7.1 Safe Fixes',
      body: (
        <>
          <Goal>clean a dataset without losing data or introducing bias.</Goal>
          <p>
            <Mono>fix(safe=True)</Mono> applies only <strong>low-risk</strong> corrections and returns
            a clean DataFrame. Use <Mono>preview_only=True</Mono> to see the plan first.
          </p>
          <NotebookEmbed filename="quickstart_tabular.ipynb" colabUrl={COLAB_QS} cells={[
            { idx: 1, title: 'Fix safely', code: `fixed_df = doctor.fix(safe=True)
print("Remaining missing values:", fixed_df.isnull().sum().sum())`,
              output: `✓ Imputed 3 columns (median)\n✓ Capped 12 outliers (IQR 1.5×)\nRemaining missing values: 0`, runTime: '1s' },
          ]} />
          <Callout type="warning">
            Aggressive fixes can drop rows. After <Mono>fix()</Mono>, KaizenStat re-checks that your
            target still has ≥2 classes before training and errors clearly if not.
          </Callout>
        </>
      ),
    },
    {
      id: 'imbalance', title: '7.2 Automatic Imbalance Correction',
      body: (
        <>
          <p>
            When the target skew exceeds <strong>65% / 35%</strong>, the fix stage sets{' '}
            <Mono>class_weight="balanced"</Mono> on the estimators automatically — no manual
            resampling needed.
          </p>
          <Callout type="info">
            Module form: <Mono>from kaizenstat import fix; df_clean = fix.apply(df, target="y")</Mono>.
          </Callout>
        </>
      ),
    },
  ],
};

const ch8: Chapter = {
  id: 'train', number: 8, title: 'Training & Benchmarking',
  summary: 'Benchmark a pool of models, pick the winner, and read the scores correctly.',
  readTime: '6 min',
  sections: [
    {
      id: 'train-best', title: '8.1 Benchmark & Train',
      body: (
        <>
          <Goal>compare several models with cross-validation and train the best automatically.</Goal>
          <p>
            <Mono>train()</Mono> benchmarks a model pool, selects the winner, and reports
            cross-validated scores. The <strong>gap</strong> (train − test) tells you about overfitting.
          </p>
          <NotebookEmbed filename="quickstart_tabular.ipynb" colabUrl={COLAB_QS} cells={[
            { idx: 1, title: 'Train', code: `result = doctor.train(cv=5, tune=False)
print(f"Best model : {result.model_name}")
print(f"Test score : {result.test_score:.4f}")
print(f"Gap        : {result.train_score - result.test_score:.4f}  (< 0.10 healthy)")`,
              output: `Benchmarking 5 models...\nBest model : XGBoostClassifier\nTest score : 0.8315\nGap        : 0.0421  (< 0.10 healthy)`, runTime: '9s' },
          ]} />
        </>
      ),
    },
    {
      id: 'tuning', title: '8.2 Hyperparameter Tuning',
      body: (
        <>
          <p>Set <Mono>tune=True</Mono> to run a randomized search on the best model:</p>
          <CodeBlock lang="python" code={`result = doctor.train(cv=5, tune=True, n_iter=40)
print(result.best_params)   # chosen hyperparameters`} />
          <Callout type="pro">
            <strong>Premium engine:</strong> <Mono>train_auto(ensemble=True)</Mono> goes further —
            smart model selection, 2-stage progressive tuning, a StackingClassifier ensemble that
            beats simple voting, and Platt-scaling calibration for trustworthy probabilities.
          </Callout>
        </>
      ),
    },
  ],
};

const ch9: Chapter = {
  id: 'debug', number: 9, title: 'Debugging a Model',
  summary: 'Find out WHY a model underperforms — overfitting, hard slices, weak features.',
  readTime: '6 min',
  sections: [
    {
      id: 'debug-model', title: '9.1 Diagnose Failure Modes',
      body: (
        <>
          <Goal>explain why a model scores what it does, not just what it scored.</Goal>
          <NotebookEmbed filename="quickstart_tabular.ipynb" colabUrl={COLAB_QS} cells={[
            { idx: 1, title: 'Debug', code: `debug = doctor.debug_model()
print(f"Diagnosis : {debug.label}")
print(f"Gap       : {debug.gap:+.4f}")`,
              output: `Diagnosis : healthy fit\nGap       : +0.0421\nHealth    : 74/100`, runTime: '2s' },
          ]} />
        </>
      ),
    },
    {
      id: 'feature-impact', title: '9.2 Feature Impact',
      body: (
        <>
          <p>
            <Mono>feature_impact()</Mono> measures how much the score drops when each feature is
            removed — a leakage-safe importance ranking on a held-out set.
          </p>
          <NotebookEmbed filename="quickstart_tabular.ipynb" colabUrl={COLAB_QS} cells={[
            { idx: 1, title: 'Rank features', code: `impact = doctor.feature_impact(top_n=10)
for feat, drop in sorted(impact.items(), key=lambda x: -x[1])[:5]:
    print(f"  {feat:12s} {drop:.4f}")`,
              output: `  Sex          0.1820\n  Fare         0.0640\n  Age          0.0410\n  Pclass       0.0380\n  Title        0.0210`, runTime: '2s' },
          ]} />
        </>
      ),
    },
    {
      id: 'improve', title: '9.3 Improvement Suggestions',
      body: (
        <>
          <p>
            <Mono>improve()</Mono> fuses health + validation + debug into a prioritised, quantified
            action list — each item annotated with expected impact.
          </p>
          <CodeBlock lang="python" code={`doctor.improve()
# e.g. "Engineer 'Title' from Name  →  +2.1% expected accuracy"`} />
        </>
      ),
    },
  ],
};

/* ╔══════════════════════════════════════════════════════════════════════════╗
   ║  PART III — PRODUCTION & ADVANCED                                          ║
   ╚══════════════════════════════════════════════════════════════════════════╝ */

const ch10: Chapter = {
  id: 'trust', number: 10, title: 'Trust & Reliability',
  summary: 'Get a production-readiness verdict: calibration, robustness, failure slices.',
  readTime: '5 min',
  sections: [
    {
      id: 'trust-score', title: '10.1 The Trust Score',
      body: (
        <>
          <Goal>decide whether a model is safe to ship, with a quantified verdict.</Goal>
          <p>
            <Mono>trust_score()</Mono> reports confidence distribution, prediction uncertainty,
            robustness under input perturbation, calibration gap, and failure-case slices. Works in
            both tabular and text mode.
          </p>
          <NotebookEmbed filename="demo_advanced.ipynb" colabUrl={COLAB_ADV} cells={[
            { idx: 1, title: 'Production readiness', code: `report = doctor.trust_score()
print(f"Trust: {report.trust_score}/100  ({report.grade})")
print(f"Robustness: {report.robustness_score:.2f}")
print(f"Calibration gap: {report.calibration_gap:.3f}")`,
              output: `Trust Score: 84/100 — production-ready\nRobustness: 0.91\nCalibration gap: 0.038`, runTime: '3s' },
          ]} />
          <Callout type="info">
            <Mono>pipeline_confidence()</Mono> gives a complementary 0–100 score from health,
            validation, stability, and test performance.
          </Callout>
        </>
      ),
    },
  ],
};

const ch11: Chapter = {
  id: 'nlp', number: 11, title: 'NLP / Text Mode',
  summary: 'The same API on free-text data — auto-detected, with text self-healing.',
  readTime: '5 min',
  sections: [
    {
      id: 'text-auto', title: '11.1 Zero-Change Text Support',
      body: (
        <>
          <Goal>train a text classifier with the exact same workflow you already learned.</Goal>
          <p>
            If KaizenStat detects a dominant free-text column, it switches to <strong>text mode</strong>{' '}
            automatically — TF-IDF, char n-grams, optional embeddings — with no API change.
          </p>
          <CodeBlock lang="python" code={`from kaizenstat import DataDoctor

doctor = DataDoctor(df, target="sentiment")   # df has a 'review' text column
print(doctor.mode())          # → 'text'
doctor.run()                  # same 8-step pipeline, text engine`} />
        </>
      ),
    },
    {
      id: 'text-heal', title: '11.2 Text Self-Healing',
      body: (
        <>
          <p>
            <Mono>auto_improve_text()</Mono> runs a baseline → clean noise / prune rare tokens / add
            char n-grams → retrain → compare loop, returning a <Mono>ComparisonResult</Mono> with the
            score delta.
          </p>
          <CodeBlock lang="python" code={`result = doctor.auto_improve_text(tune=True)
print(f"Improvement: {result.score_delta:+.4f}")`} />
        </>
      ),
    },
  ],
};

const ch12: Chapter = {
  id: 'deploy', number: 12, title: 'Deploying & the CLI',
  summary: 'Export a model, generate a training script, and run everything from the terminal.',
  readTime: '6 min',
  sections: [
    {
      id: 'export', title: '12.1 Export & Reuse a Model',
      body: (
        <>
          <Goal>save a trained pipeline and load it anywhere — no KaizenStat at inference time.</Goal>
          <NotebookEmbed filename="quickstart_tabular.ipynb" colabUrl={COLAB_QS} cells={[
            { idx: 1, title: 'Export', code: `path = doctor.export_model(path="titanic_model.joblib")
print("Saved:", path)`,
              output: `Saved: titanic_model.joblib`, runTime: '0s' },
            { idx: 2, title: 'Load & predict (anywhere)', code: `import joblib, pandas as pd
model = joblib.load("titanic_model.joblib")
model.predict(pd.read_csv("new_passengers.csv"))`,
              output: `array([1, 0, 1, 1, 0])`, runTime: '0s' },
          ]} />
        </>
      ),
    },
    {
      id: 'codegen', title: '12.2 Generate a Training Script',
      body: (
        <>
          <p>
            <Mono>codegen()</Mono> emits a clean, standalone Python script that reproduces your whole
            pipeline — perfect for handing off to a production repo.
          </p>
          <CodeBlock lang="python" code={`doctor.codegen(output_path="pipeline.py")`} />
        </>
      ),
    },
    {
      id: 'cli', title: '12.3 The Command Line',
      body: (
        <>
          <p>Every stage is also a <Mono>kz</Mono> command — no Python required:</p>
          <CodeBlock lang="bash" code={`kz auto    titanic.csv Survived            # full pipeline → HTML report
kz health  titanic.csv --target Survived
kz train   titanic.csv Survived --tune --export model.joblib
kz export  titanic.csv Survived -o model.joblib`} />
          <RefTable
            headers={['Command', 'SDK equivalent']}
            rows={[
              [<Mono>kz auto</Mono>, <Mono>doctor.run()</Mono>],
              [<Mono>kz health / validate / fix</Mono>, <Mono>doctor.health() / validate() / fix()</Mono>],
              [<Mono>kz train / debug / improve</Mono>, <Mono>doctor.train() / debug_model() / improve()</Mono>],
              [<Mono>kz report / codegen / export</Mono>, <Mono>doctor.report() / codegen() / export_model()</Mono>],
            ]}
          />
          <Callout type="tip">
            <Mono>kz &lt;command&gt; --help</Mono> shows every flag for any command.
          </Callout>
        </>
      ),
    },
  ],
};

/* ╔══════════════════════════════════════════════════════════════════════════╗
   ║  APPENDIX — REFERENCE                                                      ║
   ╚══════════════════════════════════════════════════════════════════════════╝ */

const chA: Chapter = {
  id: 'api-reference', number: 13, title: 'Appendix: API Reference',
  summary: 'Every DataDoctor method, the module-level API, result types, and the AI advisor.',
  readTime: '8 min',
  sections: [
    {
      id: 'datadoctor-methods', title: 'A.1 DataDoctor Methods',
      body: (
        <RefTable
          headers={['Method', 'Returns', 'Purpose']}
          rows={[
            [<Mono>load(path)</Mono>, '—', 'Load any file/URL via Polars.'],
            [<Mono>fit(df, target)</Mono>, 'self', 'Register data; auto-detect task + mode.'],
            [<Mono>health()</Mono>, 'HealthResult', 'Data Health Score (0–100).'],
            [<Mono>validate()</Mono>, 'ValidationReport', 'Assumption + leakage checks.'],
            [<Mono>fix(safe=True)</Mono>, 'DataFrame', 'Safe data corrections.'],
            [<Mono>train(cv, tune)</Mono>, 'TrainResult', 'Benchmark + train the best.'],
            [<Mono>debug_model()</Mono>, 'DebugResult', 'Diagnose failure modes.'],
            [<Mono>improve()</Mono>, 'ImprovementReport', 'Prioritised suggestions.'],
            [<Mono>report(path)</Mono>, 'str', 'HTML report.'],
            [<Mono>quick_train(...)</Mono>, 'Pipeline', 'One-line file → model.'],
            [<Mono>run(...)</Mono>, 'self', 'Full 8-step AutoPilot.'],
            [<Mono>explain()</Mono>, 'str', 'Plain-English model summary.'],
            [<Mono>trust_score()</Mono>, 'TrustReport', 'Production-readiness verdict.'],
            [<Mono>feature_impact(top_n)</Mono>, 'dict', 'Leakage-safe importance.'],
            [<Mono>train_auto(ensemble)</Mono>, 'TrainResult', 'Premium AutoML + ensemble.'],
            [<Mono>auto_improve(tune)</Mono>, 'ComparisonResult', 'Fix → retrain → compare.'],
            [<Mono>export_model(path)</Mono>, 'str', 'Serialise pipeline to .joblib.'],
            [<Mono>codegen(path)</Mono>, 'str', 'Generate a training script.'],
            [<Mono>add_model(name, est)</Mono>, 'self', 'Register a custom model.'],
            [<Mono>add_check(fn, name)</Mono>, 'self', 'Register a custom check.'],
          ]}
        />
      ),
    },
    {
      id: 'module-api', title: 'A.2 Module-Level API',
      body: (
        <CodeBlock lang="python" code={`from kaizenstat import health, validate, fix, model, debug, reliability

health.score(df)                          # → float (0–100)
validate.leakage(df, target="y")
df_clean = fix.apply(df, target="y")
result = model.train_best(df, target="y") # → TrainResult
debug.bias_detection(pipe, X_te, y_te, sensitive_features=["gender"])
reliability.analyze(pipe, X_test, y_test) # → TrustReport`} />
      ),
    },
    {
      id: 'result-types', title: 'A.3 Result Types',
      body: (
        <RefTable
          headers={['Type', 'Key fields']}
          rows={[
            [<Mono>HealthResult</Mono>, <Mono>score, grade, penalties, risk_level</Mono>],
            [<Mono>TrainResult</Mono>, <Mono>model_name, task, test_score, metrics, pipeline, cv_score, best_params</Mono>],
            [<Mono>TrustReport</Mono>, <Mono>trust_score, grade, robustness_score, calibration_gap</Mono>],
          ]}
        />
      ),
    },
    {
      id: 'ai-advisor', title: 'A.4 AI Advisor (Optional)',
      body: (
        <>
          <p>
            With <Mono>kaizenstat[ai]</Mono> and an <Mono>ANTHROPIC_API_KEY</Mono>, get plain-English,
            <strong> Claude-powered</strong> diagnoses. Everything else runs offline, rule-based.
          </p>
          <CodeBlock lang="python" code={`from kaizenstat import intelligence
intelligence.init(api_key="sk-ant-...")               # or env var
intelligence.ask("Why is my model overfitting?")      # defaults to claude-sonnet-4-6`} />
          <Callout type="info">
            Source, issues, and the full changelog live on GitHub:{' '}
            <a href={ORG} target="_blank" rel="noopener noreferrer">github.com/kaizenstat-python</a>.
          </Callout>
        </>
      ),
    },
  ],
};

export const BOOK: Part[] = [
  { id: 'part-1', title: 'Part I', subtitle: 'Getting Started', chapters: [ch1, ch2, ch3] },
  { id: 'part-2', title: 'Part II', subtitle: 'The Pipeline, Stage by Stage', chapters: [ch4, ch5, ch6, ch7, ch8, ch9] },
  { id: 'part-3', title: 'Part III', subtitle: 'Production & Advanced', chapters: [ch10, ch11, ch12] },
  { id: 'appendix', title: 'Appendix', subtitle: 'Reference', chapters: [chA] },
];

export const ALL_CHAPTERS: Chapter[] = BOOK.flatMap((p) => p.chapters);
