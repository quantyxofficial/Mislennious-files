import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loadBlogPosts, BlogPost } from '../../utils/contentLoader';
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Logo } from '../../components/ui/Logo';
import { updateMetaTags } from '../../utils/seo';

export const BlogListing: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        updateMetaTags({
            title: 'Blog — KaizenStat | Data Science, ML, Career Guides & Tutorials',
            description: 'Read the KaizenStat blog: tutorials on machine learning, data science career guides, Python tips, AI trends, and student resources. Written by the KaizenStat community.',
            keywords: ['kaizenstat blog', 'data science blog', 'ml tutorials', 'machine learning articles', 'python tips', 'data science career', 'ai blog'],
            canonical: 'https://www.kaizenstat.com/blog',
            ogType: 'website',
            twitterCard: 'summary_large_image',
        });
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await loadBlogPosts();
            setPosts(data);
            setLoading(false);
        };
        fetchPosts();
    }, []);

    const categories = ['All', ...Array.from(new Set(posts.map(post => post.category)))];

    const filteredPosts = selectedCategory === 'All'
        ? posts
        : posts.filter(post => post.category === selectedCategory);

    const featuredPosts = filteredPosts.filter(post => post.featured);

    return (
        <div className="min-h-screen">
            {/* Compact Header & Filter Section */}
            <section className="px-6 md:px-12 lg:px-24 pt-4 pb-10">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="font-serif text-5xl md:text-7xl text-lux-text leading-none">
                            Our<br />
                            <span className="text-lux-muted italic">Insights.</span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col gap-3"
                    >
                        <div className="flex items-center gap-2 text-lux-muted mb-1">
                            <Search className="w-4 h-4" />
                            <span className="text-xs font-medium uppercase tracking-wider">Filter topics</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                     className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${selectedCategory === category
                                         ? 'bg-white text-black shadow-lg shadow-white/20'
                                         : 'bg-white/5 border border-white/10 text-lux-muted hover:border-white/30 hover:bg-white/10'
                                         }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Section Removed as per user request */}

            {/* Filters moved to Header */}

            {/* All Posts Grid */}
            <section className="px-6 md:px-12 lg:px-24 py-12 pb-32">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                            >
                                <Link to={`/blog/${post.id}`} className="group block rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl overflow-hidden hover:bg-white/5 transition-all h-full" data-hover>
                                    <div className="aspect-video bg-gradient-to-br from-blue-900/40 to-purple-950/40 overflow-hidden relative">
                                        <div className="absolute top-4 left-4 z-10 bg-black/20 backdrop-blur-md border border-white/10 p-1.5 rounded-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                                            <Logo className="w-4 h-4 text-white" />
                                        </div>
                                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="p-6">
                                        <span className="px-3 py-1 rounded-full bg-lux-text/10 text-xs font-semibold text-lux-text mb-3 inline-block">
                                            {post.category}
                                        </span>
                                        <h3 className="font-serif text-2xl text-lux-text mb-2 group-hover:text-lux-muted transition-colors line-clamp-2">{post.title}</h3>
                                        <p className="text-sm text-lux-muted mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                                        <div className="flex items-center justify-between text-xs text-lux-muted">
                                            <span>{post.author}</span>
                                            <span>{post.readTime}</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
