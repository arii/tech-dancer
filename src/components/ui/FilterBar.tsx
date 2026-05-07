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
      <Stack direction="row" gap={4} className="min-w-max" paddingX={1}>
        {categories.map((cat) => (
          <Box
            key={cat}
            as="button"
            onClick={() => setActiveCategory(cat)}
            aria-current={activeCategory === cat ? 'page' : undefined}
            className={cn(
              "transition-all duration-300 text-sm font-bold uppercase tracking-wide cursor-pointer whitespace-nowrap min-h-11 px-3 rounded-full",
              activeCategory === cat
                ? "text-accent border border-accent/60 bg-accent/10"
                : "text-text-dim border border-transparent hover:text-text-main hover:border-line"
            )}
          >
            {cat === 'All' ? 'All Posts' : cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
