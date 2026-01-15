import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ProblemOfTheDay } from '../components/practice/ProblemOfTheDay';
import { loadTopics, TopicMetadata } from '../utils/contentLoader';
import { Trophy, BookOpen, ArrowRight, Code2, Sparkles, Award } from 'lucide-react';

export const PracticeHome: React.FC = () => {
    const [topics, setTopics] = useState<TopicMetadata[]>([]);

    useEffect(() => {
        loadTopics().then(setTopics);
    }, []);

    return (
        <HelmetProvider>
            {/* Transparent background to show global Layout aurora */}
            <div className="min-h-screen pt-24 pb-12 px-6 md:px-12 relative overflow-hidden font-sans">
                <Helmet>
                    <title>Practice | KaizenStat</title>
                    <meta name="description" content="Master data science, machine learning, and analytics." />
                </Helmet>

                <div className="max-w-7xl mx-auto relative z-10">

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-lux-muted/10 pb-6">
                        <div>
                            <span className="inline-block py-1 px-4 border border-lux-text/10 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-lux-muted mb-3 bg-white/50 backdrop-blur-sm shadow-sm">
                                KaizenStat Academy
                            </span>
                            <h1 className="text-5xl md:text-6xl font-serif text-lux-text leading-[0.9] tracking-tight">
                                Curriculum.
                            </h1>
                        </div>
                        <p className="text-lux-muted max-w-md text-sm leading-relaxed font-light">
                            A curated collection of data science modules designed for mastering technical interviews and core concepts.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8 items-start">

                        {/* LEFT COLUMN: Modules (8 cols) */}
                        <div className="lg:col-span-8 space-y-8">

                            {/* Topic Grid - Compact 3 Columns */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {topics.map((topic, idx) => (
                                    <motion.div
                                        key={topic.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group bg-white/40 backdrop-blur-md border border-white/60 rounded-[2rem] p-5 hover:bg-white hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="w-10 h-10 rounded-2xl bg-white border border-lux-text/5 flex items-center justify-center text-xl shadow-sm text-lux-text group-hover:scale-110 transition-transform duration-500">
                                                    {topic.icon}
                                                </div>
                                                <span className="bg-white/60 backdrop-blur-sm text-lux-muted text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide border border-lux-text/5">
                                                    {topic.count} Qs
                                                </span>
                                            </div>

                                            <h3 className="text-lg font-serif text-lux-text mb-2 group-hover:text-black transition-colors">{topic.title}</h3>
                                            <p className="text-lux-muted text-xs leading-relaxed mb-6 h-auto min-h-[3rem] font-light">
                                                {topic.description}
                                            </p>

                                            <div className="flex flex-col gap-2.5 pt-4">
                                                <Link
                                                    to={`/practice/${topic.id}`}
                                                    className="w-full h-10 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-lux-text text-lux-cream rounded-full hover:bg-black transition-all shadow-md shadow-lux-text/10 hover:shadow-lux-text/20 hover:scale-[1.02] active:scale-95"
                                                >
                                                    MCQ Practice <Sparkles className="w-3 h-3" />
                                                </Link>
                                                {topic.hasStudyMaterial ? (
                                                    <Link
                                                        to={`/study/${topic.id}`}
                                                        className="w-full h-10 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-lux-text bg-white border border-lux-text/10 rounded-full hover:bg-lux-text hover:text-white hover:border-lux-text transition-all duration-300 group/btn"
                                                    >
                                                        View Course <BookOpen className="w-3 h-3 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                                                    </Link>
                                                ) : (
                                                    <div className="w-full h-10 flex items-center justify-center text-[9px] font-bold uppercase tracking-widest text-lux-muted/40 cursor-not-allowed border border-dashed border-lux-text/5 rounded-full">
                                                        Course Coming Soon
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Premium Free Certificate Section */}
                            <div className="relative overflow-hidden rounded-[2.5rem] p-1 bg-gradient-to-br from-[#c89b3c] via-[#f0cf85] to-[#c89b3c] shadow-xl group hover:shadow-2xl transition-shadow duration-500">
                                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                                <div className="relative bg-white/95 backdrop-blur-xl rounded-[2.3rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/50">

                                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-amber-400/30 transition-colors duration-700" />

                                    <div className="flex-1 relative z-10">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-100 to-white border border-amber-200 flex items-center justify-center text-amber-700 shadow-sm">
                                                <Award className="w-4 h-4" />
                                            </div>
                                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-amber-900 text-[10px] font-black uppercase tracking-widest">
                                                Premium Free Certificate
                                            </span>
                                        </div>
                                        <h3 className="text-3xl font-serif text-lux-text mb-2">Get Industry Recognized.</h3>
                                        <p className="text-lux-muted text-sm max-w-lg font-light leading-relaxed">
                                            Complete the curriculum and pass the standardized assessment with 90%+ score to earn your verifiable credential.
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 relative z-10 min-w-fit">
                                        <Link to="/exam/numpy" className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:shadow-lg hover:shadow-amber-500/30 transition-all hover:-translate-y-0.5 text-center flex items-center justify-center gap-2">
                                            Start NumPy Exam
                                        </Link>
                                        <Link to="/exam/deep-learning" className="px-6 py-3 bg-white border border-amber-200 text-amber-900 text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-amber-50 hover:border-amber-300 transition-all text-center flex items-center justify-center gap-2">
                                            Deep Learning
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Sidebar (4 cols) */}
                        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                            <ProblemOfTheDay />

                            {/* Agency Promo - Editorial */}
                            <div className="bg-lux-text rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                                <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors duration-700" />

                                <Code2 className="w-8 h-8 text-white/80 mb-6" />
                                <h3 className="font-serif text-2xl mb-2 text-white">Need Custom<br />Solutions?</h3>
                                <p className="text-white/60 text-sm mb-8 leading-relaxed font-light">
                                    Our agency team builds enterprise-grade data solutions for businesses worldwide.
                                </p>
                                <Link
                                    to="/agency"
                                    className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white border-b border-white/30 pb-1 hover:border-white transition-all"
                                >
                                    Visit Agency <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </HelmetProvider>
    );
};
