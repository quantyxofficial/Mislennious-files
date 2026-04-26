import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  Github, 
  Code2, 
  GitFork, 
  Users, 
  Zap, 
  ArrowRight,
  Star,
  Sparkles,
  Trophy,
  Activity,
  MessageSquare,
  Globe
} from 'lucide-react';
import { Section } from '../components/oss/Section';
import { StatCounter } from '../components/oss/StatCounter';
import { MagneticButton } from '../components/oss/MagneticButton';
import { FollowerScene } from '../components/oss/FollowerScene';

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const PremiumCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`group relative p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl hover:bg-white/[0.05] transition-all duration-500 hover:border-purple-500/30 ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />
    <div className="relative z-10">{children}</div>
  </div>
);

export const OpenSourceLanding = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white selection:bg-purple-500/30 font-geist overflow-x-hidden">
      {/* 3D Sticky Follower */}
      <FollowerScene scrollYProgress={smoothProgress} />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            <Sparkles size={14} />
            <span>The Protocol of Tomorrow</span>
          </div>
        </FadeIn>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-7xl md:text-[9rem] font-black tracking-[-0.05em] leading-[0.9] mb-10"
        >
          CODE THE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-600">UNIVERSE.</span>
        </motion.h1>

        <FadeIn delay={0.4}>
          <p className="text-xl md:text-2xl text-white/40 max-w-2xl mx-auto mb-16 font-medium leading-relaxed">
            Join the elite circle of builders shaping the future of decentralized innovation. 
            Your first pull request is the spark.
          </p>
        </FadeIn>

        <FadeIn delay={0.6}>
          <div className="flex flex-col md:flex-row gap-6">
            <MagneticButton>
              <button className="px-12 py-5 rounded-full bg-white text-black font-black text-lg flex items-center gap-3 group">
                <Github size={20} />
                Get Started
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </MagneticButton>
            <button className="px-12 py-5 rounded-full bg-white/5 border border-white/10 text-white font-black text-lg backdrop-blur-xl hover:bg-white/10 transition-all">
              Explore Missions
            </button>
          </div>
        </FadeIn>
        
        {/* Cinematic Scroll Line */}
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: 100 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-0 left-1/2 w-px bg-gradient-to-b from-purple-500 to-transparent" 
        />
      </section>

      {/* Stats Section */}
      <Section className="py-40">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          <StatCounter value={250} label="Core Protocols" suffix="+" />
          <StatCounter value={12000} label="Global Builders" />
          <StatCounter value={85000} label="Merges Completed" />
          <StatCounter value={1.2} label="TB Data Processed" suffix="P" />
        </div>
      </Section>

      {/* Features Grid */}
      <Section className="py-40 border-y border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PremiumCard>
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
              <Zap className="text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight">Instant Velocity</h3>
            <p className="text-white/40 leading-relaxed">Optimized workflows that let you focus on what matters: the code.</p>
          </PremiumCard>
          
          <PremiumCard>
            <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mb-6">
              <Globe className="text-violet-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight">Borderless Impact</h3>
            <p className="text-white/40 leading-relaxed">Your contributions power applications used by millions across every continent.</p>
          </PremiumCard>
          
          <PremiumCard>
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6">
              <Trophy className="text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight">Meritocratic Growth</h3>
            <p className="text-white/40 leading-relaxed">Rise through the ranks based on the quality and impact of your contributions.</p>
          </PremiumCard>
        </div>
      </Section>

      {/* Projects Section */}
      <Section className="py-60">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
          <div>
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">ELITE REPOS.</h2>
            <p className="text-xl text-white/40 font-medium italic">Hand-picked missions for master developers.</p>
          </div>
          <MagneticButton>
            <button className="flex items-center gap-2 text-purple-400 font-black uppercase tracking-widest text-[10px] hover:text-purple-300 transition-colors">
              View Database <ArrowRight size={14} />
            </button>
          </MagneticButton>
        </div>
        
        <div className="space-y-6">
          {[
            { name: "Nebula Core", lang: "Rust", level: "Expert", stars: "12.4k" },
            { name: "Aether Engine", lang: "C++ / Vulkan", level: "Advanced", stars: "8.1k" },
            { name: "Quantum-JS", lang: "TypeScript", level: "Intermediate", stars: "4.2k" },
          ].map((project, i) => (
            <motion.div 
              key={i}
              whileHover={{ x: 20 }}
              className="group flex items-center justify-between p-8 rounded-3xl border border-white/5 hover:border-purple-500/50 hover:bg-white/[0.02] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-8">
                <span className="text-white/20 font-mono text-sm">0{i + 1}</span>
                <div>
                  <h4 className="text-2xl font-bold group-hover:text-purple-400 transition-colors">{project.name}</h4>
                  <p className="text-xs text-white/40 uppercase tracking-widest mt-1 font-bold">{project.lang}</p>
                </div>
              </div>
              <div className="flex items-center gap-12">
                <div className="hidden md:block">
                  <div className="text-[10px] text-white/20 uppercase tracking-widest font-black mb-1">Difficulty</div>
                  <div className="text-sm font-bold text-white/60">{project.level}</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-yellow-500 font-bold">
                    <Star size={16} fill="currentColor" />
                    <span>{project.stars}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Community Section */}
      <Section className="py-60 bg-gradient-to-t from-purple-900/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter leading-tight">
              JOIN THE <br />
              <span className="italic text-purple-500">RESISTANCE.</span>
            </h2>
            <p className="text-2xl text-white/40 mb-16 font-medium leading-relaxed">
              Collaborate with thousands of top-tier engineers in our private Discord and GitHub ecosystems.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <MagneticButton>
                <button className="px-12 py-6 rounded-full bg-purple-600 text-white font-black text-xl hover:bg-purple-500 transition-all flex items-center gap-3">
                  <MessageSquare size={24} /> Enter Discord
                </button>
              </MagneticButton>
              <button className="px-12 py-6 rounded-full bg-white/5 border border-white/10 text-white font-black text-xl hover:bg-white/10 transition-all">
                Global Discussions
              </button>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="py-80 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-7xl md:text-9xl font-black mb-12 tracking-tighter">THE FUTURE <br /> IS OPEN.</h2>
          <MagneticButton>
            <button className="px-16 py-8 rounded-full bg-white text-black font-black text-2xl hover:scale-105 transition-transform flex items-center gap-4 mx-auto group">
              Start Your First Mission
              <ArrowRight size={32} className="group-hover:translate-x-3 transition-transform" />
            </button>
          </MagneticButton>
        </div>
      </Section>

      <footer className="py-24 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-12 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter">KAIZENSTAT OSS.</span>
          </div>
          
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
            <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Security</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
          </div>
          
          <div className="text-white/10 text-[10px] font-mono uppercase tracking-widest">
            © 2026 KaizenStat Protocol v2.0
          </div>
        </div>
      </footer>
    </div>
  );
};
