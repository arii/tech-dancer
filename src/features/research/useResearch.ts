import { useQuery } from '@tanstack/react-query';
import { getStudies } from '@/lib/content';

export function useResearch() {
  const { data: studies = [] } = useQuery({
    queryKey: ['studies'],
    queryFn: getStudies,
  });


  const tools = [
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
      id: 'flight-finder',
      name: 'Event Flight Finder',
      category: 'Logistics',
      status: 'Active',
      layman: 'Flight finder for WCS events - optimizing travel routes and finding the best deals.'
    },
    {
      id: 'ux-auditor',
      name: 'Visual UX Auditor',
      category: 'Development Tool',
      status: 'Active',
      layman: 'Automated visual regression and UX improvement suggestions across viewports.'
    }
  ];

  const getTool = (id: string) => tools.find(t => t.id === id);
  const getStudy = (slug: string) => studies.find(s => s.slug === slug);

  return {
    studies,
    tools,
    getTool,
    getStudy
  };
}
