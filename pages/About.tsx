import React from 'react';

import { motion } from 'framer-motion';
import { Users, Target, Award, TrendingUp, Clock } from 'lucide-react';

export const About: React.FC = () => {

    const stats = [
        { label: 'Personal Projects', value: '12+', icon: Target },
        { label: 'Hackathons Won', value: '10+', icon: Award },
        { label: 'Academic Year', value: '3rd', icon: TrendingUp },
        { label: 'Response Time', value: '<24hr', icon: Clock }
    ];

    const values = [
        {
            title: 'Fresh Perspective',
            description: 'Unburdened by legacy thinking, we bring raw energy and modern tech stacks.'
        },
        {
            title: 'Cross-Functional',
            description: 'Where complex backend logic meets strategic business planning.'
        },
        {
            title: 'Transparent',
            description: 'Clear communication, honest timelines, no corporate jargon.'
        },
        {
            title: 'Ambitious',
            description: 'We are students today, but we are building the industry leaders of tomorrow.'
        }
    ];

    const milestones = [
        { year: '2023', event: 'Team Formation in Campus Dorms' },
        { year: '2024', event: 'Building Individual Portfolios & Skills' },
        { year: '2025', event: 'Winning Campus Hackathons' },
        { year: '2026', event: 'KaizenStat Agency Official Launch' } // Changed "Jan 2026" to "2026" for consistency in style, but event implies Jan launch
    ];

    return (
        <div className="min-h-screen relative overflow-hidden">


            {/* COMPACT HERO */}
            <section className="relative pt-32 pb-16 px-6 md:px-0 flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block py-1.5 px-4 border border-lux-text/10 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-lux-muted bg-white/40 backdrop-blur-md mb-6"
                >
                    Est. Jan 2026
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.8 }}
                    className="font-serif text-4xl md:text-6xl text-lux-text mb-6 leading-tight max-w-4xl"
                >
                    3rd Year Tech. <br />
                    <span className="italic text-lux-muted font-light">1st Year Strategy.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-lg text-lux-muted max-w-2xl font-light leading-relaxed"
                >
                    We are a fusion of IT & CSE tech wizards and BBA strategic minds, building our legacy one project at a time.
                </motion.p>
            </section>

            {/* COMPACT STATS */}
            <section className="px-6 md:px-12 lg:px-24 pb-16">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05, duration: 0.5 }}
                                className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm text-center hover:border-gray-200 transition-colors"
                            >
                                <stat.icon className="w-5 h-5 mx-auto mb-3 text-lux-text/70" />
                                <div className="font-serif text-2xl md:text-3xl text-lux-text mb-1">{stat.value}</div>
                                <div className="text-[10px] md:text-xs text-lux-muted uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* STORY & IMAGE - Side by Side but tight */}
            <section className="px-6 md:px-12 lg:px-24 py-16 bg-gray-50/50">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-serif text-3xl md:text-4xl text-lux-text mb-6">Our Narrative</h2>
                        <div className="space-y-4 text-lux-muted/90 leading-relaxed text-sm md:text-base">
                            <p>
                                We represent the next generation of digital builders. While our peers are waiting for graduation to start, we are starting now.
                            </p>
                            <p>
                                By combining the technical prowess of 3rd-year Engineering students with the fresh business acumen of 1st-year Management students, we offer a unique blend of innovation and strategy.
                            </p>
                            <p>
                                We don't have decades of history, but we have the hunger to prove ourselves with every line of code and every pixel.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-video md:aspect-square rounded-[2rem] bg-white border border-gray-100 p-8 flex items-center justify-center shadow-sm">
                            <Users className="w-24 h-24 text-lux-text/10" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* VALUES & TIMELINE GRID */}
            <section className="px-6 md:px-12 lg:px-24 py-20">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Values */}
                    <div>
                        <h2 className="font-serif text-3xl text-lux-text mb-8 text-center lg:text-left">Our Values</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {values.map((value, index) => (
                                <div key={value.title} className="p-5 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors bg-white">
                                    <h4 className="font-bold text-sm text-lux-text mb-2">{value.title}</h4>
                                    <p className="text-xs text-lux-muted leading-relaxed">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div>
                        <h2 className="font-serif text-3xl text-lux-text mb-8 text-center lg:text-left">Journey So Far</h2>
                        <div className="space-y-6 md:pl-8 border-l border-gray-100 md:border-none">
                            {milestones.map((milestone, index) => (
                                <div key={index} className="flex gap-4 items-start pl-4 md:pl-0">
                                    <div className="w-12 h-12 shrink-0 rounded-full bg-lux-text/5 text-lux-text flex items-center justify-center font-serif text-xs font-bold">
                                        {milestone.year}
                                    </div>
                                    <div className="pt-2">
                                        <p className="text-sm text-lux-text/80">{milestone.event}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>



        </div>
    );
};
