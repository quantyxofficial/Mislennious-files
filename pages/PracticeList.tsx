import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { loadPracticeProblems, Question, Topic } from '../utils/contentLoader';
import { CompanyTags } from '../components/practice/CompanyTags';

export const PracticeList: React.FC = () => {
    const { topic } = useParams<{ topic: string }>();
    const normalizedTopicStr = topic ? topic.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : '';
    // We send the raw topic slug to the loader, which handles path construction

    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadQuestions = async () => {
            if (!topic) return;

            setLoading(true);
            try {
                // Cast to Topic (string)
                const problems = await loadPracticeProblems(topic as Topic);
                setQuestions(problems);
            } catch (error) {
                console.error('Error loading questions:', error);
            } finally {
                setLoading(false);
            }
        };

        loadQuestions();
    }, [topic]);

    return (
        <HelmetProvider>
            <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen">
                <Helmet>
                    <title>{normalizedTopicStr} Practice Problems | KaizenStat</title>
                    <meta name="description" content={`Practice ${normalizedTopicStr} interview questions and coding challenges.`} />
                </Helmet>

                <div className="max-w-5xl mx-auto">
                    <div className="mb-12">
                        <Link to="/practice" className="text-[10px] font-bold uppercase tracking-[0.15em] text-lux-muted hover:text-lux-text mb-6 inline-block transition-colors">&larr; Back to Topics</Link>
                        <h1 className="text-4xl md:text-5xl font-serif text-lux-text mb-4">{normalizedTopicStr} <span className="italic text-lux-muted">Problems</span></h1>
                        <p className="text-lux-muted font-light text-lg">Select a challenge to begin your journey.</p>
                    </div>

                    <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.02)]">
                        {loading ? (
                            <div className="p-12 text-center text-lux-muted font-serif italic text-xl">
                                Loading questions...
                            </div>
                        ) : questions.length === 0 ? (
                            <div className="p-12 text-center text-lux-muted font-serif italic text-xl">
                                No questions found for this topic yet.
                            </div>
                        ) : (
                            <div className="divide-y divide-lux-text/5">
                                {questions.map((q) => (
                                    <Link
                                        key={q.id}
                                        to={`/practice/${topic}/${q.id}`}
                                        className="block p-8 hover:bg-white/40 transition-colors group"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-4 mb-2">
                                                    <h3 className="text-xl font-serif text-lux-text group-hover:text-black transition-colors">{q.title}</h3>
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] border
                                                        ${q.difficulty === 'Basic' ? 'bg-emerald-50/50 text-emerald-700 border-emerald-200/50' :
                                                            q.difficulty === 'Medium' ? 'bg-amber-50/50 text-amber-700 border-amber-200/50' :
                                                                'bg-rose-50/50 text-rose-700 border-rose-200/50'}`}>
                                                        {q.difficulty}
                                                    </span>
                                                    {q.acceptanceRate && (
                                                        <span className="text-[10px] font-mono text-lux-muted/60">
                                                            High Acceptance: {q.acceptanceRate}%
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-lux-muted font-sans font-light text-sm line-clamp-1 mb-2">{q.scenario}</p>
                                                {q.companyTags && <CompanyTags tags={q.companyTags} />}
                                            </div>
                                            <div className="text-lux-muted/40 group-hover:text-lux-text transition-colors transform group-hover:translate-x-1 duration-300 ml-4 mt-2">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </HelmetProvider>
    );
};
