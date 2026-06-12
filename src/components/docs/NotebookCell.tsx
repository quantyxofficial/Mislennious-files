import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Check, Copy } from 'lucide-react';

/**
 * A reusable Google-Colab-style notebook embed for the docs.
 * Each cell shows runnable code + a simulated output, with per-cell ▶ Run,
 * a global "Run all", copy-to-clipboard, and an "Open in Colab" CTA.
 *
 * This mirrors the design language of KaizenColabPreview but is packaged as a
 * drop-in component so any docs section can embed real notebook snippets.
 */

export interface NbCell {
  idx: number;
  title: string;
  code: string;
  output?: string;
  runTime?: string;
}

interface NotebookEmbedProps {
  filename: string;
  cells: NbCell[];
  colabUrl?: string;
  /** Max height of the scrollable cell area (px). */
  maxHeight?: number;
}

// ── Lightweight Python syntax highlighter ───────────────────────────────────
function HighlightLine({ line }: { line: string }) {
  const parts = line.split(
    /(\bimport\b|\bfrom\b|\bas\b|\bdef\b|\breturn\b|\bif\b|\bnot\b|\bTrue\b|\bFalse\b|\bNone\b|\bfor\b|\bin\b|\bprint\b|\belse\b|\belif\b|\bint\b|\bstr\b|\bfloat\b|"[^"]*"|'[^']*'|#[^\n]*|\b\d+\.?\d*\b)/g,
  );
  return (
    <span>
      {parts.map((tok, i) => {
        if (/^(import|from|as|def|return|if|not|True|False|None|for|in|else|elif|int|str|float)$/.test(tok))
          return <span key={i} style={{ color: '#cc99cd' }}>{tok}</span>;
        if (/^print$/.test(tok)) return <span key={i} style={{ color: '#8ab4f8' }}>{tok}</span>;
        if (/^["']/.test(tok)) return <span key={i} style={{ color: '#7ec699' }}>{tok}</span>;
        if (/^#/.test(tok)) return <span key={i} style={{ color: '#6a9955', fontStyle: 'italic' }}>{tok}</span>;
        if (/^!/.test(tok)) return <span key={i} style={{ color: '#f9ab00' }}>{tok}</span>;
        if (/^\d/.test(tok)) return <span key={i} style={{ color: '#b5cea8' }}>{tok}</span>;
        return <span key={i} style={{ color: '#cdd3de' }}>{tok}</span>;
      })}
    </span>
  );
}

// ── Single interactive cell ──────────────────────────────────────────────────
function InteractiveCell({ cell, runTick }: { cell: NbCell; runTick: number }) {
  const [state, setState] = useState<'idle' | 'running' | 'done'>('idle');
  const [typedOutput, setTypedOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const run = () => {
    if (state === 'running' || !cell.output) {
      // No output → just flash "done"
      if (!cell.output) setState('done');
      return;
    }
    setState('running');
    setTypedOutput('');
    const delay = Math.min(parseInt(cell.runTime || '1') * 500, 1600);
    timerRef.current = setTimeout(() => {
      setState('done');
      const lines = (cell.output || '').split('\n');
      let i = 0;
      intervalRef.current = setInterval(() => {
        i++;
        setTypedOutput(lines.slice(0, i).join('\n'));
        if (i >= lines.length && intervalRef.current) clearInterval(intervalRef.current);
      }, 32);
    }, delay);
  };

  // React to global "Run all"
  useEffect(() => {
    if (runTick > 0) run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runTick]);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const copy = () => {
    navigator.clipboard.writeText(cell.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const lines = cell.code.split('\n');

  return (
    <div style={{ borderBottom: '1px solid #2d2e30' }} className="group/cell">
      {/* Section label */}
      <div
        className="flex items-center gap-2 px-3 py-1.5 select-none"
        style={{ borderBottom: '1px solid #2d2e30', background: '#1a1a1a' }}
      >
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#5f6368' }} />
        <span className="text-[11px] font-medium tracking-wide" style={{ color: '#9aa0a6' }}>
          {cell.title}
        </span>
        <button
          onClick={copy}
          className="ml-auto flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover/cell:opacity-100 transition-opacity hover:bg-white/10"
          style={{ color: copied ? '#34a853' : '#9aa0a6' }}
          title="Copy code"
        >
          {copied ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Code row */}
      <div className="flex" style={{ background: '#1e1e1e' }}>
        {/* Gutter / run button */}
        <div
          className="flex flex-col items-center pt-2.5 pb-2 shrink-0 select-none gap-1"
          style={{ width: '52px', borderRight: '1px solid #2d2e30' }}
        >
          <button
            onClick={run}
            disabled={state === 'running'}
            className="w-[22px] h-[22px] rounded-full flex items-center justify-center border transition-all hover:border-blue-400"
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
          <span className="text-[9px] font-mono" style={{ color: '#5f6368' }}>[{cell.idx}]</span>
          {state === 'done' && cell.runTime && (
            <span className="text-[8px] font-mono" style={{ color: '#34a853' }}>{cell.runTime}</span>
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
            <pre className="flex-1 text-[12px] font-mono leading-[1.65] overflow-x-auto whitespace-pre">
              {lines.map((line, i) => (
                <div key={i}>{line ? <HighlightLine line={line} /> : <span>&nbsp;</span>}</div>
              ))}
            </pre>
          </div>
        </div>
      </div>

      {/* Output */}
      <AnimatePresence>
        {state === 'done' && typedOutput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="ml-[52px]"
            style={{ borderTop: '1px solid #2d2e30', background: '#141414' }}
          >
            <div style={{ borderLeft: '3px solid #1a73e8' }} className="px-4 py-3">
              <pre className="text-[11px] font-mono leading-[1.75] whitespace-pre-wrap" style={{ color: '#8ab4f8' }}>
                {typedOutput}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Notebook window ──────────────────────────────────────────────────────────
export function NotebookEmbed({ filename, cells, colabUrl, maxHeight = 560 }: NotebookEmbedProps) {
  const [runAllTick, setRunAllTick] = useState(0);

  return (
    <div className="my-8 rounded-xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-white/5 not-prose">
      {/* Top bar */}
      <div
        className="flex items-center gap-3 px-4 py-2.5 select-none"
        style={{ background: '#1f1f1f', borderBottom: '1px solid #3c4043' }}
      >
        <svg viewBox="0 0 40 40" className="w-5 h-5 shrink-0">
          <circle cx="20" cy="20" r="20" fill="#f9ab00" />
          <path d="M14 20a6 6 0 1 1 12 0 6 6 0 0 1-12 0z" fill="#1f1f1f" />
          <path d="M26 14a6 6 0 1 1 0 12" stroke="#f9ab00" strokeWidth="2" fill="none" />
        </svg>
        <span className="text-[12px] font-medium" style={{ color: '#e8eaed' }}>{filename}</span>
        <button
          onClick={() => setRunAllTick((t) => t + 1)}
          className="ml-auto flex items-center gap-1.5 text-[11px] px-3 py-1 rounded transition-all hover:bg-blue-600/15 active:scale-95"
          style={{ color: '#e8eaed', border: '1px solid #3c4043' }}
        >
          <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="#8ab4f8"><polygon points="2,1 9,5 2,9" /></svg>
          Run all
        </button>
        <div className="hidden sm:flex items-center gap-1.5 text-[10px]" style={{ color: '#34a853' }}>
          <svg viewBox="0 0 8 8" className="w-1.5 h-1.5"><circle cx="4" cy="4" r="3" fill="#34a853" /></svg>
          Connected
        </div>
      </div>

      {/* Cells */}
      <div className="overflow-y-auto custom-scrollbar" style={{ background: '#1e1e1e', maxHeight }}>
        {cells.map((cell) => (
          <InteractiveCell key={cell.idx} cell={cell} runTick={runAllTick} />
        ))}
      </div>

      {/* Footer / Colab CTA */}
      <div
        className="flex items-center justify-between px-4 py-2 select-none"
        style={{ background: '#1f1f1f', borderTop: '1px solid #2d2e30' }}
      >
        <span className="text-[10.5px] font-mono" style={{ color: '#5f6368' }}>Python 3.10 · KaizenStat 0.6.0</span>
        {colabUrl && (
          <a
            href={colabUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-1 rounded transition-all hover:bg-blue-600/15"
            style={{ color: '#8ab4f8' }}
          >
            Open in Colab
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}
