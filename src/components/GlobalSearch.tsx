// impeccable-ignore-file
import { Search, X, CornerDownLeft, Sparkles } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { getHighlightedParts } from '@/lib/utils';
import { useRef, useMemo, useCallback, useEffect, ChangeEvent, MouseEvent } from "react";
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

  // Debounced URL sync to avoid excessive navigation and re-renders
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const debouncedSetQuery = useMemo(
    () => (q: string) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(() => {
        setQuery(q);
      }, 300);
    },
    [setQuery]
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSetQuery(e.target.value);
  };

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      close();
    }
  }, [close]);

  // Sync input value with URL query for external changes (back/forward navigation)
  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== query) {
      inputRef.current.value = query;
    }
  }, [query]);

  const highlight = useCallback((text: string) => {
    const parts = getHighlightedParts(text, query);
    if (parts.length === 1) return text;

    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <Box as="span" key={i} className="text-accent underline decoration-accent/30 underline-offset-4">{part}</Box>
        : part
    );
  }, [query]);

  useHotkeys('Escape', () => {
    if (isOpen) close();
  }, [isOpen, close]);

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

  if (!isOpen) return null;

  return (
    <Box
      zIndex={9999}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    >
      {/* Backdrop */}
      <Box
        position="absolute"
        inset={true}
        data-testid="search-backdrop"
        className="bg-bg/80 backdrop-blur-md pointer-events-auto"
        onClick={close}
      />

      {/* Modal Container */}
      <Box
        position="relative"
        display="flex"
        justify="center"
        align="start"
        width="full"
        height="full"
        paddingTop={{ base: 4, lg: 20 }}
        className=""
      >
        <Box
          as="section"
          role="dialog"
          data-testid="search-dialog"
          aria-modal="true"
          aria-label="Search BoomTick"
          width="full"
          maxWidth="3xl"
          height="fit"
          maxHeight="85vh"
          overflow="hidden"
          radius="lg"
          border
          shadow="topOverlay"
          className="bg-surface/90 backdrop-blur-2xl border-accent/20   pointer-events-auto outline-none"
          onClick={(e: MouseEvent) => e.stopPropagation()}
          tabIndex={-1}
          onKeyDown={(e: React.KeyboardEvent) => {
            handleKeyDown(e);
            if (e.key === 'Tab') {
              const dialog = e.currentTarget;
              const focusableElements = Array.from(dialog.querySelectorAll(
                'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
              )).filter(el => {
                const style = window.getComputedStyle(el);
                return style.display !== 'none' && style.visibility !== 'hidden' && (el as HTMLElement).offsetWidth > 0;
              });

              if (focusableElements.length === 0) return;

              const firstElement = focusableElements[0] as HTMLElement;
              const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

              if (e.shiftKey) {
                if (document.activeElement === firstElement || document.activeElement === dialog) {
                  e.preventDefault();
                  lastElement.focus();
                }
              } else {
                if (document.activeElement === lastElement) {
                  e.preventDefault();
                  firstElement.focus();
                }
              }
            }
          }}
        >
          <Box border="b" padding={5} display="flex" align="center" gap={4} className="relative focus-within:ring-1 focus-within:ring-accent/50 focus-within:bg-accent/5 transition-all">
            <Search className="w-5 h-5 text-accent shrink-0" aria-hidden="true" />
            <Text
              as="input"
              ref={inputRef}
              type="text"
              placeholder="Search BoomTick guides, gear, and posts"
              aria-label="Search BoomTick"
              defaultValue={query}
              onChange={handleInputChange}
              width="full"
              variant="sans"
              size="xl"
              weight="font-bold"
              color="main"
              className="bg-transparent border-none outline-none focus:ring-0 placeholder:text-text-dim/50"
              autoFocus
            />
            <Box 
              as="button"
              type="button"
              aria-label="Close search"
              onClick={close}
              padding={1.5}
              radius="sm"
              cursor="pointer"
              border
              className="group hover:bg-accent/10 transition-colors border-line/50"
            >
              <X className="w-4 h-4 text-text-dim group-hover:text-accent" aria-hidden="true" />
            </Box>
          </Box>

          <Box padding={2} overflow="y-auto" maxHeight="60vh">
            {results.length > 0 ? (
              <Stack gap={1}>
                {results.map((res: SearchResult) => (
                  <Box 
                    key={`${res.type}-${res.slug}`}
                    as="button"
                    type="button"
                    data-testid="search-result"
                    onClick={() => handleSelect(res)}
                    width="full"
                    paddingX={4}
                    paddingY={3}
                    display="flex"
                    align="center"
                    gap={4}
                    radius="md"
                    cursor="pointer"
                    className="hover:bg-accent/10 group transition-colors text-left"
                  >
                     <Stack gap={0.5} flex className="min-w-0">
                        <Box display="flex" align="center" gap={3}>
                           <Text size="base" weight="font-bold" className="group-hover:text-accent truncate">{highlight(res.title)}</Text>
                           <Box border paddingX={2} paddingY={1} radius="none" className="border-accent/30 bg-accent/10 shrink-0">
                              <Text variant="mono" size="micro" color="accent" uppercase weight="font-bold" tracking="widest">{res.type}</Text>
                           </Box>
                        </Box>
                        <Text variant="body" size="xs" color="dim" className="line-clamp-1 truncate opacity-80">{highlight(res.excerpt)}</Text>
                     </Stack>
                     <CornerDownLeft className="w-4 h-4 text-accent opacity-0 group-hover:opacity-60 transition-opacity" />
                  </Box>
                ))}
              </Stack>
            ) : (
              <Box padding={20} display="flex" align="center" justify="center">
                <Stack align="center" gap={4} className="opacity-60">
                  <Sparkles className="w-10 h-10 text-accent animate-pulse" />
                  <Text variant="mono" size="tiny" color="dim" tracking="widest" uppercase weight="font-bold">
                     {query ? "No results found" : "Search gear, guides, and posts"}
                  </Text>
                </Stack>
              </Box>
            )}
          </Box>

          <Box border="t" paddingX={5} paddingY={3} surface="alt" display="flex" justify="between" align="center" className="pb-safe-area-search">
            <Box display="flex" align="center" gap={6}>
              <Box display="flex" align="center" gap={2}>
                <Box border paddingX={1.5} paddingY={0.5} radius="industrial" surface="default" display="flex" align="center" justify="center" className="border-line">
                  <Text variant="mono" size="tiny" color="dim" className="leading-none">ESC</Text>
                </Box>
                <Text variant="mono" size="micro" color="dim" className="leading-none opacity-70">CLOSE</Text>
              </Box>
              <Box display="flex" align="center" gap={2}>
                <Box border paddingX={1.5} paddingY={0.5} radius="industrial" surface="default" display="flex" align="center" justify="center" className="border-line">
                  <Text variant="mono" size="tiny" color="dim" className="leading-none font-bold">↵</Text>
                </Box>
                <Text variant="mono" size="micro" color="dim" className="leading-none opacity-70">SELECT</Text>
              </Box>
            </Box>
            <Text
              variant="mono"
              size="micro"
              color="dim"
              weight="font-bold"
              tracking="widest"
              className="opacity-70 whitespace-nowrap"
              data-testid="search-results-count"
            >
              {results.length} RESULTS FOUND
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
    );
}
