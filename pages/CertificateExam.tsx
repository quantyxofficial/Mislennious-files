import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ChevronRight, Award, CheckCircle, XCircle, Download, RotateCcw } from 'lucide-react';
import { toPng } from 'html-to-image';

interface Question {
    id: number;
    question: string;
    options: string[];
    answer: number;
}

type ExamState = 'loading' | 'ready' | 'in-progress' | 'submitted' | 'certified';

export const CertificateExam: React.FC = () => {
    const { topic } = useParams<{ topic: string }>();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<{ [key: number]: number }>({});
    const [examState, setExamState] = useState<ExamState>('loading');
    const [score, setScore] = useState(0);
    const [studentName, setStudentName] = useState('');
    const [collegeName, setCollegeName] = useState('');
    const certificateRef = useRef<HTMLDivElement>(null);

    const topicTitle = topic?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Exam';
    const passingScore = 90;

    useEffect(() => {
        if (!topic) return;
        fetch(`/content/exams/${topic}/questions.json`)
            .then(res => res.json())
            .then((data: Question[]) => {
                setQuestions(data);
                setExamState('ready');
            })
            .catch(() => setExamState('ready'));
    }, [topic]);

    const handleAnswerSelect = (questionId: number, optionIndex: number) => {
        setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    };

    const handleSubmit = () => {
        let correct = 0;
        questions.forEach(q => {
            if (answers[q.id] === q.answer) correct++;
        });
        const percentage = Math.round((correct / questions.length) * 100);
        setScore(percentage);
        setExamState('submitted');
    };

    const handleGetCertificate = () => {
        if (studentName.trim() && collegeName.trim()) {
            setExamState('certified');
        }
    };

    const handleDownloadCertificate = async () => {
        if (certificateRef.current) {
            const dataUrl = await toPng(certificateRef.current, { quality: 1, pixelRatio: 2 });
            const link = document.createElement('a');
            link.download = `KaizenStat_Certificate_${studentName.replace(/\s/g, '_')}.png`;
            link.href = dataUrl;
            link.click();
        }
    };

    const handleRetry = () => {
        setAnswers({});
        setScore(0);
        setStudentName('');
        setCollegeName('');
        setExamState('ready');
    };

    const allAnswered = questions.length > 0 && Object.keys(answers).length === questions.length;

    return (
        <HelmetProvider>
            <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 font-sans min-h-screen">
                <Helmet>
                    <title>{topicTitle} Certification Exam | KaizenStat</title>
                </Helmet>

                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <Link to="/" className="text-lux-muted text-sm hover:text-lux-text transition-colors flex items-center gap-1 mb-4">
                            ← Back to Practice
                        </Link>
                        <h1 className="text-4xl font-serif text-lux-text mb-2">
                            🏆 {topicTitle} Certification
                        </h1>
                        <p className="text-lux-muted">Score {passingScore}% or higher to earn your digital certificate.</p>
                    </div>

                    {/* Ready State */}
                    {examState === 'ready' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl p-8 text-center"
                        >
                            <Award className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                            <h2 className="text-2xl font-serif text-lux-text mb-2">Ready to prove your skills?</h2>
                            <p className="text-lux-muted mb-6">This exam contains {questions.length} multiple-choice questions. You need {passingScore}% to pass.</p>
                            <button
                                onClick={() => setExamState('in-progress')}
                                className="px-8 py-3 bg-lux-text text-lux-cream rounded-full font-medium hover:bg-lux-text/90 transition-colors"
                            >
                                Start Exam <ChevronRight className="inline w-4 h-4 ml-1" />
                            </button>
                        </motion.div>
                    )}

                    {/* In Progress */}
                    {examState === 'in-progress' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            {questions.map((q, idx) => (
                                <div key={q.id} className="bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl p-6">
                                    <p className="text-xs text-lux-muted uppercase tracking-wider mb-2">Question {idx + 1} of {questions.length}</p>
                                    <p className="text-lg font-medium text-lux-text mb-4">{q.question}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {q.options.map((opt, optIdx) => (
                                            <button
                                                key={optIdx}
                                                onClick={() => handleAnswerSelect(q.id, optIdx)}
                                                className={`p-4 rounded-xl text-left border transition-all ${answers[q.id] === optIdx
                                                    ? 'bg-lux-text text-lux-cream border-lux-text'
                                                    : 'bg-white/50 border-stone-200 hover:border-stone-400 text-lux-text'
                                                    }`}
                                            >
                                                <span className="font-mono text-xs mr-2 opacity-60">{String.fromCharCode(65 + optIdx)}.</span>
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div className="text-center pt-4">
                                <button
                                    onClick={handleSubmit}
                                    disabled={!allAnswered}
                                    className={`px-10 py-4 rounded-full font-medium transition-all ${allAnswered
                                        ? 'bg-lux-text text-lux-cream hover:bg-lux-text/90'
                                        : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                                        }`}
                                >
                                    Submit Exam
                                </button>
                                {!allAnswered && <p className="text-xs text-lux-muted mt-2">Please answer all questions.</p>}
                            </div>
                        </motion.div>
                    )}

                    {/* Submitted - Results */}
                    {examState === 'submitted' && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl p-8 text-center">
                            {score >= passingScore ? (
                                <>
                                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                                    <h2 className="text-3xl font-serif text-lux-text mb-2">Congratulations! 🎉</h2>
                                    <p className="text-lg text-lux-muted mb-1">You scored <span className="font-bold text-green-600">{score}%</span></p>
                                    <p className="text-lux-muted mb-8">Enter your details to generate your certificate.</p>
                                    <div className="max-w-md mx-auto space-y-4 text-left">
                                        <div>
                                            <label className="block text-xs uppercase tracking-wider text-lux-muted mb-1">Your Full Name</label>
                                            <input
                                                type="text"
                                                value={studentName}
                                                onChange={(e) => setStudentName(e.target.value)}
                                                placeholder="e.g., Rahul Sharma"
                                                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-lux-text"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs uppercase tracking-wider text-lux-muted mb-1">College / Institution Name</label>
                                            <input
                                                type="text"
                                                value={collegeName}
                                                onChange={(e) => setCollegeName(e.target.value)}
                                                placeholder="e.g., IIT Delhi"
                                                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-lux-text"
                                            />
                                        </div>
                                        <button
                                            onClick={handleGetCertificate}
                                            disabled={!studentName.trim() || !collegeName.trim()}
                                            className={`w-full py-3 rounded-full font-medium transition-all ${studentName.trim() && collegeName.trim()
                                                ? 'bg-green-600 text-white hover:bg-green-700'
                                                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                                                }`}
                                        >
                                            Generate Certificate
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <XCircle className="w-20 h-20 text-red-400 mx-auto mb-4" />
                                    <h2 className="text-3xl font-serif text-lux-text mb-2">Keep Practicing!</h2>
                                    <p className="text-lg text-lux-muted mb-1">You scored <span className="font-bold text-red-500">{score}%</span></p>
                                    <p className="text-lux-muted mb-8">You need {passingScore}% to pass. Review the material and try again.</p>
                                    <button onClick={handleRetry} className="px-8 py-3 bg-lux-text text-lux-cream rounded-full font-medium hover:bg-lux-text/90 transition-colors">
                                        <RotateCcw className="inline w-4 h-4 mr-2" /> Retry Exam
                                    </button>
                                </>
                            )}
                        </motion.div>
                    )}

                    {/* Certified - Display & Download */}
                    {examState === 'certified' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                            {/* The Certificate Visual */}
                            <div ref={certificateRef} className="bg-gradient-to-br from-amber-50 via-white to-amber-100 border-4 border-amber-400 rounded-2xl p-10 shadow-2xl text-center aspect-[1.414/1]" style={{ minHeight: 500 }}>
                                <div className="border-2 border-amber-300 rounded-xl p-8 h-full flex flex-col justify-between">
                                    <div>
                                        <p className="text-amber-600 tracking-[0.3em] text-xs uppercase mb-2">Certificate of Completion</p>
                                        <h2 className="text-5xl font-serif text-lux-text mb-1">KaizenStat</h2>
                                        <p className="text-lux-muted text-sm">Data Science Academy</p>
                                    </div>
                                    <div className="py-10">
                                        <p className="text-lux-muted text-sm mb-2">This certifies that</p>
                                        <p className="text-4xl font-serif text-lux-text border-b-2 border-amber-300 pb-2 mb-2 inline-block px-8">{studentName}</p>
                                        <p className="text-lux-muted text-sm">from <span className="font-medium text-lux-text">{collegeName}</span></p>
                                        <p className="text-lux-muted text-sm mt-6">has successfully completed the</p>
                                        <p className="text-2xl font-serif text-amber-700 mt-1">{topicTitle} Certification Exam</p>
                                        <p className="text-lux-muted text-sm mt-2">with a score of <span className="font-bold text-green-600">{score}%</span></p>
                                    </div>
                                    <div className="flex justify-between items-end text-xs text-lux-muted">
                                        <p>Date: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                        <p className="font-serif italic text-sm text-amber-700">KaizenStat Authority</p>
                                    </div>
                                </div>
                            </div>

                            {/* Download Button */}
                            <div className="text-center">
                                <button
                                    onClick={handleDownloadCertificate}
                                    className="px-10 py-4 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors shadow-lg"
                                >
                                    <Download className="inline w-5 h-5 mr-2" /> Download Certificate (PNG)
                                </button>
                                <p className="text-xs text-lux-muted mt-4">Share your achievement on LinkedIn!</p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </HelmetProvider>
    );
};
