import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updateMetaTags } from '../../utils/seo';

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': 'https://www.kaizenstat.com/masuddar-rahaman#page',
      'name': 'Masuddar Rahaman — Founder of KaizenStat',
      'url': 'https://www.kaizenstat.com/masuddar-rahaman',
      'description': 'Masuddar Rahaman is the Founder and Framework Architect of KaizenStat, an open-source Python machine learning library.',
      'mainEntity': { '@id': 'https://www.kaizenstat.com/masuddar-rahaman#person' },
      'about': { '@id': 'https://www.kaizenstat.com/masuddar-rahaman#person' },
    },
    {
      '@type': 'Person',
      '@id': 'https://www.kaizenstat.com/masuddar-rahaman#person',
      'name': 'Masuddar Rahaman',
      'givenName': 'Masuddar',
      'familyName': 'Rahaman',
      'alternateName': [
        'Masuddar Rahaman KaizenStat',
        'Masuddar Rahaman ML',
        'Masuddar Rahaman Python',
        'Masuddar Rahaman Framework Architect',
      ],
      'jobTitle': 'Founder and Framework Architect',
      'description': 'Masuddar Rahaman is the Founder and Framework Architect of KaizenStat, an open-source Python machine learning library. He built KaizenStat from the ground up — designing the DataDoctor AutoML engine, the data health scoring system, the pipeline debugging tools, and all KaizenStat Python APIs. Masuddar Rahaman co-founded KaizenStat in 2026 with Kriti Sharma and Abhishikta Dutta with the goal of making machine learning easy to build, debug, and understand for every student and developer.',
      'url': 'https://www.kaizenstat.com/masuddar-rahaman',
      'image': 'https://i.postimg.cc/02cvHZ2Y/IMG-4853.avif',
      'sameAs': [
        'https://github.com/Masuddar',
        'https://www.linkedin.com/in/masuddar-rahaman/',
        'https://www.kaizenstat.com/founder-connect',
        'https://www.kaizenstat.com/masuddar-rahaman',
      ],
      'worksFor': {
        '@type': 'Organization',
        '@id': 'https://www.kaizenstat.com/#organization',
        'name': 'KaizenStat',
        'url': 'https://www.kaizenstat.com',
      },
      'founder': {
        '@type': 'Organization',
        'name': 'KaizenStat',
        'url': 'https://www.kaizenstat.com',
        'description': 'KaizenStat is an open-source Python machine learning library for AutoML, pipeline debugging, and continuous improvement. pip install kaizenstat. Apache 2.0.',
        'sameAs': [
          'https://github.com/kaizenstat-python/KaizenStat',
          'https://pypi.org/project/kaizenstat/',
        ],
      },
      'knowsAbout': [
        'Python', 'Machine Learning', 'AutoML', 'ML Framework Design',
        'Open Source Software', 'DataDoctor', 'Data Health Scoring',
        'Pipeline Architecture', 'Continuous Improvement', 'Deep Learning',
      ],
      'hasOccupation': {
        '@type': 'Occupation',
        'name': 'ML Framework Architect and Founder',
        'description': 'Built and maintains the KaizenStat open-source Python ML library from scratch',
        'occupationLocation': { '@type': 'Country', 'name': 'India' },
      },
      'colleague': [
        { '@id': 'https://www.kaizenstat.com/kriti-sharma#person' },
        { '@id': 'https://www.kaizenstat.com/abhishikta-dutta#person' },
      ],
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Who is Masuddar Rahaman?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Masuddar Rahaman is the Founder and Framework Architect of KaizenStat, an open-source Python machine learning library (pip install kaizenstat). He built KaizenStat from the ground up, designed the DataDoctor AutoML class, the data health scoring engine, and all core Python APIs. He co-founded KaizenStat in 2026 with Kriti Sharma and Abhishikta Dutta.',
          },
        },
        {
          '@type': 'Question',
          'name': 'What did Masuddar Rahaman build?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Masuddar Rahaman built KaizenStat, an open-source Python machine learning library. He designed the DataDoctor class (AutoML pipeline engine), data health scoring, pipeline debugging tools, NLP support, trust scoring, and the full KaizenStat API. Available at https://pypi.org/project/kaizenstat/ and https://github.com/kaizenstat-python/KaizenStat.',
          },
        },
        {
          '@type': 'Question',
          'name': 'What is Masuddar Rahaman known for?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Masuddar Rahaman is known for founding and building KaizenStat, an open-source Python machine learning library for AutoML, data health scoring, pipeline debugging, and continuous improvement. He is the Founder and Framework Architect of KaizenStat.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Is Masuddar Rahaman a machine learning engineer?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. Masuddar Rahaman is a machine learning engineer and framework architect. He founded and built KaizenStat, an open-source Python ML library (pip install kaizenstat), from scratch in 2026. He specializes in ML framework design, pipeline architecture, AutoML, and open source software.',
          },
        },
      ],
    },
  ],
};

