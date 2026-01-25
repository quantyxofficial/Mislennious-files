import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Code, Briefcase, TrendingUp, ArrowRight, Linkedin } from 'lucide-react';

const TEAM = [
    {
        id: 0,
        name: "Abhishikta Dutta",
        role: "[Founder] Technology & Product",
        bio: "Building predictive models that anticipate user behavior. Every algorithm is optimized for maximum impact.",
        edu: "Top Institutes",
        linkedin: "https://www.linkedin.com/in/abhishikta-dutta-99a73838b/",
        icon: Briefcase,
        color: "bg-teal-500",
        image: "/team/Abhishikta_Dutta.jpeg"
    },
    {
        id: 1,
        name: "Kriti Sharma",
        role: "[Founder] Operations & Strategy",
        bio: "Translating market signals into ROI. Bridges the gap between technical data science and business revenue.",
        edu: "Top Institutes",
        linkedin: "https://www.linkedin.com/in/kriti-sharma-795116377/",
        icon: TrendingUp,
        color: "bg-purple-500",
        image: "/team/Kriti_Sharma_new.jpg"
    },
    /* Hidden as per request
    {
        id: 2,
        name: "Masuddar Rahaman",
        role: "Lead Engineer & Architect",
        bio: "Focused on high-performance pipelines. Turns raw data into actionable growth engines with engineering precision.",
        edu: "Top Institutes",
        linkedin: "https://www.linkedin.com/in/masuddar-rahaman/",
        icon: Code,
        color: "bg-blue-500",
        image: "/team/Masuddar_Rahaman.jpeg"
    }
    */
];

export const Team: React.FC = () => {
    const [activeId, setActiveId] = useState(0);

    return (
        <section id="agency" className="py-24 md:py-32 px-6 lg:px-24 relative z-10">
            <div className="max-w-[1300px] mx-auto">

                <div className="mb-12 md:mb-16">
                    <h2 className="font-serif text-5xl md:text-6xl text-lux-text">The Architects</h2>
                    <p className="text-lux-muted mt-4 max-w-lg">
                        We are a collective of engineers and scholars. Hover to view profiles.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

                    {/* Left Column: Interactive List */}
                    <div className="lg:col-span-5 flex flex-col gap-2 pt-4">
                        {TEAM.map((member) => (
                            <div
                                key={member.id}
                                onMouseEnter={() => setActiveId(member.id)}
                                onClick={() => setActiveId(member.id)} // Added for Mobile/Touch
                                className={`group cursor-pointer relative py-5 md:py-8 border-b border-lux-text/10 transition-all duration-300 ${activeId === member.id ? 'pl-8' : 'pl-0 hover:pl-4'}`}
                            >
                                {/* Active Indicator Line */}
                                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-lux-text transition-all duration-300 ${activeId === member.id ? 'h-12 opacity-100' : 'h-0 opacity-0'}`} />

                                <div className="flex items-center justify-between">
                                    <h3 className={`font-serif text-2xl md:text-4xl transition-colors duration-300 ${activeId === member.id ? 'text-lux-text' : 'text-lux-muted/40'}`}>
                                        {member.name}
                                    </h3>
                                    <ArrowRight className={`w-5 h-5 transition-all duration-300 ${activeId === member.id ? 'opacity-100 -rotate-45 text-lux-text' : 'opacity-0 -translate-x-4'}`} />
                                </div>
                                <p className={`text-xs uppercase tracking-widest mt-2 transition-all duration-300 ${activeId === member.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 h-0 overflow-hidden'}`}>
                                    {member.role}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Dynamic Detail Card (Glass) */}
                    {/* Added lg:-mt-20 to pull the card up significantly */}
                    <div className="lg:col-span-7 relative min-h-[350px] md:min-h-[400px] lg:-mt-20 mt-8 lg:mt-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeId}
                                initial={{ opacity: 0, y: 10, filter: 'blur(8px)', scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                                exit={{ opacity: 0, y: -10, filter: 'blur(4px)', scale: 0.98 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 450, // High stiffness for instant "Apple" response
                                    damping: 35,    // No wobbling, just precise snap
                                    mass: 0.8
                                }}
                                className="w-full bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative overflow-hidden will-change-transform"
                            >
                                {/* Ambient Glow based on member color - Optimized Blur */}
                                <div className={`absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-3xl opacity-20 translate-x-1/3 -translate-y-1/3 ${TEAM[activeId].color}`} />

                                <div className="relative z-10">
                                    {/* Profile Image Header */}
                                    <div className="flex justify-between items-start mb-8 md:mb-10">
                                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/50 border border-white/60 overflow-hidden shadow-sm p-1 group">
                                            <img
                                                src={TEAM[activeId].image}
                                                alt={TEAM[activeId].name}
                                                className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-700"
                                            />
                                        </div>
                                        <div className="px-3 py-2 md:px-4 md:py-2 rounded-full border border-lux-text/10 bg-white/30 backdrop-blur-sm text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-semibold">
                                            Data Science Collective
                                        </div>
                                    </div>

                                    <h3 className="text-2xl md:text-4xl font-serif text-lux-text mb-2">
                                        {TEAM[activeId].name}
                                    </h3>
                                    <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-lux-muted mb-6 md:mb-8">
                                        {TEAM[activeId].role}
                                    </p>

                                    <div className="h-px w-full bg-gradient-to-r from-lux-text/20 to-transparent mb-6 md:mb-8" />

                                    <p className="text-lg md:text-xl text-lux-text/80 leading-relaxed font-light mb-8 md:mb-10">
                                        "{TEAM[activeId].bio}"
                                    </p>

                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-3 text-lux-muted/80 bg-white/30 p-4 rounded-xl inline-flex backdrop-blur-sm border border-white/20">
                                            <GraduationCap className="w-5 h-5" />
                                            <span className="text-xs md:text-sm font-medium tracking-wide">{TEAM[activeId].edu}</span>
                                        </div>

                                        <a
                                            href={TEAM[activeId].linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-4 bg-white/30 rounded-xl hover:bg-white/50 hover:text-blue-600 transition-all border border-white/20 backdrop-blur-sm group/linkedin"
                                        >
                                            <Linkedin className="w-5 h-5 text-lux-muted/80 group-hover/linkedin:text-blue-600 transition-colors" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
};