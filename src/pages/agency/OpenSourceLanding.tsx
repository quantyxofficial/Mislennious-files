import React, { useEffect, useRef, useState } from 'react';
import {
  motion, useScroll, useTransform, useSpring,
  useInView, useAnimationFrame, useMotionValue,
} from 'framer-motion';
import { Github as GithubIcon, ArrowRight, ExternalLink, Users, TrendingUp, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// ─── Counter ──────────────────────────────────────────────────────────────────
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
        setCount(value < 10 ? parseFloat((ease * value).toFixed(1)) : Math.floor(ease * value));
        if (p < 1) requestAnimationFrame(tick); else setCount(value);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);
  return <span ref={ref}>{value < 10 ? (count as number).toFixed(1) : (count as number).toLocaleString()}{suffix}</span>;
};

// ─── Badge ────────────────────────────────────────────────────────────────────
const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block py-1 px-3 border border-lux-text/10 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-lux-muted bg-lux-glass">
    {children}
  </span>
);

// ─── Word-by-word reveal ──────────────────────────────────────────────────────
const WordReveal = ({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <span ref={ref} className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}>
      {text.split(' ').map((word, i) => (
        <motion.span key={i} style={{ display: 'inline-block', overflow: 'hidden' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.75, delay: delay + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </motion.span>
      ))}
    </span>
  );
};

// ─── Scroll-reveal wrapper ────────────────────────────────────────────────────
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

// ─── Magnetic 3D tilt card ────────────────────────────────────────────────────
const MagneticCard = ({ children, className = '', intensity = 12 }: { children: React.ReactNode; className?: string; intensity?: number }) => {
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
      <motion.div style={{ rotateX: springX, rotateY: springY }} className={`relative ${className}`}>
        {/* Dynamic specular highlight */}
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
        ctx.fillStyle = `rgba(180,160,255,${p.alpha})`;
        ctx.fill();
      });
      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(140,120,255,${0.08 * (1 - dist / 120)})`;
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

// ─── 3D Wireframe Sphere (CSS/SVG) ───────────────────────────────────────────
const WireSphere = () => {
  const sphereRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const rings = 7;
  const lines = 8;

  return (
    <div ref={sphereRef} className="absolute right-[-8%] top-1/2 -translate-y-1/2 w-[480px] h-[480px] pointer-events-none opacity-20">
      <motion.div className="w-full h-full" style={{ rotateY, rotateX, transformPerspective: 900 }}>
        <svg viewBox="-120 -120 240 240" className="w-full h-full">
          {Array.from({ length: rings }).map((_, i) => {
            const lat = -90 + (180 / (rings + 1)) * (i + 1);
            const r = Math.cos((lat * Math.PI) / 180) * 100;
            const y = Math.sin((lat * Math.PI) / 180) * 100;
            return (
              <ellipse key={`h${i}`}
                cx={0} cy={y} rx={r} ry={r * 0.25}
                fill="none" stroke="rgba(168,85,247,0.6)" strokeWidth="0.6"
              />
            );
          })}
          {Array.from({ length: lines }).map((_, i) => {
            const lng = (360 / lines) * i;
            const rad = (lng * Math.PI) / 180;
            return (
              <ellipse key={`v${i}`}
                cx={0} cy={0}
                rx={Math.abs(Math.cos(rad)) * 100 || 10}
                ry={100}
                fill="none" stroke="rgba(168,85,247,0.4)" strokeWidth="0.5"
                transform={`rotate(${lng})`}
              />
            );
          })}
          <circle cx={0} cy={0} r={100} fill="none" stroke="rgba(168,85,247,0.3)" strokeWidth="0.8" />
        </svg>
      </motion.div>
    </div>
  );
};

// ─── Depth layer floating chips ───────────────────────────────────────────────
const FloatingChip = ({ label, x, y, delay, depth }: { label: string; x: string; y: string; delay: number; depth: number }) => (
  <motion.div
    className="absolute text-[10px] font-mono text-lux-muted/40 border border-lux-glassBorder/30 rounded-full px-3 py-1 bg-lux-glass/20 backdrop-blur-sm pointer-events-none select-none whitespace-nowrap"
    style={{ left: x, top: y, z: depth }}
    animate={{ y: ['0px', '-12px', '0px'], opacity: [0.3, 0.6, 0.3] }}
    transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  >
    {label}
  </motion.div>
);

// ─── Horizontal scroll hijack ─────────────────────────────────────────────────
const HorizontalScroll = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const totalScroll = track.scrollWidth - window.innerWidth;
    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalScroll, ease: 'none',
        scrollTrigger: {
          trigger: section, start: 'top top',
          end: () => `+=${totalScroll}`,
          scrub: 1.2, pin: true, anticipatePin: 1,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  const panels = [
    { label: 'Traffic', value: '84%', sub: 'Social & External', icon: <Globe className="w-7 h-7 text-purple-400" />, accent: 'rgba(120,80,255,0.18)' },
    { label: 'Active Users', value: '228+', sub: '+230% Growth', icon: <Users className="w-7 h-7 text-cyan-400" />, accent: 'rgba(30,200,180,0.18)' },
    { label: 'Events', value: '7,500+', sub: 'Platform interactions', icon: <Zap className="w-7 h-7 text-amber-400" />, accent: 'rgba(200,160,40,0.18)' },
    { label: 'Growth', value: '+230%', sub: 'Month over month', icon: <TrendingUp className="w-7 h-7 text-emerald-400" />, accent: 'rgba(30,200,80,0.18)' },
    { label: 'Institutes', value: '138+', sub: 'IITs, NITs & Global', icon: <Globe className="w-7 h-7 text-blue-400" />, accent: 'rgba(60,120,255,0.18)' },
  ];

  return (
    <div ref={sectionRef} className="relative overflow-hidden" style={{ height: '100vh' }}>
      <div className="absolute top-10 left-8 z-10 md:left-16 lg:left-24">
        <Badge>Program Analytics</Badge>
        <h2 className="font-serif text-3xl md:text-4xl text-lux-text mt-3 leading-tight">
          Scroll to explore <span className="italic font-light text-lux-muted">metrics →</span>
        </h2>
      </div>
      <div ref={trackRef} className="absolute top-0 left-0 flex h-full items-center gap-5 pl-8 md:pl-24 pr-24 pt-28"
        style={{ width: 'max-content' }}>
        {panels.map((p, i) => (
          <MagneticCard key={i} intensity={10}
            className="group w-[320px] md:w-[360px] h-[400px] flex-shrink-0 glass-bento rounded-3xl p-8 flex flex-col justify-between overflow-hidden cursor-default">
            <div className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at 30% 30%, ${p.accent}, transparent 60%)` }} />
            <div className="relative">
              <div className="mb-5 p-3 rounded-2xl bg-lux-glass border border-lux-glassBorder w-fit">{p.icon}</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-lux-muted mb-2">{p.label}</div>
              <div className="font-serif text-6xl md:text-7xl text-lux-text leading-none tracking-tight">{p.value}</div>
            </div>
            <div className="relative">
              <div className="w-full h-px bg-gradient-to-r from-lux-glassBorder to-transparent mb-4" />
              <p className="text-xs text-lux-muted leading-relaxed">{p.sub}</p>
            </div>
          </MagneticCard>
        ))}
      </div>
    </div>
  );
};

