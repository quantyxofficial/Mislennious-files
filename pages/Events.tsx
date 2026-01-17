import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Trophy, TrendingUp, MapPin, Clock } from 'lucide-react';
import { CommunityModal } from '../components/CommunityModal';

export const Events: React.FC = () => {
    const events = [
        {
            title: 'Logo Making Competition',
            date: 'Coming Soon',
            category: 'Design',
            status: 'Upcoming',
            color: 'bg-orange-500'
        },
        {
            title: 'Data Science Hackathon',
            date: 'In Pipeline',
            category: 'Data Science',
            status: 'Pipeline',
            color: 'bg-blue-500'
        },
        {
            title: 'Medical Data Science Hackathon',
            date: 'In Pipeline',
            category: 'Healthcare AI',
            status: 'Pipeline',
            color: 'bg-teal-500'
        }
    ];

    const [showCommunityModal, setShowCommunityModal] = React.useState(false);

    return (
        <div className="min-h-screen">
            <CommunityModal
                isOpen={showCommunityModal}
                onClose={() => setShowCommunityModal(false)}
            />

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
                            onClick={() => setShowCommunityModal(true)}
                            className="px-10 py-4 bg-lux-text text-white font-semibold text-xs tracking-[0.2em] uppercase hover:bg-black transition-all rounded-full"
                            data-hover
                        >
                            Join Community
                        </button>
                    </div>
                </div>
            </section>

            {/* Events List */}
            <section className="px-6 md:px-12 pb-32">
                <div className="max-w-4xl mx-auto">
                    <div className="grid gap-6">
                        {events.map((event, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + (index * 0.1), duration: 0.6 }}
                                className="group relative overflow-hidden bg-white/40 border border-white/60 backdrop-blur-xl rounded-3xl p-8 hover:bg-white/60 transition-all"
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-10 ${event.color} -translate-y-1/2 translate-x-1/2`} />

                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/50 border border-white/50 ${event.status === 'Pipeline' ? 'text-lux-muted' : 'text-lux-text'
                                                }`}>
                                                {event.status}
                                            </span>
                                            <span className="text-xs font-medium text-lux-muted flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${event.color}`} />
                                                {event.category}
                                            </span>
                                        </div>
                                        <h3 className="font-serif text-2xl text-lux-text mb-2">{event.title}</h3>
                                        <p className="text-lux-muted text-sm">{event.date}</p>
                                    </div>

                                    <button
                                        disabled={true}
                                        className="px-6 py-3 rounded-full border border-lux-text/10 text-xs font-bold uppercase tracking-wider text-lux-muted/50 cursor-not-allowed group-hover:border-lux-text/20 transition-all"
                                    >
                                        Details Soon
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
