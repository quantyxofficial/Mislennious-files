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
      <main className="pt-[80px]">
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

