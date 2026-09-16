import { SectionMeta, ProjectItem, SkillCategory, ExperienceItem } from '../types';

export const SECTIONS: SectionMeta[] = [
  {
    id: 'intro',
    index: 0,
    label: 'Intro',
    kickerNumber: '00',
    kickerLabel: 'Origin',
    poster: '/assets/media/intro.jpg',
    video: '/assets/media/intro.mp4',
    title: 'Code. Architecture. Vision.'
  },
  {
    id: 'about',
    index: 1,
    label: 'About',
    kickerNumber: '01',
    kickerLabel: 'About',
    poster: '/assets/media/about.jpg',
    video: '/assets/media/about.mp4',
    title: 'Engineering Digital Experiences with Purpose'
  },
  {
    id: 'work',
    index: 2,
    label: 'Work',
    kickerNumber: '02',
    kickerLabel: 'Selected Work',
    poster: '/assets/media/work.jpg',
    video: '/assets/media/work.mp4',
    title: 'Crafted for Scalability & Impact'
  },
  {
    id: 'skills',
    index: 3,
    label: 'Skills',
    kickerNumber: '03',
    kickerLabel: 'Expertise',
    poster: '/assets/media/skills.jpg',
    video: '/assets/media/skills.mp4',
    title: 'Capabilities & Technical Arsenal'
  },
  {
    id: 'experience',
    index: 4,
    label: 'Experience',
    kickerNumber: '04',
    kickerLabel: 'Journey',
    poster: '/assets/media/experience.jpg',
    video: '/assets/media/experience.mp4',
    title: 'Track Record & Milestones'
  },
  {
    id: 'contact',
    index: 5,
    label: 'Contact',
    kickerNumber: '05',
    kickerLabel: 'Contact',
    poster: '/assets/media/contact.jpg',
    video: '/assets/media/contact.mp4',
    title: "Let's Build Something Memorable"
  }
];

