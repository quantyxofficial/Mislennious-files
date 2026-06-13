import React, { useEffect, useRef, useState } from 'react';
import {
  motion, useScroll, useTransform, useInView, useSpring, useMotionValue,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Github, Linkedin, Mail, ArrowRight, ExternalLink,
  Cpu, Zap, Radio, Quote, CheckCircle, Package, Lock,
  Users, Globe, TrendingUp, BookOpen, Code2, Trophy,
} from 'lucide-react';
import { updateMetaTags, SEO_CONFIG } from '../../utils/seo';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// ─── Badge component ──────────────────────────────────────────────────────────
const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block py-1 px-3 border border-lux-text/10 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-lux-muted bg-lux-glass">
    {children}
  </span>
);

// ─── Reveal wrapper ───────────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, y = 40 }: { children: React.ReactNode; delay?: number; y?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-70px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
};

// ─── Word-by-word reveal ──────────────────────────────────────────────────────
const WordReveal = ({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <span ref={ref} className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}>
      {text.split(' ').map((word, i) => (
        <motion.span key={i} style={{ display: 'inline-block', overflow: 'hidden' }}>
          <motion.span style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.75, delay: delay + i * 0.06, ease: [0.16, 1, 0.3, 1] }}>
            {word}
          </motion.span>
        </motion.span>
      ))}
    </span>
  );
};

// ─── Animated counter ─────────────────────────────────────────────────────────
const Counter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started.current) return;
      started.current = true;
      const t0 = Date.now(), dur = 2200;
      const tick = () => {
        const p = Math.min((Date.now() - t0) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 4);
        setCount(Math.floor(ease * value));
        if (p < 1) requestAnimationFrame(tick); else setCount(value);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

// ─── Particle canvas ──────────────────────────────────────────────────────────
const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const count = 80;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120,200,255,${p.alpha})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(100,180,255,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
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

// ─── 3D Wireframe Sphere ─────────────────────────────────────────────────────
const WireSphere = () => {
  const { scrollYProgress } = useScroll();
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const rings = 7;
  const lines = 8;

  return (
    <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[480px] h-[480px] pointer-events-none opacity-20 hidden lg:block">
      <motion.div className="w-full h-full" style={{ rotateY, rotateX, transformPerspective: 900 }}>
        <svg viewBox="-120 -120 240 240" className="w-full h-full">
          {Array.from({ length: rings }).map((_, i) => {
            const lat = -90 + (180 / (rings + 1)) * (i + 1);
            const r = Math.cos((lat * Math.PI) / 180) * 100;
            const y = Math.sin((lat * Math.PI) / 180) * 100;
            return (
              <ellipse key={`h${i}`} cx={0} cy={y} rx={r} ry={r * 0.25}
                fill="none" stroke="rgba(34,211,238,0.6)" strokeWidth="0.6" />
            );
          })}
          {Array.from({ length: lines }).map((_, i) => {
            const lng = (360 / lines) * i;
            const rad = (lng * Math.PI) / 180;
            return (
              <ellipse key={`v${i}`} cx={0} cy={0}
                rx={Math.abs(Math.cos(rad)) * 100 || 10} ry={100}
                fill="none" stroke="rgba(34,211,238,0.4)" strokeWidth="0.5"
                transform={`rotate(${lng})`} />
            );
          })}
          <circle cx={0} cy={0} r={100} fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="0.8" />
        </svg>
      </motion.div>
    </div>
  );
};

// ─── Floating chips ───────────────────────────────────────────────────────────
const FloatingChip = ({ label, x, y, delay, depth = 1 }: { label: string; x: string; y: string; delay: number; depth?: number }) => (
  <motion.div
    className="absolute text-[10px] font-mono text-lux-muted/40 border border-lux-glassBorder/30 rounded-full px-3 py-1 bg-lux-glass/20 backdrop-blur-sm pointer-events-none select-none whitespace-nowrap hidden md:block"
    style={{ left: x, top: y, z: depth }}
    animate={{ y: ['0px', '-12px', '0px'], opacity: [0.3, 0.6, 0.3] }}
    transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}>
    {label}
  </motion.div>
);

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
    glowX.set(nx * 100);
    glowY.set(ny * 100);
  };

  return (
    <div ref={ref} style={{ perspective: 1000 }}
      onMouseMove={handleMove}
      onMouseLeave={() => { rotX.set(0); rotY.set(0); glowX.set(50); glowY.set(50); }}>
      <motion.div style={{ rotateX: springX, rotateY: springY }} className={`group relative ${className}`}>
        <motion.div className="absolute inset-0 rounded-[inherit] pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform([glowX, glowY], ([x, y]) =>
              `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`),
          }} />
        {children}
      </motion.div>
    </div>
  );
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const FOUNDERS = [
  {
    id: 'masuddar',
    name: 'Masuddar Rahaman',
    role: 'Founder · Framework Architect',
    bio: [
      'Masuddar built KaizenStat because he felt what every student feels: the tools were powerful, but nothing ever explained why.',
      'So he built one. Not for a grade, not for a job. For every person who ever stared at a broken model and felt like the problem was them.',
    ],
    image: 'https://github.com/Masuddar.png',
    color: { text: 'text-cyan-400', glow: 'rgba(34,211,238,0.18)', accent: 'from-cyan-400 to-blue-600', border: 'border-cyan-400/20' },
    links: {
      github: 'https://github.com/Masuddar',
      linkedin: 'https://www.linkedin.com/in/masuddar-rahaman/',
      mail: 'mailto:masuddar@kaizenstat.org',
    },
    expertise: ['Framework Design', 'ML Pipeline Architecture', 'Open Source Leadership'],
    quote: "If your model can't explain itself, neither can you.",
    icon: <Cpu className="w-4 h-4" />,
  },
  {
    id: 'kriti',
    name: 'Kriti Sharma',
    role: 'Co-founder · AI Research Lead',
    bio: [
      'AI Research and Management Lead who learns, builds, and leads alongside the team every step of the way.',
      'Kriti doesn\'t just study AI from the outside — she actively implements it, running experiments and managing KaizenStat\'s research roadmap.',
    ],
    image: 'https://i.postimg.cc/mZ9PZg1k/IMG-3848.avif',
    color: { text: 'text-purple-400', glow: 'rgba(192,38,211,0.18)', accent: 'from-purple-400 to-fuchsia-600', border: 'border-purple-400/20' },
    links: {
      github: 'https://github.com/kriti-sharma-ai',
      linkedin: 'https://www.linkedin.com/in/kriti-sharma-795116377/',
      mail: 'mailto:kriti@kaizenstat.org',
    },
    expertise: ['AI Market Research', 'Operations Management', 'Research Strategy'],
    quote: "Research without direction is just curiosity. Management turns it into momentum.",
    icon: <Zap className="w-4 h-4" />,
  },
  {
    id: 'abhishikta',
    name: 'Abhishikta Dutta',
    role: 'Co-founder · ML Engineer',
    bio: [
      'ML Engineer and Researcher working across KaizenStat\'s data and intelligence layer.',
      'Abhishikta combines hands-on engineering with a research mindset, translating research into production-ready tools.',
    ],
    image: 'https://github.com/abhishiktadutta.png',
    color: { text: 'text-emerald-400', glow: 'rgba(16,185,129,0.18)', accent: 'from-emerald-400 to-teal-600', border: 'border-emerald-400/20' },
    links: {
      github: 'https://github.com/abhishiktadutta',
      linkedin: 'https://www.linkedin.com/in/abhishikta-dutta1',
      mail: 'mailto:abhishikta@kaizenstat.org',
    },
    expertise: ['Python ML Pipelines', 'Model Engineering', 'Production Systems'],
    quote: "Good models are useless without good engineering around them.",
    icon: <Radio className="w-4 h-4" />,
  },
];

