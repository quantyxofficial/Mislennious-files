import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Sparkles, Sun, Moon } from 'lucide-react';
import { useAI } from '../contexts/AIContext';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';

export const Navbar: React.FC = () => {
    const { theme, toggleTheme } = useAI();
    const [isVisible, setIsVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCompanyOpen, setIsCompanyOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { user, signInWithGoogle, signOut } = useAuth();
    const location = useLocation();

    useEffect(() => {
        let prevScrollPos = window.scrollY;

        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const isScrollingDown = prevScrollPos < currentScrollPos;
            const isAtTop = currentScrollPos < 50;

            // Check if we're over the footer on home page
            const isHomePage = location.pathname === '/';
            const footerElement = document.getElementById('contact');
            let isOverFooter = false;

            if (isHomePage && footerElement) {
                const footerRect = footerElement.getBoundingClientRect();
                const navbarHeight = 100; // approximate navbar position
                isOverFooter = footerRect.top <= navbarHeight;
            }

            if ((isScrollingDown && !isAtTop) || isOverFooter) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            prevScrollPos = currentScrollPos;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);



    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setIsMobileMenuOpen(false);
        }
    };

    const isHomePage = location.pathname === '/';

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: isVisible ? 0 : -20,
                    opacity: isVisible ? 1 : 0
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-6 left-0 right-0 z-[200] flex justify-center pointer-events-none px-4 md:px-0"
            >
                <div className="w-full max-w-[960px] bg-white/30 dark:bg-black/40 backdrop-blur-[60px] backdrop-saturate-150 border border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.05)] rounded-full px-6 py-3 md:px-8 md:py-2.5 flex items-center justify-between pointer-events-auto transition-all duration-500 hover:bg-white/40 dark:hover:bg-black/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:scale-[1.005]">

                    <Link to="/" className="relative z-50 cursor-pointer group flex items-center gap-3">
                        <img
                            src="/logo.svg"
                            alt="KaizenStat Logo"
                            className="w-8 h-8 md:w-9 md:h-9 object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                        <span className="font-serif text-xl font-medium tracking-tight text-lux-text/90 group-hover:text-black transition-colors">
                            KaizenStat.
                        </span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8">
                        <Link
                            to="/"
                            className={`text-[12px] font-bold uppercase tracking-[0.1em] transition-colors duration-300 relative group ${location.pathname === '/' ? 'text-lux-text' : 'text-lux-muted hover:text-lux-text'
                                }`}
                            data-hover
                        >
                            Practice
                            <span className={`absolute -bottom-1 left-0 h-px bg-lux-text transition-all duration-300 ${location.pathname === '/' ? 'w-full opacity-100' : 'w-0 group-hover:w-full opacity-0 group-hover:opacity-100'
                                }`} />
                        </Link>



                        <Link
                            to="/kaizen-ai"
                            className={`text-[12px] font-bold uppercase tracking-[0.1em] transition-colors duration-300 relative group flex items-center gap-1.5 ${location.pathname === '/kaizen-ai' ? 'text-lux-text' : 'text-lux-muted hover:text-lux-text'
                                }`}
                            data-hover
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            Kaizen AI
                            <span className={`absolute -bottom-1 left-0 h-px bg-lux-text transition-all duration-300 ${location.pathname === '/kaizen-ai' ? 'w-full opacity-100' : 'w-0 group-hover:w-full opacity-0 group-hover:opacity-100'
                                }`} />
                        </Link>



                        <Link
                            to="/about"
                            className={`text-[12px] font-bold uppercase tracking-[0.1em] transition-colors duration-300 relative group ${location.pathname === '/about' ? 'text-lux-text' : 'text-lux-muted hover:text-lux-text'
                                }`}
                            data-hover
                        >
                            About
                            <span className={`absolute -bottom-1 left-0 h-px bg-lux-text transition-all duration-300 ${location.pathname === '/about' ? 'w-full opacity-100' : 'w-0 group-hover:w-full opacity-0 group-hover:opacity-100'
                                }`} />
                        </Link>

                        <Link
                            to="/events"
                            className={`text-[12px] font-bold uppercase tracking-[0.1em] transition-colors duration-300 relative group ${location.pathname === '/events' ? 'text-lux-text' : 'text-lux-muted hover:text-lux-text'
                                }`}
                            data-hover
                        >
                            Events
                            <span className={`absolute -bottom-1 left-0 h-px bg-lux-text transition-all duration-300 ${location.pathname === '/events' ? 'w-full opacity-100' : 'w-0 group-hover:w-full opacity-0 group-hover:opacity-100'
                                }`} />
                        </Link>

                        {/* COMPANY DROPDOWN: Consolidating About, Blog, Events, Careers */}
                        <div
                            className="relative"
                            onMouseEnter={() => setIsCompanyOpen(true)}
                            onMouseLeave={() => setIsCompanyOpen(false)}
                        >
                            <button
                                className={`flex items-center gap-1 text-[12px] font-bold uppercase tracking-[0.1em] transition-colors duration-300 relative group ${['/blog', '/careers'].some(path => location.pathname.startsWith(path)) ? 'text-lux-text' : 'text-lux-muted hover:text-lux-text'
                                    }`}
                                data-hover
                            >
                                Company
                                <ChevronDown className="w-3 h-3" />
                                <span className={`absolute -bottom-1 left-0 h-px bg-lux-text transition-all duration-300 ${['/blog', '/careers'].some(path => location.pathname.startsWith(path)) ? 'w-full opacity-100' : 'w-0 group-hover:w-full opacity-0 group-hover:opacity-100'
                                    }`} />
                            </button>

                            <AnimatePresence>
                                {isCompanyOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full right-0 mt-4 w-40 bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden"
                                    >
                                        {[
                                            { path: '/blog', label: 'Blog' },
                                            { path: '/careers', label: 'Careers' }
                                        ].map((item) => (
                                            <Link
                                                key={item.path}
                                                to={item.path}
                                                className={`block px-5 py-3 text-xs font-medium transition-colors ${location.pathname.startsWith(item.path) ? 'bg-lux-text/5 text-lux-text' : 'text-lux-text hover:bg-lux-text/5'
                                                    }`}
                                                data-hover
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* AUTHENTICATION */}
                        <div className="relative ml-2">
                            {user ? (
                                <div
                                    className="relative"
                                    onMouseEnter={() => setIsUserMenuOpen(true)}
                                    onMouseLeave={() => setIsUserMenuOpen(false)}
                                >
                                    <button className="flex items-center gap-2 p-1 rounded-full bg-white/20 dark:bg-black/20 border border-white/40 dark:border-white/10 hover:bg-white/40 transition-all duration-300">
                                        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/50">
                                            {user.user_metadata?.avatar_url ? (
                                                <img src={user.user_metadata.avatar_url} alt={user.user_metadata?.full_name || 'User'} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-lux-text flex items-center justify-center text-lux-cream">
                                                    <UserIcon className="w-4 h-4" />
                                                </div>
                                            )}
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isUserMenuOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full right-0 mt-4 w-48 bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden"
                                            >
                                                <div className="px-4 py-3 border-b border-lux-text/10">
                                                    <p className="text-xs font-bold text-lux-text truncate">{user.user_metadata?.full_name || 'User'}</p>
                                                    <p className="text-[10px] text-lux-muted truncate">{user.email}</p>
                                                </div>
                                                <button
                                                    onClick={() => signOut()}
                                                    className="w-full text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2"
                                                >
                                                    <LogOut className="w-3.5 h-3.5" />
                                                    Sign Out
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <button
                                    onClick={() => signInWithGoogle()}
                                    className="px-5 py-2 rounded-full bg-lux-text text-lux-cream text-[11px] font-bold uppercase tracking-widest hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all flex items-center gap-2"
                                >
                                    <LogIn className="w-3.5 h-3.5" />
                                    Join Us
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 pl-4 border-l border-gray-200/50 ml-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden relative z-50 p-2 text-lux-text hover:bg-black/5 rounded-full transition-colors"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-[190] bg-white/20 backdrop-blur-[60px] backdrop-saturate-150 flex items-center justify-center lg:hidden"
                    >
                        <div className="flex flex-col items-center gap-6">
                            <Link
                                to="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="font-serif text-3xl text-lux-text hover:text-lux-muted transition-colors"
                            >
                                Practice
                            </Link>
                            <Link
                                to="/kaizen-ai"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="font-serif text-3xl text-lux-text hover:text-lux-muted transition-colors flex items-center gap-2"
                            >
                                <Sparkles className="w-6 h-6" /> Kaizen AI
                            </Link>
                            <Link
                                to="/about"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="font-serif text-3xl text-lux-text hover:text-lux-muted transition-colors"
                            >
                                About
                            </Link>
                            <Link
                                to="/events"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="font-serif text-3xl text-lux-text hover:text-lux-muted transition-colors"
                            >
                                Events
                            </Link>
                            <Link
                                to="/blog"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="font-serif text-3xl text-lux-text hover:text-lux-muted transition-colors"
                            >
                                Blog
                            </Link>
                            <Link
                                to="/careers"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="font-serif text-3xl text-lux-text hover:text-lux-muted transition-colors"
                            >
                                Careers
                            </Link>
                            
                            <div className="mt-8 pt-8 border-t border-lux-text/10 w-full flex justify-center">
                                {user ? (
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-lux-text/20">
                                            {user.user_metadata?.avatar_url ? (
                                                <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-lux-text flex items-center justify-center text-lux-cream">
                                                    <UserIcon className="w-8 h-8" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-center">
                                            <p className="font-serif text-xl text-lux-text">{user.user_metadata?.full_name}</p>
                                            <button 
                                                onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                                                className="text-red-500 font-bold uppercase tracking-widest text-[10px] mt-2"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => { signInWithGoogle(); setIsMobileMenuOpen(false); }}
                                        className="px-8 py-4 rounded-full bg-lux-text text-lux-cream font-bold uppercase tracking-widest text-xs flex items-center gap-2"
                                    >
                                        <LogIn className="w-4 h-4" />
                                        Continue with Google
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
