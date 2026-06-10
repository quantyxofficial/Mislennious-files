import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { loadCurriculum, loadStudyMaterial, Curriculum, StudyMaterial, Chapter } from '../../utils/contentLoader';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ChevronLeft, ChevronRight, Menu, X, BookOpen, Clock, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const StudyChapter: React.FC = () => {
    const { topic, chapterId } = useParams<{ topic: string; chapterId: string }>();
    const navigate = useNavigate();
    const [curriculum, setCurriculum] = useState<Curriculum | null>(null);
    const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
    const [material, setMaterial] = useState<StudyMaterial | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeInternalSection, setActiveInternalSection] = useState<string>('');

    // Load Curriculum and Current Chapter
    useEffect(() => {
        const loadData = async () => {
            if (!topic || !chapterId) return;

            setLoading(true);
            try {
                const curr = await loadCurriculum(topic);
                setCurriculum(curr);

                const chapter = curr.chapters.find(c => c.id === chapterId);
                if (!chapter) {
                    console.error("Chapter not found");
                    return;
                }
                setCurrentChapter(chapter);

                const content = await loadStudyMaterial(topic, chapter.file);
                setMaterial(content);

            } catch (error) {
                console.error('Error loading study chapter:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
        window.scrollTo(0, 0);
    }, [topic, chapterId]);

    // Extract Internal ToC from Markdown
    const internalToc = useMemo(() => {
        if (!material?.content) return [];
        const lines = material.content.split('\n');
        return lines
            .filter(line => line.startsWith('## ') || line.startsWith('### '))
            .map(line => {
                const level = line.startsWith('### ') ? 3 : 2;
                const text = line.replace(/^###?\s+/, '').trim();
                const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                return { level, text, id };
            });
    }, [material?.content]);

    // Scroll Spy for internal ToC
    useEffect(() => {
        const handleScroll = () => {
            if (internalToc.length === 0) return;
            const scrollPosition = window.scrollY + 120;
            for (let i = internalToc.length - 1; i >= 0; i--) {
                const section = document.getElementById(internalToc[i].id);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveInternalSection(internalToc[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [internalToc]);

    const navigateToChapter = (id: string) => {
        navigate(`/study/${topic}/${id}`);
        setIsSidebarOpen(false);
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
            <div className="flex items-center justify-center min-h-screen bg-black">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-lux-muted font-serif italic text-lg">Loading chapter...</p>
                </div>
            </div>
        );
    }

    if (!material || !curriculum) return null;

    return (
        <div className="min-h-screen bg-black flex flex-col md:flex-row pt-20 relative">

            {/* MOBILE HEADER & TOGGLE */}
            <div className="md:hidden fixed top-20 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/5 px-4 py-3 flex items-center justify-between">
                <span className="font-serif font-bold text-white truncate">{currentChapter?.title}</span>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 text-lux-text hover:bg-stone-100 rounded-full"
                >
                    {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* SIDEBAR - Table of Contents */}
            <aside className={`
                fixed md:fixed top-[80px] left-0 h-[calc(100vh-80px)] w-full md:w-80 bg-black border-r border-white/5 
                z-50 transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="h-full overflow-y-auto px-6 py-8 custom-scrollbar">
                    <div className="mb-8">
                        <Link to={`/study/${topic}`} className="text-xs font-bold uppercase tracking-widest text-lux-muted hover:text-lux-text mb-4 inline-flex items-center gap-1">
                            <ChevronLeft size={12} /> Back to Course
                        </Link>
                        <h2 className="font-serif text-2xl text-lux-text mb-2">{curriculum.topic}</h2>
                        <p className="text-xs text-lux-muted leading-relaxed">{curriculum.description}</p>
                    </div>

                    {/* INTERNAL CHAPTER TOC */}
                    {internalToc.length > 0 && (
                        <div className="mb-10 pb-8 border-b border-white/5">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-6 flex items-center gap-2">
                                <List size={10} />
                                This Chapter
                            </h3>
                            <nav className="space-y-1">
                                {internalToc.map((item) => (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        className={`group flex items-start gap-3 py-2 text-[11px] transition-all duration-300 ${
                                            activeInternalSection === item.id 
                                            ? 'text-white font-bold' 
                                            : 'text-lux-muted hover:text-white'
                                        } ${item.level === 3 ? 'pl-4' : ''}`}
                                    >
                                        <div className={`w-1 h-1 rounded-full mt-1.5 shrink-0 transition-all duration-300 ${
                                            activeInternalSection === item.id ? 'bg-white scale-150' : 'bg-white/10 group-hover:bg-white/40'
                                        }`} />
                                        <span className="leading-tight">{item.text}</span>
                                    </a>
                                ))}
                            </nav>
                        </div>
                    )}

                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-6 flex items-center gap-2">
                        <BookOpen size={10} />
                        All Chapters
                    </h3>
                    <div className="space-y-1">
                        {curriculum.chapters.map((chapter, index) => {
                            const isActive = chapter.id === chapterId;
                            return (
                                <button
                                    key={chapter.id}
                                    onClick={() => navigateToChapter(chapter.id)}
                                    className={`w-full text-left group flex items-start gap-3 p-3 rounded-xl transition-all duration-200
                                        ${isActive
                                            ? 'bg-white text-black shadow-lg shadow-white/10'
                                            : 'hover:bg-white/5 text-lux-muted hover:text-white'
                                        }
                                    `}
                                >
                                    <span className={`text-[10px] font-bold mt-1 ${isActive ? 'text-black/60' : 'text-white/20'}`}>
                                        {(index + 1).toString().padStart(2, '0')}
                                    </span>
                                    <div className="flex-1">
                                        <span className={`block text-sm font-medium ${isActive ? 'text-black' : ''}`}>
                                            {chapter.title}
                                        </span>
                                    </div>
                                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-black mt-2" />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 min-w-0 md:pl-80">
                <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">

                    {/* Chapter Header */}
                    <div className="mb-12 pb-8 border-b border-white/5">
                        <div className="flex items-center gap-3 mb-4 text-lux-muted">
                            <BookOpen size={14} />
                            <span className="text-xs font-bold uppercase tracking-widest">Chapter {(curriculum.chapters.findIndex(c => c.id === chapterId) + 1).toString().padStart(2, '0')}</span>
                            <span className="w-1 h-1 rounded-full bg-white/10" />
                            <Clock size={14} />
                            <span className="text-xs font-bold uppercase tracking-widest">~15 min read</span>
                        </div>
                        <h1 className="font-serif text-4xl md:text-5xl text-lux-text leading-tight md:leading-tight">
                            {currentChapter?.title}
                        </h1>
                    </div>

                    {/* Content Renderer */}
                    <article className="prose prose-stone prose-invert max-w-none
                        prose-headings:font-serif prose-headings:text-lux-text prose-headings:tracking-tight
                        prose-h1:text-5xl prose-h1:mb-12
                        prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-white/5 prose-h2:scroll-mt-32
                        prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:scroll-mt-32
                        prose-p:text-lux-muted prose-p:leading-[1.8] prose-p:mb-8 prose-p:text-[1.1rem]
                        prose-ul:my-8 prose-ul:list-disc prose-ul:pl-6
                        prose-li:mb-3 prose-li:text-lux-muted
                        prose-a:text-white prose-a:underline prose-a:decoration-1 prose-a:underline-offset-4 hover:prose-a:text-blue-400 transition-colors
                        prose-strong:text-white prose-strong:font-bold
                        prose-code:text-white prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                        prose-pre:bg-transparent prose-pre:p-0 prose-pre:my-10
                        prose-img:rounded-3xl prose-img:shadow-2xl prose-img:my-12
                        prose-blockquote:border-l-2 prose-blockquote:border-white/20 prose-blockquote:italic prose-blockquote:text-lux-text/60 prose-blockquote:bg-white/5 prose-blockquote:py-1 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:my-10
                    ">
                        <ReactMarkdown
                            components={{
                                h2({ children }) {
                                    const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                                    return <h2 id={id}>{children}</h2>;
                                },
                                h3({ children }) {
                                    const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                                    return <h3 id={id}>{children}</h3>;
                                },
                                code({ className, children, ...props }: any) {
                                    const match = /language-(\w+)/.exec(className || '');
                                    const isInline = !match;

                                    return !isInline && match ? (
                                        <div className="relative group rounded-2xl overflow-hidden my-8 border border-white/10 shadow-sm bg-zinc-900">
                                            <div className="absolute top-3 right-3 px-2 py-1 bg-black/80 backdrop-blur rounded text-[10px] font-bold uppercase tracking-widest text-lux-muted border border-white/5">
                                                {match[1]}
                                            </div>
                                            <SyntaxHighlighter
                                                style={vscDarkPlus as any}
                                                language={match[1]}
                                                PreTag="div"
                                                customStyle={{
                                                    margin: 0,
                                                    padding: '1.5rem',
                                                    background: '#09090b',
                                                    fontSize: '0.95rem',
                                                    lineHeight: '1.6',
                                                    color: '#f8fafc',
                                                }}
                                                codeTagProps={{
                                                    style: {
                                                        color: '#f8fafc',
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
                    <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">

                        {prev ? (
                            <button
                                onClick={() => navigateToChapter(prev.id)}
                                className="group text-left p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/20 hover:shadow-lg transition-all duration-300"
                            >
                                <span className="block text-xs font-bold uppercase tracking-widest text-lux-muted mb-2 group-hover:text-white">Previous Chapter</span>
                                <span className="block font-serif text-xl text-white">{prev.title}</span>
                            </button>
                        ) : <div />}

                        {next ? (
                            <button
                                onClick={() => navigateToChapter(next.id)}
                                className="group text-right p-6 rounded-2xl border border-white/5 hover:border-white/20 hover:shadow-lg transition-all duration-300 bg-white/5 hover:bg-white/10"
                            >
                                <span className="block text-xs font-bold uppercase tracking-widest text-lux-muted mb-2 group-hover:text-white">Next Chapter</span>
                                <div className="flex items-center justify-end gap-2 text-white">
                                    <span className="block font-serif text-xl">{next.title}</span>
                                    <ChevronRight size={18} />
                                </div>
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate('/study/' + topic)}
                                className="group text-right p-6 rounded-2xl border border-white/5 hover:border-white/20 hover:shadow-lg transition-all duration-300 bg-white/5 hover:bg-white/10"
                            >
                                <span className="block text-xs font-bold uppercase tracking-widest text-lux-muted mb-2 group-hover:text-white">Complete</span>
                                <div className="flex items-center justify-end gap-2 text-white">
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
