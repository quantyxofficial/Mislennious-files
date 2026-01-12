import {
  Code,
  BarChart3,
  Cpu,
  Megaphone,
  Image,
  Terminal,
  Database,
  Search,
  Zap
} from 'lucide-react';
import { ServiceItem, CaseStudy, Testimonial, MarqueeItem } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'web',
    title: 'Web Development',
    description: 'High-performance, SEO-optimized, scalable architectures tailored for luxury interaction.',
    icon: Code,
  },
  {
    id: 'data',
    title: 'Data Analytics',
    description: 'Bespoke dashboards and decision intelligence to visualize your hidden revenue.',
    icon: BarChart3,
  },
  {
    id: 'ai',
    title: 'AI / ML Solutions',
    description: 'Automation, NLP, and predictive modeling to scale operations without headcount.',
    icon: Cpu,
  },
  {
    id: 'ads',
    title: 'Growth Marketing',
    description: 'Meta & Google campaigns engineered for ROI, not just impressions.',
    icon: Megaphone,
  },
  {
    id: 'design',
    title: 'Visual Storytelling',
    description: 'High-CTR thumbnail design and brand assets that command attention.',
    icon: Image,
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'p1',
    client: 'Ventura Capital',
    problem: 'Outdated digital presence reducing Linsanity deal flow.',
    solution: 'React/Three.js immersive platform.',
    impact: '+240% Inbound Leads',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'p2',
    client: 'Apex Fitness',
    problem: 'High CPA on Meta Ads.',
    solution: 'AI-driven audience segmentation + Creative testing.',
    impact: '3.5x ROAS in 4 weeks',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'p3',
    client: 'Nebula SaaS',
    problem: 'Churn rate prediction accuracy was low.',
    solution: 'Custom ML churn model implementation.',
    impact: 'Saved $1.2M ARR',
    image: 'https://picsum.photos/800/600?random=3'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    text: "The quality feels enterprise-grade. Everything just works. Aether is expensive, but the ROI is undeniable.",
    author: "Elena R.",
    role: "CMO, Solaris Tech"
  },
  {
    id: 't2',
    text: "Design, data, and AI — perfectly executed. They don't just build websites; they build business engines.",
    author: "Marcus T.",
    role: "Founder, Kinetic"
  },
  {
    id: 't3',
    text: "Our ads ROI doubled within weeks. The intelligence they bring to the table is unmatched.",
    author: "Sarah Jenkins",
    role: "Director, LuxeRetail"
  }
];

export const MARQUEE_ITEMS: MarqueeItem[] = [
  { label: 'Web Development', icon: Terminal },
  { label: 'Data Analytics', icon: Database },
  { label: 'AI Solutions', icon: Cpu },
  { label: 'Meta Ads', icon: Search },
  { label: 'Visual Design', icon: Zap },
];

import {
  BlogPost,
  CareerPosition,
  ServiceDetail,
  ExtendedCaseStudy
} from './types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Future of AI in Marketing: Beyond Automation',
    excerpt: 'Exploring how artificial intelligence is transforming marketing strategies from reactive to predictive intelligence.',
    content: 'Full article content would go here...',
    author: 'Dr. Ananya Sharma',
    authorRole: 'Head of AI Research',
    date: '2026-01-08',
    category: 'AI & Machine Learning',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    featured: true
  },
  {
    id: 'b2',
    title: 'Data-Driven Design: Crafting Experiences That Convert',
    excerpt: 'How we combine analytics with creative intuition to build high-performing digital products.',
    content: 'Full article content would go here...',
    author: 'Marcus Chen',
    authorRole: 'Design Lead',
    date: '2026-01-05',
    category: 'Design & UX',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
    featured: true
  },
  {
    id: 'b3',
    title: 'Scaling Your SaaS: Technical Architecture Insights',
    excerpt: 'Lessons learned from building scalable applications that handle millions of users.',
    content: 'Full article content would go here...',
    author: 'Rohan Patel',
    authorRole: 'Senior Developer',
    date: '2025-12-28',
    category: 'Development',
    readTime: '10 min',
    image: 'https://picsum.photos/800/600?random=12'
  },
  {
    id: 'b4',
    title: 'ROI-Focused Meta Ads: Our Proven Framework',
    excerpt: 'A deep dive into our systematic approach to paid social advertising that delivers consistent results.',
    content: 'Full article content would go here...',
    author: 'Sarah Kim',
    authorRole: 'Growth Marketing Director',
    date: '2025-12-20',
    category: 'Marketing',
    readTime: '7 min',
    image: 'https://picsum.photos/800/600?random=13'
  }
];

