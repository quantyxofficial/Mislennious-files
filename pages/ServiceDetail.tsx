import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES, SERVICE_DETAILS } from '../constants';
import { Check, ArrowRight, Layers, ChevronRight, Minus } from 'lucide-react';
import { ProjectForm } from '../components/ProjectForm';

export const ServiceDetail: React.FC = () => {
    const { serviceId } = useParams<{ serviceId: string }>();
    const [showForm, setShowForm] = useState(false);

    const basicInfo = SERVICES.find(s => s.id === serviceId);
    const detailedInfo = SERVICE_DETAILS.find(s => s.id === serviceId);

    if (!basicInfo) {
        return <Navigate to="/" replace />;
    }

    const features = detailedInfo?.features || [];
    const technologies = detailedInfo?.technologies || [];

    const getPortfolioCategory = (id: string) => {
        const map: Record<string, string> = {
            'web': 'Web Development',
            'growth': 'Growth Marketing',
            'ads': 'Growth Marketing',
            'ai': 'AI & ML',
            'design': 'Design & Creative',
            'eda': 'Data & Analytics',
            'viz': 'Data & Analytics',
            'excel': 'Data & Analytics'
        };
        return map[id] || 'All';
    };

    const targetCategory = getPortfolioCategory(serviceId || '');

    const serviceIndex = SERVICES.findIndex(s => s.id === serviceId) + 1;
    const paddingIndex = serviceIndex.toString().padStart(2, '0');

    return (
        <div className="h-screen w-full bg-[#FDFDFD] overflow-hidden flex flex-col lg:flex-row">

            {/* LEFT COLUMN: Visual Anchor (40%) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="hidden lg:flex lg:w-[40%] bg-[#F5F5F7] relative flex-col justify-between p-12 border-r border-gray-200/50 h-full"
            >
                {/* Background Ambience */}
                <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-gradient-to-br from-blue-50/80 to-purple-50/80 rounded-full blur-[100px] pointer-events-none" />

                {/* Top: Breadcrumb */}
                <div className="relative z-10 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-lux-muted uppercase">
                    <Link to="/" className="hover:text-black transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                    <span className="text-black">Services</span>
                </div>

                {/* Middle: Title & Subtitle */}
                <div className="relative z-10 my-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="block text-xs font-mono text-lux-muted mb-6"
                    >
                        {paddingIndex} / SERVICE
                    </motion.span>

                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-white flex items-center justify-center mb-8">
                        <basicInfo.icon className="w-7 h-7 text-black stroke-[1.5]" />
                    </div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="font-serif text-4xl xl:text-5xl text-lux-text leading-[1.1] mb-6 tracking-tight"
                    >
                        {detailedInfo?.title || basicInfo.title}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="flex items-start gap-4"
                    >
                        <Minus className="w-6 h-px bg-lux-text/20 mt-3 shrink-0" />
                        <p className="text-base text-lux-muted/90 font-light leading-relaxed max-w-xs">
                            {detailedInfo?.subtitle}
                        </p>
                    </motion.div>
                </div>

                {/* Bottom: Status */}
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-black/5 backdrop-blur-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-lux-text/70 uppercase tracking-widest">Accepting Projects</span>
                    </div>
                </div>
            </motion.div>

            {/* RIGHT COLUMN: Content (60%) */}
            <div className="w-full lg:w-[60%] bg-white h-full relative flex flex-col overflow-y-auto lg:overflow-hidden">
                {/* Mobile Header (Only visible on small screens) */}
                <div className="lg:hidden p-6 pb-0 flex items-center justify-between">
                    <Link to="/" className="text-xs font-bold uppercase tracking-widest text-lux-muted">← Back</Link>
                    <basicInfo.icon className="w-6 h-6 text-black" />
                </div>
                <div className="lg:hidden px-6 pt-4">
                    <h1 className="font-serif text-3xl text-lux-text mb-2">{basicInfo.title}</h1>
                </div>

                <AnimatePresence mode="wait">
                    {!showForm ? (
                        <motion.div
                            key="details"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.5 }}
                            className="flex-1 flex flex-col justify-center px-8 py-8 md:px-16 lg:px-20 lg:py-12 h-full max-w-4xl mx-auto"
                        >
                            <div className="flex-1 flex flex-col justify-center gap-8 lg:gap-10">
                                {/* Description Section */}
                                <div>
                                    <h3 className="text-[10px] font-bold text-lux-muted uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                        <span className="w-6 h-px bg-lux-muted/20" /> Overview
                                    </h3>
                                    <p className="text-base md:text-lg text-lux-text/80 leading-relaxed font-light">
                                        {detailedInfo?.description || basicInfo.description}
                                    </p>
                                </div>

                                {/* Features & Tech Stack Split */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                                    {/* Features */}
                                    <div>
                                        <h3 className="text-[10px] font-bold text-lux-muted uppercase tracking-[0.2em] mb-4 text-lux-text/40">
                                            Key Capabilities
                                        </h3>
                                        <div className="space-y-3">
                                            {features.slice(0, 5).map((feature, idx) => (
                                                <div key={idx} className="flex items-start gap-3">
                                                    <div className="w-1 h-1 rounded-full bg-teal-500 mt-2 shrink-0" />
                                                    <span className="text-sm font-medium text-lux-text/90 leading-tight">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    {technologies.length > 0 && (
                                        <div>
                                            <h3 className="text-[10px] font-bold text-lux-muted uppercase tracking-[0.2em] mb-4 text-lux-text/40">
                                                Tech Stack
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {technologies.slice(0, 6).map((tech) => (
                                                    <span key={tech} className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-md text-xs font-medium text-lux-text/70">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* CTAs - Fixed at bottom of container flow */}
                            <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4 shrink-0">
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="h-12 px-8 bg-lux-text text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-black transition-all flex items-center justify-center gap-2 group w-full sm:w-auto"
                                >
                                    Start Project <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </button>

                                <Link
                                    to={`/portfolio?category=${encodeURIComponent(targetCategory)}`}
                                    className="h-12 px-8 bg-white border border-gray-200 text-lux-text text-xs font-bold uppercase tracking-[0.15em] hover:bg-gray-50 transition-all flex items-center justify-center gap-2 group w-full sm:w-auto"
                                >
                                    View Works <Layers className="w-3.5 h-3.5 text-lux-muted group-hover:text-black transition-colors" />
                                </Link>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.5 }}
                            className="h-full flex flex-col justify-center px-8 md:px-20 max-w-2xl mx-auto w-full"
                        >
                            <button
                                onClick={() => setShowForm(false)}
                                className="mb-8 text-lux-muted hover:text-black transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest group"
                            >
                                <ArrowRight className="w-3.5 h-3.5 rotate-180 group-hover:-translate-x-1 transition-transform" /> Back to Details
                            </button>

                            <ProjectForm
                                serviceName={basicInfo.title}
                                onClose={() => setShowForm(false)}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
