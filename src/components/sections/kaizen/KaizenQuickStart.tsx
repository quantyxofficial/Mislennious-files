import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Terminal, ExternalLink } from 'lucide-react';

const installCmd = 'pip install kaizenstat';

const tabularCode = `import pandas as pd
from kaizenstat import DataDoctor

df = pd.read_csv("your_data.csv")
doctor = DataDoctor()
doctor.fit(df, target="churn")    # auto-detects tabular vs text

# Shortest: auto-run entire 8-step pipeline
doctor.run()                      # Full autopilot with visibility

# Or one-liner: get trained model directly
best_model = doctor.quick_train() # Best model, no boilerplate

# Full control: pick individual steps
doctor.health()                   # Data Health Score 0–100
doctor.validate()                 # leakage + drift checks
doctor.fix(safe=True)             # preview then auto-heal
doctor.train()                    # benchmark + train best model
doctor.debug_model()              # root-cause failure analysis
doctor.improve()                  # ranked improvement suggestions
doctor.report()                   # terminal summary + HTML export`;

const nlpCode = `import pandas as pd
from kaizenstat import DataDoctor

# Works with raw text columns — no extra config
df = pd.read_csv("reviews.csv")   # has "text" + "sentiment" cols
doctor = DataDoctor()
doctor.fit(df, target="sentiment") # auto-detects NLP task

# Shortest: auto-run entire 8-step pipeline
doctor.run()                      # Full autopilot with visibility

# Or one-liner: get trained model directly
best_model = doctor.quick_train() # Best model, no boilerplate

# Full control: pick individual steps
doctor.health()                   # checks class balance, text length
doctor.validate()                 # detects label noise, duplicates
doctor.fix(safe=True)             # oversamples minority class
doctor.train()                    # TF-IDF + classifier benchmark
doctor.improve()                  # suggests embeddings / BERT`;

type Tab = 'tabular' | 'nlp';

