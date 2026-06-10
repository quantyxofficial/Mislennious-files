import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const reviews = [
  {
    text: "The quality of the normalized data sets is unparalleled. A true engineering marvel.",
    author: "E.R.",
    role: "Data Scientist",
    rating: 5,
    desktopPosition: "md:top-[10px] md:left-[2%] lg:left-[5%] w-full md:w-[300px]",
    depth: "md:z-10",
    animation: "float-anim 8s ease-in-out infinite"
  },
  {
    text: "Zero-knowledge governance applied perfectly. Finally, compute I can trust blindly.",
    author: "S.K.",
    role: "ML Researcher",
    rating: 5,
    desktopPosition: "md:top-[60px] md:right-[2%] lg:right-[8%] w-full md:w-[320px]",
    depth: "md:z-20 md:blur-[1px] hover:blur-none opacity-80 hover:opacity-100",
    animation: "float-reverse-anim 10s ease-in-out infinite"
  },
  {
    text: "A seamless pipeline from unstructured noise to immutable, high-value insights.",
    author: "M.T.",
    role: "Protocol Lead",
    rating: 4,
    desktopPosition: "md:top-[220px] md:-translate-x-1/2 md:left-1/2 w-full md:w-[340px]",
    depth: "md:z-30 shadow-2xl",
    animation: "float-anim 12s ease-in-out infinite"
  },
  {
    text: "The tensor allocation reduced our training overhead by nearly 40%.",
    author: "J.L.",
    role: "AI Architect",
    rating: 5,
    desktopPosition: "md:top-[300px] md:right-[5%] lg:right-[12%] w-full md:w-[280px]",
    depth: "md:z-10",
    animation: "float-reverse-anim 11s ease-in-out infinite"
  },
  {
    text: "Flawless cryptographically secured transactions. A new standard.",
    author: "R.V.",
    role: "Security Eng",
    rating: 5,
    desktopPosition: "md:top-[360px] md:left-[5%] lg:left-[10%] w-full md:w-[290px]",
    depth: "md:z-20 md:blur-[0.5px] hover:blur-none opacity-90 hover:opacity-100",
    animation: "float-anim 9s ease-in-out infinite"
  }
];

export function FloatingReviews() {
  return (
    <section className="relative w-full py-20 md:py-24 z-20 bg-transparent overflow-hidden border-t border-white/[0.05]" id="reviews">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes float-anim {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(6px, -10px, 0); }
          }
          @keyframes float-reverse-anim {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(-6px, 10px, 0); }
          }
        }
      `}</style>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 mb-12 md:mb-8 text-center md:text-left">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
            <div className="h-[1px] w-8 bg-cyan-500/50" />
            <span className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-[0.3em]">Consensus</span>
            <div className="h-[1px] w-8 bg-cyan-500/50 md:hidden" />
          </div>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-white">
            They Said, <span className="text-slate-400 italic font-light">Giving Time Was Worth.</span>
          </h2>
        </motion.div>
      </div>

      <div className="w-full max-w-6xl mx-auto relative px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:block md:h-[550px]">
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`relative md:absolute flex flex-col ${r.desktopPosition} ${r.depth} transition-all duration-[800ms]`}
            style={{ animation: r.animation }}
          >
            <div className="relative w-full bg-[#050505]/40 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-5 lg:p-6 transition-transform duration-700 hover:scale-[1.02] hover:-translate-y-1 hover:bg-[#050505]/60 hover:border-white/15 group">
              {/* Subtle Noise Texture */}
              <div className="absolute inset-0 z-0 opacity-[0.02] mix-blend-overlay pointer-events-none rounded-2xl" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`}}></div>
              
              {/* Top ambient glow */}
              <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col gap-5">
                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  "{r.text}"
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-[9px] font-mono text-white/70 bg-white/5 shadow-inner">
                      {r.author}
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      {r.role}
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className={`w-3.5 h-3.5 ${idx < r.rating ? 'fill-cyan-400 text-cyan-400' : 'text-white/10 fill-white/10'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
