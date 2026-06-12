import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getBlogPost, BlogPost as BlogPostType } from '../../utils/contentLoader';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronLeft, Clock, Calendar, User, Share2, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import { updateMetaTags, createArticleSchema, createBreadcrumbs } from '../../utils/seo';

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

                if (data) {
                    const canonical = `https://www.kaizenstat.com/blog/${postId}`;
                    updateMetaTags({
                        title: `${data.title} — KaizenStat Blog`,
                        description: data.description || `${data.title} — Read on the KaizenStat blog.`,
                        keywords: ['kaizenstat blog', data.category?.toLowerCase() || 'data science', 'machine learning', 'python'],
                        canonical,
                        ogType: 'article',
                        ogImage: data.image,
                        twitterCard: 'summary_large_image',
                        structuredData: {
                            '@context': 'https://schema.org',
                            '@graph': [
                                createArticleSchema({
                                    headline: data.title,
                                    description: data.description || data.title,
                                    image: data.image,
                                    datePublished: data.date,
                                    author: data.author,
                                }),
                                createBreadcrumbs([
                                    { name: 'Home', url: 'https://www.kaizenstat.com' },
                                    { name: 'Blog', url: 'https://www.kaizenstat.com/blog' },
                                    { name: data.title, url: canonical },
                                ]),
                            ],
                        },
                    });
                }

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
        <div className="min-h-screen pt-4 pb-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">

            {/* Breadcrumb */}
            <div className="mb-8">
                <Link to="/blog" className="inline-flex items-center gap-2 text-lux-muted hover:text-lux-text transition-colors group text-sm font-medium">
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Blog
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                {/* Main Content Area */}
                <article className="lg:col-span-8 space-y-8">

                    {/* Header */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                             <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-white border border-white/10 uppercase tracking-wide">
                                {post.category}
                            </span>
                        </div>

                        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-lux-text leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-lux-muted border-b border-white/5 pb-8">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-900 to-indigo-950 flex items-center justify-center text-white shadow-sm">
                                    <User className="w-4 h-4" />
                                </div>
                                <span className="font-medium text-lux-text">{post.author}</span>
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
                    <div className="rounded-2xl overflow-hidden shadow-lg border border-white/5 aspect-video relative group">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl"></div>
                    </div>

                     {/* Ad Placeholder - Top of Content */}
                    <div className="w-full h-[100px] bg-white/5 border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center text-lux-muted text-sm">
                        <span className="font-semibold">Advertisement</span>
                        <span className="text-xs">Google AdSense / Sponsor</span>
                    </div>

                    {/* Content */}
                    <div className="prose prose-stone prose-invert max-w-none
                        prose-headings:font-serif prose-headings:text-lux-text prose-headings:tracking-tight
                        prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-white/5
                        prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
                        prose-p:text-lux-muted prose-p:leading-[1.8] prose-p:mb-8 prose-p:text-[1.1rem]
                        prose-ul:my-8 prose-ul:list-disc prose-ul:pl-6
                        prose-li:mb-3 prose-li:text-lux-muted
                        prose-a:text-white prose-a:underline prose-a:decoration-1 prose-a:underline-offset-4 hover:prose-a:text-blue-400 transition-colors
                        prose-strong:text-white prose-strong:font-bold
                        prose-code:text-white prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                        prose-img:rounded-3xl prose-img:shadow-2xl prose-img:my-12
                        prose-blockquote:border-l-2 prose-blockquote:border-white/20 prose-blockquote:italic prose-blockquote:text-lux-text/60 prose-blockquote:bg-white/5 prose-blockquote:py-1 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:my-10
                    ">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
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
                    <div className="w-full h-[250px] bg-white/5 border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center text-lux-muted text-sm mt-12">
                        <span className="font-semibold">Advertisement</span>
                        <span className="text-xs">Google AdSense / Related Content</span>
                    </div>

                </article>

                {/* Sidebar */}
                <aside className="hidden lg:block lg:col-span-4 sticky top-32 self-start space-y-8">

                        {/* Table of Contents */}
                        {toc.length > 0 && (
                            <div className="bg-white/5 border border-white/10 shadow-sm rounded-xl p-6">
                                <h3 className="font-serif font-bold text-lux-text mb-4 flex items-center gap-2 text-lg">
                                    Table of Contents
                                </h3>
                                <nav className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                    <ul className="space-y-1">
                                        {toc.map((item) => (
                                            <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 12}px` }}>
                                                <a
                                                    href={`#${item.id}`}
                                                    className={`block py-1.5 px-3 rounded-md text-sm transition-all duration-200 border-l-2 ${activeSection === item.id
                                                        ? 'bg-white/10 text-white border-white font-medium translate-x-1'
                                                        : 'text-lux-muted hover:text-white hover:bg-white/5 border-transparent'
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
                        <div className="w-full h-[300px] bg-white/5 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center text-lux-muted text-sm">
                            <span className="font-semibold">Advertisement</span>
                            <span className="text-xs">Square Ad Unit</span>
                        </div>

                        {/* Share / Socials */}
                        <div className="bg-white/5 border border-white/10 shadow-sm rounded-xl p-6">
                            <h3 className="font-serif font-bold text-lux-text mb-4 text-lg">Share this article</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        const text = encodeURIComponent(`Check out this article: ${post.title}`);
                                        const url = encodeURIComponent(window.location.href);
                                        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
                                    }}
                                    className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-lux-muted hover:text-white transition-colors"
                                    title="Share on Twitter"
                                >
                                    <Twitter className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => {
                                        const url = encodeURIComponent(window.location.href);
                                        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
                                    }}
                                    className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-lux-muted hover:text-white transition-colors"
                                    title="Share on LinkedIn"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => {
                                        const url = encodeURIComponent(window.location.href);
                                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
                                    }}
                                    className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-lux-muted hover:text-white transition-colors"
                                    title="Share on Facebook"
                                >
                                    <Facebook className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                        alert('Link copied to clipboard!');
                                    }}
                                    className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-lux-muted hover:text-white transition-colors ml-auto group relative"
                                    title="Copy Link"
                                >
                                    <Copy className="w-5 h-5" />
                                </button>
                            </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};