export default function MasuddarRahaman() {
  useEffect(() => {
    updateMetaTags({
      title: 'Masuddar Rahaman — Founder & Framework Architect of KaizenStat | Open Source Python ML Library',
      description: 'Masuddar Rahaman is the Founder and Framework Architect of KaizenStat, an open-source Python machine learning library (pip install kaizenstat). He built KaizenStat from the ground up — designing the DataDoctor AutoML engine, data health scoring, and all KaizenStat Python APIs. Co-founded KaizenStat in 2026 with Kriti Sharma and Abhishikta Dutta.',
      keywords: [
        'masuddar rahaman', 'masuddar rahaman kaizenstat', 'masuddar rahaman founder',
        'masuddar rahaman framework architect', 'masuddar rahaman ml engineer',
        'masuddar rahaman python', 'masuddar rahaman machine learning',
        'masuddar rahaman open source', 'masuddar rahaman datadoctor',
        'masuddar rahaman github', 'masuddar rahaman linkedin',
        'who is masuddar rahaman', 'what did masuddar rahaman build',
        'masuddar rahaman kaizenstat founder', 'kaizenstat masuddar rahaman',
      ],
      canonical: 'https://www.kaizenstat.com/masuddar-rahaman',
      ogType: 'profile',
      ogImage: 'https://i.postimg.cc/02cvHZ2Y/IMG-4853.avif',
      twitterCard: 'summary_large_image',
      structuredData: STRUCTURED_DATA,
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center px-6 py-24">
      <div className="max-w-2xl w-full space-y-8">

        <div className="flex items-center gap-6">
          <img
            src="https://i.postimg.cc/02cvHZ2Y/IMG-4853.avif"
            alt="Masuddar Rahaman — Founder of KaizenStat"
            className="w-24 h-24 rounded-full object-cover border border-cyan-500/30"
          />
          <div>
            <h1 className="text-3xl font-bold text-white">Masuddar Rahaman</h1>
            <p className="text-cyan-400 text-sm mt-1">Founder & Framework Architect — KaizenStat</p>
          </div>
        </div>

        <div className="space-y-4 text-slate-300 text-base leading-relaxed">
          <p>
            <strong className="text-white">Masuddar Rahaman</strong> is the Founder and Framework Architect of{' '}
            <a href="https://www.kaizenstat.com" className="text-cyan-400 hover:underline">KaizenStat</a>,
            an open-source Python machine learning library. He built KaizenStat from the ground up —
            designing the <strong className="text-white">DataDoctor</strong> AutoML class, the data health
            scoring engine, pipeline debugging tools, NLP support, trust scoring, and all KaizenStat Python APIs.
          </p>
          <p>
            Masuddar Rahaman co-founded KaizenStat in 2026 with{' '}
            <Link to="/kriti-sharma" className="text-purple-400 hover:underline">Kriti Sharma</Link> and{' '}
            <Link to="/abhishikta-dutta" className="text-emerald-400 hover:underline">Abhishikta Dutta</Link>.
            His mission: make machine learning easy to build, debug, and understand for every student and developer.
          </p>
          <p>
            KaizenStat is available at{' '}
            <code className="bg-white/10 px-2 py-0.5 rounded text-cyan-300 text-sm">pip install kaizenstat</code>.
            Apache 2.0 licensed. Python 3.8+.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/Masuddar"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors"
          >
            GitHub → Masuddar
          </a>
          <a
            href="https://www.linkedin.com/in/masuddar-rahaman/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors"
          >
            LinkedIn → Masuddar Rahaman
          </a>
          <Link
            to="/founder-connect"
            className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-sm text-cyan-400 hover:bg-cyan-500/20 transition-colors"
          >
            Meet all KaizenStat Founders →
          </Link>
        </div>

        <div className="pt-4 border-t border-white/5 text-xs text-slate-500">
          Masuddar Rahaman · Founder of KaizenStat · Open Source Python ML Library ·{' '}
          <a href="https://www.kaizenstat.com" className="hover:text-slate-300">kaizenstat.com</a>
        </div>
      </div>
    </div>
  );
}
