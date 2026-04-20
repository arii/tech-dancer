import { Box, Stack, Text } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  activeCategory: string;
  categories: string[];
  onSelect: (category: string) => void;
}

export function FilterBar({ activeCategory, categories, onSelect }: FilterBarProps) {
  return (
    <Box className="w-full border-b border-slate-200 bg-surface/80 backdrop-blur-md sticky top-0 z-40 overflow-x-auto no-scrollbar" paddingY={5}>
      <Stack direction="row" gap={4} className="min-w-max">
        {categories.map((cat) => (
          <Box
            key={cat}
            as="button"
            onClick={() => onSelect(cat)}
            paddingX={6}
            paddingY={2.5}
            radius="full"
            className={cn(
              "transition-all duration-300 border text-sm font-bold tracking-tight touch-target",
              activeCategory === cat
                ? "bg-accent text-white border-accent shadow-sm"
                : "bg-bg text-text-dim border-line hover:border-accent hover:text-accent"
            )}
          >
            {cat === 'all' ? 'All Posts' : cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
