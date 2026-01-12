import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BLOG_POSTS } from '../constants';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';

export const BlogPost: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const post = BLOG_POSTS.find(p => p.id === postId);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    const relatedPosts = BLOG_POSTS.filter(p => p.id !== postId && p.category === post.category).slice(0, 3);

    return (
        <div className="min-h-screen">
            {/* Header */}
            <section className="px-6 md:px-12 lg:px-24 pt-32 pb-12">
                <div className="max-w-4xl mx-auto">
                    <Link to="/blog" className="inline-flex items-center gap-2 text-lux-muted hover:text-lux-text transition-colors mb-8" data-hover>
                        <ArrowLeft className="w-4 h-4" />
                        Back to Insights
                    </Link>
                </div>
            </section>

            {/* Hero Section */}
            <section className="px-6 md:px-12 lg:px-24 pb-12">
                <div className="max-w-4xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block px-3 py-1 rounded-full bg-lux-text/10 text-xs font-semibold text-lux-text mb-6"
                    >
                        {post.category}
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="font-serif text-4xl md:text-6xl text-lux-text mb-6 leading-tight"
                    >
                        {post.title}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-wrap items-center gap-6 text-sm text-lux-muted mb-8"
                    >
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                        </div>
                        <button className="flex items-center gap-2 hover:text-lux-text transition-colors" data-hover>
                            <Share2 className="w-4 h-4" />
                            Share
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="aspect-video rounded-3xl bg-gradient-to-br from-blue-100/60 to-purple-100/60 overflow-hidden mb-12"
                    >
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="px-6 md:px-12 lg:px-24 pb-20">
                <div className="max-w-3xl mx-auto">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-xl text-lux-muted leading-relaxed mb-8">{post.excerpt}</p>

                        <div className="text-lux-text leading-relaxed space-y-6">
                            <p>
                                In today's rapidly evolving digital landscape, understanding the intersection of technology and business
                                strategy has never been more critical. At KaizenStat, we've seen firsthand how the right approach can
                                transform organizations from followers to leaders.
                            </p>

                            <p>
                                This article explores the key principles and practical strategies that have helped our clients achieve
                                measurable success in their respective markets. Whether you're a startup looking to scale or an enterprise
                                seeking digital transformation, these insights will provide valuable guidance.
                            </p>

                            <h2 className="font-serif text-3xl text-lux-text mt-12 mb-4">The Foundation</h2>
                            <p>
                                Every successful project begins with a solid foundation. This means understanding not just the technical
                                requirements, but also the business context, user needs, and market dynamics. Our approach combines
                                rigorous data analysis with creative problem-solving to deliver solutions that truly move the needle.
                            </p>

                            <h2 className="font-serif text-3xl text-lux-text mt-12 mb-4">Key Takeaways</h2>
                            <ul className="space-y-3 text-lux-text">
                                <li>Data-driven decision making is no longer optional—it's essential</li>
                                <li>User experience and technical excellence must work in harmony</li>
                                <li>Continuous iteration beats perfect planning every time</li>
                                <li>The right team composition matters more than individual genius</li>
                            </ul>

                            <h2 className="font-serif text-3xl text-lux-text mt-12 mb-4">Looking Forward</h2>
                            <p>
                                As we continue to push the boundaries of what's possible with technology, one thing remains constant:
                                the importance of staying focused on outcomes that matter. Whether that's revenue growth, user engagement,
                                or operational efficiency, success comes from aligning technical capabilities with business objectives.
                            </p>
                        </div>
                    </div>

                    {/* Author Info */}
                    <div className="mt-16 p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100/60 to-purple-100/60 flex items-center justify-center flex-shrink-0">
                                <span className="font-serif text-2xl text-lux-text">{post.author.charAt(0)}</span>
                            </div>
                            <div>
                                <h4 className="font-serif text-2xl text-lux-text mb-1">{post.author}</h4>
                                <p className="text-lux-muted">{post.authorRole}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="px-6 md:px-12 lg:px-24 py-20 bg-gradient-to-b from-transparent via-white/30 to-transparent">
                    <div className="max-w-[1400px] mx-auto">
                        <h2 className="font-serif text-4xl text-lux-text mb-12 text-center">Related Articles</h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            {relatedPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost.id}
                                    to={`/blog/${relatedPost.id}`}
                                    className="group block rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl overflow-hidden hover:bg-white/70 transition-all"
                                    data-hover
                                >
                                    <div className="aspect-video bg-gradient-to-br from-blue-100/60 to-purple-100/60 overflow-hidden">
                                        <img src={relatedPost.image} alt={relatedPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="p-6">
                                        <span className="px-3 py-1 rounded-full bg-lux-text/10 text-xs font-semibold text-lux-text mb-3 inline-block">
                                            {relatedPost.category}
                                        </span>
                                        <h3 className="font-serif text-xl text-lux-text mb-2 line-clamp-2">{relatedPost.title}</h3>
                                        <p className="text-sm text-lux-muted">{relatedPost.readTime}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};
