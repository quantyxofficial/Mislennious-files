import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const SECTIONS = [
  { id: 'hero', label: 'Top' },
  { id: 'metrics', label: 'Impact' },
  { id: 'flow', label: 'Workflow' },
  { id: 'tracks', label: 'Tracks' },
  { id: 'joinus', label: 'Roles' },
  { id: 'projects', label: 'Projects' },
  { id: 'rewards', label: 'Rewards' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'team', label: 'Team' },
  { id: 'events', label: 'Events' },
  { id: 'network', label: 'Network' },
  { id: 'sponsors', label: 'Partners' },
  { id: 'footer', label: 'Footer' },
];

export function SectionNavigator() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3; // Trigger at 1/3rd of viewport

      let current = 'hero';
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const element = document.getElementById(SECTIONS[i].id);
        if (element && scrollPosition >= element.offsetTop) {
          current = SECTIONS[i].id;
          break;
        }
      }
      
      if (current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = id === 'hero' ? 0 : 80; // Small offset for navbar
      const y = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-1">
      {SECTIONS.map(({ id, label }) => {
        const isActive = activeSection === id;
        return (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className="group flex items-center justify-end gap-4 p-1.5 cursor-pointer w-40"
          >
            <span 
              className={`text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${
                isActive ? 'text-cyan-400 opacity-100 translate-x-0' : 'text-slate-500 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white'
              }`}
            >
              {label}
            </span>
            <div className="w-5 h-5 flex items-center justify-center shrink-0">
              <div 
                className={`rounded-full transition-all duration-300 ${
                  isActive ? 'w-3 h-3 bg-cyan-400 shadow-[0_0_15px_#22d3ee]' : 'w-1.5 h-1.5 bg-white/40 group-hover:w-2 group-hover:h-2 group-hover:bg-white/90'
                }`}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
