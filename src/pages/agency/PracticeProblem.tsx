import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProblem, Question, Topic } from '../../utils/contentLoader';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export const PracticeProblem: React.FC = () => {
    const { topic, problemId } = useParams<{ topic: string; problemId: string }>();
    const [question, setQuestion] = useState<Question | null>(null);
    const [loading, setLoading] = useState(true);

    // Solver State
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [codeAnswer, setCodeAnswer] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        const loadQuestion = async () => {
            if (!problemId || !topic) return;
            setLoading(true);
            setStatus('idle');
            setSelectedOption(null);
            setCodeAnswer('');

            try {
                // Optimized fetch: Only loads the single problem file
                const normalizedTopic = (topic.charAt(0).toUpperCase() + topic.slice(1)) as Topic;
                const problem = await getProblem(normalizedTopic, problemId);
                setQuestion(problem);
            } catch (error) {
                console.error('Error loading question:', error);
            } finally {
                setLoading(false);
            }
        };
        loadQuestion();
    }, [topic, problemId]);

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

    if (loading) return <div className="flex-1 flex items-center justify-center italic text-gray-400">Loading...</div>;
    if (!question) return <div className="flex-1 flex items-center justify-center italic text-gray-400">Problem not found</div>;

    return (
        <HelmetProvider>
            <Helmet>
                <title>{question.title} | KaizenStat Practice</title>
                <meta name="description" content={`Solve ${question.title}: ${question.scenario.substring(0, 150)}...`} />
            </Helmet>
            <div className="flex flex-col lg:flex-row h-full overflow-hidden">

                {/* Left Pane: Problem Description */}
                <div className="flex-1 lg:w-1/2 overflow-y-auto border-r border-white/5 bg-black p-8 lg:p-12">
                    <div className="max-w-2xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border
                                ${question.difficulty === 'Basic' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                    question.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                        'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                                {question.difficulty}
                            </span>
                            <span className="text-xs text-lux-muted font-mono">#{question.id}</span>
                        </div>

                        <h1 className="text-3xl font-serif text-lux-text mb-8">{question.title}</h1>

                        <div className="prose prose-stone prose-invert max-w-none prose-p:leading-relaxed prose-p:mb-6">
                            <div className="bg-white/5 p-6 rounded-2xl border-l-4 border-white mb-8 italic text-lux-muted">
                                {question.scenario}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Pane: Solver */}
                <div className="flex-1 lg:w-1/2 bg-zinc-950 flex flex-col overflow-hidden relative">
                    {/* Toolbar */}
                    <div className="h-14 border-b border-white/5 bg-black flex items-center px-6 justify-between">
                        <div className="text-xs font-bold uppercase tracking-widest text-lux-muted">
                            {question.type === 'MCQ' ? 'Select Answer' : 'Code Solution'}
                        </div>
                        {/* Status Badge */}
                        {status !== 'idle' && (
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2
                                    ${status === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}
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
                                                ? 'border-white bg-white text-black shadow-lg'
                                                : 'border-white/10 bg-white/5 hover:border-white/30 text-lux-muted'
                                            }`}
                                    >
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4
                                            ${selectedOption === option ? 'border-black' : 'border-white/20 group-hover:border-white/40'}`}>
                                            {selectedOption === option && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
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
                                    className="flex-1 w-full bg-black border border-white/10 rounded-xl p-6 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-white/10 transition-shadow shadow-sm text-lux-text"
                                    spellCheck={false}
                                />
                            </div>
                        )}
                    </div>

                    {/* Footer / Results */}
                    <div className="p-6 border-t border-white/5 bg-black z-10">
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
                                                <p className="text-emerald-400 font-medium">✨ Correct! Well done.</p>
                                            ) : (
                                                <p className="text-rose-400 font-medium">Not quite. Try again?</p>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={question.type === 'MCQ' ? !selectedOption : !codeAnswer}
                                className="px-8 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-lux-muted transition-all active:scale-95 disabled:opacity-30"
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
                                    className="mt-6 border-t border-dashed border-white/10 pt-6"
                                >
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-lux-muted mb-3">Explanation</h4>
                                    <div className="prose prose-sm max-w-none break-words prose-invert prose-p:leading-relaxed prose-p:mb-4 prose-pre:rounded-none prose-pre:border prose-pre:border-white/10">
                                        <ReactMarkdown>{question.explanation}</ReactMarkdown>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    );
};
