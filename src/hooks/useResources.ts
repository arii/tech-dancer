import { useState, useEffect } from 'react';
import { getResources, Resource } from '@/lib/content';

export function useResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  useEffect(() => {
    setResources(getResources());
  }, []);

  const handleSelect = (resource: Resource) => setSelectedResource(resource);
  const handleClear = () => setSelectedResource(null);

  return {
    resources,
    selectedResource,
    handleSelect,
    handleClear
  };
}
