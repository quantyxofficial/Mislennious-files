import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Github, Twitter, Linkedin, Network, CheckCircle2 } from 'lucide-react';

const TEAM = [
  { 
    name: 'Masuddar Rahaman', 
    role: 'Founder • Lead Architect', 
    hue: 'from-cyan-400 to-blue-500', 
    img: 'https://github.com/Masuddar.png',
    links: {
      github: 'https://github.com/Masuddar',
      linkedin: 'https://www.linkedin.com/in/masuddar-rahaman/'
    }
  },
  { 
    name: 'Kriti Sharma', 
    role: 'AI Research Lead', 
    hue: 'from-purple-400 to-pink-500', 
    img: 'https://github.com/kriti-sharma-ai.png',
    links: {
      github: 'https://github.com/kriti-sharma-ai',
      linkedin: 'https://www.linkedin.com/in/kriti-sharma-795116377/'
    }
  },
  { 
    name: 'Abhishikta Dutta', 
    role: 'Full Stack Engineer', 
    hue: 'from-emerald-400 to-cyan-500', 
    img: 'https://github.com/abhishiktadutta.png',
    links: {
      github: 'https://github.com/abhishiktadutta',
      linkedin: 'https://www.linkedin.com/in/abhishikta-dutta1'
    }
  },
];

export function Team() {
  return (
    <section className="py-24 relative z-20 border-t border-white/5 bg-black/60" id="team">
      <div className="container mx-auto px-4 max-w-6xl relative">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1 text-left">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tighter mb-4 text-white">
              The Global <br/> <span className="text-slate-400 italic font-light">Organizers.</span>
            </h2>
            <p className="text-slate-400 font-light text-sm md:text-base mb-8 max-w-lg">
              We are a global team of students and researchers. We build the platform and partner with the best projects to help you start your AI engineering journey.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3">
                 <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                 <div>
                    <h4 className="text-white text-sm font-semibold">Global Coordination</h4>
                    <p className="text-slate-500 text-xs md:text-sm font-light">Running the program for students and developers worldwide.</p>
                 </div>
              </li>
              <li className="flex items-start gap-3">
                 <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                 <div>
                    <h4 className="text-white text-sm font-semibold">Project Selection</h4>
                    <p className="text-slate-500 text-xs md:text-sm font-light">Hand-picking the best open-source projects for you to work on.</p>
                 </div>
              </li>
              <li className="flex items-start gap-3">
                 <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                 <div>
                    <h4 className="text-white text-sm font-semibold">World-Class Partners</h4>
                    <p className="text-slate-500 text-xs md:text-sm font-light">Connecting top universities and tech companies together.</p>
                 </div>
              </li>
            </ul>
             <Link to="/founder-connect" className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500/40 to-blue-600/40 border border-cyan-400/30 rounded-full text-[11px] font-black uppercase tracking-[0.3em] text-white transition-all overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.2)] hover:shadow-[0_0_60px_rgba(34,211,238,0.45)] hover:scale-105 active:scale-95 animate-pulse-subtle">
               {/* Sliding Shine Effect */}
               <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
               
               {/* High-Contrast Halo Ring */}
               <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400/40 to-blue-400/40 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />

               <span className="relative z-10 flex items-center gap-2 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                 Know Your Founders
                 <Network className="w-5 h-5 text-white group-hover:rotate-[30deg] transition-transform duration-700" />
               </span>
               
               {/* Inner glow layer */}
               <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_100%)]"></div>
             </Link>
          </div>

          <div className="flex-1 relative w-full aspect-square flex items-center justify-center">
            {/* Center core */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
              viewport={{ once: true }}
              className="absolute z-10 w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 to-black flex flex-col items-center justify-center overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)]"
            >
              <Network className="w-8 h-8 md:w-10 md:h-10 text-cyan-400 mb-1" strokeWidth={1.5} />
              <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-slate-300">KaizenStat</span>
              <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_10s_linear_infinite]" style={{ borderStyle: 'dashed' }}></div>
            </motion.div>

            {/* Members in circle */}
            {TEAM.map((member, i) => {
              const angle = (i / TEAM.length) * 2 * Math.PI - Math.PI / 2; // Start from top
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  whileInView={{ 
                    opacity: 1, 
                    scale: 1,
                    x: `calc(cos(${angle}rad) * 35vmin)`,
                    y: `calc(sin(${angle}rad) * 35vmin)`
                  }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 1.5, 
                    delay: i * 0.1, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="absolute group z-20 cursor-pointer"
                >
                  <div className="relative w-16 h-16 md:w-24 md:h-24">
                    {/* Hover Rings */}
                    <div className={`absolute inset-[-10px] rounded-full bg-gradient-to-tr ${member.hue} opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-500`} />
                    <div className="absolute inset-[-4px] rounded-full border border-white/20 scale-90 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-[spin_4s_linear_infinite]" style={{ borderStyle: 'dotted' }} />
                    <div className="absolute inset-[-12px] rounded-full border border-white/10 scale-90 group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-75 animate-[spin_6s_linear_infinite_reverse]" style={{ borderStyle: 'dashed' }} />
                    
                    {/* Profile Image - Clickable Link */}
                    <Link to="/founder-connect" className="block w-full h-full rounded-full overflow-hidden border border-white/20 group-hover:border-cyan-400 transition-colors duration-500 relative z-10 bg-black shadow-2xl">
                      <img src={member.img} alt={member.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity mix-blend-luminosity group-hover:mix-blend-normal" />
                    </Link>

                    {/* Tooltip Overlay */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-6 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 min-w-[200px] flex flex-col items-center z-50">
                      <div className="glass-bento px-4 py-3 rounded-2xl border border-white/10 flex flex-col items-center text-center shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl bg-black/60">
                        <h4 className="text-sm font-semibold text-white whitespace-nowrap mb-1">{member.name}</h4>
                        <p className={`text-[10px] uppercase tracking-widest font-bold bg-gradient-to-r ${member.hue} text-transparent bg-clip-text mb-3`}>{member.role}</p>
                        <div className="flex gap-4 text-slate-400">
                          <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            <Linkedin className="w-4 h-4" />
                          </a>
                          <a href={member.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            <Github className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Connecting Lines (Laser links) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              {TEAM.map((_, i) => {
                const angleDeg = (i / TEAM.length) * 360 - 90;
                return (
                  <motion.div 
                    initial={{ opacity: 0, scaleX: 0, rotate: `${angleDeg}deg` }}
                    whileInView={{ opacity: 1, scaleX: 1, rotate: `${angleDeg}deg` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    key={`line-${i}`}
                    className="absolute top-1/2 left-1/2 h-[1px] origin-left"
                    style={{ 
                      width: '35vmin', 
                      marginTop: '-0.5px',
                      background: 'linear-gradient(90deg, rgba(34,211,238,0.5) 0%, rgba(34,211,238,0) 100%)'
                    }}
                  >
                    {/* Moving dot on the line */}
                    <div 
                      className="absolute top-[-1px] left-0 w-8 h-[3px] bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee] opacity-80"
                      style={{ 
                        animation: `flow ${2 + Math.random()}s linear infinite`,
                        animationDelay: `${Math.random()}s`
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
