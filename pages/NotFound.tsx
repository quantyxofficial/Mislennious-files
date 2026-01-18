import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, ArrowRight } from 'lucide-react';

export const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-stone-50">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-100/30 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/30 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 px-6 max-w-2xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="w-24 h-24 mx-auto mb-8 rounded-[2rem] bg-white/60 border border-white/80 backdrop-blur-xl flex items-center justify-center shadow-lg"
                >
                    <AlertTriangle className="w-10 h-10 text-lux-text" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="font-serif text-8xl md:text-9xl text-lux-text mb-4 leading-none tracking-tight"
                >
                    404
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="font-serif text-3xl md:text-4xl text-lux-text mb-6"
                >
                    Page Not Found
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lux-muted text-lg mb-10 leading-relaxed max-w-md mx-auto"
                >
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        to="/"
                        className="w-full sm:w-auto px-8 py-3 bg-lux-text text-lux-cream rounded-full text-sm font-semibold tracking-wider uppercase hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        <Home className="w-4 h-4" />
                        Back Home
                    </Link>
                    <Link
                        to="/contact" // Assuming /contact might exist or just link to home anchor
                        onClick={(e) => {
                            e.preventDefault();
                            // Navigate home hash link if possible, else just go home
                            window.location.href = "/#contact";
                        }}
                        className="w-full sm:w-auto px-8 py-3 bg-white border border-lux-text/10 text-lux-text rounded-full text-sm font-semibold tracking-wider uppercase hover:bg-stone-50 transition-all flex items-center justify-center gap-2"
                    >
                        Contact Support
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};
