import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { loadCurriculum, loadStudyMaterial, Curriculum, StudyMaterial, Chapter } from '../utils/contentLoader';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ChevronLeft, ChevronRight, Menu, X, BookOpen, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const StudyChapter: React.FC = () => {
    const { topic, chapterId } = useParams<{ topic: string; chapterId: string }>();
    const navigate = useNavigate();
    const normalizedTopic = topic ? topic.charAt(0).toUpperCase() + topic.slice(1) : '';

    const [curriculum, setCurriculum] = useState<Curriculum | null>(null);
    const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
    const [material, setMaterial] = useState<StudyMaterial | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state

    // Load Curriculum and Current Chapter
    useEffect(() => {
        const loadData = async () => {
            if (!topic || !chapterId) return;

            setLoading(true);
            try {
                // 1. Fetch Curriculum
                const curr = await loadCurriculum(topic);
                setCurriculum(curr);

                // 2. Find Current Chapter Info
                const chapter = curr.chapters.find(c => c.id === chapterId);
                if (!chapter) {
                    console.error("Chapter not found");
                    // Optionally redirect to topic home
                    return;
                }
                setCurrentChapter(chapter);

                // 3. Load Markdown Content
                const content = await loadStudyMaterial(topic, chapter.file);
                setMaterial(content);

            } catch (error) {
                console.error('Error loading study chapter:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
        // Scroll to top on chapter change
        window.scrollTo(0, 0);
    }, [topic, chapterId]);

    // Handle Navigation
    const navigateToChapter = (id: string) => {
        navigate(`/study/${topic}/${id}`);
        setIsSidebarOpen(false); // Close sidebar on mobile
    };

    const findNextPrev = () => {
        if (!curriculum || !currentChapter) return { prev: null, next: null };
        const index = curriculum.chapters.findIndex(c => c.id === currentChapter.id);
        const prev = index > 0 ? curriculum.chapters[index - 1] : null;
        const next = index < curriculum.chapters.length - 1 ? curriculum.chapters[index + 1] : null;
        return { prev, next };
    };

    const { prev, next } = findNextPrev();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#FAFAF9]">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-lux-text border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-lux-muted font-serif italic text-lg">Loading chapter...</p>
                </div>
            </div>
        );
    }

    if (!material || !curriculum) return null;

    return (
        <div className="min-h-screen bg-[#FAFAF9] flex flex-col md:flex-row pt-20">

            {/* MOBILE HEADER & TOGGLE */}
            <div className="md:hidden fixed top-20 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200 px-4 py-3 flex items-center justify-between">
                <span className="font-serif font-bold text-lux-text truncate">{currentChapter?.title}</span>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 text-lux-text hover:bg-stone-100 rounded-full"
                >
                    {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* SIDEBAR - Table of Contents */}
            <aside className={`
                fixed md:sticky top-[80px] left-0 h-[calc(100vh-80px)] w-full md:w-80 bg-white border-r border-stone-100 
                z-50 md:z-auto transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="h-full overflow-y-auto px-6 py-8">
                    <div className="mb-8">
                        <Link to="/study/numpy" className="text-xs font-bold uppercase tracking-widest text-lux-muted hover:text-lux-text mb-4 inline-flex items-center gap-1">
                            <ChevronLeft size={12} /> Back to Course
                        </Link>
                        <h2 className="font-serif text-2xl text-lux-text mb-2">{curriculum.topic}</h2>
                        <p className="text-xs text-lux-muted leading-relaxed">{curriculum.description}</p>
                    </div>

                    <div className="space-y-1">
                        {curriculum.chapters.map((chapter, index) => {
                            const isActive = chapter.id === chapterId;
                            return (
                                <button
                                    key={chapter.id}
                                    onClick={() => navigateToChapter(chapter.id)}
                                    className={`w-full text-left group flex items-start gap-3 p-3 rounded-xl transition-all duration-200
                                        ${isActive
                                            ? 'bg-lux-text text-lux-cream shadow-lg shadow-black/5'
                                            : 'hover:bg-stone-50 text-lux-muted hover:text-lux-text'
                                        }
                                    `}
                                >
                                    <span className={`text-[10px] font-bold mt-1 ${isActive ? 'text-white/60' : 'text-stone-400'}`}>
                                        {(index + 1).toString().padStart(2, '0')}
                                    </span>
                                    <div className="flex-1">
                                        <span className={`block text-sm font-medium ${isActive ? 'text-white' : ''}`}>
                                            {chapter.title}
                                        </span>
                                    </div>
                                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white mt-2" />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 min-w-0">
                <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">

                    {/* Chapter Header */}
                    <div className="mb-12 pb-8 border-b border-stone-100">
                        <div className="flex items-center gap-3 mb-4 text-lux-muted">
                            <BookOpen size={14} />
                            <span className="text-xs font-bold uppercase tracking-widest">Chapter {(curriculum.chapters.findIndex(c => c.id === chapterId) + 1).toString().padStart(2, '0')}</span>
                            <span className="w-1 h-1 rounded-full bg-stone-300" />
                            <Clock size={14} />
                            <span className="text-xs font-bold uppercase tracking-widest">~15 min read</span>
                        </div>
                        <h1 className="font-serif text-4xl md:text-5xl text-lux-text leading-tight md:leading-tight">
                            {currentChapter?.title}
                        </h1>
                    </div>

                    {/* Content Renderer */}
                    <article className="prose prose-stone prose-lg max-w-none 
                        prose-headings:font-serif prose-headings:text-lux-text 
                        prose-p:text-lux-text/80 prose-p:leading-relaxed 
                        prose-a:text-lux-text prose-a:underline prose-a:decoration-1 prose-a:underline-offset-2 hover:prose-a:text-blue-600
                        prose-strong:text-lux-text prose-strong:font-semibold
                        prose-code:text-lux-text prose-code:bg-stone-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono 
                        prose-pre:bg-transparent prose-pre:p-0 
                        prose-img:rounded-3xl prose-img:shadow-xl
                    ">
                        <ReactMarkdown
                            components={{
                                code({ className, children, ...props }: any) {
                                    const match = /language-(\w+)/.exec(className || '');
                                    const isInline = !match;

                                    return !isInline && match ? (
                                        <div className="relative group rounded-2xl overflow-hidden my-8 border border-stone-200 shadow-sm bg-stone-50">
                                            <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur rounded text-[10px] font-bold uppercase tracking-widest text-stone-500 border border-stone-100">
                                                {match[1]}
                                            </div>
                                            <SyntaxHighlighter
                                                style={vs as any}
                                                language={match[1]}
                                                PreTag="div"
                                                customStyle={{
                                                    margin: 0,
                                                    padding: '1.5rem',
                                                    background: '#f5f5f4',
                                                    fontSize: '0.95rem',
                                                    lineHeight: '1.6',
                                                    color: '#1C1917',
                                                }}
                                                codeTagProps={{
                                                    style: {
                                                        color: '#1C1917',
                                                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                                    }
                                                }}
                                                {...props}
                                            >
                                                {String(children).replace(/\n$/, '')}
                                            </SyntaxHighlighter>
                                        </div>
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    );
                                }
                            }}
                        >
                            {material.content}
                        </ReactMarkdown>
                    </article>

                    {/* Navigation Footer */}
                    <div className="mt-20 pt-10 border-t border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-6">

                        {prev ? (
                            <button
                                onClick={() => navigateToChapter(prev.id)}
                                className="group text-left p-6 rounded-2xl border border-stone-200 hover:border-lux-text/30 hover:shadow-lg transition-all duration-300"
                            >
                                <span className="block text-xs font-bold uppercase tracking-widest text-lux-muted mb-2 group-hover:text-lux-text">Previous Chapter</span>
                                <span className="block font-serif text-xl text-lux-text">{prev.title}</span>
                            </button>
                        ) : <div />}

                        {next ? (
                            <button
                                onClick={() => navigateToChapter(next.id)}
                                className="group text-right p-6 rounded-2xl border border-stone-200 hover:border-lux-text/30 hover:shadow-lg transition-all duration-300 bg-stone-50 hover:bg-white"
                            >
                                <span className="block text-xs font-bold uppercase tracking-widest text-lux-muted mb-2 group-hover:text-lux-text">Next Chapter</span>
                                <div className="flex items-center justify-end gap-2 text-lux-text">
                                    <span className="block font-serif text-xl">{next.title}</span>
                                    <ChevronRight size={18} />
                                </div>
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate('/study/' + topic)}
                                className="group text-right p-6 rounded-2xl border border-stone-200 hover:border-lux-text/30 hover:shadow-lg transition-all duration-300 bg-stone-50 hover:bg-white"
                            >
                                <span className="block text-xs font-bold uppercase tracking-widest text-lux-muted mb-2 group-hover:text-lux-text">Complete</span>
                                <div className="flex items-center justify-end gap-2 text-lux-text">
                                    <span className="block font-serif text-xl">Finish Course</span>
                                    <ChevronRight size={18} />
                                </div>
                            </button>
                        )}

                    </div>

                </div>
            </main>
        </div>
    );
};
