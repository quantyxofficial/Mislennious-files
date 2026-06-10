import { motion } from 'motion/react';
import { Search, Code2, GitPullRequest, GitMerge, Award, ArrowRight } from 'lucide-react';

const FLOW_STEPS = [
  { icon: Search, title: "1. Pick an Issue", desc: "Find open issues on real ML repositories." },
  { icon: Code2, title: "2. Contribute", desc: "Write code, clean data, or build notebooks." },
  { icon: GitPullRequest, title: "3. Submit PR", desc: "Open a pull request on GitHub." },
  { icon: GitMerge, title: "4. Review & Merge", desc: "Get feedback from mentors and merge." },
  { icon: Award, title: "5. Earn Impact", desc: "Gain reputation and real-world proof." }
];

export function ContributionFlow() {
  return (
    <section className="py-24 relative z-10 border-t border-white/5 bg-black/40" id="flow">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 font-mono text-[9px] uppercase tracking-widest mx-auto"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            KSoC Program
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-white mb-4"
          >
            How it works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 font-light text-lg max-w-2xl mx-auto"
          >
            A transparent loop. Build proof of work that companies actually value.
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 z-0" />

          {FLOW_STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="relative z-10 flex flex-col items-center flex-1 w-full text-center group"
            >
              <div className="w-12 h-12 rounded-full border border-white/10 bg-black flex items-center justify-center mb-6 overflow-hidden relative transition-colors group-hover:border-white/30 group-hover:bg-white/[0.02]">
                <step.icon className="w-5 h-5 text-slate-300 relative z-10" />
              </div>
              
              <h3 className="text-sm font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed max-w-[180px]">
                {step.desc}
              </p>
              
              {idx < FLOW_STEPS.length - 1 && (
                <div className="md:hidden mt-6 text-white/10">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
