import { Box, Stack, Text } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  activeCategory: string;
  categories: string[];
  onSelect: (category: string) => void;
}

export function FilterBar({ activeCategory, categories, onSelect }: FilterBarProps) {
  return (
    <Box border="b" className="w-full bg-surface/80 backdrop-blur-md sticky top-0 z-40 overflow-x-auto no-scrollbar" paddingY={5}>
      <Stack direction="row" gap={4} className="min-w-max">
        {categories.map((cat) => (
          <Box
            key={cat}
            as="button"
            onClick={() => onSelect(cat)}
            paddingX={6}
            paddingY={2}
            radius="none"
            className={cn(
              "transition-all duration-300 border text-sm font-bold",
              activeCategory === cat
                ? "bg-text-main text-bg border-text-main"
                : "bg-bg text-text-dim border-line hover:border-accent hover:text-accent"
            )}
          >
            <Text variant="mono" size="xs" weight="font-bold">
              {cat === 'All' ? 'All Posts' : cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
