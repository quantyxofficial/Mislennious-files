import { motion } from 'motion/react';
import { Eye, Zap, ArrowUpRight } from 'lucide-react';
import { Logo } from '../ui/Logo';

const EVENTS = [
  {
    title: "Tech Blog Internship",
    platform: "Unstop",
    date: "01 May 2026",
    metrics: {
      registrations: "182",
      impressions: "1,706 (+4)",
      gender: "95F / 87M",
      completion: "Verified Report",
    },
    impressionsBreakdown: {
      primary: "1,100",
      secondary: "300",
      tertiary: "306"
    },
    highlight: "Impact Analytics",
    image: "/tech_blog_banner.png",
    hue: "from-cyan-500/10 to-blue-500/10"
  },
  {
    title: "Logo Designing Competition",
    platform: "Unstop",
    date: "Oct 2025",
    metrics: {
      registrations: "100+",
      impressions: "3,200",
      gender: "70F / 30M",
      completion: "100+ Joined",
    },
    impressionsBreakdown: {
      primary: "2,100",
      secondary: "600",
      tertiary: "500"
    },
    highlight: "Creative Identity",
    image: "/logo_competition_banner.png",
    hue: "from-purple-500/10 to-pink-500/10"
  }
];

export function PastEvents() {
  return (
    <section className="w-full py-20 relative z-10" id="events">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Left Side: Sticky Info */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-cyan-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-4"
            >
              Impact Reports
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-white mb-6 leading-tight"
            >
              Event <br/> <span className="text-slate-500 italic font-light">Insights.</span>
            </motion.h2>
            
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-white tracking-tight">
                Welcome, Visionary! 👋
              </h3>
              <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed max-w-sm">
                Manage and monitor your opportunity with real-time insights from this dashboard.
              </p>
            </div>
          </div>

          {/* Right Side: Detailed Event View */}
          <div className="lg:w-2/3 space-y-12">
            {EVENTS.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative aspect-[16/9] rounded-[3rem] overflow-hidden border border-white/10 bg-white/5 shadow-2xl cursor-pointer"
              >
                {/* Logo Overlay */}
                <div className="absolute top-8 left-8 z-20 bg-black/20 backdrop-blur-md border border-white/10 p-2 rounded-xl group-hover:opacity-0 transition-opacity duration-500">
                    <Logo className="w-6 h-6 text-white" />
                </div>
                {/* Background Image */}
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 group-hover:blur-[2px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-500" />
                
                {/* Static Overlay (Visible Always) */}
                <div className="absolute inset-0 p-10 flex flex-col justify-between z-10 transition-opacity duration-500 group-hover:opacity-0">
                  <div className="flex items-center justify-between">
                    <div />
                    <span className="text-[10px] font-mono text-white/60">Update: {event.date}</span>
                  </div>

                  {/* Redundant Title Removed to let the Banner Image Typography Shine */}
                  <div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                       <div>
                          <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-1">Impressions</div>
                          <div className="text-2xl font-black text-white">{event.metrics.impressions}</div>
                       </div>
                       <div>
                          <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-1">Applications</div>
                          <div className="text-2xl font-black text-white">{event.metrics.registrations}</div>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay (Detailed Info) */}
                <div className="absolute inset-0 bg-black/80 backdrop-blur-md p-8 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                   <div className="w-full max-w-md space-y-8">
                      <div className="text-center">
                         <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-4 inline-block">
                            {event.highlight} Breakdown
                         </span>
                         <h4 className="text-2xl font-bold text-white tracking-tight">{event.title}</h4>
                      </div>

                      <div className="space-y-6">
                         <div className="flex items-center gap-3 mb-2">
                            <Eye className="w-4 h-4 text-cyan-400" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Impression Breakdown</span>
                         </div>
                         <div className="grid grid-cols-3 gap-8">
                            <div className="text-center">
                               <div className="text-xs text-slate-500 uppercase font-mono mb-1">Primary</div>
                               <div className="text-lg font-black text-white">{event.impressionsBreakdown.primary}</div>
                            </div>
                            <div className="text-center">
                               <div className="text-xs text-slate-500 uppercase font-mono mb-1">Secondary</div>
                               <div className="text-lg font-black text-white">{event.impressionsBreakdown.secondary}</div>
                            </div>
                            <div className="text-center">
                               <div className="text-xs text-slate-500 uppercase font-mono mb-1">Tertiary</div>
                               <div className="text-lg font-black text-white">{event.impressionsBreakdown.tertiary}</div>
                            </div>
                         </div>
                         <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex">
                            <div className="h-full bg-cyan-500 w-[65%]" />
                            <div className="h-full bg-purple-500 w-[20%]" />
                            <div className="h-full bg-amber-500 w-[15%]" />
                         </div>
                      </div>

                      <div className="flex justify-center gap-12 pt-4">
                         <div className="text-center">
                            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Applications</div>
                            <div className="text-sm font-bold text-white">{event.metrics.registrations}</div>
                         </div>
                         <div className="text-center">
                            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Report Status</div>
                            <div className="text-sm font-bold text-cyan-400">{event.metrics.completion}</div>
                         </div>
                      </div>
                   </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
