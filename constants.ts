import {
  Code,
  BarChart3,
  Cpu,
  Megaphone,
  Image,
  Terminal,
  Database,
  Search,
  Zap,
  FileSpreadsheet,
  Globe,
  TrendingUp,
  Palette,
  Brain,
  BarChart
} from 'lucide-react';
import { ServiceItem, CaseStudy, Testimonial, MarqueeItem } from './types';

// Services Data
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mgoovkrz';

export const SERVICES = [
  {
    id: 'eda',
    title: 'Exploratory Data Analysis',
    description: 'Uncovering patterns, spotting anomalies, and checking assumptions with detailed statistical summaries and graphical representations.',
    icon: Database,
  },
  {
    id: 'viz',
    title: 'Data Visualization',
    description: 'Transforming complex datasets into intuitive, interactive dashboards that drive decision-making.',
    icon: BarChart3,
    hidden: true
  },
  {
    id: 'excel',
    title: 'Excel Solutions',
    description: 'Advanced spreadsheet modeling, automation, and reporting to streamline business operations.',
    icon: FileSpreadsheet,
    hidden: true
  },
  {
    id: 'web',
    title: 'Web Development',
    description: 'Building high-performance, scalable web applications with modern frameworks and responsive design.',
    icon: Globe,
    hidden: true
  },
  {
    id: 'growth',
    title: 'Growth Marketing',
    description: 'Data-driven strategies to accelerate user acquisition, retention, and revenue growth.',
    icon: TrendingUp,
    hidden: true
  },
  {
    id: 'design',
    title: 'YT Thumbnail & Poster Making',
    description: 'High-converting visual assets designed to maximize click-through rates and brand engagement.',
    icon: Palette,
  },
  {
    id: 'ai',
    title: 'AI / ML Solutions',
    description: 'Custom machine learning models and AI integration to automate processes and predict trends.',
    icon: Brain,
    hidden: true
  },
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
    id: 'c4',
    title: 'Tech/Data Science Blogger',
    department: 'Content',
    location: 'Remote',
    type: 'Part-time',
    description: 'Share your knowledge and passion for technology and data science with our growing community.',
    responsibilities: [
      'Write engaging blog posts about the latest tech trends and data science concepts',
      'Create tutorials and guides for our student community',
      'Collaborate with the dev team to document technical achievements'
    ],
    requirements: [
      'Passion for writing and technology',
      'Basic understanding of Data Science or Web Development concepts',
      'Excellent written communication skills'
    ]
  }
];

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    id: 'web',
    title: 'Web Development',
    subtitle: 'Build Fast, Scalable, and Beautiful Web Applications',
    description: 'We craft high-performance, scalable web applications.',
    icon: Code,
    features: [],
    process: [],
    technologies: [],
    caseStudies: []
  },
  {
    id: 'viz',
    title: 'Data Visualization',
    subtitle: 'Transform Data into Actionable Insights',
    description: 'Turn your raw data into strategic advantages.',
    icon: BarChart3,
    features: [],
    process: [],
    technologies: [],
    caseStudies: []
  },
  {
    id: 'eda',
    title: 'Exploratory Data Analysis',
    subtitle: 'Uncover Hidden Patterns & Anomalies',
    description: 'Before modeling comes understanding. We dive deep into your data structure, identifying trends, outliers, and key drivers that inform your entire data strategy.',
    icon: Database,
    features: [
      'Statistical profiling & summary',
      'Missing data imputation',
      'Correlation analysis',
      'Hypothesis testing',
      'Data quality assessment'
    ],
    process: [
      { step: '01. Ingestion', description: 'We consolidate your raw datasets from multiple sources, handling formatting inconsistencies and type conversions.' },
      { step: '02. Cleaning', description: 'Rigorous identification and treatment of missing values, duplicate records, and data anomalies.' },
      { step: '03. Univariate Analysis', description: 'Examining the distribution of individual variables to understand central tendencies and spread.' },
      { step: '04. Pattern Discovery', description: 'Using bivariate and multivariate techniques to uncover hidden correlations and causal relationships.' },
      { step: '05. Insight Generation', description: 'Synthesizing findings into a comprehensive statistical report with actionable business recommendations.' }
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'Jupyter', 'R'],
    caseStudies: ['p5']
  },
  {
    id: 'excel',
    title: 'Excel Solutions',
    subtitle: 'Automate Hours of Manual Work',
    description: 'Stop wasting time on manual copy-pasting.',
    icon: FileSpreadsheet,
    features: [],
    process: [],
    technologies: [],
    caseStudies: []
  },
  {
    id: 'ai',
    title: 'AI / ML Solutions',
    subtitle: 'Harness the Power of Artificial Intelligence',
    description: 'We develop custom AI solutions.',
    icon: Cpu,
    features: [],
    process: [],
    technologies: [],
    caseStudies: []
  },
  {
    id: 'growth',
    title: 'Growth Marketing',
    subtitle: 'Performance Marketing That Delivers ROI',
    description: 'We engineer data-driven marketing campaigns.',
    icon: TrendingUp,
    features: [],
    process: [],
    technologies: [],
    caseStudies: []
  },
  {
    id: 'design',
    title: 'YT Thumbnail & Poster Making',
    subtitle: 'High-CTR Visual Assets for Maximum Engagement',
    description: 'From brand identity to high-CTR YouTube thumbnails, we create visually stunning designs that tell your story and command attention in crowded markets.',
    icon: Palette,
    features: [
      'Competitor Visual Analysis',
      'Pattern Interruption Design',
      'A/B Testing Variants',
      'Psychology-Driven Layouts',
      'Brand Consistency'
    ],
    process: [
      { step: '01. Research & Strategy', description: 'We analyze your niche, competitors, and top-performing videos to identify visual hooks that drive clicks.' },
      { step: '02. Concept Sketching', description: 'Developing multiple low-fidelity drafts to establish the strongest composition and focal points.' },
      { step: '03. High-Fidelity Design', description: 'Executing the selected concept with premium assets, professional color grading, and kinetic typography.' },
      { step: '04. Variant Creation', description: 'Designing 2-3 alternate versions with different emotions or hooks for A/B testing.' },
      { step: '05. Optimization', description: 'Final export and quality check, ensuring assets look perfect across all device sizes and themes.' }
    ],
    technologies: ['Figma', 'Photoshop', 'Illustrator', 'After Effects'],
    caseStudies: ['p6']
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
  },
  {
    id: 'p4',
    client: 'FinCorp Global',
    problem: 'Manual reporting in Excel was taking 40+ hours/week.',
    solution: 'Automated Excel Dashboards & VBA Macros',
    impact: 'Reduced reporting time by 90%',
    image: 'https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=2070&auto=format&fit=crop',
    category: 'Data & Analytics',
    tags: ['Excel', 'VBA', 'Automation'],
    year: '2024',
    description: 'We automated complex financial reporting workflows using advanced Excel models and VBA macros, saving the finance team hundreds of hours annually.'
  },
  {
    id: 'p5',
    client: 'StreamLine Logistics',
    problem: 'Supply chain bottlenecks were invisible in raw data.',
    solution: 'Interactive Power BI Visualization Suite',
    impact: '15% efficiency gain in 3 months',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    category: 'Data & Analytics',
    tags: ['Power BI', 'Visualization', 'EDA'],
    year: '2024',
    description: 'Developed a comprehensive Power BI dashboard suite that visualized real-time supply chain data, allowing management to instantly identify and resolve bottlenecks.'
  },
  {
    id: 'p6',
    client: 'Urban Wear',
    problem: 'Low CTR on social media campaigns.',
    solution: 'High-contrast, kinetic typography design system',
    impact: '4x increase in CTR',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
    category: 'Design & Creative',
    tags: ['Graphic Design', 'Social Media', 'Branding'],
    year: '2025',
    description: 'Revamped the brand\'s social media visual identity with a high-energy kinetic typography system that significantly boosted engagement and click-through rates.'
  }
];

