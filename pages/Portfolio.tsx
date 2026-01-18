import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { EXTENDED_CASE_STUDIES } from '../constants';
import { Filter } from 'lucide-react';
import { ProjectForm } from '../components/ProjectForm';

export const Portfolio: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();

    const excludedCategories = ['Web Development', 'Growth Marketing', 'AI & ML'];
    const categories = ['All', ...Array.from(new Set(EXTENDED_CASE_STUDIES.map(cs => cs.category)))]
        .filter(c => !excludedCategories.includes(c));

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const categoryParam = searchParams.get('category');

        if (categoryParam && categories.includes(categoryParam)) {
            setSelectedCategory(categoryParam);
        }
    }, [location.search]);

    const filteredProjects = selectedCategory === 'All'
        ? EXTENDED_CASE_STUDIES
        : EXTENDED_CASE_STUDIES.filter(cs => cs.category === selectedCategory);

    return (
        <div className="min-h-screen">
            {/* Modal Overlay for Contact Form */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-lux-cream dark:bg-lux-secondary dark:border dark:border-white/10 rounded-[2rem] p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 text-lux-muted hover:text-black transition-colors z-10"
                            >
                                ✕
                            </button>
                            <ProjectForm
                                serviceName={`Portfolio Inquiry (${selectedCategory})`}
                                onClose={() => setIsModalOpen(false)}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Compact Header & Filter Section */}
            <section className="px-6 md:px-12 lg:px-24 pt-32 pb-10">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="font-serif text-5xl md:text-7xl text-lux-text leading-none">
                            Selected<br />
                            <span className="text-lux-muted italic">Works.</span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col gap-3"
                    >
                        <div className="flex items-center gap-2 text-lux-muted mb-1">
                            <Filter className="w-4 h-4" />
                            <span className="text-xs font-medium uppercase tracking-wider">Filter by category</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${selectedCategory === category
                                        ? 'bg-lux-text text-lux-cream shadow-lg shadow-lux-text/20 transition-colors'
                                        : 'bg-lux-glass border border-lux-glassBorder text-lux-muted hover:border-lux-text/30 hover:bg-lux-secondary'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </motion.div>
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
                                className="group rounded-3xl bg-lux-glass border border-lux-glassBorder backdrop-blur-xl overflow-hidden hover:bg-lux-stroke/50 transition-all cursor-pointer"
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
                                            <span key={tag} className="px-2 py-1 rounded-md bg-lux-glass text-xs text-lux-muted">
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
                <div className="max-w-4xl mx-auto text-center p-16 rounded-[3rem] bg-gradient-to-br from-blue-100/40 to-purple-100/40 dark:from-blue-900/10 dark:to-purple-900/10 border border-lux-glassBorder backdrop-blur-xl">
                    <h2 className="font-serif text-4xl md:text-5xl text-lux-text mb-6">
                        Want similar results?
                    </h2>
                    <p className="text-lux-muted text-lg mb-8">
                        Let's discuss how we can help you achieve your business goals with data-driven solutions.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-10 py-4 bg-lux-text text-lux-cream font-semibold text-sm tracking-[0.2em] uppercase hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all rounded-full shadow-2xl"
                        data-hover
                    >
                        Start Your Project
                    </button>
                </div>
            </section>
        </div>
    );
};
