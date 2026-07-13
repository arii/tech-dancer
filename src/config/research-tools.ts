/**
 * Represents a tool or project in the research portfolio.
 * The `taxonomyBucket` field is strictly enforced by the layout engine
 * in `ResearchAnalytics.tsx` to group and render items into respective sections.
 */
export interface ResearchTool {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  taxonomyBucket?: 'flagship' | 'engineering' | 'data-content' | 'e-commerce';
  status: string;
  tags: string[];
  canonicalPath?: string;
  externalUrl?: string;
  externalLinkDisplayLabel?: string;
  sourceUrl?: string;
  isFlagship?: boolean;
  excludeFromEngineeringTools?: boolean;
  image?: string;
  imageAlt?: string;
  inDevMessage?: {
    highlight: string;
    rest: string;
  };
  customPreview?: {
    logo: { prefix: string; accent: string; suffix: string };
    headline: { text: string; accent?: string }[];
    tagline: string;
  };
}

export const RESEARCH_TOOLS: ResearchTool[] = [
  {
    id: 'hrm-flagship',
    inDevMessage: {
      highlight: 'Intended to run locally on your own server.',
      rest: ' No live site available.'
    },
    taxonomyBucket: 'flagship',
    title: 'HRM (Heart Rate Monitor)',
    description: 'Web Bluetooth heart-rate telemetry synced across multiple clients via persistent WebSocket server, with Spotify API integration and a synchronized timer. Built end-to-end as a DevAI-assisted engineering project.',
    category: 'Product Development',
    status: 'Active',
    tags: ['React', 'Web Bluetooth', 'Spotify API', 'Product'],
    sourceUrl: 'https://github.com/arii/hrm',
    isFlagship: true,
    image: '/assets/research/hrm-flagship.png',
    imageAlt: 'Screenshot of the HRM heart rate monitor training dashboard with real-time biometric telemetry and Spotify integration'
  },
  {
    id: 'repo-auditor-ai',
    inDevMessage: {
      highlight: 'Available now for testing',
      rest: ' with your own repository.'
    },
    taxonomyBucket: 'flagship',
    title: 'RepoAuditor AI',
    description: 'Automated GitHub PR auditing built on a Gemini-driven CI/CD pipeline with Jules autonomous coding agent integration. An independent project demonstrating agentic engineering workflow — not prior paid work.',
    category: 'DevAI Tooling',
    status: 'Active',
    tags: ['DevAI', 'GitHub API', 'Multi-Agent', 'Workflow'],
    externalUrl: 'https://repo-auditor-ai.vercel.app/',
    externalLinkDisplayLabel: 'Open RepoAuditor AI',
    sourceUrl: 'https://github.com/arii/hrm-project-management',
    isFlagship: true,
    image: '/assets/research/repo-auditor-ai.png',
    imageAlt: 'Screenshot of the RepoAuditor AI workflow console displaying multi-repo pull request audit findings and issue prioritization'
  },
  {
    id: 'boomtick-blog',
    inDevMessage: {
      highlight: 'RAG + LLM tooling in active development.',
      rest: ' This site is the production environment where those pipelines are being built and validated.'
    },
    taxonomyBucket: 'flagship',
    title: 'BoomTick.blog',
    subtitle: 'LIVE DEVELOPMENT ENVIRONMENT',
    description: 'West Coast Swing community platform and active testbed for RAG pipelines and LLM-assisted content workflows currently in development. Includes SEO-optimized publishing, analytics, and Printful API integration for automated merch listing generation.',
    category: 'Product development',
    status: 'Active dev',
    tags: ['Next.js', 'LLM Workflows', 'SEO'],
    externalUrl: 'https://boomtick.blog',
    externalLinkDisplayLabel: 'Visit Site',
    sourceUrl: 'https://github.com/arii/tech-dancer',
    isFlagship: true,
    customPreview: {
      logo: { prefix: 'boom', accent: 'tick', suffix: '.blog' },
      headline: [
        { text: 'Pack smart.' },
        { text: 'Dance more.', accent: 'Dance more.' }
      ],
      tagline: "The west coast swing dancer's guide to gear, travel, and better dance weekends."
    }
  },
  {
    id: 'gitops-pr-reviewer',
    taxonomyBucket: 'engineering',
    title: 'GitOps Code Review Agent',
    subtitle: 'Automated PR Auditing',
    description: 'LLM-powered PR auditing using GitHub Actions. Reviews code style and pattern consistency on every pull request. The foundation for the RAG-grounded review pipeline being built into RepoAuditor AI.',
    category: 'DevAI System',
    status: 'Active',
    tags: ['GitHub Actions', 'LLM', 'PR Automation'],
    canonicalPath: '/research/gitops-pr-reviewer',
    sourceUrl: 'https://github.com/arii/tech-dancer/tree/main/dev-tools'
  },
  {
    id: 'deployment-impact-analyzer',
    taxonomyBucket: 'flagship',
    title: 'Deployment Impact Analyzer',
    subtitle: 'VISUAL IMPACT ANALYSIS PIPELINE',
    description: 'CI pipeline that determines which pages are visually affected by a pull request. Uses dependency-cruiser to trace changed files through the import graph, then captures Playwright screenshots of affected routes, runs pixelmatch pixel diffs, crops changed regions, and generates a deployment review report with severity scores. Agent integration in progress.',
    category: 'DevAI System',
    status: 'Active',
    tags: ['Playwright', 'Pixelmatch', 'Dependency Graph', 'CI/CD'],
    canonicalPath: '/research/deployment-impact-analyzer',
    sourceUrl: 'https://github.com/arii/tech-dancer/tree/main/dev-tools',
    isFlagship: true
  },
  {
    id: 'ux-auditor',
    taxonomyBucket: 'engineering',
    title: 'Visual Regression & UX Auditor',
    subtitle: 'PLAYWRIGHT VISUAL REGRESSION',
    description: 'Automated visual regression testing using Playwright and pixelmatch. Captures full-page screenshots before and after a PR, computes pixel-level diffs, crops the bounding box of changed regions, and scores severity by percentage of changed pixels. Part of the Deployment Impact Analyzer pipeline.',
    category: 'Perception Debugging',
    status: 'Active',
    tags: ['Playwright', 'Pixelmatch', 'Screenshot Diff', 'CI/CD'],
    canonicalPath: '/ux-auditor',
    sourceUrl: 'https://github.com/arii/tech-dancer/tree/main/dev-tools'
  },
  {
    id: 'wcs-scraper',
    taxonomyBucket: 'data-content',
    title: 'High-Scale Telemetry Ingestion ETL',
    subtitle: 'Scraper-to-Parquet Pipeline',
    description: 'A data engineering showcase for Dev AI systems, transforming raw competitive dance records into compressed Parquet formats. This enables efficient RAG indexing and complex analytical queries.',
    category: 'Data Engineering',
    status: 'Active',
    tags: ['ETL', 'Apache Parquet', 'Scraping', 'Data Pipelines'],
    canonicalPath: '/research/wcs-scraper'
  },
  {
    id: 'blog-drafter',
    taxonomyBucket: 'data-content',
    title: 'AI Blog Drafter',
    subtitle: 'Human-in-the-Loop Content Engine',
    description: 'A prompt engineering platform designed for brand-consistent content generation. It combines RAG over existing blog posts with a human-in-the-loop workflow to maintain editorial quality.',
    category: 'Content Tools',
    status: 'Active',
    tags: ['LLM', 'Content Generation', 'Productivity'],
    canonicalPath: '/research/blog-drafter'
  },
  {
    id: 'ecommerce-automation',
    taxonomyBucket: 'e-commerce',
    title: 'Ecommerce Automation Experiments',
    subtitle: 'Printful & Merch Pipeline',
    description: 'Automated merch operations including programmatic design generation, Printful API storefront sync, and incoming Amazon affiliate integration workflows.',
    category: 'Business Automation',
    status: 'In Progress',
    tags: ['Printful API', 'Image Gen', 'Amazon Sync', 'Workflow'],
    canonicalPath: '/research/ecommerce-automation'
  },
  {
    id: 'versiontruth',
    taxonomyBucket: 'engineering',
    title: 'VersionTruth',
    subtitle: 'The antidote to version hallucinations',
    description: 'The antidote to version hallucinations: real-time ground-truth for npm, Node, and GitHub Actions.',
    category: 'DevAI Tooling',
    status: 'Active',
    tags: ['versions', 'ci', 'dependencies', 'hallucination-mitigation', 'npm', 'node', 'github-actions', 'agents', 'nanda'],
    canonicalPath: '/versiontruth',
    sourceUrl: 'https://github.com/arii/tech-dancer/tree/main/api'
  }
];
