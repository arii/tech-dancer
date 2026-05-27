import { useSearchParam } from '@/hooks/useSearchParam';
import { Box, Stack } from '@/layouts/Primitives';
import { FilterButton } from './FilterButton';

interface FilterBarProps {
  categories: string[];
}

export function FilterBar({ categories }: FilterBarProps) {
  const [activeCategory, setActiveCategory] = useSearchParam('category', 'All');

  const toTitleCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <Box
      width="full"
      position="sticky"
      zIndex={40}
      className="bg-bg/80 backdrop-blur-md top-16 lg:top-0"
      paddingY={4}
    >
      <Box
        className="bg-slate-900/50 border border-white/5 rounded-xl p-1 max-w-fit mx-auto overflow-hidden"
      >
        <Stack
          direction="row"
          gap={1}
          className="overflow-x-auto no-scrollbar max-w-[calc(100vw-2rem)] sm:max-w-none"
        >
          {categories.map((cat) => (
            <FilterButton
              key={cat}
              label={toTitleCase(cat)}
              onClick={() => setActiveCategory(cat)}
              isActive={activeCategory === cat}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
