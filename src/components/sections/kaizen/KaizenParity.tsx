import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Play, X } from 'lucide-react';

/* ─── command catalogue ─────────────────────────────────────────────────── */
const commands = [
  {
    id: 'audit',
    shFile: 'audit.sh',
    pyFile: 'audit.py',
    cli: `# Shell — kz audit\n$ kz audit data.csv --target Class`,
    sdk: [
      { t: 'kw', v: 'import' }, { t: 'pl', v: ' pandas ' }, { t: 'kw', v: 'as' }, { t: 'pl', v: ' pd\n' },
      { t: 'kw', v: 'from' }, { t: 'pl', v: ' kaizenstat ' }, { t: 'kw', v: 'import' }, { t: 'pl', v: ' ' },
      { t: 'cls', v: 'KaizenStat' }, { t: 'pl', v: '\n\n' },
      { t: 'pl', v: 'df = pd.' }, { t: 'fn', v: 'read_csv' }, { t: 'pl', v: '(' },
      { t: 'str', v: '"data.csv"' }, { t: 'pl', v: ')\n' },
      { t: 'pl', v: 'summary = ' }, { t: 'cls', v: 'KaizenStat' }, { t: 'pl', v: '.' },
      { t: 'fn', v: 'audit' }, { t: 'pl', v: '(df, target=' }, { t: 'str', v: '"Class"' }, { t: 'pl', v: ')' },
    ],
    output: [
      { delay: 0,    line: 'Running audit on data.csv  (target=Class) ...' },
      { delay: 180,  line: '' },
      { delay: 260,  line: '  MISSING VALUES' },
      { delay: 340,  line: '  age            12.4 %   →  impute:median' },
      { delay: 420,  line: '  income          3.1 %   →  impute:mean' },
      { delay: 520,  line: '' },
      { delay: 600,  line: '  CLASS IMBALANCE' },
      { delay: 680,  line: '  Class=0        72.4 %' },
      { delay: 760,  line: '  Class=1        27.6 %   →  SMOTE recommended' },
      { delay: 860,  line: '' },
      { delay: 940,  line: '  DEAD FEATURES   2 constant columns dropped' },
      { delay: 1040, line: '  DUPLICATES      4 rows flagged' },
      { delay: 1140, line: '' },
      { delay: 1200, line: '  Done  (0.31 s)' },
    ],
  },
  {
    id: 'benchmark',
    shFile: 'benchmark.sh',
    pyFile: 'benchmark.py',
    cli: `# Shell — kz benchmark\n$ kz benchmark data.csv --target Class`,
    sdk: [
      { t: 'kw', v: 'import' }, { t: 'pl', v: ' pandas ' }, { t: 'kw', v: 'as' }, { t: 'pl', v: ' pd\n' },
      { t: 'kw', v: 'from' }, { t: 'pl', v: ' kaizenstat ' }, { t: 'kw', v: 'import' }, { t: 'pl', v: ' ' },
      { t: 'cls', v: 'KaizenStat' }, { t: 'pl', v: '\n\n' },
      { t: 'pl', v: 'df = pd.' }, { t: 'fn', v: 'read_csv' }, { t: 'pl', v: '(' },
      { t: 'str', v: '"data.csv"' }, { t: 'pl', v: ')\n' },
      { t: 'pl', v: 'results = ' }, { t: 'cls', v: 'KaizenStat' }, { t: 'pl', v: '.' },
      { t: 'fn', v: 'benchmark' }, { t: 'pl', v: '(df, target=' }, { t: 'str', v: '"Class"' }, { t: 'pl', v: ')' },
    ],
    output: [
      { delay: 0,   line: 'Training estimators on data.csv  (target=Class) ...' },
      { delay: 200, line: '' },
      { delay: 280, line: '  RANK  MODEL                ACCURACY   F1       TIME' },
      { delay: 360, line: '  ────  ───────────────────  ─────────  ──────   ────' },
      { delay: 440, line: '  1     XGBoostClassifier    0.9420     0.9381   1.2s' },
      { delay: 520, line: '  2     LGBMClassifier       0.9382     0.9340   0.8s' },
      { delay: 600, line: '  3     RandomForestClassif  0.9150     0.9103   2.1s' },
      { delay: 680, line: '  4     ExtraTreesClassifie  0.9081     0.9022   1.9s' },
      { delay: 780, line: '' },
      { delay: 860, line: '  Best  XGBoostClassifier  →  saved to .kz/best_model' },
      { delay: 960, line: '  Done  (6.02 s)' },
    ],
  },
  {
    id: 'codegen',
    shFile: 'codegen.sh',
    pyFile: 'codegen.py',
    cli: `# Shell — kz codegen\n$ kz codegen data.csv --target Class --output train.py`,
    sdk: [
      { t: 'kw', v: 'import' }, { t: 'pl', v: ' pandas ' }, { t: 'kw', v: 'as' }, { t: 'pl', v: ' pd\n' },
      { t: 'kw', v: 'from' }, { t: 'pl', v: ' kaizenstat ' }, { t: 'kw', v: 'import' }, { t: 'pl', v: ' ' },
      { t: 'cls', v: 'KaizenStat' }, { t: 'pl', v: '\n\n' },
      { t: 'pl', v: 'df = pd.' }, { t: 'fn', v: 'read_csv' }, { t: 'pl', v: '(' },
      { t: 'str', v: '"data.csv"' }, { t: 'pl', v: ')\n' },
      { t: 'pl', v: 'code = ' }, { t: 'cls', v: 'KaizenStat' }, { t: 'pl', v: '.' },
      { t: 'fn', v: 'codegen' }, { t: 'pl', v: '(df, target=' }, { t: 'str', v: '"Class"' },
      { t: 'pl', v: ', output=' }, { t: 'str', v: '"train.py"' }, { t: 'pl', v: ')' },
    ],
    output: [
      { delay: 0,    line: 'Generating standalone pipeline code ...' },
      { delay: 200,  line: '' },
      { delay: 280,  line: '  Model      XGBoostClassifier' },
      { delay: 360,  line: '  Features   23 columns retained' },
      { delay: 440,  line: '  Encoder    OrdinalEncoder  (5 categorical cols)' },
      { delay: 520,  line: '  Imputer    SimpleImputer   (median strategy)' },
      { delay: 600,  line: '' },
      { delay: 680,  line: '  Written →  train.py  (3.4 KB)' },
      { delay: 760,  line: '' },
      { delay: 840,  line: '  Dependencies: scikit-learn, xgboost' },
      { delay: 920,  line: '  No kaizenstat runtime required in production.' },
      { delay: 1020, line: '' },
      { delay: 1080, line: '  Done  (0.44 s)' },
    ],
  },
];

