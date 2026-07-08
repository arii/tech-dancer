import { useSearchParam } from '@/hooks/useSearchParam';
import { Box, Stack } from '@/layouts/Primitives';
import { formatCategory } from '@/lib/utils';
import { FilterButton } from './FilterButton';

interface FilterBarProps {
  categories: string[];
}

export function FilterBar({ categories }: FilterBarProps) {
  const [activeCategory, setActiveCategory] = useSearchParam('category', 'All');

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
        {categories.map((cat) => (
          <FilterButton
            key={cat}
            label={formatCategory(cat)}
            onClick={() => setActiveCategory(cat)}
            isActive={activeCategory === cat}
            className="transition-all duration-300 text-sm whitespace-nowrap px-3"
          />
        ))}
      </Stack>
    </Box>
  );
}
