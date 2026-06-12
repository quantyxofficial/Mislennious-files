import { motion } from 'motion/react';
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
  return (
    <>
      <Navbar />
      <div className="fixed top-[70px] left-0 right-0 z-40 flex items-center justify-center py-4 border-b border-white/[0.05] backdrop-blur-sm bg-black/20">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/[0.05] text-[9px] font-mono uppercase tracking-widest text-white/50">
            Next-Gen Python Framework
          </span>
        </motion.div>
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

