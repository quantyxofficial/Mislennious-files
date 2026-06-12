import { useState, ReactNode } from 'react';
import { Check, Copy, Info, AlertTriangle, Lightbulb, Zap } from 'lucide-react';

/** Copy-to-clipboard syntax-highlighted code block (for reference snippets). */
export function CodeBlock({ code, lang = 'python' }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="not-prose my-5 rounded-xl overflow-hidden border border-white/10 bg-[#1a1a1d]">
      <div className="flex items-center justify-between px-4 py-1.5 border-b border-white/5 bg-white/[0.02]">
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{lang}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded transition-colors hover:bg-white/10"
          style={{ color: copied ? '#34a853' : '#9aa0a6' }}
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="px-4 py-3 text-[12.5px] font-mono leading-[1.7] overflow-x-auto text-slate-300 whitespace-pre">
        {code}
      </pre>
    </div>
  );
}

type CalloutType = 'info' | 'warning' | 'tip' | 'pro';
const calloutStyle: Record<CalloutType, { icon: ReactNode; border: string; bg: string; label: string; color: string }> = {
  info:    { icon: <Info className="w-4 h-4" />,         border: '#3b82f6', bg: 'rgba(59,130,246,0.06)',  label: 'Note',     color: '#93c5fd' },
  warning: { icon: <AlertTriangle className="w-4 h-4" />, border: '#f59e0b', bg: 'rgba(245,158,11,0.06)', label: 'Watch out', color: '#fcd34d' },
  tip:     { icon: <Lightbulb className="w-4 h-4" />,    border: '#22c55e', bg: 'rgba(34,197,94,0.06)',  label: 'Tip',      color: '#86efac' },
  pro:     { icon: <Zap className="w-4 h-4" />,          border: '#a855f7', bg: 'rgba(168,85,247,0.06)', label: 'Premium',  color: '#d8b4fe' },
};

export function Callout({ type = 'info', children }: { type?: CalloutType; children: ReactNode }) {
  const s = calloutStyle[type];
  return (
    <div
      className="not-prose my-5 rounded-r-xl pl-4 pr-5 py-3.5 flex gap-3"
      style={{ borderLeft: `3px solid ${s.border}`, background: s.bg }}
    >
      <span style={{ color: s.color }} className="mt-0.5 shrink-0">{s.icon}</span>
      <div className="text-[13px] leading-relaxed text-slate-300">
        <span className="font-bold mr-1" style={{ color: s.color }}>{s.label}:</span>
        {children}
      </div>
    </div>
  );
}

/** Pill row of stats, e.g. version / license / tests. */
export function StatPills({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="not-prose flex flex-wrap gap-2.5 my-6">
      {items.map((it) => (
        <div key={it.label} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10">
          <span className="text-[10px] uppercase tracking-widest text-slate-500">{it.label}</span>
          <span className="text-[12px] font-bold text-white">{it.value}</span>
        </div>
      ))}
    </div>
  );
}

/** A clean feature/method reference table. */
export function RefTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-left text-[12.5px] border-collapse">
        <thead>
          <tr className="bg-white/[0.03]">
            {headers.map((h) => (
              <th key={h} className="px-4 py-2.5 font-semibold text-white border-b border-white/10 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-white/[0.02] transition-colors">
              {r.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 text-slate-400 border-b border-white/5 align-top">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Inline mono code for prose. */
export function Mono({ children }: { children: ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-white/10 text-white text-[0.85em] font-mono">{children}</code>
  );
}
