import React, { useEffect, useRef, useState } from 'react';
import {
    motion, useScroll, useTransform, useSpring, useInView, useMotionValue,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ProblemOfTheDay } from '../../components/agency/practice/ProblemOfTheDay';
import { loadTopics, loadCurriculum, TopicMetadata, Curriculum } from '../../utils/contentLoader';
import { Logo } from '../../components/ui/Logo';
import {
    BookOpen, ArrowRight, Sparkles, ShieldCheck, Activity,
    Wrench, Gauge, Boxes, Brain, Terminal, CheckCircle2, Layers,
} from 'lucide-react';

const ML_ID = 'machine-learning';
const EASE = [0.16, 1, 0.3, 1] as const;
type IconCmp = React.ComponentType<{ className?: string }>;

// ─── Badge ──────────────────────────────────────────────────────────────────
const Badge = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center gap-2 py-1.5 px-4 border border-lux-text/10 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-lux-muted bg-lux-glass backdrop-blur-sm">
        {children}
    </span>
);

// ─── Animated count-up ────────────────────────────────────────────────────────
const Counter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const started = useRef(false);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (!e.isIntersecting || started.current) return;
            started.current = true;
            const t0 = Date.now(), dur = 1800;
            const tick = () => {
                const p = Math.min((Date.now() - t0) / dur, 1);
                const ease = 1 - Math.pow(1 - p, 4);
                setCount(Math.floor(ease * value));
                if (p < 1) requestAnimationFrame(tick); else setCount(value);
            };
            requestAnimationFrame(tick);
        }, { threshold: 0.2 });
        obs.observe(el);
        return () => obs.disconnect();
    }, [value]);
    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

// ─── Scroll-reveal wrapper (blur-up) ──────────────────────────────────────────
const Reveal = ({ children, delay = 0, y = 40 }: { children: React.ReactNode; delay?: number; y?: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-70px' });
    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, y, filter: 'blur(8px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.9, delay, ease: EASE }}>
            {children}
        </motion.div>
    );
};

// ─── Word-by-word reveal ──────────────────────────────────────────────────────
const WordReveal = ({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    return (
        <span ref={ref} className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}>
            {text.split(' ').map((word, i) => (
                <span key={i} style={{ display: 'inline-block', overflow: 'hidden' }}>
                    <motion.span style={{ display: 'inline-block' }}
                        initial={{ y: '110%' }}
                        animate={inView ? { y: 0 } : {}}
                        transition={{ duration: 0.8, delay: delay + i * 0.06, ease: EASE }}>
                        {word}
                    </motion.span>
                </span>
            ))}
        </span>
    );
};

// ─── Magnetic 3D tilt card ────────────────────────────────────────────────────
const MagneticCard = ({ children, className = '', intensity = 10 }: { children: React.ReactNode; className?: string; intensity?: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const rotX = useMotionValue(0);
    const rotY = useMotionValue(0);
    const glowX = useMotionValue(50);
    const glowY = useMotionValue(50);
    const springX = useSpring(rotX, { stiffness: 200, damping: 25 });
    const springY = useSpring(rotY, { stiffness: 200, damping: 25 });
    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const r = ref.current?.getBoundingClientRect(); if (!r) return;
        const nx = (e.clientX - r.left) / r.width;
        const ny = (e.clientY - r.top) / r.height;
        rotX.set((ny - 0.5) * -intensity);
        rotY.set((nx - 0.5) * intensity);
        glowX.set(nx * 100); glowY.set(ny * 100);
    };
    return (
        <div ref={ref} style={{ perspective: 1000 }}
            onMouseMove={handleMove}
            onMouseLeave={() => { rotX.set(0); rotY.set(0); glowX.set(50); glowY.set(50); }}>
            <motion.div style={{ rotateX: springX, rotateY: springY }} className={`relative ${className}`}>
                <motion.div className="absolute inset-0 rounded-[inherit] pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                        background: useTransform([glowX, glowY], ([x, y]) =>
                            `radial-gradient(circle at ${x}% ${y}%, rgba(168,85,247,0.10) 0%, transparent 60%)`),
                    }} />
                {children}
            </motion.div>
        </div>
    );
};

