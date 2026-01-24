import React from 'react';
import { motion } from 'framer-motion';
import { Users, ArrowRight } from 'lucide-react';
import { CommunityModal } from '../components/CommunityModal';

export const Events: React.FC = () => {
    const events = [
        {
            title: 'Logo Design Competition',
            date: 'Live on Unstop',
            category: 'Design',
            status: 'Featured',
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
        <div className="min-h-screen pt-24 pb-12 px-6 md:px-12 flex flex-col justify-center">
            <CommunityModal
                isOpen={showCommunityModal}
                onClose={() => setShowCommunityModal(false)}
            />

            <div className="max-w-5xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-start lg:items-center">

                {/* LEFT COLUMN: Text & CTA (5 cols) */}
                <div className="lg:col-span-5 space-y-8">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block py-1 px-3 border border-lux-text/10 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-lux-muted bg-white/40 mb-4"
                        >
                            Events & Community
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-serif text-4xl md:text-5xl lg:text-6xl text-lux-text mb-4 leading-[1.1]"
                        >
                            Where Innovation <br />
                            <span className="italic font-light text-lux-muted">Meets Community</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-sm text-lux-muted leading-relaxed max-w-md"
                        >
                            Join our hackathons, workshops, and exclusive meetups. Connect with like-minded builders and shape the future of tech.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <button
                            onClick={() => setShowCommunityModal(true)}
                            className="group flex items-center gap-3 px-8 py-4 bg-lux-text text-lux-cream font-semibold text-xs tracking-[0.15em] uppercase hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all rounded-full"
                        >
                            <Users className="w-4 h-4" />
                            Join Community
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>

                {/* RIGHT COLUMN: Event Cards (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Featured Event Banner */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="relative group overflow-hidden rounded-[2rem] border border-black/5 shadow-2xl bg-white"
                    >
                        <div className="relative aspect-[1200/400] md:aspect-[3/1] overflow-hidden">
                            <img
                                src="/banners/logo-competition.png"
                                alt="Logo Design Competition"
                                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                            />

                            {/* Registration Button Overlay - Only visible on hover */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/20 backdrop-blur-[2px]">
                                <button
                                    onClick={() => window.open('https://unstop.com', '_blank')}
                                    className="bg-white text-black px-10 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] shadow-2xl hover:bg-lux-cream transition-all transform hover:scale-110 active:scale-95 flex items-center gap-2"
                                >
                                    Register on Unstop <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid gap-4">
                        {events.map((event, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + (index * 0.1), duration: 0.5 }}
                                className="group relative overflow-hidden bg-white/40 border border-white/60 backdrop-blur-xl rounded-2xl p-6 hover:bg-white/60 transition-all cursor-default"
                            >
                                <div className={`absolute top-0 right-0 w-24 h-24 blur-2xl opacity-10 ${event.color} -translate-y-1/2 translate-x-1/2`} />

                                <div className="flex items-center justify-between gap-4 relative z-10">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/50 border border-white/50 ${event.status === 'Pipeline' ? 'text-lux-muted' : 'text-lux-text'
                                                }`}>
                                                {event.status}
                                            </span>
                                            <span className="text-[10px] font-medium text-lux-muted flex items-center gap-1.5">
                                                <div className={`w-1 h-1 rounded-full ${event.color}`} />
                                                {event.category}
                                            </span>
                                        </div>
                                        <h3 className="font-serif text-xl text-lux-text mb-1">{event.title}</h3>
                                        <p className="text-lux-muted text-xs font-medium">{event.date}</p>
                                    </div>

                                    <div className="shrink-0 text-right">
                                        <button
                                            disabled={event.status === 'Pipeline'}
                                            onClick={() => event.status !== 'Pipeline' && window.open('https://unstop.com', '_blank')}
                                            className={`px-4 py-2 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-all
                                                ${event.status === 'Pipeline'
                                                    ? 'border-lux-text/10 text-lux-muted/50 cursor-not-allowed group-hover:bg-white/50'
                                                    : 'border-lux-text bg-lux-text text-lux-cream hover:bg-black'}`}
                                        >
                                            {event.status === 'Pipeline' ? 'Soon' : 'Register'}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="mt-6 text-right"
                    >
                        <p className="text-[10px] text-lux-muted italic pr-2">
                            More events loading...
                        </p>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};
