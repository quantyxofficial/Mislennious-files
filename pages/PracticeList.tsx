import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { loadPracticeMetadata, QuestionSummary, Topic } from '../utils/contentLoader';
import { CompanyTags } from '../components/practice/CompanyTags';
import { ChevronLeft, ArrowRight, Award } from 'lucide-react';

export const PracticeList: React.FC = () => {
    const { topic } = useParams<{ topic: string }>();
    const normalizedTopicStr = topic ? topic.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : '';

    const [questions, setQuestions] = useState<QuestionSummary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadQuestions = async () => {
            if (!topic) return;
            setLoading(true);
            try {
                const problems = await loadPracticeMetadata(topic as Topic);
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
            <div className="min-h-screen pt-24 pb-12 px-6 md:px-12 bg-[#FAFAFA] font-sans">
                <Helmet>
                    <title>{normalizedTopicStr} Practice Problems | KaizenStat</title>
                    <meta name="description" content={`Practice ${normalizedTopicStr} interview questions.`} />
                </Helmet>

                <div className="max-w-5xl mx-auto">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-900 mb-6 transition-colors">
                                <ChevronLeft className="w-3 h-3" /> Back to Curriculum
                            </Link>
                            <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-2">
                                {normalizedTopicStr} <span className="font-sans font-light text-gray-400">/ Problems</span>
                            </h1>
                            <p className="text-gray-500 text-sm">
                                {questions.length} active challenges available
                            </p>
                        </div>
                    </div>

                    {/* Problem List - Table Style */}
                    <div className="bg-white border border-gray-200 rounded-[2.5rem] overflow-hidden shadow-sm p-2">

                        {/* Table Header (Desktop) */}
                        <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-5 bg-gray-50/50 rounded-t-[2rem] border-b border-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                            <div className="col-span-6">Problem</div>
                            <div className="col-span-2">Difficulty</div>
                            <div className="col-span-2">Acceptance</div>
                            <div className="col-span-2 text-right">Action</div>
                        </div>

                        {loading ? (
                            <div className="p-12 text-center text-gray-400">
                                <div className="w-6 h-6 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin mx-auto mb-4" />
                                Loading...
                            </div>
                        ) : questions.length === 0 ? (
                            <div className="p-12 text-center text-gray-400 italic">
                                No questions found.
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {questions.map((q, idx) => (
                                    <Link
                                        key={q.id}
                                        to={`/practice/${topic}/${q.id}`}
                                        className="block md:grid md:grid-cols-12 md:gap-4 px-6 md:px-8 py-6 md:py-5 hover:bg-gray-50 rounded-[2rem] transition-colors group items-center mx-2"
                                    >
                                        {/* Title & Tags */}
                                        <div className="col-span-6 space-y-1 mb-3 md:mb-0">
                                            <h3 className="text-base font-semibold text-gray-900 group-hover:text-black transition-colors font-serif">
                                                {q.title}
                                            </h3>
                                            <div className="md:hidden flex gap-2 mb-2">
                                                <span className={`text-[10px] font-bold uppercase tracking-wider
                                                    ${q.difficulty === 'Basic' ? 'text-emerald-700' :
                                                        q.difficulty === 'Medium' ? 'text-amber-700' :
                                                            'text-rose-700'}`}>
                                                    {q.difficulty}
                                                </span>
                                            </div>
                                            <div className="hidden md:block">
                                                {q.companyTags && <CompanyTags tags={q.companyTags} />}
                                            </div>
                                        </div>

                                        {/* Status / Difficulty (Badge Style) */}
                                        <div className="col-span-2 hidden md:flex">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border
                                                ${q.difficulty === 'Basic' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                    q.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                        'bg-rose-50 text-rose-700 border-rose-100'}`}>
                                                {q.difficulty}
                                            </span>
                                        </div>

                                        {/* Acceptance */}
                                        <div className="col-span-2 hidden md:flex items-center text-xs text-gray-500 font-mono">
                                            {q.acceptanceRate ? `${q.acceptanceRate}%` : '-'}
                                        </div>

                                        {/* Action */}
                                        <div className="col-span-2 flex justify-end">
                                            <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-gray-900 group-hover:text-white group-hover:bg-gray-900 transition-all shadow-sm">
                                                <ArrowRight className="w-4 h-4" />
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
