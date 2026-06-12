import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'motion/react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/sections/Navbar';
import { Footer } from '../components/sections/Footer';
import { Quote, Cpu, Zap, Radio } from 'lucide-react';
import { updateMetaTags, SEO_CONFIG } from '../utils/seo';

const FOUNDERS = [
  {
    id: 'masuddar',
    name: 'Masuddar Rahaman',
    role: 'Founder • Lead Architect',
    bio: 'Founder and lead architect of KaizenStat. Masuddar built the community from the ground up — from the Python framework to the learning ecosystem — with a mission to make ML infrastructure accessible to every student.',
    image: 'https://i.postimg.cc/02cvHZ2Y/IMG-4853.avif',
    colors: {
      primary: 'cyan',
      accent: 'from-cyan-400 to-blue-600',
      text: 'text-cyan-400',
      glow: 'rgba(34, 211, 238, 0.2)',
      secondary: 'blue'
    },
    links: {
      github: 'https://github.com/Masuddar',
      linkedin: 'https://www.linkedin.com/in/masuddar-rahaman/',
      mail: 'mailto:masuddar@kaizenstat.org'
    },
    pageNo: '01',
    expertise: ['System Architecture', 'Core Infrastructure', 'Strategic Intelligence'],
    quote: "Engineering is the art of organizing chaos into intelligence.",
    icon: <Cpu className="w-4 h-4" />
  },
  {
    id: 'kriti',
    name: 'Kriti Sharma',
    role: 'AI Research Lead',
    bio: 'AI Research Lead driving KaizenStat\'s learning curriculum and open-source contributions. Kriti shapes how students engage with deep learning and predictive modeling through hands-on community challenges.',
    image: 'https://i.postimg.cc/mZ9PZg1k/IMG-3848.avif',
    colors: {
      primary: 'purple',
      accent: 'from-purple-400 to-fuchsia-600',
      text: 'text-purple-400',
      glow: 'rgba(192, 38, 211, 0.2)',
      secondary: 'fuchsia'
    },
    links: {
      github: 'https://github.com/kriti-sharma-ai',
      linkedin: 'https://www.linkedin.com/in/kriti-sharma-795116377/',
      mail: 'mailto:kriti@kaizenstat.org'
    },
    pageNo: '02',
    expertise: ['Neural Dynamics', 'Predictive Modeling', 'Ethics in AI'],
    quote: "Intelligence is not just about speed, it's about the precision of vision.",
    icon: <Zap className="w-4 h-4" />
  },
  {
    id: 'abhishikta',
    name: 'Abhishikta Dutta',
    role: 'ML Engineer & Researcher',
    bio: 'ML Engineer & Researcher working across KaizenStat\'s data and intelligence layer — from building Python-based pipelines and models to translating research into production-ready tools. Abhishikta combines hands-on engineering with a research mindset, turning raw data into systems that learn, adapt, and scale.',
    image: 'https://github.com/abhishiktadutta.png',
    colors: {
      primary: 'emerald',
      accent: 'from-emerald-400 to-teal-600',
      text: 'text-emerald-400',
      glow: 'rgba(16, 185, 129, 0.2)',
      secondary: 'teal'
    },
    links: {
      github: 'https://github.com/abhishiktadutta',
      linkedin: 'https://www.linkedin.com/in/abhishikta-dutta1',
      mail: 'mailto:abhishikta@kaizenstat.org'
    },
    pageNo: '03',
    expertise: ['Python ML Pipelines', 'Model Engineering', 'Production Systems'],
    quote: "Good models are useless without good engineering around them.",
    icon: <Radio className="w-4 h-4" />
  }
];

