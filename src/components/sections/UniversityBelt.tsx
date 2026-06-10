import { motion } from 'motion/react';

const UNIVERSITIES = [
  "IIT Madras",
  "IIT Patna",
  "IIT Madras",
  "IIITDM Jabalpur",
  "NIT Raipur",
  "IIT Madras",
  "ISI Kolkata",
  "NIT Srinagar",
  "IIT Madras",
  "DTU",
  "IIT Madras",
  "NSUT",
  "IIT Madras",
  "IGDTUW",
  "IIT Madras",
  "JMI",
  "IIT Madras",
  "AMU"
];

export function UniversityBelt() {
  return (
    <div className="w-full bg-black/40 border-y border-white/[0.05] py-5 overflow-hidden relative z-10 flex items-center">
      {/* Corner Label */}
      <div className="absolute left-0 top-0 bottom-0 z-20 px-6 bg-black/80 backdrop-blur-md border-r border-white/10 flex items-center shadow-[20px_0_40px_rgba(0,0,0,0.8)]">
        <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-cyan-400 whitespace-nowrap">
          Our Participants
        </span>
      </div>
      
      <div className="flex whitespace-nowrap pl-48">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, ease: "linear", repeat: Infinity }}
          className="flex items-center"
        >
          {/* Double the list for seamless loop */}
          {[...UNIVERSITIES, ...UNIVERSITIES].map((uni, i) => (
            <div key={i} className="flex items-center mx-10">
              <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-slate-300 hover:text-white transition-colors cursor-default">
                {uni}
              </span>
              <div className="w-1 h-1 rounded-full bg-white/20 ml-20" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
