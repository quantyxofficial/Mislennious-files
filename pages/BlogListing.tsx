import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BLOG_POSTS } from '../constants';
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react';

export const BlogListing: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const categories = ['All', ...Array.from(new Set(BLOG_POSTS.map(post => post.category)))];

    const filteredPosts = selectedCategory === 'All'
        ? BLOG_POSTS
        : BLOG_POSTS.filter(post => post.category === selectedCategory);

    const featuredPosts = BLOG_POSTS.filter(post => post.featured);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center px-6 md:px-12 pt-32 pb-20">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-block py-2 px-6 border border-lux-text/10 rounded-full text-xs font-bold tracking-[0.3em] uppercase text-lux-muted bg-white/40 backdrop-blur-md mb-8"
                    >
                        Insights
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-serif text-5xl md:text-7xl lg:text-8xl text-lux-text mb-8 leading-tight"
                    >
                        Ideas &<br />
                        <span className="italic font-light text-lux-muted">Intelligence</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl text-lux-muted leading-relaxed max-w-2xl mx-auto"
                    >
                        Thoughts on data, design, AI, and the future of digital products
                    </motion.p>
                </div>
            </section>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
                <section className="px-6 md:px-12 lg:px-24 pb-20">
                    <div className="max-w-[1400px] mx-auto">
                        <h2 className="font-serif text-3xl text-lux-text mb-8">Featured Articles</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {featuredPosts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                >
                                    <Link to={`/blog/${post.id}`} className="group block rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl overflow-hidden hover:bg-white/70 transition-all" data-hover>
                                        <div className="aspect-video bg-gradient-to-br from-blue-100/60 to-purple-100/60 overflow-hidden">
                                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <div className="p-8">
                                            <span className="px-3 py-1 rounded-full bg-lux-text/10 text-xs font-semibold text-lux-text mb-4 inline-block">
                                                {post.category}
                                            </span>
                                            <h3 className="font-serif text-3xl text-lux-text mb-3 group-hover:text-lux-muted transition-colors">{post.title}</h3>
                                            <p className="text-lux-muted mb-4 leading-relaxed">{post.excerpt}</p>
                                            <div className="flex items-center gap-4 text-sm text-lux-muted">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4" />
                                                    {post.readTime}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Category Filter */}
            <section className="px-6 md:px-12 lg:px-24 pb-8">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                        ? 'bg-lux-text text-white'
                                        : 'bg-white/50 border border-white/60 text-lux-text hover:bg-white/70'
                                    }`}
                                data-hover
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

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
                                <Link to={`/blog/${post.id}`} className="group block rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl overflow-hidden hover:bg-white/70 transition-all h-full" data-hover>
                                    <div className="aspect-video bg-gradient-to-br from-blue-100/60 to-purple-100/60 overflow-hidden">
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
