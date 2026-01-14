import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ProblemOfTheDay } from '../components/practice/ProblemOfTheDay';
import { loadTopics, TopicMetadata } from '../utils/contentLoader';

const learningPaths = [
    { title: 'Data Science 101', count: '10 Modules', icon: '🎓' },
    { title: 'Machine Learning A-Z', count: '24 Modules', icon: '🤖' },
    { title: 'Interview Prep', count: '50 Questions', icon: '💼' }
];

export const PracticeHome: React.FC = () => {
    const [topics, setTopics] = useState<TopicMetadata[]>([]);

    useEffect(() => {
        loadTopics().then(setTopics);
    }, []);

    return (
        <HelmetProvider>
            <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 font-sans min-h-screen">
                <Helmet>
                    <title>Practice | KaizenStat</title>
                    <meta name="description" content="Master data science, machine learning, and analytics with our curated practice problems and study materials." />
                </Helmet>

                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* LEFT COLUMN - MAIN CONTENT */}
                        <div className="flex-1">
                            <div className="mb-10">
                                <motion.h1
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-4xl md:text-5xl font-serif text-lux-text mb-2"
                                >
                                    <span className="italic text-lux-muted/40">Welcome back,</span> Scholar.
                                </motion.h1>
                                <p className="text-lux-muted font-light">Continue your journey to data mastery.</p>
                            </div>

                            {/* TOPIC GRID */}
                            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-lux-muted mb-6">Practice Topics</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                                {topics.map((topic) => (
                                    <div
                                        key={topic.id}
                                        className="p-6 bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl transition-all duration-300 shadow-sm hover:shadow-md"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="text-3xl">{topic.icon}</div>
                                            <span className="px-2 py-1 bg-white/50 rounded-lg text-[10px] uppercase font-bold tracking-wider text-lux-muted">
                                                {topic.count} Qs
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-serif text-lux-text mb-1">{topic.title}</h3>
                                        <p className="text-lux-muted text-sm font-light mb-4">{topic.description}</p>

                                        <div className="flex gap-2">
                                            {topic.hasStudyMaterial ? (
                                                <Link
                                                    to={`/study/${topic.id}`}
                                                    className="flex-1 py-2.5 px-4 bg-white/50 hover:bg-white border border-white/60 rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] text-lux-text transition-all text-center group"
                                                >
                                                    📚 Study
                                                </Link>
                                            ) : (
                                                <div className="flex-1 py-2.5 px-4 bg-white/20 border border-white/20 rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] text-lux-muted/40 text-center cursor-not-allowed">
                                                    Coming Soon
                                                </div>
                                            )}
                                            <Link
                                                to={`/practice/${topic.id}`}
                                                className="flex-1 py-2.5 px-4 bg-lux-text hover:bg-black text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] transition-all text-center"
                                            >
                                                ⚡ Practice
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* GET CERTIFIED SECTION */}
                            <div className="mb-12">
                                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-lux-muted mb-6">🏆 Get Certified</h2>
                                <div className="bg-gradient-to-br from-amber-50 via-white to-amber-100 border border-amber-200 rounded-3xl p-6">
                                    <p className="text-lux-muted text-sm mb-4">Score 90% or higher on our certification exams and receive a downloadable digital certificate with your name!</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <Link
                                            to="/exam/numpy"
                                            className="flex items-center justify-between p-4 bg-white/80 rounded-2xl border border-amber-200 hover:border-amber-400 transition-colors group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">🔢</span>
                                                <span className="font-serif text-lux-text">NumPy Certification</span>
                                            </div>
                                            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-lg group-hover:bg-amber-200 transition-colors">Take Exam →</span>
                                        </Link>
                                        <Link
                                            to="/exam/deep-learning"
                                            className="flex items-center justify-between p-4 bg-white/80 rounded-2xl border border-amber-200 hover:border-amber-400 transition-colors group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">🧠</span>
                                                <span className="font-serif text-lux-text">Deep Learning Certification</span>
                                            </div>
                                            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-lg group-hover:bg-amber-200 transition-colors">Take Exam →</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* CURATED PATHS */}
                            <div className="mb-12">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-lux-muted">Curated Paths</h2>
                                    <button className="text-[10px] font-bold uppercase tracking-[0.1em] text-lux-text hover:text-lux-muted">View All</button>
                                </div>
                                <div className="space-y-3">
                                    {learningPaths.map((path, idx) => (
                                        <div key={idx} className="flex items-center p-4 bg-white/20 backdrop-blur-sm border border-white/40 rounded-2xl hover:bg-white/40 transition-colors cursor-pointer group">
                                            <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center text-xl mr-4 group-hover:scale-110 transition-transform">
                                                {path.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-serif text-lg text-lux-text">{path.title}</h4>
                                                <span className="text-xs text-lux-muted">{path.count}</span>
                                            </div>
                                            <div className="w-8 h-8 rounded-full border border-lux-text/10 flex items-center justify-center text-lux-text/40 group-hover:bg-lux-text group-hover:text-white transition-all">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* RECENT DISCUSSIONS (Mock) */}
                            <div className="mb-12">
                                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-lux-muted mb-6">Community Buzz</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-5 bg-white/10 border border-white/20 rounded-2xl hover:border-lux-text/20 transition-colors">
                                        <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 mb-2 block">Interview Exp</span>
                                        <h4 className="font-serif text-lg mb-2">Google Data Science Interview - L4</h4>
                                        <p className="text-xs text-lux-muted">"They asked mostly about A/B testing and SQL windows..."</p>
                                    </div>
                                    <div className="p-5 bg-white/10 border border-white/20 rounded-2xl hover:border-lux-text/20 transition-colors">
                                        <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600 mb-2 block">Pandas</span>
                                        <h4 className="font-serif text-lg mb-2">Efficient way to merge 10GB DataFrames?</h4>
                                        <p className="text-xs text-lux-muted">"Is it better to use Dask or just chunking..."</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN - SIDEBAR */}
                        <div className="w-full lg:w-96 space-y-8">
                            <ProblemOfTheDay />

                            <div className="bg-lux-text rounded-3xl p-8 text-white text-center relative overflow-hidden">
                                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,_white_0%,_transparent_50%)]" />
                                <h3 className="font-serif text-2xl mb-2 relative z-10">KaizenStat Agency</h3>
                                <p className="text-white/60 text-sm font-light mb-6 relative z-10">Need professional data solutions or custom dev?</p>
                                <Link
                                    to="/agency"
                                    className="inline-block px-6 py-3 bg-white text-lux-text rounded-full text-[10px] font-bold uppercase tracking-[0.2em] relative z-10 hover:scale-105 transition-transform"
                                >
                                    Visit Agency
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </HelmetProvider>
    );
};