const STATS = [
  { value: 228, suffix: '+', label: 'Active Members', sub: '+230% growth MoM', icon: Users, color: 'text-cyan-400', accent: 'rgba(30,200,180,0.15)' },
  { value: 138, suffix: '+', label: 'Institutions', sub: 'IITs, NITs & global', icon: Globe, color: 'text-purple-400', accent: 'rgba(120,80,255,0.15)' },
  { value: 7500, suffix: '+', label: 'Platform Events', sub: 'Interactions tracked', icon: Zap, color: 'text-amber-400', accent: 'rgba(200,160,40,0.15)' },
  { value: 760, suffix: '', label: 'Tests Passing', sub: '100% coverage', icon: CheckCircle, color: 'text-emerald-400', accent: 'rgba(30,200,80,0.15)' },
];

const VALUES = [
  {
    icon: <Code2 className="w-5 h-5" />,
    title: 'Radical Transparency',
    desc: 'Every method documents what it does, what it changes, and why. No black boxes. No silent mutations.',
    color: 'text-cyan-400',
    glow: 'rgba(34,211,238,0.1)',
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: 'Continuous Improvement',
    desc: '改善 — the Japanese philosophy of kaizen is baked into every layer. Your model should always know its next move.',
    color: 'text-purple-400',
    glow: 'rgba(192,38,211,0.1)',
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: 'Built to Teach',
    desc: 'KaizenStat is as much a learning tool as a production one. Every diagnostic output is a lesson.',
    color: 'text-emerald-400',
    glow: 'rgba(16,185,129,0.1)',
  },
  {
    icon: <Trophy className="w-5 h-5" />,
    title: 'Student-Led, Production-Grade',
    desc: 'We are students today. But we build with the standards of teams shipping to millions of users.',
    color: 'text-amber-400',
    glow: 'rgba(245,158,11,0.1)',
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: 'Community First',
    desc: '228+ members, 138+ institutions. Open source is not a license — it\'s a commitment to the people who use it.',
    color: 'text-blue-400',
    glow: 'rgba(59,130,246,0.1)',
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: 'Trustworthy by Design',
    desc: '760 tests, 100% code coverage, deterministic pipelines. If it ships in KaizenStat, it ships tested.',
    color: 'text-slate-300',
    glow: 'rgba(148,163,184,0.1)',
  },
];

