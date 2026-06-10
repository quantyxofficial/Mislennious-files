import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Medal, Star, Award, Code2, GitMerge, MessageSquare, Database, ChevronLeft, ChevronRight } from 'lucide-react';

const TIERS = [
  {
    icon: <Trophy className="w-6 h-6 text-cyan-400" />,
    title: "Top 5 Contributors",
    rewards: ["Premium Swag Kit", "Direct Interview Referrals", "Featured Profile Spotlight", "Certificate of Excellence"]
  },
  {
    icon: <Medal className="w-6 h-6 text-purple-400" />,
    title: "Top 20 Contributors",
    rewards: ["Exclusive Event T-Shirt", "Community Recognition", "Certificate of Achievement"]
  },
  {
    icon: <Star className="w-6 h-6 text-slate-300" />,
    title: "All Active Participants",
    rewards: ["Certificate of Participation", "Open Source Contribution Graph", "Access to Mentors"]
  }
];

const SCORING = [
  { action: "Pull Request Merged", points: "+500 KP", icon: <GitMerge className="w-4 h-4 text-emerald-400" /> },
  { action: "Issue Resolved", points: "+200 KP", icon: <Code2 className="w-4 h-4 text-blue-400" /> },
  { action: "Dataset Cleaned (10GB+)", points: "+300 KP", icon: <Database className="w-4 h-4 text-purple-400" /> },
  { action: "Code Review / Feedback", points: "+50 KP", icon: <MessageSquare className="w-4 h-4 text-slate-300" /> }
];

function ChangingSwagBox() {
  const swagItems = [
    {
      src: "https://swag.golf/cdn/shop/files/IMG_1122_3600_b859831b-8918-4a7e-849b-090c3e8fa81a.jpg?v=1617253197",
      title: "Top 10",
      desc: "Get top-tier tech gear physically shipped to your door."
    },
    {
      src: "https://www.godelta.com/hubfs/Blog-Images/swag-bag/What-Is-A-Swag-Bag_Hero.jpg",
      title: "Top 20",
      desc: "Earn premium apparel and keys, delivered to you."
    },
    {
      src: "https://tse1.mm.bing.net/th/id/OIP.t0hrIjngalRLRRlwY0aVtwHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      title: "All Contributors",
      desc: "Access digital rewards and community recognition."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % swagItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? swagItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % swagItems.length);
  };

  return (
    <div className="flex-1 w-full h-[400px] relative rounded-3xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl group/box">
       <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={swagItems[currentIndex].src}
              className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity"
              alt="Swag item"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
              <span className="text-cyan-400 font-mono text-sm tracking-widest mb-2">{swagItems[currentIndex].title}</span>
              <p className="text-white text-xl font-light tracking-tight">{swagItems[currentIndex].desc}</p>
            </div>
          </motion.div>
       </AnimatePresence>

       {/* Manual Controls */}
       <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-20 opacity-0 group-hover/box:opacity-100 transition-opacity duration-300">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
       </div>
       
       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {swagItems.map((_, i) => (
             <button 
                key={i} 
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 hover:bg-cyan-400/50 ${i === currentIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-white/30'}`} 
             />
          ))}
       </div>
    </div>
  );
}

export function Rewards() {
  return (
    <section className="w-full py-32 bg-transparent border-t border-white/5 relative z-10 overflow-hidden" id="rewards">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="flex-1">
            <div className="text-left mb-12">
              <div className="flex items-center gap-4 mb-4 text-[10px] font-mono text-cyan-400/80 uppercase tracking-[0.3em]">
                 <span className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                    KSoC Leaderboard & Recognition
                 </span>
                 <div className="h-[1px] w-8 bg-cyan-400/20" />
              </div>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-white mb-6">
                Transparent Systems. <br/><span className="text-slate-400 italic font-light">Real Impact.</span>
              </h2>
              <p className="text-sm md:text-base text-slate-400 font-light max-w-xl">
                Every contribution is parsed via GitHub webhooks. You earn KaizenPoints (KP) for every PR merged, issue resolved, and fellow student helped. The transparent leaderboard drives fair competition.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
               {SCORING.map((item, idx) => (
                 <div key={idx} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center border border-white/10">
                         {item.icon}
                       </div>
                       <span className="text-sm text-slate-300 font-light">{item.action}</span>
                    </div>
                    <span className="text-xs font-mono font-bold tracking-widest text-white">{item.points}</span>
                 </div>
               ))}
            </div>
            
            <p className="text-xs font-mono text-slate-500">
              * Rankings are updated daily at 00:00 UTC. Disputed PR points are resolved by mentors.
            </p>
          </div>

          <div className="flex-1 grid grid-cols-1 gap-4">
            {TIERS.map((tier, i) => (
              <motion.div 
                key={tier.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-6 rounded-2xl border flex flex-col md:flex-row items-start md:items-center gap-6 transition-colors
                  ${i === 0 ? 'bg-gradient-to-r from-cyan-500/10 to-transparent border-cyan-500/20' : 
                    'bg-white/[0.02] border-white/5 hover:border-white/10'}
                `}
              >
                <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center
                  ${i === 0 ? 'bg-cyan-500/10 border border-cyan-500/30' : 'bg-black/40 border border-white/10'}
                `}>
                  {tier.icon}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white/90 mb-2">{tier.title}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {tier.rewards.map((reward, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <Award className="w-3.5 h-3.5 text-white/40" />
                        <span className="text-xs text-slate-300 font-light">{reward}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Home Delivered Swag Visuals */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mt-24 pt-16 border-t border-white/5 relative"
        >
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                 <span className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-[0.3em]">Global Fulfillment</span>
                 <div className="h-[1px] w-8 bg-cyan-400/20" />
              </div>
              <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6">
                Exclusive drops, <br/> <span className="italic text-slate-400 font-light">shipped to your door.</span>
              </h3>
              <p className="text-slate-400 font-light mb-8 max-w-md text-base leading-relaxed">
                Top contributors receive high-quality, custom-designed merch boxes. These aren't just stickers—expect premium apparel, hardware keys, and collector's node operator tokens.
              </p>
              <div className="flex gap-8">
                 <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
                    <span className="text-3xl text-white font-mono">100+</span>
                    <span className="text-xs uppercase tracking-widest text-slate-500">Kits Distributed</span>
                 </div>
                 <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
                    <span className="text-3xl text-white font-mono">24</span>
                    <span className="text-xs uppercase tracking-widest text-slate-500">Countries Shipped</span>
                 </div>
              </div>
            </div>

            <ChangingSwagBox />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
