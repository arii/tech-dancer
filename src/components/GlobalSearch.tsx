import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Hash, CornerDownLeft, Sparkles } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { useHotkeys, useCommandKey } from '@/hooks/useHotkeys';
import { escapeRegExp, getHighlightedParts } from '@/lib/utils';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

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

  // Keyboard Escape Hatch: Close on ESC key
  useHotkeys('Escape', () => {
    if (isOpen) close();
  }, [isOpen, close]);

  // Global Shortcut: Ctrl+K or Cmd+K to open search
  useCommandKey('k', (e) => {
    e.preventDefault();
    open();
  }, [open]);

  const handleSelect = (result: SearchResult) => {
    close();
    setQuery('');
    if (result.type === 'post') navigate(`/blog/${result.slug}`);
    else if (result.type === 'resource') navigate(`/gear/${result.slug}`);
    else if (result.type === 'study') navigate(`/research/${result.slug}`);
  };

  const highlight = useCallback((text: string) => {
    const parts = getHighlightedParts(text, query, searchRegex);
    if (parts.length === 1) return text;

    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <Box as="span" key={i} radius="industrial" paddingX={0.5} className="text-accent bg-accent/10">{part}</Box>
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
      onClick={close}
    >
      <Box
        as={motion.div}
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
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
            onClick={close}
            padding={2}
            className="group hover:bg-accent/5 transition-colors border border-line/50"
          >
            <X className="w-6 h-6 text-text-dim group-hover:text-accent" />
          </Box>
        </Box>

        <Box padding={3} overflow="y-auto" maxHeight="60vh" surface="default">
          {results.length > 0 ? (
            <Stack gap={2}>
              {results.map((res: any) => (
                <Box
                  key={`${res.type}-${res.slug}`}
                  as="button"
                  onClick={() => handleSelect(res)}
                  width="full"
                  padding={3}
                  display="flex"
                  align="center"
                  gap={4}
                  surface="default"
                  border
                  className="hover:bg-accent/5 group transition-colors text-left"
                >
                   <Box border padding={2} surface="muted" radius="sm" className="shrink-0">
                      <Hash className="w-4 h-4 text-accent-brand opacity-50" />
                   </Box>
                   <Stack gap={1} flex className="min-w-0">
                      <Box display="flex" align="center" justify="between" gap={3}>
                         <Text variant="display" size="lg" className="group-hover:text-accent-brand truncate">{highlight(res.title)}</Text>
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

        <Box border="t" paddingX={6} paddingY={3} surface="muted" display="flex" justify="between" align="center" className="bg-surface/50">
           <Box display="flex" align="center" gap={6}>
              <Box display="flex" align="center" gap={2}>
                 <Box border paddingX={1.5} paddingY={0.5} radius="sm" className="bg-bg text-text-dim text-[10px] font-mono leading-none flex items-center justify-center">ESC</Box>
                 <Text variant="mono" size="micro" color="dim" className="leading-none">CLOSE</Text>
              </Box>
              <Box display="flex" align="center" gap={2}>
                 <Box border paddingX={1.5} paddingY={0.5} radius="sm" className="bg-bg text-text-dim text-[10px] font-mono leading-none flex items-center justify-center">↵</Box>
                 <Text variant="mono" size="micro" color="dim" className="leading-none">SELECT</Text>
              </Box>
           </Box>
            <Text variant="mono" size="micro" color="dim" weight="font-bold" className="tracking-widest">
              {results.length} RESULTS FOUND
            </Text>
        </Box>
      </Box>
    </Box>
  );
}
