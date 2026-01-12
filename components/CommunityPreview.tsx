import React from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, Code, ArrowUpRight, Sparkles, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CommunityPreview: React.FC = () => {
    return (
        <section className="py-20 px-6 lg:px-24 relative z-10 overflow-hidden">
            {/* Subtle Aurora Background Overlay */}
            <div className="absolute top-0 left-1/4 w-[50%] h-full bg-gradient-to-b from-purple-500/5 via-blue-500/5 to-transparent blur-[120px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto">
                {/* Sleek Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-baseline gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex-grow"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-px bg-lux-text/10" />
                            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-lux-muted">The Movement</span>
                        </div>
                        <h2 className="font-serif text-4xl md:text-6xl font-medium text-lux-text tracking-tight">
                            Build. Learn. <span className="italic font-light text-lux-muted">Connect.</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <Link
                            to="/events"
                            className="group flex items-center gap-3 px-8 py-4 bg-white/40 backdrop-blur-md border border-lux-text/5 text-lux-text rounded-full hover:bg-lux-text hover:text-white transition-all duration-500 shadow-sm"
                            data-hover
                        >
                            <span className="font-bold tracking-[0.2em] text-[10px] uppercase">Explore Events</span>
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                {/* Refined Bento Grid - Professional & Compact */}
                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5 auto-rows-[140px]">

                    {/* 1. Feature Hero - Large Grid Item */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="md:col-span-6 lg:col-span-7 row-span-3 bg-white/40 backdrop-blur-3xl border border-white/60 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-10 flex flex-col justify-between group overflow-hidden"
                    >
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-lux-text text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="font-serif text-3xl md:text-4xl text-lux-text font-medium mb-4 leading-tight">A global network of <br /><span className="italic font-light text-lux-muted">500+ Innovators.</span></h3>
                            <p className="text-lux-muted/80 max-w-sm text-sm leading-relaxed font-light">
                                Join an elite collective of creators from IIT Madras & MAKAUT shaping the next digital frontier.
                            </p>
                        </div>

                        <div className="relative z-10 flex flex-wrap items-center gap-4 pt-6 mt-8 border-t border-lux-text/5">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center overflow-hidden text-[9px] font-bold text-lux-muted shadow-sm">
                                        {i === 4 ? '+496' : ''}
                                    </div>
                                ))}
                            </div>
                            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-lux-muted/40">Active Globally</span>
                        </div>
                    </motion.div>

                    {/* 2. Secondary Bento Item - Professional Gradient */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-6 lg:col-span-5 row-span-2 bg-gradient-to-br from-lux-text to-gray-800 rounded-[2.5rem] p-10 text-white flex flex-col justify-between shadow-xl relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all duration-700">
                            <Globe className="w-24 h-24" />
                        </div>
                        <div>
                            <div className="text-4xl font-serif font-medium text-white mb-2 tracking-tight">12+ Cities</div>
                            <div className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40">Connected Campus Network</div>
                        </div>
                        <p className="text-xs text-white/50 leading-relaxed font-light max-w-[200px]">
                            Breaking boundaries through cross-campus innovation.
                        </p>
                    </motion.div>

                    {/* 3. Small Bento - Stat A */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-3 lg:col-span-2 row-span-1 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-sm group hover:bg-white/60 transition-colors duration-500"
                    >
                        <Trophy className="w-5 h-5 text-amber-500 mb-2 group-hover:translate-y-[-2px] transition-transform" />
                        <div className="text-2xl font-serif font-medium text-lux-text">8+</div>
                        <div className="text-[8px] font-bold tracking-[0.1em] uppercase text-lux-muted/60">Hackathons</div>
                    </motion.div>

                    {/* 4. Small Bento - Stat B */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-3 lg:col-span-3 row-span-1 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-sm group hover:bg-white/60 transition-colors duration-500"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-2xl font-serif font-medium text-lux-text">100+</span>
                        </div>
                        <div className="text-[8px] font-bold tracking-[0.1em] uppercase text-lux-muted/60">Global Projects</div>
                    </motion.div>

                    {/* 5. Wide Bento Bottom - Heritage */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="col-span-full lg:col-span-5 lg:col-start-8 row-span-1 bg-gradient-to-tr from-white/20 to-white/60 backdrop-blur-xl border border-white/80 rounded-3xl px-8 flex items-center justify-between group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-lux-text/5 flex items-center justify-center group-hover:bg-lux-text/10 transition-colors">
                                <Code className="w-5 h-5 text-lux-text" />
                            </div>
                            <div>
                                <div className="text-sm font-serif font-medium text-lux-text">Open Source Heritage</div>
                                <p className="text-[10px] text-lux-muted/60 font-light">Architecting systems used by thousands.</p>
                            </div>
                        </div>
                        <Sparkles className="w-4 h-4 text-amber-500 opacity-40" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
