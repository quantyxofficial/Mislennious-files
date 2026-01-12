import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SERVICE_DETAILS, EXTENDED_CASE_STUDIES } from '../constants';
import { Check, ArrowRight } from 'lucide-react';

export const ServiceDetail: React.FC = () => {
    const { serviceId } = useParams<{ serviceId: string }>();
    const service = SERVICE_DETAILS.find(s => s.id === serviceId);

    if (!service) {
        return <Navigate to="/" replace />;
    }

    const relatedCaseStudies = EXTENDED_CASE_STUDIES.filter(cs =>
        service.caseStudies.includes(cs.id)
    );

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center justify-center px-6 md:px-12 pt-32 pb-20">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-3xl bg-white/60 border border-white/80 backdrop-blur-xl"
                    >
                        <service.icon className="w-12 h-12 text-lux-text" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-serif text-5xl md:text-7xl lg:text-8xl text-lux-text mb-6 leading-tight"
                    >
                        {service.title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-2xl md:text-3xl font-serif font-light text-lux-muted mb-8"
                    >
                        {service.subtitle}
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-lg text-lux-muted leading-relaxed max-w-3xl mx-auto"
                    >
                        {service.description}
                    </motion.p>
                </div>
            </section>

            {/* Features Section */}
            <section className="px-6 md:px-12 lg:px-24 py-20 md:py-32">
                <div className="max-w-[1400px] mx-auto">
                    <h2 className="font-serif text-4xl md:text-5xl text-lux-text mb-12 text-center">What We Deliver</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {service.features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="flex items-start gap-4 p-6 rounded-2xl bg-white/50 border border-white/60 backdrop-blur-xl"
                            >
                                <div className="w-6 h-6 rounded-full bg-lux-text/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Check className="w-4 h-4 text-lux-text" />
                                </div>
                                <p className="text-lux-text">{feature}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="px-6 md:px-12 lg:px-24 py-20 md:py-32 bg-gradient-to-b from-transparent via-white/30 to-transparent">
                <div className="max-w-[1200px] mx-auto">
                    <h2 className="font-serif text-4xl md:text-5xl text-lux-text mb-12 text-center">Our Process</h2>

                    <div className="space-y-4">
                        {service.process.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="flex gap-6 items-start p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl group hover:bg-white/70 transition-all"
                            >
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 rounded-2xl bg-lux-text text-white flex items-center justify-center">
                                        <span className="font-serif text-xl">{index + 1}</span>
                                    </div>
                                </div>
                                <div className="flex-1 pt-2">
                                    <h3 className="font-serif text-2xl text-lux-text mb-2">{step.step}</h3>
                                    <p className="text-lux-muted leading-relaxed">{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technologies Section */}
            <section className="px-6 md:px-12 lg:px-24 py-20 md:py-32">
                <div className="max-w-[1200px] mx-auto">
                    <h2 className="font-serif text-4xl md:text-5xl text-lux-text mb-12 text-center">Technologies We Use</h2>

                    <div className="flex flex-wrap justify-center gap-4">
                        {service.technologies.map((tech, index) => (
                            <motion.div
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05, duration: 0.4 }}
                                className="px-6 py-3 rounded-full bg-white/60 border border-white/80 backdrop-blur-xl text-lux-text font-medium"
                            >
                                {tech}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related Case Studies */}
            {relatedCaseStudies.length > 0 && (
                <section className="px-6 md:px-12 lg:px-24 py-20 md:py-32 bg-gradient-to-b from-transparent via-white/30 to-transparent">
                    <div className="max-w-[1400px] mx-auto">
                        <h2 className="font-serif text-4xl md:text-5xl text-lux-text mb-12 text-center">Success Stories</h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedCaseStudies.map((caseStudy, index) => (
                                <motion.div
                                    key={caseStudy.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    className="group rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl overflow-hidden hover:bg-white/70 transition-all"
                                >
                                    <div className="aspect-video bg-gradient-to-br from-blue-100/60 to-purple-100/60 overflow-hidden">
                                        <img src={caseStudy.image} alt={caseStudy.client} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="px-3 py-1 rounded-full bg-lux-text/10 text-xs font-semibold text-lux-text">{caseStudy.category}</span>
                                        </div>
                                        <h3 className="font-serif text-2xl text-lux-text mb-2">{caseStudy.client}</h3>
                                        <p className="text-sm text-lux-muted mb-4">{caseStudy.description}</p>
                                        <div className="pt-4 border-t border-lux-text/10">
                                            <p className="text-lg font-semibold text-lux-text">{caseStudy.impact}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="px-6 md:px-12 lg:px-24 py-20 md:py-32">
                <div className="max-w-4xl mx-auto text-center p-16 rounded-[3rem] bg-gradient-to-br from-blue-100/40 to-purple-100/40 border border-white/60 backdrop-blur-xl">
                    <h2 className="font-serif text-4xl md:text-5xl text-lux-text mb-6">
                        Ready to get started?
                    </h2>
                    <p className="text-lux-muted text-lg mb-8">
                        Let's discuss how {service.title.toLowerCase()} can transform your business
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-10 py-4 bg-lux-text text-white font-semibold text-sm tracking-[0.2em] uppercase hover:bg-black transition-all rounded-full" data-hover>
                            Book Consultation
                        </button>
                        <Link to="/portfolio" className="px-10 py-4 bg-transparent border border-lux-text/20 text-lux-text font-semibold text-sm tracking-[0.2em] uppercase hover:bg-lux-text hover:text-white transition-all rounded-full inline-flex items-center justify-center gap-2" data-hover>
                            View All Work <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};
