import { useSearchParam } from '@/hooks/useSearchParam';
import { Box, Stack } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  categories: string[];
}

export function FilterBar({ categories }: FilterBarProps) {
  const [activeCategory, setActiveCategory] = useSearchParam('category', 'All');

  return (
    <Box position="relative" border="b" className="w-full bg-surface/80 backdrop-blur-md sticky top-16 lg:top-0 z-40" paddingY={5}>
      <Box className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-surface/80 to-transparent pointer-events-none z-10 sm:hidden" />
      <Box className="overflow-x-auto no-scrollbar pr-8 sm:pr-0">
        <Stack direction="row" gap={4} className="min-w-max">
          {categories.map((cat) => (
            <Box
            key={cat}
            as="button"
            onClick={() => setActiveCategory(cat)}
            paddingX={6}
            paddingY={2}
            radius="none"
            className={cn(
              "transition-all duration-300 border text-sm font-bold min-h-[44px] min-w-[44px]",
              activeCategory === cat
                ? "bg-text-main text-bg border-text-main"
                : "bg-bg text-text-dim border-line hover:border-accent hover:text-accent"
            )}
          >
              {cat === 'All' ? 'All Posts' : cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
