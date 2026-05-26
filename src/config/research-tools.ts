export interface ResearchTool {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tags: string[];
  status: string;
  iconName: string;
  route?: string;
  canonicalPath?: string;
}

export const RESEARCH_TOOLS: ResearchTool[] = [
  {
    id: 'gitops-pr-reviewer',
    title: 'GitOps Code Review Agent',
    subtitle: 'Automated Local PR Auditing',
    description: 'An autonomous, model-agnostic review agent (mergellama.py) analyzing code styles and patterns against strict repository contracts.',
    category: 'DevAI System',
    tags: ['Multi-Agent Systems', 'GitOps', 'Static Analysis', 'Python'],
    status: 'Active',
    iconName: 'ShieldCheck',
    route: '/research/pr-reviewer'
  },
  {
    id: 'scope-blast-radius',
    title: 'Blast-Radius Analyzer',
    subtitle: 'Static Workspace Dependency Checker',
    description: 'Calculates the semantic scope of code modifications (scope_check.py). Prevents downstream regressions before running heavy integrations.',
    category: 'DevAI System',
    tags: ['AST Parsing', 'Workspace Scope', 'Dependency Mapping'],
    status: 'Active',
    iconName: 'GitBranch',
    route: '/research/scope-analysis'
  },
  {
    id: 'ux-perception-debug',
    title: 'Visual Regression & UX Auditor',
    subtitle: 'Perception Telemetry System',
    description: 'An automated testing framework mapping visual DOM shifts, Lighthouse scores, and Playwright screenshots to detect UI regression.',
    category: 'Perception Debugging',
    tags: ['Automation', 'Visual Regression', 'Lighthouse', 'Playwright'],
    status: 'Active',
    iconName: 'Layout',
    route: '/ux-auditor',
    canonicalPath: '/ux-auditor'
  },
  {
    id: 'wcs-parquet-pipeline',
    title: 'High-Scale Telemetry Ingestion ETL',
    subtitle: 'Scraper-to-Parquet Pipeline',
    description: 'Engineered ETL pipeline scraping unstructured raw dance competitive records and outputting compressed Apache Parquet formats.',
    category: 'Data Engineering',
    tags: ['ETL', 'Apache Parquet', 'Scraping', 'Data Pipelines'],
    status: 'Active',
    iconName: 'Database',
    route: '/research/wcs-data'
  }
];
