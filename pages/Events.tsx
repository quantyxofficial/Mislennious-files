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
            {/* Coming Soon Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center px-6 md:px-12 pt-32 pb-20">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-block py-2 px-6 border border-lux-text/10 rounded-full text-xs font-bold tracking-[0.3em] uppercase text-lux-muted bg-white/40 backdrop-blur-md mb-8"
                    >
                        Coming Soon
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-serif text-5xl md:text-7xl lg:text-8xl text-lux-text mb-8 leading-tight"
                    >
                        We are cooking hard <br />
                        <span className="italic font-light text-lux-muted">Stay tuned.</span>
                    </motion.h1>

                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => window.open('https://discord.gg/kaizenstat', '_blank')}
                            className="px-10 py-4 bg-lux-text text-white font-semibold text-xs tracking-[0.2em] uppercase hover:bg-black transition-all rounded-full"
                            data-hover
                        >
                            Join Community
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};
