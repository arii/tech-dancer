export interface ResearchCTA {
  label: string;
  url: string;
  isExternal?: boolean;
  variant?: 'primary' | 'outline' | 'ghost';
}

export interface ResearchTool {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  status: string;
  tags: string[];
  canonicalPath?: string;
  isFlagship?: boolean;
  image?: string;
  proves?: string[];
  ctas?: ResearchCTA[];
  problem?: string;
  solution?: string;
  outcome?: string;
}

export const RESEARCH_TOOLS: ResearchTool[] = [
  {
    id: 'boomtick-blog',
    title: 'BoomTick.blog',
    subtitle: 'Production React/Vite content platform',
    description: 'A full-stack content platform with blog posts, gear reviews, event guides, merch integration, affiliate disclosures, SEO metadata, and automated visual QA.',
    category: 'Product Platform',
    status: 'Active',
    tags: ['React', 'Vite', 'TypeScript', 'GitHub Actions', 'Vercel', 'Playwright', 'Structured Content', 'Affiliate Data'],
    isFlagship: true,
    image: '/assets/posts/boomtick-and-b-thumb.svg',
    proves: ['Frontend architecture', 'Product thinking', 'Content systems', 'SEO', 'Automation', 'Design iteration'],
    problem: 'Fragmented West Coast Swing content and lack of professional-grade dance resources.',
    solution: 'A production React/Vite content platform with blog posts, gear reviews, event guides, merch integration, and automated visual QA.',
    outcome: 'An optimized, SEO-friendly hub that proves frontend architecture, product thinking, and robust automation pipelines.',
    ctas: [
      { label: 'View site', url: 'https://boomtick.blog', isExternal: true, variant: 'primary' },
      { label: 'Read architecture article', url: '/research/architecture', variant: 'outline' },
      { label: 'View GitHub workflow', url: 'https://github.com/arii/boomtick/tree/main/.github/workflows', isExternal: true, variant: 'ghost' }
    ]
  },
  {
    id: 'repo-auditor-ai',
    title: 'RepoAuditor AI',
    subtitle: 'DevAI Workflow Console',
    description: 'A workflow console for analyzing pull requests, reviewing code quality, checking CI failures, identifying risky changes, and generating structured agent instructions.',
    category: 'DevAI Tooling',
    status: 'Active',
    tags: ['GitHub API', 'LLM-assisted review', 'Python tooling', 'CI diagnostics', 'Prompt generation', 'Workflow state management'],
    isFlagship: true,
    image: '/assets/research/repo-auditor-ai.png',
    proves: ['DevAI orchestration', 'GitHub workflow automation', 'PR review systems', 'Prompt pipelines', 'Repo-aware tooling'],
    problem: 'Inefficient manual PR reviews and difficulty tracking CI health across multiple repositories.',
    solution: 'A workflow console for analyzing pull requests, reviewing code quality, checking CI failures, and generating structured agent instructions.',
    outcome: 'Scalable DevAI orchestration that reduces review friction and provides high-precision repo-aware context for agentic workflows.',
    ctas: [
      { label: 'Read case study', url: '/research/repo-auditor-case-study', variant: 'primary' },
      { label: 'View repo', url: 'https://github.com/arii/hrm-project-management', isExternal: true, variant: 'outline' },
      { label: 'View workflow', url: 'https://github.com/arii/hrm-project-management/tree/main/.github/workflows', isExternal: true, variant: 'ghost' }
    ]
  },
  {
    id: 'hrm-flagship',
    title: 'HRM (Heart Rate Monitor)',
    subtitle: 'Training Dashboard',
    description: 'The original product built using full-stack engineering. It integrates Web Bluetooth heart-rate telemetry with Spotify API context for complex browser-based applications.',
    category: 'Product Development',
    status: 'Active',
    tags: ['React', 'Web Bluetooth', 'Spotify API', 'Product'],
    isFlagship: true,
    image: '/assets/research/hrm-flagship.png',
    proves: ['Hardware APIs', 'OAuth integration', 'State synchronization', 'Cross-platform state'],
    problem: 'Difficulty synchronizing workout telemetry with playback context for professional-grade performance metrics.',
    solution: 'A training dashboard integrating Web Bluetooth heart-rate telemetry with Spotify API context.',
    outcome: 'A complex browser-based application demonstrating hardware API mastery and real-time telemetry orchestration.',
    ctas: [
      { label: 'View HRM', url: 'https://arii.github.io/hrm/', isExternal: true, variant: 'primary' },
      { label: 'Read case study', url: '/research/hrm-case-study', variant: 'outline' }
    ]
  },
  {
    id: 'gitops-pr-reviewer',
    title: 'GitOps Code Review Agent',
    subtitle: 'Automated Local PR Auditing',
    description: 'A local code review system that automates static analysis and codebase policy enforcement.',
    category: 'DevAI System',
    status: 'Active',
    tags: ['Multi-Agent Systems', 'GitOps', 'Static Analysis', 'Python'],
    canonicalPath: '/research/gitops-pr-reviewer'
  },
  {
    id: 'scope-blast-radius',
    title: 'Blast-Radius Analyzer',
    subtitle: 'Static Workspace Dependency Checker',
    description: 'A static analysis tool that calculates the scope of code changes across a workspace, mapping dependencies to provide precise context.',
    category: 'DevAI System',
    status: 'Active',
    tags: ['AST Parsing', 'Workspace Scope', 'Dependency Mapping'],
    canonicalPath: '/research/scope-blast-radius'
  },
  {
    id: 'ux-auditor',
    title: 'Visual Regression & UX Auditor',
    subtitle: 'Perception Telemetry System',
    description: 'A visual regression pipeline that maps DOM shifts using automated Playwright workflows to provide telemetry for frontend debugging.',
    category: 'Perception Debugging',
    status: 'Active',
    tags: ['Automation', 'Visual Regression', 'Lighthouse', 'Playwright'],
    canonicalPath: '/ux-auditor'
  },
  {
    id: 'wcs-scraper',
    title: 'High-Scale Telemetry Ingestion ETL',
    subtitle: 'Scraper-to-Parquet Pipeline',
    description: 'A data pipeline transforming competitive dance records into compressed Parquet formats for efficient indexing and analytical queries.',
    category: 'Data Engineering',
    status: 'Active',
    tags: ['ETL', 'Apache Parquet', 'Scraping', 'Data Pipelines'],
    canonicalPath: '/research/wcs-scraper'
  },
  {
    id: 'blog-drafter',
    title: 'AI Blog Drafter',
    subtitle: 'Human-in-the-Loop Content Engine',
    description: 'A content generation platform combining search over existing posts with a human-in-the-loop workflow to maintain editorial quality.',
    category: 'Content Tools',
    status: 'Active',
    tags: ['LLM', 'Content Generation', 'Productivity'],
    canonicalPath: '/research/blog-drafter'
  },
  {
    id: 'wsdc-event-reminders',
    title: 'Event Reminders',
    subtitle: 'WCS Calendar Integration',
    description: 'An automated calendar synchronization utility that extracts logistics from data sources to maintain schedule updates.',
    category: 'Utility Tools',
    status: 'Active',
    tags: ['Automation', 'Calendar', 'WCS'],
    canonicalPath: '/research/wsdc-event-reminders'
  }
];
