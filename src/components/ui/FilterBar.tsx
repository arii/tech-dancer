import { useSearchParam } from '@/hooks/useSearchParam';
import { Box, Stack } from '@/layouts/Primitives';
import { formatCategory } from '@/lib/utils';
import { FilterButton } from './FilterButton';

export interface CategoryOption {
  id: string;
  label: string;
  className?: string;
}

interface FilterBarProps {
  categories: (string | CategoryOption)[];
  paramName?: string;
}

export function FilterBar({ categories, paramName = 'category' }: FilterBarProps) {
  const [activeCategory, setActiveCategory] = useSearchParam(paramName, 'All');

  return (
    <Box
      border="b"
      width="full"
      position="sticky"
      zIndex={40}
      overflowX="auto"
      className="bg-bg/80 backdrop-blur-md top-16 lg:top-0 no-scrollbar"
      paddingY={6}
    >
      <Stack direction="row" gap={3} className="min-w-max" paddingX={1}>
        {categories.map((cat) => {
          const id = typeof cat === 'string' ? cat : cat.id;
          const label = typeof cat === 'string' ? formatCategory(cat) : cat.label;
          const className = typeof cat === 'string' ? '' : cat.className;

          return (
            <FilterButton
              key={id}
              label={label}
              onClick={() => setActiveCategory(id)}
              isActive={activeCategory === id}
              className={className}
            />
          );
        })}
      </Stack>
    </Box>
  );
}
