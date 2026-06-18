import { Box, Stack } from '@/layouts/Primitives';
import { FilterButton } from './FilterButton';

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

/**
 * Filter navigation for content grids.
 *
 * WHY:
 * Provides immediate discovery of available content categories
 * and allows for fast client-side filtering.
 */
export function FilterBar({ categories, activeCategory, onCategoryChange }: FilterBarProps) {
  return (
    <Box
      border="b"
      width="full"
      position="sticky"
      zIndex={40}
      overflowX="auto"
      className="bg-bg/80 backdrop-blur-md top-16 lg:top-0 no-scrollbar"
      paddingY={4}
    >
      <Stack direction="row" gap={2} className="min-w-max" paddingX={1}>
        {categories.map((label) => {
          const categoryValue = label === 'All' ? 'All' : label;
          const isActive = activeCategory === categoryValue;

          return (
            <FilterButton
              key={label}
              label={label === 'All' ? 'All Posts' : label}
              onClick={() => onCategoryChange(categoryValue)}
              isActive={isActive}
              className="min-w-24"
            />
          );
        })}
      </Stack>
    </Box>
  );
}
