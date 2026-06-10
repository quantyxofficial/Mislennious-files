import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  hidden?: boolean;
}

export interface CaseStudy {
  id: string;
  client: string;
  problem: string;
  solution: string;
  impact: string;
  image: string; // Placeholder URL
}

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  role: string;
}

export interface MarqueeItem {
  label: string;
  icon?: LucideIcon;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

export interface CareerPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string; // Full-time, Part-time, Contract
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  process: { step: string; description: string }[];
  technologies: string[];
  caseStudies: string[]; // IDs of related case studies
}

export interface ExtendedCaseStudy extends CaseStudy {
  category: string;
  tags: string[];
  year: string;
  description: string;
}
