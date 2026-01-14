import { SERVICES } from '../constants';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Services: React.FC = () => {
  return (
    <section id="expertise" className="pt-24 md:pt-48 pb-24 md:pb-40 px-6 lg:px-24 relative overflow-hidden">

      {/* Smooth Organic Curve Divider */}
      <div className="absolute top-0 left-0 w-full rotate-180 leading-0 z-0 opacity-40 mix-blend-overlay pointer-events-none">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[120px] fill-white/50">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <h2 className="font-serif text-5xl md:text-7xl text-lux-text mb-6">Our Expertise</h2>
            <div className="h-1 w-24 bg-lux-text/20 rounded-full overflow-hidden">
              <div className="h-full w-full bg-lux-text animate-pulse" />
            </div>
          </div>
          <p className="text-lux-muted max-w-md text-lg leading-relaxed mix-blend-multiply">
            Delivered by our professional team of experts—we provide the architectural blueprint for market dominance.
          </p>
        </div>

        {/* 
            GRID LAYOUT UPDATE:
            - lg:grid-flow-dense: This is the magic. It fills empty gaps in the grid.
            - We have 12 columns total.
            - Web (4) + Data (4) + Ads (4) = 12 (Row 1 filled)
            - AI (8) + Design (4) = 12 (Row 2 filled)
            Total rows: 2.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 lg:grid-flow-dense">
          {SERVICES.map((service, index) => {
            const isAI = service.id === 'ai'; // 'ai' no longer exists but keeping logic safe

            return (
              <Link to={`/study/${service.id}`} key={service.id} className="contents">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
                  className={`group relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/40 backdrop-blur-lg shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:bg-white/60 transition-all duration-500 will-change-transform cursor-pointer
                    ${isAI
                      ? 'lg:col-span-8 md:col-span-2 min-h-[360px] flex flex-col justify-center p-8 md:p-10 lg:p-14'
                      : 'lg:col-span-6 md:col-span-1 p-8 md:p-10 flex flex-col justify-between min-h-[300px] md:min-h-[360px]'
                    }
                `}
                  data-hover
                >
                  {/* Background Decor - Reduced complexity for performance */}
                  <div className={`absolute top-0 right-0 rounded-full blur-[30px] transition-transform duration-700 pointer-events-none 
                    ${isAI ? 'w-[400px] h-[400px] bg-gradient-to-br from-purple-100/50 to-blue-100/50 -translate-y-1/2 translate-x-1/4' : 'w-48 h-48 bg-gradient-to-br from-white/60 to-transparent translate-x-12 -translate-y-12 group-hover:scale-110'}
                `} />

                  {isAI && (
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                      {/* Subtle animated mesh for AI card */}
                      <div className="absolute top-1/2 left-0 w-full h-full bg-gradient-to-t from-indigo-50/30 to-transparent" />
                      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-200/20 rounded-full blur-[40px]" />
                    </div>
                  )}

                  {/* Content Container */}
                  <div className={`relative z-10 w-full h-full ${isAI ? 'flex flex-col lg:flex-row items-center gap-10 lg:gap-16' : 'flex flex-col justify-between'}`}>

                    {/* Icon Section */}
                    <div className={`shrink-0 ${isAI ? '' : 'mb-6'}`}>
                      <div className={`
                            flex items-center justify-center rounded-2xl border border-white/50 shadow-sm transition-all duration-500 group-hover:bg-lux-text group-hover:border-lux-text
                            ${isAI ? 'w-20 h-20 lg:w-24 lg:h-24 bg-white/60' : 'w-14 h-14 bg-white/80'}
                        `}>
                        <service.icon className={`transition-colors duration-500 group-hover:text-white text-lux-text ${isAI ? 'w-8 h-8 lg:w-10 lg:h-10' : 'w-6 h-6'}`} />
                      </div>
                    </div>

                    {/* Text Section */}
                    <div className={`flex-1 ${isAI ? 'text-center lg:text-left' : ''}`}>
                      <h3 className={`font-serif text-lux-text transition-transform duration-300 group-hover:translate-x-1 ${isAI ? 'text-3xl lg:text-4xl mb-4' : 'text-2xl mb-3'}`}>
                        {service.title}
                      </h3>

                      <p className={`text-lux-text/70 leading-relaxed font-medium transition-colors duration-300 group-hover:text-lux-text/90 ${isAI ? 'text-lg max-w-xl' : 'text-sm'}`}>
                        {service.description}
                      </p>

                      {/* Extra Chips for AI Card - Horizontal Layout */}
                      {isAI && (
                        <div className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start">
                          {['Generative AI', 'Predictive Modeling', 'Automation'].map((tag) => (
                            <span key={tag} className="px-3 py-1 rounded-full border border-lux-text/5 bg-white/50 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-lux-text/60">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Arrow Button for AI Card */}
                    {isAI && (
                      <div className="hidden lg:flex shrink-0 self-center">
                        <div className="w-14 h-14 rounded-full border border-lux-text/10 flex items-center justify-center bg-white/40 backdrop-blur-md group-hover:bg-lux-text group-hover:border-lux-text transition-all duration-500 shadow-sm">
                          <span className="text-xl text-lux-text group-hover:text-white transition-colors">→</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Standard Arrow (Bottom Right) for non-AI cards */}
                  {!isAI && (
                    <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                      <div className="w-8 h-8 rounded-full border border-lux-text/20 flex items-center justify-center bg-white/50 backdrop-blur-sm">
                        <span className="text-lux-text text-lg">→</span>
                      </div>
                    </div>
                  )}

                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
