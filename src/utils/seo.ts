export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  structuredData?: Record<string, unknown>;
}

export function updateMetaTags(config: SEOConfig) {
  document.title = config.title;
  updateMetaTag('description', config.description);
  if (config.keywords?.length) {
    updateMetaTag('keywords', config.keywords.join(', '));
  }
  if (config.canonical) {
    updateCanonical(config.canonical);
  }
  updateMetaProperty('og:title', config.title);
  updateMetaProperty('og:description', config.description);
  if (config.ogImage) {
    updateMetaProperty('og:image', config.ogImage);
    updateMetaProperty('og:image:alt', 'KaizenStat — Open Source Python ML Framework');
  }
  if (config.ogType) {
    updateMetaProperty('og:type', config.ogType);
  }
  updateMetaProperty('twitter:title', config.title);
  updateMetaProperty('twitter:description', config.description);
  if (config.twitterCard) {
    updateMetaProperty('twitter:card', config.twitterCard);
  }
  if (config.structuredData) {
    updateStructuredData(config.structuredData);
  }
}

function updateMetaTag(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateMetaProperty(property: string, content: string) {
  let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

function updateStructuredData(data: Record<string, unknown>) {
  const oldScript = document.querySelector('script[data-seo-structured]');
  if (oldScript) oldScript.remove();
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-seo-structured', 'true');
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

const OG_IMAGE = 'https://www.kaizenstat.com/og-image.png';
const BASE = 'https://www.kaizenstat.com';

export const SEO_CONFIG = {
  home: {
    title: 'KaizenStat — Open Source Python ML Framework | AutoML, DataDoctor, Pipeline Debugging',
    description: 'KaizenStat is an open-source Python ML framework (v0.6.0) for AutoML, data health scoring, pipeline debugging, and continuous improvement. pip install kaizenstat. Founded by Masuddar Rahaman (Framework Architect), Kriti Sharma (AI Research Lead), and Abhishikta Dutta (ML Engineer). Apache 2.0. Python 3.8+.',
    keywords: [
      'kaizenstat', 'kaizenstat python', 'what is kaizenstat', 'kaizenstat framework',
      'open source python ml framework', 'kaizenstat masuddar rahaman', 'masuddar rahaman kaizenstat',
      'masuddar rahaman ml engineer', 'masuddar rahaman founder', 'kriti sharma kaizenstat',
      'abhishikta dutta kaizenstat', 'pip install kaizenstat', 'kaizenstat automl',
      'kaizenstat datadoctor', 'datadoctor python', 'kaizenstat data health',
      'kaizenstat pipeline debugging', 'kaizenstat model training', 'kaizenstat open source',
      'kaizenstat v0.6', 'kaizenstat apache 2.0', 'kaizen machine learning',
      'kaizen data science', 'ml pipeline debugger python', 'automl python library',
      'data health score python', 'continuous improvement machine learning',
      'open source ml framework 2026', 'student ml framework india',
    ],
    canonical: `${BASE}/`,
    ogType: 'website',
    ogImage: OG_IMAGE,
    twitterCard: 'summary_large_image',
  },
  docs: {
    title: 'KaizenStat Handbook — Complete Documentation for the Open Source Python ML Framework',
    description: 'Complete documentation for KaizenStat (v0.6.0). 12+ chapters: AutoML, DataDoctor, data health scoring, pipeline debugging, validation, NLP, trust scoring, deployment, and API reference. Every chapter has a runnable Google Colab notebook. pip install kaizenstat.',
    keywords: [
      'kaizenstat docs', 'kaizenstat documentation', 'kaizenstat handbook',
      'kaizenstat api reference', 'kaizenstat tutorial', 'datadoctor tutorial',
      'automl tutorial python', 'ml pipeline tutorial python', 'data health check python',
      'kaizenstat colab', 'kaizenstat quick start', 'kaizenstat first model',
      'kaizenstat install setup', 'kaizenstat nlp docs', 'kaizenstat deploy',
      'open source ml tutorial', 'kaizen ml guide', 'machine learning python tutorial',
    ],
    canonical: `${BASE}/docs`,
    ogType: 'website',
    ogImage: OG_IMAGE,
    twitterCard: 'summary_large_image',
  },
  competitions: {
    title: 'KaizenStat Competitions — ML & Data Science Challenges for Students',
    description: 'Join KaizenStat ML competitions and data science challenges. Compete with students worldwide, build real ML projects using kaizenstat, win prizes, and earn certificates. Open to all skill levels. Organized by KaizenStat founders Masuddar Rahaman, Kriti Sharma, and Abhishikta Dutta.',
    keywords: [
      'kaizenstat competition', 'kaizenstat ml challenge', 'data science competition students',
      'ml hackathon india', 'machine learning challenge 2026', 'kaizenstat hackathon',
      'open source ml competition', 'student ml challenge', 'data science hackathon',
      'kaizenstat prizes', 'kaizenstat certificate competition',
    ],
    canonical: `${BASE}/competitions`,
    ogType: 'website',
    ogImage: OG_IMAGE,
    twitterCard: 'summary_large_image',
  },
  team: {
    title: 'KaizenStat Founders — Masuddar Rahaman, Kriti Sharma & Abhishikta Dutta | Open Source Python ML Library',
    description: 'KaizenStat was founded by Masuddar Rahaman (Founder & Framework Architect — built the KaizenStat open-source Python ML library from scratch), Kriti Sharma (AI Research & Management Lead — co-founder, drives research and operations), and Abhishikta Dutta (ML Engineer & Researcher — co-founder, builds ML pipelines and production systems). All three are co-founders of KaizenStat. pip install kaizenstat.',
    keywords: [
      // Masuddar Rahaman
      'masuddar rahaman', 'masuddar rahaman kaizenstat', 'masuddar rahaman founder',
      'masuddar rahaman framework architect', 'masuddar rahaman ml', 'masuddar rahaman python',
      'masuddar rahaman open source', 'who is masuddar rahaman', 'what did masuddar rahaman create',
      'masuddar rahaman machine learning', 'masuddar rahaman datadoctor',
      // Kriti Sharma
      'kriti sharma', 'kriti sharma kaizenstat', 'kriti sharma ai research',
      'kriti sharma management lead', 'kriti sharma co-founder', 'who is kriti sharma',
      'kriti sharma machine learning', 'kriti sharma open source',
      // Abhishikta Dutta
      'abhishikta dutta', 'abhishikta dutta kaizenstat', 'abhishikta dutta ml engineer',
      'abhishikta dutta researcher', 'abhishikta dutta co-founder', 'who is abhishikta dutta',
      'abhishikta dutta python', 'abhishikta dutta machine learning',
      // General founder queries
      'who founded kaizenstat', 'who built kaizenstat', 'kaizenstat founders', 'kaizenstat team',
      'kaizenstat open source founders', 'student ml founders', 'python ml framework founders',
      'who made kaizenstat', 'kaizenstat creator', 'kaizenstat founding team', 'kaizenstat people',
    ],
    canonical: `${BASE}/founder-connect`,
    ogType: 'profile',
    ogImage: OG_IMAGE,
    twitterCard: 'summary_large_image',
  },
  simulation: {
    title: 'KaizenStat ML Simulation — Interactive Data Science Pipeline Demo',
    description: 'Try the KaizenStat interactive ML pipeline simulation. Run data health checks, AutoML training, and debugging in your browser with no install required. Built using the same DataDoctor pipeline as the kaizenstat Python library.',
    keywords: [
      'kaizenstat simulation', 'ml pipeline demo', 'interactive machine learning demo',
      'data science simulation', 'open source ml demo', 'kaizenstat demo',
      'learn machine learning online', 'ml pipeline interactive', 'datadoctor demo',
      'kaizenstat browser demo',
    ],
    canonical: `${BASE}/simulation`,
    ogType: 'website',
    ogImage: OG_IMAGE,
    twitterCard: 'summary_large_image',
  },
  about: {
    title: 'About KaizenStat — Open Source Python ML Framework Founded by Masuddar Rahaman',
    description: 'KaizenStat is an open-source Python machine learning framework founded in 2026 by Masuddar Rahaman, Kriti Sharma, and Abhishikta Dutta. Our mission: make ML easy to build, debug, and continuously improve. Apache 2.0. pip install kaizenstat.',
    keywords: [
      'about kaizenstat', 'kaizenstat mission', 'kaizenstat story', 'kaizenstat history',
      'kaizenstat founded 2026', 'masuddar rahaman kaizenstat about',
      'open source ml framework about', 'kaizen philosophy ml', 'kaizenstat values',
      'kaizenstat india', 'student open source ml project',
    ],
    canonical: `${BASE}/about`,
    ogType: 'website',
    ogImage: OG_IMAGE,
    twitterCard: 'summary_large_image',
  },
  blog: {
    title: 'KaizenStat Blog — Machine Learning, Data Science & Python Tutorials',
    description: 'Read the KaizenStat blog for in-depth articles on machine learning, data science, Python, AutoML, pipeline debugging, and the open source kaizenstat framework. Written by the KaizenStat team and community.',
    keywords: [
      'kaizenstat blog', 'machine learning blog', 'data science blog python',
      'automl tutorial', 'ml pipeline blog', 'kaizenstat articles',
      'open source ml blog', 'python data science tutorials', 'kaizen machine learning blog',
      'kaizenstat community blog',
    ],
    canonical: `${BASE}/blog`,
    ogType: 'website',
    ogImage: OG_IMAGE,
    twitterCard: 'summary_large_image',
  },
  careers: {
    title: 'KaizenStat Careers — Join the Open Source ML Framework Team',
    description: 'Join the KaizenStat team. Open roles for bloggers, mentors, campus partners, ML contributors, and community managers. Be part of the student-led open source Python ML framework founded by Masuddar Rahaman, Kriti Sharma, and Abhishikta Dutta.',
    keywords: [
      'kaizenstat careers', 'kaizenstat jobs', 'open source ml internship',
      'kaizenstat volunteer', 'kaizenstat mentor', 'kaizenstat campus partner',
      'ml open source contributor', 'kaizenstat community roles', 'join kaizenstat',
    ],
    canonical: `${BASE}/careers`,
    ogType: 'website',
    ogImage: OG_IMAGE,
    twitterCard: 'summary_large_image',
  },
  practice: {
    title: 'KaizenStat Practice — Free ML & Data Science Practice Exams and Quizzes',
    description: 'Practice machine learning, Python, NumPy, pandas, deep learning, and data science with KaizenStat\'s free interactive quizzes and timed exams. Build skills for competitions and certifications.',
    keywords: [
      'kaizenstat practice', 'ml practice problems', 'data science quiz',
      'python ml quiz', 'numpy practice problems', 'pandas practice',
      'deep learning quiz', 'machine learning exam practice', 'kaizenstat quiz',
      'free ml practice', 'kaizenstat study',
    ],
    canonical: `${BASE}/practice`,
    ogType: 'website',
    ogImage: OG_IMAGE,
    twitterCard: 'summary_large_image',
  },
  getCertified: {
    title: 'KaizenStat Certifications — Earn Verified ML & Data Science Certificates',
    description: 'Earn KaizenStat\'s verified machine learning and data science certificates. Complete assessments, showcase your skills, and get recognized. Built on the open source kaizenstat Python ML framework.',
    keywords: [
      'kaizenstat certification', 'ml certificate', 'data science certification free',
      'kaizenstat verified certificate', 'machine learning certificate 2026',
      'python ml certification', 'open source ml certificate', 'kaizenstat get certified',
    ],
    canonical: `${BASE}/get-certified`,
    ogType: 'website',
    ogImage: OG_IMAGE,
    twitterCard: 'summary_large_image',
  },
  summerOfComputation: {
    title: 'KaizenStat Summer of Computation — Open Source ML Contribution Program',
    description: 'The KaizenStat Summer of Computation is a program where students contribute to the open-source KaizenStat Python ML framework, build projects, and earn recognition. Founded by Masuddar Rahaman. Join the movement.',
    keywords: [
      'kaizenstat summer of computation', 'open source contribution program',
      'ml open source internship', 'kaizenstat contribution', 'student open source ml',
      'kaizenstat gsoc alternative', 'contribute kaizenstat', 'kaizenstat community program',
    ],
    canonical: `${BASE}/kaizenstat-summer-of-computation`,
    ogType: 'website',
    ogImage: OG_IMAGE,
    twitterCard: 'summary_large_image',
  },
  kaizenAI: {
    title: 'KaizenAI — AI Advisor for Machine Learning Pipelines | KaizenStat',
    description: 'KaizenAI is the AI advisor built into KaizenStat that provides intelligent recommendations for improving your ML pipeline. Enable with: pip install kaizenstat[intel].',
    keywords: [
      'kaizen ai', 'kaizenai', 'kaizenstat ai advisor', 'ml pipeline ai recommendations',
      'kaizenstat intel', 'ai ml debugging', 'intelligent ml advisor', 'kaizenstat kaizen ai',
    ],
    canonical: `${BASE}/kaizen-ai`,
    ogType: 'website',
    ogImage: OG_IMAGE,
    twitterCard: 'summary_large_image',
  },
  portfolio: {
    title: 'KaizenStat Portfolio — Community ML Projects Built with kaizenstat',
    description: 'Browse ML and data science projects built by the KaizenStat community using the kaizenstat open-source Python framework. Showcase your own project.',
    keywords: [
      'kaizenstat portfolio', 'ml projects kaizenstat', 'data science projects python',
      'kaizenstat community projects', 'open source ml portfolio',
    ],
    canonical: `${BASE}/portfolio`,
    ogType: 'website',
    ogImage: OG_IMAGE,
    twitterCard: 'summary_large_image',
  },
  events: {
    title: 'KaizenStat Events — ML Workshops, Webinars & Competitions',
    description: 'Join KaizenStat events: workshops, webinars, competitions, and community meetups focused on open-source machine learning, Python, and data science.',
    keywords: [
      'kaizenstat events', 'ml workshop', 'data science webinar', 'kaizenstat workshop',
      'machine learning meetup india', 'open source ml events', 'kaizenstat meetup',
    ],
    canonical: `${BASE}/events`,
    ogType: 'website',
    ogImage: OG_IMAGE,
    twitterCard: 'summary_large_image',
  },
};

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function createBreadcrumbs(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function createArticleSchema(config: {
  headline: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: config.headline,
    description: config.description,
    image: config.image || OG_IMAGE,
    datePublished: config.datePublished,
    dateModified: config.dateModified || config.datePublished,
    author: {
      '@type': 'Person',
      name: config.author || 'KaizenStat Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'KaizenStat',
      logo: { '@type': 'ImageObject', url: 'https://www.kaizenstat.com/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.kaizenstat.com/blog' },
  };
}

export function createFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function createPersonSchema(person: {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  sameAs?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.jobTitle,
    description: person.description,
    url: person.url,
    worksFor: {
      '@type': 'Organization',
      name: 'KaizenStat',
      url: 'https://www.kaizenstat.com',
    },
    sameAs: person.sameAs || [],
  };
}
