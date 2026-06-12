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

// SEO Configuration for different pages
export const SEO_CONFIG = {
  home: {
    title: 'KaizenStat - Open-Source Python ML Pipeline Debugging Framework | Continuous Improvement for Machine Learning',
    description: 'KaizenStat is an advanced open-source Python framework for machine learning pipeline debugging, model optimization, and continuous improvement. Created by Masuddar Rahaman & Kriti Sharma. Debug, test, and optimize ML pipelines with ease. Free, production-ready, Apache 2.0 licensed.',
    keywords: ['kaizenstat', 'machine learning', 'python framework', 'debugging ml pipelines', 'model optimization', 'open source', 'continuous improvement', 'data science', 'ml debugging tools', 'pipeline optimization', 'deep learning', 'python ml library'],
    canonical: 'https://www.kaizenstat.com/',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  },
  docs: {
    title: 'KaizenStat Documentation - Complete ML Pipeline Debugging Guide & Tutorial',
    description: 'Comprehensive documentation for KaizenStat framework. Learn how to debug machine learning pipelines, optimize models, validate data quality, and implement continuous improvement in your ML workflows. Includes step-by-step tutorials and best practices.',
    keywords: ['kaizenstat documentation', 'ml debugging guide', 'machine learning tutorial', 'pipeline optimization', 'python ml framework', 'model validation', 'data quality', 'ml best practices', 'debugging tutorial'],
    canonical: 'https://www.kaizenstat.com/docs',
    ogType: 'website',
  },
  competitions: {
    title: 'KaizenStat Competitions - ML Pipeline Debugging Challenges & Prizes',
    description: 'Join KaizenStat machine learning competitions and challenges. Test your pipeline debugging skills, compete with other data scientists, win prizes, and learn real-world ML optimization techniques. Perfect for building portfolio projects.',
    keywords: ['ml competition', 'machine learning challenge', 'kaizenstat competition', 'pipeline debugging challenge', 'data science competition', 'ml challenge 2024', 'model optimization prize'],
    canonical: 'https://www.kaizenstat.com/competitions',
    ogType: 'website',
  },
  team: {
    title: 'KaizenStat Founders - Masuddar Rahaman, Kriti Sharma & Abhishikta Dutta | ML Engineers',
    description: 'Meet the founders of KaizenStat: Masuddar Rahaman (Lead Creator), Kriti Sharma, and Abhishikta Dutta. Learn about their vision for ML pipeline debugging, continuous improvement philosophy, and mission to make machine learning development more efficient. All are experienced ML engineers and researchers passionate about open source.',
    keywords: ['masuddar rahaman', 'kriti sharma', 'abhishikta dutta', 'kaizenstat team', 'kaizenstat founders', 'ml engineers', 'machine learning engineers', 'masuddar rahaman machine learning', 'kriti sharma data science', 'abhishikta dutta machine learning', 'kaizenstat creators'],
    canonical: 'https://www.kaizenstat.com/founder-connect',
    ogType: 'website',
  },
  simulation: {
    title: 'ML Pipeline Simulation - Interactive KaizenStat Demo & Real-Time Debugging',
    description: 'Experience interactive machine learning pipeline simulation with KaizenStat. See real-time model optimization, data validation, and debugging in action. Try the simulation without installing anything. Perfect for learning ML debugging concepts.',
    keywords: ['ml simulation', 'pipeline demo', 'interactive ml', 'model optimization', 'real-time debugging', 'ml visualization', 'pipeline visualization', 'learning ml debugging', 'interactive demo'],
    canonical: 'https://www.kaizenstat.com/simulation',
    ogType: 'website',
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