export const HERO_WORDS = ['DESIGN.', 'DEVELOP.', 'DELIVER.'];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'aether-studio',
    number: '01',
    title: 'Aether Studio',
    subtitle: 'WebGL & Three.js 3D Audio-Visual Brand Universe',
    description: 'An immersive real-time WebGL audio-reactive platform combining custom GLSL shaders, procedural physics, and spatial audio to showcase luxury generative branding.',
    tech: ['WebGL', 'Three.js', 'GLSL', 'React', 'GSAP', 'Web Audio API'],
    year: '2025',
    link: 'https://github.com/anfil',
    github: 'https://github.com/anfil',
    role: 'Lead Creative Developer'
  },
  {
    id: 'synapse-engine',
    number: '02',
    title: 'Synapse Engine',
    subtitle: 'Distributed AI Agent & Workflow Orchestration',
    description: 'An autonomous multi-agent pipeline executing real-time data transformations, streaming LLM completions, and automated deployment verification with sub-100ms response windows.',
    tech: ['TypeScript', 'Python', 'FastAPI', 'Redis', 'LangChain', 'Docker'],
    year: '2024',
    link: 'https://github.com/anfil',
    github: 'https://github.com/anfil',
    role: 'Full Stack Architect'
  },
  {
    id: 'kroma-system',
    number: '03',
    title: 'Kroma Design System',
    subtitle: 'Multi-Brand Token Architecture & Component Ecosystem',
    description: 'A headless, accessible design system supporting 14 enterprise sub-brands with tokenized CSS variables, strict ARIA compliance, and sub-second bundle overhead.',
    tech: ['React', 'TypeScript', 'Tailwind', 'Storybook', 'Radix UI'],
    year: '2024',
    link: 'https://github.com/anfil',
    github: 'https://github.com/anfil',
    role: 'Design Technologist'
  },
  {
    id: 'veloce-commerce',
    number: '04',
    title: 'Veloce Commerce',
    subtitle: 'Headless High-Frequency Digital Storefront',
    description: 'Ultra-low latency international headless commerce platform achieving 100/100 Core Web Vitals, instant predictive edge caching, and customized checkout flows.',
    tech: ['Next.js', 'TypeScript', 'Shopify Storefront API', 'GraphQL', 'Tailwind'],
    year: '2023',
    link: 'https://github.com/anfil',
    github: 'https://github.com/anfil',
    role: 'Frontend Architect'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Creative Engineering',
    description: 'Blending mathematics, physics, and design to create living interfaces.',
    skills: [
      { name: 'WebGL & GLSL Shaders', level: 'Advanced' },
      { name: 'Three.js & Canvas API', level: 'Advanced' },
      { name: 'GSAP Motion Architecture', level: 'Mastery' },
      { name: 'Micro-Interactions & CSS Architecture', level: 'Mastery' },
      { name: 'Generative Design & Audio Reactive', level: 'Proficient' }
    ]
  },
  {
    title: 'Frontend & Architecture',
    description: 'Constructing resilient, type-safe, and lightning-fast client systems.',
    skills: [
      { name: 'React 19 & TypeScript', level: 'Mastery' },
      { name: 'Next.js & Server Components', level: 'Advanced' },
      { name: 'State Machines & Reactive Architecture', level: 'Advanced' },
      { name: 'Core Web Vitals & Performance', level: 'Mastery' },
      { name: 'WCAG 2.1 AA Accessibility', level: 'Advanced' }
    ]
  },
  {
    title: 'Backend & Systems',
    description: 'Architecting robust data conduits, distributed pipelines, and cloud native services.',
    skills: [
      { name: 'Node.js & Bun Runtimes', level: 'Advanced' },
      { name: 'Python & FastAPI', level: 'Proficient' },
      { name: 'PostgreSQL, Redis & Prisma', level: 'Advanced' },
      { name: 'REST & GraphQL APIs', level: 'Mastery' },
      { name: 'Docker & CI/CD Pipelines', level: 'Proficient' }
    ]
  },
  {
    title: 'AI & Automations',
    description: 'Empowering software with autonomous workflows and intelligent orchestration.',
    skills: [
      { name: 'LLM Orchestration & Agent Workflows', level: 'Advanced' },
      { name: 'Vector Databases & Embeddings', level: 'Proficient' },
      { name: 'Workflow Automation (n8n, Python)', level: 'Advanced' },
      { name: 'Code Generation & Agentic Tools', level: 'Mastery' }
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: '2023 — PRESENT',
    role: 'Lead Creative Developer & Technical Architect',
    company: 'Independent Studio / Consulting',
    location: 'Remote',
    description: 'Partnering with progressive design agencies, tech startups, and enterprise clients to architect award-caliber digital platforms, generative web experiences, and scalable design systems.',
    highlights: [
      'Pioneered headless WebGL architecture reducing initial paint times by 48%',
      'Directed engineering on 12+ international client deployments',
      'Engineered automated agent pipelines for automated performance audits'
    ]
  },
  {
    period: '2021 — 2023',
    role: 'Senior Frontend Engineer',
    company: 'Nexus Interactive Systems',
    location: 'London / Remote',
    description: 'Spearheaded frontend architecture for high-concurrency cloud dashboard and client storefronts. Guided 8 developers in TypeScript best practices and state management.',
    highlights: [
      'Engineered real-time data visualization engine supporting 100k+ concurrent metrics',
      'Standardized component library used across 6 cross-functional engineering teams',
      'Achieved zero critical regression rate through automated end-to-end testing'
    ]
  },
  {
    period: '2019 — 2021',
    role: 'Full Stack & Interactive Developer',
    company: 'Synthetix Media Lab',
    location: 'San Francisco / Remote',
    description: 'Created dynamic branding microsites, 3D interactive product configurators, and modern full-stack web applications with Node.js, GraphQL, and modern React.',
    highlights: [
      'Received FWA of the Day and Awwwards Mobile Site of the Day honors',
      'Integrated Stripe & headless billing infrastructure for SaaS products'
    ]
  }
];

export const SOCIAL_LINKS = [
  { label: 'GitHub', url: 'https://github.com/anfil', username: '@anfil' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/anfil', username: 'Anfil P.' },
  { label: 'Twitter / X', url: 'https://twitter.com/anfil_dev', username: '@anfil_dev' },
  { label: 'Email', url: 'mailto:anfil.dev@gmail.com', username: 'anfil.dev@gmail.com' }
];