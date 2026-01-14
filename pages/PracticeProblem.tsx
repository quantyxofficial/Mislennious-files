import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProblemById, Question } from '../utils/contentLoader';
import { motion, AnimatePresence } from 'framer-motion';
import { PracticeLayout } from '../components/practice/PracticeLayout';
import ReactMarkdown from 'react-markdown';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export const PracticeProblem: React.FC = () => {
    const { problemId } = useParams<{ topic: string; problemId: string }>();
    const [question, setQuestion] = useState<Question | null>(null);
    const [loading, setLoading] = useState(true);

    // Solver State
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [codeAnswer, setCodeAnswer] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        const loadQuestion = async () => {
            if (!problemId) return;
            setLoading(true);
            setStatus('idle');
            setSelectedOption(null);
            setCodeAnswer('');

            try {
                const problem = await getProblemById(problemId);
                setQuestion(problem);
            } catch (error) {
                console.error('Error loading question:', error);
            } finally {
                setLoading(false);
            }
        };
        loadQuestion();
    }, [problemId]);

    const handleSubmit = () => {
        if (!question) return;

        let isCorrect = false;
        if (question.type === 'MCQ') {
            isCorrect = selectedOption === question.correctAnswer;
        } else {
            // Basic normalization for code check
            isCorrect = codeAnswer.trim() === question.correctAnswer.trim();
        }

        setStatus(isCorrect ? 'success' : 'error');
    };

    if (loading) return <PracticeLayout><div className="flex-1 flex items-center justify-center italic text-gray-400">Loading...</div></PracticeLayout>;
    if (!question) return <PracticeLayout><div className="flex-1 flex items-center justify-center italic text-gray-400">Problem not found</div></PracticeLayout>;

    return (
        <HelmetProvider>
            <PracticeLayout>
                <Helmet>
                    <title>{question.title} | KaizenStat Practice</title>
                    <meta name="description" content={`Solve ${question.title}: ${question.scenario.substring(0, 150)}...`} />
                </Helmet>
                <div className="flex flex-col lg:flex-row h-full overflow-hidden">

                    {/* Left Pane: Problem Description */}
                    <div className="flex-1 lg:w-1/2 overflow-y-auto border-r border-black/5 bg-white p-8 lg:p-12">
                        <div className="max-w-2xl mx-auto">
                            <div className="flex items-center gap-3 mb-6">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border
                                    ${question.difficulty === 'Basic' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                        question.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                            'bg-rose-50 text-rose-700 border-rose-200'}`}>
                                    {question.difficulty}
                                </span>
                                <span className="text-xs text-gray-400 font-mono">#{question.id}</span>
                            </div>

                            <h1 className="text-3xl font-serif text-black mb-8">{question.title}</h1>

                            <div className="prose prose-stone prose-lg max-w-none">
                                <div className="bg-gray-50 p-6 rounded-2xl border-l-4 border-black mb-8 italic text-gray-700">
                                    {question.scenario}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Pane: Solver */}
                    <div className="flex-1 lg:w-1/2 bg-gray-50/50 flex flex-col overflow-hidden relative">
                        {/* Toolbar */}
                        <div className="h-14 border-b border-black/5 bg-white flex items-center px-6 justify-between">
                            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                {question.type === 'MCQ' ? 'Select Answer' : 'Code Solution'}
                            </div>
                            {/* Status Badge */}
                            {status !== 'idle' && (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2
                                        ${status === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}
                                >
                                    {status === 'success' ? 'Passed' : 'Failed'}
                                </motion.div>
                            )}
                        </div>

                        {/* Editor / Interaction Area */}
                        <div className="flex-1 overflow-y-auto p-6 lg:p-10 relative">
                            {question.type === 'MCQ' ? (
                                <div className="space-y-3 max-w-xl mx-auto mt-8">
                                    {question.options?.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => { setStatus('idle'); setSelectedOption(option); }}
                                            className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center group
                                                ${selectedOption === option
                                                    ? 'border-black bg-black text-white shadow-lg'
                                                    : 'border-white bg-white hover:border-black/20 text-gray-700'
                                                }`}
                                        >
                                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4
                                                ${selectedOption === option ? 'border-white' : 'border-gray-300 group-hover:border-gray-400'}`}>
                                                {selectedOption === option && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                            </div>
                                            <code className="font-mono text-sm">{option}</code>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-full flex flex-col">
                                    <textarea
                                        value={codeAnswer}
                                        onChange={(e) => { setStatus('idle'); setCodeAnswer(e.target.value); }}
                                        placeholder="# Write your Python code here..."
                                        className="flex-1 w-full bg-white border border-black/5 rounded-xl p-6 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black/5 transition-shadow shadow-sm"
                                        spellCheck={false}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Footer / Results */}
                        <div className="p-6 border-t border-black/5 bg-white z-10">
                            <div className="flex items-center justify-between max-w-xl mx-auto w-full">
                                <div className="flex-1">
                                    <AnimatePresence>
                                        {status !== 'idle' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="text-sm"
                                            >
                                                {status === 'success' ? (
                                                    <p className="text-emerald-700 font-medium">✨ Correct! Well done.</p>
                                                ) : (
                                                    <p className="text-rose-700 font-medium">Not quite. Try again?</p>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={question.type === 'MCQ' ? !selectedOption : !codeAnswer}
                                    className="px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                                >
                                    Run Code
                                </button>
                            </div>

                            {/* Explanation Reveal */}
                            <AnimatePresence>
                                {status === 'success' && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        className="mt-6 border-t border-dashed border-gray-200 pt-6"
                                    >
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Explanation</h4>
                                        <div className="prose prose-sm max-w-none text-gray-600">
                                            <ReactMarkdown>{question.explanation}</ReactMarkdown>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </PracticeLayout>
        </HelmetProvider>
    );
};
