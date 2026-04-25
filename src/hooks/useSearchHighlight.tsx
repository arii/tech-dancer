import { useMemo, useCallback } from 'react';
import { Box } from '@/layouts/Primitives';
import { escapeRegExp, getHighlightedParts } from '@/lib/utils';

export function useSearchHighlight(query: string) {
  // Memoize the search regex to avoid re-instantiation on every render during query updates.
  const searchRegex = useMemo(() => {
    if (!query) return null;
    return new RegExp(`(${escapeRegExp(query)})`, 'gi');
  }, [query]);

  const highlight = useCallback((text: string) => {
    const parts = getHighlightedParts(text, query, searchRegex);
    if (parts.length === 1) return text;

    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <Box as="span" key={i} radius="industrial" paddingX={0.5} className="text-accent bg-accent/10">{part}</Box>
        : part
    );
  }, [searchRegex, query]);

  return { highlight };
}
