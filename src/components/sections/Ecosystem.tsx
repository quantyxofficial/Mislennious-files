import { motion } from 'motion/react';

const ECOSYSTEM = [
  "PyTorch", "TensorFlow", "Hugging Face", "Apache Spark", "Ray", 
  "CUDA", "Jupyter", "Pandas", "Weights & Biases", "ONNX",
  "Scikit-Learn", "Kubernetes", "Kafka", "DataBricks"
];

export function Ecosystem() {
  return (
    <section className="py-12 relative z-20 border-b border-white/[0.05] overflow-hidden bg-black/20" id="ecosystem">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 text-center mb-8">
        <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold flex items-center justify-center gap-4">
          <span className="w-8 h-px bg-slate-800" />
          Native Integrations & Ecosystem
          <span className="w-8 h-px bg-slate-800" />
        </p>
      </div>

      <div className="flex w-[200%] md:w-[150%]">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          className="flex whitespace-nowrap items-center"
        >
          {/* Double the array for seamless looping */}
          {[...ECOSYSTEM, ...ECOSYSTEM].map((tech, i) => (
            <div key={i} className="mx-8 md:mx-12 flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-default">
              <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">{tech.charAt(0)}</span>
              </div>
              <span className="text-lg font-bold text-slate-300 tracking-tight">{tech}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
