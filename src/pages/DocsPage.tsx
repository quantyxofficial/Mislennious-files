import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Hash, ChevronRight, ChevronDown, Clock,
  ArrowRight, ArrowLeft, Github, ExternalLink, Library, Map as MapIcon,
} from 'lucide-react';
import { Navbar } from '../components/sections/Navbar';
import { BOOK, ALL_CHAPTERS, Chapter, ORG, COLAB_QS } from './docs/book';
import { updateMetaTags, createBreadcrumbs } from '../utils/seo';

const PYPI_URL = 'https://pypi.org/project/kaizenstat/';
const REPO_URL = 'https://github.com/kaizenstat-python/KaizenStat';

export function DocsPage() {
  const { chapterId } = useParams<{ chapterId?: string }>();
  const navigate = useNavigate();

  // null = show the Index / table of contents landing view
  const activeId = chapterId || null;
  const [activeSection, setActiveSection] = useState<string>('');
  const [openParts, setOpenParts] = useState<Record<string, boolean>>(
    Object.fromEntries(BOOK.map((p) => [p.id, true]))
  );

  const setActiveId = (id: string | null) => {
    if (id === null) navigate('/docs', { replace: false });
    else navigate(`/docs/${id}`, { replace: false });
  };

  const activeChapter: Chapter | null = activeId
    ? ALL_CHAPTERS.find((c) => c.id === activeId) || null
    : null;
  const activeIdx = activeChapter ? ALL_CHAPTERS.findIndex((c) => c.id === activeChapter.id) : -1;
  const prev = activeIdx > 0 ? ALL_CHAPTERS[activeIdx - 1] : null;
  const next = activeIdx >= 0 && activeIdx < ALL_CHAPTERS.length - 1 ? ALL_CHAPTERS[activeIdx + 1] : null;

  // Per-chapter SEO: update meta tags + structured data when chapter changes
  useEffect(() => {
    const base = 'https://www.kaizenstat.com';
    if (activeChapter) {
      const canonical = `${base}/docs/${activeChapter.id}`;
      updateMetaTags({
        title: `Ch. ${activeChapter.number}: ${activeChapter.title} — KaizenStat Handbook`,
        description: `${activeChapter.summary} Part of the KaizenStat v0.6.0 Python ML handbook with runnable Colab notebook examples.`,
        keywords: ['kaizenstat', activeChapter.title.toLowerCase(), 'python machine learning', 'kaizenstat tutorial', 'ml pipeline'],
        canonical,
        ogType: 'article',
        twitterCard: 'summary_large_image',
        structuredData: createBreadcrumbs([
          { name: 'Home', url: base },
          { name: 'Docs', url: `${base}/docs` },
          { name: activeChapter.title, url: canonical },
        ]),
      });
    } else {
      updateMetaTags({
        title: 'KaizenStat Handbook — Complete Python ML Documentation',
        description: 'A practical, chapter-by-chapter handbook for KaizenStat v0.6.0. Every concept paired with a runnable Colab notebook — from first model to production deployment.',
        keywords: ['kaizenstat docs', 'kaizenstat handbook', 'python ml tutorial', 'machine learning documentation'],
        canonical: `${base}/docs`,
        ogType: 'website',
        structuredData: createBreadcrumbs([
          { name: 'Home', url: base },
          { name: 'Docs', url: `${base}/docs` },
        ]),
      });
    }
  }, [activeChapter]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (activeChapter) setActiveSection(activeChapter.sections[0]?.id || '');
  }, [activeId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll-spy
  useEffect(() => {
    if (!activeChapter) return;
    const onScroll = () => {
      const pos = window.scrollY + 200;
      for (let i = activeChapter.sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(activeChapter.sections[i].id);
        if (el && el.offsetTop <= pos) { setActiveSection(activeChapter.sections[i].id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [activeChapter]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
  };
  const togglePart = (pid: string) => setOpenParts((s) => ({ ...s, [pid]: !s[pid] }));

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-slate-100 pt-28 pb-24 relative">
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.025] via-transparent to-transparent z-0" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-blue-600/[0.04] blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-[1500px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* ── Sidebar: chapter tree ──────────────────────────────── */}
            <aside className="lg:col-span-3 lg:sticky lg:top-28 self-start space-y-4">
              <button
                onClick={() => setActiveId(null)}
                className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-bold transition-all border ${
                  activeId === null
                    ? 'bg-white text-black border-white shadow-lg shadow-white/10'
                    : 'bg-white/[0.03] text-white border-white/10 hover:bg-white/10'
                }`}
              >
                <Library className="w-4 h-4" /> Contents
              </button>

              <div className="bg-white/[0.02] border border-white/5 shadow-2xl backdrop-blur-md rounded-2xl p-3 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {BOOK.map((part) => (
                  <div key={part.id} className="mb-1.5">
                    <button
                      onClick={() => togglePart(part.id)}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      {openParts[part.id]
                        ? <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                        : <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300">{part.title}</span>
                      <span className="text-[10px] text-slate-500 truncate">· {part.subtitle}</span>
                    </button>
                    {openParts[part.id] && (
                      <div className="ml-2 pl-2 border-l border-white/10 space-y-0.5 mt-0.5">
                        {part.chapters.map((ch) => {
                          const isActive = ch.id === activeId;
                          return (
                            <button
                              key={ch.id}
                              onClick={() => setActiveId(ch.id)}
                              className={`w-full flex items-baseline gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all ${
                                isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                              }`}
                            >
                              <span className={`text-[10px] font-mono shrink-0 ${isActive ? 'text-blue-300' : 'text-slate-600'}`}>
                                {ch.number}
                              </span>
                              <span className="text-[12px] font-medium leading-snug">{ch.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </aside>

            {/* ── Main column ────────────────────────────────────────── */}
            <main className="lg:col-span-9 xl:col-span-7">
              <AnimatePresence mode="wait">
                {activeChapter === null ? (
                  <IndexView key="index" onOpen={setActiveId} />
                ) : (
                  <motion.article
                    key={activeChapter.id}
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 md:p-10 backdrop-blur-sm"
                  >
                    {/* Chapter header */}
                    <div className="border-b border-white/5 pb-6 mb-8">
                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                        <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 uppercase tracking-widest text-[10px] font-bold">
                          Chapter {activeChapter.number}
                        </span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {activeChapter.readTime}</span>
                      </div>
                      <h1 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
                        {activeChapter.title}
                      </h1>
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed">{activeChapter.summary}</p>
                    </div>

                    {/* Sections */}
                    <div className="space-y-12">
                      {activeChapter.sections.map((s) => (
                        <section key={s.id} id={s.id} className="scroll-mt-28">
                          <h2 className="font-serif text-2xl font-bold text-white mb-4 pb-2 border-b border-white/5 flex items-center gap-2 group">
                            <Hash className="w-4 h-4 text-blue-400/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                            {s.title}
                          </h2>
                          <div className="docs-prose text-slate-400 text-[14px] leading-[1.75]
                            [&_p]:mb-4 [&_strong]:text-white [&_strong]:font-semibold [&_em]:text-slate-300
                            [&_a]:text-blue-300 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-blue-200">
                            {s.body}
                          </div>
                        </section>
                      ))}
                    </div>

                    {/* Prev / Next chapter */}
                    <div className="mt-14 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                      {prev ? (
                        <button onClick={() => setActiveId(prev.id)}
                          className="group flex flex-col gap-1 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors text-left">
                          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-slate-500"><ArrowLeft className="w-3 h-3" /> Ch. {prev.number}</span>
                          <span className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">{prev.title}</span>
                        </button>
                      ) : <div />}
                      {next ? (
                        <button onClick={() => setActiveId(next.id)}
                          className="group flex flex-col gap-1 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors text-right items-end">
                          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-slate-500">Ch. {next.number} <ArrowRight className="w-3 h-3" /></span>
                          <span className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">{next.title}</span>
                        </button>
                      ) : <div />}
                    </div>
                  </motion.article>
                )}
              </AnimatePresence>
            </main>

            {/* ── Right rail: section TOC (only inside a chapter) ────── */}
            <aside className="hidden xl:block xl:col-span-2 lg:sticky lg:top-28 self-start">
              {activeChapter && (
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
                  <h3 className="font-serif font-bold text-white mb-4 flex items-center gap-2 text-sm">
                    <Hash className="w-4 h-4 text-white/50" /> On this page
                  </h3>
                  <nav className="max-h-[65vh] overflow-y-auto pr-1 custom-scrollbar space-y-0.5">
                    {activeChapter.sections.map((s) => (
                      <button key={s.id} onClick={() => scrollTo(s.id)}
                        className={`block w-full text-left py-1.5 px-3 rounded-lg text-[11px] font-medium transition-colors border-l-2 ${
                          activeSection === s.id
                            ? 'bg-white/10 text-white border-blue-400'
                            : 'text-slate-500 border-transparent hover:text-white hover:bg-white/5'
                        }`}>
                        {s.title}
                      </button>
                    ))}
                  </nav>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Index / Preface landing view ─────────────────────────────────────────── */
function IndexView({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <motion.div
      key="index"
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="space-y-10"
    >
      {/* Hero */}
      <header className="bg-white/[0.01] border border-white/5 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/[0.06] text-[10px] font-mono uppercase tracking-widest text-blue-300 mb-5">
          The KaizenStat Handbook · v0.6.0
        </div>
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-4">
          Learn KaizenStat,<br />build real models.
        </h1>
        <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl">
          A practical, chapter-by-chapter handbook. Every concept is paired with a runnable Colab
          notebook cell — read the idea, hit <span className="text-white font-mono bg-white/5 px-1 rounded">▶</span>,
          and implement it immediately. No prior ML experience required.
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-7">
          <button onClick={() => onOpen('first-model')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-bold transition-transform hover:scale-[1.03]">
            Start with Chapter 1 <ArrowRight className="w-4 h-4" />
          </button>
          <a href={PYPI_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-bold transition-colors hover:bg-white/10">
            pip install kaizenstat <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-bold transition-colors hover:bg-white/10">
            <Github className="w-3.5 h-3.5" /> GitHub
          </a>
        </div>
      </header>

      {/* Table of contents */}
      <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-8 backdrop-blur-sm">
        <h2 className="font-serif text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-white/60" /> Table of Contents
        </h2>
        <div className="space-y-8">
          {BOOK.map((part) => (
            <div key={part.id}>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-blue-300">{part.title}</span>
                <span className="text-sm font-serif text-white">{part.subtitle}</span>
                <div className="flex-1 border-b border-white/5 translate-y-[-2px]" />
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {part.chapters.map((ch) => (
                  <button key={ch.id} onClick={() => onOpen(ch.id)}
                    className="group flex items-start gap-3 p-3.5 rounded-xl border border-white/5 bg-white/[0.015] hover:bg-white/[0.04] hover:border-white/10 transition-all text-left">
                    <span className="w-7 h-7 shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[12px] font-mono font-bold text-blue-300 group-hover:bg-blue-500/20 transition-colors">
                      {ch.number}
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">{ch.title}</span>
                      <span className="block text-[12px] text-slate-500 leading-snug mt-0.5">{ch.summary}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to read */}
      <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-8 backdrop-blur-sm">
        <h2 className="font-serif text-2xl font-bold text-white mb-5 flex items-center gap-2">
          <MapIcon className="w-5 h-5 text-white/60" /> Where to Start
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            ['Never trained a model?', 'Chapters 1–3 — your first model in one line.', 'what-is-kaizenstat'],
            ['Know pandas & sklearn?', 'Part II — the pipeline, stage by stage.', 'load-fit'],
            ['Shipping to production?', 'Part III — trust, NLP, deployment.', 'trust'],
            ['Looking up a method?', 'Appendix — the full API reference.', 'api-reference'],
          ].map(([q, a, id]) => (
            <button key={id} onClick={() => onOpen(id)}
              className="group flex flex-col gap-1 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors text-left">
              <span className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">{q}</span>
              <span className="text-[12px] text-slate-500">{a}</span>
            </button>
          ))}
        </div>
        <a href={COLAB_QS} target="_blank" rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm text-blue-300 hover:text-blue-200 transition-colors">
          Or open the full quick-start notebook in Colab <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}