const MILESTONES: any[] = [];

const BADGES = [
  { icon: CheckCircle, label: '100% Test Coverage', detail: '760 tests · 3,127 statements', color: 'text-emerald-400' },
  { icon: Package,     label: 'Production on PyPI',  detail: 'pip install kaizenstat',       color: 'text-blue-400'    },
  { icon: Lock,        label: 'MIT License',          detail: 'Free forever, open source',   color: 'text-slate-400'   },
];

const ECOSYSTEM = [
  'Pandas', 'scikit-learn', 'XGBoost', 'LightGBM', 'Google Colab', 'Jupyter',
  'NVIDIA CUDA', 'Hugging Face', 'Polars', 'DuckDB', 'FastAPI', 'PyTorch',
];

// ─── Founder card ─────────────────────────────────────────────────────────────

function FounderCard({ founder, index }: { founder: typeof FOUNDERS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateY: index % 2 === 0 ? -8 : 8 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformPerspective: 1000 }}>
      <MagneticCard intensity={8} className={`rounded-3xl border bg-lux-glass backdrop-blur-sm overflow-hidden h-full border-lux-glassBorder transition-colors duration-500`}>

        {/* Glow ambient */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${founder.color.glow}, transparent)` }} />

        {/* Header strip */}
        <div className={`h-1 w-full bg-gradient-to-r ${founder.color.accent}`} />

        <div className="p-8 space-y-6">
          {/* Photo + name */}
          <div className="flex items-start gap-5">
            <div className="relative flex-shrink-0">
              <motion.div
                className={`absolute inset-0 rounded-2xl blur-md bg-gradient-to-br ${founder.color.accent}`}
                animate={{ opacity: [0.3, 0.55, 0.3] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.6 }} />
              <img src={founder.image} alt={founder.name}
                className="relative w-16 h-16 rounded-2xl object-cover object-top border border-lux-glassBorder" />
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-lux-muted/60 mb-1">{founder.role}</p>
              <h3 className="text-xl font-semibold text-lux-text leading-tight">{founder.name}</h3>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {founder.expertise.map(e => (
                  <span key={e} className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-lux-glassBorder ${founder.color.text} bg-lux-glass`}>{e}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            {founder.bio.map((p, i) => (
              <p key={i} className="text-sm text-lux-muted leading-relaxed font-light">{p}</p>
            ))}
          </div>

          {/* Quote */}
          <div className={`pl-4 border-l-2 border-lux-glassBorder`}>
            <div className="flex items-start gap-2">
              <Quote className={`w-3 h-3 mt-1 flex-shrink-0 ${founder.color.text}`} />
              <p className={`text-xs italic font-medium leading-relaxed ${founder.color.text}`}>
                "{founder.quote}"
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 pt-2 border-t border-lux-glassBorder">
            <a href={founder.links.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-lux-glass border border-lux-glassBorder text-lux-muted hover:text-lux-text hover:border-lux-text/20 transition-all text-[10px] font-bold uppercase tracking-wider">
              <Github className="w-3.5 h-3.5" />GitHub
            </a>
            <a href={founder.links.linkedin} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-lux-glass border border-lux-glassBorder text-lux-muted hover:text-lux-text hover:border-lux-text/20 transition-all text-[10px] font-bold uppercase tracking-wider">
              <Linkedin className="w-3.5 h-3.5" />LinkedIn
            </a>
            <a href={founder.links.mail}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-lux-glass border border-lux-glassBorder text-lux-muted hover:text-lux-text hover:border-lux-text/20 transition-all text-[10px] font-bold uppercase tracking-wider ml-auto">
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </MagneticCard>
    </motion.div>
  );
}

// ─── Timeline with traveling orb ──────────────────────────────────────────────

