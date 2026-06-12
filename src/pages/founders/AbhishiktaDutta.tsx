import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updateMetaTags } from '../../utils/seo';

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': 'https://www.kaizenstat.com/abhishikta-dutta#page',
      'name': 'Abhishikta Dutta — Co-Founder of KaizenStat',
      'url': 'https://www.kaizenstat.com/abhishikta-dutta',
      'description': 'Abhishikta Dutta is an ML Engineer, Researcher, and co-founder of KaizenStat, an open-source Python machine learning library.',
      'mainEntity': { '@id': 'https://www.kaizenstat.com/abhishikta-dutta#person' },
      'about': { '@id': 'https://www.kaizenstat.com/abhishikta-dutta#person' },
    },
    {
      '@type': 'Person',
      '@id': 'https://www.kaizenstat.com/abhishikta-dutta#person',
      'name': 'Abhishikta Dutta',
      'givenName': 'Abhishikta',
      'familyName': 'Dutta',
      'alternateName': [
        'Abhishikta Dutta KaizenStat',
        'Abhishikta Dutta ML Engineer',
        'Abhishikta Dutta Researcher',
        'Abhishikta Dutta Co-Founder',
      ],
      'jobTitle': 'ML Engineer and Researcher, Co-Founder',
      'description': 'Abhishikta Dutta is an ML Engineer and Researcher and co-founder of KaizenStat, an open-source Python machine learning library. She builds Python-based ML pipelines and production systems at KaizenStat, translating research into tools that learn, adapt, and scale. Abhishikta Dutta co-founded KaizenStat in 2024 with Masuddar Rahaman and Kriti Sharma.',
      'url': 'https://www.kaizenstat.com/abhishikta-dutta',
      'image': 'https://github.com/abhishiktadutta.png',
      'sameAs': [
        'https://github.com/abhishiktadutta',
        'https://www.linkedin.com/in/abhishikta-dutta1',
        'https://www.kaizenstat.com/founder-connect',
        'https://www.kaizenstat.com/abhishikta-dutta',
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
        'Python', 'ML Pipelines', 'Model Engineering', 'Production Systems',
        'Deep Learning', 'Machine Learning Research', 'Data Science', 'Open Source Software',
      ],
      'hasOccupation': {
        '@type': 'Occupation',
        'name': 'ML Engineer and Researcher',
        'description': 'Builds ML pipelines and production systems at KaizenStat open-source Python ML library',
        'occupationLocation': { '@type': 'Country', 'name': 'India' },
      },
      'colleague': [
        { '@id': 'https://www.kaizenstat.com/masuddar-rahaman#person' },
        { '@id': 'https://www.kaizenstat.com/kriti-sharma#person' },
      ],
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Who is Abhishikta Dutta?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Abhishikta Dutta is an ML Engineer and Researcher and co-founder of KaizenStat, an open-source Python machine learning library (pip install kaizenstat). She builds Python-based ML pipelines and production systems at KaizenStat. Abhishikta Dutta co-founded KaizenStat in 2024 with Masuddar Rahaman and Kriti Sharma.',
          },
        },
        {
          '@type': 'Question',
          'name': 'What is Abhishikta Dutta known for?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Abhishikta Dutta is known for co-founding KaizenStat, an open-source Python machine learning library, and serving as its ML Engineer and Researcher. She builds the ML pipelines and production systems that power KaizenStat.',
          },
        },
        {
          '@type': 'Question',
          'name': 'What did Abhishikta Dutta co-found?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Abhishikta Dutta co-founded KaizenStat, an open-source Python machine learning library for AutoML, data health scoring, pipeline debugging, and continuous improvement. KaizenStat is available at https://pypi.org/project/kaizenstat/.',
          },
        },
      ],
    },
  ],
};

export default function AbhishiktaDutta() {
  useEffect(() => {
    updateMetaTags({
      title: 'Abhishikta Dutta — Co-Founder & ML Engineer of KaizenStat | Open Source Python ML Library',
      description: 'Abhishikta Dutta is an ML Engineer and Researcher and co-founder of KaizenStat, an open-source Python machine learning library (pip install kaizenstat). She builds Python ML pipelines and production systems at KaizenStat. Co-founded KaizenStat in 2024 with Masuddar Rahaman and Kriti Sharma.',
      keywords: [
        'abhishikta dutta', 'abhishikta dutta kaizenstat', 'abhishikta dutta co-founder',
        'abhishikta dutta ml engineer', 'abhishikta dutta researcher',
        'abhishikta dutta python', 'abhishikta dutta machine learning',
        'abhishikta dutta open source', 'abhishikta dutta github', 'abhishikta dutta linkedin',
        'who is abhishikta dutta', 'abhishikta dutta kaizenstat founder',
        'kaizenstat abhishikta dutta',
      ],
      canonical: 'https://www.kaizenstat.com/abhishikta-dutta',
      ogType: 'profile',
      ogImage: 'https://github.com/abhishiktadutta.png',
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
            src="https://github.com/abhishiktadutta.png"
            alt="Abhishikta Dutta — Co-Founder of KaizenStat"
            className="w-24 h-24 rounded-full object-cover border border-emerald-500/30"
          />
          <div>
            <h1 className="text-3xl font-bold text-white">Abhishikta Dutta</h1>
            <p className="text-emerald-400 text-sm mt-1">ML Engineer & Researcher — Co-Founder, KaizenStat</p>
          </div>
        </div>

        <div className="space-y-4 text-slate-300 text-base leading-relaxed">
          <p>
            <strong className="text-white">Abhishikta Dutta</strong> is an ML Engineer and Researcher
            and co-founder of{' '}
            <a href="https://www.kaizenstat.com" className="text-emerald-400 hover:underline">KaizenStat</a>,
            an open-source Python machine learning library. She builds Python-based ML pipelines and
            production systems at KaizenStat, translating research into tools that learn, adapt, and scale.
          </p>
          <p>
            Abhishikta Dutta co-founded KaizenStat in 2024 with{' '}
            <Link to="/masuddar-rahaman" className="text-cyan-400 hover:underline">Masuddar Rahaman</Link> and{' '}
            <Link to="/kriti-sharma" className="text-purple-400 hover:underline">Kriti Sharma</Link>.
            She combines hands-on engineering with a research mindset, turning raw data into systems
            that learn, adapt, and scale.
          </p>
          <p>
            KaizenStat is available at{' '}
            <code className="bg-white/10 px-2 py-0.5 rounded text-cyan-300 text-sm">pip install kaizenstat</code>.
            Apache 2.0 licensed. Python 3.8+.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/abhishiktadutta"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors"
          >
            GitHub → abhishiktadutta
          </a>
          <a
            href="https://www.linkedin.com/in/abhishikta-dutta1"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors"
          >
            LinkedIn → Abhishikta Dutta
          </a>
          <Link
            to="/founder-connect"
            className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-sm text-emerald-400 hover:bg-emerald-500/20 transition-colors"
          >
            Meet all KaizenStat Founders →
          </Link>
        </div>

        <div className="pt-4 border-t border-white/5 text-xs text-slate-500">
          Abhishikta Dutta · Co-Founder of KaizenStat · Open Source Python ML Library ·{' '}
          <a href="https://www.kaizenstat.com" className="hover:text-slate-300">kaizenstat.com</a>
        </div>
      </div>
    </div>
  );
}