/* ─── VS Code syntax colors ─────────────────────────────────────────────── */
function Token({ t, v }: { t: string; v: string }) {
  const color =
    t === 'kw'  ? '#569cd6' :   // blue — import, from, as
    t === 'cls' ? '#4ec9b0' :   // teal — KaizenStat
    t === 'fn'  ? '#dcdcaa' :   // yellow — read_csv, audit, ...
    t === 'str' ? '#ce9178' :   // orange — strings
    '#d4d4d4';
  return <span style={{ color }}>{v}</span>;
}

/* ─── animated terminal output ──────────────────────────────────────────── */
function AnimatedOutput({ lines, running }: { lines: { delay: number; line: string }[]; running: boolean }) {
  const [shown, setShown] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    setShown(0);
    timers.current.forEach(clearTimeout);
    timers.current = [];
    lines.forEach((_, i) => {
      const id = setTimeout(() => setShown(i + 1), lines[i].delay + 80);
      timers.current.push(id);
    });
    return () => timers.current.forEach(clearTimeout);
  }, [lines]);

  return (
    <div className="font-mono text-[11.5px] leading-[1.75] whitespace-pre">
      {lines.slice(0, shown).map((l, i) => {
        if (l.line === '') return <div key={i} className="h-[0.6em]" />;
        const isCmd   = l.line.startsWith('Running') || l.line.startsWith('Training') || l.line.startsWith('Generating');
        const isDone  = l.line.includes('Done');
        const isArrow = l.line.includes('→');
        const isDim   = l.line.startsWith('  ────') || l.line.startsWith('  RANK');
        return (
          <div
            key={i}
            style={{
              color: isDone   ? '#4ec9b0' :
                     isArrow  ? '#9cdcfe' :
                     isCmd    ? '#d4d4d4' :
                     isDim    ? '#555' :
                     '#b0b0b0',
            }}
          >
            {l.line}
          </div>
        );
      })}
      {running && shown < lines.length && (
        <span className="inline-block w-[7px] h-[13px] align-middle" style={{ background: '#d4d4d4', animation: 'pulse 1s infinite' }} />
      )}
    </div>
  );
}

