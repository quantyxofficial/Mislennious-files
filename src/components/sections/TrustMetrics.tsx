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

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

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
    color: "from-cyan-500/20",
    breakdown: [
      { label: "External / Social", value: "84%" },
      { label: "Platform Direct", value: "16%" },
      { label: "Search Organic", value: "High" },
      { label: "Global Presence", value: "Verified" }
    ]
  },
  {
    label: "Platform Events",
    value: 7500,
    suffix: "+",
    decimals: 0,
    icon: Zap,
    sub: "Total Engagement",
    color: "from-purple-500/20",
    breakdown: [
      { label: "Unstop Interactions", value: "~5.1K" },
      { label: "Website Events", value: "2.4K" },
      { label: "Conversion Rate", value: "Strong" },
      { label: "Live Velocity", value: "Active" }
    ]
  },
  {
    label: "Active Users",
    value: 228,
    suffix: "+",
    icon: Users2,
    sub: "Live Community",
    color: "from-blue-500/20",
    breakdown: [
      { label: "New Users", value: "221" },
      { label: "Returning", value: "7" },
      { label: "Growth Rate", value: "+230%" },
      { label: "Active Ratio", value: "97%" }
    ]
  },
  {
    label: "Total Institutes",
    value: 138,
    suffix: "+",
    icon: GraduationCap,
    sub: "Global Network",
    color: "from-amber-500/20",
    breakdown: [
      { label: "IIT/NIT/IIIT", value: "~8%" },
      { label: "Private", value: "~67%" },
      { label: "Government", value: "~21%" },
      { label: "International", value: "~1%" }
    ]
  }
];

export function TrustMetrics() {
  return (
    <section className="w-full py-12 relative z-10 overflow-hidden" id="metrics">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {METRICS.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="relative group h-[200px]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem] blur-xl`} />
              
              <div className="relative h-full p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500 flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] -mr-16 -mt-16 rounded-full blur-2xl group-hover:bg-white/[0.05] transition-colors" />
                
                {/* Main Content (Hidden on hover if breakdown exists) */}
                <div className={`flex flex-col justify-between h-full transition-all duration-500 ${metric.breakdown ? 'group-hover:opacity-0 group-hover:scale-95 group-hover:blur-sm' : ''}`}>
                  <div className="flex justify-between items-start">
                    <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                      <metric.icon className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
                    </div>
                  </div>

                  <div>
                    <div className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2 flex items-baseline gap-1">
                      <Counter value={metric.value} suffix={metric.suffix} decimals={metric.decimals} />
                    </div>
                    <div className="space-y-1">
                      <div className="text-[11px] font-bold text-white tracking-widest uppercase">
                        {metric.label}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 font-medium uppercase tracking-wider group-hover:text-slate-300 transition-colors">
                        {metric.sub}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Breakdown Dashboard */}
                {metric.breakdown && (
                  <div className="absolute inset-0 p-6 flex flex-col justify-center opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 pointer-events-none group-hover:pointer-events-auto">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                      {metric.breakdown.map((item, idx) => (
                        <div key={idx} className="space-y-0.5">
                          <div className="text-[14px] font-bold text-white leading-none">
                            {item.value}
                          </div>
                          <div className="text-[8px] font-mono text-slate-300 uppercase tracking-tight">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/10">
                      <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest">
                        Analytics Dashboard
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
