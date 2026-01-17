import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { NewsletterForm } from './NewsletterForm';

export const Footer: React.FC = () => {
    return (
        <footer id="contact" className="relative mt-32 border-t border-white/5 bg-[#1C1917] rounded-t-[3rem] overflow-hidden">
            {/* Highly Optimized Aurora Background - Zero Paint Cost */}
            <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                    background: `
                        radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 60%),
                        radial-gradient(circle at 100% 0%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)
                    `
                }}
            />

            <div className="max-w-[1400px] mx-auto px-6 lg:px-24 py-16 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <Link to="/" className="inline-block">
                            <h3 className="font-serif text-3xl text-white">KaizenStat.</h3>
                        </Link>
                        <p className="text-stone-300 text-base leading-relaxed">
                            An elite digital agency led by Data Science scholars.
                            Bridging Engineering precision with Creative intelligence.
                        </p>
                        <div className="flex gap-3">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-lux-text transition-all text-white" data-hover>
                                <Github className="w-4 h-4" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-lux-text transition-all text-white" data-hover>
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-lux-text transition-all text-white" data-hover>
                                <Twitter className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-serif text-xl text-white mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-stone-300 hover:text-white transition-colors text-base" data-hover>Home</Link></li>
                            <li><Link to="/about" className="text-stone-300 hover:text-white transition-colors text-base" data-hover>About Us</Link></li>
                            <li><Link to="/events" className="text-stone-300 hover:text-white transition-colors text-base" data-hover>Events</Link></li>
                            <li><Link to="/portfolio" className="text-stone-300 hover:text-white transition-colors text-base" data-hover>Portfolio</Link></li>
                            <li><Link to="/blog" className="text-stone-300 hover:text-white transition-colors text-base" data-hover>Insights</Link></li>
                            <li><Link to="/careers" className="text-stone-300 hover:text-white transition-colors text-base" data-hover>Careers</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-serif text-xl text-white mb-6">Services</h4>
                        <ul className="space-y-3">
                            {/* Active Services */}
                            <li><Link to="/services/eda" className="text-stone-300 hover:text-white transition-colors text-base" data-hover>Exploratory Data Analysis</Link></li>
                            <li><Link to="/services/design" className="text-stone-300 hover:text-white transition-colors text-base" data-hover>YT Thumbnail & Poster Making</Link></li>

                            {/* Commented out inactive services
                            <li><Link to="/services/web" className="text-stone-300 hover:text-white transition-colors text-base" data-hover>Web Development</Link></li>
                            <li><Link to="/services/data" className="text-stone-300 hover:text-white transition-colors text-base" data-hover>Data Analytics</Link></li>
                            <li><Link to="/services/ai" className="text-stone-300 hover:text-white transition-colors text-base" data-hover>AI / ML Solutions</Link></li>
                            <li><Link to="/services/ads" className="text-stone-300 hover:text-white transition-colors text-base" data-hover>Growth Marketing</Link></li>
                            <li><Link to="/services/design" className="text-stone-300 hover:text-white transition-colors text-base" data-hover>Visual Design</Link></li>
                            */}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-serif text-xl text-white mb-6">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Mail className="w-4 h-4 text-stone-300 mt-1 flex-shrink-0" />
                                <a href="mailto:founders@kaizenstat.com" className="text-stone-300 hover:text-white transition-colors text-base" data-hover>founders@kaizenstat.com</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-stone-300 mt-1 flex-shrink-0" />
                                <span className="text-stone-300 text-base">Park Street<br />Kolkata, WB 700016</span>
                            </li>
                        </ul>
                    </div>
                </div>



                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-stone-500 text-xs">
                        © 2026 KaizenStat. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="text-stone-500 hover:text-white transition-colors text-xs" data-hover>Privacy Policy</Link>
                        <Link to="/terms" className="text-stone-500 hover:text-white transition-colors text-xs" data-hover>Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
