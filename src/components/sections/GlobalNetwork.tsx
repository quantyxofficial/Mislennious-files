import { motion, animate, useInView, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Globe2, Users2, GraduationCap, Zap } from 'lucide-react';

function Counter({ value, suffix = "", decimals = 0 }: { value: number, suffix?: string, decimals?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });
  
  const springValue = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const displayValue = useTransform(springValue, (latest) => 
    latest.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) + suffix
  );

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  // Fallback to ensure node text is updated if useTransform + motion.span is finicky
  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (nodeRef.current) {
        nodeRef.current.textContent = latest.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }) + suffix;
      }
    });
  }, [springValue, decimals, suffix]);

  return (
    <span ref={nodeRef} className="tabular-nums">
      0{suffix}
    </span>
  );
}

const METRICS = [
  {
    label: "Global Reach",
    value: 15000,
    suffix: "+",
    icon: Globe2,
    sub: "Impressions",
    color: "from-cyan-500/20"
  },
  {
    label: "Platform Events",
    value: 7.5,
    suffix: "K+",
    decimals: 1,
    icon: Zap,
    sub: "Total Engagement",
    color: "from-purple-500/20"
  },
  {
    label: "Active Users",
    value: 228,
    suffix: "+",
    icon: Users2,
    sub: "Live Community",
    color: "from-blue-500/20"
  },
  {
    label: "Institutions",
    value: 50,
    suffix: "+",
    icon: GraduationCap,
    sub: "Global Network",
    color: "from-amber-500/20"
  }
];

const PREMIER_INSTITUTES = [
  "IIT Madras", "IIT Patna", "IIITDM Jabalpur", "Indian Statistical Institute Kolkata", 
  "DTU", "NIT Raipur", "NIT Srinagar", "NSUT"
];

const UNIVERSITIES = [
  "IGDTUW", "Jamia Millia Islamia", "AMU", 
  "VIT", "SRMIST", "KIIT", "Amrita Vishwa Vidyapeetham", 
  "Bennett University", "BML Munjal University", "Symbiosis IT"
];

function MarqueeRow({ items, direction = 'left' }: { items: string[], direction?: 'left' | 'right' }) {
  return (
    <div 
      className="flex overflow-hidden py-4"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
      }}
    >
      <motion.div 
        animate={{ 
          x: direction === 'left' ? [0, "-50%"] : ["-50%", 0] 
        }}
        transition={{ 
          duration: 35, 
          ease: "linear", 
          repeat: Infinity 
        }}
        className="flex gap-16 md:gap-24 whitespace-nowrap pr-16 md:pr-24"
      >
        {/* Render two sets of the same items to create seamless loop */}
        {[...items, ...items].map((college, i) => (
          <div 
            key={i}
            className="text-2xl md:text-4xl font-bold transition-all duration-300 cursor-default hover:text-white text-slate-200/80 tracking-tighter"
          >
            {college}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function GlobalNetwork() {
  return (
    <section className="w-full py-24 relative z-10 overflow-hidden" id="network">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="relative">
          <div className="flex flex-col items-center text-center mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-6"
            >
              Institutional Reach
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-medium tracking-tighter text-white max-w-3xl leading-[1.1] mb-4"
            >
              Participants from <span className="text-slate-500 italic font-light underline decoration-white/10 underline-offset-8">Global Institutions.</span>
            </motion.h2>
            <p className="text-slate-400 text-sm font-medium max-w-xl mx-auto">
              Assembling a diverse elite talent network across distinct academic tiers.
            </p>
          </div>

          {/* Dual Marquee System - Using Framer Motion for Zero Jitter */}
          <div className="relative space-y-8">
            <MarqueeRow items={PREMIER_INSTITUTES} direction="left" />
            <MarqueeRow items={UNIVERSITIES} direction="right" />
          </div>

          <div className="mt-24 flex flex-col items-center gap-6">
             <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
             <p className="text-slate-500 text-[10px] font-mono max-w-3xl text-center leading-relaxed tracking-tight bg-white/[0.02] px-10 py-5 rounded-2xl border border-white/5 italic shadow-2xl">
               *This engagement reflects individual student interest and trust, demonstrating strong organic reach across top-tier and diverse academic backgrounds from 138+ premier institutions worldwide. Mention of these institutions does not imply direct official partnership.
             </p>
          </div>
        </div>
      </div>
    </section>
  );
}
