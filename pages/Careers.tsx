import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Clock } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import { CAREER_POSITIONS } from '../constants';

export const Careers: React.FC = () => {
    const [state, handleSubmit] = useForm("mgoovkrz");

    return (
        <div className="min-h-screen pt-24 pb-8 px-6 md:px-12 flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-8 items-start">

                {/* LEFT COLUMN: Header & Info (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Header */}
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block py-1 px-3 border border-lux-text/10 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-lux-muted bg-lux-glass mb-3"
                        >
                            Join Our Team
                        </motion.span>
                        <h1 className="font-serif text-4xl md:text-5xl text-lux-text mb-3 leading-tight">
                            Build Your Career <span className="italic font-light text-lux-muted">With Excellence</span>
                        </h1>
                        <p className="text-sm text-lux-muted leading-relaxed max-w-xl">
                            Join a team of Data Scientists, Engineers, and Designers working on challenging problems for world-class clients.
                        </p>
                    </div>

                    {/* Compact Open Positions */}
                    <div className="bg-lux-glass border border-lux-glassBorder rounded-2xl p-5 backdrop-blur-sm">
                        <h3 className="font-serif text-lg text-lux-text mb-3">Open Positions</h3>
                        <div className="space-y-3">
                            {CAREER_POSITIONS.map((position) => (
                                <div key={position.id} className="group bg-lux-glass border border-lux-glassBorder rounded-xl p-4 hover:bg-lux-white/10 transition-colors cursor-pointer">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-semibold text-lux-text text-sm mb-1">{position.title}</h4>
                                            <div className="flex flex-wrap gap-3 text-[10px] text-lux-muted">
                                                <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {position.department}</span>
                                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {position.location}</span>
                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {position.type}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-lux-muted mt-2 line-clamp-2">{position.description}</p>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-3">
                            <p className="text-[10px] text-lux-muted italic">More positions coming soon...</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Application Form (5 cols) */}
                <div className="lg:col-span-5">
                    <div className="bg-lux-glass border border-lux-glassBorder backdrop-blur-xl rounded-[2rem] p-6 md:p-8 shadow-sm">
                        <div className="mb-6">
                            <h3 className="font-serif text-xl text-lux-text mb-1">Quick Apply</h3>
                            <p className="text-xs text-lux-muted">Send us your details and we'll be in touch.</p>
                        </div>

                        {state.succeeded ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-8 text-center bg-green-50/50 rounded-2xl border border-green-100"
                            >
                                <h4 className="font-serif text-xl text-green-800 mb-2">Application Received!</h4>
                                <p className="text-sm text-green-700">Thanks for your interest in joining our team. We'll review your details and be in touch soon.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1">
                                    <label htmlFor="email" className="text-[10px] uppercase tracking-widest font-bold text-lux-muted px-1">Email Address</label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="your@email.com"
                                        className="w-full px-4 py-3 rounded-xl bg-lux-glass border border-lux-text/10 text-xs text-lux-text focus:outline-none focus:ring-1 focus:ring-lux-text/20"
                                    />
                                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-[10px] text-red-500 mt-1 px-1" />
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="message" className="text-[10px] uppercase tracking-widest font-bold text-lux-muted px-1">About Yourself / Portfolio</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        placeholder="Tell us about yourself, your skills, and share any relevant links..."
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-xl bg-lux-glass border border-lux-text/10 text-xs text-lux-text focus:outline-none focus:ring-1 focus:ring-lux-text/20 resize-none"
                                    />
                                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-[10px] text-red-500 mt-1 px-1" />
                                </div>

                                <button
                                    type="submit"
                                    disabled={state.submitting}
                                    className="w-full px-6 py-4 bg-lux-text text-lux-cream font-semibold text-xs tracking-widest uppercase hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all rounded-full disabled:opacity-70 shadow-lg shadow-black/5"
                                >
                                    {state.submitting ? 'Sending...' : 'Submit Application'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};
