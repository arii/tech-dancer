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
    name: 'WCS Results Tracker',
    category: 'Practice Tools',
    status: 'Active',
    layman: 'Tracks and analyzes scoring data from WCS competitions to show trends and results.'
  },
  {
    id: 'blog-drafter',
    name: 'AI Blog Drafter',
    category: 'Content Tools',
    status: 'Active',
    layman: 'Uses AI to help draft and refine blog posts with human feedback.'
  },
  {
    id: 'ux-auditor',
    name: 'UX Auditor',
    category: 'Testing Tools',
    status: 'Active',
    layman: 'Checks for visual changes and accessibility issues across different screen sizes.',
    canonicalPath: '/ux-auditor'
  },
  {
    id: 'wsdc-event-reminders',
    name: 'Event Reminders',
    category: 'Utility Tools',
    status: 'Active',
    layman: 'Syncs important event dates and early-bird deadlines directly to your calendar.'
  }
];
