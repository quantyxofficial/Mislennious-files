import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-start md:items-center justify-center overflow-hidden px-6 md:px-0 pt-32 md:pt-20">

      {/* Content */}
      <div className="relative z-10 max-w-[95vw] md:max-w-[90vw] text-center space-y-10 md:space-y-12 mt-4 md:mt-0 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="inline-block py-2 px-6 border border-lux-text/10 rounded-full text-[11px] md:text-[12px] font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-lux-muted bg-white/40 backdrop-blur-md">
            Stats • for Better Changes
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-medium leading-[1.1] md:leading-[1] text-lux-text tracking-tight mx-auto"
        >
          {/* Mobile Layout (Stacked) */}
          <span className="block md:hidden">
            We Design. <br />
            We Analyze. <br />
            <span className="italic font-light text-lux-muted">We Architect.</span>
          </span>

          {/* Desktop Layout (Single Row for first two) */}
          <span className="hidden md:block">
            We Design. We Analyze. <br />
            <span className="italic font-light text-lux-muted">We Architect.</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-base md:text-xl text-lux-muted max-w-2xl mx-auto font-light leading-relaxed font-sans px-4 md:px-0"
        >
          A <span className="font-medium text-lux-text">student-run agency</span> building communities and delivering
          <br className="hidden md:block" />professional Web, AI/ML, and Data Analytics solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center pt-4 md:pt-8 w-full md:w-auto mx-auto"
        >
          <button
            onClick={() => window.location.href = '/start-project'}
            className="w-full md:w-auto px-10 py-4 bg-lux-text text-white font-semibold text-sm tracking-[0.2em] uppercase hover:bg-black transition-all rounded-full hover:-translate-y-1 md:mr-2"
            data-hover
          >
            Start Your Project
          </button>
          <button
            onClick={() => window.open('https://discord.gg/kaizenstat', '_blank')}
            className="w-full md:w-auto px-10 py-4 bg-transparent border border-lux-text/20 text-lux-text font-semibold text-sm tracking-[0.2em] uppercase hover:bg-lux-text hover:text-white transition-all rounded-full"
            data-hover
          >
            Join Community
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-lux-muted/40"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-semibold pr-[-0.3em] mr-[-0.3em]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-lux-text/0 via-lux-text/20 to-lux-text/0"></div>
      </motion.div>
    </section>
  );
};