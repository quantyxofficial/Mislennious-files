import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBlogPost, BlogPost as BlogPostType } from '../utils/contentLoader';
import { Calendar, Clock, ArrowLeft, Share2, List, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

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

                // Generate TOC from markdown content
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

    // Handle scroll spy for active section
    useEffect(() => {
        const handleScroll = () => {
            const sections = toc.map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + 150; // Offset

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

    if (loading) return <div className="min-h-screen pt-32 text-center text-lux-text">Loading...</div>;

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    const RelatedPostCard = ({ post }: { post: BlogPostType }) => (
        <Link to={`/blog/${post.id}`} className="group block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all">
            <div className="aspect-video bg-gray-100 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-4">
                <h4 className="font-serif font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">{post.title}</h4>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
            </div>
        </Link>
    );

    return (
        <div className="min-h-screen bg-[#F8F9FA]"> {/* Wikipedia-ish light gray background */}
            {/* Header/Nav Spacer */}
            <div className="h-20 bg-white border-b border-gray-200"></div>

            <main className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-8">

                {/* Breadcrumb / Back */}
                <div className="mb-8">
                    <Link to="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium text-sm">Back to Insights</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* LEFT: Main Content (8 cols) */}
                    <article className="lg:col-span-8 bg-white p-6 md:p-10 lg:p-12 rounded-xl border border-gray-200 shadow-sm order-2 lg:order-1">

                        {/* Article Header */}
                        <header className="mb-10 pb-8 border-b border-gray-100">
                            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wide uppercase mb-4">
                                {post.category}
                            </span>
                            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight mb-6">
                                {post.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-serif font-bold">
                                        {post.author.charAt(0)}
                                    </div>
                                    <span className="font-medium text-gray-900">{post.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{post.readTime}</span>
                                </div>
                            </div>
                        </header>

                        {/* Hero Image */}
                        <div className="mb-10 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                            <img src={post.image} alt={post.title} className="w-full h-auto object-cover max-h-[500px]" />
                        </div>

                        {/* Mobile TOC (Accordion styling) */}
                        <div className="lg:hidden mb-10 bg-gray-50 rounded-lg p-5 border border-gray-200">
                            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <List className="w-4 h-4" /> Table of Contents
                            </h3>
                            <ul className="space-y-2 text-sm">
                                {toc.map((item) => (
                                    <li key={item.id} style={{ marginLeft: `${(item.level - 2) * 12}px` }}>
                                        <a href={`#${item.id}`} className="text-blue-600 hover:underline block py-1">
                                            {item.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Markdown Content */}
                        <div className="prose prose-lg max-w-none 
                            prose-headings:font-serif prose-headings:text-gray-900 
                            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
                            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                            prose-p:text-gray-700 prose-p:leading-relaxed 
                            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-gray-900 prose-strong:font-semibold
                            prose-ul:list-disc prose-ul:pl-5 prose-li:text-gray-700 prose-li:mb-2
                            prose-img:rounded-lg prose-img:border prose-img:border-gray-200
                            ">
                            <ReactMarkdown
                                components={{
                                    h2: ({ node, ...props }) => {
                                        const id = props.children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-') || '';
                                        return <h2 id={id} {...props} />;
                                    },
                                    h3: ({ node, ...props }) => {
                                        const id = props.children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-') || '';
                                        return <h3 id={id} {...props} />;
                                    }
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </div>
                    </article>

                    {/* RIGHT: Sidebar (TOC & Sticky) (4 cols) */}
                    <aside className="lg:col-span-4 order-1 lg:order-2 space-y-8">

                        {/* Desktop TOC */}
                        <div className="hidden lg:block sticky top-32 p-6 bg-white rounded-xl border border-gray-200 shadow-sm max-h-[calc(100vh-160px)] overflow-y-auto">
                            <h3 className="font-serif font-bold text-lg text-gray-900 mb-4 pb-4 border-b border-gray-100 flex items-center gap-2">
                                <List className="w-4 h-4" /> Contents
                            </h3>
                            <nav>
                                <ul className="space-y-1">
                                    {toc.map((item) => (
                                        <li key={item.id}>
                                            <a
                                                href={`#${item.id}`}
                                                className={`block py-1.5 px-3 rounded-md text-sm transition-colors border-l-2 ${activeSection === item.id
                                                        ? 'bg-blue-50 text-blue-700 border-blue-600 font-medium'
                                                        : 'text-gray-600 hover:bg-gray-50 border-transparent hover:text-gray-900'
                                                    }`}
                                                style={{ marginLeft: `${(item.level - 2) * 8}px` }}
                                            >
                                                {item.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>

                        {/* Share / Actions Widget */}
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <h3 className="font-serif font-bold text-gray-900 mb-4">Share this article</h3>
                            <div className="flex gap-2">
                                <button className="flex-1 py-2 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm transition-colors flex items-center justify-center gap-2">
                                    Copy Link
                                </button>
                                <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                    </aside>
                </div>
            </main>
        </div>
    );
};
