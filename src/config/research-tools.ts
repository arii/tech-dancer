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
    layman: 'A focused scraper for gathering and analyzing preliminary scoring data from WCS competitions.'
  },
  {
    id: 'blog-drafter',
    name: 'Blog Post Drafter',
    category: 'Content Generation',
    status: 'Active',
    layman: 'Drafts blog posts with AI while keeping a human in the loop for tone, accuracy, and final edits.'
  },
  {
    id: 'ux-auditor',
    name: 'Visual UX Auditor',
    category: 'Development Tool',
    status: 'Active',
    layman: 'Captures viewport screenshots and flags layout, contrast, and spacing issues across breakpoints.'
  }
];
