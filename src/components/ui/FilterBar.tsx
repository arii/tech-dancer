import { useSearchParam } from '@/hooks/useSearchParam';
import { Box, Stack } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  categories: string[];
}

export function FilterBar({ categories }: FilterBarProps) {
  const [activeCategory, setActiveCategory] = useSearchParam('category', 'All');

  return (
    <Box className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-line/80 bg-surface/70 p-3 shadow-sm sticky top-16 lg:top-0 z-40" paddingY={3}>
      <Stack direction="row" gap={2} wrap className="w-full">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          const label = cat === 'All' ? 'All Posts' : cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          
          return (
            <Box
              key={cat}
              as="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                isActive 
                  ? "border-secondary bg-secondary text-bg shadow-sm" 
                  : "border-line bg-bg/40 text-text-dim hover:border-primary/40 hover:bg-bg/70 hover:text-text-main"
              )}
            >
              {label}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
