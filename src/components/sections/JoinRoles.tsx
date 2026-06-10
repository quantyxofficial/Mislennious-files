import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Users, ArrowRight, Network, Building2 } from 'lucide-react';
import { JoinModal } from './JoinModal';

const ROLES = [
  {
    title: "Contributor",
    icon: User,
    colorClasses: {
      wrapper: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
      glow: "from-cyan-500/20"
    },
    desc: "Dive into real-world ML repositories. Fix bugs, optimize models, and earn rewards while building your portfolio alongside industry leaders.",
    benefits: ["Mentorship", "Premium Swags", "Certificate"],
    linkText: "Apply as Contributor",
    layout: "pill",
    gridClass: "md:col-span-2"
  },
  {
    title: "Mentor",
    icon: Users,
    colorClasses: {
      wrapper: "bg-purple-500/10 border-purple-500/20 text-purple-400",
      glow: "from-purple-500/20"
    },
    desc: "Guide the next generation of AI engineers and shape the learning path.",
    benefits: ["Leadership", "Networking"],
    linkText: "Join as Mentor",
    layout: "circle",
    gridClass: "col-span-1"
  },
  {
    title: "Campus Partner",
    icon: Network,
    colorClasses: {
      wrapper: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
      glow: "from-emerald-500/20"
    },
    desc: "Bring KSoC to your university to organize local chapters & events.",
    benefits: ["Sponsorships", "Exclusive Swag Boxes"],
    linkText: "Become a Partner",
    layout: "circle",
    gridClass: "col-span-1"
  },
  {
    title: "Company Sponsor",
    icon: Building2,
    colorClasses: {
      wrapper: "bg-amber-500/10 border-amber-500/20 text-amber-400",
      glow: "from-amber-500/20"
    },
    desc: "Is your organization building open-source tech? Partner with us to get your issues resolved by top student talent globally.",
    benefits: ["Brand visibility", "Elite talent pool", "Dedicated contributors"],
    linkText: "Partner with Us",
    layout: "pill",
    gridClass: "md:col-span-2"
  }
];

export function JoinRoles() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Contributor");

  const handleOpenModal = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    setIsModalOpen(true);
  };

  return (
    <section className="py-16 relative z-10 overflow-hidden" id="joinus">
      {/* Decorative ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/70 font-mono text-[9px] uppercase tracking-widest mx-auto"
          >
            Find Your Path
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-white mb-4"
          >
            Find Your <span className="text-slate-400 italic font-light">Role.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 font-light text-base max-w-2xl mx-auto"
          >
            Whether you want to write code, guide others, or bring your organization's projects.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4 auto-rows-fr">
          {ROLES.map((role, idx) => {
            const isCircle = role.layout === 'circle';
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative backdrop-blur-2xl bg-[#09090b]/80 hover:bg-[#09090b]/90 border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500 overflow-hidden flex flex-col justify-center
                  ${role.gridClass} 
                  ${isCircle 
                    ? 'rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-8 items-center text-center' 
                    : 'rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 items-start md:flex-row md:items-center gap-4 md:gap-6'}`}
              >
                {/* Background Glow */}
                <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${role.colorClasses.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay`} />
                
                {/* Icon Container */}
                <div className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-[1rem] md:rounded-full flex items-center justify-center border shadow-xl relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 ${role.colorClasses.wrapper} ${isCircle ? 'mb-3 md:mb-4' : 'md:order-2 md:ml-auto'}`}>
                  <role.icon className="w-6 h-6 md:w-7 md:h-7 opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className={`relative z-10 flex flex-col ${isCircle ? 'items-center' : 'items-start'} max-w-xl`}>
                  <h3 className={`text-xl md:text-2xl font-medium tracking-tight text-white mb-1.5 md:mb-2`}>{role.title}</h3>
                  <p className={`text-slate-300 font-light leading-snug mb-4 md:mb-5 ${isCircle ? 'text-[10px] md:text-xs max-w-[200px]' : 'text-xs md:text-sm'}`}>
                    {role.desc}
                  </p>
                  
                  <div className={`flex flex-wrap gap-1.5 mb-4 md:mb-6 ${isCircle ? 'justify-center' : ''}`}>
                    {role.benefits.map((benefit, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[9px] md:text-[10px] text-slate-200 font-mono tracking-wide">
                        {benefit}
                      </span>
                    ))}
                  </div>

                  <button 
                    onClick={() => handleOpenModal(role.title)}
                    className={`group/btn relative rounded-full overflow-hidden border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-md transition-all duration-300 flex items-center gap-2.5 ${isCircle ? 'px-4 py-2' : 'px-5 py-2.5'}`}
                  >
                    <span className={`relative z-10 font-semibold text-white tracking-wide uppercase ${isCircle ? 'text-[9px] sm:text-[10px]' : 'text-[10px]'}`}>
                      {role.linkText}
                    </span>
                    <ArrowRight className="relative z-10 w-3.5 h-3.5 text-slate-400 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <JoinModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        defaultRole={selectedRole}
      />
    </section>
  );
}
