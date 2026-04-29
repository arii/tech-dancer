import { Search, X, Hash, CornerDownLeft, Sparkles } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { useSearchHighlight } from '@/hooks/useSearchHighlight';
import { useRef, type MouseEvent, type ChangeEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { useHotkeys, useCommandKey } from '@/hooks/useHotkeys';

interface SearchResult {
  type: 'post' | 'resource' | 'study';
  slug: string;
  title: string;
  excerpt: string;
}

export function GlobalSearch() {
  const { query, setQuery, results, isOpen, open, close } = useGlobalSearch();
  const { highlight } = useSearchHighlight(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // 1. The Context Reset: Close on route change
  // Note: Since isOpen is now derived from URL search params ('search=true'),
  // navigation to a new URL without the 'search' param will automatically
  // "close" the modal (isOpen will become false).

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
        onClick={(e: MouseEvent) => e.stopPropagation()}
      >
        <Stack direction="row" align="center" gap={4} border="b" padding={6} className="relative">
          <Search className="w-6 h-6 text-accent shrink-0" />
          <Text
            as="input"
            ref={inputRef}
            type="text"
            placeholder="SEARCH REPOSITORY // FILTER BLOG & GEAR"
            value={query}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
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
        </Stack>

        <Box padding={3} overflow="y-auto" maxHeight="60vh" surface="default">
          {results.length > 0 ? (
            <Stack gap={2}>
              {results.map((res: SearchResult) => (
                <Stack
                  key={`${res.type}-${res.slug}`}
                  as="button"
                  type="button"
                  data-testid="search-result"
                  onClick={() => handleSelect(res)}
                  width="full"
                  padding={3}
                  direction="row"
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
                      <Stack direction="row" align="center" justify="between" gap={3}>
                         <Text variant="display" size="lg" className="group-hover:text-accent truncate">{highlight(res.title)}</Text>
                         <Box border paddingX={2} paddingY={0.5} radius="none" className="bg-accent/5 shrink-0">
                            <Text variant="mono" size="micro" color="brand">{res.type.toUpperCase()}</Text>
                          </Box>
                      </Stack>
                      <Text variant="body" size="xs" color="dim" className="line-clamp-1 truncate">{highlight(res.excerpt)}</Text>
                   </Stack>
                   <CornerDownLeft className="w-4 h-4 opacity-0 group-hover:opacity-30 transition-opacity" />
                </Stack>
              ))}
            </Stack>
          ) : (
            <Stack padding={12} align="center" justify="center" opacity={30} gap={0}>
              <Stack align="center" gap={4}>
                <Sparkles className="w-12 h-12 opacity-20" />
                <Text variant="mono" size="xs" color="dim">Calibrating Variance...</Text>
              </Stack>
            </Stack>
          )}
        </Box>

        <Stack direction="row" justify="between" align="center" gap={0} border="t" paddingX={6} paddingY={3} surface="muted">
           <Stack direction="row" align="center" gap={6}>
              <Stack direction="row" align="center" gap={2}>
                 <Stack border paddingX={1.5} paddingY={0.5} radius="sm" surface="default" align="center" justify="center" gap={0}>
                    <Text variant="mono" size="tiny" color="dim" className="leading-none">ESC</Text>
                 </Stack>
                 <Text variant="mono" size="micro" color="dim" className="leading-none">CLOSE</Text>
              </Stack>
              <Stack direction="row" align="center" gap={2}>
                 <Stack border paddingX={1.5} paddingY={0.5} radius="sm" surface="default" align="center" justify="center" gap={0}>
                    <Text variant="mono" size="tiny" color="dim" className="leading-none">↵</Text>
                 </Stack>
                 <Text variant="mono" size="micro" color="dim" className="leading-none">SELECT</Text>
              </Stack>
           </Stack>
            <Text variant="mono" size="micro" color="dim" weight="font-bold" tracking="widest">
              {results.length} RESULTS FOUND
            </Text>
        </Stack>
      </Box>
    </Box>
  );
}
