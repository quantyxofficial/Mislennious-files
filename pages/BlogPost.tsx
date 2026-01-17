import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getBlogPost, BlogPost as BlogPostType } from '../utils/contentLoader';
import ReactMarkdown from 'react-markdown';
import { ChevronLeft, Clock, Calendar, User, Share2, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';
import { motion } from 'framer-motion';

export const BlogPost: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const [post, setPost] = useState<BlogPostType | null>(null);
    const [loading, setLoading] = useState(true);
    const [toc, setToc] = useState<{ id: string; text: string; level: number }[]>([]);
    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        const fetchPost = async () => {
            if (postId) {
                const data = await getBlogPost(postId);
                setPost(data);

                if (data?.content) {
                    const lines = data.content.split('\n');
                    const headers: { id: string; text: string; level: number }[] = [];
                    lines.forEach(line => {
                        const match = line.match(/^(#{2,3})\s+(.+)$/);
                        if (match) {
                            const level = match[1].length;
                            const text = match[2];
                            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                            headers.push({ id, text, level });
                        }
                    });
                    setToc(headers);
                }
                setLoading(false);
            }
        };
        fetchPost();
    }, [postId]);

    // Scroll Spy
    useEffect(() => {
        const handleScroll = () => {
            const sections = toc.map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + 150;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(section.id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [toc]);

    if (loading) {
        return (
            <div className="min-h-screen pt-32 flex justify-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!post) return <Navigate to="/blog" replace />;

    return (
        <div className="min-h-screen pt-28 pb-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">

            {/* Breadcrumb */}
            <div className="mb-8">
                <Link to="/blog" className="inline-flex items-center gap-2 text-lux-muted hover:text-lux-text transition-colors group text-sm font-medium">
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Blog
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Main Content Area */}
                <article className="lg:col-span-8 space-y-8">

                    {/* Header */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100 uppercase tracking-wide">
                                {post.category}
                            </span>
                        </div>

                        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-b border-gray-100 pb-8">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                                    KS
                                </div>
                                <span className="font-medium text-gray-900">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 aspect-video relative group">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl"></div>
                    </div>

                    {/* Ad Placeholder - Top of Content */}
                    <div className="w-full h-[100px] bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 text-sm">
                        <span className="font-semibold">Advertisement</span>
                        <span className="text-xs">Google AdSense / Sponsor</span>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none 
                        prose-headings:font-serif prose-headings:font-bold prose-headings:text-gray-900 
                        prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-[1.05rem]
                        prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-gray-900 prose-strong:font-semibold
                        prose-ul:marker:text-blue-500 prose-li:text-gray-600
                        prose-img:rounded-xl prose-img:shadow-md
                        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                    ">
                        <ReactMarkdown
                            components={{
                                h2: ({ node, ...props }) => {
                                    const id = props.children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-') || '';
                                    return <h2 id={id} className="scroll-mt-24" {...props} />;
                                },
                                h3: ({ node, ...props }) => {
                                    const id = props.children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-') || '';
                                    return <h3 id={id} className="scroll-mt-24" {...props} />;
                                }
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    {/* Ad Placeholder - Bottom of Content */}
                    <div className="w-full h-[250px] bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 text-sm mt-12">
                        <span className="font-semibold">Advertisement</span>
                        <span className="text-xs">Google AdSense / Related Content</span>
                    </div>

                </article>

                {/* Sidebar */}
                <aside className="lg:col-span-4 space-y-8">

                    {/* TOC Sticky */}
                    <div className="sticky top-28 space-y-8">

                        {/* Table of Contents */}
                        {toc.length > 0 && (
                            <div className="bg-white/50 backdrop-blur-sm border border-white/60 shadow-sm rounded-xl p-6">
                                <h3 className="font-serif font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    Table of Contents
                                </h3>
                                <nav className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                    <ul className="space-y-1">
                                        {toc.map((item) => (
                                            <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 12}px` }}>
                                                <a
                                                    href={`#${item.id}`}
                                                    className={`block py-1.5 px-3 rounded-md text-sm transition-all duration-200 border-l-2 ${activeSection === item.id
                                                        ? 'bg-blue-50 text-blue-700 border-blue-600 font-medium translate-x-1'
                                                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50 border-transparent'
                                                        }`}
                                                >
                                                    {item.text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        )}

                        {/* Ad Placeholder - Sidebar */}
                        <div className="w-full h-[300px] bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 text-sm">
                            <span className="font-semibold">Advertisement</span>
                            <span className="text-xs">Square Ad Unit</span>
                        </div>

                        {/* Share / Socials */}
                        <div className="bg-white/50 backdrop-blur-sm border border-white/60 shadow-sm rounded-xl p-6">
                            <h3 className="font-serif font-bold text-gray-900 mb-4">Share this article</h3>
                            <div className="flex gap-2">
                                <button className="p-2 rounded-lg bg-gray-100 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </button>
                                <button className="p-2 rounded-lg bg-gray-100 hover:bg-blue-100 hover:text-blue-700 transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </button>
                                <button className="p-2 rounded-lg bg-gray-100 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                                    <Facebook className="w-5 h-5" />
                                </button>
                                <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors ml-auto">
                                    <Copy className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                    </div>
                </aside>
            </div>
        </div>
    );
};
