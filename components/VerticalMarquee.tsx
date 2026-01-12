import React from 'react';
import { MARQUEE_ITEMS } from '../constants';
import { motion, useScroll, useTransform } from 'framer-motion';

export const VerticalMarquee: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Fade out starting at 85% down the page, completely gone by 95% (Footer area)
  const opacity = useTransform(scrollYProgress, [0, 0.85, 0.95], [1, 1, 0]);
  const pointerEvents = useTransform(scrollYProgress, (v) => v > 0.9 ? 'none' : 'auto');

  return (
    <motion.div 
      style={{ opacity, pointerEvents }}
      className="fixed left-6 top-1/2 -translate-y-1/2 h-[80vh] w-14 rounded-full border border-lux-glassBorder bg-white/40 backdrop-blur-xl z-40 hidden lg:flex flex-col items-center overflow-hidden shadow-2xl shadow-black/5"
    >
      <div className="h-full w-full relative">
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center animate-marquee gap-10 py-8">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center justify-center gap-4 min-h-[140px] group transition-all duration-500"
            >
              <div className="writing-vertical-rl text-[10px] tracking-[0.25em] uppercase text-lux-muted font-sans transform rotate-180 group-hover:text-lux-text transition-colors font-semibold">
                {item.label}
              </div>
              {item.icon && (
                <div className="p-2 rounded-full bg-transparent group-hover:bg-lux-text group-hover:text-white transition-all duration-500">
                   <item.icon className="w-3 h-3 text-lux-muted group-hover:text-white transition-colors" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};