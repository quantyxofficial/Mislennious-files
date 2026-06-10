import React, { useEffect, useRef, useState } from 'react';
import { Github, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Counter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const duration = 1600;
        const tick = () => {
          const progress = Math.min((Date.now() - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(value < 10 ? parseFloat((eased * value).toFixed(1)) : Math.floor(eased * value));
          if (progress < 1) requestAnimationFrame(tick);
          else setCount(value);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{value < 10 ? (count as number).toFixed(1) : (count as number).toLocaleString()}{suffix}</span>;
};

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block py-1 px-3 border border-lux-text/10 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-lux-muted bg-lux-glass">
    {children}
  </span>
);

const institutes = [
  'IIT Madras', 'IIT Patna', 'IIITDM Jabalpur', 'NIT Raipur',
  'ISI Kolkata', 'NIT Srinagar', 'DTU', 'NSUT', 'IGDTUW',
  'Jamia Millia Islamia', 'AMU', 'VIT', 'SRMIST', 'KIIT',
  'Amrita Vishwa Vidyapeetham', 'Bennett University', 'BML Munjal University', 'Symbiosis IT',
];

export const OpenSourceLanding: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto space-y-28">

        {/* ── HERO ── */}
        <section className="grid lg:grid-cols-12 gap-12 items-center min-h-[70vh]">
          <div className="lg:col-span-7 space-y-8">
            <Badge>Open Source Program</Badge>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-lux-text leading-[1.05]">
              Kaizen Stat<br />
              <span className="italic font-light text-lux-muted">Summer of Computation</span>
            </h1>

            <p className="text-sm text-lux-muted leading-relaxed max-w-lg">
              Contribute to real data science. Work on production datasets, models, and pipelines
              alongside students from 138+ institutions worldwide. Build proof of work that companies actually value.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://github.com/Kaizenstat"
                target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-lux-text text-lux-cream font-semibold text-xs tracking-[0.15em] uppercase hover:bg-lux-text/90 transition-colors rounded-full"
              >
                <Github size={14} />
                Start Contributing
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/events"
                className="inline-flex items-center gap-3 px-8 py-4 border border-lux-glassBorder bg-lux-glass text-lux-muted font-semibold text-xs tracking-[0.15em] uppercase hover:text-lux-text hover:border-lux-text/20 transition-colors rounded-full backdrop-blur-sm"
              >
                Explore Projects
              </Link>
            </div>

            <p className="text-[10px] text-lux-muted/40 uppercase tracking-widest font-mono">
              Built on real repositories · Verified through GitHub
            </p>
          </div>

          {/* Stat card */}
          <div className="lg:col-span-5 glass-bento rounded-3xl p-8 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-lux-muted">KSoC Impact</span>
              <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Program
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { v: 15000, s: '+', label: 'Global Reach', sub: 'Total Impressions' },
                { v: 7500, s: '+', label: 'Platform Events', sub: 'Unstop + Website' },
                { v: 228, s: '+', label: 'Active Users', sub: '+230% Growth' },
                { v: 138, s: '+', label: 'Institutes', sub: 'IITs, NITs & more' },
              ].map((stat, i) => (
                <div key={i} className="bg-lux-glass border border-lux-glassBorder rounded-2xl p-4">
                  <div className="font-serif text-2xl text-lux-text mb-0.5">
                    <Counter value={stat.v} suffix={stat.s} />
                  </div>
                  <div className="text-xs font-semibold text-lux-text/80">{stat.label}</div>
                  <div className="text-[10px] text-lux-muted mt-0.5">{stat.sub}</div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-lux-glassBorder space-y-2.5">
              <div className="text-[10px] text-lux-muted uppercase tracking-widest mb-3">Institute Tiers</div>
              {([
                ['IIT / NIT / IIIT', 8],
                ['Private Colleges', 67],
                ['Government', 21],
                ['International', 1],
              ] as [string, number][]).map(([label, pct]) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="flex-1 h-1 bg-lux-glassBorder rounded-full overflow-hidden">
                    <div className="h-full bg-lux-muted/50 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-[10px] text-lux-muted w-32 truncate">{label}</span>
                  <span className="text-[10px] text-lux-text font-bold w-8 text-right">~{pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ANALYTICS ── */}
        <section>
          <div className="mb-10 space-y-3">
            <Badge>Verified Analytics</Badge>
            <h2 className="font-serif text-4xl md:text-5xl text-lux-text leading-tight">
              Program <span className="italic font-light text-lux-muted">Analytics</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: 'Traffic Breakdown',
                rows: [['External / Social', '84%'], ['Platform Direct', '16%'], ['Search Organic', 'High'], ['Global Presence', 'Verified']],
              },
              {
                title: 'Community Health',
                rows: [['New Users', '221'], ['Returning Users', '7'], ['Active Ratio', '97%'], ['Growth Rate', '+230%']],
              },
              {
                title: 'Engagement',
                rows: [['Unstop Interactions', '~5.1K'], ['Website Events', '2.4K'], ['Total Events', '7,500+'], ['Conversion Rate', 'Strong']],
              },
            ].map((card, i) => (
              <div key={i} className="glass-bento rounded-2xl p-6 space-y-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-lux-muted">{card.title}</div>
                <div className="space-y-3">
                  {card.rows.map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center border-b border-lux-glassBorder pb-2 last:border-0 last:pb-0">
                      <span className="text-xs text-lux-muted">{k}</span>
                      <span className="text-xs font-bold text-lux-text">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── EVENTS ── */}
        <section>
          <div className="mb-10 space-y-3">
            <Badge>Verified Reports</Badge>
            <h2 className="font-serif text-4xl md:text-5xl text-lux-text leading-tight">
              Events <span className="italic font-light text-lux-muted">Organized</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                name: 'Tech Blog Internship',
                platform: 'Unstop',
                date: 'May 2026',
                impressions: '1,706',
                applications: '182',
                breakdown: [['Primary', '1,100'], ['Secondary', '300'], ['Tertiary', '306']],
              },
              {
                name: 'Logo Designing Competition',
                platform: 'Unstop',
                date: 'Oct 2025',
                impressions: '3,200',
                applications: '100+',
                breakdown: [['Primary', '2,100'], ['Secondary', '600'], ['Tertiary', '500']],
              },
            ].map((ev, i) => (
              <div key={i} className="glass-bento rounded-2xl p-6 space-y-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-lux-muted mb-1">{ev.platform} · {ev.date}</div>
                    <h3 className="font-serif text-xl text-lux-text">{ev.name}</h3>
                  </div>
                  <ExternalLink size={14} className="text-lux-muted/30 mt-1 flex-shrink-0" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-lux-glass border border-lux-glassBorder rounded-xl p-3">
                    <div className="text-[10px] text-lux-muted uppercase tracking-widest mb-1">Impressions</div>
                    <div className="font-serif text-2xl text-lux-text">{ev.impressions}</div>
                  </div>
                  <div className="bg-lux-glass border border-lux-glassBorder rounded-xl p-3">
                    <div className="text-[10px] text-lux-muted uppercase tracking-widest mb-1">Applications</div>
                    <div className="font-serif text-2xl text-lux-text">{ev.applications}</div>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-lux-muted uppercase tracking-widest mb-2">Impression Breakdown</div>
                  <div className="space-y-1.5">
                    {ev.breakdown.map(([k, v]) => (
                      <div key={k} className="flex justify-between text-xs border-b border-lux-glassBorder pb-1.5 last:border-0">
                        <span className="text-lux-muted">{k}</span>
                        <span className="text-lux-text font-semibold">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── INSTITUTES ── */}
        <section>
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-3">
              <Badge>138+ Institutions</Badge>
              <h2 className="font-serif text-4xl md:text-5xl text-lux-text leading-tight">
                Our <span className="italic font-light text-lux-muted">Participants</span>
              </h2>
            </div>
            <p className="text-xs text-lux-muted max-w-xs leading-relaxed">
              Organic student reach across top-tier and diverse academic backgrounds globally.
            </p>
          </div>

          <div className="relative overflow-hidden py-2">
            <div className="flex gap-3" style={{ animation: 'ksoc-marquee 35s linear infinite', width: 'max-content' }}>
              {[...institutes, ...institutes].map((name, i) => (
                <span key={i} className="flex-shrink-0 px-4 py-2 rounded-full border border-lux-glassBorder bg-lux-glass text-lux-muted text-xs font-medium whitespace-nowrap">
                  {name}
                </span>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent pointer-events-none" />
          </div>

          <p className="text-[10px] text-lux-muted/40 font-mono mt-5 text-center">
            * Individual student interest. Does not imply official institutional partnership.
          </p>
        </section>

        {/* ── CTA ── */}
        <section className="glass-bento rounded-3xl p-12 md:p-16 text-center">
          <div className="mb-6"><Badge>KSoC Program</Badge></div>
          <h2 className="font-serif text-4xl md:text-6xl text-lux-text mb-6 leading-tight">
            The future is <span className="italic font-light text-lux-muted">open.</span>
          </h2>
          <p className="text-sm text-lux-muted max-w-md mx-auto mb-10 leading-relaxed">
            Join 228+ students already contributing to real ML repositories from 138+ institutions worldwide.
          </p>
          <a
            href="https://github.com/Kaizenstat"
            target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-lux-text text-lux-cream font-semibold text-xs tracking-[0.15em] uppercase hover:bg-lux-text/90 transition-colors rounded-full"
          >
            <Github size={14} />
            Start Your First Mission
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </div>

      <style>{`
        @keyframes ksoc-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};
