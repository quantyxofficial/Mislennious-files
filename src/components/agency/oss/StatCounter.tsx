import React, { useEffect, useState } from 'react';
import { useInView, animate } from 'framer-motion';
import { useRef } from 'react';

interface StatCounterProps {
  value: number;
  label: string;
  suffix?: string;
}

export const StatCounter: React.FC<StatCounterProps> = ({ value, label, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        onUpdate: (latest) => setCount(Math.floor(latest)),
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm uppercase tracking-widest text-slate-400 font-medium">{label}</div>
    </div>
  );
};
