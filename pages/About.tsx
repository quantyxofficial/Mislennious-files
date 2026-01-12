import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Zap, Award, TrendingUp, Clock } from 'lucide-react';
import { HowWeWork } from '../components/HowWeWork';

export const About: React.FC = () => {
    const stats = [
        { label: 'Projects Delivered', value: '150+', icon: Target },
        { label: 'Client Satisfaction', value: '98%', icon: Award },
        { label: 'Years of Excellence', value: '5+', icon: TrendingUp },
        { label: 'Response Time', value: '<24hr', icon: Clock }
    ];

    const values = [
        {
            title: 'Data-Driven',
            description: 'Every decision backed by analytics and measurable outcomes'
        },
        {
            title: 'Excellence First',
            description: 'We don\'t ship until it meets our uncompromising standards'
        },
        {
            title: 'Transparent',
            description: 'Clear communication, honest timelines, no surprises'
        },
        {
            title: 'Innovative',
            description: 'Constantly learning and implementing cutting-edge solutions'
        }
    ];

    const milestones = [
        { year: '2019', event: 'Founded by IIT Madras Data Science scholars' },
        { year: '2020', event: 'Launched AI/ML practice, served first SaaS clients' },
        { year: '2022', event: 'Expanded to 20+ team members, opened Mumbai office' },
        { year: '2024', event: 'Crossed $5M in client revenue generated' },
        { year: '2025', event: 'Named "Top Digital Agency" by StartupIndia' }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center px-6 md:px-12 pt-32 pb-20">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-block py-2 px-6 border border-lux-text/10 rounded-full text-xs font-bold tracking-[0.3em] uppercase text-lux-muted bg-white/40 backdrop-blur-md mb-8"
                    >
                        About KaizenStat
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-serif text-5xl md:text-7xl lg:text-8xl text-lux-text mb-8 leading-tight"
                    >
                        Student-Led. <br />
                        <span className="italic font-light text-lux-muted">Professionally Delivered.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl text-lux-muted leading-relaxed max-w-3xl mx-auto"
                    >
                        We're a unique agency run by students from IIT Madras and MAKAUT, organizing hackathons and building communities
                        for brand awareness—while our professional team delivers exceptional Web Development, AI/ML, and Data Analytics services to clients.
                    </motion.p>
                </div>
            </section>

            {/* How We Work Section - Full Detail */}
            <HowWeWork />

            {/* Stats Section */}
            <section className="px-6 md:px-12 lg:px-24 py-20 md:py-32">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl text-center"
                            >
                                <stat.icon className="w-8 h-8 mx-auto mb-4 text-lux-text" />
                                <div className="font-serif text-4xl md:text-5xl text-lux-text mb-2">{stat.value}</div>
                                <div className="text-sm text-lux-muted">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="px-6 md:px-12 lg:px-24 py-20 md:py-32">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="font-serif text-4xl md:text-6xl text-lux-text mb-6">Our Story</h2>
                            <div className="space-y-4 text-lux-muted leading-relaxed">
                                <p>
                                    KaizenStat was born from a simple observation: most agencies are either creatively brilliant
                                    but technically weak, or technically strong but creatively bland.
                                </p>
                                <p>
                                    We set out to build something different. A team where Data Scientists collaborate with Designers.
                                    Where ML Engineers work alongside Brand Strategists. Where analytics and aesthetics coexist.
                                </p>
                                <p>
                                    Today, we're proud to work with startups and enterprises who value both form and function,
                                    helping them build digital products that are as beautiful as they are intelligent.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-blue-100/60 to-purple-100/60 border border-white/60 backdrop-blur-xl p-12 flex items-center justify-center">
                                <Users className="w-32 h-32 text-lux-text/20" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="px-6 md:px-12 lg:px-24 py-20 md:py-32 bg-gradient-to-b from-transparent via-white/30 to-transparent">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl md:text-6xl text-lux-text mb-6">Our Values</h2>
                        <p className="text-lux-muted text-lg max-w-2xl mx-auto">
                            The principles that guide every project, every decision, every line of code
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl"
                            >
                                <h3 className="font-serif text-2xl text-lux-text mb-3">{value.title}</h3>
                                <p className="text-sm text-lux-muted leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="px-6 md:px-12 lg:px-24 py-20 md:py-32">
                <div className="max-w-[1000px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl md:text-6xl text-lux-text mb-6">Our Journey</h2>
                        <p className="text-lux-muted text-lg">Milestones that shaped who we are today</p>
                    </div>

                    <div className="space-y-6">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={milestone.year}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="flex gap-8 items-start p-6 rounded-2xl bg-white/40 border border-white/50 backdrop-blur-xl hover:bg-white/60 transition-all"
                            >
                                <div className="flex-shrink-0">
                                    <div className="w-20 h-20 rounded-2xl bg-lux-text text-white flex items-center justify-center">
                                        <span className="font-serif text-lg">{milestone.year}</span>
                                    </div>
                                </div>
                                <div className="flex-1 pt-3">
                                    <p className="text-lux-text leading-relaxed">{milestone.event}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 md:px-12 lg:px-24 py-20 md:py-32">
                <div className="max-w-4xl mx-auto text-center p-16 rounded-[3rem] bg-gradient-to-br from-blue-100/40 to-purple-100/40 border border-white/60 backdrop-blur-xl">
                    <Zap className="w-16 h-16 mx-auto mb-6 text-lux-text" />
                    <h2 className="font-serif text-4xl md:text-5xl text-lux-text mb-6">
                        Ready to work with us?
                    </h2>
                    <p className="text-lux-muted text-lg mb-8 max-w-2xl mx-auto">
                        Let's build something extraordinary together. Book a strategy call and discover how we can transform your vision into reality.
                    </p>
                    <button className="px-10 py-4 bg-lux-text text-white font-semibold text-sm tracking-[0.2em] uppercase hover:bg-black transition-all rounded-full shadow-2xl hover:shadow-3xl hover:-translate-y-1" data-hover>
                        Book Strategy Call
                    </button>
                </div>
            </section>
        </div>
    );
};
