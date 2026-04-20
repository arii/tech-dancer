import { Box } from '@/components/Primitives';
import { useToolbox } from '@/hooks/useToolbox';
import FolioGrid from '@/components/FolioGrid';

export default function Toolbox() {
  const { filteredCategories } = useToolbox();
  const allItems = filteredCategories.flatMap(cat => cat.items);

  return (
    <Box as="section">
      <FolioGrid
        items={allItems}
        categoryTitle="Gear Reviews"
        label="THE TOOLBOX"
        description="An easy searchable format for looking up products I recommend. Every gear review card expands to an actual blog post for sharing products you can purchase."
        basePath="/gear"
      />
    </Box>
  );
}
