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
    category: 'Dance Research',
    status: 'Active',
    layman: 'A sophisticated scraper for extracting and analyzing preliminary scoring data from WCS competitions.'
  },
  {
    id: 'wsdc-event-reminders',
    name: 'WSDC Event Reminders',
    category: 'Travel Optimization',
    status: 'Active',
    layman: 'Secure early bird discounts without overcommitting. Sync verified WSDC travel milestones directly to your calendar.'
  }
];
