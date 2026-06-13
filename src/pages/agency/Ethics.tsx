import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Scale, ChevronRight } from 'lucide-react';
import { updateMetaTags } from '../../utils/seo';

export const Ethics: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('');
    const [toc, setToc] = useState<{ id: string; text: string }[]>([]);

    useEffect(() => {
        updateMetaTags({
            title: 'Ethics & Responsible AI — KaizenStat',
            description: 'KaizenStat\'s commitment to responsible AI, transparent machine learning, open-source values, and an inclusive student community. Read our ethics charter.',
            keywords: ['kaizenstat ethics', 'responsible ai', 'ethical machine learning', 'open source ethics', 'kaizenstat code of conduct'],
            canonical: 'https://www.kaizenstat.com/ethics',
            ogType: 'website',
        });
    }, []);

    useEffect(() => {
        const sections = [
            { id: 'mission', text: 'Our Commitment' },
            { id: 'transparency', text: 'Transparency by Design' },
            { id: 'responsible-ai', text: 'Responsible AI' },
            { id: 'data-ethics', text: 'Data Ethics' },
            { id: 'open-source', text: 'Open Source Values' },
            { id: 'community', text: 'Community Conduct' },
            { id: 'education', text: 'Honest Learning' },
            { id: 'accountability', text: 'Accountability' },
            { id: 'contact', text: 'Raise a Concern' }
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
                        <Scale className="w-10 h-10 text-lux-text" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-serif text-5xl md:text-7xl text-lux-text mb-6 leading-tight"
                    >
                        Ethics &amp; Responsible AI
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lux-muted text-lg"
                    >
                        How we build, teach, and use machine learning — responsibly.
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
                        <div id="mission" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Our Commitment</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                KaizenStat exists to make machine learning easy to learn, debug, and understand. That mission comes with responsibility. As a student-led, non-profit, open-source project, we believe the tools we build and the community we grow should make AI more transparent and more accessible — never more opaque or more harmful.
                            </p>
                            <p className="text-lux-muted leading-relaxed">
                                This charter describes the principles we hold ourselves to, and what we expect from everyone who builds with us, learns with us, and contributes to our work.
                            </p>
                        </div>

                        <div id="transparency" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Transparency by Design</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                KaizenStat was built because powerful tools rarely explain <em>why</em>. We reject black boxes wherever we can:
                            </p>
                            <ul className="space-y-3 text-lux-muted">
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span>The framework explains its decisions — health scores, validation findings, and debugging traces are surfaced, not hidden.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span>Our trust scoring and explainability features exist to help users understand model behaviour, not just accept it.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span>Documentation is open and runnable, so anyone can verify what the framework actually does.</span></li>
                            </ul>
                        </div>

                        <div id="responsible-ai" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Responsible AI Practices</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                We design KaizenStat to encourage responsible machine learning practices aligned with global responsible AI principles:
                            </p>
                            <ul className="space-y-3 text-lux-muted mb-4">
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Fairness &amp; Bias Detection:</strong> Our data health checks actively flag class imbalance, feature drift, demographic parity violations, and quality issues that often hide historical bias before it reaches a model. We encourage decomposing model decisions by demographic groups.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Accountability &amp; Auditing:</strong> We encourage users to inspect, validate, test, and document their data pipelines and model decisions. Our debug engine surfaces failure modes and edge cases.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Explainability:</strong> Models should be interpretable to their users. We provide feature importance, trust scores, and decision traces to demystify model behavior.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Prohibition on Harmful Use:</strong> KaizenStat must not be used to build systems intended to: (1) deceive or manipulate people; (2) conduct unlawful surveillance; (3) discriminate based on protected characteristics; (4) automate decisions in high-stakes contexts (criminal justice, employment, credit, healthcare) without human oversight; or (5) cause harm to individuals or groups.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Human Judgment &amp; Override:</strong> Automation is a tool to assist people, not to replace careful human decision-making. In high-stakes decisions, human judgment must always remain central.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Continuous Improvement:</strong> AI systems drift over time. Users should monitor model performance continuously and retrain when performance degrades.</span></li>
                            </ul>
                        </div>

                        <div id="data-ethics" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Data Ethics</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                The framework runs on your own machine and we never receive your datasets. With that privacy comes a shared responsibility to use data ethically. We ask everyone in our community to:
                            </p>
                            <ul className="space-y-3 text-lux-muted">
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span>Use data you have the right to use, and respect the consent and privacy of the people it represents.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span>Avoid re-identifying anonymized data or working with data obtained unlawfully.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span>Consider the real-world impact of models trained on sensitive or personal data.</span></li>
                            </ul>
                        </div>

                        <div id="open-source" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Open Source Values</h2>
                            <p className="text-lux-muted leading-relaxed">
                                KaizenStat is free and open under the Apache 2.0 license, and it will stay that way. We believe knowledge and tooling for machine learning should be available to every student and developer, regardless of background or budget. We build in the open, welcome scrutiny, credit contributors, and make our decisions reviewable on GitHub.
                            </p>
                        </div>

                        <div id="community" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Community Conduct</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                Our community spans students, mentors, and contributors worldwide. Everyone is expected to:
                            </p>
                            <ul className="space-y-3 text-lux-muted">
                                {[
                                    'Treat others with respect, patience, and kindness — especially beginners',
                                    'Welcome people of every background, identity, and skill level',
                                    'Give and receive feedback constructively and in good faith',
                                    'Reject harassment, discrimination, and personal attacks of any kind',
                                    'Help keep the community a safe place to learn and make mistakes'
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span>{item}</span></li>
                                ))}
                            </ul>
                        </div>

                        <div id="education" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Honest Learning</h2>
                            <p className="text-lux-muted leading-relaxed">
                                Our competitions, certifications, and practice problems are meant to help you genuinely grow. Integrity matters: we expect original work, honest collaboration only where allowed, and no cheating or plagiarism. Certificates issued by KaizenStat should reflect real understanding, which is why they are verifiable — and why we revoke any obtained dishonestly.
                            </p>
                        </div>

                        <div id="accountability" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Our Accountability</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                We hold ourselves to these principles and are accountable to our community for upholding them. Here's how:
                            </p>
                            <ul className="space-y-3 text-lux-muted mb-4">
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Transparency:</strong> We publish our decision-making processes publicly on GitHub and welcome external review.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Response to Concerns:</strong> Security issues, ethical concerns, or reports of harmful behavior are reviewed within 7 days. We will respond, investigate, and take corrective action if needed.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Public Updates:</strong> Significant changes to our ethics practices or responses to reported issues will be communicated publicly to the community.</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Community Oversight:</strong> Our contributors and community members have the right to hold us accountable for upholding these values.</span></li>
                            </ul>
                            <p className="text-lux-muted leading-relaxed">
                                When we make mistakes, we will acknowledge them, explain what went wrong, and share what we learned. We are a learning project built by students, and we believe that transparency and accountability are how trust is built.
                            </p>
                        </div>

                        <div id="contact" className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl scroll-mt-32 transition-all duration-500">
                            <h2 className="font-serif text-3xl text-lux-text mb-6">Raise a Concern</h2>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                If you witness or suspect a violation of this ethics charter, or if you have concerns about how KaizenStat is being built or used, we want to hear from you. We commit to responding to all good-faith concerns thoughtfully and taking corrective action where needed.
                            </p>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                <strong>Report an Issue:</strong>
                            </p>
                            <ul className="space-y-2 text-lux-muted mb-4">
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Ethics &amp; Conduct:</strong> founders@kaizenstat.com</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Security Vulnerability:</strong> founders@kaizenstat.com (subject: "Security Report")</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Technical Issue:</strong> github.com/kaizenstat-python/KaizenStat/issues</span></li>
                                <li className="flex gap-3"><ChevronRight className="w-4 h-4 mt-1 text-lux-text/20 shrink-0" /> <span><strong>Postal Mail:</strong> Park Street, Kolkata, WB 700016, India</span></li>
                            </ul>
                            <p className="text-lux-muted leading-relaxed mb-4">
                                <strong>Confidentiality:</strong> Security reports and ethics concerns sent to founders@kaizenstat.com will be treated confidentially. We will not publicly disclose the reporter's identity without permission.
                            </p>
                            <div className="p-4 rounded-lg bg-lux-glass/30 border border-lux-glassBorder">
                                <p className="text-xs text-lux-muted mb-2">
                                    <strong>Last Updated:</strong> June 13, 2026
                                </p>
                                <p className="text-xs text-lux-muted">
                                    This ethics charter reflects our commitment to building machine learning tools that are transparent, fair, and beneficial to the global community. We believe technology serves people, not the reverse.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
