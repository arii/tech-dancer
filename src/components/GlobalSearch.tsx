import { Search, X, Hash, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { useRef, useEffect, useMemo, useCallback } from 'react';
import { getHighlightedParts, escapeRegExp } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { highlightVariants } from '@/lib/variants';
import { useHotkeys, useCommandKey } from '@/hooks/useHotkeys';

interface SearchResult {
  type: 'post' | 'resource' | 'study';
  slug: string;
  title: string;
  excerpt: string;
}

export function GlobalSearch() {
  const { query, setQuery, results, isOpen, open, close } = useGlobalSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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
  // 3. The Keyboard Escape Hatch: Close on ESC key
  useHotkeys('Escape', () => {
    if (isOpen) close();
  }, [isOpen, close]);

  // Global Shortcut: Ctrl+K or Cmd+K to open search
  useCommandKey('k', (e) => {
    e.preventDefault();
    open();
  }, [open]);

  const handleSelect = (result: SearchResult) => {
    // 4. Link Click Delegation: Immediate Feedback
    close();
    setQuery('');
    if (result.type === 'post') navigate(`/blog/${result.slug}`);
    else if (result.type === 'resource') navigate(`/gear/${result.slug}`);
    else if (result.type === 'study') navigate(`/research/${result.slug}`);
  };


  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      inset="y"
      zIndex="search"
      display="flex"
      justify="center"
      align="start"
      paddingTop={20}
      surface={false}
      data-testid="search-backdrop"
      className="bg-accent/40 backdrop-blur-md left-0 right-0 lg:left-72"
      // 2. The Backdrop Escape Hatch: Clicking the background closes the search
      onClick={close}
    >
      <Box
        width="full"
        maxWidth="3xl"
        height="fit"
        maxHeight="85vh"
        overflow="hidden"
        surface="default"
        border
        shadow="topOverlay"
        className="border-accent/20"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <Box border="b" padding={6} display="flex" align="center" gap={4} className="relative">
          <Search className="w-6 h-6 text-accent shrink-0" />
          <Text
            as="input"
            ref={inputRef}
            type="text"
            placeholder="SEARCH REPOSITORY // FILTER BLOG & GEAR"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            width="full"
            variant="display"
            size="2xl"
            color="main"
            className="border-none outline-none focus:ring-0 placeholder:text-text-dim/30"
            autoFocus
          />
          <Box 
            as="button"
            type="button"
            aria-label="Close search"
            onClick={close}
            padding={2}
            cursor="pointer"
            className="group hover:bg-accent/5 transition-colors border border-line/50"
          >
            <X className="w-6 h-6 text-text-dim group-hover:text-accent" />
          </Box>
        </Box>

        <Box padding={3} overflow="y-auto" maxHeight="60vh" surface="default">
          {results.length > 0 ? (
            <Stack gap={2}>
              {results.map((res: SearchResult) => (
                <Box 
                  key={`${res.type}-${res.slug}`}
                  as="button"
                  type="button"
                  data-testid="search-result"
                  onClick={() => handleSelect(res)}
                  width="full"
                  padding={3}
                  display="flex"
                  align="start"
                  gap={4}
                  surface="default"
                  border
                  cursor="pointer"
                  className="hover:bg-accent/5 group transition-colors"
                >
                   <Box border padding={2} surface="muted" radius="sm" className="shrink-0">
                      <Hash className="w-4 h-4 text-accent opacity-50" />
                   </Box>
                   <Stack gap={1} flex className="min-w-0">
                      <Box display="flex" align="center" justify="between" gap={3}>
                         <Text variant="display" size="lg" className="group-hover:text-accent truncate">{highlight(res.title)}</Text>
                         <Box border paddingX={2} paddingY={0.5} radius="none" className="bg-accent/5 shrink-0">
                            <Text variant="mono" size="micro" color="brand">{res.type.toUpperCase()}</Text>
                          </Box>
                      </Box>
                      <Text variant="body" size="xs" color="dim" className="line-clamp-1 truncate">{highlight(res.excerpt)}</Text>
                   </Stack>
                   <CornerDownLeft className="w-4 h-4 opacity-0 group-hover:opacity-30 transition-opacity" />
                </Box>
              ))}
            </Stack>
          ) : (
            <Box paddingY={20} display="flex" align="center" justify="center">
              <Stack align="center" gap={6} className="text-center">
                <Box className="relative">
                  <Search className="w-16 h-16 text-line" strokeWidth={1} />
                  <Sparkles className="w-6 h-6 text-accent absolute -top-2 -right-2 animate-pulse" />
                </Box>
                <Stack gap={2}>
                  <Text variant="display" size="xl">No Matches Found</Text>
                  <Text variant="body" size="sm" color="dim" className="max-w-xs">
                    Your query did not return any results in the repository.
                  </Text>
                </Stack>
                <Box 
                  as="button"
                  onClick={() => setQuery('')}
                  paddingX={4}
                  paddingY={2}
                  radius="md"
                  border
                  className="text-xs font-mono font-bold hover:bg-bg transition-colors"
                >
                  RESET FILTERS
                </Box>
              </Stack>
            </Box>
          )}
        </Box>

        <Box border="t" paddingX={6} paddingY={3} surface="muted" display="flex" justify="between" align="center">
           <Box display="flex" align="center" gap={6}>
              <Box display="flex" align="center" gap={2}>
                 <Box border paddingX={1.5} paddingY={0.5} radius="sm" surface="default" display="flex" align="center" justify="center">
                    <Text variant="mono" size="tiny" color="dim" className="leading-none">ESC</Text>
                 </Box>
                 <Text variant="mono" size="micro" color="dim" className="leading-none">CLOSE</Text>
              </Box>
              <Box display="flex" align="center" gap={2}>
                 <Box border paddingX={1.5} paddingY={0.5} radius="sm" surface="default" display="flex" align="center" justify="center">
                    <Text variant="mono" size="tiny" color="dim" className="leading-none">↵</Text>
                 </Box>
                 <Text variant="mono" size="micro" color="dim" className="leading-none">SELECT</Text>
              </Box>
           </Box>
            <Text variant="mono" size="micro" color="dim" weight="font-bold" tracking="widest">
              {results.length} RESULTS FOUND
            </Text>
        </Box>
      </Box>
    </Box>
  );
}
