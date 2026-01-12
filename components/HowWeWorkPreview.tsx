import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowWeWorkPreview: React.FC = () => {
    return (
        <section className="py-12 px-6 lg:px-24 relative z-10">
            <div className="max-w-[1400px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative overflow-hidden bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-white/40 backdrop-blur-xl border border-white/60 rounded-[3rem] p-8 md:p-10 shadow-xl"
                >
                    {/* Decorative gradient orb */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-200/40 to-blue-200/40 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="inline-flex items-center gap-2 mb-3"
                            >
                                <Sparkles className="w-5 h-5 text-purple-600" />
                                <h2 className="font-serif text-3xl md:text-4xl font-medium text-lux-text">
                                    Dual-Purpose <span className="italic text-lux-muted">Excellence</span>
                                </h2>
                            </motion.div>
                            <p className="text-lux-muted max-w-2xl mx-auto leading-relaxed">
                                Where student innovation meets professional delivery
                            </p>
                        </div>

                        {/* Two Track Cards - Horizontal */}
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="bg-gradient-to-br from-purple-100/60 to-blue-100/40 backdrop-blur-md border border-purple-200/50 rounded-2xl p-6 hover:scale-[1.02] transition-transform"
                            >
                                <Users className="w-8 h-8 text-purple-600 mb-3" />
                                <h3 className="font-serif text-xl font-medium text-lux-text mb-2">Student Community</h3>
                                <p className="text-sm text-lux-muted">Hackathons & brand awareness</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="bg-gradient-to-br from-emerald-100/60 to-teal-100/40 backdrop-blur-md border border-emerald-200/50 rounded-2xl p-6 hover:scale-[1.02] transition-transform"
                            >
                                <Target className="w-8 h-8 text-emerald-600 mb-3" />
                                <h3 className="font-serif text-xl font-medium text-lux-text mb-2">Professional Team</h3>
                                <p className="text-sm text-lux-muted">Web, AI/ML & Data Analytics</p>
                            </motion.div>
                        </div>

                        {/* CTA */}
                        <div className="text-center">
                            <Link
                                to="/about"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-lux-text text-white font-semibold text-xs tracking-wider uppercase rounded-full hover:bg-black transition-all"
                                data-hover
                            >
                                Learn Our Story
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
