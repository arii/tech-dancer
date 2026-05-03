import { useQuery } from '@tanstack/react-query';
import { getStudies } from '@/lib/content';
import { RESEARCH_TOOLS } from '@/config/research-tools';

export function useResearch() {
  const { data: studies = [] } = useQuery({
    queryKey: ['studies'],
    queryFn: getStudies,
  });

  const getTool = (id: string) => RESEARCH_TOOLS.find(t => t.id === id);
  const getStudy = (slug: string) => studies.find(s => s.slug === slug);

  return {
    studies,
    tools: RESEARCH_TOOLS,
    getTool,
    getStudy
  };
}
