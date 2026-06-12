import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, ChevronRight } from 'lucide-react';
import { updateMetaTags } from '../../utils/seo';

export const Privacy: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('');
    const [toc, setToc] = useState<{ id: string; text: string }[]>([]);

    useEffect(() => {
        updateMetaTags({
            title: 'Privacy Policy — KaizenStat',
            description: 'Read the KaizenStat privacy policy. Understand how we collect, use, and protect your data when using the KaizenStat platform and open source tools.',
            keywords: ['kaizenstat privacy', 'kaizenstat privacy policy', 'data protection kaizenstat'],
            canonical: 'https://www.kaizenstat.com/agency-privacy',
            ogType: 'website',
        });
    }, []);

    useEffect(() => {
        const sections = [
            { id: 'introduction', text: 'Introduction' },
            { id: 'information-we-collect', text: 'Information We Collect' },
            { id: 'how-we-use', text: 'How We Use Your Information' },
            { id: 'data-security', text: 'Data Security' },
            { id: 'data-sharing', text: 'Data Sharing' },
            { id: 'your-rights', text: 'Your Rights' },
            { id: 'cookies', text: 'Cookies Policy' },
            { id: 'changes', text: 'Changes to Policy' },
            { id: 'contact', text: 'Contact Us' }
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
                        <Shield className="w-10 h-10 text-lux-text" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-serif text-5xl md:text-7xl text-lux-text mb-6 leading-tight"
                    >
                        Privacy Policy
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lux-muted text-lg"
                    >
                        Last updated: April 25, 2026
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
                        <div id="introduction" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Introduction</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                At KaizenStat ("we", "our", or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                            </p>
                            <p className="text-lux-muted leading-relaxed">
                                By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
                            </p>
                        </div>

                        <div id="information-we-collect" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Information We Collect</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                We collect several types of information to provide and improve our services:
                            </p>
                            <ul className="space-y-3 text-lux-muted">
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Personal Information:</strong> Name, email address, phone number, and other contact details you provide when filling out forms or contacting us.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Usage Data:</strong> Information about how you access and use our website, including your IP address, browser type, pages visited, and time spent on pages.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Cookies and Tracking:</strong> We use cookies and similar tracking technologies to track activity on our website and store certain information.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Business Information:</strong> Details about your company, project requirements, and business needs when requesting our services.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Third-Party Authentication Data:</strong> If you choose to log in via Google, we collect your Google profile information (name, email address, and profile picture) as permitted by your Google account settings.</span></li>
                            </ul>
                        </div>

                        <div id="how-we-use" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">How We Use Your Information</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                We use the collected information for various purposes:
                            </p>
                            <ul className="space-y-3 text-lux-muted">
                                {['To provide and maintain our services', 'To notify you about changes to our services', 'To provide customer support and respond to inquiries', 'To gather analysis or valuable information to improve our services', 'To monitor the usage of our services', 'To detect, prevent, and address technical issues', 'To send you newsletters, marketing communications, and other information (with your consent)'].map((item, i) => (
                                    <li key={i} className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span>{item}</span></li>
                                ))}
                            </ul>
                        </div>

                        <div id="data-security" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Data Security</h2>
                            <p className="text-lux-muted leading-relaxed">
                                The security of your data is important to us. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </div>

                        <div id="data-sharing" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Data Sharing and Disclosure</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                            </p>
                            <ul className="space-y-3 text-lux-muted">
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our website and services.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Legal Requirements:</strong> When required by law or to protect our rights, property, or safety.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</span></li>
                            </ul>
                        </div>

                        <div id="your-rights" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Your Rights</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                You have certain rights regarding your personal information:
                            </p>
                            <ul className="space-y-3 text-lux-muted">
                                {['The right to access and receive a copy of your personal data', 'The right to request correction of inaccurate data', 'The right to request deletion of your data', 'The right to object to processing of your data', 'The right to data portability', 'The right to withdraw consent at any time'].map((item, i) => (
                                    <li key={i} className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span>{item}</span></li>
                                ))}
                            </ul>
                        </div>

                        <div id="cookies" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Cookies Policy</h2>
                            <p className="text-lux-muted leading-relaxed">
                                We use cookies to enhance your experience on our website. Cookies are small files stored on your device that help us understand how you use our site. You can control cookies through your browser settings, though disabling cookies may affect website functionality.
                            </p>
                        </div>

                        <div id="changes" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Changes to This Privacy Policy</h2>
                            <p className="text-lux-muted leading-relaxed">
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                            </p>
                        </div>

                        <div id="contact" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Contact Us</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                If you have any questions about this Privacy Policy, please contact us:
                            </p>
                            <ul className="space-y-2 text-lux-muted">
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span>Email: privacy@kaizenstat.com</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span>Phone: +91 98765 43210</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