export default function FounderConnect() {
  useEffect(() => {
    updateMetaTags({
      ...SEO_CONFIG.team,
      ogImage: 'https://www.kaizenstat.com/logo.png',
      canonical: 'https://www.kaizenstat.com/founder-connect',
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#020617] text-white selection:bg-cyan-500/30 overflow-x-hidden font-sans antialiased">
      <Navbar />

      {/* Performance Optimized Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
        <div className="absolute inset-0 noise-bg opacity-[0.05]" />
        
        {/* Simplified Static Glows (Lower Performance Cost) */}
        <div className="absolute -top-1/4 -left-1/4 w-full h-full bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Spacer for fixed navbar (~80px tall) */}
      <div className="h-20" />

      <main className="relative z-20">
        <div className="flex flex-col">
          {FOUNDERS.map((founder, i) => (
            <EditorialSpread key={founder.id} founder={founder} index={i} />
          ))}
        </div>        {/* Starry Night Zen Conclusion - Dedicated to Kaizen */}
        <section className="min-h-[70vh] flex flex-col justify-center items-center px-4 relative bg-[#020617] overflow-hidden py-32">
          {/* Celestial Japanese Background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
             {/* Star Field */}
             <div className="absolute inset-0 opacity-40">
                {[...Array(80)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute bg-white rounded-full"
                    style={{
                      width: Math.random() * 2 + 'px',
                      height: Math.random() * 2 + 'px',
                      top: Math.random() * 100 + '%',
                      left: Math.random() * 100 + '%',
                      animation: `twinkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 5}s`
                    }}
                  />
                ))}
             </div>

             {/* Shooting Stars */}
             <div className="absolute inset-0">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: "-100%", y: "20%", opacity: 0 }}
                    animate={{ 
                      x: ["0%", "200%"], 
                      y: ["20%", "80%"],
                      opacity: [0, 1, 0] 
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      repeatDelay: Math.random() * 10 + 5,
                      ease: "linear",
                      delay: i * 4
                    }}
                    className="absolute w-40 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent -rotate-[35deg]"
                  />
                ))}
             </div>

             {/* Japanese Temple Silhouette - White to Black Diagonal */}
             <div className="absolute bottom-0 left-0 w-full flex justify-center items-end">
                <svg viewBox="0 0 1000 520" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-64">
                  <defs>
                    <linearGradient id="templeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.45)"/>
                      <stop offset="50%" stopColor="rgba(180,190,210,0.25)"/>
                      <stop offset="100%" stopColor="rgba(10,12,20,0.9)"/>
                    </linearGradient>
                  </defs>
                  <g fill="url(#templeGradient)">
                    {/* === Spire / Finial at top === */}
                    <rect x="493" y="0" width="14" height="40" rx="2"/>
                    <rect x="484" y="38" width="32" height="8" rx="1"/>

                    {/* === TIER 3 (Top) Roof === */}
                    <path d="M390 46 Q500 80 610 46 L600 90 Q500 110 400 90 Z"/>
                    <path d="M390 46 Q350 38 330 52 L340 80 Q380 68 400 90 Z"/>
                    <path d="M610 46 Q650 38 670 52 L660 80 Q620 68 600 90 Z"/>
                    <rect x="430" y="90" width="140" height="60" rx="2"/>
                    {/* Tier 3 window grille */}
                    <rect x="442" y="98" width="116" height="44" fill="rgba(0,0,0,0.4)" rx="1"/>
                    <rect x="454" y="98" width="4" height="44" fill="url(#templeGradient)"/>
                    <rect x="466" y="98" width="4" height="44" fill="url(#templeGradient)"/>
                    <rect x="478" y="98" width="4" height="44" fill="url(#templeGradient)"/>
                    <rect x="490" y="98" width="4" height="44" fill="url(#templeGradient)"/>
                    <rect x="502" y="98" width="4" height="44" fill="url(#templeGradient)"/>
                    <rect x="514" y="98" width="4" height="44" fill="url(#templeGradient)"/>
                    <rect x="526" y="98" width="4" height="44" fill="url(#templeGradient)"/>
                    <rect x="538" y="98" width="4" height="44" fill="url(#templeGradient)"/>
                    <rect x="442" y="116" width="116" height="4"/>
                    
                    {/* === TIER 2 (Middle) Roof === */}
                    <path d="M330 150 Q500 195 670 150 L655 200 Q500 230 345 200 Z"/>
                    <path d="M330 150 Q280 138 250 158 L265 195 Q310 180 345 200 Z"/>
                    <path d="M670 150 Q720 138 750 158 L735 195 Q690 180 655 200 Z"/>
                    <rect x="360" y="148" width="12" height="16" rx="2"/>
                    <rect x="628" y="148" width="12" height="16" rx="2"/>
                    <rect x="340" y="200" width="320" height="80" rx="2"/>
                    <rect x="360" y="200" width="10" height="80"/>
                    <rect x="390" y="200" width="10" height="80"/>
                    <rect x="600" y="200" width="10" height="80"/>
                    <rect x="630" y="200" width="10" height="80"/>

                    {/* === TIER 1 (Ground) Roof === */}
                    <path d="M230 280 Q500 335 770 280 L750 340 Q500 380 250 340 Z"/>
                    <path d="M230 280 Q170 264 140 285 L158 335 Q215 315 250 340 Z"/>
                    <path d="M770 280 Q830 264 860 285 L842 335 Q785 315 750 340 Z"/>
                    <rect x="258" y="278" width="14" height="20" rx="2"/>
                    <rect x="728" y="278" width="14" height="20" rx="2"/>

                    {/* === Ground Floor Body === */}
                    <rect x="240" y="340" width="520" height="120" rx="2"/>
                    <rect x="270" y="340" width="18" height="120"/>
                    <rect x="330" y="340" width="18" height="120"/>
                    <rect x="652" y="340" width="18" height="120"/>
                    <rect x="712" y="340" width="18" height="120"/>
                    <rect x="420" y="370" width="80" height="90" fill="rgba(0,0,0,0.6)" rx="2"/>
                    <rect x="500" y="370" width="80" height="90" fill="rgba(0,0,0,0.6)" rx="2"/>
                    <rect x="350" y="380" width="50" height="60" fill="rgba(0,0,0,0.5)" rx="1"/>
                    <rect x="363" y="380" width="12" height="60" fill="url(#templeGradient)"/>
                    <rect x="600" y="380" width="50" height="60" fill="rgba(0,0,0,0.5)" rx="1"/>
                    <rect x="613" y="380" width="12" height="60" fill="url(#templeGradient)"/>

                    {/* === Stepped Base Platform === */}
                    <rect x="200" y="460" width="600" height="24" rx="1"/>
                    <rect x="160" y="484" width="680" height="18" rx="1"/>
                    <rect x="120" y="502" width="760" height="18" rx="1"/>
                  </g>
                </svg>
             </div>

             {/* Ground fade */}
             <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020617] to-transparent" />
          </div>

          {/* Background Calligraphy - KAIZEN - Optimized for Visibility */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] select-none pointer-events-none z-0">
             <span className="text-[30vw] font-black leading-none drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]" style={{ writingMode: 'vertical-rl' }}>改善</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="max-w-4xl w-full relative z-10 text-center"
          >
            {/* Dedication Header */}
            <div className="mb-16 flex flex-col items-center gap-2 opacity-60">
               <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white shadow-sm">改善の哲学に捧ぐ</span>
               <span className="text-[8px] font-mono tracking-[0.2em] uppercase text-white/50">Dedicated to the Philosophy of Kaizen</span>
            </div>

            {/* Japanese Manifesto with English Subtext - Optimized for visibility */}
            <div className="relative mb-24 group">
               {/* Atmospheric Backlighting for Low Brightness */}
               <div className="absolute inset-0 bg-cyan-500/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
               
               <p className="text-xl md:text-3xl font-light text-white leading-loose tracking-[0.15em] mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] relative z-10">
                 「継続的な改善は目的地ではなく、技術的な卓越性への道である。」
               </p>
               <p className="text-[10px] md:text-xs font-mono text-white/40 uppercase tracking-[0.3em] drop-shadow-md relative z-10">
                 "Continuous improvement is not a destination, but the path to technical excellence."
               </p>
            </div>

            {/* Vertical Bilingual Actions - High Contrast */}
            <div className="flex justify-center gap-32 items-start h-40">
               <a href="mailto:hello@kaizenstat.org" className="group relative pt-6 flex flex-col items-center">
                  <span className="text-base font-light tracking-[0.4em] text-white group-hover:text-cyan-400 transition-all duration-700 mb-4 drop-shadow-lg" style={{ writingMode: 'vertical-rl' }}>提携する</span>
                  <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-white/40 group-hover:text-white transition-colors">Collaborate</span>
                  <div className="absolute top-0 right-1/2 translate-x-1/2 w-px h-0 bg-cyan-500 group-hover:h-24 transition-all duration-1000 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
               </a>

               <Link to="/" className="group relative pt-6 flex flex-col items-center">
                  <span className="text-base font-light tracking-[0.4em] text-white/80 group-hover:text-white transition-all duration-700 mb-4 drop-shadow-lg" style={{ writingMode: 'vertical-rl' }}>エコシステム</span>
                  <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-white/40 group-hover:text-white transition-colors">Ecosystem</span>
                  <div className="absolute top-0 right-1/2 translate-x-1/2 w-px h-0 bg-white/40 group-hover:h-24 transition-all duration-1000 shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
               </Link>
            </div>

            {/* Minimalist Footer */}
            <div className="mt-24 opacity-10 flex items-center justify-center gap-6">
               <span className="text-[10px] font-light tracking-[0.8em] uppercase whitespace-nowrap">Student-Led · Open Source</span>
               <div className="w-12 h-px bg-white" />
               <span className="text-[10px] font-light tracking-[0.8em] uppercase whitespace-nowrap">KaizenStat</span>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function EditorialSpread({ founder, index }: { founder: typeof FOUNDERS[0], index: number }) {
  const isEven = index % 2 === 0;
  const spreadRef = useRef(null);
  const isInView = useInView(spreadRef, { margin: "-5%", once: true });

  const { scrollYProgress } = useScroll({
    target: spreadRef,
    offset: ["start end", "end start"]
  });

  // Balanced Spring for smooth but lightweight motion
  const springScroll = useSpring(scrollYProgress, { stiffness: 60, damping: 25, mass: 0.5 });

  const imageY = useTransform(springScroll, [0, 1], [-60, 60]);
  const contentY = useTransform(springScroll, [0, 1], [30, -30]);
  const bgTextY = useTransform(springScroll, [0, 1], [80, -80]);

  return (
    <section
      id={founder.id}
      ref={spreadRef}
      className="min-h-screen flex items-center relative overflow-hidden py-24 md:py-16 will-change-transform"
    >
      {/* Optimized Background Aura (Reduced Blur) */}
      <div className={`absolute ${isEven ? 'right-0' : 'left-0'} top-1/4 w-[500px] h-[500px] blur-[100px] rounded-full opacity-15 pointer-events-none`} 
           style={{ background: `radial-gradient(circle, ${founder.colors.glow}, transparent)` }} />

      {/* Background Text - Optimized for Visibility */}
      <div className={`absolute top-1/2 -translate-y-1/2 ${isEven ? 'right-0' : 'left-0'} w-full pointer-events-none select-none z-0 overflow-hidden`}>
        <motion.span 
          style={{ y: bgTextY }}
          className="text-[20vw] font-black text-white/[0.05] leading-none block whitespace-nowrap uppercase italic tracking-tighter will-change-transform drop-shadow-[0_0_20px_rgba(255,255,255,0.05)]"
        >
          {founder.name.split(' ')[1]}
        </motion.span>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-24`}>
          
          {/* Visual Component */}
          <div className="flex-1 relative w-full lg:max-w-md group will-change-transform">
            {/* Vertical Name Overlay - Balanced Opacity */}
            <div className={`absolute ${isEven ? '-left-12 lg:-left-20' : '-right-12 lg:-right-20'} top-1/2 -translate-y-1/2 z-30 pointer-events-none`}>
              <motion.h3 
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`text-7xl lg:text-9xl font-black tracking-tighter uppercase whitespace-nowrap opacity-25 ${founder.colors.text} will-change-transform`}
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                {founder.name}
              </motion.h3>
            </div>

            <motion.div 
              style={{ y: imageY }}
              className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-slate-950 border border-white/10 shadow-2xl shadow-black/50 will-change-transform"
            >
              <img 
                src={founder.image} 
                alt={founder.name} 
                loading="lazy"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1s] contrast-110 brightness-95" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
            </motion.div>

            {/* Protocol Detail Badge */}
            <div className={`absolute ${isEven ? '-bottom-6 -left-6' : '-bottom-6 -right-6'} z-30 p-4 rounded-xl bg-black/90 backdrop-blur-2xl border border-white/10 flex items-center gap-4 shadow-2xl`}>
               <div className={`p-2 rounded-lg bg-gradient-to-br ${founder.colors.accent}`}>
                  {founder.icon}
               </div>
               <div className="flex flex-col text-left">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Protocol</span>
                  <span className="text-[11px] font-bold text-white tracking-widest">{founder.pageNo} / 03</span>
               </div>
            </div>
          </div>

          {/* Editorial Content */}
          <motion.div 
            style={{ y: contentY }}
            className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left will-change-transform"
          >
            <div className="mb-10">
              <div className="flex items-center justify-center lg:justify-start gap-5 mb-6">
                <div className={`w-3 h-3 rounded-full blur-[3px] bg-gradient-to-br ${founder.colors.accent} opacity-60`} />
                <span className={`text-[11px] font-black uppercase tracking-[1em] ${founder.colors.text}`}>
                  KaizenStat Team
                </span>
              </div>
              
              <div className="mb-8 text-left">
                <span className="text-xl font-black text-white/20 uppercase tracking-[0.4em] block mb-3 italic">{founder.name}</span>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-white leading-[0.9]">
                  {founder.role.split('•')[1] || founder.role}
                </h2>
              </div>
              
              <p className="text-base md:text-xl font-light text-slate-300 max-w-md leading-relaxed mb-10">
                {founder.bio}
              </p>
            </div>

            {/* Premium Quote Spread */}
            <div className="relative pl-10 py-4 mb-12 border-l border-white/20 group/quote text-left will-change-transform">
               <Quote className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-white/5" />
               <p className="text-xl md:text-3xl font-serif italic text-white/95 leading-snug mb-6">
                 "{founder.quote}"
               </p>
               <div className="flex items-center gap-4">
                  <div className={`w-10 h-px bg-gradient-to-r ${founder.colors.accent} opacity-40`} />
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Founder Statement</span>
               </div>
            </div>

            {/* Matrix Links */}
            <div className="flex items-center gap-12 pt-12 border-t border-white/10 w-full justify-center lg:justify-start">
               {[
                 { label: 'LinkedIn', value: 'Connect', link: founder.links.linkedin, color: '#0ea5e9' },
                 { label: 'GitHub', value: 'Source', link: founder.links.github, color: '#f8fafc' },
                 { label: 'Direct', value: 'Email', link: founder.links.mail, color: '#10b981' }
               ].map(social => (
                 <a key={social.label} href={social.link} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-1.5 text-left transition-opacity hover:opacity-80">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">{social.value}</span>
                    <div className="flex items-center gap-2.5">
                       <span className="text-[12px] font-bold text-white/70 group-hover:text-white transition-colors">{social.label}</span>
                       <div className="w-1.5 h-1.5 rounded-full bg-white/20" style={{ background: social.color }} />
                    </div>
                 </a>
               ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
