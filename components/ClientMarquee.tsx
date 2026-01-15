import React from 'react';

const CLIENTS = [
  "VENTURA CAPITAL", "APEX FITNESS", "NEBULA SAAS", "SOLARIS TECH", "KINETIC", "LUXE RETAIL", "ARTEMIS AI", "ONYX & CO", "CIPHER LOGIC", "VELVET & VINE"
];

export const ClientMarquee: React.FC = () => {
  return (
    <section className="w-full relative z-20 py-8">
      {/* Floating Glass Strip */}
      <div className="max-w-[1400px] mx-auto bg-white/30 backdrop-blur-xl border border-white/40 rounded-full overflow-hidden shadow-sm">
        <div className="flex flex-col md:flex-row items-stretch">

          <div className="w-full md:w-64 bg-white/10 flex items-center justify-center md:justify-start px-8 py-4 md:py-0 border-b md:border-b-0 md:border-r border-white/20 z-10 relative">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-lux-text/80">
              DEDICATION, CONSISTENCY, DISCIPLINE
            </span>
          </div>

          <div className="flex-1 relative overflow-hidden py-8">
            <div className="absolute left-0 top-0 h-full w-12 md:w-32 bg-gradient-to-r from-white/20 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 h-full w-12 md:w-32 bg-gradient-to-l from-white/20 to-transparent z-10 pointer-events-none" />

            <div className="flex w-max animate-marquee-horizontal hover:[animation-play-state:paused] items-center">
              <div className="flex items-center">
                {CLIENTS.map((client, i) => (
                  <div key={`a-${i}`} className="flex items-center px-12 md:px-16 group cursor-default opacity-60 hover:opacity-100 transition-opacity duration-500">
                    <span className="text-xl md:text-2xl font-serif text-lux-text tracking-tight group-hover:scale-105 transition-transform duration-500 block">
                      {client}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center">
                {CLIENTS.map((client, i) => (
                  <div key={`b-${i}`} className="flex items-center px-12 md:px-16 group cursor-default opacity-60 hover:opacity-100 transition-opacity duration-500">
                    <span className="text-xl md:text-2xl font-serif text-lux-text tracking-tight group-hover:scale-105 transition-transform duration-500 block">
                      {client}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};