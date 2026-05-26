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
}

export const RESEARCH_TOOLS: ResearchTool[] = [
  {
    id: 'hrm-flagship',
    title: 'HRM (Heart Rate Monitor)',
    subtitle: 'Flagship Training Dashboard',
    description: 'The flagship product that started this DevAI workflow. It combines workout timing, Spotify playback context, and heart-rate data into a browser-based training dashboard.',
    category: 'Product development',
    status: 'Active',
    tags: ['React', 'Web Bluetooth', 'Spotify API', 'Product'],
    externalUrl: 'https://arii.github.io/hrm/',
    externalLinkDisplayLabel: 'View HRM',
    isFlagship: true
  },
  {
    id: 'repo-auditor-ai',
    title: 'RepoAuditor AI',
    subtitle: 'DevAI Workflow Console',
    description: 'A GitHub-focused DevAI workflow console for pull request review, workflow health analysis, structured issue generation, and Jules coding-agent handoff. Evolved from HRM internal tooling.',
    category: 'DevAI Tooling',
    status: 'Active',
    tags: ['DevAI', 'GitHub API', 'Multi-Agent', 'Workflow'],
    externalUrl: 'https://repo-auditor-ai.vercel.app/',
    externalLinkDisplayLabel: 'Open RepoAuditor AI',
    sourceUrl: 'https://github.com/arii/hrm-project-management',
    isFlagship: true
  },
  {
    id: 'gitops-pr-reviewer',
    title: 'GitOps Code Review Agent',
    subtitle: 'Automated Local PR Auditing',
    description: 'An autonomous, model-agnostic review agent (mergellama.py) analyzing code styles and patterns against strict repository contracts.',
    category: 'DevAI System',
    status: 'Active',
    tags: ['Multi-Agent Systems', 'GitOps', 'Static Analysis', 'Python']
  },
  {
    id: 'scope-blast-radius',
    title: 'Blast-Radius Analyzer',
    subtitle: 'Static Workspace Dependency Checker',
    description: 'Calculates the semantic scope of code modifications (scope_check.py). Prevents downstream regressions before running heavy integrations.',
    category: 'DevAI System',
    status: 'Active',
    tags: ['AST Parsing', 'Workspace Scope', 'Dependency Mapping']
  },
  {
    id: 'ux-perception-debug',
    title: 'Visual Regression & UX Auditor',
    subtitle: 'Perception Telemetry System',
    description: 'An automated testing framework mapping visual DOM shifts, Lighthouse scores, and Playwright screenshots to detect UI regression.',
    category: 'Perception Debugging',
    status: 'Active',
    tags: ['Automation', 'Visual Regression', 'Lighthouse', 'Playwright'],
    canonicalPath: '/ux-auditor'
  },
  {
    id: 'wcs-parquet-pipeline',
    title: 'High-Scale Telemetry Ingestion ETL',
    subtitle: 'Scraper-to-Parquet Pipeline',
    description: 'Engineered ETL pipeline scraping unstructured raw dance competitive records and outputting compressed Apache Parquet formats.',
    category: 'Data Engineering',
    status: 'Active',
    tags: ['ETL', 'Apache Parquet', 'Scraping', 'Data Pipelines']
  },
  {
    id: 'blog-drafter',
    title: 'AI Blog Drafter',
    subtitle: 'Human-in-the-Loop Content Engine',
    description: 'Uses AI to help draft and refine blog posts with human feedback, ensuring brand voice consistency.',
    category: 'Content Tools',
    status: 'Active',
    tags: ['LLM', 'Content Generation', 'Productivity']
  },
  {
    id: 'wsdc-event-reminders',
    title: 'Event Reminders',
    subtitle: 'WCS Calendar Integration',
    description: 'Syncs important event dates and early-bird deadlines directly to your calendar via iCal generation.',
    category: 'Utility Tools',
    status: 'Active',
    tags: ['Automation', 'Calendar', 'WCS']
  }
];
