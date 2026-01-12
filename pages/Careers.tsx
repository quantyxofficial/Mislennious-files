import React from 'react';
import { motion } from 'framer-motion';
import { CAREER_POSITIONS } from '../constants';
import { MapPin, Briefcase, Clock, Users } from 'lucide-react';

export const Careers: React.FC = () => {
    const perks = [
        { icon: '🏠', title: 'Remote First', description: 'Work from anywhere in India' },
        { icon: '💰', title: 'Competitive Pay', description: 'Industry-leading compensation' },
        { icon: '📚', title: 'Learning Budget', description: '₹50K/year for courses & conferences' },
        { icon: '🏋️', title: 'Health & Wellness', description: 'Premium health insurance' },
        { icon: '🌴', title: 'Unlimited PTO', description: 'Take time off when you need it' },
        { icon: '💻', title: 'Latest Tech', description: 'Top-tier hardware & software' }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center justify-center px-6 md:px-12 pt-32 pb-20">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-block py-2 px-6 border border-lux-text/10 rounded-full text-xs font-bold tracking-[0.3em] uppercase text-lux-muted bg-white/40 backdrop-blur-md mb-8"
                    >
                        Join Our Team
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-serif text-5xl md:text-7xl lg:text-8xl text-lux-text mb-8 leading-tight"
                    >
                        Build Your Career<br />
                        <span className="italic font-light text-lux-muted">With Excellence</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl text-lux-muted leading-relaxed max-w-2xl mx-auto"
                    >
                        Join a team of Data Scientists, Engineers, and Designers working on challenging problems
                        for world-class clients. We're building the future of digital intelligence.
                    </motion.p>
                </div>
            </section>

            {/* Why Join Us */}
            <section className="px-6 md:px-12 lg:px-24 py-20 md:py-32 bg-gradient-to-b from-transparent via-white/30 to-transparent">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl md:text-5xl text-lux-text mb-6">Why KaizenStat?</h2>
                        <p className="text-lux-muted text-lg max-w-2xl mx-auto">
                            We're not just another agency. We're a collective of passionate professionals committed to excellence.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {perks.map((perk, index) => (
                            <motion.div
                                key={perk.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl text-center"
                            >
                                <div className="text-5xl mb-4">{perk.icon}</div>
                                <h3 className="font-serif text-xl text-lux-text mb-2">{perk.title}</h3>
                                <p className="text-sm text-lux-muted">{perk.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="px-6 md:px-12 lg:px-24 py-20 md:py-32">
                <div className="max-w-[1000px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl md:text-5xl text-lux-text mb-6">Open Positions</h2>
                        <p className="text-lux-muted text-lg">Find your perfect role and apply today</p>
                    </div>

                    <div className="space-y-6">
                        {CAREER_POSITIONS.map((position, index) => (
                            <motion.div
                                key={position.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="group rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl overflow-hidden hover:bg-white/70 transition-all cursor-pointer"
                                data-hover
                            >
                                <div className="p-8">
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
                                        <div>
                                            <h3 className="font-serif text-3xl text-lux-text mb-3">{position.title}</h3>
                                            <div className="flex flex-wrap gap-4 text-sm text-lux-muted">
                                                <span className="flex items-center gap-2">
                                                    <Briefcase className="w-4 h-4" />
                                                    {position.department}
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4" />
                                                    {position.location}
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4" />
                                                    {position.type}
                                                </span>
                                            </div>
                                        </div>
                                        <button className="px-8 py-3 bg-lux-text text-white rounded-full text-sm font-semibold hover:bg-black transition-all whitespace-nowrap self-start lg:self-center" data-hover>
                                            Apply Now
                                        </button>
                                    </div>

                                    <p className="text-lux-muted mb-6 leading-relaxed">{position.description}</p>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div>
                                            <h4 className="font-serif text-lg text-lux-text mb-3">Responsibilities</h4>
                                            <ul className="space-y-2">
                                                {position.responsibilities.map((resp, idx) => (
                                                    <li key={idx} className="text-sm text-lux-muted flex items-start gap-2">
                                                        <span className="text-lux-text mt-1">•</span>
                                                        {resp}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-serif text-lg text-lux-text mb-3">Requirements</h4>
                                            <ul className="space-y-2">
                                                {position.requirements.map((req, idx) => (
                                                    <li key={idx} className="text-sm text-lux-muted flex items-start gap-2">
                                                        <span className="text-lux-text mt-1">•</span>
                                                        {req}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Form Section (Placeholder for Formsphere) */}
            <section className="px-6 md:px-12 lg:px-24 py-20 md:py-32 bg-gradient-to-b from-transparent via-white/30 to-transparent">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <Users className="w-16 h-16 mx-auto mb-6 text-lux-text" />
                        <h2 className="font-serif text-4xl md:text-5xl text-lux-text mb-6">
                            Don't see your role?
                        </h2>
                        <p className="text-lux-muted text-lg mb-8">
                            We're always looking for exceptional talent. Send us your resume and we'll keep you in mind for future opportunities.
                        </p>
                    </div>

                    <form className="p-10 rounded-[3rem] bg-white/50 border border-white/60 backdrop-blur-xl space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="px-6 py-4 rounded-2xl bg-white/80 border border-lux-text/10 text-lux-text placeholder:text-lux-muted/50 focus:outline-none focus:ring-2 focus:ring-lux-text/20"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="px-6 py-4 rounded-2xl bg-white/80 border border-lux-text/10 text-lux-text placeholder:text-lux-muted/50 focus:outline-none focus:ring-2 focus:ring-lux-text/20"
                            />
                        </div>
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full px-6 py-4 rounded-2xl bg-white/80 border border-lux-text/10 text-lux-text placeholder:text-lux-muted/50 focus:outline-none focus:ring-2 focus:ring-lux-text/20"
                        />
                        <input
                            type="text"
                            placeholder="LinkedIn Profile (optional)"
                            className="w-full px-6 py-4 rounded-2xl bg-white/80 border border-lux-text/10 text-lux-text placeholder:text-lux-muted/50 focus:outline-none focus:ring-2 focus:ring-lux-text/20"
                        />
                        <textarea
                            placeholder="Tell us about yourself and what you're looking for..."
                            rows={5}
                            className="w-full px-6 py-4 rounded-2xl bg-white/80 border border-lux-text/10 text-lux-text placeholder:text-lux-muted/50 focus:outline-none focus:ring-2 focus:ring-lux-text/20 resize-none"
                        />
                        <button
                            type="submit"
                            className="w-full px-10 py-4 bg-lux-text text-white font-semibold text-sm tracking-[0.2em] uppercase hover:bg-black transition-all rounded-full"
                            data-hover
                        >
                            Submit Application
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};
