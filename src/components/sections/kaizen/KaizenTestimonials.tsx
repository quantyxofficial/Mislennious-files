import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: 'KaizenStat caught a data leakage issue we would have shipped to production. Saves hours of manual debugging.',
    author: 'Sarah Chen',
    role: 'ML Engineer, FinTech Startup',
    color: '#6366f1',
  },
  {
    quote: 'The validation pipeline is a lifesaver. No more guessing whether your model is actually ready — it just tells you.',
    author: 'Marcus Johnson',
    role: 'Data Science Lead, Fortune 500',
    color: '#06b6d4',
  },
  {
    quote: 'Reduced our model debugging cycle from days to minutes. The diagnostic output is crystal clear.',
    author: 'Priya Patel',
    role: 'ML Ops, E-commerce Scale-up',
    color: '#8b5cf6',
  },
];

export function KaizenTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const active = testimonials[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-24 relative border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.03) 0%, transparent 70%)',
      }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-[10px] font-mono uppercase tracking-widest text-white/40 mb-4">
            Developer Love
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
            What developers say
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="min-h-[320px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full text-center space-y-8"
              >
                {/* Quote */}
                <blockquote className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-white leading-snug px-4">
                  "{active.quote}"
                </blockquote>

                {/* Author */}
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: active.color }}
                    />
                    <p className="text-sm font-semibold text-white">{active.author}</p>
                  </div>
                  <p className="text-xs text-slate-500 font-light">{active.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-2 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="transition-all duration-300"
                style={{
                  height: '2px',
                  width: i === activeIndex ? '24px' : '6px',
                  background: i === activeIndex ? active.color : 'rgba(255,255,255,0.1)',
                  borderRadius: '1px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>

          {/* Arrow buttons */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={handlePrev}
              className="p-2 rounded-lg border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-lg border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Auto-advance indicator */}
          <div className="flex justify-center mt-6">
            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
              Auto-advance in 5s
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
