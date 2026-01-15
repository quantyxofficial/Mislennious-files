import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { SERVICES } from '../constants';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isCompanyOpen, setIsCompanyOpen] = useState(false);
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

    const services = SERVICES.map(s => ({ id: s.id, name: s.title }));

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
                <div className="w-full max-w-[960px] bg-white/30 backdrop-blur-[60px] backdrop-saturate-150 border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.05)] rounded-full px-6 py-3 md:px-8 md:py-2.5 flex items-center justify-between pointer-events-auto transition-all duration-500 hover:bg-white/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:scale-[1.005]">

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
                            to="/agency"
                            className={`text-[12px] font-bold uppercase tracking-[0.1em] transition-colors duration-300 relative group ${location.pathname === '/agency' ? 'text-lux-text' : 'text-lux-muted hover:text-lux-text'
                                }`}
                            data-hover
                        >
                            Agency
                            <span className={`absolute -bottom-1 left-0 h-px bg-lux-text transition-all duration-300 ${location.pathname === '/agency' ? 'w-full opacity-100' : 'w-0 group-hover:w-full opacity-0 group-hover:opacity-100'
                                }`} />
                        </Link>

                        <div
                            className="relative"
                            onMouseEnter={() => setIsServicesOpen(true)}
                            onMouseLeave={() => setIsServicesOpen(false)}
                        >
                            <button
                                className={`flex items-center gap-1 text-[12px] font-bold uppercase tracking-[0.1em] transition-colors duration-300 relative group ${location.pathname.startsWith('/services') ? 'text-lux-text' : 'text-lux-muted hover:text-lux-text'
                                    }`}
                                data-hover
                            >
                                Services
                                <ChevronDown className="w-3 h-3" />
                                <span className={`absolute -bottom-1 left-0 h-px bg-lux-text transition-all duration-300 ${location.pathname.startsWith('/services') ? 'w-full opacity-100' : 'w-0 group-hover:w-full opacity-0 group-hover:opacity-100'
                                    }`} />
                            </button>

                            <AnimatePresence>
                                {isServicesOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-60 bg-white/95 backdrop-blur-xl border border-white/60 rounded-2xl shadow-xl overflow-hidden z-[210]"
                                    >
                                        {services.map((service) => (
                                            <Link
                                                key={service.id}
                                                to={`/services/${service.id}`}
                                                className={`block px-5 py-3 text-xs font-medium transition-colors ${location.pathname === `/services/${service.id}` ? 'bg-lux-text/5 text-lux-text' : 'text-lux-text hover:bg-lux-text/5'
                                                    }`}
                                                data-hover
                                            >
                                                {service.name}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link
                            to="/portfolio"
                            className={`text-[12px] font-bold uppercase tracking-[0.1em] transition-colors duration-300 relative group ${location.pathname === '/portfolio' ? 'text-lux-text' : 'text-lux-muted hover:text-lux-text'
                                }`}
                            data-hover
                        >
                            Portfolio
                            <span className={`absolute -bottom-1 left-0 h-px bg-lux-text transition-all duration-300 ${location.pathname === '/portfolio' ? 'w-full opacity-100' : 'w-0 group-hover:w-full opacity-0 group-hover:opacity-100'
                                }`} />
                        </Link>

                        {/* COMPANY DROPDOWN: Consolidating About, Blog, Events, Careers */}
                        <div
                            className="relative"
                            onMouseEnter={() => setIsCompanyOpen(true)}
                            onMouseLeave={() => setIsCompanyOpen(false)}
                        >
                            <button
                                className={`flex items-center gap-1 text-[12px] font-bold uppercase tracking-[0.1em] transition-colors duration-300 relative group ${['/about', '/blog', '/events', '/careers'].some(path => location.pathname.startsWith(path)) ? 'text-lux-text' : 'text-lux-muted hover:text-lux-text'
                                    }`}
                                data-hover
                            >
                                Company
                                <ChevronDown className="w-3 h-3" />
                                <span className={`absolute -bottom-1 left-0 h-px bg-lux-text transition-all duration-300 ${['/about', '/blog', '/events', '/careers'].some(path => location.pathname.startsWith(path)) ? 'w-full opacity-100' : 'w-0 group-hover:w-full opacity-0 group-hover:opacity-100'
                                    }`} />
                            </button>

                            <AnimatePresence>
                                {isCompanyOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full right-0 mt-4 w-40 bg-white/90 backdrop-blur-xl border border-white/60 rounded-2xl shadow-xl overflow-hidden"
                                    >
                                        {[
                                            { path: '/about', label: 'About' },
                                            { path: '/blog', label: 'Blog' },
                                            { path: '/events', label: 'Events' },
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
                    </div>

                    <div className="flex items-center gap-2 pl-4 border-l border-gray-200/50 ml-4">
                        <ThemeToggle />
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
                                to="/agency"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="font-serif text-3xl text-lux-text hover:text-lux-muted transition-colors"
                            >
                                Agency
                            </Link>
                            <Link
                                to="/about"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="font-serif text-3xl text-lux-text hover:text-lux-muted transition-colors"
                            >
                                About
                            </Link>
                            <Link
                                to="/portfolio"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="font-serif text-3xl text-lux-text hover:text-lux-muted transition-colors"
                            >
                                Portfolio
                            </Link>
                            <Link
                                to="/blog"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="font-serif text-3xl text-lux-text hover:text-lux-muted transition-colors"
                            >
                                Blog
                            </Link>
                            <Link
                                to="/events"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="font-serif text-3xl text-lux-text hover:text-lux-muted transition-colors"
                            >
                                Events
                            </Link>
                            <Link
                                to="/careers"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="font-serif text-3xl text-lux-text hover:text-lux-muted transition-colors"
                            >
                                Careers
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
