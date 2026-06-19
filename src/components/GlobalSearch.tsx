import React from "react";
// impeccable-ignore-file
import { Search, X, CornerDownLeft, Sparkles } from 'lucide-react';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { getHighlightedParts } from '@/lib/utils';
import { useRef, useCallback, useEffect, ChangeEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { useHotkeys } from '@/hooks/useHotkeys';
import Fuse from 'fuse.js';
import { useQueries } from '@tanstack/react-query';
import { getPosts, getStudies } from '@/lib/content';
import { withSimulationDelay } from '@/lib/utils';

interface SearchResult {
  type: 'post' | 'blog' | 'study';
  slug: string;
  title: string;
  excerpt: string;
}

export function GlobalSearch() {
  const { query, setQuery, isOpen, close } = useGlobalSearch();
  
  const [postsQuery, studiesQuery] = useQueries({
    queries: [
      { queryKey: ['posts'], queryFn: withSimulationDelay(getPosts), enabled: isOpen },
      { queryKey: ['studies'], queryFn: withSimulationDelay(getStudies), enabled: isOpen },
    ],
  });

  const allContent = [
    ...(postsQuery.data || []),
    ...(studiesQuery.data || []).map(s => ({ ...s, type: 'study' as const }))
  ];

  const fuse = new Fuse(allContent, {
    keys: [
      { name: 'title', weight: 0.7 },
      { name: 'tags', weight: 0.5 },
      { name: 'excerpt', weight: 0.3 },
      { name: 'content', weight: 0.1 }
    ],
    threshold: 0.2,
    ignoreLocation: true
  });

  const results: SearchResult[] = !query.trim() ? [] : fuse.search(query).map(result => result.item) as SearchResult[];

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Debounced URL sync to avoid excessive navigation and re-renders
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);


  const debouncedSetQuery = (q: string) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      setQuery(q);
    }, 300);
  };

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

  const handleSelect = (result: SearchResult) => {
    close();
    setQuery('');
    if (result.type === 'post' || result.type === 'blog') navigate(`/blog/${result.slug}`);
    else if (result.type === 'study') navigate(`/research/${result.slug}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {/* Backdrop */}
      <div
        data-testid="search-backdrop"
        className="absolute inset-0 bg-bg/80 backdrop-blur-md pointer-events-auto"
        onClick={close}
      />

      {/* Modal Container */}
      <div className="relative flex justify-center items-start w-full h-full pt-4 lg:pt-20 px-4">
        <section
          role="dialog"
          data-testid="search-dialog"
          aria-modal="true"
          aria-label="Search BoomTick"
          className="w-full max-w-3xl h-fit max-h-[85vh] overflow-hidden rounded-lg border shadow-[0_0_40px_rgba(0,0,0,0.1)] bg-surface/90 backdrop-blur-2xl border-accent/20 pointer-events-auto outline-none flex flex-col"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
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
          <div className="border-b border-line p-5 flex items-center gap-4 relative focus-within:ring-1 focus-within:ring-accent/50 focus-within:bg-accent/5 transition-all">
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
            <button
              type="button"
              aria-label="Close search"
              onClick={close}
              className="p-1.5 rounded-sm cursor-pointer border group hover:bg-accent/10 transition-colors border-line/50"
            >
              <X className="w-4 h-4 text-text-dim group-hover:text-accent" aria-hidden="true" />
            </button>
          </div>

          <div className="p-2 overflow-y-auto max-h-[60vh]">
            {results.length > 0 ? (
              <Stack gap={1}>
                {results.map((res: SearchResult) => (
                  <button
                    key={`${res.type}-${res.slug}`}
                    type="button"
                    data-testid="search-result"
                    onClick={() => handleSelect(res)}
                    className="w-full px-4 py-3 flex items-center gap-4 rounded-md cursor-pointer hover:bg-accent/10 group transition-colors text-left"
                  >
                     <Stack gap={0.5} flex className="min-w-0">
                        <div className="flex items-center gap-3">
                           <Text size="base" weight="font-bold" className="group-hover:text-accent truncate">{highlight(res.title)}</Text>
                           <div className="border px-2 py-1 bg-accent/10 shrink-0 border-accent/30 rounded-none">
                              <Text variant="mono" size="micro" color="accent" uppercase weight="font-bold" tracking="widest">{res.type}</Text>
                           </div>
                        </div>
                        <Text variant="body" size="xs" color="dim" opacityVariant="heavy" className="line-clamp-1 truncate">{highlight(res.excerpt)}</Text>
                     </Stack>
                     <CornerDownLeft className="w-4 h-4 text-accent opacity-0 group-hover:opacity-dim transition-opacity" />
                  </button>
                ))}
              </Stack>
            ) : (
              <div className="p-20 flex items-center justify-center">
                <Stack align="center" gap={4} opacityVariant="dim">
                  <Sparkles className="w-10 h-10 text-accent animate-pulse" />
                  <Text variant="mono" size="tiny" color="dim" tracking="widest" uppercase weight="font-bold">
                     {query ? "No results found" : "Search gear, guides, and posts"}
                  </Text>
                </Stack>
              </div>
            )}
          </div>

          <div className="border-t px-5 py-3 bg-surface-alt flex justify-between items-center pb-safe-area-search">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="border px-1.5 py-0.5 rounded-sm bg-surface flex items-center justify-center border-line">
                  <Text variant="mono" size="tiny" color="dim" className="leading-none">ESC</Text>
                </div>
                <Text variant="mono" size="micro" color="dim" opacityVariant="high" className="leading-none">CLOSE</Text>
              </div>
              <div className="flex items-center gap-2">
                <div className="border px-1.5 py-0.5 rounded-sm bg-surface flex items-center justify-center border-line">
                  <Text variant="mono" size="tiny" color="dim" className="leading-none font-bold">↵</Text>
                </div>
                <Text variant="mono" size="micro" color="dim" opacityVariant="high" className="leading-none">SELECT</Text>
              </div>
            </div>
            <Text
              variant="mono"
              size="micro"
              color="dim"
              weight="font-bold"
              tracking="widest"
              opacityVariant="high"
              className="whitespace-nowrap"
              data-testid="search-results-count"
            >
              {results.length} RESULTS FOUND
            </Text>
          </div>
        </section>
      </div>
    </div>
    );
}