// ─── Particle network canvas ──────────────────────────────────────────────────
const ParticleField = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current; if (!canvas) return;
        const ctx = canvas.getContext('2d'); if (!ctx) return;
        let raf = 0;
        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
        resize(); window.addEventListener('resize', resize);
        const particles = Array.from({ length: 70 }, () => ({
            x: Math.random() * canvas.width, y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
            r: Math.random() * 1.5 + 0.3, alpha: Math.random() * 0.4 + 0.1,
        }));
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(180,160,255,${p.alpha})`; ctx.fill();
            });
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(140,120,255,${0.08 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5; ctx.stroke();
                    }
                }
            }
            raf = requestAnimationFrame(draw);
        };
        draw();
        return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
    }, []);
    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

// ─── Floating depth chip ──────────────────────────────────────────────────────
const FloatingChip = ({ label, x, y, delay }: { label: string; x: string; y: string; delay: number }) => (
    <motion.div
        className="absolute hidden lg:block text-[10px] font-mono text-lux-muted/40 border border-lux-glassBorder/40 rounded-full px-3 py-1 bg-lux-glass/20 backdrop-blur-sm pointer-events-none select-none whitespace-nowrap"
        style={{ left: x, top: y }}
        animate={{ y: ['0px', '-12px', '0px'], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}>
        {label}
    </motion.div>
);

// ─── Live KaizenStat terminal (self-running pipeline) ─────────────────────────
type TermStep = { key: string; label: string; result: string; tone: 'ok' | 'metric' | 'ship'; ms: number };
const TERM_STEPS: TermStep[] = [
    { key: 'load',     label: 'doctor.load("churn.csv")',  result: '7,043 rows · 21 cols', tone: 'ok',     ms: 700 },
    { key: 'health',   label: 'doctor.health()',           result: '91 / 100',            tone: 'metric', ms: 950 },
    { key: 'validate', label: 'doctor.validate()',         result: 'no leakage',          tone: 'ok',     ms: 850 },
    { key: 'fix',      label: 'doctor.fix(safe=True)',     result: '3 fixes applied',     tone: 'ok',     ms: 800 },
    { key: 'train',    label: 'doctor.quick_train()',      result: 'LightGBM · 0.84',     tone: 'metric', ms: 1500 },
    { key: 'trust',    label: 'doctor.trust_score()',      result: '84 / 100',            tone: 'metric', ms: 900 },
    { key: 'export',   label: 'doctor.export_model()',     result: 'churn.joblib',        tone: 'ship',   ms: 1000 },
];

const LiveTerminal = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: false, margin: '-60px' });
    const [active, setActive] = useState(-1);   // index currently running
    const [done, setDone] = useState(-1);        // highest completed index
    const [running, setRunning] = useState(false);

    useEffect(() => {
        if (!inView) return;
        let cancelled = false;
        let timers: ReturnType<typeof setTimeout>[] = [];

        const run = () => {
            setRunning(true);
            setActive(-1); setDone(-1);
            let t = 400;
            TERM_STEPS.forEach((s, i) => {
                timers.push(setTimeout(() => { if (!cancelled) setActive(i); }, t));
                t += s.ms;
                timers.push(setTimeout(() => { if (!cancelled) setDone(i); }, t));
            });
            // hold the finished state, then restart
            timers.push(setTimeout(() => {
                if (!cancelled) { setActive(-1); setRunning(false); }
            }, t + 2600));
            timers.push(setTimeout(() => { if (!cancelled) run(); }, t + 3200));
        };
        run();
        return () => { cancelled = true; timers.forEach(clearTimeout); };
    }, [inView]);

    const toneColor = (tone: TermStep['tone']) =>
        tone === 'ship' ? 'text-violet-300' : tone === 'metric' ? 'text-sky-300' : 'text-emerald-300';

    const progress = TERM_STEPS.length ? ((done + 1) / TERM_STEPS.length) * 100 : 0;
    const finished = done === TERM_STEPS.length - 1;

    return (
        <MagneticCard intensity={10} className="group glass-bento rounded-3xl overflow-hidden relative">
            {/* glow behind */}
            <div className="absolute -inset-6 blur-[70px] pointer-events-none -z-10"
                style={{ background: 'radial-gradient(ellipse at 60% 30%, rgba(120,80,255,0.22), transparent 70%)' }} />
            {/* running border pulse */}
            <motion.div className="absolute inset-0 rounded-3xl pointer-events-none z-20"
                animate={{ opacity: running ? [0.15, 0.5, 0.15] : 0.25 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ boxShadow: `inset 0 0 0 1px ${finished ? 'rgba(52,211,153,0.45)' : 'rgba(120,80,255,0.4)'}` }} />

            {/* titlebar */}
            <div className="h-11 flex items-center gap-2 px-4 border-b border-white/5 bg-black/50 relative z-10">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                <span className="ml-3 text-[11px] font-mono text-white/40 tracking-wide">kaizenstat — run</span>
                <span className="ml-auto flex items-center gap-1.5 text-[10px] font-mono text-white/30">
                    <motion.span className={`w-1.5 h-1.5 rounded-full ${running ? 'bg-emerald-400' : 'bg-white/20'}`}
                        animate={running ? { opacity: [1, 0.2, 1] } : { opacity: 0.4 }}
                        transition={{ duration: 1.2, repeat: Infinity }} />
                    {running ? 'running' : 'idle'}
                </span>
            </div>

            {/* progress bar */}
            <div className="h-[3px] bg-white/5 relative z-10">
                <motion.div className="h-full"
                    style={{ background: finished ? 'linear-gradient(90deg,#34d399,#06b6d4)' : 'linear-gradient(90deg,#7c3aed,#06b6d4)' }}
                    animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: 'easeOut' }} />
            </div>

            {/* command line */}
            <div ref={ref} className="px-5 pt-5 pb-2 relative z-10 font-mono text-[13px]">
                <div className="flex items-center gap-2 text-white/70 mb-4">
                    <span className="text-violet-400">❯</span>
                    <span className="text-white">doctor.<span className="text-sky-300">run</span>()</span>
                    {running && (
                        <motion.span className="inline-block w-2 h-4 bg-white/60 ml-0.5"
                            animate={{ opacity: [1, 0] }} transition={{ duration: 0.7, repeat: Infinity }} />
                    )}
                </div>

                {/* steps */}
                <div className="space-y-2.5 min-h-[268px]">
                    {TERM_STEPS.map((s, i) => {
                        const isActive = active === i && done < i;
                        const isDone = done >= i;
                        const visible = active >= i || done >= i;
                        return (
                            <motion.div key={s.key}
                                initial={false}
                                animate={{ opacity: visible ? 1 : 0.18, x: visible ? 0 : -6 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center gap-3">
                                {/* status dot */}
                                <span className="w-4 shrink-0 flex justify-center">
                                    {isDone ? (
                                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 500, damping: 18 }}>
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                        </motion.span>
                                    ) : isActive ? (
                                        <motion.span className="w-3.5 h-3.5 rounded-full border-[1.5px] border-white/30 border-t-violet-400"
                                            animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />
                                    ) : (
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
                                    )}
                                </span>
                                {/* label */}
                                <span className={`${isDone ? 'text-white/55' : isActive ? 'text-white' : 'text-white/30'} transition-colors`}>
                                    {s.label}
                                </span>
                                {/* result */}
                                {isDone && (
                                    <motion.span initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}
                                        className={`ml-auto text-[12px] ${toneColor(s.tone)}`}>
                                        {s.tone === 'ship' ? '✦ ' : '→ '}{s.result}
                                    </motion.span>
                                )}
                                {isActive && (
                                    <span className="ml-auto text-[11px] text-white/30">running…</span>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* footer status */}
            <div className="px-5 py-3.5 border-t border-white/5 bg-black/40 flex items-center gap-2.5 relative z-10">
                <ShieldCheck className={`w-4 h-4 shrink-0 ${finished ? 'text-emerald-400' : 'text-white/30'} transition-colors`} />
                <span className={`text-[11.5px] font-mono transition-colors ${finished ? 'text-emerald-300' : 'text-white/40'}`}>
                    {finished ? 'Model ready to ship — calibrated & trust-scored' : 'Diagnosing → fixing → training → scoring…'}
                </span>
            </div>
        </MagneticCard>
    );
};

// ─── Static data ──────────────────────────────────────────────────────────────
const OUTCOMES = [
    'Train a production model in 3 lines with DataDoctor',
    'Catch data leakage before it fakes your accuracy',
    'Pick the right metric — F1, recall, ROC-AUC',
    'Beat single models with stacking & AutoML',
    'Debug a failing model by root cause',
    'Ship a calibrated, trust-scored .joblib',
];

const PILLARS: { icon: IconCmp; title: string; body: string; accent: string }[] = [
    { icon: Activity, title: 'Diagnose First', body: 'Score data health 0–100 and surface the problems that quietly wreck models — before you train.', accent: 'rgba(120,80,255,0.16)' },
    { icon: ShieldCheck, title: 'No Fake Accuracy', body: 'Automatic leakage detection flags features that secretly contain the answer. No more 99% lies.', accent: 'rgba(30,200,180,0.16)' },
    { icon: Boxes, title: 'Kaggle-Grade AutoML', body: 'Benchmark the full model pool, then build a stacking ensemble with one method call.', accent: 'rgba(200,160,40,0.16)' },
    { icon: Gauge, title: 'Production-Ready', body: 'Calibration, drift detection, and a 0–100 Trust Score tell you when a model is truly safe to ship.', accent: 'rgba(60,120,255,0.16)' },
];

const CHAPTER_ICONS: Record<string, IconCmp> = {
    intro: Brain, 'first-model': Sparkles, 'data-quality': ShieldCheck, preprocessing: Wrench,
    'linear-regression': Activity, 'logistic-regression': Activity, trees: Layers, ensembles: Boxes,
    clustering: Layers, evaluation: Gauge, overfitting: Brain, tuning: Wrench,
    debugging: Terminal, trust: ShieldCheck, nlp: BookOpen, capstone: CheckCircle2,
};

export const PracticeHome: React.FC = () => {
    const [topics, setTopics] = useState<TopicMetadata[]>([]);
    const [curriculum, setCurriculum] = useState<Curriculum | null>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        loadTopics().then(setTopics);
        loadCurriculum(ML_ID).then(setCurriculum).catch(() => setCurriculum(null));
    }, []);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroY = useTransform(heroP, [0, 1], [0, 120]);
    const heroOpacity = useTransform(heroP, [0, 0.6], [1, 0]);
    const cardY = useTransform(heroP, [0, 1], [0, 70]);

    const ml = topics.find(t => t.id === ML_ID) ?? topics[0];
    const totalQuestions = ml?.count ?? 31;
    const totalChapters = curriculum?.chapters.length ?? 16;

    const STATS: { value: number; suffix?: string; label: string; sub: string }[] = [
        { value: totalChapters, label: 'Chapters', sub: 'Foundations → Production' },
        { value: totalQuestions, suffix: '+', label: 'Practice Problems', sub: 'Basic · Medium · Hard' },
        { value: 8, label: 'Pipeline Stages', sub: 'health → … → report' },
        { value: 100, suffix: '%', label: 'Hands-On', sub: 'Real code, real data' },
    ];

    return (
        <HelmetProvider>
            <div className="relative overflow-x-hidden font-sans">
                <Helmet>
                    <title>Machine Learning Course | KaizenStat Academy</title>
                    <meta name="description" content="Learn and practice end-to-end machine learning with KaizenStat — from your first model to production-grade, trust-scored pipelines. 16 chapters, 31 problems." />
                </Helmet>

                {/* scroll progress bar */}
                <motion.div className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[200]"
                    style={{ scaleX, background: 'linear-gradient(90deg, #7c3aed, #06b6d4, #7c3aed)' }} />

                {/* deep background glows */}
                <div className="fixed inset-0 -z-20 pointer-events-none">
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 55% at 15% 20%, rgba(120,80,255,0.13) 0%, transparent 65%)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 45% at 85% 80%, rgba(30,200,180,0.09) 0%, transparent 65%)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 40% 40% at 50% 45%, rgba(60,60,120,0.06) 0%, transparent 70%)' }} />
                </div>

                {/* ═══════════════════ HERO ═══════════════════ */}
                <section ref={heroRef} className="relative min-h-[calc(100vh-80px)] flex items-center pt-8 md:pt-10 pb-16 px-6 md:px-12 lg:px-20 overflow-hidden">
                    <ParticleField />
                    <FloatingChip label="doctor.quick_train()" x="72%" y="20%" delay={0} />
                    <FloatingChip label="doctor.validate()" x="80%" y="62%" delay={1.4} />
                    <FloatingChip label="doctor.trust_score()" x="68%" y="40%" delay={0.8} />

                    <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center w-full relative z-10">
                        {/* headline */}
                        <motion.div className="lg:col-span-7 space-y-8" style={{ y: heroY, opacity: heroOpacity }}>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
                                <Badge><Sparkles className="w-3 h-3" /> KaizenStat Academy</Badge>
                            </motion.div>

                            <div className="font-serif text-5xl md:text-6xl lg:text-[5rem] text-lux-text leading-[1.02] overflow-hidden">
                                <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.18, ease: EASE }}>
                                    Learn ML the
                                </motion.div>
                                <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.28, ease: EASE }}
                                    className="text-zinc-400">
                                    KaizenStat Way.
                                </motion.div>
                                <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.38, ease: EASE }}
                                    className="italic font-light text-lux-muted">
                                    Ship real models.
                                </motion.div>
                            </div>

                            <motion.p className="text-sm md:text-base text-lux-muted leading-relaxed max-w-xl"
                                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.52, ease: EASE }}>
                                ML theory and the <span className="text-lux-text font-medium">KaizenStat</span> library taught together —
                                so every concept you learn maps directly to a real API call.
                                From <span className="font-mono text-purple-300 text-[13px]">DataDoctor</span> to a deployed,
                                trust-scored pipeline. No fake accuracy. No black boxes.
                            </motion.p>

                            <motion.div className="flex flex-col sm:flex-row gap-3"
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.64 }}>
                                <motion.div whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(120,80,255,0.35)' }} whileTap={{ scale: 0.97 }} className="rounded-full">
                                    <Link to={`/study/${ML_ID}`}
                                        className="group inline-flex items-center gap-3 px-8 py-4 bg-lux-text text-lux-cream font-semibold text-xs tracking-[0.15em] uppercase rounded-full">
                                        <BookOpen size={14} /> Start the Course
                                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                                    <Link to={`/practice/${ML_ID}`}
                                        className="inline-flex items-center gap-3 px-8 py-4 border border-lux-glassBorder bg-lux-glass text-lux-muted font-semibold text-xs tracking-[0.15em] uppercase hover:text-lux-text hover:border-lux-text/20 transition-colors rounded-full backdrop-blur-sm">
                                        <Sparkles size={14} /> Practice Problems
                                    </Link>
                                </motion.div>
                            </motion.div>

                            <motion.div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] text-lux-muted/60 uppercase tracking-widest font-mono"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}>
                                <span className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Beginner friendly</span>
                                <span className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Free &amp; self-paced</span>
                                <span className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Capstone project</span>
                            </motion.div>
                        </motion.div>

                        {/* hero right — live KaizenStat terminal */}
                        <motion.div className="lg:col-span-5 flex flex-col gap-3" style={{ y: cardY }}
                            initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.5, ease: EASE }}>
                            <LiveTerminal />
                            <motion.p
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                                className="text-center text-[11px] font-mono text-white/30">
                                This is the exact workflow you'll learn — and run yourself by chapter 2.
                            </motion.p>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════ STATS ═══════════════════ */}
                <section className="relative px-6 md:px-12 lg:px-20 pb-20">
                    <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {STATS.map((s, i) => (
                            <Reveal key={s.label} delay={i * 0.08}>
                                <MagneticCard intensity={8} className="group glass-bento rounded-3xl p-7 text-center h-full">
                                    <div className="font-serif text-5xl md:text-6xl text-lux-text leading-none tracking-tight mb-2">
                                        <Counter value={s.value} suffix={s.suffix} />
                                    </div>
                                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-lux-text/80">{s.label}</div>
                                    <div className="text-[10px] text-lux-muted mt-1 font-light">{s.sub}</div>
                                </MagneticCard>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* ═══════════════════ MAIN GRID ═══════════════════ */}
                <section className="relative px-6 md:px-12 lg:px-20 pb-20">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-start">

                        {/* LEFT */}
                        <div className="lg:col-span-8 space-y-10">

                            {/* featured course card */}
                            <Reveal>
                                <MagneticCard intensity={6} className="group glass-bento rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden">
                                    <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[90px] pointer-events-none"
                                        style={{ background: 'radial-gradient(circle, rgba(120,80,255,0.22), transparent 65%)' }} />
                                    <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-8">
                                        <div className="w-16 h-16 shrink-0 rounded-2xl bg-lux-glass border border-lux-glassBorder flex items-center justify-center shadow-lg p-3">
                                            <Logo className="w-full h-full text-purple-400" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3 flex-wrap">
                                                <h2 className="text-3xl md:text-4xl font-serif text-lux-text">ML with KaizenStat</h2>
                                                <span className="bg-purple-500/10 text-purple-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide border border-purple-500/20">
                                                    Flagship Course
                                                </span>
                                            </div>
                                            <p className="text-lux-muted text-sm md:text-base leading-relaxed mb-6 font-light max-w-2xl">
                                                The only ML course where every algorithm you study comes with a matching KaizenStat API call — so you learn the concept and the tool at the same time, chapter by chapter.
                                            </p>
                                            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
                                                {OUTCOMES.map(o => (
                                                    <div key={o} className="flex items-start gap-2.5 text-[13px] text-lux-muted">
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                                        <span>{o}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex flex-col sm:flex-row gap-3">
                                                <Link to={`/study/${ML_ID}`}
                                                    className="h-11 px-6 inline-flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest bg-lux-text text-lux-cream rounded-full hover:bg-black hover:text-lux-text transition-all shadow-md hover:scale-[1.02] active:scale-95">
                                                    View Course <ArrowRight className="w-4 h-4" />
                                                </Link>
                                                <Link to={`/practice/${ML_ID}`}
                                                    className="h-11 px-6 inline-flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest text-lux-text bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                                                    Solve {totalQuestions} Problems <Sparkles className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </MagneticCard>
                            </Reveal>

                            {/* curriculum */}
                            <div>
                                <Reveal>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="space-y-3">
                                            <Badge><Layers className="w-3 h-3" /> The Curriculum</Badge>
                                            <h3 className="font-serif text-3xl md:text-4xl text-lux-text leading-tight">
                                                <WordReveal text="Sixteen chapters," /> <span className="italic font-light text-lux-muted"><WordReveal text="zero fluff." delay={0.2} /></span>
                                            </h3>
                                        </div>
                                        <Link to={`/study/${ML_ID}`}
                                            className="hidden sm:inline-flex text-[11px] font-bold uppercase tracking-widest text-lux-muted hover:text-lux-text transition-colors items-center gap-1">
                                            All chapters <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                </Reveal>

                                <div className="grid sm:grid-cols-2 gap-3">
                                    {(curriculum?.chapters ?? []).map((ch, idx) => {
                                        const Icon: IconCmp = CHAPTER_ICONS[ch.id] ?? BookOpen;
                                        return (
                                            <Reveal key={ch.id} delay={Math.min(idx * 0.02, 0.3)} y={20}>
                                                <Link to={`/study/${ML_ID}/${ch.id}`}
                                                    className="group flex items-start gap-4 p-4 rounded-2xl glass-bento hover:-translate-y-0.5 transition-all duration-300 h-full">
                                                    <span className="text-[11px] font-mono font-bold text-lux-muted/50 mt-1 w-6 shrink-0">
                                                        {(idx + 1).toString().padStart(2, '0')}
                                                    </span>
                                                    <div className="w-9 h-9 shrink-0 rounded-xl bg-lux-glass border border-lux-glassBorder flex items-center justify-center text-lux-text group-hover:scale-110 group-hover:text-purple-300 transition-all">
                                                        <Icon className="w-4 h-4" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="text-sm font-semibold text-lux-text leading-tight mb-1 group-hover:text-white transition-colors">{ch.title}</h4>
                                                        <p className="text-[11px] text-lux-muted leading-snug font-light line-clamp-2">{ch.description}</p>
                                                    </div>
                                                    <ArrowRight className="w-4 h-4 text-lux-muted/0 group-hover:text-purple-300/70 transition-colors mt-1 shrink-0" />
                                                </Link>
                                            </Reveal>
                                        );
                                    })}
                                    {!curriculum && Array.from({ length: 6 }).map((_, i) => (
                                        <div key={i} className="h-20 rounded-2xl glass-bento animate-pulse" />
                                    ))}
                                </div>
                            </div>

                            {/* pillars */}
                            <div>
                                <Reveal>
                                    <div className="space-y-3 mb-6">
                                        <Badge><Sparkles className="w-3 h-3" /> Why Learn It Here</Badge>
                                        <h3 className="font-serif text-3xl md:text-4xl text-lux-text leading-tight">
                                            Built for <span className="italic font-light text-lux-muted">real models.</span>
                                        </h3>
                                    </div>
                                </Reveal>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {PILLARS.map((p, i) => (
                                        <Reveal key={p.title} delay={i * 0.06} y={24}>
                                            <MagneticCard intensity={8} className="group glass-bento rounded-2xl p-6 h-full relative overflow-hidden">
                                                <div className="absolute inset-0 pointer-events-none"
                                                    style={{ background: `radial-gradient(circle at 25% 20%, ${p.accent}, transparent 60%)` }} />
                                                <div className="relative z-10">
                                                    <div className="w-11 h-11 rounded-xl bg-lux-glass border border-lux-glassBorder flex items-center justify-center text-lux-text mb-4">
                                                        <p.icon className="w-5 h-5" />
                                                    </div>
                                                    <h4 className="text-base font-semibold text-lux-text mb-2">{p.title}</h4>
                                                    <p className="text-[12px] text-lux-muted leading-relaxed font-light">{p.body}</p>
                                                </div>
                                            </MagneticCard>
                                        </Reveal>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT sidebar */}
                        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                            <Reveal><ProblemOfTheDay /></Reveal>

                            <Reveal delay={0.1}>
                                <div className="glass-bento rounded-3xl p-6">
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-lux-muted mb-5 flex items-center gap-2">
                                        <BookOpen className="w-3 h-3" /> Your Path
                                    </div>
                                    <ol className="space-y-4">
                                        {[
                                            { n: '1', t: 'Learn', d: 'Read a chapter — theory + live KaizenStat code.' },
                                            { n: '2', t: 'Practice', d: 'Lock it in with interview-grade problems.' },
                                            { n: '3', t: 'Build', d: 'Ship the capstone churn model end-to-end.' },
                                        ].map((step, i, arr) => (
                                            <li key={step.n} className="flex gap-4 relative">
                                                {i < arr.length - 1 && <span className="absolute left-[15px] top-9 bottom-[-1rem] w-px bg-gradient-to-b from-purple-500/40 to-white/5" />}
                                                <span className="w-8 h-8 shrink-0 rounded-full bg-lux-text text-lux-cream flex items-center justify-center text-xs font-bold z-10">{step.n}</span>
                                                <div>
                                                    <div className="text-sm font-semibold text-lux-text">{step.t}</div>
                                                    <div className="text-[11px] text-lux-muted leading-snug font-light">{step.d}</div>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                    <Link to={`/study/${ML_ID}/intro`}
                                        className="mt-6 w-full h-10 inline-flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-lux-text text-lux-cream rounded-full hover:bg-black hover:text-lux-text transition-all">
                                        Begin Chapter 1 <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </Reveal>

                            <Reveal delay={0.2}>
                                <div className="glass-bento rounded-3xl p-6 relative overflow-hidden">
                                    <div className="absolute inset-0 pointer-events-none"
                                        style={{ background: 'radial-gradient(circle at 80% 0%, rgba(120,80,255,0.12), transparent 60%)' }} />
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 mb-2 text-lux-text">
                                            <Terminal className="w-4 h-4" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Powered by KaizenStat</span>
                                        </div>
                                        <p className="text-[12px] text-lux-muted leading-relaxed font-light mb-4">
                                            Every chapter teaches the real, open-source library that diagnoses data, auto-trains the best model, and scores it for production.
                                        </p>
                                        <code className="block text-[11px] font-mono text-purple-300 bg-black/40 border border-white/5 rounded-lg px-3 py-2">
                                            pip install kaizenstat
                                        </code>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════ FINAL CTA ═══════════════════ */}
                <section className="relative px-6 md:px-12 lg:px-20 pb-24">
                    <Reveal>
                        <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[2.5rem] glass-bento p-12 md:p-16 text-center">
                            <div className="absolute inset-0 pointer-events-none"
                                style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 0%, rgba(120,80,255,0.14), transparent 60%), radial-gradient(ellipse 50% 60% at 100% 100%, rgba(30,200,180,0.10), transparent 60%)' }} />
                            <div className="relative z-10">
                                <h3 className="font-serif text-4xl md:text-5xl text-lux-text mb-4 leading-tight">
                                    From curious to <span className="italic font-light text-lux-muted">shipping models.</span>
                                </h3>
                                <p className="text-lux-muted max-w-xl mx-auto text-sm leading-relaxed font-light mb-8">
                                    {totalChapters} chapters, {totalQuestions} problems, one real capstone — everything you need to learn machine learning the way it's actually practiced.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <motion.div whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(120,80,255,0.35)' }} whileTap={{ scale: 0.97 }} className="rounded-full">
                                        <Link to={`/study/${ML_ID}`}
                                            className="h-12 px-8 inline-flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest bg-lux-text text-lux-cream rounded-full">
                                            Start Learning Free <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </motion.div>
                                    <Link to={`/practice/${ML_ID}`}
                                        className="h-12 px-8 inline-flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest text-lux-text bg-lux-glass border border-lux-glassBorder rounded-full hover:text-black hover:bg-white transition-all backdrop-blur-sm">
                                        Jump to Practice <Sparkles className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </section>
            </div>
        </HelmetProvider>
    );
};
