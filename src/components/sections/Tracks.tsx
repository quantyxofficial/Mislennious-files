import { motion } from 'motion/react';
import { Database, LineChart, BrainCircuit, GitPullRequest, Settings, Server } from 'lucide-react';

const STAGES = [
  {
    icon: Database,
    title: "Data Cleaning",
    description: "Format, filter, and structure raw datasets.",
    borderHover: "hover:border-emerald-500/50",
    iconColor: "text-emerald-400",
    bgHover: "hover:bg-emerald-500/10"
  },
  {
    icon: LineChart,
    title: "Data Analysis (EDA)",
    description: "Explore data to find patterns and signals.",
    borderHover: "hover:border-blue-500/50",
    iconColor: "text-blue-400",
    bgHover: "hover:bg-blue-500/10"
  },
  {
    icon: BrainCircuit,
    title: "Model Training",
    description: "Build, train, and test models from scratch.",
    borderHover: "hover:border-purple-500/50",
    iconColor: "text-purple-400",
    bgHover: "hover:bg-purple-500/10"
  },
  {
    icon: GitPullRequest,
    title: "Refining & Tuning",
    description: "Fine-tune weights for better accuracy.",
    borderHover: "hover:border-pink-500/50",
    iconColor: "text-pink-400",
    bgHover: "hover:bg-pink-500/10"
  },
  {
    icon: Settings,
    title: "Optimization",
    description: "Reduce latency and memory footprint.",
    borderHover: "hover:border-amber-500/50",
    iconColor: "text-amber-400",
    bgHover: "hover:bg-amber-500/10"
  },
  {
    icon: Server,
    title: "Deployment",
    description: "Serve fast and scalable inference APIs.",
    borderHover: "hover:border-cyan-500/50",
    iconColor: "text-cyan-400",
    bgHover: "hover:bg-cyan-500/10"
  }
];

export function Tracks() {
  return (
    <section className="w-full py-16 bg-transparent relative z-10 overflow-hidden" id="tracks">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-slate-800/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/70 font-mono text-[9px] md:text-[10px] uppercase tracking-widest mx-auto"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Engineering Areas
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-2xl md:text-4xl font-medium tracking-tight text-white mb-2"
          >
            Exactly what you will build
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-400 font-light text-xs md:text-sm max-w-xl mx-auto"
          >
            Direct, high-impact technical work. Choose the domain where you want to grow.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {STAGES.map((stage, i) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className={`p-4 md:p-6 rounded-[1.5rem] bg-[#09090b]/80 border border-white/[0.08] flex flex-col items-center text-center transition-all duration-300 ${stage.borderHover} ${stage.bgHover} group backdrop-blur-xl shadow-xl`}
            >
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-[1rem] bg-white/[0.03] border border-white/[0.05] flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}>
                <stage.icon className={`w-5 h-5 md:w-6 md:h-6 ${stage.iconColor} opacity-80 group-hover:opacity-100 transition-opacity`} />
              </div>
              <h3 className="text-sm md:text-base font-medium text-white mb-1">{stage.title}</h3>
              <p className="text-[10px] md:text-xs text-slate-400 font-light max-w-[180px]">
                {stage.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
