import { useSearchParam } from '@/hooks/useSearchParam';
import { Box, Stack } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';

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
      <Stack direction="row" gap={6} className="min-w-max">
        {categories.map((cat) => (
          <Box
            key={cat}
            as="button"
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "transition-all duration-300 text-xs font-black uppercase tracking-[0.12em] cursor-pointer whitespace-nowrap",
              activeCategory === cat
                ? "text-accent"
                : "text-text-dim hover:text-text-main"
            )}
          >
            {cat === 'All' ? 'All Posts' : cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
