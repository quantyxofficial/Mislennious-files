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
            canonical: 'https://www.kaizenstat.com/privacy',
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
                                KaizenStat ("we", "our", or "us") is a student-led, non-profit open-source project that builds a Python machine learning framework and runs a learning community of documentation, practice problems, competitions, and certifications. This Privacy Policy explains how we collect, use, store, and safeguard your information when you visit www.kaizenstat.com (and related subdomains), create a member account, participate in competitions or certifications, or engage with our community programs. This policy complies with global privacy standards including GDPR (EU), CCPA (California), PIPEDA (Canada), and India's Digital Personal Data Protection Act (DPDPA).
                            </p>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                The KaizenStat Python library itself (installed via <span className="font-mono text-sm">pip install kaizenstat</span>) runs entirely on your own machine. It does not transmit your datasets, code, model outputs, or any personal data to us. The library is data-local and privacy-first by design.
                            </p>
                            <p className="text-lux-muted leading-relaxed">
                                This policy covers only our website, community platform, competitions, and services. By creating an account or using our services, you agree to the collection and use of information described here. If you disagree with any part of this policy, please do not use our services.
                            </p>
                        </div>

                        <div id="information-we-collect" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Information We Collect</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                We collect several types of information to provide and improve our services:
                            </p>
                            <ul className="space-y-3 text-lux-muted">
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Account Information:</strong> Your name, email address, and chosen avatar when you create a KaizenStat member account to access the dashboard, competitions, and ID card.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Learning &amp; Program Activity:</strong> Practice attempts, competition entries and submissions, certification exam results, and progress through the handbook, used to show your dashboard, issue certificates, and rank competitions.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Usage Data:</strong> Information about how you access the website, such as IP address, browser type, pages visited, and time spent, collected to understand and improve the platform.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Cookies and Tracking:</strong> We use cookies and similar technologies to keep you signed in and to understand site usage. See the Cookies section below.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Third-Party Authentication Data:</strong> If you sign in with Google, we receive your Google profile information (name, email address, and profile picture) as permitted by your Google account settings.</span></li>
                            </ul>
                        </div>

                        <div id="how-we-use" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">How We Use Your Information</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                We use the collected information for various purposes:
                            </p>
                            <ul className="space-y-3 text-lux-muted">
                                {['To create and maintain your member account and dashboard', 'To run competitions, score submissions, and publish leaderboards', 'To issue and verify certificates and member ID cards', 'To track your learning progress through the handbook and practice problems', 'To respond to questions, support requests, and contributions', 'To understand usage and improve the framework, docs, and platform', 'To detect, prevent, and address abuse or technical issues', 'To send announcements and community updates (with your consent)'].map((item, i) => (
                                    <li key={i} className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span>{item}</span></li>
                                ))}
                            </ul>
                        </div>

                        <div id="data-security" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Data Security</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                The security of your data is important to us. We implement industry-standard technical and organizational measures to protect your personal information:
                            </p>
                            <ul className="space-y-3 text-lux-muted mb-4">
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Encryption:</strong> Data in transit uses HTTPS/TLS encryption. Sensitive data at rest is encrypted using industry-standard algorithms.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Access Control:</strong> Access to personal data is restricted to authorized personnel and systems that have a legitimate need to access it.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Regular Audits:</strong> We maintain and regularly test our security infrastructure to detect and address vulnerabilities.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Breach Notification:</strong> In the unlikely event of a data breach, we will notify affected individuals as required by applicable law, typically within 30–72 hours.</span></li>
                            </ul>
                            <p className="text-lux-muted leading-relaxed">
                                However, no method of transmission over the Internet or electronic storage is 100% secure. While we use appropriate safeguards, we cannot guarantee absolute security. You use our services at your own risk, though we maintain security practices consistent with legal and industry standards.
                            </p>
                        </div>

                        <div id="data-sharing" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Data Sharing and Disclosure</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                            </p>
                            <ul className="space-y-3 text-lux-muted">
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Infrastructure Providers:</strong> With trusted services that host and run the platform (such as our database, authentication, and hosting providers) strictly to operate KaizenStat.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Public Community Activity:</strong> Information you choose to make public, such as a competition leaderboard ranking, a published certificate, or open-source contributions on GitHub.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Legal Requirements:</strong> When required by law or to protect the rights, property, or safety of KaizenStat and its community.</span></li>
                            </ul>
                        </div>

                        <div id="your-rights" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Your Privacy Rights</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                Under applicable privacy laws worldwide, you have the following rights regarding your personal information. To exercise any of these rights, contact us at <span className="font-semibold">founders@kaizenstat.com</span> with clear details of your request. We will respond within 30 days (or as required by local law).
                            </p>
                            <ul className="space-y-3 text-lux-muted">
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Right to Access:</strong> You can request a copy of all personal data we hold about you in a structured, machine-readable format.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Right to Correction:</strong> You can ask us to correct inaccurate or incomplete data.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Right to Erasure:</strong> You can request deletion of your personal data, subject to certain exceptions (e.g., if data is needed to complete a competition or issue a certificate).</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Right to Object:</strong> You can object to processing of your data for marketing, analytics, or other purposes.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Right to Data Portability:</strong> You can request your data in a portable format to transfer to another service.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Right to Restrict Processing:</strong> You can ask us to limit processing of your data while we address your concern.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Right to Withdraw Consent:</strong> If you consented to processing, you can withdraw that consent at any time. This does not affect past processing.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Right to Lodge a Complaint:</strong> You have the right to file a complaint with your local data protection authority if you believe we've violated your privacy rights.</span></li>
                            </ul>
                        </div>

                        <div id="cookies" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Cookies &amp; Tracking Technologies</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                We use cookies and similar technologies (pixels, web beacons, local storage) to enhance your experience and understand how you use our site:
                            </p>
                            <ul className="space-y-3 text-lux-muted mb-4">
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Essential Cookies:</strong> Required for authentication, security, and basic site function (e.g., login session tokens). These cannot be disabled.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Preference Cookies:</strong> Remember your settings and choices (e.g., language, theme).</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Analytics Cookies:</strong> Help us understand site usage, popular pages, and user behavior. We use privacy-respecting analytics tools.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>No Third-Party Tracking:</strong> We do not use third-party advertising networks or behavioral tracking services.</span></li>
                            </ul>
                            <p className="text-lux-muted leading-relaxed">
                                <strong>Your Control:</strong> Most browsers allow you to refuse cookies or alert you when a site attempts to use them. You can control cookies in your browser settings. However, disabling essential cookies may limit site functionality. For non-essential cookies, you can opt out at any time by updating your preferences.
                            </p>
                        </div>

                        <div id="changes" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Changes to This Privacy Policy</h2>
                            <p className="text-lux-muted leading-relaxed">
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                            </p>
                        </div>

                        <div id="contact" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Contact &amp; Legal Information</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                For questions, concerns, privacy requests, or to exercise your rights under this policy, contact us:
                            </p>
                            <ul className="space-y-2 text-lux-muted mb-6">
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Email (Privacy):</strong> founders@kaizenstat.com</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Mail:</strong> Park Street, Kolkata, WB 700016, India</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>GitHub:</strong> github.com/kaizenstat-python/KaizenStat</span></li>
                            </ul>
                            <div className="p-4 rounded-lg bg-lux-glass/30 border border-lux-glassBorder">
                                <p className="text-xs text-lux-muted mb-2">
                                    <strong>Last Updated:</strong> June 13, 2026
                                </p>
                                <p className="text-xs text-lux-muted">
                                    <strong>Effective Date:</strong> June 13, 2026. This policy applies globally to all users. We comply with GDPR, CCPA, PIPEDA, DPDPA, and other applicable privacy laws.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
