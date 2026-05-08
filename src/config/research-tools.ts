export interface ResearchTool {
  id: string;
  name: string;
  category: string;
  status: string;
  layman: string;
}

export const RESEARCH_TOOLS: ResearchTool[] = [
  {
    id: 'wcs-scraper',
    name: 'WCS Prelim Scoring Scraper',
    category: 'Dance Research',
    status: 'Coming Soon',
    layman: 'A sophisticated scraper for extracting and analyzing preliminary scoring data from WCS competitions.'
  },
  {
    id: 'blog-drafter',
    name: 'Blog Post Drafter',
    category: 'Content Generation',
    status: 'Active',
    layman: 'Drafter tool to generate blog posts using AI with human feedback in the loop.'
  },
  {
    id: 'ux-auditor',
    name: 'Visual UX Auditor',
    category: 'Development Tool',
    status: 'Active',
    layman: 'Automated visual regression and UX improvement suggestions across viewports.'
  },
  {
    id: 'wsdc-event-reminders',
    name: 'WSDC Event Reminders',
    category: 'Travel Optimization',
    status: 'Active',
    layman: 'Secure early bird discounts without overcommitting. Sync verified WSDC travel milestones directly to your calendar.'
  }
];
