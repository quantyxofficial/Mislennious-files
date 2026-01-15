import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Trophy, TrendingUp, MapPin, Clock } from 'lucide-react';

export const Events: React.FC = () => {
    const upcomingEvents = [
        {
            title: 'TechHack 2026',
            date: 'March 15-17, 2026',
            location: 'Campus Venue',
            type: 'Hackathon',
            participants: '200+',
            prizes: '₹2L+',
            status: 'Registration Open'
        },
        {
            title: 'AI/ML Workshop Series',
            date: 'February 20, 2026',
            location: 'Online',
            type: 'Workshop',
            participants: '100+',
            prizes: 'Free',
            status: 'Upcoming'
        },
        {
            title: 'Web Dev Bootcamp',
            date: 'April 5-7, 2026',
            location: 'MAKAUT Campus',
            type: 'Bootcamp',
            participants: '150+',
            prizes: 'Certificates',
            status: 'Registration Soon'
        }
    ];

    const pastEvents = [
        {
            title: 'CodeFest 2025',
            date: 'December 2025',
            participants: '300+',
            projects: '50+',
            winner: 'Smart Campus Solution'
        },
        {
            title: 'DataThon 2025',
            date: 'October 2025',
            participants: '250+',
            projects: '40+',
            winner: 'Predictive Analytics Platform'
        },
        {
            title: 'HackIndia 2025',
            date: 'August 2025',
            participants: '400+',
            projects: '75+',
            winner: 'HealthTech Innovation'
        }
    ];

    const stats = [
        { icon: Trophy, label: 'Hackathons Hosted', value: '8+' },
        { icon: Users, label: 'Total Participants', value: '1500+' },
        { icon: TrendingUp, label: 'Projects Built', value: '200+' },
        { icon: Calendar, label: 'Events This Year', value: '15+' }
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
                        Events & Hackathons
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-serif text-5xl md:text-7xl lg:text-8xl text-lux-text mb-8 leading-tight"
                    >
                        Building Communities <br />
                        <span className="italic font-light text-lux-muted">Through Innovation</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl text-lux-muted leading-relaxed max-w-2xl mx-auto"
                    >
                        Join us for hackathons, workshops, and tech events that bring together the brightest minds from across the country.
                    </motion.p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="px-6 md:px-12 lg:px-24 py-12">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl text-center"
                            >
                                <stat.icon className="w-8 h-8 mx-auto mb-4 text-lux-text" />
                                <div className="font-serif text-4xl text-lux-text mb-2">{stat.value}</div>
                                <div className="text-sm text-lux-muted">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="px-6 md:px-12 lg:px-24 py-20">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-serif text-4xl md:text-6xl text-lux-text mb-4">Upcoming Events</h2>
                        <p className="text-lux-muted text-lg">Mark your calendars and join us!</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {upcomingEvents.map((event, index) => (
                            <motion.div
                                key={event.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="bg-gradient-to-br from-white/60 to-white/40 border border-white/60 rounded-3xl p-8 backdrop-blur-xl hover:shadow-xl transition-all"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold uppercase tracking-wider">
                                        {event.type}
                                    </span>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                                        {event.status}
                                    </span>
                                </div>

                                <h3 className="font-serif text-2xl text-lux-text mb-4">{event.title}</h3>

                                <div className="space-y-3 text-sm text-lux-muted mb-6">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        <span>{event.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        <span>{event.participants} Expected</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Trophy className="w-4 h-4" />
                                        <span>Prizes: {event.prizes}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        const contactSection = document.getElementById('contact');
                                        if (contactSection) {
                                            const navbarHeight = 100;
                                            const elementPosition = contactSection.getBoundingClientRect().top + window.scrollY;
                                            window.scrollTo({ top: elementPosition - navbarHeight, behavior: 'smooth' });
                                        }
                                    }}
                                    className="w-full px-6 py-3 bg-lux-text text-white font-semibold text-xs tracking-wider uppercase rounded-full hover:bg-black transition-all"
                                    data-hover
                                >
                                    Register Interest
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Past Events */}
            <section className="px-6 md:px-12 lg:px-24 py-20 bg-gradient-to-b from-transparent via-white/30 to-transparent">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-serif text-4xl md:text-6xl text-lux-text mb-4">Past Events</h2>
                        <p className="text-lux-muted text-lg">Celebrating innovation and collaboration</p>
                    </div>

                    <div className="space-y-6">
                        {pastEvents.map((event, index) => (
                            <motion.div
                                key={event.title}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="flex flex-col md:flex-row gap-8 items-start p-8 rounded-3xl bg-white/40 border border-white/50 backdrop-blur-xl hover:bg-white/60 transition-all"
                            >
                                <div className="flex-1">
                                    <h3 className="font-serif text-3xl text-lux-text mb-2">{event.title}</h3>
                                    <p className="text-lux-muted mb-4">{event.date}</p>
                                    <div className="flex flex-wrap gap-6 text-sm">
                                        <div>
                                            <span className="text-lux-muted">Participants:</span>
                                            <span className="text-lux-text font-semibold ml-2">{event.participants}</span>
                                        </div>
                                        <div>
                                            <span className="text-lux-muted">Projects:</span>
                                            <span className="text-lux-text font-semibold ml-2">{event.projects}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:text-right">
                                    <p className="text-xs uppercase tracking-wider text-lux-muted mb-2">Winner</p>
                                    <p className="font-serif text-xl text-lux-text">{event.winner}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 md:px-12 lg:px-24 py-20">
                <div className="max-w-4xl mx-auto text-center p-16 rounded-[3rem] bg-lux-text text-white">
                    <Trophy className="w-16 h-16 mx-auto mb-6" />
                    <h2 className="font-serif text-4xl md:text-5xl mb-6">
                        Want to participate or sponsor?
                    </h2>
                    <p className="text-stone-300 text-lg mb-8 max-w-2xl mx-auto">
                        Join our community of innovators or partner with us to make the next event even bigger!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => window.open('https://discord.gg/kaizenstat', '_blank')}
                            className="px-10 py-4 bg-white text-lux-text font-semibold text-xs tracking-[0.2em] uppercase hover:bg-stone-200 transition-all rounded-full"
                            data-hover
                        >
                            Join Community
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
                            Contact Us
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};
