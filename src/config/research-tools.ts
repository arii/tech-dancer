export interface ResearchTool {
  id: string;
  name: string;
  category: string;
  status: string;
  layman: string;
  canonicalPath?: string;
}

export const RESEARCH_TOOLS: ResearchTool[] = [
  {
    id: 'wcs-scraper',
    name: 'WCS Prelim Scoring Scraper',
    category: 'Data Analysis',
    status: 'Active',
    layman: 'Technical tool for extracting and analyzing preliminary scoring data from WCS competitions.'
  },
  {
    id: 'blog-drafter',
    name: 'Agentic Content Drafter',
    category: 'Agent Orchestration',
    status: 'Active',
    layman: 'AI agent orchestration for generating and refining blog posts with human oversight.'
  },
  {
    id: 'ux-auditor',
    name: 'DevAI UX Auditor',
    category: 'Visual Intelligence',
    status: 'Active',
    layman: 'Autonomous visual regression and UX improvement analysis powered by DevAI.',
    canonicalPath: '/ux-auditor'
  },
  {
    id: 'wsdc-event-reminders',
    name: 'Travel Milestone Engine',
    category: 'Workflow Automation',
    status: 'Active',
    layman: 'Automated travel planning and calendar integration for WSDC event milestones.'
  }
];
