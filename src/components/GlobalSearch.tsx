import { motion, AnimatePresence } from 'motion/react';
<<<<<<< HEAD
<<<<<<< HEAD
import { Search, X, Hash, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';
=======
import { Search, X, Hash, ArrowRight, CornerDownLeft } from 'lucide-react';
>>>>>>> 6d3af94 (feat: implement dead code detection and CI cleanup)
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
=======
import { Search, X, Hash, CornerDownLeft } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
>>>>>>> e7f839d (Fix CI pipeline: JSON syntax and dead code (#208))
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { escapeRegExp } from '@/lib/utils';
import { useRef, useMemo, useCallback } from 'react';
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
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Memoize the search regex to avoid re-instantiation on every render during query updates.
  const searchRegex = useMemo(() => {
    if (!query) return null;
    return new RegExp(`(${escapeRegExp(query)})`, 'gi');
  }, [query]);

  // 1. The Context Reset: Close on route change
  // Note: Since isOpen is now derived from URL search params ('search=true'),
  // navigation to a new URL without the 'search' param will automatically
  // "close" the modal (isOpen will become false).

<<<<<<< HEAD
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
=======
  const handleSelect = (result: any) => {
    setIsOpen(false);
>>>>>>> 6d3af94 (feat: implement dead code detection and CI cleanup)
    setQuery('');
    if (result.type === 'post') navigate(`/blog/${result.slug}`);
    else if (result.type === 'resource') navigate(`/gear/${result.slug}`);
    else if (result.type === 'study') navigate(`/research/${result.slug}`);
  };

  const highlight = useCallback((text: string) => {
    if (!searchRegex || !query) return text;
    const parts = text.split(searchRegex);
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <span key={i} className="text-accent bg-accent/10 rounded-sm px-0.5">{part}</span>
        : part
    );
  }, [searchRegex, query]);

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
            <Box padding={12} display="flex" align="center" justify="center" opacity={30}>
              <Stack align="center" gap={4}>
                <Sparkles className="w-12 h-12 opacity-20" />
                <Text variant="mono" size="xs" color="dim">Calibrating Variance...</Text>
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