/* ─── main component ────────────────────────────────────────────────────── */
export function KaizenParity() {
  const [activeId, setActiveId] = useState('audit');
  const [copied,   setCopied]   = useState<'cli' | 'sdk' | null>(null);
  const [runKey,   setRunKey]   = useState(0);
  const [running,  setRunning]  = useState(false);

  const active = commands.find(c => c.id === activeId)!;

  const handleCopy = (text: string, side: 'cli' | 'sdk') => {
    navigator.clipboard.writeText(text);
    setCopied(side);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleRun = () => {
    setRunKey(k => k + 1);
    setRunning(true);
    const last = active.output[active.output.length - 1];
    setTimeout(() => setRunning(false), last.delay + 400);
  };

  const switchCmd = (id: string) => {
    setActiveId(id);
    setRunKey(k => k + 1);
    setRunning(false);
  };

  const sdkRaw   = active.sdk.map(t => t.v).join('');
  const sdkLines = sdkRaw.split('\n');
  const cliLines = active.cli.split('\n');

  /* render SDK tokens line-by-line */
  const sdkRendered = (() => {
    const rows: React.ReactNode[][] = [[]];
    active.sdk.forEach((tok, ti) => {
      const parts = tok.v.split('\n');
      parts.forEach((part, pi) => {
        if (part) rows[rows.length - 1].push(<Token key={`${ti}-${pi}`} t={tok.t} v={part} />);
        if (pi < parts.length - 1) rows.push([]);
      });
    });
    return rows;
  })();

  return (
    <section className="py-24 relative border-t border-white/5 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">

        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/50 text-[10px] font-mono uppercase tracking-wider mb-6 bg-white/[0.02]">
            Interactive Workspace
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter mb-4 text-white leading-tight">
            CLI vs SDK <span className="text-white/40">Parity</span>
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
            Every terminal command maps 1-to-1 with the Python SDK. Same output — choose your interface.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: 'transform, opacity', background: '#1e1e1e', border: '1px solid #333' }}
          className="w-full rounded-xl overflow-hidden shadow-2xl"
        >

          {/* ── Title bar ── */}
          <div
            className="flex items-center justify-between px-4 py-2.5"
            style={{ background: '#323232', borderBottom: '1px solid #222' }}
          >
            {/* Window dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
            </div>
            {/* Centre title */}
            <span className="text-[11px] font-mono" style={{ color: '#aaa' }}>
              kaizenstat — CLI vs SDK
            </span>
            {/* Run button */}
            <button
              onClick={handleRun}
              disabled={running}
              className="flex items-center gap-1.5 px-3 py-1 rounded text-[11px] font-mono font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              style={{
                background: running ? 'transparent' : '#0e639c',
                border: running ? '1px solid #555' : '1px solid #0e639c',
                color: '#fff',
              }}
            >
              <Play className="w-3 h-3 fill-white" />
              {running ? 'Running…' : 'Run'}
            </button>
          </div>

          {/* ── Tab bar ── */}
          <div
            className="flex items-end gap-0 overflow-x-auto"
            style={{ background: '#252526', borderBottom: '1px solid #1a1a1a' }}
          >
            {commands.map(cmd => {
              const isActive = cmd.id === activeId;
              return (
                <button
                  key={cmd.id}
                  onClick={() => switchCmd(cmd.id)}
                  className="relative flex items-center gap-2 px-4 py-2.5 text-[12px] font-mono whitespace-nowrap shrink-0 transition-colors group"
                  style={{
                    background: isActive ? '#1e1e1e' : 'transparent',
                    color: isActive ? '#ffffff' : '#8b8b8b',
                    borderTop: isActive ? '1px solid #007acc' : '1px solid transparent',
                    borderRight: '1px solid #111',
                  }}
                >
                  {/* Python file dot */}
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: isActive ? '#3a96dd' : '#555' }}
                  />
                  {cmd.pyFile}
                  <X
                    className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-60 transition-opacity"
                    style={{ color: '#aaa' }}
                  />
                </button>
              );
            })}
          </div>

          {/* ── Editor panels ── */}
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ borderBottom: '1px solid #222' }}>

            {/* CLI panel */}
            <div
              className="relative flex flex-col"
              style={{ background: '#1e1e1e', borderRight: '1px solid #222' }}
            >
              {/* Panel label bar */}
              <div
                className="flex items-center justify-between px-4 py-2"
                style={{ background: '#2d2d2d', borderBottom: '1px solid #1a1a1a' }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono" style={{ color: '#569cd6' }}>SH</span>
                  <span className="text-[11px] font-mono" style={{ color: '#aaa' }}>{active.shFile}</span>
                </div>
                <button
                  onClick={() => handleCopy(active.cli, 'cli')}
                  className="flex items-center gap-1 text-[10px] font-mono transition-colors"
                  style={{ color: copied === 'cli' ? '#4ec9b0' : '#666' }}
                >
                  {copied === 'cli'
                    ? <><Check className="w-3 h-3" /> copied</>
                    : <><Copy className="w-3 h-3" /> copy</>
                  }
                </button>
              </div>

              {/* Code area */}
              <div className="flex gap-0 p-4 min-h-[148px]">
                {/* Line numbers */}
                <div
                  className="select-none text-right pr-4 text-[11.5px] font-mono leading-[1.75] shrink-0"
                  style={{ color: '#495069', minWidth: '2rem' }}
                >
                  {cliLines.map((_, i) => <div key={i}>{i + 1}</div>)}
                </div>
                {/* Code */}
                <pre className="flex-1 text-[11.5px] font-mono leading-[1.75] overflow-x-auto">
                  {cliLines.map((line, i) => {
                    const isComment = line.startsWith('#');
                    const isCmd     = line.startsWith('$');
                    return (
                      <div key={i} style={{
                        color: isComment ? '#6a9955' : isCmd ? '#d4d4d4' : '#9cdcfe'
                      }}>
                        {line || ' '}
                      </div>
                    );
                  })}
                </pre>
              </div>
            </div>

            {/* SDK panel */}
            <div className="relative flex flex-col" style={{ background: '#1e1e1e' }}>
              <div
                className="flex items-center justify-between px-4 py-2"
                style={{ background: '#2d2d2d', borderBottom: '1px solid #1a1a1a' }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono" style={{ color: '#4ec9b0' }}>PY</span>
                  <span className="text-[11px] font-mono" style={{ color: '#aaa' }}>{active.pyFile}</span>
                </div>
                <button
                  onClick={() => handleCopy(sdkRaw, 'sdk')}
                  className="flex items-center gap-1 text-[10px] font-mono transition-colors"
                  style={{ color: copied === 'sdk' ? '#4ec9b0' : '#666' }}
                >
                  {copied === 'sdk'
                    ? <><Check className="w-3 h-3" /> copied</>
                    : <><Copy className="w-3 h-3" /> copy</>
                  }
                </button>
              </div>

              <div className="flex gap-0 p-4 min-h-[148px]">
                <div
                  className="select-none text-right pr-4 text-[11.5px] font-mono leading-[1.75] shrink-0"
                  style={{ color: '#495069', minWidth: '2rem' }}
                >
                  {sdkLines.map((_, i) => <div key={i}>{i + 1}</div>)}
                </div>
                <pre className="flex-1 text-[11.5px] font-mono leading-[1.75] overflow-x-auto">
                  {sdkRendered.map((row, i) => (
                    <div key={i}>{row.length ? row : ' '}</div>
                  ))}
                </pre>
              </div>
            </div>
          </div>

          {/* ── Integrated Terminal ── */}
          <div style={{ background: '#1e1e1e' }}>
            {/* Terminal tab */}
            <div
              className="flex items-center justify-between px-4 py-2"
              style={{ background: '#2d2d2d', borderBottom: '1px solid #1a1a1a' }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="text-[11px] font-mono px-2 py-0.5"
                  style={{
                    borderBottom: '1px solid #007acc',
                    color: '#fff',
                  }}
                >
                  TERMINAL
                </span>
                <span className="text-[10px] font-mono" style={{ color: '#666' }}>
                  kaizenstat — {active.shFile}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: running ? '#febc2e' : '#28c840' }}
                />
                <span className="text-[10px] font-mono" style={{ color: '#666' }}>
                  {running ? 'running' : 'idle'}
                </span>
              </div>
            </div>

            {/* Terminal output */}
            <div className="px-5 py-4 min-h-[180px]">
              <AnimatedOutput key={runKey} lines={active.output} running={running} />
            </div>
          </div>

          {/* ── Status bar ── */}
          <div
            className="flex items-center justify-between px-4 py-1"
            style={{ background: '#007acc' }}
          >
            <div className="flex items-center gap-4 text-[10px] font-mono text-white/90">
              <span>Python 3.11.0</span>
              <span>kaizenstat 1.2.0</span>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-mono text-white/70">
              <span>UTF-8</span>
              <span>Ln 5, Col 1</span>
              <span>Spaces: 4</span>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
