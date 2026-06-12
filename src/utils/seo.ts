/**
 * SEO Utilities for KaizenStat
 * Manages meta tags, structured data, and SEO-friendly content
 */

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

/**
 * Update document meta tags for SEO
 */
export function updateMetaTags(config: SEOConfig) {
  // Title
  document.title = config.title;

  // Description
  updateMetaTag('description', config.description);

  // Keywords
  if (config.keywords?.length) {
    updateMetaTag('keywords', config.keywords.join(', '));
  }

  // Canonical URL
  if (config.canonical) {
    updateCanonical(config.canonical);
  }

  // Open Graph
  updateMetaProperty('og:title', config.title);
  updateMetaProperty('og:description', config.description);
  if (config.ogImage) {
    updateMetaProperty('og:image', config.ogImage);
  }
  if (config.ogType) {
    updateMetaProperty('og:type', config.ogType);
  }

  // Twitter Card
  updateMetaProperty('twitter:title', config.title);
  updateMetaProperty('twitter:description', config.description);
  if (config.twitterCard) {
    updateMetaProperty('twitter:card', config.twitterCard);
  }

  // Structured Data
  if (config.structuredData) {
    updateStructuredData(config.structuredData);
  }
}

/**
 * Update a single meta tag by name
 */
function updateMetaTag(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Update a meta property (og:, twitter:)
 */
function updateMetaProperty(property: string, content: string) {
  let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Update canonical URL
 */
function updateCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

/**
 * Update JSON-LD structured data
 */
function updateStructuredData(data: Record<string, unknown>) {
  // Remove old structured data script
  const oldScript = document.querySelector('script[data-seo-structured]');
  if (oldScript) {
    oldScript.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-seo-structured', 'true');
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

const OG_IMAGE = 'https://www.kaizenstat.com/logo.png';

// SEO Configuration for different pages
export const SEO_CONFIG = {
  home: {
    title: 'KaizenStat — Open Source ML Python Library | AutoML, Data Health & Pipeline Debugging',
    description: 'KaizenStat is an open source ML Python library (v0.6.0) for automated model training, data health scoring, pipeline debugging, and continuous improvement. pip install kaizenstat. Apache 2.0. Built by Masuddar Rahaman, Kriti Sharma & Abhishikta Dutta.',
    keywords: [
      'kaizenstat', 'open source ml', 'kaizen machine learning', 'kaizenstat python',
      'open source python ml library', 'automl python', 'ml pipeline debugging',
      'data health score', 'machine learning continuous improvement', 'kaizen data science',
      'pip install kaizenstat', 'datadoctor python', 'open source machine learning framework',
      'ml automation python', 'kaizenstat masuddar rahaman', 'kaizenstat v0.6',
    ],
    canonical: 'https://www.kaizenstat.com/',
    ogType: 'website',
    ogImage: OG_IMAGE,
    twitterCard: 'summary_large_image',
  },
  docs: {
    title: 'KaizenStat Handbook — Open Source ML Python Library Documentation',
    description: 'Complete documentation for KaizenStat (v0.6.0). Learn AutoML, data health scoring, pipeline debugging, validation, NLP, and deployment. Every chapter has a runnable Colab notebook. pip install kaizenstat.',
    keywords: [
      'kaizenstat docs', 'kaizenstat documentation', 'open source ml tutorial',
      'kaizen ml guide', 'datadoctor tutorial', 'automl tutorial python',
      'ml pipeline tutorial', 'data health check python', 'kaizenstat handbook',
      'machine learning python tutorial', 'kaizenstat api reference',
    ],
    canonical: 'https://www.kaizenstat.com/docs',
    ogType: 'website',
    ogImage: OG_IMAGE,
    twitterCard: 'summary_large_image',
  },
  competitions: {
    title: 'KaizenStat Competitions — Data Science & ML Challenges for Students',
    description: 'Join KaizenStat ML competitions and data science challenges. Compete with students worldwide, build real ML projects, win prizes, and earn certificates. Open to all skill levels.',
    keywords: [
      'kaizenstat competition', 'data science competition students', 'ml hackathon',
      'machine learning challenge', 'kaizenstat challenge', 'open source ml competition',
      'data science hackathon india', 'ml competition 2026', 'student ml challenge',
    ],
    canonical: 'https://www.kaizenstat.com/competitions',
    ogType: 'website',
    ogImage: OG_IMAGE,
    twitterCard: 'summary_large_image',
  },
  team: {
    title: 'KaizenStat Founders — Masuddar Rahaman, Kriti Sharma & Abhishikta Dutta',
    description: 'Meet the founders of KaizenStat: Masuddar Rahaman (Lead Creator & ML Engineer), Kriti Sharma (AI Research Lead), and Abhishikta Dutta (ML Engineer & Researcher). Student-led team building the future of open source ML.',
    keywords: [
      'masuddar rahaman', 'kriti sharma', 'abhishikta dutta',
      'kaizenstat team', 'kaizenstat founders', 'masuddar rahaman kaizenstat',
      'masuddar rahaman ml engineer', 'kriti sharma ai', 'abhishikta dutta ml engineer',
      'kaizenstat open source founders', 'student ml founders', 'python ml pipelines',
    ],
    canonical: 'https://www.kaizenstat.com/founder-connect',
    ogType: 'website',
    ogImage: OG_IMAGE,
    twitterCard: 'summary_large_image',
  },
  simulation: {
    title: 'KaizenStat ML Simulation — Interactive Data Science Pipeline Demo',
    description: 'Try the KaizenStat interactive ML pipeline simulation. Run data health checks, model training, and debugging in your browser — no install required. Perfect for learning open source ML concepts.',
    keywords: [
      'kaizenstat simulation', 'ml pipeline demo', 'interactive machine learning',
      'data science simulation', 'open source ml demo', 'kaizenstat demo',
      'learn machine learning online', 'ml pipeline interactive',
    ],
    canonical: 'https://www.kaizenstat.com/simulation',
    ogType: 'website',
    ogImage: OG_IMAGE,
    twitterCard: 'summary_large_image',
  },
};

/**
 * Generate SEO-friendly URL slug from text
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Create breadcrumb structured data
 */
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

/**
 * Create article structured data
 */
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
    image: config.image || 'https://www.kaizenstat.com/og-image.png',
    datePublished: config.datePublished,
    dateModified: config.dateModified || config.datePublished,
    author: {
      '@type': 'Person',
      name: config.author || 'KaizenStat Team',
    },
  };
}

/**
 * Create FAQ structured data
 */
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
