export interface ResearchTool {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  status: string;
  tags: string[];
  canonicalPath?: string;
  externalUrl?: string;
  externalLinkDisplayLabel?: string;
  sourceUrl?: string;
  isFlagship?: boolean;
  image?: string;
  ctaLabel?: string;
}

export const RESEARCH_TOOLS: ResearchTool[] = [
  {
    id: 'hrm-flagship',
    title: 'HRM (Heart Rate Monitor)',
    subtitle: 'Flagship Training Dashboard',
    description: 'Flagship AI-engineered dashboard integrating Web Bluetooth heart-rate telemetry with Spotify API context to demonstrate full-stack DevAI orchestration.',
    category: 'Product Development',
    status: 'Active',
    tags: ['React', 'Web Bluetooth', 'Spotify API', 'Product'],
    externalUrl: 'https://arii.github.io/hrm/',
    externalLinkDisplayLabel: 'View HRM',
    ctaLabel: 'Read case study',
    isFlagship: true,
    image: '/assets/research/hrm-flagship.png'
  },
  {
    id: 'repo-auditor-ai',
    title: 'RepoAuditor AI — GitHub PR Review Console',
    subtitle: 'GitHub AI Orchestration',
    description: 'A purpose-built AI orchestration console for GitHub. It leverages custom prompt engineering to audit pull requests, analyze workflow health, and generate structured issues for Jules coding agents, unblocking rapid multi-repo development.',
    category: 'DevAI System',
    status: 'Active',
    tags: ['DevAI', 'GitHub API', 'Multi-Agent', 'Workflow'],
    externalUrl: 'https://repo-auditor-ai.vercel.app/',
    externalLinkDisplayLabel: 'Open RepoAuditor AI',
    sourceUrl: 'https://github.com/arii/hrm-project-management',
    ctaLabel: 'View demo',
    isFlagship: true,
    image: '/assets/research/repo-auditor-ai.png'
  },
  {
    id: 'gitops-pr-reviewer',
    title: 'AI PR Review Agent',
    subtitle: 'Local GitOps Code Review',
    description: 'A repo-aware PR review workflow that uses local or hosted LLMs to audit scope, code quality, repeated patterns, and CI failure context before generating structured review guidance.',
    category: 'DevAI System',
    status: 'Active',
    tags: ['Multi-Agent Systems', 'GitOps', 'Static Analysis', 'Python'],
    ctaLabel: 'View workflow',
    canonicalPath: '/research/gitops-pr-reviewer'
  },
  {
    id: 'scope-blast-radius',
    title: 'PR Impact & Dependency Analyzer',
    subtitle: 'Static Change Impact Analysis',
    description: 'Analyzes changed files, dependency paths, and workspace scope to estimate the likely impact of a PR before assigning review or test strategy.',
    category: 'DevAI System',
    status: 'Active',
    tags: ['AST Parsing', 'Workspace Scope', 'Dependency Mapping'],
    ctaLabel: 'View repo',
    canonicalPath: '/research/scope-blast-radius'
  },
  {
    id: 'ux-auditor',
    title: 'Playwright Visual QA & UX Auditor',
    subtitle: 'Automated Visual Regression',
    description: 'A screenshot and Lighthouse workflow for detecting layout regressions, mobile issues, accessibility concerns, and UX drift across site pages.',
    category: 'Perception Debugging',
    status: 'Active',
    tags: ['Automation', 'Visual Regression', 'Lighthouse', 'Playwright'],
    ctaLabel: 'View workflow',
    canonicalPath: '/ux-auditor'
  },
  {
    id: 'wcs-scraper',
    title: 'Data Pipeline & Telemetry ETL',
    subtitle: 'RAG Ingestion Pipeline',
    description: 'A data engineering showcase for DevAI systems, transforming raw competitive dance records into compressed Parquet formats. This enables efficient RAG indexing and complex analytical queries.',
    category: 'Data Engineering',
    status: 'Active',
    tags: ['ETL', 'Apache Parquet', 'Scraping', 'Data Pipelines'],
    ctaLabel: 'View workflow',
    canonicalPath: '/research/wcs-scraper'
  },
  {
    id: 'blog-drafter',
    title: 'AI Content Drafting Workflow',
    subtitle: 'Prompt Engineering Platform',
    description: 'Human-in-the-loop content workflow combining RAG with structured templates to maintain brand consistency and editorial quality for technical blog posts.',
    category: 'Content Tools',
    status: 'Active',
    tags: ['LLM', 'Content Generation', 'Productivity'],
    ctaLabel: 'View workflow',
    canonicalPath: '/research/blog-drafter'
  },
  {
    id: 'wsdc-event-reminders',
    title: 'Event Calendar Automation',
    subtitle: 'Automated Calendar Synchronization',
    description: 'A utility tool showcasing AI-assisted automation of calendar synchronization. It extracts logistics from fragmented data sources to maintain high-precision schedule telemetry.',
    category: 'Utility Tools',
    status: 'Active',
    tags: ['Automation', 'Calendar', 'WCS'],
    ctaLabel: 'View demo',
    canonicalPath: '/research/wsdc-event-reminders'
  }
];
