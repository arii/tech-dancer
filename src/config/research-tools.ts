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
    name: 'WCS Scoring Pipeline',
    category: 'Data Orchestration',
    status: 'Active',
    layman: 'Autonomous extraction and multi-point verification of scoring data from competitive social dance events.'
  },
  {
    id: 'blog-drafter',
    name: 'Blog Orchestrator',
    category: 'DevAI / Automation',
    status: 'Active',
    layman: 'Agentic workflow to generate and refine blog content using AI with human-in-the-loop validation.'
  },
  {
    id: 'ux-auditor',
    name: 'Systems UX Auditor',
    category: 'Verification',
    status: 'Active',
    layman: 'Orchestrated visual regression and accessibility auditing system for cross-viewport integrity.',
    canonicalPath: '/ux-auditor'
  },
  {
    id: 'wsdc-event-reminders',
    name: 'Travel Automations',
    category: 'Service Orchestration',
    status: 'Active',
    layman: 'Automated synchronization of verified event milestones and early-bird deadlines to personal calendars.'
  }
];
