import { useState, useEffect } from 'react';
import { getResources, Resource } from '@/lib/content';

export function useResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    try {
      const data = getResources();
      if (!data) throw new Error('FAILED_TO_LOAD_RESOURCES');
      setResources(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown resource error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSelect = (resource: Resource) => setSelectedResource(resource);
  const handleClear = () => setSelectedResource(null);

  return {
    resources,
    selectedResource,
    handleSelect,
    handleClear,
    isLoading,
    error
  };
}
