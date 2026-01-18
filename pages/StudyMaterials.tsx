import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { loadStudyMaterial, loadCurriculum, StudyMaterial, Topic } from '../utils/contentLoader';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const StudyMaterials: React.FC = () => {
    const { topic } = useParams<{ topic: string }>();
    const normalizedTopic = topic ? topic.charAt(0).toUpperCase() + topic.slice(1) : '';

    const [curriculum, setCurriculum] = useState<any | null>(null); // Using any temporarily for fast iter, ideally import the type
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMaterial = async () => {
            if (!topic) return;

            setLoading(true);
            try {
                // Load Curriculum
                const curr = await loadCurriculum(topic);
                setCurriculum(curr);
            } catch (error) {
                console.error('Error loading study material:', error);
            } finally {
                setLoading(false);
            }
        };

        loadMaterial();
    }, [topic, normalizedTopic]);

    if (loading) {
        return (
            <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen">
                <div className="max-w-4xl mx-auto text-center text-lux-muted font-serif italic text-xl">
                    Loading curriculum...
                </div>
            </div>
        );
    }

    if (!curriculum) {
        return (
            <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-lux-muted font-serif italic text-xl mb-6">Course curriculum not found.</p>
                    <Link to="/" className="text-lux-text hover:underline">
                        &larr; Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-16 text-center">
                    <Link to="/" className="text-[10px] font-bold uppercase tracking-[0.15em] text-lux-muted hover:text-lux-text mb-6 inline-block transition-colors">
                        &larr; Back to Home
                    </Link>
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] border bg-blue-50/50 text-blue-700 border-blue-200/50">
                            Course Curriculum
                        </span>
                        <span className="text-lux-muted/60 text-[10px] tracking-widest font-mono">{normalizedTopic}</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif text-lux-text mb-6 tracking-tight">{curriculum.topic} Mastery</h1>
                    <p className="text-xl text-lux-muted max-w-2xl mx-auto font-light leading-relaxed">{curriculum.description}</p>
                </div>

                {/* Chapter Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {curriculum.chapters.map((chapter: any, index: number) => (
                        <Link
                            key={chapter.id}
                            to={`/study/${topic}/${chapter.id}`}
                            className="group relative bg-white border border-stone-200 rounded-[2rem] p-8 hover:shadow-2xl hover:shadow-stone-200/50 hover:border-lux-text/10 transition-all duration-500 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 font-serif text-8xl text-stone-200 group-hover:scale-110 transition-transform duration-700 select-none pointer-events-none">
                                {index + 1}
                            </div>

                            <div className="relative z-10">
                                <span className="inline-block px-3 py-1 rounded-full bg-stone-100 text-lux-muted text-[10px] font-bold uppercase tracking-widest mb-6 group-hover:bg-lux-text group-hover:text-lux-cream transition-colors duration-300">
                                    Chapter {(index + 1).toString().padStart(2, '0')}
                                </span>
                                <h3 className="text-2xl font-serif text-lux-text mb-3 group-hover:translate-x-1 transition-transform duration-300">{chapter.title}</h3>
                                <p className="text-lux-muted/80 text-sm leading-relaxed mb-8">{chapter.description}</p>

                                <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-lux-text group-hover:underline decoration-1 underline-offset-4">
                                    Start Learning <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Practice CTA */}
                <div className="mt-20 text-center">
                    <div className="inline-block p-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100">
                        <div className="bg-white/80 backdrop-blur rounded-full px-8 py-10 md:px-12">
                            <h3 className="font-serif text-2xl text-lux-text mb-4">Ready to test your knowledge?</h3>
                            <p className="text-lux-muted mb-6">Apply what you've learned in our interactive practice environment.</p>
                            <Link
                                to={`/practice/${topic}`}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-lux-text hover:bg-black text-lux-cream font-bold uppercase tracking-[0.2em] text-[11px] rounded-full transition-all duration-300 shadow-xl shadow-black/5 hover:-translate-y-1"
                            >
                                Solve {normalizedTopic} Problems
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
