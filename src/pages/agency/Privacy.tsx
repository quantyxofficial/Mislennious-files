import React, { useState, useEffect } from 'react';
import { Shield, ChevronRight } from 'lucide-react';
import { updateMetaTags } from '../../utils/seo';

const SECTIONS = [
    { id: 'introduction', text: 'Introduction' },
    { id: 'information-we-collect', text: 'Information We Collect' },
    { id: 'how-we-use', text: 'How We Use Your Information' },
    { id: 'data-security', text: 'Data Security' },
    { id: 'data-sharing', text: 'Data Sharing' },
    { id: 'your-rights', text: 'Your Rights' },
    { id: 'cookies', text: 'Cookies Policy' },
    { id: 'changes', text: 'Changes to Policy' },
    { id: 'contact', text: 'Contact Us' },
];

export const Privacy: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('');

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
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;
            for (let i = SECTIONS.length - 1; i >= 0; i--) {
                const el = document.getElementById(SECTIONS[i].id);
                if (el && el.offsetTop <= scrollPosition) {
                    setActiveSection(SECTIONS[i].id);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero */}
            <section className="pt-32 pb-16 px-6 md:px-12 border-b border-white/[0.06]">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8">
                        <Shield className="w-3 h-3" />
                        Legal
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-slate-500 text-sm">Last updated: June 13, 2026</p>
                </div>
            </section>

            {/* Content */}
            <section className="px-6 md:px-12 pb-32 pt-16">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Sidebar */}
                    <aside className="hidden lg:block lg:col-span-3 sticky top-28">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-4">Contents</p>
                        <nav className="space-y-0.5">
                            {SECTIONS.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className={`flex items-center gap-3 py-2 text-xs transition-all duration-200 ${
                                        activeSection === item.id
                                            ? 'text-white translate-x-2'
                                            : 'text-slate-500 hover:text-slate-300 hover:translate-x-1'
                                    }`}
                                >
                                    <span className={`w-px h-3 transition-all duration-200 ${
                                        activeSection === item.id ? 'bg-white h-4' : 'bg-white/10'
                                    }`} />
                                    {item.text}
                                </a>
                            ))}
                        </nav>
                    </aside>

                    {/* Main */}
                    <div className="lg:col-span-9 space-y-px">
                        {[
                            {
                                id: 'introduction',
                                title: 'Introduction',
                                content: (
                                    <>
                                        <p className="text-slate-400 leading-relaxed mb-4">
                                            KaizenStat ("we", "our", or "us") is a student-led, non-profit open-source project that builds a Python machine learning framework and runs a learning community of documentation, practice problems, competitions, and certifications. This Privacy Policy explains how we collect, use, store, and safeguard your information when you visit www.kaizenstat.com, create a member account, participate in competitions or certifications, or engage with our community programs. This policy complies with global privacy standards including GDPR (EU), CCPA (California), PIPEDA (Canada), and India's Digital Personal Data Protection Act (DPDPA).
                                        </p>
                                        <p className="text-slate-400 leading-relaxed mb-4">
                                            The KaizenStat Python library itself (installed via <code className="font-mono text-xs bg-white/[0.06] px-1.5 py-0.5 rounded text-slate-300">pip install kaizenstat</code>) runs entirely on your own machine. It does not transmit your datasets, code, model outputs, or any personal data to us. The library is data-local and privacy-first by design.
                                        </p>
                                        <p className="text-slate-400 leading-relaxed">
                                            This policy covers only our website, community platform, competitions, and services. By creating an account or using our services, you agree to the collection and use of information described here.
                                        </p>
                                    </>
                                ),
                            },
                            {
                                id: 'information-we-collect',
                                title: 'Information We Collect',
                                content: (
                                    <ul className="space-y-4">
                                        {[
                                            { label: 'Account Information', text: 'Your name, email address, and chosen avatar when you create a KaizenStat member account to access the dashboard, competitions, and ID card.' },
                                            { label: 'Learning & Program Activity', text: 'Practice attempts, competition entries and submissions, certification exam results, and progress through the handbook, used to show your dashboard, issue certificates, and rank competitions.' },
                                            { label: 'Usage Data', text: 'Information about how you access the website, such as IP address, browser type, pages visited, and time spent, collected to understand and improve the platform.' },
                                            { label: 'Cookies and Tracking', text: 'We use cookies and similar technologies to keep you signed in and to understand site usage. See the Cookies section below.' },
                                            { label: 'Third-Party Authentication', text: 'If you sign in with Google, we receive your Google profile information (name, email address, and profile picture) as permitted by your Google account settings.' },
                                        ].map(({ label, text }) => (
                                            <li key={label} className="flex gap-3">
                                                <ChevronRight className="w-4 h-4 mt-0.5 text-slate-600 shrink-0" />
                                                <span className="text-slate-400 text-sm leading-relaxed"><strong className="text-slate-200 font-semibold">{label}:</strong> {text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ),
                            },
                            {
                                id: 'how-we-use',
                                title: 'How We Use Your Information',
                                content: (
                                    <ul className="space-y-3">
                                        {[
                                            'To create and maintain your member account and dashboard',
                                            'To run competitions, score submissions, and publish leaderboards',
                                            'To issue and verify certificates and member ID cards',
                                            'To track your learning progress through the handbook and practice problems',
                                            'To respond to questions, support requests, and contributions',
                                            'To understand usage and improve the framework, docs, and platform',
                                            'To detect, prevent, and address abuse or technical issues',
                                            'To send announcements and community updates (with your consent)',
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-3">
                                                <ChevronRight className="w-4 h-4 mt-0.5 text-slate-600 shrink-0" />
                                                <span className="text-slate-400 text-sm leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ),
                            },
                            {
                                id: 'data-security',
                                title: 'Data Security',
                                content: (
                                    <>
                                        <ul className="space-y-4 mb-4">
                                            {[
                                                { label: 'Encryption', text: 'Data in transit uses HTTPS/TLS encryption. Sensitive data at rest is encrypted using industry-standard algorithms.' },
                                                { label: 'Access Control', text: 'Access to personal data is restricted to authorized personnel and systems that have a legitimate need to access it.' },
                                                { label: 'Regular Audits', text: 'We maintain and regularly test our security infrastructure to detect and address vulnerabilities.' },
                                                { label: 'Breach Notification', text: 'In the unlikely event of a data breach, we will notify affected individuals as required by applicable law, typically within 30–72 hours.' },
                                            ].map(({ label, text }) => (
                                                <li key={label} className="flex gap-3">
                                                    <ChevronRight className="w-4 h-4 mt-0.5 text-slate-600 shrink-0" />
                                                    <span className="text-slate-400 text-sm leading-relaxed"><strong className="text-slate-200 font-semibold">{label}:</strong> {text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="text-slate-500 text-sm leading-relaxed">
                                            No method of transmission over the Internet or electronic storage is 100% secure. While we use appropriate safeguards, we cannot guarantee absolute security.
                                        </p>
                                    </>
                                ),
                            },
                            {
                                id: 'data-sharing',
                                title: 'Data Sharing and Disclosure',
                                content: (
                                    <>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-4">We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
                                        <ul className="space-y-4">
                                            {[
                                                { label: 'Infrastructure Providers', text: 'With trusted services that host and run the platform strictly to operate KaizenStat.' },
                                                { label: 'Public Community Activity', text: 'Information you choose to make public, such as a competition leaderboard ranking, a published certificate, or open-source contributions on GitHub.' },
                                                { label: 'Legal Requirements', text: 'When required by law or to protect the rights, property, or safety of KaizenStat and its community.' },
                                            ].map(({ label, text }) => (
                                                <li key={label} className="flex gap-3">
                                                    <ChevronRight className="w-4 h-4 mt-0.5 text-slate-600 shrink-0" />
                                                    <span className="text-slate-400 text-sm leading-relaxed"><strong className="text-slate-200 font-semibold">{label}:</strong> {text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ),
                            },
                            {
                                id: 'your-rights',
                                title: 'Your Privacy Rights',
                                content: (
                                    <>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                            Under applicable privacy laws worldwide, you have the following rights. Contact us at <span className="text-white font-medium">founders@kaizenstat.com</span> to exercise them. We will respond within 30 days.
                                        </p>
                                        <ul className="space-y-3">
                                            {[
                                                { label: 'Right to Access', text: 'Request a copy of all personal data we hold about you.' },
                                                { label: 'Right to Correction', text: 'Ask us to correct inaccurate or incomplete data.' },
                                                { label: 'Right to Erasure', text: 'Request deletion of your personal data, subject to certain exceptions.' },
                                                { label: 'Right to Object', text: 'Object to processing of your data for marketing, analytics, or other purposes.' },
                                                { label: 'Right to Data Portability', text: 'Request your data in a portable format to transfer to another service.' },
                                                { label: 'Right to Restrict Processing', text: 'Ask us to limit processing of your data while we address your concern.' },
                                                { label: 'Right to Withdraw Consent', text: 'If you consented to processing, you can withdraw that consent at any time.' },
                                                { label: 'Right to Lodge a Complaint', text: 'File a complaint with your local data protection authority if you believe we\'ve violated your privacy rights.' },
                                            ].map(({ label, text }) => (
                                                <li key={label} className="flex gap-3">
                                                    <ChevronRight className="w-4 h-4 mt-0.5 text-slate-600 shrink-0" />
                                                    <span className="text-slate-400 text-sm leading-relaxed"><strong className="text-slate-200 font-semibold">{label}:</strong> {text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ),
                            },
                            {
                                id: 'cookies',
                                title: 'Cookies & Tracking Technologies',
                                content: (
                                    <>
                                        <ul className="space-y-4 mb-4">
                                            {[
                                                { label: 'Essential Cookies', text: 'Required for authentication, security, and basic site function. These cannot be disabled.' },
                                                { label: 'Preference Cookies', text: 'Remember your settings and choices.' },
                                                { label: 'Analytics Cookies', text: 'Help us understand site usage, popular pages, and user behavior using privacy-respecting analytics tools.' },
                                                { label: 'No Third-Party Tracking', text: 'We do not use third-party advertising networks or behavioral tracking services.' },
                                            ].map(({ label, text }) => (
                                                <li key={label} className="flex gap-3">
                                                    <ChevronRight className="w-4 h-4 mt-0.5 text-slate-600 shrink-0" />
                                                    <span className="text-slate-400 text-sm leading-relaxed"><strong className="text-slate-200 font-semibold">{label}:</strong> {text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="text-slate-500 text-sm leading-relaxed">
                                            Most browsers allow you to refuse cookies or alert you when a site attempts to use them. Disabling essential cookies may limit site functionality.
                                        </p>
                                    </>
                                ),
                            },
                            {
                                id: 'changes',
                                title: 'Changes to This Policy',
                                content: (
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        We may update this Privacy Policy from time to time. We will notify you of changes by posting the new policy on this page and updating the "Last updated" date. Review this page periodically for any changes.
                                    </p>
                                ),
                            },
                            {
                                id: 'contact',
                                title: 'Contact & Legal Information',
                                content: (
                                    <>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                            For questions, concerns, or to exercise your privacy rights, contact us:
                                        </p>
                                        <ul className="space-y-3 mb-6">
                                            {[
                                                { label: 'Email', text: 'founders@kaizenstat.com' },
                                                { label: 'Mail', text: 'West Bengal, India' },
                                                { label: 'GitHub', text: 'github.com/kaizenstat-python/KaizenStat' },
                                            ].map(({ label, text }) => (
                                                <li key={label} className="flex gap-3">
                                                    <ChevronRight className="w-4 h-4 mt-0.5 text-slate-600 shrink-0" />
                                                    <span className="text-slate-400 text-sm"><strong className="text-slate-200 font-semibold">{label}:</strong> {text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="px-4 py-3 rounded-lg border border-white/[0.06] bg-white/[0.03]">
                                            <p className="text-xs text-slate-500">
                                                <strong className="text-slate-400">Effective Date:</strong> June 13, 2026. This policy applies globally. We comply with GDPR, CCPA, PIPEDA, DPDPA, and other applicable privacy laws.
                                            </p>
                                        </div>
                                    </>
                                ),
                            },
                        ].map(({ id, title, content }) => (
                            <div
                                key={id}
                                id={id}
                                className="scroll-mt-28 py-12 border-b border-white/[0.06] first:pt-0"
                            >
                                <h2 className="text-xl font-bold text-white mb-6 tracking-tight">{title}</h2>
                                {content}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
