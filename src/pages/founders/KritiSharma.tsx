import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updateMetaTags } from '../../utils/seo';

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': 'https://www.kaizenstat.com/kriti-sharma#page',
      'name': 'Kriti Sharma — Co-Founder of KaizenStat',
      'url': 'https://www.kaizenstat.com/kriti-sharma',
      'description': 'Kriti Sharma is the AI Research and Management Lead and co-founder of KaizenStat, an open-source Python machine learning library.',
      'mainEntity': { '@id': 'https://www.kaizenstat.com/kriti-sharma#person' },
      'about': { '@id': 'https://www.kaizenstat.com/kriti-sharma#person' },
    },
    {
      '@type': 'Person',
      '@id': 'https://www.kaizenstat.com/kriti-sharma#person',
      'name': 'Kriti Sharma',
      'givenName': 'Kriti',
      'familyName': 'Sharma',
      'alternateName': [
        'Kriti Sharma KaizenStat',
        'Kriti Sharma AI Research',
        'Kriti Sharma Management Lead',
        'Kriti Sharma Co-Founder',
      ],
      'jobTitle': 'AI Research and Management Lead, Co-Founder',
      'description': 'Kriti Sharma is the AI Research and Management Lead and co-founder of KaizenStat, an open-source Python machine learning library. She drives AI market intelligence, oversees the KaizenStat research roadmap, manages day-to-day operations, and actively implements AI alongside the team. Kriti Sharma co-founded KaizenStat in 2026 with Masuddar Rahaman and Abhishikta Dutta.',
      'url': 'https://www.kaizenstat.com/kriti-sharma',
      'image': 'https://i.postimg.cc/mZ9PZg1k/IMG-3848.avif',
      'sameAs': [
        'https://github.com/kriti-sharma-ai',
        'https://www.linkedin.com/in/kriti-sharma-795116377/',
        'https://www.kaizenstat.com/founder-connect',
        'https://www.kaizenstat.com/kriti-sharma',
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
        'AI Research', 'Operations Management', 'Market Intelligence',
        'Research Strategy', 'Machine Learning', 'Community Management',
        'Open Source Software', 'Data Science',
      ],
      'hasOccupation': {
        '@type': 'Occupation',
        'name': 'AI Research and Management Lead',
        'description': 'Leads AI research, operations, and community at KaizenStat open-source Python ML library',
        'occupationLocation': { '@type': 'Country', 'name': 'India' },
      },
      'colleague': [
        { '@id': 'https://www.kaizenstat.com/masuddar-rahaman#person' },
        { '@id': 'https://www.kaizenstat.com/abhishikta-dutta#person' },
      ],
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Who is Kriti Sharma?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Kriti Sharma is the AI Research and Management Lead and co-founder of KaizenStat, an open-source Python machine learning library (pip install kaizenstat). She drives AI market intelligence, oversees the research roadmap, manages operations, and actively implements AI with the team. Kriti Sharma co-founded KaizenStat in 2026 with Masuddar Rahaman and Abhishikta Dutta.',
          },
        },
        {
          '@type': 'Question',
          'name': 'What is Kriti Sharma known for?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Kriti Sharma is known for co-founding KaizenStat, an open-source Python machine learning library, and serving as its AI Research and Management Lead. She leads the research roadmap, operations, and community growth at KaizenStat.',
          },
        },
        {
          '@type': 'Question',
          'name': 'What did Kriti Sharma co-found?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Kriti Sharma co-founded KaizenStat, an open-source Python machine learning library for AutoML, data health scoring, pipeline debugging, and continuous improvement. KaizenStat is available at https://pypi.org/project/kaizenstat/.',
          },
        },
      ],
    },
  ],
};

export default function KritiSharma() {
  useEffect(() => {
    updateMetaTags({
      title: 'Kriti Sharma — Co-Founder & AI Research Lead of KaizenStat | Open Source Python ML Library',
      description: 'Kriti Sharma is the AI Research and Management Lead and co-founder of KaizenStat, an open-source Python machine learning library (pip install kaizenstat). She drives AI market intelligence, research roadmap, and operations. Co-founded KaizenStat in 2026 with Masuddar Rahaman and Abhishikta Dutta.',
      keywords: [
        'kriti sharma', 'kriti sharma kaizenstat', 'kriti sharma co-founder',
        'kriti sharma ai research', 'kriti sharma management lead',
        'kriti sharma machine learning', 'kriti sharma open source',
        'kriti sharma python', 'kriti sharma github', 'kriti sharma linkedin',
        'who is kriti sharma', 'kriti sharma kaizenstat founder',
        'kaizenstat kriti sharma',
      ],
      canonical: 'https://www.kaizenstat.com/kriti-sharma',
      ogType: 'profile',
      ogImage: 'https://i.postimg.cc/mZ9PZg1k/IMG-3848.avif',
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
            src="https://i.postimg.cc/mZ9PZg1k/IMG-3848.avif"
            alt="Kriti Sharma — Co-Founder of KaizenStat"
            className="w-24 h-24 rounded-full object-cover border border-purple-500/30"
          />
          <div>
            <h1 className="text-3xl font-bold text-white">Kriti Sharma</h1>
            <p className="text-purple-400 text-sm mt-1">AI Research & Management Lead — Co-Founder, KaizenStat</p>
          </div>
        </div>

        <div className="space-y-4 text-slate-300 text-base leading-relaxed">
          <p>
            <strong className="text-white">Kriti Sharma</strong> is the AI Research and Management Lead
            and co-founder of{' '}
            <a href="https://www.kaizenstat.com" className="text-purple-400 hover:underline">KaizenStat</a>,
            an open-source Python machine learning library. She drives AI market intelligence, oversees
            the KaizenStat research roadmap, manages day-to-day operations, and actively implements AI
            alongside the team.
          </p>
          <p>
            Kriti Sharma co-founded KaizenStat in 2026 with{' '}
            <Link to="/masuddar-rahaman" className="text-cyan-400 hover:underline">Masuddar Rahaman</Link> and{' '}
            <Link to="/abhishikta-dutta" className="text-emerald-400 hover:underline">Abhishikta Dutta</Link>.
            She turns market intelligence into real direction and direction into shipped work.
          </p>
          <p>
            KaizenStat is available at{' '}
            <code className="bg-white/10 px-2 py-0.5 rounded text-cyan-300 text-sm">pip install kaizenstat</code>.
            Apache 2.0 licensed. Python 3.8+.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/kriti-sharma-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors"
          >
            GitHub → kriti-sharma-ai
          </a>
          <a
            href="https://www.linkedin.com/in/kriti-sharma-795116377/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors"
          >
            LinkedIn → Kriti Sharma
          </a>
          <Link
            to="/founder-connect"
            className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-lg text-sm text-purple-400 hover:bg-purple-500/20 transition-colors"
          >
            Meet all KaizenStat Founders →
          </Link>
        </div>

        <div className="pt-4 border-t border-white/5 text-xs text-slate-500">
          Kriti Sharma · Co-Founder of KaizenStat · Open Source Python ML Library ·{' '}
          <a href="https://www.kaizenstat.com" className="hover:text-slate-300">kaizenstat.com</a>
        </div>
      </div>
    </div>
  );
}