export const CAREER_POSITIONS: CareerPosition[] = [
  {
    id: 'c1',
    title: 'Senior Full-Stack Developer',
    department: 'Engineering',
    location: 'Remote / Hybrid (India)',
    type: 'Full-time',
    description: 'Join our engineering team to build cutting-edge web applications using modern frameworks and cloud technologies.',
    responsibilities: [
      'Architect and develop scalable web applications using React, Node.js, and cloud platforms',
      'Collaborate with design and product teams to deliver exceptional user experiences',
      'Mentor junior developers and contribute to technical documentation',
      'Participate in code reviews and maintain high code quality standards'
    ],
    requirements: [
      '4+ years of experience in full-stack development',
      'Expertise in React, TypeScript, Node.js, and modern web technologies',
      'Strong understanding of cloud platforms (AWS, GCP, or Azure)',
      'Experience with CI/CD pipelines and DevOps practices',
      'Excellent problem-solving and communication skills'
    ]
  },
  {
    id: 'c2',
    title: 'Data Scientist',
    department: 'Analytics',
    location: 'Remote / Hybrid (India)',
    type: 'Full-time',
    description: 'Work with cutting-edge data science techniques to solve complex business problems and drive insights for our clients.',
    responsibilities: [
      'Develop predictive models and machine learning solutions',
      'Analyze large datasets to extract actionable insights',
      'Create data visualizations and dashboards for stakeholders',
      'Collaborate with engineering teams to deploy ML models to production'
    ],
    requirements: [
      '3+ years of experience in data science or analytics',
      'Strong proficiency in Python, R, and SQL',
      'Experience with ML frameworks (TensorFlow, PyTorch, scikit-learn)',
      'Knowledge of statistical analysis and A/B testing',
      "Master's degree in Computer Science, Statistics, or related field preferred"
    ]
  },
  {
    id: 'c3',
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Remote / Hybrid (India)',
    type: 'Full-time',
    description: 'Create beautiful, intuitive interfaces that delight users and drive business results.',
    responsibilities: [
      'Design user interfaces for web and mobile applications',
      'Conduct user research and usability testing',
      'Create wireframes, prototypes, and high-fidelity mockups',
      'Collaborate with developers to ensure design implementation quality'
    ],
    requirements: [
      '3+ years of UI/UX design experience',
      'Proficiency in Figma, Adobe Creative Suite, and prototyping tools',
      'Strong portfolio showcasing diverse design work',
      'Understanding of design systems and component libraries',
      'Excellent visual design and typography skills'
    ]
  }
];

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    id: 'web',
    title: 'Web Development',
    subtitle: 'Build Fast, Scalable, and Beautiful Web Applications',
    description: 'We craft high-performance web applications that combine stunning design with robust engineering. From single-page applications to complex enterprise systems, we deliver solutions that scale with your business.',
    icon: Code,
    features: [
      'React, Next.js, and TypeScript development',
      'Progressive Web Apps (PWA)',
      'API development and integration',
      'Cloud deployment and DevOps',
      'Performance optimization and SEO',
      'Responsive and accessible design'
    ],
    process: [
      { step: 'Discovery', description: 'We analyze your requirements and define technical architecture' },
      { step: 'Design', description: 'Create wireframes, mockups, and interactive prototypes' },
      { step: 'Development', description: 'Build your application using modern frameworks and best practices' },
      { step: 'Testing', description: 'Rigorous QA testing across devices and browsers' },
      { step: 'Deployment', description: 'Launch to production with CI/CD pipelines' },
      { step: 'Support', description: 'Ongoing maintenance, updates, and optimization' }
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Vite', 'AWS', 'Vercel'],
    caseStudies: ['p1']
  },
  {
    id: 'data',
    title: 'Data Analytics',
    subtitle: 'Transform Data into Actionable Insights',
    description: 'Turn your raw data into strategic advantages. We build custom analytics solutions, interactive dashboards, and business intelligence systems that help you make data-driven decisions.',
    icon: BarChart3,
    features: [
      'Custom dashboard development',
      'Predictive analytics and forecasting',
      'Data pipeline architecture',
      'Real-time analytics',
      'KPI tracking and visualization',
      'A/B testing and experimentation'
    ],
    process: [
      { step: 'Data Audit', description: 'Assess your current data infrastructure and identify opportunities' },
      { step: 'Strategy', description: 'Define metrics, KPIs, and analytics framework' },
      { step: 'Implementation', description: 'Build data pipelines and analytics infrastructure' },
      { step: 'Visualization', description: 'Create intuitive dashboards and reporting tools' },
      { step: 'Training', description: 'Empower your team to leverage data insights' },
      { step: 'Optimization', description: 'Continuous improvement and refinement' }
    ],
    technologies: ['Python', 'Tableau', 'Power BI', 'SQL', 'BigQuery', 'Snowflake', 'Apache Airflow'],
    caseStudies: ['p3']
  },
  {
    id: 'ai',
    title: 'AI / ML Solutions',
    subtitle: 'Harness the Power of Artificial Intelligence',
    description: 'From natural language processing to computer vision, we develop custom AI solutions that automate processes, predict outcomes, and unlock new capabilities for your business.',
    icon: Cpu,
    features: [
      'Custom ML model development',
      'Natural Language Processing (NLP)',
      'Computer Vision applications',
      'Recommendation systems',
      'Chatbots and conversational AI',
      'Model deployment and MLOps'
    ],
    process: [
      { step: 'Problem Definition', description: 'Identify use cases and success metrics' },
      { step: 'Data Preparation', description: 'Collect, clean, and prepare training data' },
      { step: 'Model Development', description: 'Train and fine-tune ML models' },
      { step: 'Validation', description: 'Test model performance and accuracy' },
      { step: 'Deployment', description: 'Deploy models to production with monitoring' },
      { step: 'Iteration', description: 'Continuously improve model performance' }
    ],
    technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'Gemini AI', 'scikit-learn', 'Hugging Face', 'Docker', 'Kubernetes'],
    caseStudies: ['p3']
  },
  {
    id: 'ads',
    title: 'Growth Marketing',
    subtitle: 'Performance Marketing That Delivers ROI',
    description: 'We engineer data-driven marketing campaigns on Meta and Google platforms that are optimized for conversions, not just clicks. Every dollar is tracked, tested, and optimized.',
    icon: Megaphone,
    features: [
      'Meta (Facebook/Instagram) Ads',
      'Google Ads and Search marketing',
      'Audience segmentation and targeting',
      'Creative testing and optimization',
      'Conversion rate optimization',
      'Analytics and attribution modeling'
    ],
    process: [
      { step: 'Audit', description: 'Analyze current marketing performance and opportunities' },
      { step: 'Strategy', description: 'Define targeting, messaging, and channel mix' },
      { step: 'Creative', description: 'Develop high-converting ad creatives' },
      { step: 'Launch', description: 'Deploy campaigns with proper tracking' },
      { step: 'Optimize', description: 'A/B test and refine for maximum ROI' },
      { step: 'Scale', description: 'Expand winning campaigns profitably' }
    ],
    technologies: ['Meta Ads Manager', 'Google Ads', 'Google Analytics', 'Looker Studio', 'Hotjar', 'Segment'],
    caseStudies: ['p2']
  },
  {
    id: 'design',
    title: 'Visual Storytelling',
    subtitle: 'Design That Captures Attention and Drives Action',
    description: 'From brand identity to digital assets, we create visually stunning designs that tell your story and command attention in crowded markets.',
    icon: Image,
    features: [
      'Brand identity and logo design',
      'UI/UX design',
      'Marketing collateral',
      'Social media graphics',
      'Thumbnail design for high CTR',
      'Motion graphics and animation'
    ],
    process: [
      { step: 'Brand Discovery', description: 'Understand your brand values and target audience' },
      { step: 'Concept', description: 'Develop creative concepts and mood boards' },
      { step: 'Design', description: 'Create high-fidelity designs and assets' },
      { step: 'Feedback', description: 'Iterate based on your input' },
      { step: 'Delivery', description: 'Provide final files and brand guidelines' },
      { step: 'Support', description: 'Ongoing design support as needed' }
    ],
    technologies: ['Figma', 'Adobe Creative Suite', 'After Effects', 'Blender', 'Procreate'],
    caseStudies: ['p1', 'p2']
  }
];

export const EXTENDED_CASE_STUDIES: ExtendedCaseStudy[] = [
  {
    ...CASE_STUDIES[0],
    category: 'Web Development',
    tags: ['React', 'Three.js', 'Design'],
    year: '2025',
    description: 'Ventura Capital needed a modern digital presence to attract high-quality deal flow. We built an immersive 3D web experience that showcases their portfolio and investment thesis.'
  },
  {
    ...CASE_STUDIES[1],
    category: 'Growth Marketing',
    tags: ['Meta Ads', 'AI', 'Analytics'],
    year: '2025',
    description: 'Apex Fitness was struggling with high customer acquisition costs. We implemented AI-driven audience segmentation and creative testing to dramatically improve ROAS.'
  },
  {
    ...CASE_STUDIES[2],
    category: 'AI & ML',
    tags: ['Machine Learning', 'Predictive Analytics'],
    year: '2024',
    description: 'Nebula SaaS needed to reduce churn. We built a custom ML model that predicts churn risk with high accuracy, enabling proactive customer success interventions.'
  }
];

