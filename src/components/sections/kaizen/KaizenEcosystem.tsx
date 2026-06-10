import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const rows = [
  {
    dir: 1,
    items: ['Pandas', 'scikit-learn', 'XGBoost', 'LightGBM', 'Streamlit', 'TensorFlow', 'PyTorch', 'Keras', 'FastAPI', 'Flask', 'Pandas', 'scikit-learn', 'XGBoost', 'LightGBM', 'Streamlit', 'TensorFlow', 'PyTorch', 'Keras', 'FastAPI', 'Flask'],
  },
  {
    dir: -1,
    items: ['Google Colab', 'Jupyter', 'NVIDIA CUDA', 'Apple MPS', 'OpenRouter', 'VS Code', 'Hugging Face', 'AWS SageMaker', 'GCP Vertex', 'Azure ML', 'Google Colab', 'Jupyter', 'NVIDIA CUDA', 'Apple MPS', 'OpenRouter', 'VS Code', 'Hugging Face', 'AWS SageMaker', 'GCP Vertex', 'Azure ML'],
  },
  {
    dir: 1,
    items: ['pandas DataFrame', 'Any CSV', 'Any Parquet', 'Any SQL', 'Any HuggingFace', 'Excel', 'JSON', 'Arrow', 'DuckDB', 'Polars', 'pandas DataFrame', 'Any CSV', 'Any Parquet', 'Any SQL', 'Any HuggingFace', 'Excel', 'JSON', 'Arrow', 'DuckDB', 'Polars'],
  },
];

function MarqueeRow({ items, dir, speed = 40 }: { items: string[]; dir: 1 | -1; speed?: number }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden relative py-2">
      <motion.div
        className="flex items-end gap-0 whitespace-nowrap leading-none"
        animate={{ x: dir === 1 ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ repeat: Infinity, repeatType: 'loop', duration: speed, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-end">
            <span
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight px-8 text-white/20 hover:text-white/70 transition-colors duration-300 cursor-default select-none leading-tight"
            >
              {item}
            </span>
            <span className="text-white/10 text-3xl select-none pb-1">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function KaizenEcosystem() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="pt-32 pb-56 relative border-t border-white/5 bg-transparent overflow-hidden"
    >
      {/* Top fade */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

      {/* Heading */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center mb-16 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/50 text-[10px] font-mono uppercase tracking-wider bg-white/[0.02]">
            Ecosystem
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter text-white leading-tight">
            Works with your{' '}
            <span className="text-white/40">entire stack</span>
          </h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto font-light leading-relaxed">
            A framework, not a replacement. Bring your own data, your own models, your own GPU.
          </p>
        </motion.div>
      </div>

      {/* Marquee rows */}
      <div className="space-y-16 relative z-0">
        {rows.map((row, i) => (
          <MarqueeRow key={i} items={row.items} dir={row.dir as 1 | -1} speed={38 + i * 6} />
        ))}
      </div>
    </motion.section>
  );
}