// ─── Curved path events ───────────────────────────────────────────────────────
const EventsSection = () => {
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
        motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true },
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top 60%', end: 'bottom 40%', scrub: 2 },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative py-28 overflow-hidden px-6 md:px-12 lg:px-24">
      {/* Visible guide path */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 700" preserveAspectRatio="none">
        <defs>
          <linearGradient id="path-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(120,80,255,0)" />
            <stop offset="30%" stopColor="rgba(120,80,255,0.25)" />
            <stop offset="70%" stopColor="rgba(30,200,180,0.25)" />
            <stop offset="100%" stopColor="rgba(30,200,180,0)" />
          </linearGradient>
        </defs>
        <path ref={pathRef} d="M 0 350 C 300 100, 600 600, 900 350 S 1200 100, 1200 350"
          fill="none" stroke="url(#path-grad)" strokeWidth="1.5" strokeDasharray="8 12" />
      </svg>

      {/* Traveling orb */}
      <div ref={dotRef} className="absolute z-20 pointer-events-none" style={{ width: 20, height: 20, top: 0, left: 0 }}>
        <div className="w-5 h-5 rounded-full bg-purple-500 shadow-[0_0_30px_10px_rgba(168,85,247,0.6)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <Reveal>
          <div className="mb-16 space-y-3">
            <Badge>Verified Reports</Badge>
            <h2 className="font-serif text-4xl md:text-5xl text-lux-text leading-tight">
              Events <span className="italic font-light text-lux-muted">Organized</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              name: 'Tech Blog Internship', platform: 'Unstop', date: 'May 2026',
              impressions: '1,706', applications: '182',
              breakdown: [['Primary', '1,100'], ['Secondary', '300'], ['Tertiary', '306']],
              accent: 'rgba(30,200,180,0.1)', side: -1,
            },
            {
              name: 'Logo Designing Competition', platform: 'Unstop', date: 'Oct 2025',
              impressions: '3,200', applications: '100+',
              breakdown: [['Primary', '2,100'], ['Secondary', '600'], ['Tertiary', '500']],
              accent: 'rgba(120,80,255,0.1)', side: 1,
            },
          ].map((ev, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: ev.side * 70, rotateY: ev.side * 10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 1000 }}>
              <MagneticCard intensity={8} className="group glass-bento rounded-2xl p-7 space-y-5 relative overflow-hidden h-full">
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top right, ${ev.accent}, transparent 65%)` }} />
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-lux-muted mb-1">{ev.platform} · {ev.date}</div>
                    <h3 className="font-serif text-2xl text-lux-text">{ev.name}</h3>
                  </div>
                  <ExternalLink size={14} className="text-lux-muted/30 mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[['Impressions', ev.impressions], ['Applications', ev.applications]].map(([l, v]) => (
                    <div key={l} className="bg-lux-glass border border-lux-glassBorder rounded-xl p-4">
                      <div className="text-[10px] text-lux-muted uppercase tracking-widest mb-1">{l}</div>
                      <div className="font-serif text-3xl text-lux-text">{v}</div>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-[10px] text-lux-muted uppercase tracking-widest mb-3">Impression Breakdown</div>
                  {ev.breakdown.map(([k, v]) => (
                    <div key={k} className="flex justify-between text-xs border-b border-lux-glassBorder pb-2 last:border-0">
                      <span className="text-lux-muted">{k}</span>
                      <span className="text-lux-text font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
              </MagneticCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Institutes ───────────────────────────────────────────────────────────────
const institutes = [
  'IIT Madras', 'IIT Patna', 'IIITDM Jabalpur', 'NIT Raipur', 'ISI Kolkata',
  'NIT Srinagar', 'DTU', 'NSUT', 'IGDTUW', 'Jamia Millia Islamia',
  'AMU', 'VIT', 'SRMIST', 'KIIT', 'Amrita Vishwa Vidyapeetham',
  'Bennett University', 'BML Munjal University', 'Symbiosis IT',
];

// ─── Main ─────────────────────────────────────────────────────────────────────
export const OpenSourceLanding: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroP, [0, 1], [0, 140]);
  const heroOpacity = useTransform(heroP, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroP, [0, 1], [1, 0.92]);
  const cardY = useTransform(heroP, [0, 1], [0, 80]);

  // Velocity skew
  const skewRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);
  const skew = useRef(0);
  useAnimationFrame(() => {
    const dy = window.scrollY - lastY.current;
    lastY.current = window.scrollY;
    skew.current += (Math.max(-22, Math.min(22, dy * 0.45)) - skew.current) * 0.08;
    if (skewRef.current) skewRef.current.style.transform = `skewY(${skew.current.toFixed(3)}deg)`;
  });

  return (
    <div className="relative overflow-x-hidden bg-black">

      {/* Progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[200]"
        style={{ scaleX, background: 'linear-gradient(90deg, #7c3aed, #06b6d4, #7c3aed)' }} />

      {/* Deep background */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 55% at 15% 25%, rgba(120,80,255,0.13) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 45% at 85% 75%, rgba(30,200,180,0.09) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 40% 40% at 50% 50%, rgba(60,60,120,0.06) 0%, transparent 70%)' }} />
      </div>

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-24 pb-16 px-6 md:px-12 lg:px-24 overflow-hidden">
        <ParticleField />
        <WireSphere />

        {/* Floating depth chips */}
        <FloatingChip label="ML Pipelines" x="72%" y="18%" delay={0} depth={1} />
        <FloatingChip label="Open Source" x="68%" y="72%" delay={1.5} depth={2} />
        <FloatingChip label="138+ Institutions" x="75%" y="45%" delay={0.8} depth={1} />

        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center w-full relative z-10">

          {/* Left: headline */}
          <motion.div className="lg:col-span-7 space-y-8" style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
              <Badge>Open Source Program</Badge>
            </motion.div>

            <div className="font-serif text-5xl md:text-6xl lg:text-[5.5rem] text-lux-text leading-[1.02] overflow-hidden">
              <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}>
                Kaizen Stat
              </motion.div>
              <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="italic font-light text-lux-muted">
                Summer of
              </motion.div>
              <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
                className="italic font-light text-lux-muted">
                Computation
              </motion.div>
            </div>

            <motion.p className="text-sm text-lux-muted leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}>
              Contribute to real data science. Work on production datasets, models, and pipelines
              alongside students from 138+ institutions worldwide. Build proof of work that companies actually value.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.62 }}>
              <motion.a href="https://github.com/Kaizenstat" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(120,80,255,0.35)' }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-lux-text text-lux-cream font-semibold text-xs tracking-[0.15em] uppercase rounded-full transition-shadow">
                <GithubIcon size={14} />Start Contributing
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link to="/events"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-lux-glassBorder bg-lux-glass text-lux-muted font-semibold text-xs tracking-[0.15em] uppercase hover:text-lux-text hover:border-lux-text/20 transition-colors rounded-full backdrop-blur-sm">
                  Explore Projects
                </Link>
              </motion.div>
            </motion.div>

            <motion.p className="text-[10px] text-lux-muted/40 uppercase tracking-widest font-mono"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              Built on real repositories · Verified through GitHub
            </motion.p>
          </motion.div>

          {/* Right: 3D stat card */}
          <motion.div className="lg:col-span-5" style={{ y: cardY }}
            initial={{ opacity: 0, y: 80, rotateX: 18 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}>
            <MagneticCard intensity={14} className="group glass-bento rounded-3xl p-8 space-y-6 relative overflow-hidden">
              <div className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 55%)' }} />
              {/* Animated border glow */}
              <motion.div className="absolute inset-0 rounded-3xl pointer-events-none"
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{ boxShadow: 'inset 0 0 0 1px rgba(120,80,255,0.3)' }} />

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-lux-muted">KSoC Impact</span>
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Live Program
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { v: 15000, s: '+', label: 'Global Reach', sub: 'Total Impressions' },
                  { v: 7500, s: '+', label: 'Platform Events', sub: 'Unstop + Website' },
                  { v: 228, s: '+', label: 'Active Users', sub: '+230% Growth' },
                  { v: 138, s: '+', label: 'Institutes', sub: 'IITs, NITs & more' },
                ].map((s, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, scale: 0.7, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.04 }}
                    className="bg-lux-glass border border-lux-glassBorder rounded-2xl p-4 cursor-default transition-all hover:border-purple-500/20 hover:bg-purple-500/5">
                    <div className="font-serif text-2xl text-lux-text mb-0.5"><Counter value={s.v} suffix={s.s} /></div>
                    <div className="text-xs font-semibold text-lux-text/80">{s.label}</div>
                    <div className="text-[10px] text-lux-muted mt-0.5">{s.sub}</div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-4 border-t border-lux-glassBorder space-y-2.5">
                <div className="text-[10px] text-lux-muted uppercase tracking-widest mb-3">Institute Tiers</div>
                {([['IIT / NIT / IIIT', 8], ['Private Colleges', 67], ['Government', 21], ['International', 1]] as [string, number][]).map(([label, pct], i) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="flex-1 h-1 bg-lux-glassBorder rounded-full overflow-hidden">
                      <motion.div className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, rgba(120,80,255,0.6), rgba(30,200,180,0.6))' }}
                        initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                        transition={{ duration: 1.4, delay: 1 + i * 0.14, ease: [0.16, 1, 0.3, 1] }} />
                    </div>
                    <span className="text-[10px] text-lux-muted w-32 truncate">{label}</span>
                    <span className="text-[10px] text-lux-text font-bold w-8 text-right">~{pct}%</span>
                  </div>
                ))}
              </div>
            </MagneticCard>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ FRAMEWORK SHOWCASE ═══════════════════ */}
      <section className="relative py-28 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(120,80,255,0.08) 0%, transparent 70%)' }} />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Features */}
            <Reveal>
              <div className="space-y-8">
                <div className="space-y-3">
                  <Badge>Next Generation Framework</Badge>
                  <h2 className="font-serif text-4xl md:text-5xl text-lux-text leading-tight">
                    Experience a <span className="italic font-light text-lux-muted">new-gen Python framework</span>
                  </h2>
                  <p className="text-sm text-lux-muted leading-relaxed">
                    KaizenStat brings continuous improvement to ML pipelines with production-ready tools built for real-world data science.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { title: 'Continuous Improvement', desc: 'Iterative refinement for optimal model performance' },
                    { title: 'Production Ready', desc: 'Built for enterprise-scale ML deployments' },
                    { title: 'Data Science Native', desc: 'Seamless integration with NumPy, Pandas, PyTorch' },
                    { title: 'Open Source', desc: 'Community-driven development on GitHub' },
                  ].map((item, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-start gap-4 group cursor-default">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400 mt-2 flex-shrink-0 group-hover:scale-150 transition-transform" />
                      <div>
                        <div className="text-sm font-bold text-lux-text group-hover:text-white transition-colors">{item.title}</div>
                        <div className="text-xs text-lux-muted mt-0.5">{item.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.a
                  href="https://pypi.org/project/kaizenstat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-lux-text text-lux-cream font-bold text-xs tracking-[0.15em] uppercase rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all">
                  Install via PyPI <ArrowRight size={14} />
                </motion.a>
              </div>
            </Reveal>

            {/* Right: Code/Visual */}
            <Reveal delay={0.15}>
              <MagneticCard intensity={10} className="group glass-bento rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 70% 30%, rgba(30,200,180,0.15), transparent 65%)' }} />
                
                <div className="relative space-y-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-lux-muted mb-4">Quick Start</div>
                  <div className="bg-black/30 rounded-2xl p-4 border border-lux-glassBorder font-mono text-[11px] text-cyan-400 space-y-2 overflow-x-auto">
                    <div><span className="text-purple-400">from</span> kaizenstat <span className="text-purple-400">import</span> Pipeline</div>
                    <div>&nbsp;</div>
                    <div><span className="text-purple-400">pipeline</span> = Pipeline()</div>
                    <div><span className="text-purple-400">pipeline</span>.load_data(data)</div>
                    <div><span className="text-purple-400">pipeline</span>.optimize_model()</div>
                    <div><span className="text-purple-400">pipeline</span>.evaluate()</div>
                    <div>&nbsp;</div>
                    <div><span className="text-emerald-400"># Continuous improvement enabled</span></div>
                  </div>

                  <div className="pt-4 border-t border-lux-glassBorder space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-xs text-lux-muted">Optimized for ML pipelines</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                      <span className="text-xs text-lux-muted">Built with modern Python standards</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-400" />
                      <span className="text-xs text-lux-muted">Actively maintained by KaizenStat</span>
                    </div>
                  </div>
                </div>
              </MagneticCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════ VELOCITY SKEW NUMBERS ═══════════════════ */}
      <section className="py-20 border-y border-lux-glassBorder overflow-hidden px-6 md:px-12 lg:px-24">
        <div ref={skewRef} style={{ willChange: 'transform' }}>
          <div className="max-w-6xl mx-auto flex gap-8 md:gap-16 xl:gap-24 flex-wrap justify-center items-center">
            {[
              { num: '15K+', label: 'Total Impressions' },
              { num: '228+', label: 'Active Members' },
              { num: '138+', label: 'Institutions' },
              { num: '2', label: 'Events Organized' },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="text-center group cursor-default">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  className="font-serif text-6xl md:text-8xl text-lux-text mb-1 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text"
                  style={{ WebkitBackgroundClip: 'text' } as React.CSSProperties}
                >
                  {item.num}
                </motion.div>
                <div className="text-[10px] text-lux-muted uppercase tracking-widest">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ HORIZONTAL SCROLL ═══════════════════ */}
      <HorizontalScroll />

      {/* ═══════════════════ EVENTS + CURVED PATH ═══════════════════ */}
      <EventsSection />

      {/* ═══════════════════ INSTITUTES MARQUEE ═══════════════════ */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
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
          </Reveal>

          <div className="relative overflow-hidden py-2">
            <div className="flex gap-3 mb-3" style={{ animation: 'ksoc-fwd 35s linear infinite', width: 'max-content' }}>
              {[...institutes, ...institutes].map((n, i) => (
                <span key={i} className="flex-shrink-0 px-4 py-2 rounded-full border border-lux-glassBorder bg-lux-glass text-lux-muted text-xs font-medium whitespace-nowrap hover:border-purple-500/30 hover:text-lux-text transition-colors cursor-default">{n}</span>
              ))}
            </div>
            <div className="flex gap-3" style={{ animation: 'ksoc-rev 28s linear infinite', width: 'max-content' }}>
              {[...institutes.slice().reverse(), ...institutes.slice().reverse()].map((n, i) => (
                <span key={i} className="flex-shrink-0 px-4 py-2 rounded-full border border-lux-glassBorder/30 bg-lux-glass/30 text-lux-muted/40 text-xs font-medium whitespace-nowrap">{n}</span>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-black to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-black to-transparent pointer-events-none" />
          </div>

          <Reveal delay={0.1}>
            <p className="text-[10px] text-lux-muted/30 font-mono mt-5 text-center">
              * Individual student interest. Does not imply official institutional partnership.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="pb-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.86, y: 80 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl p-12 md:p-24 text-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(20,10,40,0.95) 0%, rgba(10,20,30,0.95) 100%)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            {/* Multi-layer glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(120,80,255,0.18) 0%, transparent 60%)' }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(30,200,180,0.12) 0%, transparent 60%)' }} />
            <motion.div className="absolute inset-0 rounded-3xl pointer-events-none"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ boxShadow: 'inset 0 0 80px rgba(120,80,255,0.08)' }} />

            {/* Particle canvas inside CTA */}
            <div className="absolute inset-0 opacity-40"><ParticleField /></div>

            <div className="relative z-10">
              <div className="mb-6"><Badge>KSoC Program</Badge></div>
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-lux-text mb-6 leading-[1.05]">
                <WordReveal text="The future is" delay={0.1} />
                <br />
                <WordReveal text="open." className="italic font-light text-lux-muted" delay={0.25} />
              </h2>
              <motion.p className="text-sm text-lux-muted max-w-md mx-auto mb-12 leading-relaxed"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.7 }}>
                Join 228+ students already contributing to real ML repositories from 138+ institutions worldwide.
              </motion.p>
              <motion.a href="https://github.com/Kaizenstat" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.07, boxShadow: '0 0 50px rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex items-center gap-3 px-12 py-5 bg-lux-text text-lux-cream font-semibold text-xs tracking-[0.15em] uppercase rounded-full transition-all">
                <GithubIcon size={14} />Start Your First Mission
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @keyframes ksoc-fwd { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes ksoc-rev { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  );
};
