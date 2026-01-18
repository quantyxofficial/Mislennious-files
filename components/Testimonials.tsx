import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

export const Testimonials: React.FC = () => {
    return (
        <section className="py-24 px-6 lg:px-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-lux-text/10 rounded-full bg-lux-glass backdrop-blur-md mb-6"
                    >
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-lux-muted">Client Feedback</span>
                    </motion.div>
                    <h2 className="font-serif text-5xl md:text-7xl text-lux-text mb-6">
                        Voices of <span className="italic font-light text-lux-muted">Trust.</span>
                    </h2>
                    <p className="text-lux-muted max-w-2xl mx-auto font-light text-lg">
                        Delivering exceptional results that speak for themselves. Hear from our global partners.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="relative group h-full"
                        >
                            <div className="absolute inset-0 bg-lux-glass backdrop-blur-2xl border border-lux-glassBorder rounded-[3rem] transition-all duration-500 group-hover:bg-lux-white/10 group-hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] group-hover:-translate-y-2" />
                            <div className="relative p-10 md:p-12 flex flex-col h-full">
                                <Quote className="w-10 h-10 text-lux-text/10 mb-8 group-hover:text-lux-text/20 transition-colors" />
                                <p className="text-lux-text text-xl font-serif italic mb-10 leading-relaxed font-light flex-grow">
                                    "{testimonial.text}"
                                </p>
                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lux-text/5 to-lux-text/20 flex items-center justify-center text-lux-text font-serif font-medium border border-white/60">
                                        {testimonial.author.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-lux-text font-serif text-lg">{testimonial.author}</div>
                                        <div className="text-[10px] font-bold tracking-widest uppercase text-lux-muted">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
