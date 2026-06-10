import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Linkedin, Mail, ChevronRight } from 'lucide-react';

export const About: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('');
    const [toc, setToc] = useState<{ id: string; text: string }[]>([]);

    useEffect(() => {
        const sections = [
            { id: 'our-narrative', text: 'Our Narrative' },
            { id: 'our-values', text: 'Our Values' },
            { id: 'journey-so-far', text: 'Journey So Far' },
            { id: 'the-minds', text: 'The Minds Behind' }
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

    const values = [
        {
            title: 'Fresh Perspective',
            description: 'Unburdened by legacy thinking, we bring raw energy and modern tech stacks.'
        },
        {
            title: 'Cross-Functional',
            description: 'Where complex backend logic meets strategic business planning.'
        },
        {
            title: 'Transparent',
            description: 'Clear communication, honest timelines, no corporate jargon.'
        },
        {
            title: 'Ambitious',
            description: 'We are students today, but we are building the industry leaders of tomorrow.'
        }
    ];

    const milestones = [
        { year: '2023', event: 'Team Formation in Campus Dorms' },
        { year: '2024', event: 'Building Individual Portfolios & Skills' },
        { year: '2025', event: 'Winning Campus Hackathons' },
        { year: '2026', event: 'KaizenStat Foundation Official Launch' }
    ];

    return (
        <div className="min-h-screen bg-lux-cream relative overflow-hidden pt-24 md:pt-32">
            
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Sidebar ToC */}
                <aside className="hidden lg:block lg:col-span-3 sticky top-32 space-y-6">
                    <div className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl shadow-sm">
                        <h3 className="font-serif text-lg font-bold text-lux-text mb-6 uppercase tracking-widest text-[10px]">About Us</h3>
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
                <div className="lg:col-span-9 space-y-20 pb-32">
                    
                    {/* STORY & IMAGE */}
                    <section id="our-narrative" className="scroll-mt-32">
                        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                            <div className="relative order-first md:order-last">
                                <div className="aspect-video md:aspect-square rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm relative group">
                                    <div className="absolute inset-0 bg-lux-text/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                    <img
                                        src="/assets/team-new.jpg"
                                        alt="KaizenStat Team"
                                        className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                                    />
                                </div>
                            </div>

                            <div>
                                <h2 className="font-serif text-3xl md:text-4xl text-lux-text mb-6">Our Narrative</h2>
                                <div className="space-y-4 text-lux-muted/90 leading-relaxed text-sm md:text-base font-light">
                                    <p>
                                        We represent the next generation of digital builders. While our peers are waiting for graduation to start, we are starting now.
                                    </p>
                                    <p>
                                        By combining the technical prowess of our founders <strong>Masuddar Rahaman</strong> & <strong>Abhishikta Dutta</strong> with the fresh business acumen of our co-founder <strong>Kriti Sharma</strong>, we offer a unique blend of innovation and strategy.
                                    </p>
                                    <p>
                                        We don't have decades of history, but we have the hunger to prove ourselves with every line of code and every pixel.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* VALUES & TIMELINE GRID */}
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
                        {/* Values */}
                        <section id="our-values" className="scroll-mt-32">
                            <h2 className="font-serif text-3xl text-lux-text mb-6 md:mb-8 text-left">Our Values</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {values.map((value, index) => (
                                    <div key={value.title} className="p-5 rounded-xl border border-lux-text/5 hover:border-lux-text/20 transition-colors bg-white/40 backdrop-blur-sm">
                                        <h4 className="font-bold text-sm text-lux-text mb-2">{value.title}</h4>
                                        <p className="text-xs text-lux-muted leading-relaxed font-light">{value.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Timeline */}
                        <section id="journey-so-far" className="scroll-mt-32">
                            <h2 className="font-serif text-3xl text-lux-text mb-6 md:mb-8 text-left">Journey So Far</h2>
                            <div className="space-y-6 md:pl-8 relative">
                                <div className="absolute left-[1.35rem] top-4 bottom-4 w-px bg-gray-200" />
                                {milestones.map((milestone, index) => (
                                    <div key={index} className="flex gap-4 items-start pl-0 relative z-10">
                                        <div className="px-3 py-1.5 rounded-full border border-lux-text/10 bg-white shadow-sm text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-lux-text">
                                            {milestone.year}
                                        </div>
                                        <div className="pt-2">
                                            <p className="text-sm text-lux-text/80 font-medium">{milestone.event}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* FOUNDERS SECTION */}
                    <section id="the-minds" className="scroll-mt-32">
                        <div className="max-w-6xl mx-auto">
                            <h2 className="inline-block py-2 px-6 border border-lux-text/10 rounded-full text-[11px] md:text-[12px] font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-lux-muted bg-white/50 backdrop-blur-md mb-12">The Minds Behind KaizenStat</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                                <FounderCard 
                                    name="Masuddar Rahaman"
                                    role="Founder | Engineering & Architecture"
                                    image="/team/Masuddar_Rahaman.jpeg"
                                    linkedin="https://www.linkedin.com/in/masuddar-rahaman/"
                                    email="founders@kaizenstat.com"
                                />
                                <FounderCard 
                                    name="Abhishikta Dutta"
                                    role="Founder | Technology & Product"
                                    image="/team/Abhishikta_Dutta_new.jpg"
                                    linkedin="https://www.linkedin.com/in/abhishikta-dutta-99a73838b/"
                                    email="abhishiktadutta397@gmail.com"
                                />
                                <FounderCard 
                                    name="Kriti Sharma"
                                    role="Founder | Operations & Strategy"
                                    image="/team/Kriti_Sharma_new.jpg"
                                    linkedin="https://www.linkedin.com/in/kriti-sharma-795116377/"
                                    email="kritisharma1481550@gmail.com"
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

const FounderCard: React.FC<{ name: string; role: string; image: string; linkedin: string; email: string }> = ({ name, role, image, linkedin, email }) => (
    <div className="bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/60 flex flex-col items-center text-center shadow-sm group hover:border-lux-text/20 transition-all duration-500">
        <div className="w-32 h-32 rounded-2xl overflow-hidden mb-6 border border-lux-text/10 shadow-sm transition-transform duration-500 group-hover:scale-105">
            <img src={image} alt={name} className="w-full h-full object-cover transition-all duration-700" />
        </div>
        <h3 className="font-serif text-2xl text-lux-text mb-1">{name}</h3>
        <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-lux-muted mb-6">{role}</p>
        <div className="flex flex-wrap justify-center gap-3">
            <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-lux-text/5 text-lux-text hover:bg-lux-text hover:text-white transition-all duration-300 font-bold text-[9px] shadow-sm"
            >
                <Linkedin className="w-3 h-3" />
                LinkedIn
            </a>
            <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-lux-text/5 text-lux-text hover:bg-lux-text hover:text-white transition-all duration-300 font-bold text-[9px] shadow-sm"
            >
                <Mail className="w-3 h-3" />
                Email
            </a>
        </div>
    </div>
);
