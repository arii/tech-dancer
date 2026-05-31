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
    <Box position="relative" width="full" className="group">
      <Box
        border="b"
        width="full"
        position="sticky"
        zIndex={40}
        overflowX="auto"
        className="bg-bg/80 backdrop-blur-md top-16 lg:top-0 no-scrollbar relative"
        paddingY={4}
      >
        <Stack direction="row" gap={2} className="min-w-max" paddingX={1} paddingRight={12}>
          {categories.map((cat) => (
          <FilterButton
            key={cat}
            label={formatCategory(cat)}
            onClick={() => setActiveCategory(cat)}
            isActive={activeCategory === cat}
            className={cn(
              "transition-all duration-300 text-sm whitespace-nowrap px-3",
              activeCategory === cat
                ? "text-accent border-accent/60 bg-accent/10"
                : "text-text-dim border-transparent hover:text-text-main hover:border-line"
            )}
          />
          ))}
        </Stack>
      </Box>

      {/* Scroll Affordance Fade */}
      <Box
        position="absolute"
        top={0}
        right={0}
        bottom={0}
        width={12}
        zIndex={50}
        className="bg-gradient-to-l from-bg via-bg/80 to-transparent pointer-events-none lg:hidden"
      />
    </Box>
  );
}
