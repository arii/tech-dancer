import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getStudies } from '@/lib/content';
import { tools } from '@/lib/tools';

export function useResearch() {
  const { data: studies = [] } = useQuery({
    queryKey: ['studies'],
    queryFn: getStudies,
  });
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const getTool = (id: string) => tools.find(t => t.id === id);
  const getStudy = (slug: string) => studies.find(s => s.slug === slug);

  return {
    studies,
    tools,
    getTool,
    getStudy
  };
}
