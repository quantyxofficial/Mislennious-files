import React, { useState, useEffect } from 'react';
import { FileText, ChevronRight } from 'lucide-react';
import { updateMetaTags } from '../../utils/seo';

const SECTIONS = [
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
    { id: 'contact', text: 'Contact Information' },
];

export const Terms: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('');

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
                        <FileText className="w-3 h-3" />
                        Legal
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
                        Terms of Service
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
                                id: 'agreement',
                                title: 'Agreement to Terms',
                                content: (
                                    <>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                            These Terms of Service ("Terms") govern your use of the KaizenStat website (www.kaizenstat.com and all subdomains), member platform, competitions, certifications, community programs, and all related services operated by KaizenStat — a student-led, non-profit, open-source project based in India.
                                        </p>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                            By accessing the website, creating an account, entering a competition, earning a certification, or otherwise using our services, you agree to be bound by these Terms. They apply globally to all users, regardless of location.
                                        </p>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                            Use of the KaizenStat Python library (installed via <code className="font-mono text-xs bg-white/[0.06] px-1.5 py-0.5 rounded text-slate-300">pip install kaizenstat</code>) is governed separately by its open-source license. The library's license grants you rights independent of these Terms.
                                        </p>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            If you do not agree with any part of these Terms, you must not use our services.
                                        </p>
                                    </>
                                ),
                            },
                            {
                                id: 'services',
                                title: 'What We Offer',
                                content: (
                                    <>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-4">KaizenStat is a free, community-driven project. Our offerings include:</p>
                                        <ul className="space-y-3 mb-4">
                                            {[
                                                'The KaizenStat open-source Python ML framework (pip install kaizenstat)',
                                                'The KaizenStat Handbook — documentation with runnable Colab notebooks',
                                                'Practice problems and study materials',
                                                'ML competitions and data science challenges',
                                                'Verifiable certifications and member ID cards',
                                                'The KaizenStat Summer of Computation and community programs',
                                            ].map((item, i) => (
                                                <li key={i} className="flex gap-3">
                                                    <ChevronRight className="w-4 h-4 mt-0.5 text-slate-600 shrink-0" />
                                                    <span className="text-slate-400 text-sm leading-relaxed">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="text-slate-500 text-sm leading-relaxed">All of these are provided free of charge. KaizenStat does not sell paid services and there are no payment obligations.</p>
                                    </>
                                ),
                            },
                            {
                                id: 'license',
                                title: 'Open Source License',
                                content: (
                                    <>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                            The KaizenStat Python framework is released as open-source software under the Apache License 2.0. Your rights to use, modify, and redistribute the library are defined by that license.
                                        </p>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-4">Under Apache 2.0, you are free to:</p>
                                        <ul className="space-y-3 mb-4">
                                            {[
                                                'Use the library commercially or privately',
                                                'Modify and create derivative works',
                                                'Distribute the original or modified library',
                                                'Use the library in proprietary applications',
                                            ].map((item, i) => (
                                                <li key={i} className="flex gap-3">
                                                    <ChevronRight className="w-4 h-4 mt-0.5 text-slate-600 shrink-0" />
                                                    <span className="text-slate-400 text-sm leading-relaxed">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            Nothing in these Terms limits the rights granted to you under Apache 2.0. If there is a conflict between these Terms and the Apache 2.0 license regarding the library's source code, the Apache 2.0 license prevails.
                                        </p>
                                    </>
                                ),
                            },
                            {
                                id: 'accounts',
                                title: 'Member Accounts',
                                content: (
                                    <>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-4">Some features require an account. When you create one, you agree to:</p>
                                        <ul className="space-y-3">
                                            {[
                                                'Provide accurate information and keep it up to date',
                                                'Be responsible for activity that happens under your account',
                                                'Keep your login credentials confidential',
                                                'Notify us promptly of any unauthorized use of your account',
                                                'Maintain one account per person, used in good faith',
                                            ].map((item, i) => (
                                                <li key={i} className="flex gap-3">
                                                    <ChevronRight className="w-4 h-4 mt-0.5 text-slate-600 shrink-0" />
                                                    <span className="text-slate-400 text-sm leading-relaxed">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ),
                            },
                            {
                                id: 'responsibilities',
                                title: 'Acceptable Use',
                                content: (
                                    <>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-4">To keep the community safe and fair, you agree not to:</p>
                                        <ul className="space-y-3">
                                            {[
                                                'Use the platform for unlawful, harmful, or abusive purposes',
                                                'Cheat, plagiarize, or manipulate competition or certification results',
                                                'Interfere with, disrupt, or overload our servers or infrastructure',
                                                'Attempt to gain unauthorized access to accounts, data, or systems',
                                                'Scrape, resell, or misrepresent KaizenStat content or certificates',
                                                'Harass, impersonate, or harm other members of the community',
                                            ].map((item, i) => (
                                                <li key={i} className="flex gap-3">
                                                    <ChevronRight className="w-4 h-4 mt-0.5 text-slate-600 shrink-0" />
                                                    <span className="text-slate-400 text-sm leading-relaxed">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ),
                            },
                            {
                                id: 'competitions',
                                title: 'Competitions & Certifications',
                                content: (
                                    <>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-4">By participating in competitions or certification exams, you agree that:</p>
                                        <ul className="space-y-3">
                                            {[
                                                'Submissions must be your own original work unless a challenge explicitly allows collaboration',
                                                'We may review, score, rank, and publish results and leaderboards',
                                                'Certificates are issued based on genuine completion and can be revoked if obtained dishonestly',
                                                'Issued certificates and member IDs may be publicly verifiable via our verification pages',
                                            ].map((item, i) => (
                                                <li key={i} className="flex gap-3">
                                                    <ChevronRight className="w-4 h-4 mt-0.5 text-slate-600 shrink-0" />
                                                    <span className="text-slate-400 text-sm leading-relaxed">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ),
                            },
                            {
                                id: 'contributions',
                                title: 'Contributions',
                                content: (
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        If you contribute code, documentation, blog posts, or other materials to KaizenStat (for example through GitHub or the Summer of Computation program), you confirm that the contribution is your own work and that you have the right to submit it. Code contributions to the framework are accepted under Apache 2.0. You retain ownership of your contributions while granting KaizenStat and the community the rights necessary to use and distribute them under that license.
                                    </p>
                                ),
                            },
                            {
                                id: 'intellectual-property',
                                title: 'Intellectual Property',
                                content: (
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        The KaizenStat source code is licensed under Apache 2.0. The KaizenStat name, logo, and brand, along with website content such as the handbook, practice problems, and course material, remain the property of KaizenStat and its contributors. Except as permitted by the open-source license or by clearly marked open content, you may not reproduce, redistribute, or create derivative works of our brand or proprietary content without permission.
                                    </p>
                                ),
                            },
                            {
                                id: 'liability',
                                title: 'Limitation of Liability',
                                content: (
                                    <>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-4">To the maximum extent permitted by applicable law, KaizenStat and its founders, contributors, and infrastructure providers shall not be liable for:</p>
                                        <ul className="space-y-3 mb-4">
                                            {[
                                                'Indirect, incidental, special, consequential, or punitive damages',
                                                'Loss of profits, revenue, or business opportunity',
                                                'Loss of data, access, or use of our services',
                                                'Loss of goodwill, reputation, or other intangible losses',
                                                'Damages arising from your use of or inability to use our services',
                                            ].map((item, i) => (
                                                <li key={i} className="flex gap-3">
                                                    <ChevronRight className="w-4 h-4 mt-0.5 text-slate-600 shrink-0" />
                                                    <span className="text-slate-400 text-sm leading-relaxed">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            Our total liability for any claim shall not exceed the amount you paid to us in the 12 months preceding the claim (or USD 100 if you have not paid anything).
                                        </p>
                                    </>
                                ),
                            },
                            {
                                id: 'warranty',
                                title: 'Warranty Disclaimer',
                                content: (
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that our services will be uninterrupted, timely, secure, or error-free.
                                    </p>
                                ),
                            },
                            {
                                id: 'termination',
                                title: 'Termination',
                                content: (
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        We reserve the right to terminate or suspend access to our services immediately, without prior notice or liability, for any reason including breach of these Terms. Upon termination, your right to use our services will immediately cease.
                                    </p>
                                ),
                            },
                            {
                                id: 'governing-law',
                                title: 'Governing Law & Dispute Resolution',
                                content: (
                                    <>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                            These Terms shall be governed by and construed in accordance with the laws of India. Any legal action arising from these Terms shall be subject to the exclusive jurisdiction of the courts located in Kolkata, West Bengal, India.
                                        </p>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            Before pursuing legal action, we encourage you to attempt resolution through good-faith dialogue at <span className="text-white">founders@kaizenstat.com</span>.
                                        </p>
                                    </>
                                ),
                            },
                            {
                                id: 'changes',
                                title: 'Changes to Terms',
                                content: (
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        We reserve the right to modify these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. Your continued use of our services after changes constitutes acceptance of the new Terms.
                                    </p>
                                ),
                            },
                            {
                                id: 'contact',
                                title: 'Contact & Questions',
                                content: (
                                    <>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-6">If you have questions, concerns, or disputes regarding these Terms, contact us:</p>
                                        <ul className="space-y-3 mb-6">
                                            {[
                                                { label: 'Email', text: 'founders@kaizenstat.com' },
                                                { label: 'Postal', text: 'West Bengal, India' },
                                                { label: 'GitHub', text: 'github.com/kaizenstat-python/KaizenStat/issues' },
                                            ].map(({ label, text }) => (
                                                <li key={label} className="flex gap-3">
                                                    <ChevronRight className="w-4 h-4 mt-0.5 text-slate-600 shrink-0" />
                                                    <span className="text-slate-400 text-sm"><strong className="text-slate-200 font-semibold">{label}:</strong> {text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="px-4 py-3 rounded-lg border border-white/[0.06] bg-white/[0.03]">
                                            <p className="text-xs text-slate-500">
                                                <strong className="text-slate-400">Last Updated:</strong> June 13, 2026. These Terms apply to all users worldwide.
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
