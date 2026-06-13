import React, { useState, useEffect } from 'react';
import { Scale, ChevronRight } from 'lucide-react';
import { updateMetaTags } from '../../utils/seo';

const SECTIONS = [
    { id: 'mission', text: 'Our Commitment' },
    { id: 'transparency', text: 'Transparency by Design' },
    { id: 'responsible-ai', text: 'Responsible AI' },
    { id: 'data-ethics', text: 'Data Ethics' },
    { id: 'open-source', text: 'Open Source Values' },
    { id: 'community', text: 'Community Conduct' },
    { id: 'education', text: 'Honest Learning' },
    { id: 'accountability', text: 'Accountability' },
    { id: 'contact', text: 'Raise a Concern' },
];

export const Ethics: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        updateMetaTags({
            title: 'Ethics & Responsible AI — KaizenStat',
            description: "KaizenStat's commitment to responsible AI, transparent machine learning, open-source values, and an inclusive student community.",
            keywords: ['kaizenstat ethics', 'responsible ai', 'ethical machine learning', 'open source ethics'],
            canonical: 'https://www.kaizenstat.com/ethics',
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
                        <Scale className="w-3 h-3" />
                        Legal
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
                        Ethics & Responsible AI
                    </h1>
                    <p className="text-slate-500 text-sm">How we build, teach, and use machine learning — responsibly.</p>
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
                                id: 'mission',
                                title: 'Our Commitment',
                                content: (
                                    <>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                            KaizenStat exists to make machine learning easy to learn, debug, and understand. That mission comes with responsibility. As a student-led, non-profit, open-source project, we believe the tools we build and the community we grow should make AI more transparent and more accessible — never more opaque or more harmful.
                                        </p>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            This charter describes the principles we hold ourselves to, and what we expect from everyone who builds with us, learns with us, and contributes to our work.
                                        </p>
                                    </>
                                ),
                            },
                            {
                                id: 'transparency',
                                title: 'Transparency by Design',
                                content: (
                                    <>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-4">KaizenStat was built because powerful tools rarely explain <em>why</em>. We reject black boxes wherever we can:</p>
                                        <ul className="space-y-3">
                                            {[
                                                'The framework explains its decisions — health scores, validation findings, and debugging traces are surfaced, not hidden.',
                                                'Our trust scoring and explainability features exist to help users understand model behaviour, not just accept it.',
                                                'Documentation is open and runnable, so anyone can verify what the framework actually does.',
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
                                id: 'responsible-ai',
                                title: 'Responsible AI Practices',
                                content: (
                                    <>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-4">We design KaizenStat to encourage responsible machine learning practices:</p>
                                        <ul className="space-y-4">
                                            {[
                                                { label: 'Fairness & Bias Detection', text: 'Our data health checks actively flag class imbalance, feature drift, demographic parity violations, and quality issues that often hide historical bias before it reaches a model.' },
                                                { label: 'Accountability & Auditing', text: 'We encourage users to inspect, validate, test, and document their data pipelines and model decisions. Our debug engine surfaces failure modes and edge cases.' },
                                                { label: 'Explainability', text: 'Models should be interpretable to their users. We provide feature importance, trust scores, and decision traces to demystify model behavior.' },
                                                { label: 'Prohibition on Harmful Use', text: 'KaizenStat must not be used to build systems intended to deceive, manipulate, conduct unlawful surveillance, discriminate based on protected characteristics, or cause harm to individuals or groups.' },
                                                { label: 'Human Judgment', text: 'Automation is a tool to assist people, not replace careful human decision-making. In high-stakes decisions, human judgment must always remain central.' },
                                                { label: 'Continuous Improvement', text: 'AI systems drift over time. Users should monitor model performance continuously and retrain when performance degrades.' },
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
                                id: 'data-ethics',
                                title: 'Data Ethics',
                                content: (
                                    <>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-4">The framework runs on your own machine and we never receive your datasets. With that privacy comes a shared responsibility to use data ethically. We ask everyone in our community to:</p>
                                        <ul className="space-y-3">
                                            {[
                                                'Use data you have the right to use, and respect the consent and privacy of the people it represents.',
                                                'Avoid re-identifying anonymized data or working with data obtained unlawfully.',
                                                'Consider the real-world impact of models trained on sensitive or personal data.',
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
                                id: 'open-source',
                                title: 'Open Source Values',
                                content: (
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        KaizenStat is free and open under the Apache 2.0 license, and it will stay that way. We believe knowledge and tooling for machine learning should be available to every student and developer, regardless of background or budget. We build in the open, welcome scrutiny, credit contributors, and make our decisions reviewable on GitHub.
                                    </p>
                                ),
                            },
                            {
                                id: 'community',
                                title: 'Community Conduct',
                                content: (
                                    <>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-4">Our community spans students, mentors, and contributors worldwide. Everyone is expected to:</p>
                                        <ul className="space-y-3">
                                            {[
                                                'Treat others with respect, patience, and kindness — especially beginners',
                                                'Welcome people of every background, identity, and skill level',
                                                'Give and receive feedback constructively and in good faith',
                                                'Reject harassment, discrimination, and personal attacks of any kind',
                                                'Help keep the community a safe place to learn and make mistakes',
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
                                id: 'education',
                                title: 'Honest Learning',
                                content: (
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        Our competitions, certifications, and practice problems are meant to help you genuinely grow. Integrity matters: we expect original work, honest collaboration only where allowed, and no cheating or plagiarism. Certificates issued by KaizenStat should reflect real understanding, which is why they are verifiable — and why we revoke any obtained dishonestly.
                                    </p>
                                ),
                            },
                            {
                                id: 'accountability',
                                title: 'Our Accountability',
                                content: (
                                    <>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-4">We hold ourselves to these principles and are accountable to our community for upholding them:</p>
                                        <ul className="space-y-4 mb-4">
                                            {[
                                                { label: 'Transparency', text: 'We publish our decision-making processes publicly on GitHub and welcome external review.' },
                                                { label: 'Response to Concerns', text: 'Security issues, ethical concerns, or reports of harmful behavior are reviewed within 7 days. We will respond, investigate, and take corrective action if needed.' },
                                                { label: 'Public Updates', text: 'Significant changes to our ethics practices or responses to reported issues will be communicated publicly to the community.' },
                                                { label: 'Community Oversight', text: 'Our contributors and community members have the right to hold us accountable for upholding these values.' },
                                            ].map(({ label, text }) => (
                                                <li key={label} className="flex gap-3">
                                                    <ChevronRight className="w-4 h-4 mt-0.5 text-slate-600 shrink-0" />
                                                    <span className="text-slate-400 text-sm leading-relaxed"><strong className="text-slate-200 font-semibold">{label}:</strong> {text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="text-slate-500 text-sm leading-relaxed">
                                            When we make mistakes, we will acknowledge them, explain what went wrong, and share what we learned. We are a learning project built by students.
                                        </p>
                                    </>
                                ),
                            },
                            {
                                id: 'contact',
                                title: 'Raise a Concern',
                                content: (
                                    <>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                            If you witness or suspect a violation of this ethics charter, or have concerns about how KaizenStat is being built or used, we want to hear from you. We commit to responding to all good-faith concerns thoughtfully.
                                        </p>
                                        <ul className="space-y-3 mb-6">
                                            {[
                                                { label: 'Ethics & Conduct', text: 'founders@kaizenstat.com' },
                                                { label: 'Security Vulnerability', text: 'founders@kaizenstat.com (subject: "Security Report")' },
                                                { label: 'Technical Issue', text: 'github.com/kaizenstat-python/KaizenStat/issues' },
                                                { label: 'Postal Mail', text: 'Park Street, Kolkata, WB 700016, India' },
                                            ].map(({ label, text }) => (
                                                <li key={label} className="flex gap-3">
                                                    <ChevronRight className="w-4 h-4 mt-0.5 text-slate-600 shrink-0" />
                                                    <span className="text-slate-400 text-sm"><strong className="text-slate-200 font-semibold">{label}:</strong> {text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="px-4 py-3 rounded-lg border border-white/[0.06] bg-white/[0.03]">
                                            <p className="text-xs text-slate-500">
                                                <strong className="text-slate-400">Last Updated:</strong> June 13, 2026. Security reports and ethics concerns sent to founders@kaizenstat.com will be treated confidentially.
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
