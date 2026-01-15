import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { ProjectForm } from '../components/ProjectForm';

export const StartProject: React.FC = () => {
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
                    <span className="text-black">Start Project</span>
                </div>

                {/* Middle: Title & Subtitle */}
                <div className="relative z-10 my-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="font-serif text-5xl xl:text-6xl text-lux-text leading-[1.1] mb-6 tracking-tight"
                    >
                        Let's Build <br />
                        <span className="italic text-lux-muted">Something Great.</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="flex items-start gap-4"
                    >
                        <div className="w-12 h-px bg-lux-text/20 mt-3 shrink-0" />
                        <p className="text-base text-lux-muted/90 font-light leading-relaxed max-w-xs">
                            Whether you need a full-scale platform, an AI integration, or a data strategy—we're ready to engineer your vision.
                        </p>
                    </motion.div>
                </div>

                {/* Bottom: Status */}
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-black/5 backdrop-blur-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-lux-text/70 uppercase tracking-widest">Response time: &lt;24 hrs</span>
                    </div>
                </div>
            </motion.div>

            {/* RIGHT COLUMN: Form (60%) */}
            <div className="w-full lg:w-[60%] bg-white h-full relative flex flex-col justify-center overflow-y-auto">
                {/* Mobile Header (Only visible on small screens) */}
                <div className="lg:hidden p-6 pb-0 flex items-center justify-between absolute top-0 left-0 w-full z-10 bg-white/80 backdrop-blur-md">
                    <Link to="/" className="text-xs font-bold uppercase tracking-widest text-lux-muted flex items-center gap-2">
                        <ArrowRight className="w-3.5 h-3.5 rotate-180" /> Back to Home
                    </Link>
                </div>

                <div className="flex-1 flex flex-col justify-center px-8 md:px-20 py-12 lg:py-0 max-w-2xl mx-auto w-full">
                    <ProjectForm />
                </div>
            </div>
        </div>
    );
};
