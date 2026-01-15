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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6">
          {SERVICES.map((service, index) => {
            // First 4 items = Row 1 (3 cols each), Next 3 items = Row 2 (4 cols each)
            const colSpan = index < 4 ? 'lg:col-span-3' : 'lg:col-span-4';

            return (
              <Link to={`/services/${service.id}`} key={service.id} className={`${colSpan} md:col-span-1`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.05, duration: 0.6 }}
                  className={`group relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/40 backdrop-blur-lg shadow-sm hover:shadow-lg hover:bg-white/60 transition-all duration-300 cursor-pointer flex flex-col justify-between p-6 min-h-[200px]`}
                  data-hover
                >
                  {/* Background Decor */}
                  <div className={`absolute -right-4 -top-4 w-32 h-32 bg-gradient-to-br from-white/60 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none`} />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white/60 border border-white/50 flex items-center justify-center text-lux-text shadow-sm group-hover:bg-lux-text group-hover:text-white transition-colors duration-300">
                        <service.icon className="w-5 h-5" />
                      </div>
                      <span className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-lux-text text-xl">→</span>
                    </div>

                    <div>
                      <h3 className="font-serif text-xl text-lux-text mb-2 leading-tight group-hover:translate-x-1 transition-transform">{service.title}</h3>
                      <p className="text-xs text-lux-text/60 leading-relaxed line-clamp-2">{service.description}</p>
                    </div>
                  </div>

                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
