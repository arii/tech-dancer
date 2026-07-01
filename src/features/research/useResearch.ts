import { useQuery } from '@tanstack/react-query';
import { getStudies } from '@/lib/content';
import { RESEARCH_TOOLS } from '@/config/research-tools';

export function useResearch() {
  const { data: studies = [] } = useQuery({
    queryKey: ['studies'],
    queryFn: getStudies,
    initialData: getStudies,
  });

  const flagshipTools = RESEARCH_TOOLS.filter(t => t.taxonomyBucket === 'flagship' || t.isFlagship);
  const engineeringTools = RESEARCH_TOOLS.filter(t => t.taxonomyBucket === 'engineering');
  const dataContentTools = RESEARCH_TOOLS.filter(t => t.taxonomyBucket === 'data-content');
  const ecommerceTools = RESEARCH_TOOLS.filter(t => t.taxonomyBucket === 'e-commerce');

  const getTool = (id: string) => RESEARCH_TOOLS.find(t => t.id === id);
  const getStudy = (slug: string) => studies.find(s => s.slug === slug);

  return {
    studies,
    tools: RESEARCH_TOOLS,
    flagshipTools,
    engineeringTools,
    dataContentTools,
    ecommerceTools,
    getTool,
    getStudy
  };
}
