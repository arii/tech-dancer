import { useCallback } from 'react';
import { Box } from '@/layouts/Primitives';
import { getHighlightedParts } from '@/lib/utils';

export function useSearchHighlight(query: string) {
  const highlight = useCallback((text: string) => {
    const parts = getHighlightedParts(text, query);
    if (parts.length === 1) return text;

    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <Box as="span" key={i} radius="industrial" paddingX={0.5} surface="accent" weight="font-bold">{part}</Box>
        : part
    );
  }, [query]);

  return { highlight };
}
