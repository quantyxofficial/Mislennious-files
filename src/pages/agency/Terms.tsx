import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, ChevronRight } from 'lucide-react';
import { updateMetaTags } from '../../utils/seo';

export const Terms: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('');
    const [toc, setToc] = useState<{ id: string; text: string }[]>([]);

    useEffect(() => {
        updateMetaTags({
            title: 'Terms of Service — KaizenStat',
            description: 'Read the KaizenStat terms of service. Terms governing use of the KaizenStat platform, open source library, competitions, and community resources.',
            keywords: ['kaizenstat terms', 'kaizenstat terms of service', 'kaizenstat usage policy'],
            canonical: 'https://www.kaizenstat.com/agency-terms',
            ogType: 'website',
        });
    }, []);

    useEffect(() => {
        const sections = [
            { id: 'agreement', text: 'Agreement to Terms' },
            { id: 'services', text: 'Services Description' },
            { id: 'responsibilities', text: 'User Responsibilities' },
            { id: 'intellectual-property', text: 'Intellectual Property' },
            { id: 'agreements', text: 'Service Agreements' },
            { id: 'payment', text: 'Payment Terms' },
            { id: 'liability', text: 'Limitation of Liability' },
            { id: 'warranty', text: 'Warranty Disclaimer' },
            { id: 'termination', text: 'Termination' },
            { id: 'governing-law', text: 'Governing Law' },
            { id: 'changes', text: 'Changes to Terms' },
            { id: 'contact', text: 'Contact Information' }
        ];
        setToc(sections);

        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i].id);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-lux-cream">
            {/* Hero Section */}
            <section className="relative min-h-[40vh] flex items-center justify-center px-6 md:px-12 pt-32 pb-12">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-3xl bg-white/60 border border-white/80 backdrop-blur-xl shadow-sm"
                    >
                        <FileText className="w-10 h-10 text-lux-text" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-serif text-5xl md:text-7xl text-lux-text mb-6 leading-tight"
                    >
                        Terms of Service
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lux-muted text-lg"
                    >
                        Last updated: January 12, 2026
                    </motion.p>
                </div>
            </section>

            {/* Content with Sidebar */}
            <section className="px-6 md:px-12 lg:px-24 pb-32">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Sidebar ToC */}
                    <aside className="hidden lg:block lg:col-span-3 sticky top-32 space-y-6">
                        <div className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl shadow-sm">
                            <h3 className="font-serif text-lg font-bold text-lux-text mb-6 uppercase tracking-widest text-[10px]">Contents</h3>
                            <nav className="space-y-1">
                                {toc.map((item) => (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        className={`group flex items-center gap-3 py-2 text-xs transition-all duration-300 ${
                                            activeSection === item.id 
                                            ? 'text-lux-text translate-x-2 font-bold' 
                                            : 'text-lux-muted hover:text-lux-text hover:translate-x-1'
                                        }`}
                                    >
                                        <div className={`w-1 h-1 rounded-full transition-all duration-300 ${
                                            activeSection === item.id ? 'bg-lux-text scale-150' : 'bg-lux-text/10 group-hover:bg-lux-text/40'
                                        }`} />
                                        {item.text}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="lg:col-span-9 space-y-12">
                        <div id="agreement" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Agreement to Terms</h2>
                            <p className="text-lux-muted leading-relaxed">
                                These Terms of Service constitute a legally binding agreement between you and KaizenStat ("Company", "we", "us", or "our") concerning your access to and use of our website and services. By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access our services.
                            </p>
                        </div>

                        <div id="services" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Services Description</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                KaizenStat provides digital services including but not limited to:
                            </p>
                            <ul className="space-y-2 text-lux-muted">
                                {['Web development and design', 'Data analytics and business intelligence', 'AI and machine learning solutions', 'Growth marketing and advertising', 'Visual design and branding'].map((service, i) => (
                                    <li key={i} className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span>{service}</span></li>
                                ))}
                            </ul>
                        </div>

                        <div id="responsibilities" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">User Responsibilities</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                By using our services, you agree to:
                            </p>
                            <ul className="space-y-3 text-lux-muted">
                                {[
                                    'Provide accurate and complete information when submitting inquiries or forms',
                                    'Maintain the confidentiality of any account credentials',
                                    'Use our services only for lawful purposes',
                                    'Not interfere with or disrupt our services or servers',
                                    'Not attempt to gain unauthorized access to any part of our services',
                                    'Respect intellectual property rights'
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span>{item}</span></li>
                                ))}
                            </ul>
                        </div>

                        <div id="intellectual-property" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Intellectual Property</h2>
                            <p className="text-lux-muted leading-relaxed">
                                All content on our website, including text, graphics, logos, images, and software, is the property of KaizenStat or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written permission.
                            </p>
                        </div>

                        <div id="agreements" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Service Agreements</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                When you engage our services, specific terms will be outlined in a separate service agreement or statement of work, which may include:
                            </p>
                            <ul className="space-y-2 text-lux-muted">
                                {['Project scope and deliverables', 'Timeline and milestones', 'Payment terms and pricing', 'Intellectual property ownership', 'Confidentiality obligations'].map((item, i) => (
                                    <li key={i} className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span>{item}</span></li>
                                ))}
                            </ul>
                        </div>

                        <div id="payment" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Payment Terms</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                Unless otherwise specified in a service agreement:
                            </p>
                            <ul className="space-y-2 text-lux-muted">
                                {['Payments are due according to the agreed schedule', 'Late payments may incur additional fees', 'All fees are non-refundable unless otherwise stated', 'Prices are subject to change with notice'].map((item, i) => (
                                    <li key={i} className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span>{item}</span></li>
                                ))}
                            </ul>
                        </div>

                        <div id="liability" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Limitation of Liability</h2>
                            <p className="text-lux-muted leading-relaxed">
                                To the maximum extent permitted by law, KaizenStat shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our services.
                            </p>
                        </div>

                        <div id="warranty" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Warranty Disclaimer</h2>
                            <p className="text-lux-muted leading-relaxed">
                                Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that our services will be uninterrupted, timely, secure, or error-free.
                            </p>
                        </div>

                        <div id="termination" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Termination</h2>
                            <p className="text-lux-muted leading-relaxed">
                                We reserve the right to terminate or suspend access to our services immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use our services will immediately cease.
                            </p>
                        </div>

                        <div id="governing-law" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Governing Law</h2>
                            <p className="text-lux-muted leading-relaxed">
                                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in India.
                            </p>
                        </div>

                        <div id="changes" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Changes to Terms</h2>
                            <p className="text-lux-muted leading-relaxed">
                                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. Your continued use of our services after changes constitutes acceptance of the new Terms.
                            </p>
                        </div>

                        <div id="contact" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Contact Information</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                If you have any questions about these Terms, please contact us:
                            </p>
                            <ul className="space-y-2 text-lux-muted">
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span>Email: legal@kaizenstat.com</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span>Phone: +91 98765 43210</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
