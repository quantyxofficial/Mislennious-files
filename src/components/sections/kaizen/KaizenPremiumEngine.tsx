import { motion } from 'framer-motion';

const features = [
  {
    icon: '🎯',
    title: 'Smart Ensemble',
    description: 'Meta-learner stacks models optimally.',
    result: '0.957',
    improvement: '+1.5%'
  },
  {
    icon: '⚙️',
    title: '2-Stage Tuning',
    description: 'Coarse search + precision refinement.',
    result: '0.9421',
    improvement: '+0.39%'
  },
  {
    icon: '📊',
    title: 'Auto-Calibration',
    description: 'Aligns predictions with actual accuracy.',
    result: '< 1%',
    improvement: 'Gap'
  }
];

function FeatureCard({ icon, title, description, result, improvement }: typeof features[0]) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-lg p-5 border border-white/10 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03]"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'radial-gradient(300px at 50% 50%, rgba(59,130,246,0.05), transparent)', pointerEvents: 'none' }}
      />

      <div className="relative z-10 space-y-3">
        {/* Icon & Title */}
        <div className="flex items-start gap-2">
          <span className="text-2xl flex-shrink-0">{icon}</span>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white">{title}</h3>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{description}</p>
          </div>
        </div>

        {/* Metrics */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/5">
          <div className="flex-1">
            <p className="text-[10px] text-slate-500">Result</p>
            <p className="text-xs font-bold text-blue-300">{result}</p>
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-slate-500">Gain</p>
            <p className="text-xs font-bold text-emerald-300">{improvement}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function KaizenPremiumEngine() {
  return (
    <section className="py-16 relative bg-transparent overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-blue-600/[0.05] blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">

        {/* Compact Heading */}
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Enterprise-Grade <span className="text-blue-300">ML Algorithms</span>
          </h2>
          <p className="text-xs text-slate-400">Automatically applied in KaizenStat v0.5.9</p>
        </div>

        {/* Feature cards grid */}
        <div className="grid md:grid-cols-3 gap-3">
          {features.map((feature, i) => (
            <FeatureCard key={i} {...feature} />
          ))}
        </div>

      </div>
    </section>
  );
}
