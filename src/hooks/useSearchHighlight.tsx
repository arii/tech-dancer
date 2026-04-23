import { useMemo, useCallback } from 'react';
import { escapeRegExp, getHighlightedParts } from '@/lib/utils';
import { Box } from '@/layouts/Primitives';

export function useSearchHighlight(query: string) {
  const searchRegex = useMemo(() => {
    if (!query) return null;
    return new RegExp(`(${escapeRegExp(query)})`, 'gi');
  }, [query]);

  const highlight = useCallback((text: string) => {
    const parts = getHighlightedParts(text, query, searchRegex);
    if (parts.length <= 1) return text;

    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <Box as="span" key={i} radius="sm" paddingX={0.5} className="text-accent bg-accent/10">{part}</Box>
        : part
    );
  }, [searchRegex, query]);

  return { highlight };
}
