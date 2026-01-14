import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Users, Code, Lightbulb, Target } from 'lucide-react';

export const HowWeWork: React.FC = () => {
    return (
        <section className="py-24 px-6 lg:px-24 relative z-10 bg-gradient-to-b from-white/40 to-transparent">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <span className="inline-block py-2 px-6 border border-lux-text/10 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase text-lux-muted bg-white/40 backdrop-blur-md mb-6">
                        Our Unique Model
                    </span>
                    <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-lux-text mb-6">
                        Dual-Purpose <span className="italic text-lux-muted">Excellence</span>
                    </h2>
                    <p className="text-lg text-lux-muted font-light leading-relaxed max-w-3xl mx-auto">
                        We're building brand awareness through student engagement while delivering exceptional client work through seasoned professionals—two parallel tracks driving innovation.
                    </p>
                </motion.div>

                {/* Two-Track System */}
                <div className="grid lg:grid-cols-2 gap-12 mb-20">
                    {/* Student Community Track */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-gradient-to-br from-purple-50/80 to-blue-50/80 backdrop-blur-lg border border-purple-100/60 rounded-[3rem] p-10"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Users className="w-8 h-8 text-purple-600" />
                            <h3 className="font-serif text-3xl font-medium text-lux-text">Student Community</h3>
                        </div>
                        <p className="text-lux-muted mb-8 leading-relaxed">
                            Students from IIT Madras & MAKAUT lead our community initiatives, organizing hackathons and events to build brand awareness.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Code className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-lux-text mb-1">Hackathons & Events</h4>
                                    <p className="text-sm text-lux-muted">Organize and participate in coding competitions and tech events</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Lightbulb className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-lux-text mb-1">Workshops & Learning</h4>
                                    <p className="text-sm text-lux-muted">Skill development sessions and knowledge sharing</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Users className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-lux-text mb-1">Networking & Growth</h4>
                                    <p className="text-sm text-lux-muted">Build connections and grow the tech community</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Professional Services Track */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-gradient-to-br from-emerald-50/80 to-teal-50/80 backdrop-blur-lg border border-emerald-100/60 rounded-[3rem] p-10"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Target className="w-8 h-8 text-emerald-600" />
                            <h3 className="font-serif text-3xl font-medium text-lux-text">Professional Services</h3>
                        </div>
                        <p className="text-lux-muted mb-8 leading-relaxed">
                            Experienced professionals deliver high-quality Web Development, AI/ML, and Data Analytics solutions to our clients.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Code className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-lux-text mb-1">Web Development</h4>
                                    <p className="text-sm text-lux-muted">Modern, scalable web applications and solutions</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Lightbulb className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-lux-text mb-1">AI/ML Solutions</h4>
                                    <p className="text-sm text-lux-muted">Intelligent systems and machine learning implementations</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Target className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-lux-text mb-1">Data Analytics</h4>
                                    <p className="text-sm text-lux-muted">Data-driven insights and strategic analysis</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Connection Point */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center bg-white/60 backdrop-blur-lg border border-white/60 rounded-3xl p-12"
                >
                    <ArrowUpRight className="w-12 h-12 mx-auto mb-6 text-lux-text" />
                    <h3 className="font-serif text-3xl font-medium text-lux-text mb-4">
                        The Connection
                    </h3>
                    <p className="text-lux-muted leading-relaxed max-w-2xl mx-auto">
                        Our student-run community activities build brand awareness and trust in the market, while our professional team ensures
                        exceptional project delivery. This unique model combines youthful innovation with seasoned expertise.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
