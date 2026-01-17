import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { loadPracticeMetadata, QuestionSummary, Topic } from '../../utils/contentLoader';

interface PracticeLayoutProps {
    children: React.ReactNode;
}

export const PracticeLayout: React.FC<PracticeLayoutProps> = ({ children }) => {
    const { topic, problemId } = useParams<{ topic: string; problemId: string }>();
    const normalizedTopic = topic ? (topic.charAt(0).toUpperCase() + topic.slice(1)) as Topic : 'NumPy';

    const [problems, setProblems] = useState<QuestionSummary[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProblems = async () => {
            setLoading(true);
            try {
                // Use metadata loader for fast sidebar rendering
                const data = await loadPracticeMetadata(normalizedTopic);
                setProblems(data);
            } catch (error) {
                console.error("Failed to load problems", error);
            } finally {
                setLoading(false);
            }
        };

        if (topic) fetchProblems();
    }, [topic, normalizedTopic]);

    const grouped = {
        Basic: problems.filter(p => p.difficulty === 'Basic'),
        Medium: problems.filter(p => p.difficulty === 'Medium'),
        Hard: problems.filter(p => p.difficulty === 'Hard'),
    };

    return (
        <div className="flex h-screen bg-[#fcfcfc] overflow-hidden pt-24">
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed bottom-6 right-6 z-50 bg-black text-white p-4 rounded-full shadow-xl"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>

            {/* Sidebar */}
            {/* Sidebar */}
            {(isSidebarOpen || window.innerWidth >= 1024) && (
                <aside className="fixed inset-y-0 left-0 z-40 w-80 bg-white/80 backdrop-blur-xl border-r border-[#e5e5e5] flex flex-col lg:relative lg:inset-auto h-full">
                    {/* Header */}
                    <div className="p-8 border-b border-[#f0f0f0]">
                        <Link to={`/practice/${topic}`} className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors mb-3 block">
                            &larr; Return to Overview
                        </Link>
                        <h2 className="text-3xl font-serif text-black tracking-tight">{normalizedTopic}</h2>
                        <p className="text-xs text-gray-500 mt-2 font-medium tracking-wide font-sans">{problems.length} Challenges Available</p>
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
                        {['Basic', 'Medium', 'Hard'].map((diff) => {
                            const list = grouped[diff as keyof typeof grouped];
                            if (list.length === 0) return null;

                            return (
                                <div key={diff}>
                                    <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 mb-4 pl-3">{diff}</h3>
                                    <div className="space-y-1">
                                        {list.map(p => {
                                            const isActive = p.id === problemId;
                                            return (
                                                <Link
                                                    key={p.id}
                                                    to={`/practice/${topic}/${p.id}`}
                                                    className={`group flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all duration-300 border
                                                        ${isActive
                                                            ? 'bg-black text-white border-black shadow-lg shadow-black/10'
                                                            : 'bg-transparent text-gray-500 border-transparent hover:bg-gray-50 hover:text-black'
                                                        }`}
                                                >
                                                    <span className={`font-medium truncate pr-2 ${isActive ? 'font-sans' : 'font-serif'}`}>{p.title}</span>
                                                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </aside>
            )}

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 bg-[#f8f9fa] relative overflow-hidden h-full">
                {children}
            </main>
        </div>
    );
};
