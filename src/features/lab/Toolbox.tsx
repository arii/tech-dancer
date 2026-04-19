import { Box } from '@/components/layout/Primitives';
import { useToolbox } from './useToolbox';
import FolioGrid from '@/components/ui/FolioGrid';

export default function Toolbox() {
  const { filteredCategories } = useToolbox();
  const allItems = filteredCategories.flatMap(cat => cat.items);

  return (
    <Box as="section">
      <FolioGrid items={allItems} categoryTitle="Gear Reviews" basePath="/gear" />
    </Box>
  );
}
