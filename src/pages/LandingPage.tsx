import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar }               from '../components/sections/Navbar';
import { Footer }               from '../components/sections/Footer';
import { Hero }                 from '../components/sections/Hero';
import { KaizenQuickStart }     from '../components/sections/kaizen/KaizenQuickStart';
import { KaizenColabPreview }   from '../components/sections/kaizen/KaizenColabPreview';
import { KaizenFeatures }       from '../components/sections/kaizen/KaizenFeatures';
import { KaizenStickyScroll }   from '../components/sections/kaizen/KaizenStickyScroll';
import { KaizenFailures }       from '../components/sections/kaizen/KaizenFailures';
import { KaizenTestimonials }    from '../components/sections/kaizen/KaizenTestimonials';
import { KaizenProductionBadge } from '../components/sections/kaizen/KaizenProductionBadge';
import { KaizenTrustScore }     from '../components/sections/kaizen/KaizenTrustScore';
import { KaizenAudience }       from '../components/sections/kaizen/KaizenAudience';
import { KaizenComparison }     from '../components/sections/kaizen/KaizenComparison';
import { KaizenVsSklearn }      from '../components/sections/kaizen/KaizenVsSklearn';
import { KaizenEcosystem }      from '../components/sections/kaizen/KaizenEcosystem';
import { KaizenParity }         from '../components/sections/kaizen/KaizenParity';
import { KaizenReports }        from '../components/sections/kaizen/KaizenReports';
import { KaizenTrustStats }     from '../components/sections/kaizen/KaizenTrustStats';
import { KaizenFAQ }            from '../components/sections/kaizen/KaizenFAQ';
import { KaizenCTA }            from '../components/sections/kaizen/KaizenCTA';

function SectionDivider({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="relative flex items-center justify-center py-10 px-4">
      <div className="absolute inset-x-0 top-1/2 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)' }} />
      <div className="relative flex items-center gap-3 px-7 py-3 rounded-full border border-white/[0.12] bg-[#0a0a0a] backdrop-blur-sm">
        <span className="text-base font-semibold tracking-wide text-white">{label}</span>
        <span className="w-px h-4 bg-white/20" />
        <span className="text-sm text-white/50">{sub}</span>
      </div>
    </div>
  );
}

export function LandingPage() {
  // scrolled: navbar hidden, badge expanded
  // scrollingUp: navbar briefly visible again
  const [navHidden, setNavHidden] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > lastY.current && y > 60) {
          // scrolling down — hide navbar
          setNavHidden(true);
        } else if (y < lastY.current) {
          // scrolling up — show navbar
          setNavHidden(false);
        }
        lastY.current = y;
        ticking.current = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Navbar slides up on scroll down, returns on scroll up */}
      <motion.div
        animate={{ y: navHidden ? -80 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <Navbar />
      </motion.div>

      {/* Badge bar — rises from below navbar to fill its spot when navbar hides */}
      <motion.div
        animate={{ y: navHidden ? 0 : -50, opacity: navHidden ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-center px-6 lg:px-12 backdrop-blur-xl bg-black/50 border-b border-white/[0.05]"
        style={{ height: 70, pointerEvents: navHidden ? 'auto' : 'none' }}
      >
        <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-white/50">
          Next-Gen Python Framework
        </span>
      </motion.div>

      {/* Static badge below navbar when not scrolled */}
      <div className="fixed top-[70px] left-0 right-0 z-30 flex items-center justify-center py-3"
        style={{ pointerEvents: 'none' }}>
        <motion.span
          animate={{ opacity: navHidden ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[9px] font-mono uppercase tracking-widest text-white/40">
          Next-Gen Python Framework
        </motion.span>
      </div>

      <main className="pt-[120px]">
        <Hero />
        <KaizenQuickStart />
        <KaizenColabPreview />
        <KaizenFeatures />

        <SectionDivider label="Start here" sub="Get running in under 2 minutes" />

        <KaizenStickyScroll />
        <KaizenFailures />
        <KaizenTestimonials />
        <KaizenProductionBadge />
        <KaizenTrustScore />

        <SectionDivider label="Go deeper" sub="For teams shipping to production" />

        <KaizenAudience />
        <KaizenComparison />
        <KaizenVsSklearn />
        <KaizenEcosystem />
        <KaizenParity />
        <KaizenReports />
        <KaizenTrustStats />
        <KaizenFAQ />
        <KaizenCTA />
      </main>
      <Footer />
    </>
  );
}
