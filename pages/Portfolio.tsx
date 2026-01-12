import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EXTENDED_CASE_STUDIES } from '../constants';
import { Filter } from 'lucide-react';

export const Portfolio: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const categories = ['All', ...Array.from(new Set(EXTENDED_CASE_STUDIES.map(cs => cs.category)))];

    const filteredProjects = selectedCategory === 'All'
        ? EXTENDED_CASE_STUDIES
        : EXTENDED_CASE_STUDIES.filter(cs => cs.category === selectedCategory);

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
                        Our Work
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-serif text-5xl md:text-7xl lg:text-8xl text-lux-text mb-8 leading-tight"
                    >
                        Portfolio &<br />
                        <span className="italic font-light text-lux-muted">Case Studies</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl text-lux-muted leading-relaxed max-w-2xl mx-auto"
                    >
                        Real results for real businesses. Here's how we've helped our clients achieve their goals.
                    </motion.p>
                </div>
            </section>

            {/* Filter Section */}
            <section className="px-6 md:px-12 lg:px-24 pb-12">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <Filter className="w-5 h-5 text-lux-muted" />
                        <span className="text-sm text-lux-muted font-medium">Filter by:</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                        ? 'bg-lux-text text-white'
                                        : 'bg-white/50 border border-white/60 text-lux-text hover:bg-white/70'
                                    }`}
                                data-hover
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="px-6 md:px-12 lg:px-24 py-12 pb-32">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 30 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="group rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl overflow-hidden hover:bg-white/70 transition-all cursor-pointer"
                                data-hover
                            >
                                <div className="aspect-[4/3] bg-gradient-to-br from-blue-100/60 to-purple-100/60 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.client}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        <span className="px-3 py-1 rounded-full bg-lux-text/10 text-xs font-semibold text-lux-text">
                                            {project.category}
                                        </span>
                                        <span className="text-xs text-lux-muted">{project.year}</span>
                                    </div>
                                    <h3 className="font-serif text-2xl text-lux-text mb-2">{project.client}</h3>
                                    <p className="text-sm text-lux-muted mb-4 line-clamp-2">{project.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="px-2 py-1 rounded-md bg-white/60 text-xs text-lux-muted">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="pt-4 border-t border-lux-text/10">
                                        <p className="text-lg font-semibold text-lux-text">{project.impact}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 md:px-12 lg:px-24 py-20 md:py-32">
                <div className="max-w-4xl mx-auto text-center p-16 rounded-[3rem] bg-gradient-to-br from-blue-100/40 to-purple-100/40 border border-white/60 backdrop-blur-xl">
                    <h2 className="font-serif text-4xl md:text-5xl text-lux-text mb-6">
                        Want similar results?
                    </h2>
                    <p className="text-lux-muted text-lg mb-8">
                        Let's discuss how we can help you achieve your business goals with data-driven solutions.
                    </p>
                    <button className="px-10 py-4 bg-lux-text text-white font-semibold text-sm tracking-[0.2em] uppercase hover:bg-black transition-all rounded-full shadow-2xl" data-hover>
                        Start Your Project
                    </button>
                </div>
            </section>
        </div>
    );
};
