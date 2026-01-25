import { motion } from 'framer-motion';
import { Users, Linkedin, Mail } from 'lucide-react';

export const About: React.FC = () => {
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
        { year: '2026', event: 'KaizenStat Agency Official Launch' }
    ];

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* STORY & IMAGE - Side by Side but tight */}
            <section className="px-6 md:px-12 lg:px-24 pt-24 md:pt-32 pb-16 bg-lux-stone/30">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Image First on Mobile for better engagement */}
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
                        <div className="space-y-4 text-lux-muted/90 leading-relaxed text-sm md:text-base">
                            <p>
                                We represent the next generation of digital builders. While our peers are waiting for graduation to start, we are starting now.
                            </p>
                            <p>
                                By combining the technical prowess of our founder **Abhishikta Dutta** (3rd-year Engineering) with the fresh business acumen of our co-founder **Kriti Sharma** (1st-year Management), we offer a unique blend of innovation and strategy.
                            </p>
                            <p>
                                We don't have decades of history, but we have the hunger to prove ourselves with every line of code and every pixel.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* VALUES & TIMELINE GRID */}
            <section className="px-6 md:px-12 lg:px-24 py-12 md:py-20">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Values */}
                    <div>
                        <h2 className="font-serif text-3xl text-lux-text mb-6 md:mb-8 text-left">Our Values</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {values.map((value, index) => (
                                <div key={value.title} className="p-5 rounded-xl border border-lux-text/5 hover:border-lux-text/20 transition-colors bg-lux-cream">
                                    <h4 className="font-bold text-sm text-lux-text mb-2">{value.title}</h4>
                                    <p className="text-xs text-lux-muted leading-relaxed">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div>
                        <h2 className="font-serif text-3xl text-lux-text mb-6 md:mb-8 text-left mt-8 lg:mt-0">Journey So Far</h2>
                        <div className="space-y-6 md:pl-8 lg:border-l border-gray-100 relative">
                            {/* Mobile Vertical Line */}
                            <div className="absolute left-[1.35rem] top-4 bottom-4 w-px bg-gray-100 md:hidden" />
                            {milestones.map((milestone, index) => (
                                <div key={index} className="flex gap-4 items-start pl-0 relative z-10">
                                    <div className="w-11 h-11 shrink-0 rounded-full bg-lux-cream border border-lux-text/10 text-lux-text flex items-center justify-center font-serif text-[10px] font-bold shadow-sm">
                                        {milestone.year}
                                    </div>
                                    <div className="pt-2">
                                        <p className="text-sm text-lux-text/80 font-medium">{milestone.event}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FOUNDERS SECTION */}
            <section className="px-6 md:px-12 lg:px-24 py-16 bg-lux-stone/20">
                <div className="max-w-5xl mx-auto">
                    <h2 className="font-serif text-3xl md:text-4xl text-lux-text mb-12 text-center text-lux-text/60 uppercase tracking-widest text-sm font-bold">The Minds Behind KaizenStat</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/60 flex flex-col items-center text-center shadow-lg group">
                            <div className="w-32 h-32 rounded-2xl overflow-hidden mb-6 border border-lux-text/10 shadow-sm transition-transform duration-500 hover:scale-105">
                                <img src="/team/Abhishikta_Dutta_new.jpg" alt="Abhishikta Dutta" className="w-full h-full object-cover transition-all duration-700" />
                            </div>
                            <h3 className="font-serif text-3xl text-lux-text mb-1">Abhishikta Dutta</h3>
                            <p className="text-xs uppercase tracking-[0.2em] font-bold text-lux-muted mb-6">Founder | Technology & Product</p>
                            <div className="flex flex-wrap justify-center gap-3">
                                <a
                                    href="https://www.linkedin.com/in/abhishikta-dutta-99a73838b/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/50 border border-lux-text/10 text-lux-text hover:bg-lux-text hover:text-white transition-all duration-300 font-medium text-[10px] shadow-sm"
                                >
                                    <Linkedin className="w-3.5 h-3.5" />
                                    LinkedIn
                                </a>
                                <a
                                    href="mailto:abhishiktadutta397@gmail.com"
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/50 border border-lux-text/10 text-lux-text hover:bg-lux-text hover:text-white transition-all duration-300 font-medium text-[10px] shadow-sm"
                                >
                                    <Mail className="w-3.5 h-3.5" />
                                    Email
                                </a>
                            </div>
                        </div>
                        <div className="bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/60 flex flex-col items-center text-center shadow-lg group">
                            <div className="w-32 h-32 rounded-2xl overflow-hidden mb-6 border border-lux-text/10 shadow-sm transition-transform duration-500 hover:scale-105">
                                <img src="/team/Kriti_Sharma_new.jpg" alt="Kriti Sharma" className="w-full h-full object-cover transition-all duration-700" />
                            </div>
                            <h3 className="font-serif text-3xl text-lux-text mb-1">Kriti Sharma</h3>
                            <p className="text-xs uppercase tracking-[0.2em] font-bold text-lux-muted mb-6">Founder | Operations & Strategy</p>
                            <div className="flex flex-wrap justify-center gap-3">
                                <a
                                    href="https://www.linkedin.com/in/kriti-sharma-795116377/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/50 border border-lux-text/10 text-lux-text hover:bg-lux-text hover:text-white transition-all duration-300 font-medium text-[10px] shadow-sm"
                                >
                                    <Linkedin className="w-3.5 h-3.5" />
                                    LinkedIn
                                </a>
                                <a
                                    href="mailto:kritisharma1481550@gmail.com"
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/50 border border-lux-text/10 text-lux-text hover:bg-lux-text hover:text-white transition-all duration-300 font-medium text-[10px] shadow-sm"
                                >
                                    <Mail className="w-3.5 h-3.5" />
                                    Email
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