function Token({ line }: { line: string }) {
  if (line.trimStart().startsWith('#'))
    return <span style={{ color: '#6a9955' }}>{line}</span>;
  return (
    <span>
      {line.split(/(\bfrom\b|\bimport\b|\bas\b|"[^"]*"|'[^']*')/g).map((p, i) => {
        if (/^(from|import|as)$/.test(p)) return <span key={i} style={{ color: '#569cd6' }}>{p}</span>;
        if (/^["']/.test(p))              return <span key={i} style={{ color: '#ce9178' }}>{p}</span>;
        return <span key={i} style={{ color: '#d4d4d4' }}>{p}</span>;
      })}
    </span>
  );
}

export function KaizenQuickStart() {
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedCode, setCopiedCode]       = useState(false);
  const [activeTab, setActiveTab]         = useState<Tab>('tabular');

  const code  = activeTab === 'tabular' ? tabularCode : nlpCode;
  const lines = code.split('\n');

  const copyInstall = () => {
    navigator.clipboard.writeText(installCmd);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="py-16 relative border-t border-white/5 bg-transparent overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-emerald-600/[0.03] blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/[0.06] text-[10px] font-mono uppercase tracking-widest text-emerald-400">
              30-second quick start
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tighter text-white">
              One object. Full pipeline.
            </h2>
            <p className="text-sm text-slate-400 font-light max-w-md">
              Install, point at any CSV, and get health scores, auto-fixes, and a trained model report — in under 2 minutes.
            </p>
          </div>

          {/* Install pill */}
          <button
            onClick={copyInstall}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-xs font-mono text-slate-300 transition-all active:scale-95 self-start sm:self-auto shrink-0"
          >
            <Terminal className="w-3.5 h-3.5 text-white/40" />
            {installCmd}
            <span className="w-px h-3 bg-white/10" />
            {copiedInstall
              ? <Check className="w-3.5 h-3.5 text-emerald-400" />
              : <Copy  className="w-3.5 h-3.5 text-slate-500"  />}
          </button>
        </motion.div>

        {/* Data type tabs + code block */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: 'transform, opacity', background: '#1e1e1e', border: '1px solid #2a2a2a' }}
          className="rounded-xl overflow-hidden shadow-2xl"
        >
          {/* Tab bar */}
          <div
            className="flex items-center justify-between px-4 py-2.5"
            style={{ background: '#2a2a2a', borderBottom: '1px solid #333' }}
          >
            <div className="flex gap-1 p-0.5 bg-black/20 rounded-lg">
              {([
                { id: 'tabular' as Tab, label: 'Tabular Data' },
                { id: 'nlp'     as Tab, label: 'Text / NLP'  },
              ]).map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    activeTab === t.id
                      ? 'bg-white/10 text-white'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-slate-500">
                {activeTab === 'tabular' ? 'quickstart.py' : 'nlp_quickstart.py'}
              </span>
              <button
                onClick={copyCode}
                className="flex items-center gap-1 text-[10px] font-mono transition-colors"
                style={{ color: copiedCode ? '#4ec9b0' : '#555' }}
              >
                {copiedCode
                  ? <><Check className="w-3 h-3" /> copied</>
                  : <><Copy  className="w-3 h-3" /> copy</>}
              </button>
            </div>
          </div>

          {/* Code */}
          <div className="flex gap-0 px-4 py-5 overflow-x-auto">
            <div
              className="select-none text-right pr-4 text-[11.5px] font-mono leading-[1.75] shrink-0"
              style={{ color: '#3a3f55', minWidth: '1.75rem' }}
            >
              {lines.map((_, i) => <div key={i}>{i + 1}</div>)}
            </div>
            <pre className="flex-1 text-[11.5px] font-mono leading-[1.75]">
              {lines.map((line, i) => {
                const isHighlighted = line.includes('doctor.run()') || line.includes('doctor.quick_train()');
                const bgColor = isHighlighted ? 'rgba(34, 197, 94, 0.08)' : 'transparent';
                
                return (
                  <div 
                    key={i} 
                    style={{ 
                      backgroundColor: bgColor,
                      padding: isHighlighted ? '0 4px' : '0',
                      marginLeft: isHighlighted ? '-4px' : '0',
                      marginRight: isHighlighted ? '-4px' : '0',
                    }}
                  >
                    {line ? <Token line={line} /> : <span>&nbsp;</span>}
                  </div>
                );
              })}
            </pre>
          </div>

          {/* NLP callout bar — only visible on NLP tab */}
          {activeTab === 'nlp' && (
            <div
              className="flex items-center gap-3 px-4 py-2.5 border-t"
              style={{ background: '#1a2035', borderColor: '#2a3a55' }}
            >
              <span className="text-[10px] font-mono text-blue-400">AUTO-DETECTED</span>
              <span className="text-[11px] text-slate-400">
                DataDoctor sees a string column → switches to NLP mode, applies TF-IDF vectoriser, checks class balance, and benchmarks text classifiers automatically.
              </span>
            </div>
          )}

          {/* Status bar */}
          <div
            className="flex items-center justify-between px-4 py-1"
            style={{ background: '#007acc' }}
          >
            <span className="text-[10px] font-mono text-white/80">Python · kaizenstat</span>
            <span className="text-[10px] font-mono text-white/60">v0.5.9</span>
          </div>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap gap-6 mt-6"
        >
          {[
            { n: '01', t: 'pip install kaizenstat', colab: false },
            { n: '02', t: 'Copy snippet → paste into Colab or .py file', colab: true },
            { n: '03', t: 'Full report in under 2 minutes', colab: false },
          ].map(({ n, t, colab }) => (
            <div key={n} className="flex items-center gap-2.5">
              <span className="text-[10px] font-mono text-slate-600">{n}</span>
              <span className="text-xs text-slate-400">{t}</span>
              {colab && (
                <a
                  href="https://colab.research.google.com/github/kaizenstat-python/KaizenStat/blob/main/notebooks/quickstart_tabular.ipynb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-orange-500/25 bg-orange-500/[0.07] text-[10px] font-mono text-orange-400 hover:bg-orange-500/[0.12] transition-colors"
                >
                  <ExternalLink className="w-2.5 h-2.5" />
                  Open in Colab
                </a>
              )}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
