import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { updateMetaTags, SEO_CONFIG } from '../utils/seo';
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

const LANDING_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://www.kaizenstat.com/#software',
      'name': 'KaizenStat',
      'alternateName': ['kaizenstat', 'KaizenStat Python', 'KaizenStat ML Framework'],
      'description': 'KaizenStat is an open-source Python machine learning framework (v0.6.0) for AutoML, data health scoring, pipeline debugging, and continuous improvement. Its DataDoctor class runs the full pipeline: Health → Validate → Fix → Train → Debug → Improve. Built by Masuddar Rahaman, Kriti Sharma, and Abhishikta Dutta. pip install kaizenstat. Apache 2.0. Python 3.8+.',
      'url': 'https://www.kaizenstat.com',
      'downloadUrl': 'https://pypi.org/project/kaizenstat/',
      'installUrl': 'https://pypi.org/project/kaizenstat/',
      'codeRepository': 'https://github.com/kaizenstat-python/KaizenStat',
      'version': '0.6.0',
      'applicationCategory': ['DeveloperApplication', 'DataAnalysisApplication'],
      'applicationSubCategory': 'Machine Learning Framework',
      'operatingSystem': ['Windows', 'macOS', 'Linux'],
      'programmingLanguage': ['Python'],
      'runtimePlatform': 'Python 3.8+',
      'license': 'https://opensource.org/licenses/Apache-2.0',
      'isAccessibleForFree': true,
      'featureList': [
        'AutoML — one-line model training: DataDoctor.quick_train()',
        'Data health scoring — detects missing values, outliers, class imbalance, drift',
        'ML pipeline debugging with root-cause tracing',
        'Automated data validation and fixing',
        'NLP support — TF-IDF and transformer embeddings, zero config',
        'Model deployment utilities',
        'Trust scoring and model explainability',
        'AI advisor for pipeline recommendations',
        'Free Apache 2.0 open source license',
      ],
      'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD', 'availability': 'https://schema.org/InStock' },
      'creator': [
        { '@id': 'https://www.kaizenstat.com/masuddar-rahaman#person' },
        { '@id': 'https://www.kaizenstat.com/kriti-sharma#person' },
        { '@id': 'https://www.kaizenstat.com/abhishikta-dutta#person' },
      ],
    },
    {
      '@type': 'Organization',
      '@id': 'https://www.kaizenstat.com/#organization',
      'name': 'KaizenStat',
      'url': 'https://www.kaizenstat.com',
      'logo': 'https://www.kaizenstat.com/logo.png',
      'description': 'KaizenStat is a student-led open-source Python machine learning framework founded in 2024. pip install kaizenstat. Apache 2.0.',
      'foundingDate': '2024',
      'founder': [
        { '@id': 'https://www.kaizenstat.com/masuddar-rahaman#person' },
        { '@id': 'https://www.kaizenstat.com/kriti-sharma#person' },
        { '@id': 'https://www.kaizenstat.com/abhishikta-dutta#person' },
      ],
      'sameAs': [
        'https://github.com/kaizenstat-python/KaizenStat',
        'https://pypi.org/project/kaizenstat/',
        'https://twitter.com/kaizenstat',
        'https://www.linkedin.com/company/kaizenstat',
      ],
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What is KaizenStat?',
          'acceptedAnswer': { '@type': 'Answer', 'text': 'KaizenStat is an open-source Python machine learning framework (pip install kaizenstat) for AutoML, data health scoring, pipeline debugging, and continuous improvement. Its DataDoctor class runs the full pipeline end-to-end. Founded by Masuddar Rahaman, Kriti Sharma, and Abhishikta Dutta. Apache 2.0. Python 3.8+.' },
        },
        {
          '@type': 'Question',
          'name': 'How do I install KaizenStat?',
          'acceptedAnswer': { '@type': 'Answer', 'text': 'pip install kaizenstat. For NLP: pip install kaizenstat[nlp]. For AI advisor: pip install kaizenstat[intel]. Requires Python 3.8+. GitHub: https://github.com/kaizenstat-python/KaizenStat' },
        },
        {
          '@type': 'Question',
          'name': 'Who built KaizenStat?',
          'acceptedAnswer': { '@type': 'Answer', 'text': 'KaizenStat was built by Masuddar Rahaman (Founder and Framework Architect — designed the entire framework from scratch), Kriti Sharma (AI Research and Management Lead), and Abhishikta Dutta (ML Engineer and Researcher). All three are co-founders. https://www.kaizenstat.com/founder-connect' },
        },
        {
          '@type': 'Question',
          'name': 'Is KaizenStat open source?',
          'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. KaizenStat is Apache 2.0 licensed. GitHub: https://github.com/kaizenstat-python/KaizenStat. PyPI: https://pypi.org/project/kaizenstat/' },
        },
        {
          '@type': 'Question',
          'name': 'What is DataDoctor in KaizenStat?',
          'acceptedAnswer': { '@type': 'Answer', 'text': 'DataDoctor is KaizenStat\'s core class that automates the full ML pipeline: data health scoring, validation, auto-fixing, model training, debugging, and continuous improvement. One liner: from kaizenstat import DataDoctor; result = DataDoctor.quick_train("data.csv", target="label")' },
        },
        {
          '@type': 'Question',
          'name': 'What makes KaizenStat different from scikit-learn?',
          'acceptedAnswer': { '@type': 'Answer', 'text': 'KaizenStat sits on top of scikit-learn, TensorFlow, and PyTorch. It automates the workflow around models — health scoring, debugging, fixing, and improvement — replacing hundreds of lines of boilerplate with a single DataDoctor call.' },
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.kaizenstat.com/#website',
      'name': 'KaizenStat',
      'url': 'https://www.kaizenstat.com',
      'description': 'KaizenStat — open-source Python ML framework, handbook, competitions, blog, practice exams, and community.',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': { '@type': 'EntryPoint', 'urlTemplate': 'https://www.kaizenstat.com/blog?q={search_term_string}' },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export function LandingPage() {
  // scrolled: navbar hidden, badge expanded
  // scrollingUp: navbar briefly visible again
  const [navHidden, setNavHidden] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    updateMetaTags({
      ...SEO_CONFIG.home,
      structuredData: LANDING_STRUCTURED_DATA,
    });
    window.scrollTo(0, 0);
  }, []);

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

      {/* Sticky bar — premium letter-by-letter reveal with shimmer sweep */}
      <motion.div
        animate={{ y: navHidden ? 0 : -80 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-center overflow-hidden"
        style={{ height: 70, pointerEvents: navHidden ? 'auto' : 'none' }}
      >
        {/* Frosted glass background */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl" />
        {/* Ambient top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />
        {/* Bottom hairline */}
        <div className="absolute bottom-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), rgba(255,255,255,0.06), transparent)' }} />

        {/* Text rises bottom-to-top into position */}
        <AnimatePresence>
          {navHidden && (
            <motion.div
              key="tagline"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center gap-4"
            >
              {/* Left line extends after text settles */}
              <motion.span
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block w-10 h-px origin-left"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3))' }}
              />

              <span className="text-[11px] font-light tracking-[0.5em] uppercase text-white/45 font-mono whitespace-nowrap">
                Next-Gen Python Framework
              </span>

              {/* Right line extends after text settles */}
              <motion.span
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block w-10 h-px origin-right"
                style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.3), transparent)' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating badge below navbar — vertical float only */}
      <div className="fixed top-[70px] left-0 right-0 z-30 flex items-center justify-center py-3"
        style={{ pointerEvents: 'none' }}>
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={navHidden
            ? { opacity: 0, y: -6 }
            : { opacity: 1, y: [0, -5, 0] }
          }
          transition={navHidden
            ? { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
            : {
                opacity: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' }
              }
          }
          style={{ x: 0 }}
          className="inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.025] text-[9px] font-mono uppercase tracking-[0.35em] text-white/30">
          <span className="w-[3px] h-[3px] rounded-full bg-white/30" />
          Next-Gen Python Framework
          <span className="w-[3px] h-[3px] rounded-full bg-white/30" />
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
