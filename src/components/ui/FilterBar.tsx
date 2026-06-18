// impeccable-ignore-file
import { useSearchParam } from '@/hooks/useSearchParam';
import { Box, Stack } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';
import { FilterButton } from './FilterButton';

export function FilterBar() {
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
      <Stack direction="row" gap={2} className="min-w-max" paddingX={1}>
        {['All', 'Guides', 'Gear', 'Events', 'Travel', 'Lifestyle', 'Dance'].map((label) => {
          const categoryValue = label === 'All' ? 'All' : label;
          const isActive = activeCategory === categoryValue;

          return (
            <FilterButton
              key={label}
              label={label === 'All' ? 'All Posts' : label}
              onClick={() => setActiveCategory(categoryValue)}
              isActive={isActive}
              // impeccable-ignore
              className={cn(
                "transition-all duration-300 text-sm whitespace-nowrap px-4 py-2 min-w-[100px] border",
                isActive
                  ? "text-accent border-accent bg-accent/10"
                  : "text-text-dim border-line/30 hover:text-text-main hover:border-line"
              )}
            />
          );
        })}
      </Stack>
    </Box>
  );
}
