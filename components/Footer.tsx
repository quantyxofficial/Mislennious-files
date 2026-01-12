import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { NewsletterForm } from './NewsletterForm';

export const Footer: React.FC = () => {
    return (
        <footer className="relative mt-32 border-t border-lux-text/10 bg-white/40 backdrop-blur-xl rounded-t-[3rem]">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-24 py-16 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <Link to="/" className="inline-block">
                            <h3 className="font-serif text-3xl text-lux-text">KaizenStat.</h3>
                        </Link>
                        <p className="text-lux-muted text-sm leading-relaxed">
                            An elite digital agency led by Data Science scholars from IIT Madras & MAKAUT.
                            Bridging Engineering precision with Creative intelligence.
                        </p>
                        <div className="flex gap-3">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/60 border border-lux-text/10 flex items-center justify-center hover:bg-lux-text hover:text-white transition-all" data-hover>
                                <Github className="w-4 h-4" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/60 border border-lux-text/10 flex items-center justify-center hover:bg-lux-text hover:text-white transition-all" data-hover>
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/60 border border-lux-text/10 flex items-center justify-center hover:bg-lux-text hover:text-white transition-all" data-hover>
                                <Twitter className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-serif text-xl text-lux-text mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-lux-muted hover:text-lux-text transition-colors text-sm" data-hover>Home</Link></li>
                            <li><Link to="/about" className="text-lux-muted hover:text-lux-text transition-colors text-sm" data-hover>About Us</Link></li>
                            <li><Link to="/events" className="text-lux-muted hover:text-lux-text transition-colors text-sm" data-hover>Events</Link></li>
                            <li><Link to="/portfolio" className="text-lux-muted hover:text-lux-text transition-colors text-sm" data-hover>Portfolio</Link></li>
                            <li><Link to="/blog" className="text-lux-muted hover:text-lux-text transition-colors text-sm" data-hover>Insights</Link></li>
                            <li><Link to="/careers" className="text-lux-muted hover:text-lux-text transition-colors text-sm" data-hover>Careers</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-serif text-xl text-lux-text mb-6">Services</h4>
                        <ul className="space-y-3">
                            <li><Link to="/services/web" className="text-lux-muted hover:text-lux-text transition-colors text-sm" data-hover>Web Development</Link></li>
                            <li><Link to="/services/data" className="text-lux-muted hover:text-lux-text transition-colors text-sm" data-hover>Data Analytics</Link></li>
                            <li><Link to="/services/ai" className="text-lux-muted hover:text-lux-text transition-colors text-sm" data-hover>AI / ML Solutions</Link></li>
                            <li><Link to="/services/ads" className="text-lux-muted hover:text-lux-text transition-colors text-sm" data-hover>Growth Marketing</Link></li>
                            <li><Link to="/services/design" className="text-lux-muted hover:text-lux-text transition-colors text-sm" data-hover>Visual Design</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-serif text-xl text-lux-text mb-6">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Mail className="w-4 h-4 text-lux-muted mt-0.5 flex-shrink-0" />
                                <a href="mailto:hello@kaizenstat.com" className="text-lux-muted hover:text-lux-text transition-colors text-sm" data-hover>hello@kaizenstat.com</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="w-4 h-4 text-lux-muted mt-0.5 flex-shrink-0" />
                                <a href="tel:+919876543210" className="text-lux-muted hover:text-lux-text transition-colors text-sm" data-hover>+91 98765 43210</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-lux-muted mt-0.5 flex-shrink-0" />
                                <span className="text-lux-muted text-sm">Remote First<br />India</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter (Formsphere Ready) */}
                <div className="mb-16 p-8 rounded-3xl bg-gradient-to-br from-white/60 to-white/40 border border-white/60 backdrop-blur-xl">
                    <div className="max-w-2xl mx-auto text-center">
                        <h4 className="font-serif text-2xl text-lux-text mb-3">Stay Updated</h4>
                        <p className="text-lux-muted text-sm mb-6">Get insights on data, design, and digital intelligence delivered to your inbox.</p>
                        <NewsletterForm />
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-lux-text/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-lux-muted text-xs">
                        © 2026 KaizenStat. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="text-lux-muted hover:text-lux-text transition-colors text-xs" data-hover>Privacy Policy</Link>
                        <Link to="/terms" className="text-lux-muted hover:text-lux-text transition-colors text-xs" data-hover>Terms of Service</Link>
                    </div>
                </div>
            </div>

            {/* Map Section - Full Width Bottom */}
            <div className="relative w-full h-[300px] md:h-[400px] bg-stone-200 border-t border-lux-text/5">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-white/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/40 via-transparent to-transparent pointer-events-none" />

                {/* Kolkata Map */}
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.21689694703!2d88.26495055415729!3d22.53542732100808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1709282000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(80%) opacity(0.8)' }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="opacity-60 hover:opacity-100 transition-opacity duration-700"
                ></iframe>

                <div className="absolute bottom-6 right-6 z-20 bg-white/80 backdrop-blur-md px-4 py-2 md:px-6 md:py-3 rounded-full border border-lux-text/10 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-lux-text text-[10px] md:text-xs tracking-widest uppercase font-semibold">Operating from Kolkata</span>
                </div>
            </div>
        </footer>
    );
};
