import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CASE_STUDIES } from '../constants';

export const Work: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    // Precise mapping: When we scroll down 100% of the section height, move left by 50%
    // This ensures the last card comes fully into view without overshooting into whitespace
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

    return (
        <div id="work" className="relative bg-transparent">

            {/* MOBILE / TABLET VIEW (Vertical Stack) */}
            <div className="block lg:hidden py-24 px-6 relative z-10">
                <div className="mb-16">
                    <h2 className="font-serif text-5xl md:text-7xl text-lux-text leading-[0.9] mb-6">Selected <br /><span className="italic text-lux-muted">Works.</span></h2>
                    <p className="text-lux-muted text-lg">Curated digital excellence.</p>
                </div>

                <div className="space-y-12">
                    {CASE_STUDIES.map((project) => (
                        <div
                            key={project.id}
                            className="relative w-full h-[60vh] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/60"
                        >
                            <img
                                src={project.image}
                                alt={project.client}
                                className="absolute inset-0 w-full h-full object-cover"
                                loading="lazy"
                            />
                            {/* Always visible gradient overlay on mobile */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
                                <span className="text-white/80 text-xs tracking-widest uppercase mb-2">Case Study</span>
                                <h3 className="text-3xl font-serif text-white mb-2">{project.client}</h3>
                                <p className="text-white/90 text-sm mb-4 leading-relaxed line-clamp-2">{project.problem} → {project.solution}</p>

                                <div className="self-start px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                                    <span className="text-white text-xs font-semibold">{project.impact}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* DESKTOP VIEW (Sticky Horizontal Scroll - Unchanged) */}
            <section ref={targetRef} className="hidden lg:block relative h-[180vh] bg-transparent">
                <div className="sticky top-0 flex h-screen items-center overflow-hidden z-10">

                    {/* Section Header - Background Watermark */}
                    <div className="absolute top-8 left-6 lg:left-32 z-0 pointer-events-none">
                        <h2 className="font-serif text-6xl md:text-9xl text-lux-text/15 uppercase tracking-tighter">Selected Works</h2>
                    </div>

                    <motion.div style={{ x }} className="flex gap-12 px-6 lg:px-32 items-center will-change-transform relative z-10">
                        {/* Intro Card */}
                        <div className="w-[80vw] md:w-[30vw] shrink-0 pr-12">
                            <h3 className="text-4xl font-serif text-lux-text leading-tight mb-6">
                                Curated Digital <br /> <span className="italic text-lux-muted">Excellence.</span>
                            </h3>
                            <p className="text-lux-muted text-lg">
                                Drag to explore our recent impact across industries.
                                <br /><span className="text-sm opacity-50 mt-2 block">(Keep scrolling down)</span>
                            </p>
                        </div>

                        {CASE_STUDIES.map((project) => (
                            <div
                                key={project.id}
                                className="group relative h-[60vh] md:h-[70vh] w-[85vw] md:w-[60vw] lg:w-[50vw] flex-shrink-0 bg-lux-glass rounded-[3rem] overflow-hidden shadow-2xl shadow-stone-200/50 border border-lux-glassBorder dark:shadow-[0_0_40px_-10px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_0_60px_-5px_rgba(59,130,246,0.4)] transition-all duration-500"
                                data-hover
                            >
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                                <img
                                    src={project.image}
                                    alt={project.client}
                                    className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-100 group-hover:blur-[2px]"
                                    loading="lazy"
                                />

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 w-full p-10 md:p-14 z-20 flex flex-col justify-end h-full bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                        <span className="text-white/80 text-xs tracking-widest uppercase mb-2 block">Case Study</span>
                                        <h3 className="text-3xl md:text-5xl font-serif text-white mb-4">{project.client}</h3>
                                        <p className="text-white/90 text-lg mb-6 max-w-lg font-light leading-relaxed hidden md:block">{project.problem} <span className="text-white/60">→ {project.solution}</span></p>

                                        <div className="inline-block px-6 py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                                            <span className="text-white font-semibold tracking-wide">{project.impact}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Spacer to ensure last item clears */}
                        <div className="w-[10vw] flex-shrink-0" />
                    </motion.div>
                </div>
            </section>
        </div>
    );
};