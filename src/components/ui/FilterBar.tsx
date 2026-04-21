import { useSearchParams } from 'react-router-dom';
import { Box, Stack } from '@/layouts/Primitives';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  categories: string[];
}

export function FilterBar({ categories }: FilterBarProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';

  const onSelect = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    setSearchParams(params, { replace: true });
  };

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
              "transition-all duration-300 border text-sm font-bold tracking-tight",
              activeCategory === cat
                ? "bg-accent text-white border-accent shadow-sm"
                : "bg-bg text-text-dim border-line hover:border-accent hover:text-accent"
            )}
          >
            {cat === 'All' ? 'All Posts' : cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
