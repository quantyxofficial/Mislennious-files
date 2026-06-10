import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Globe, Heart, ShieldCheck } from 'lucide-react';

const CORPORATE = [
  { name: "TechCorp", logo: "TechCorp" },
  { name: "DataFlow", logo: "DataFlow" },
  { name: "CloudSync", logo: "CloudSync" },
];

const SPONSORS = [
  { name: "AI Labs", logo: "AI Labs" },
  { name: "Nexus", logo: "Nexus" },
  { name: "GlobalGen", logo: "GlobalGen" },
  { name: "Compute Node", logo: "Compute Node" },
];

const COMMUNITY = [
  { name: "OpenSource Hub", logo: "OpenSource Hub" },
  { name: "Dev Community", logo: "Dev Community" },
  { name: "Student AI", logo: "Student AI" },
  { name: "Protocol X", logo: "Protocol X" },
  { name: "Neural Link", logo: "Neural Link" },
  { name: "Alpha Code", logo: "Alpha Code" },
];

export function Sponsors() {
  return (
    <section className="w-full py-16 relative z-20" id="sponsors">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-white/20 bg-white/10 text-[10px] font-mono text-cyan-400 uppercase tracking-widest mx-auto"
          >
            <Sparkles className="w-3 h-3 animate-pulse" />
            Our Global Network
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-medium tracking-tighter text-white"
          >
            Supported By.
          </motion.h2>
        </div>

        <div className="space-y-16">
          
          {/* 1. Corporate */}
          <div className="overflow-hidden">
            <div className="flex items-center gap-4 mb-8">
               <span className="text-[10px] font-bold text-white uppercase tracking-[0.4em] flex items-center gap-2 whitespace-nowrap">
                 <ShieldCheck className="w-4 h-4 text-cyan-400" /> Corporate
               </span>
               <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
            </div>
            
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-black via-black/40 to-transparent z-20 backdrop-blur-[2px] pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-black via-black/40 to-transparent z-20 backdrop-blur-[2px] pointer-events-none" />
              
              <div className="flex w-fit animate-marquee-fast py-4">
                {[...CORPORATE, ...CORPORATE].map((item, i) => (
                  <div key={i} className="flex-shrink-0 px-8 md:px-12">
                    <span className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase italic opacity-60 group-hover:opacity-100 transition-opacity duration-700">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Sponsors */}
          <div className="overflow-hidden">
            <div className="flex items-center gap-4 mb-8">
               <span className="text-[10px] font-bold text-white uppercase tracking-[0.4em] flex items-center gap-2 whitespace-nowrap">
                 <Globe className="w-4 h-4 text-cyan-400" /> Sponsors
               </span>
               <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
            </div>
            
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-black via-black/40 to-transparent z-20 backdrop-blur-[2px] pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-black via-black/40 to-transparent z-20 backdrop-blur-[2px] pointer-events-none" />
              
              <div className="flex w-fit animate-marquee-reverse-fast py-4">
                {[...SPONSORS, ...SPONSORS].map((item, i) => (
                  <div key={i} className="flex-shrink-0 px-8 md:px-12">
                    <span className="text-2xl md:text-3xl font-bold tracking-tight text-white uppercase opacity-50 group-hover:opacity-100 transition-opacity duration-700">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Community */}
          <div className="overflow-hidden">
            <div className="flex items-center gap-4 mb-8">
               <span className="text-[10px] font-bold text-white uppercase tracking-[0.4em] flex items-center gap-2 whitespace-nowrap">
                 <Heart className="w-4 h-4 text-cyan-400" /> Community
               </span>
               <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
            </div>
            
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-black via-black/40 to-transparent z-20 backdrop-blur-[2px] pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-black via-black/40 to-transparent z-20 backdrop-blur-[2px] pointer-events-none" />
              
              <div className="flex w-fit animate-marquee-slow py-4">
                {[...COMMUNITY, ...COMMUNITY].map((item, i) => (
                  <div key={i} className="flex-shrink-0 flex items-center gap-6 px-10 group cursor-default">
                    <div className="w-10 h-10 rounded-full border border-cyan-400/30 bg-cyan-400/5 flex items-center justify-center text-xs font-bold text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-all">
                      {item.name.substring(0, 1)}
                    </div>
                    <span className="text-2xl md:text-4xl font-semibold tracking-tight text-white opacity-60 group-hover:opacity-100 group-hover:text-cyan-400 transition-all duration-700">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Stylized Minimalist CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto mt-24 px-1 p-1 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-xl flex items-center justify-between overflow-hidden group hover:border-white/20 transition-all duration-500 shadow-2xl"
        >
          <div className="flex items-center gap-6 px-8 py-2.5">
            <div className="hidden md:flex w-10 h-10 rounded-full bg-cyan-400/10 border border-cyan-400/20 items-center justify-center">
              <Globe className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight leading-none mb-1">
                Ready to partner?
              </h3>
              <p className="text-[11px] text-slate-400 font-medium leading-none">
                Connect with top-tier student engineers across the globe.
              </p>
            </div>
          </div>

          <button className="relative px-8 py-4 rounded-full bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] hover:bg-cyan-400 transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] flex items-center gap-2 group/btn">
            Partner With Us
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-fast {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee-reverse-fast {
          animation: marquee-reverse 25s linear infinite;
        }
        .animate-marquee-slow {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
