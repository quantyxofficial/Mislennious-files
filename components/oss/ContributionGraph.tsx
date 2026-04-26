import React from 'react';
import { motion } from 'framer-motion';

export const ContributionGraph: React.FC = () => {
  const rows = 7;
  const cols = 20;

  return (
    <div className="grid grid-cols-20 gap-1.5 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
      {[...Array(rows * cols)].map((_, i) => {
        const opacity = Math.random();
        const level = opacity > 0.8 ? 'bg-cyan-500' : 
                      opacity > 0.6 ? 'bg-cyan-600/60' : 
                      opacity > 0.4 ? 'bg-cyan-700/40' : 
                      'bg-white/5';
        
        return (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.002, duration: 0.5 }}
            whileHover={{ scale: 1.5, zIndex: 10 }}
            className={`w-3 h-3 rounded-[2px] ${level} cursor-pointer transition-colors hover:border hover:border-white/40`}
          />
        );
      })}
    </div>
  );
};
