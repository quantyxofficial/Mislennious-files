import { useState } from 'react';
import { motion } from 'framer-motion';

/* ── Syntax highlighting ── */
function ColabLine({ line }: { line: string }) {
  const tokens: { text: string; color: string }[] = [];
  const ranges: { start: number; end: number; color: string }[] = [];

  const addRanges = (re: RegExp, color: string) => {
    let m; re.lastIndex = 0;
    while ((m = re.exec(line)) !== null)
      ranges.push({ start: m.index, end: m.index + m[0].length, color });
  };

  addRanges(/(#.*)/g,                                                                '#6a9955');
  addRanges(/("""[\s\S]*?"""|'''[\s\S]*?'''|"[^"]*"|'[^']*')/g,                     '#ce9178');
  addRanges(/\b(import|from|as|def|return|class|True|False|None|if|else|for|in|with|print)\b/g, '#569cd6');
  addRanges(/\b(\d+\.?\d*)\b/g,                                                      '#b5cea8');
  addRanges(/\b(pd|kz|df|np|report|model)\b/g,                                       '#9cdcfe');

  ranges.sort((a, b) => a.start - b.start);
  let cur = 0;
  for (const r of ranges) {
    if (r.start < cur) continue;
    if (r.start > cur) tokens.push({ text: line.slice(cur, r.start), color: '#d4d4d4' });
    tokens.push({ text: line.slice(r.start, r.end), color: r.color });
    cur = r.end;
  }
  if (cur < line.length) tokens.push({ text: line.slice(cur), color: '#d4d4d4' });
  if (tokens.length === 0) tokens.push({ text: line || ' ', color: '#d4d4d4' });

  return <>{tokens.map((t, i) => <span key={i} style={{ color: t.color }}>{t.text}</span>)}</>;
}

/* ── Single cell that ran and shows HTML report output ── */
function ReportCell() {
  const [ran, setRan] = useState(true);
  const [running, setRunning] = useState(false);
  const [hovered, setHovered] = useState(false);

  const code = [
    'import kaizen_stat as kz',
    'import pandas as pd',
    '',
    '# Load dataset and run full diagnostics',
    'df = pd.read_csv("fraud_imbalanced.csv")',
    'report = kz.auto_report(df, target="Class")',
    '',
    '# Render inline HTML report',
    'report.display()',
  ];

  const handleRun = () => {
    if (running) return;
    setRan(false);
    setRunning(true);
    setTimeout(() => { setRunning(false); setRan(true); }, 1100);
  };

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {/* Code cell */}
      <div
        className="flex rounded-sm overflow-hidden"
        style={{
          background: '#1e1e1e',
          border: `1px solid ${hovered || ran ? '#3c3c3c' : 'transparent'}`,
          transition: 'border-color 0.15s',
        }}
      >
        {/* Gutter */}
        <div className="flex flex-col items-center pt-2 gap-1.5 select-none flex-shrink-0"
          style={{ width: 52, background: '#1e1e1e' }}>
          <button onClick={handleRun}
            className="flex items-center justify-center rounded-full"
            style={{ width: 22, height: 22 }}>
            {running ? (
              <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="#444" strokeWidth="2"/>
                <path d="M9 2a7 7 0 0 1 7 7" stroke="#4285f4" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                style={{ opacity: hovered || ran ? 1 : 0.3 }}>
                <circle cx="11" cy="11" r="10" fill={ran ? '#1a73e8' : '#3c3c3c'}/>
                <path d="M9 8l5 3-5 3V8z" fill="white"/>
              </svg>
            )}
          </button>
          <span className="text-[9px] font-mono leading-none" style={{ color: '#6c6c6c' }}>
            {ran ? '[1]' : '[ ]'}
          </span>
        </div>

        {/* Code */}
        <div className="flex-1 py-3 pr-4 overflow-x-auto">
          <pre className="font-mono text-[11.5px] leading-[1.65] m-0">
            {code.map((line, i) => (
              <div key={i} style={{ minHeight: '1em' }}>
                <ColabLine line={line} />
              </div>
            ))}
          </pre>
        </div>

        {/* Hover actions */}
        {hovered && (
          <div className="flex items-start pt-2 pr-2 gap-1">
            {['↑','↓','✎','⋮'].map(icon => (
              <button key={icon}
                className="text-[10px] w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
                style={{ color: '#6c6c6c' }}>
                {icon}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Output — report.html rendered as scrollable iframe */}
      {ran && (
        <div style={{ marginLeft: 52, borderLeft: '2px solid #1a73e8', background: '#1e1e1e' }}>
          {/* Output label row */}
          <div className="flex items-center justify-between px-3 py-1.5 border-b" style={{ borderColor: '#2a2a2a' }}>
            <span className="text-[9px] font-mono" style={{ color: '#6c6c6c' }}>Output</span>
            {/* External link — like Colab's "Open in new tab" */}
            <a
              href="/report.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] font-mono hover:underline transition-opacity hover:opacity-100"
              style={{ color: '#4285f4', opacity: 0.8 }}
              title="Open full report in new tab"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="#4285f4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 3h6v6M10 14L21 3" stroke="#4285f4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Open full report ↗
            </a>
          </div>

          {/* Scrollable iframe of the actual report.html */}
          <div style={{ height: 480, overflow: 'hidden', position: 'relative' }}>
            <iframe
              src="/report.html"
              title="KaizenStat Report"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                background: '#0f0f1a',
                display: 'block',
              }}
              scrolling="yes"
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main export ── */
export function KaizenReports() {
  return (
    <section className="py-24 relative border-t border-white/5 bg-transparent overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/[0.04] blur-[160px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">

        {/* Heading */}
        <div className="text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/50 text-[10px] font-mono uppercase tracking-wider bg-white/[0.02]">
            Model Diagnostics
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter text-white leading-tight">
            Stop Guessing. <span className="text-white/50">Visualize Everything.</span>
          </h2>
          <p className="text-sm text-slate-400 font-light leading-relaxed max-w-lg mx-auto">
            Run KaizenStat directly in Colab or Jupyter. One import, instant diagnostics.
          </p>
        </div>

        {/* Laptop mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: 'transform, opacity', maxWidth: '100%', width: '100%' }}
          className="relative mx-auto"
        >
          {/* Screen */}
          <div
            className="rounded-xl overflow-hidden"
            style={{
              background: '#111',
              border: '2px solid #2a2a2a',
              boxShadow: '0 50px 120px rgba(0,0,0,0.8), 0 0 0 1px #1a1a1a',
              height: '580px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >

            {/* ── Colab top navbar ── */}
            <div className="flex items-center select-none"
              style={{ background: '#202124', height: 48, borderBottom: '1px solid #3c4043' }}>
              {/* Logo + filename */}
              <div className="flex items-center gap-2 px-3">
                <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
                  <circle cx="16" cy="16" r="14" fill="#F9AB00"/>
                  <path d="M16 8a8 8 0 1 0 0 16A8 8 0 0 0 16 8z" fill="#E37400"/>
                  <path d="M10 16a6 6 0 1 0 12 0" fill="#F9AB00"/>
                </svg>
                <div className="flex items-center gap-1.5">
                  <svg width="7" height="7" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill="#5f6368"/></svg>
                  <span className="text-[12px] font-medium" style={{ color: '#e8eaed' }}>
                    kaizen_diagnostics.ipynb
                  </span>
                </div>
                {/* Star */}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="ml-0.5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    stroke="#9aa0a6" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
                {/* Drive */}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M19 9l-7 3-7-3" stroke="#9aa0a6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="3" y="6" width="18" height="12" rx="2" stroke="#9aa0a6" strokeWidth="1.5"/>
                </svg>
              </div>

              {/* Menu */}
              <div className="flex items-center text-[12px] ml-1" style={{ color: '#e8eaed' }}>
                {['File','Edit','View','Insert','Runtime','Tools','Help'].map(item => (
                  <span key={item} className="px-3 py-1 rounded hover:bg-white/10 cursor-default transition-colors whitespace-nowrap">
                    {item}
                  </span>
                ))}
              </div>

              {/* Right buttons */}
              <div className="flex items-center gap-2 ml-auto mr-3">
                <button className="flex items-center gap-1 px-3 py-1 rounded-md text-[11px] font-medium hover:bg-white/10 transition-colors"
                  style={{ color: '#e8eaed', border: '1px solid #5f6368' }}>
                  + Code
                </button>
                <button className="flex items-center gap-1 px-3 py-1 rounded-md text-[11px] font-medium hover:bg-white/10 transition-colors"
                  style={{ color: '#e8eaed', border: '1px solid #5f6368' }}>
                  + Text
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-medium transition-colors hover:bg-white/10"
                  style={{ color: '#e8eaed', border: '1px solid #5f6368' }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
                  Run all
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-semibold"
                  style={{ background: '#1a73e8', color: 'white' }}>
                  Connect
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* ── Body: sidebar + notebook ── */}
            <div className="flex" style={{ background: '#1e1e1e' }}>

              {/* Left sidebar */}
              <div className="flex flex-col items-center py-3 gap-5 flex-shrink-0"
                style={{ width: 48, background: '#202124', borderRight: '1px solid #3c4043' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#9aa0a6" strokeWidth="1.8"/><path d="M20 20l-3-3" stroke="#9aa0a6" strokeWidth="1.8" strokeLinecap="round"/></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h14M3 18h10" stroke="#9aa0a6" strokeWidth="1.8" strokeLinecap="round"/></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M8 6l-4 6 4 6M16 6l4 6-4 6" stroke="#9aa0a6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="12" rx="2" stroke="#9aa0a6" strokeWidth="1.8"/><path d="M7 10h4M7 14h8" stroke="#9aa0a6" strokeWidth="1.8" strokeLinecap="round"/></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 4a1 1 0 011-1h5l2 3h9a1 1 0 011 1v11a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" stroke="#9aa0a6" strokeWidth="1.8" strokeLinejoin="round"/></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="8" cy="12" r="4" stroke="#9aa0a6" strokeWidth="1.8"/><path d="M12 12h9M17 10v4" stroke="#9aa0a6" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>

              {/* Notebook */}
              <div className="flex-1 px-4 py-3 overflow-y-auto" style={{ background: '#1e1e1e' }}>
                {/* Notebook markdown heading */}
                <div className="py-2 px-3 border-l-2 mb-4" style={{ borderColor: '#1a73e8' }}>
                  <div className="text-sm font-semibold" style={{ color: '#e8eaed' }}>KaizenStat — Model Diagnostics</div>
                  <div className="text-[10px] mt-0.5" style={{ color: '#9aa0a6' }}>
                    fraud_imbalanced.csv · auto_report
                  </div>
                </div>

                {/* The single code cell + report output */}
                <ReportCell />
              </div>
            </div>

            {/* ── Bottom status bar ── */}
            <div className="flex items-center gap-4 px-4 py-2 select-none"
              style={{ background: '#202124', borderTop: '1px solid #3c4043', color: '#9aa0a6' }}>
              <span className="flex items-center gap-1.5 text-[11px] cursor-default">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="12" rx="2" stroke="#9aa0a6" strokeWidth="1.8"/><path d="M7 10h4M7 14h8" stroke="#9aa0a6" strokeWidth="1.8" strokeLinecap="round"/></svg>
                Variables
              </span>
              <span className="flex items-center gap-1.5 text-[11px] cursor-default">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M4 17l4-4-4-4M10 19h10" stroke="#9aa0a6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Terminal
              </span>
              <span className="ml-auto flex items-center gap-1.5 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                RAM 1.2 GB · GPU T4
              </span>
            </div>

          </div>

          {/* Laptop chin */}
          <div className="h-3 mx-8 rounded-b-lg" style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderTop: 'none' }} />
          <div className="h-2 mx-0 rounded-b-2xl" style={{ background: '#111' }} />
        </motion.div>

        {/* pip install */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 text-center space-y-3"
        >
          <p className="text-[12px] text-slate-500">Try it in your own notebook</p>
          <code className="inline-block px-5 py-2.5 rounded-lg border font-mono text-[11px]"
            style={{ background: '#1e1e1e', borderColor: '#3c4043', color: '#d4d4d4' }}>
            <span style={{ color: '#6a9955' }}>$ </span>pip install kaizenstat
          </code>
        </motion.div>

      </div>
    </section>
  );
}
