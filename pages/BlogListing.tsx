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

    const featuredPosts = filteredPosts.filter(post => post.featured);

    return (
        <div className="min-h-screen">
            {/* Compact Header & Filter Section */}
            <section className="px-6 md:px-12 lg:px-24 pt-32 pb-10">
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
                                        ? 'bg-lux-text text-white shadow-lg shadow-lux-text/20'
                                        : 'bg-white/50 border border-lux-text/10 text-lux-muted hover:border-lux-text/30 hover:bg-white'
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