function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const dot = dotRef.current;
    const path = pathRef.current;
    if (!section || !dot || !path) return;
    const ctx = gsap.context(() => {
      gsap.to(dot, {
        motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: false },
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top 60%', end: 'bottom 40%', scrub: 2 },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative py-28 px-6 overflow-hidden border-t border-white/[0.05]">
      {/* Curved guide path */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 900" preserveAspectRatio="none">
        <defs>
          <linearGradient id="about-path-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(34,211,238,0)" />
            <stop offset="25%" stopColor="rgba(34,211,238,0.3)" />
            <stop offset="75%" stopColor="rgba(16,185,129,0.3)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0)" />
          </linearGradient>
        </defs>
        <path ref={pathRef} d="M 600 0 C 300 200, 900 350, 600 450 S 300 700, 600 900"
          fill="none" stroke="url(#about-path-grad)" strokeWidth="1.5" strokeDasharray="8 12" />
      </svg>

      {/* Traveling orb */}
      <div ref={dotRef} className="absolute z-20 pointer-events-none" style={{ width: 20, height: 20, top: 0, left: 0 }}>
        <div className="w-5 h-5 rounded-full bg-cyan-400 shadow-[0_0_30px_10px_rgba(34,211,238,0.5)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-20 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 bg-white/[0.02]">
              Journey
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-white">
              How we got here.
            </h2>
          </div>
        </Reveal>

        <div className="space-y-10">
          {MILESTONES.map((m, i) => (
            <motion.div key={m.year}
              initial={{ opacity: 0, x: m.side * 70, rotateY: m.side * 8 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 1000 }}
              className={`flex ${m.side === 1 ? 'justify-end' : 'justify-start'}`}>
              <MagneticCard intensity={6} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-7 max-w-md w-full overflow-hidden">
                <div className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(circle at top ${m.side === 1 ? 'right' : 'left'}, ${m.accent}, transparent 65%)` }} />
                <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">{m.year}</span>
                  <h3 className="text-lg font-bold text-white mt-1 mb-2">{m.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">{m.desc}</p>
                </div>
              </MagneticCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Ecosystem marquee ────────────────────────────────────────────────────────

function EcosystemMarquee() {
  const doubled = [...ECOSYSTEM, ...ECOSYSTEM];
  return (
    <div className="relative py-12 border-t border-lux-glassBorder overflow-hidden">
      <div className="absolute left-0 inset-y-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      <motion.div
        className="flex items-center gap-0 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, repeatType: 'loop', duration: 45, ease: 'linear' }}>
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="text-3xl md:text-5xl font-semibold tracking-tight px-8 text-lux-text/[0.12] hover:text-lux-text/50 transition-colors duration-300 cursor-default select-none">
              {item}
            </span>
            <span className="text-lux-text/10 text-2xl select-none">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export const About: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: globalProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.96]);
  const cardY = useTransform(heroProgress, [0, 1], [0, 80]);

  useEffect(() => {
    updateMetaTags({
      ...SEO_CONFIG.about,
      structuredData: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'AboutPage',
            '@id': 'https://www.kaizenstat.com/about#page',
            'name': 'About KaizenStat — Open Source Python ML Framework',
            'url': 'https://www.kaizenstat.com/about',
            'description': 'KaizenStat is an open-source Python machine learning framework founded in 2026 by Masuddar Rahaman, Kriti Sharma, and Abhishikta Dutta. It provides AutoML, data health scoring, pipeline debugging, NLP support, trust scoring, model deployment, and continuous improvement. pip install kaizenstat. Apache 2.0.',
            'mainEntity': { '@id': 'https://www.kaizenstat.com/#software' },
            'mentions': [
              { '@id': 'https://www.kaizenstat.com/masuddar-rahaman#person' },
              { '@id': 'https://www.kaizenstat.com/kriti-sharma#person' },
              { '@id': 'https://www.kaizenstat.com/abhishikta-dutta#person' },
            ],
          },
          {
            '@type': 'SoftwareApplication',
            '@id': 'https://www.kaizenstat.com/#software',
            'name': 'KaizenStat',
            'alternateName': ['kaizenstat', 'KaizenStat Python', 'KaizenStat ML Framework'],
            'description': 'KaizenStat is an open-source Python machine learning framework (v0.6.0) built by Masuddar Rahaman (Founder & Framework Architect), Kriti Sharma (AI Research Lead), and Abhishikta Dutta (ML Engineer). DataDoctor pipeline: Health → Validate → Fix → Train → Debug → Improve. pip install kaizenstat. Apache 2.0. Python 3.8+.',
            'url': 'https://www.kaizenstat.com',
            'downloadUrl': 'https://pypi.org/project/kaizenstat/',
            'codeRepository': 'https://github.com/kaizenstat-python/KaizenStat',
            'version': '0.6.0',
            'license': 'https://opensource.org/licenses/Apache-2.0',
            'applicationCategory': ['DeveloperApplication', 'DataAnalysisApplication'],
            'operatingSystem': ['Windows', 'macOS', 'Linux'],
            'programmingLanguage': ['Python'],
            'runtimePlatform': 'Python 3.8+',
            'isAccessibleForFree': true,
            'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD', 'availability': 'https://schema.org/InStock' },
            'featureList': [
              'AutoML with DataDoctor.quick_train()',
              'Data health scoring',
              'ML pipeline debugging',
              'Automated data fixing',
              'NLP support (TF-IDF, transformers)',
              'Trust scoring and explainability',
              'AI advisor (kaizenstat[intel])',
              'Model deployment utilities',
              'Apache 2.0 open source',
            ],
            'creator': [
              { '@id': 'https://www.kaizenstat.com/masuddar-rahaman#person' },
              { '@id': 'https://www.kaizenstat.com/kriti-sharma#person' },
              { '@id': 'https://www.kaizenstat.com/abhishikta-dutta#person' },
            ],
          },
          {
            '@type': 'Organization',
            '@id': 'https://www.kaizenstat.com/#organization',
            'name': 'KaizenStat',
            'url': 'https://www.kaizenstat.com',
            'logo': 'https://www.kaizenstat.com/logo.png',
            'description': 'Student-led open-source Python ML framework for AutoML, pipeline debugging, and continuous improvement. Founded 2026.',
            'foundingDate': '2024',
            'foundingLocation': 'India',
            'founder': [
              { '@id': 'https://www.kaizenstat.com/masuddar-rahaman#person' },
              { '@id': 'https://www.kaizenstat.com/kriti-sharma#person' },
              { '@id': 'https://www.kaizenstat.com/abhishikta-dutta#person' },
            ],
            'sameAs': [
              'https://github.com/kaizenstat-python/KaizenStat',
              'https://pypi.org/project/kaizenstat/',
            ],
          },
          {
            '@type': 'FAQPage',
            'mainEntity': [
              {
                '@type': 'Question',
                'name': 'What is KaizenStat?',
                'acceptedAnswer': { '@type': 'Answer', 'text': 'KaizenStat is an open-source Python machine learning framework (v0.6.0) for AutoML, data health scoring, pipeline debugging, and continuous improvement. pip install kaizenstat. Founded by Masuddar Rahaman, Kriti Sharma, and Abhishikta Dutta. Apache 2.0. Python 3.8+.' },
              },
              {
                '@type': 'Question',
                'name': 'Who founded KaizenStat?',
                'acceptedAnswer': { '@type': 'Answer', 'text': 'KaizenStat was founded in 2026 by Masuddar Rahaman (Founder and Framework Architect), Kriti Sharma (AI Research and Management Lead), and Abhishikta Dutta (ML Engineer and Researcher). Masuddar Rahaman built the framework from scratch. All three are co-founders.' },
              },
              {
                '@type': 'Question',
                'name': 'What is the KaizenStat philosophy?',
                'acceptedAnswer': { '@type': 'Answer', 'text': 'KaizenStat is built on the Japanese philosophy of Kaizen — continuous improvement. The DataDoctor pipeline embodies this: Health → Validate → Fix → Train → Debug → Improve. Every run of KaizenStat makes your ML pipeline a little better than it was yesterday.' },
              },
              {
                '@type': 'Question',
                'name': 'What specializations does KaizenStat offer?',
                'acceptedAnswer': { '@type': 'Answer', 'text': 'KaizenStat specializes in: AutoML (DataDoctor.quick_train()), data health scoring, ML pipeline debugging, automated data fixing, NLP (pip install kaizenstat[nlp]), trust scoring, model explainability, AI advisor (pip install kaizenstat[intel]), competitions, certifications, and open-source contribution programs.' },
              },
            ],
          },
          {
            '@type': 'BreadcrumbList',
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.kaizenstat.com' },
              { '@type': 'ListItem', 'position': 2, 'name': 'About KaizenStat', 'item': 'https://www.kaizenstat.com/about' },
            ],
          },
        ],
      },
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative overflow-x-hidden bg-black text-lux-text">

      {/* ── Progress bar ────────────────────────────────────────────────── */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[200]"
        style={{ scaleX: globalProgress, background: 'linear-gradient(90deg, #7c3aed, #06b6d4, #7c3aed)' }} />

      {/* ── Deep background ─────────────────────────────────────────────── */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 55% at 15% 25%, rgba(120,80,255,0.13) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 45% at 85% 75%, rgba(30,200,180,0.09) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 40% 40% at 50% 50%, rgba(60,60,120,0.06) 0%, transparent 70%)' }} />
      </div>

      <main className="relative z-10">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
          {/* Particle network */}
          <div className="absolute inset-0">
            <ParticleField />
          </div>

          {/* Depth chips */}
          <FloatingChip label="pip install kaizenstat" x="8%" y="24%" delay={0} />
          <FloatingChip label="health → validate → fix" x="74%" y="20%" delay={1.2} />
          <FloatingChip label="228+ members" x="12%" y="68%" delay={0.6} />
          <FloatingChip label="138+ institutions" x="76%" y="64%" delay={1.8} />
          <FloatingChip label="Apache 2.0" x="44%" y="14%" delay={2.4} />

          <motion.div style={{ y: heroY, opacity: heroOpacity, scale: heroScale }} className="text-center max-w-4xl mx-auto pt-32 pb-24 relative z-10">

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-lux-glassBorder bg-lux-glass text-[10px] font-mono uppercase tracking-[0.3em] text-lux-muted mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open Source · Student-Led · Apache 2.0
              </div>
            </motion.div>

            <div className="font-serif text-5xl md:text-6xl lg:text-[5.5rem] text-lux-text leading-[1.02] overflow-hidden mb-8">
              <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}>
                We built the
              </motion.div>
              <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="italic font-light text-lux-muted">
                tool we wished
              </motion.div>
              <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}>
                existed.
              </motion.div>
            </div>

            <motion.p className="text-sm text-lux-muted leading-relaxed max-w-lg mx-auto mb-10"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}>
              KaizenStat started because powerful ML tools existed — but none of them ever explained <em>why</em> something was wrong. So three students decided to build one that did.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.62 }}>
              <motion.a href="https://github.com/kaizenstat-python" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(120,80,255,0.35)' }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-lux-text text-black font-semibold text-xs tracking-[0.15em] uppercase rounded-full transition-shadow">
                <Github size={14} />Start Contributing
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link to="/docs"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-lux-glassBorder bg-lux-glass text-lux-muted font-semibold text-xs tracking-[0.15em] uppercase hover:text-lux-text hover:border-lux-text/20 transition-colors rounded-full backdrop-blur-sm">
                  Read the Docs <ArrowRight size={14} />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll cue */}
          <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          </motion.div>
        </section>

        {/* ── KAIZEN PHILOSOPHY ───────────────────────────────────────────── */}
        <section className="py-28 px-6 md:px-12 lg:px-24 border-t border-lux-glassBorder relative overflow-hidden">
          <WireSphere />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              <Reveal>
                <div className="space-y-6">
                  <Badge>The Philosophy</Badge>
                  <h2 className="font-serif text-4xl md:text-5xl text-lux-text leading-tight">
                    <span className="italic font-light text-lux-muted">改善</span><br />— kaizen.
                  </h2>
                  <div className="space-y-4 text-lux-muted text-sm leading-relaxed font-light">
                    <p>
                      <strong className="text-lux-text font-medium">Kaizen</strong> is the Japanese philosophy of continuous improvement — the belief that every system, every model, every process can be made a little better today than it was yesterday.
                    </p>
                    <p>
                      Most ML frameworks help you build models. KaizenStat helps you <strong className="text-lux-text font-medium">trust them</strong>. It scores your data before training. It flags what's broken and tells you why. It benchmarks multiple algorithms and picks the best one. It tells you whether your model is actually ready to ship.
                    </p>
                    <p>
                      The pipeline isn't just a workflow. It's a philosophy: <span className="text-lux-text">Health → Validate → Fix → Train → Debug → Improve.</span>
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Pipeline visual */}
              <Reveal delay={0.2}>
                <div className="space-y-2">
                  {[
                    { step: 'Health', desc: 'Score your data 0–100. Know what\'s broken before you touch a model.' },
                    { step: 'Validate', desc: 'Statistical assumption checks. Catch leakage before it ships.' },
                    { step: 'Fix', desc: 'Safe auto-repair: nulls, skew, imbalance, duplicates. Preview before applying.' },
                    { step: 'Train', desc: 'Benchmark 8+ algorithms. Bayesian tuning. Best model wins.' },
                    { step: 'Debug', desc: 'Failure-mode analysis. Bias detection. Feature impact ranking.' },
                    { step: 'Improve', desc: 'Ranked action list. Every suggestion comes with expected gain.' },
                  ].map((item, i) => (
                    <motion.div key={item.step}
                      initial={{ opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}>
                      <MagneticCard intensity={5} className="flex items-start gap-4 p-4 rounded-2xl bg-lux-glass border border-lux-glassBorder hover:border-lux-text/20 transition-colors">
                        <div className="flex flex-col items-center gap-1 flex-shrink-0 mt-0.5">
                          <span className="text-[9px] font-black uppercase tracking-widest text-lux-muted/40">{String(i + 1).padStart(2, '0')}</span>
                          {i < 5 && <div className="w-px h-3 bg-lux-glassBorder" />}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-lux-text mb-0.5">{item.step}</p>
                          <p className="text-xs text-lux-muted leading-relaxed font-light">{item.desc}</p>
                        </div>
                      </MagneticCard>
                    </motion.div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── ECOSYSTEM MARQUEE ───────────────────────────────────────────── */}
        <EcosystemMarquee />

        {/* ── STATS ───────────────────────────────────────────────────────── */}
        <section className="py-20 px-6 md:px-12 lg:px-24 border-t border-lux-glassBorder relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/[0.03] via-transparent to-cyan-500/[0.03] pointer-events-none" />
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-14 space-y-3">
                <Badge>By the Numbers</Badge>
                <h2 className="font-serif text-3xl md:text-4xl text-lux-text leading-tight">
                  A community that grows because it delivers.
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {STATS.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <Reveal key={stat.label} delay={i * 0.1}>
                    <MagneticCard intensity={8} className="p-6 rounded-2xl bg-lux-glass border border-lux-glassBorder hover:border-lux-text/20 transition-colors text-center space-y-2 overflow-hidden">
                      <div className="absolute inset-0 pointer-events-none rounded-2xl"
                        style={{ background: `radial-gradient(circle at top, ${stat.accent}, transparent 70%)` }} />
                      <div className="relative z-10 space-y-2">
                        <Icon className={`w-5 h-5 mx-auto ${stat.color}`} />
                        <div className="font-serif text-3xl md:text-4xl font-bold tracking-tighter text-lux-text">
                          <Counter value={stat.value} suffix={stat.suffix} />
                        </div>
                        <p className="text-xs font-semibold text-lux-text/70">{stat.label}</p>
                        <p className="text-[10px] text-lux-muted/60">{stat.sub}</p>
                      </div>
                    </MagneticCard>
                  </Reveal>
                );
              })}
            </div>

            {/* Production badges */}
            <Reveal delay={0.4}>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
                {BADGES.map(({ icon: Icon, label, detail, color }) => (
                  <div key={label} className="flex items-center gap-3 px-5 py-3 rounded-full bg-lux-glass border border-lux-glassBorder">
                    <Icon className={`w-4 h-4 ${color}`} />
                    <div>
                      <p className="text-xs font-semibold text-lux-text">{label}</p>
                      <p className="text-[10px] text-lux-muted">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── VALUES ──────────────────────────────────────────────────────── */}
        <section className="py-28 px-6 md:px-12 lg:px-24 border-t border-lux-glassBorder">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-16 space-y-3">
                <Badge>What We Stand For</Badge>
                <h2 className="font-serif text-4xl md:text-5xl text-lux-text leading-tight">
                  <span>Values we build by.</span><br />
                  <span className="italic font-light text-lux-muted">Every day.</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {VALUES.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.07}>
                  <MagneticCard intensity={10} className="p-6 rounded-2xl bg-lux-glass border border-lux-glassBorder hover:border-lux-text/20 transition-all duration-500 h-full overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none rounded-2xl"
                      style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${v.glow}, transparent)` }} />
                    <div className="relative z-10">
                      <div className={`${v.color} mb-4`}>{v.icon}</div>
                      <h3 className="text-sm font-bold text-lux-text mb-2">{v.title}</h3>
                      <p className="text-xs text-lux-muted leading-relaxed font-light">{v.desc}</p>
                    </div>
                  </MagneticCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>


        {/* ── FOUNDERS ────────────────────────────────────────────────────── */}
        <section className="py-28 px-6 md:px-12 lg:px-24 border-t border-lux-glassBorder">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-16 space-y-3">
                <Badge>The Team</Badge>
                <h2 className="font-serif text-4xl md:text-5xl text-lux-text leading-tight">
                  <span>Three people.</span><br />
                  <span className="italic font-light text-lux-muted">One obsession.</span>
                </h2>
                <p className="text-sm text-lux-muted font-light max-w-lg mx-auto leading-relaxed">
                  Masuddar, Kriti, and Abhishikta didn't wait to graduate. They started building. KaizenStat is what happens when students stop waiting for permission.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6">
              {FOUNDERS.map((f, i) => <FounderCard key={f.id} founder={f} index={i} />)}
            </div>

            <Reveal delay={0.3}>
              <div className="mt-8 text-center">
                <Link to="/founder-connect"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-lux-glassBorder bg-lux-glass text-lux-muted text-xs font-bold uppercase tracking-wider hover:border-lux-text/20 hover:text-lux-text transition-all">
                  Meet the founders in depth <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── COMMUNITY ───────────────────────────────────────────────────── */}
        <section className="py-28 px-6 md:px-12 lg:px-24 border-t border-lux-glassBorder">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              <Reveal>
                <div className="space-y-6">
                  <Badge>The Community</Badge>
                  <h2 className="font-serif text-4xl md:text-5xl text-lux-text leading-tight">
                    Built in the open.<br />
                    <span className="italic font-light text-lux-muted">Grown by students.</span>
                  </h2>
                  <p className="text-sm text-lux-muted font-light leading-relaxed">
                    KSoC — KaizenStat Summer of Computation — is where students from 138+ institutions contribute to real ML repositories. Not toy projects. Production pipelines. Real proof of work.
                  </p>
                  <ul className="space-y-3">
                    {[
                      '228+ active members from IITs, NITs, and global universities',
                      'Open source contributions count as portfolio work',
                      'Competitions, hackathons, and live events',
                      'Virtual member ID cards and certificates',
                      'Study materials, Colab notebooks, and guided learning paths',
                    ].map(item => (
                      <li key={item} className="flex items-start gap-3 text-xs text-lux-muted font-light">
                        <span className="w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link to="/contribute"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-lux-text text-black text-[10px] font-bold uppercase tracking-wider hover:bg-lux-text/90 transition-all">
                      Join KSoC <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link to="/careers"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-lux-glassBorder bg-lux-glass text-lux-muted text-[10px] font-bold uppercase tracking-wider hover:border-lux-text/20 hover:text-lux-text transition-all">
                      Careers
                    </Link>
                  </div>
                </div>
              </Reveal>

              {/* Community stat cards */}
              <Reveal delay={0.2}>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Active Members', value: '228+', sub: '+230% MoM growth', color: 'text-cyan-400', accent: 'rgba(30,200,180,0.12)' },
                    { label: 'Institutions', value: '138+', sub: 'IITs, NITs & global', color: 'text-purple-400', accent: 'rgba(120,80,255,0.12)' },
                    { label: 'Platform Events', value: '7.5K+', sub: 'Total interactions', color: 'text-emerald-400', accent: 'rgba(30,200,80,0.12)' },
                    { label: 'Open Source', value: 'MIT', sub: 'Free forever', color: 'text-amber-400', accent: 'rgba(200,160,40,0.12)' },
                  ].map((s, i) => (
                    <motion.div key={s.label}
                      initial={{ opacity: 0, scale: 0.92 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}>
                      <MagneticCard intensity={8} className="p-5 rounded-2xl bg-lux-glass border border-lux-glassBorder hover:border-lux-text/20 transition-colors overflow-hidden">
                        <div className="absolute inset-0 pointer-events-none rounded-2xl"
                          style={{ background: `radial-gradient(circle at top right, ${s.accent}, transparent 70%)` }} />
                        <div className="relative z-10">
                          <div className={`font-serif text-2xl font-bold tracking-tight ${s.color} mb-1`}>{s.value}</div>
                          <p className="text-xs font-semibold text-lux-text/70">{s.label}</p>
                          <p className="text-[10px] text-lux-muted/60 mt-0.5">{s.sub}</p>
                        </div>
                      </MagneticCard>
                    </motion.div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <section className="py-28 px-6 md:px-12 lg:px-24 border-t border-lux-glassBorder relative overflow-hidden">
          <div className="absolute inset-0">
            <ParticleField />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lux-text/[0.015] to-transparent pointer-events-none" />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <Reveal>
              <div className="space-y-8">
                <Badge>Start Here</Badge>
                <h2 className="font-serif text-5xl md:text-6xl lg:text-[5.5rem] text-lux-text leading-[1.02] overflow-hidden">
                  <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}>
                    Your model says
                  </motion.div>
                  <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="italic font-light text-lux-muted">
                    94% accuracy.
                  </motion.div>
                  <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}>
                    KaizenStat tells you if it's lying.
                  </motion.div>
                </h2>
                <motion.p className="text-sm text-lux-muted font-light max-w-lg mx-auto"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                  One pip install. The full pipeline: health check, validation, auto-fix, training, debugging, and a trust score before you ship.
                </motion.p>
                <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.62 }}>
                  <motion.a href="https://pypi.org/project/kaizenstat/" target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(120,80,255,0.35)' }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-8 py-4 rounded-full bg-lux-text text-black font-semibold text-xs tracking-[0.15em] uppercase transition-shadow">
                    pip install kaizenstat
                  </motion.a>
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Link to="/docs"
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-lux-glassBorder bg-lux-glass text-lux-muted font-semibold text-xs tracking-[0.15em] uppercase hover:text-lux-text hover:border-lux-text/20 transition-colors">
                      Read the Docs <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </section>

      </main>
    </div>
  );
};
