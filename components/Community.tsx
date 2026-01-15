import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Trophy, Zap } from 'lucide-react';

export const Community: React.FC = () => {
    const stats = [
        { icon: Users, label: 'Community Members', value: '500+' },
        { icon: Calendar, label: 'Events Organized', value: '15+' },
        { icon: Trophy, label: 'Hackathons Hosted', value: '8+' },
        { icon: Zap, label: 'Projects Built', value: '100+' }
    ];

    const benefits = [
        {
            title: 'Hackathons & Events',
            description: 'Participate in exciting hackathons, workshops, and tech events throughout the year.',
            icon: Trophy
        },
        {
            title: 'Skill Development',
            description: 'Learn from industry professionals and enhance your technical and soft skills.',
            icon: Zap
        },
        {
            title: 'Networking',
            description: 'Connect with fellow students, alumni, and industry experts from top institutes.',
            icon: Users
        },
        {
            title: 'Career Opportunities',
            description: 'Get access to internships, projects, and job opportunities through our network.',
            icon: Calendar
        }
    ];

    return (
        <section className="py-24 px-6 lg:px-24 relative z-10">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 max-w-3xl mx-auto"
                >
                    <span className="inline-block py-2 px-6 border border-lux-text/10 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase text-lux-muted bg-white/40 backdrop-blur-md mb-6">
                        Join the Movement
                    </span>
                    <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-lux-text mb-6">
                        Build. Learn. <span className="italic text-lux-muted">Connect.</span>
                    </h2>
                    <p className="text-lg text-lux-muted font-light leading-relaxed">
                        Join our vibrant community of student innovators, developers, and designers. Together, we organize hackathons,
                        share knowledge, and create opportunities for growth.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 text-center hover:bg-white/80 transition-all"
                        >
                            <stat.icon className="w-8 h-8 mx-auto mb-3 text-lux-text" />
                            <div className="font-serif text-4xl font-medium text-lux-text mb-2">{stat.value}</div>
                            <div className="text-xs uppercase tracking-wider text-lux-muted">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Benefits Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="bg-gradient-to-br from-white/60 to-white/40 border border-white/60 rounded-3xl p-8 backdrop-blur-xl hover:shadow-xl transition-all"
                        >
                            <benefit.icon className="w-10 h-10 text-lux-text mb-4" />
                            <h3 className="font-serif text-2xl font-medium text-lux-text mb-3">{benefit.title}</h3>
                            <p className="text-lux-muted leading-relaxed">{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center bg-lux-text rounded-[3rem] p-12 md:p-16 text-white"
                >
                    <h3 className="font-serif text-4xl md:text-5xl font-medium mb-4">
                        Ready to Join?
                    </h3>
                    <p className="text-stone-300 text-lg mb-8 max-w-2xl mx-auto">
                        Be part of a community that's shaping the future of tech innovation. Connect with fellow students and start building today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => window.open('https://discord.gg/kaizenstat', '_blank')}
                            className="px-10 py-4 bg-white text-lux-text font-semibold text-xs tracking-[0.2em] uppercase hover:bg-stone-200 transition-all rounded-full"
                            data-hover
                        >
                            Join Discord Community
                        </button>
                        <button
                            onClick={() => {
                                const contactSection = document.getElementById('contact');
                                if (contactSection) {
                                    const navbarHeight = 100;
                                    const elementPosition = contactSection.getBoundingClientRect().top + window.scrollY;
                                    window.scrollTo({ top: elementPosition - navbarHeight, behavior: 'smooth' });
                                }
                            }}
                            className="px-10 py-4 bg-transparent border-2 border-white text-white font-semibold text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-lux-text transition-all rounded-full"
                            data-hover
                        >
                            Get in Touch
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
