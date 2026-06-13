import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, ChevronRight } from 'lucide-react';
import { updateMetaTags } from '../../utils/seo';

export default function Terms() {
    const [activeSection, setActiveSection] = useState<string>('');
    const [toc, setToc] = useState<{ id: string; text: string }[]>([]);

    useEffect(() => {
        updateMetaTags({
            title: 'Terms of Service — KaizenStat',
            description: 'Read the KaizenStat terms of service. Terms governing use of the KaizenStat platform, open source library, competitions, and community resources.',
            keywords: ['kaizenstat terms', 'kaizenstat terms of service', 'kaizenstat usage policy'],
            canonical: 'https://www.kaizenstat.com/terms',
            ogType: 'website',
        });
    }, []);

    useEffect(() => {
        const sections = [
            { id: 'agreement', text: 'Agreement to Terms' },
            { id: 'services', text: 'What We Offer' },
            { id: 'license', text: 'Open Source License' },
            { id: 'accounts', text: 'Member Accounts' },
            { id: 'responsibilities', text: 'Acceptable Use' },
            { id: 'competitions', text: 'Competitions & Certifications' },
            { id: 'contributions', text: 'Contributions' },
            { id: 'intellectual-property', text: 'Intellectual Property' },
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
                            <p className="text-lux-muted leading-relaxed mb-4">
                                These Terms of Service ("Terms") govern your use of the KaizenStat website (www.kaizenstat.com and all subdomains), member platform, competitions, certifications, community programs, and all related services operated by KaizenStat ("we", "us", "our", or "KaizenStat"), a student-led, non-profit, open-source project based in India.
                            </p>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                By accessing the website, creating an account, entering a competition, earning a certification, or otherwise using our services, you agree to be bound by these Terms. These Terms apply globally to all users, regardless of location.
                            </p>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                Use of the KaizenStat Python library (installed via <span className="font-mono text-sm">pip install kaizenstat</span>) is governed separately by its open-source license (see the "Open Source License" section below). The library's license grants you rights independent of these Terms.
                            </p>
                            <p className="text-lux-muted leading-relaxed">
                                If you do not agree with any part of these Terms, you must not use our services. If you believe a specific term is unenforceable in your jurisdiction, that does not invalidate the rest of these Terms.
                            </p>
                        </div>

                        <div id="services" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">What We Offer</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                KaizenStat is a free, community-driven project. Our offerings include:
                            </p>
                            <ul className="space-y-2 text-lux-muted">
                                {['The KaizenStat open-source Python ML framework (pip install kaizenstat)', 'The KaizenStat Handbook — documentation with runnable Colab notebooks', 'Practice problems and study materials', 'ML competitions and data science challenges', 'Verifiable certifications and member ID cards', 'The KaizenStat Summer of Computation and community programs'].map((service, i) => (
                                    <li key={i} className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span>{service}</span></li>
                                ))}
                            </ul>
                            <p className="text-lux-muted leading-relaxed mt-4">
                                All of these are provided free of charge. KaizenStat does not sell paid services and there are no payment obligations to use the platform.
                            </p>
                        </div>

                        <div id="license" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Open Source License</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                The KaizenStat Python framework is released as open-source software under the Apache License 2.0. Your rights to use, modify, and redistribute the library are defined by that license. The full license text is available at:
                            </p>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                <span className="font-mono text-sm">github.com/kaizenstat-python/KaizenStat/blob/main/LICENSE</span>
                            </p>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                Under Apache 2.0, you are free to:
                            </p>
                            <ul className="space-y-2 text-lux-muted mb-4">
                                {['Use the library commercially or privately', 'Modify and create derivative works', 'Distribute the original or modified library', 'Use the library in proprietary applications'].map((item, i) => (
                                    <li key={i} className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span>{item}</span></li>
                                ))}
                            </ul>
                            <p className="text-lux-muted leading-relaxed">
                                <strong>Important:</strong> Nothing in these Terms of Service limits the rights granted to you under the Apache 2.0 license. If there is a conflict between these Terms and the Apache 2.0 license regarding the use of the library's source code, the Apache 2.0 license prevails. These Terms apply only to our website and community services, not to the library itself.
                            </p>
                        </div>

                        <div id="accounts" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Member Accounts</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                Some features — the member dashboard, competitions, certifications, and ID card — require an account. When you create one, you agree to:
                            </p>
                            <ul className="space-y-3 text-lux-muted">
                                {[
                                    'Provide accurate information and keep it up to date',
                                    'Be responsible for activity that happens under your account',
                                    'Keep your login credentials confidential',
                                    'Notify us promptly of any unauthorized use of your account',
                                    'Maintain one account per person, used in good faith'
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span>{item}</span></li>
                                ))}
                            </ul>
                        </div>

                        <div id="responsibilities" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Acceptable Use</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                To keep the community safe and fair, you agree not to:
                            </p>
                            <ul className="space-y-3 text-lux-muted">
                                {[
                                    'Use the platform for unlawful, harmful, or abusive purposes',
                                    'Cheat, plagiarize, or manipulate competition or certification results',
                                    'Interfere with, disrupt, or overload our servers or infrastructure',
                                    'Attempt to gain unauthorized access to accounts, data, or systems',
                                    'Scrape, resell, or misrepresent KaizenStat content or certificates',
                                    'Harass, impersonate, or harm other members of the community'
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span>{item}</span></li>
                                ))}
                            </ul>
                        </div>

                        <div id="competitions" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Competitions &amp; Certifications</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                Competitions and certification exams may carry their own specific rules, eligibility, and deadlines published alongside each event. By participating, you agree that:
                            </p>
                            <ul className="space-y-2 text-lux-muted">
                                {['Submissions must be your own original work unless a challenge explicitly allows collaboration', 'We may review, score, rank, and publish results and leaderboards', 'Certificates are issued based on genuine completion and can be revoked if obtained dishonestly', 'Issued certificates and member IDs may be publicly verifiable via our verification pages'].map((item, i) => (
                                    <li key={i} className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span>{item}</span></li>
                                ))}
                            </ul>
                        </div>

                        <div id="contributions" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Contributions</h2>
                            <p className="text-lux-muted leading-relaxed">
                                If you contribute code, documentation, blog posts, or other materials to KaizenStat (for example through GitHub or the Summer of Computation program), you confirm that the contribution is your own work and that you have the right to submit it. Code contributions to the framework are accepted under the project's Apache 2.0 license. You retain ownership of your contributions while granting KaizenStat and the community the rights necessary to use and distribute them under that license.
                            </p>
                        </div>

                        <div id="intellectual-property" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Intellectual Property</h2>
                            <p className="text-lux-muted leading-relaxed">
                                The KaizenStat source code is licensed under Apache 2.0. The KaizenStat name, logo, and brand, along with website content such as the handbook, practice problems, and course material, remain the property of KaizenStat and its contributors. Except as permitted by the open-source license or by clearly marked open content, you may not reproduce, redistribute, or create derivative works of our brand or proprietary content without permission.
                            </p>
                        </div>

                        <div id="liability" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Limitation of Liability</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                To the maximum extent permitted by applicable law, KaizenStat and its founders, contributors, and infrastructure providers shall not be liable for:
                            </p>
                            <ul className="space-y-2 text-lux-muted mb-4">
                                {['Indirect, incidental, special, consequential, or punitive damages', 'Loss of profits, revenue, or business opportunity', 'Loss of data, access, or use of our services', 'Loss of goodwill, reputation, or other intangible losses', 'Damages arising from your use of or inability to use our services', 'Damages caused by unauthorized access, viruses, or malware', 'Damages from third-party services or content linked from our site'].map((item, i) => (
                                    <li key={i} className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span>{item}</span></li>
                                ))}
                            </ul>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                <strong>Your Total Liability Cap:</strong> Our total liability to you for any claim arising from these Terms or your use of our services shall not exceed the amount you paid to us in the 12 months preceding the claim (or, if you have not paid anything, USD 100 or equivalent in your local currency).
                            </p>
                            <p className="text-lux-muted leading-relaxed">
                                <strong>Exceptions:</strong> These limitations do not apply to: (1) fraud or willful misconduct; (2) death or personal injury; (3) violations of your privacy rights; or (4) claims that cannot be limited under applicable law.
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
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Governing Law &amp; Dispute Resolution</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. This choice of law applies regardless of your location or the location where access to our services occurs.
                            </p>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                <strong>Jurisdiction:</strong> Any legal action, suit, or proceeding arising from these Terms or your use of our services shall be subject to the exclusive jurisdiction of the courts located in Kolkata, West Bengal, India. By using our services, you consent to this jurisdiction.
                            </p>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                <strong>Alternative Dispute Resolution:</strong> Before pursuing legal action, we encourage you to attempt resolution through good-faith dialogue. Contact us at founders@kaizenstat.com to resolve the dispute informally.
                            </p>
                            <p className="text-lux-muted leading-relaxed">
                                <strong>Note for Residents Outside India:</strong> If you are a consumer resident in a jurisdiction with mandatory consumer protection laws (such as EU member states or California), those laws may apply to you despite this choice of law clause to the extent required by local law.
                            </p>
                        </div>

                        <div id="changes" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Changes to Terms</h2>
                            <p className="text-lux-muted leading-relaxed">
                                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. Your continued use of our services after changes constitutes acceptance of the new Terms.
                            </p>
                        </div>

                        <div id="contact" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Contact &amp; Questions</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                If you have questions, concerns, or disputes regarding these Terms, please contact us:
                            </p>
                            <ul className="space-y-2 text-lux-muted mb-6">
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Email:</strong> founders@kaizenstat.com</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Postal:</strong> Park Street, Kolkata, WB 700016, India</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>GitHub:</strong> github.com/kaizenstat-python/KaizenStat/issues</span></li>
                            </ul>
                            <div className="p-4 rounded-lg bg-lux-glass/30 border border-lux-glassBorder">
                                <p className="text-xs text-lux-muted mb-2">
                                    <strong>Last Updated:</strong> June 13, 2026
                                </p>
                                <p className="text-xs text-lux-muted">
                                    These Terms apply to all users worldwide. They are binding and enforceable in the jurisdictions where KaizenStat operates.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
