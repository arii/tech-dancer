import { useQuery } from '@tanstack/react-query';
import { getStudies, getSiteConfig } from '@/lib/content';

export function useResearch() {
  const { data: studies = [] } = useQuery({
    queryKey: ['studies'],
    queryFn: getStudies,
  });

  const { data: siteConfig } = useQuery({
    queryKey: ['site-config'],
    queryFn: getSiteConfig,
  });

  const tools = (siteConfig?.labTools as Record<string, unknown>[]) || [];

  const getTool = (id: string) => tools.find((t) => t.id === id);
  const getStudy = (slug: string) => studies.find(s => s.slug === slug);

  return {
    studies,
    tools,
    getTool,
    getStudy
  };
}
