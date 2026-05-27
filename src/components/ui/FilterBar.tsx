import { useSearchParam } from '@/hooks/useSearchParam';
import { Box, Stack } from '@/layouts/Primitives';
import { cn, formatCategory } from '@/lib/utils';
import { FilterButton } from './FilterButton';

interface FilterBarProps {
  categories: string[];
}

export function FilterBar({ categories }: FilterBarProps) {
  const [activeCategory, setActiveCategory] = useSearchParam('category', 'All');

  return (
    <Box width="full" overflowX="auto" className="no-scrollbar" paddingY={2}>
      <Box border radius="full" surface="muted" className="min-w-max">
        <Stack direction="row" gap={1} padding={1} className="min-w-max">
          {categories.map((cat) => (
            <FilterButton
              key={cat}
              label={formatCategory(cat)}
              onClick={() => setActiveCategory(cat)}
              isActive={activeCategory === cat}
              className={cn(
                'whitespace-nowrap px-3',
                activeCategory === cat
                  ? 'bg-surface text-text-main border-transparent'
                  : 'text-text-dim border-transparent hover:text-text-main hover:bg-transparent'
              )}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
