import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Hash, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { highlightVariants } from '@/lib/variants';

export function GlobalSearch() {
  const { query, setQuery, results } = useGlobalSearch();
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOpenSearch = () => setIsOpen(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener('open-search', handleOpenSearch);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('open-search', handleOpenSearch);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelect = (result: any) => {
    setIsOpen(false);
    setQuery('');
    if (result.type === 'post') navigate(`/blog/${result.slug}`);
    else if (result.type === 'resource') navigate(`/gear/${result.slug}`);
    else if (result.type === 'study') navigate(`/research/${result.slug}`);
  };

  return (
    <>
      {/* Search Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <Box 
            as={motion.div}
            data-testid="search-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            position="fixed"
            inset
            zIndex="overlay"
            display="flex"
            justify="center"
            paddingTop={40}
            surface={false}
            className="bg-accent/40 backdrop-blur-md"
            onClick={(e: React.MouseEvent) => {
              setIsOpen(false);
            }}
          >
            <Box 
              as={motion.div}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              width="full"
              maxWidth="3xl"
              height="fit"
              maxHeight="85vh"
              overflow="hidden"
              surface="default"
              border
              className="shadow-[0_64px_128px_-16px_rgba(0,0,0,0.3)] border-accent/20"
            >
              <Box border="b" padding={6} display="flex" align="center" gap={4} className="relative">
                <Search className="w-6 h-6 text-accent-brand shrink-0" />
                <Box 
                  as="input"
                  ref={inputRef}
                  type="text"
                  placeholder="SEARCH REPOSITORY // FILTER BLOG & GEAR"
                  value={query}
                  onChange={(e: any) => setQuery(e.target.value)}
                  width="full"
                  variant="display"
                  size="2xl"
                  className="bg-transparent border-none outline-none focus:ring-0 placeholder:text-text-dim/30 text-text-main"
                  autoFocus
                />
                <Box 
                  as="button" 
                  aria-label="Close search"
                  onClick={() => setIsOpen(false)} 
                  padding={2}
                  className="group hover:bg-accent/5 transition-colors border border-line/50"
                >
                  <X className="w-6 h-6 text-text-dim group-hover:text-accent-brand" />
                </Box>
              </Box>

              <Box padding={3} overflow="y-auto" maxHeight="60vh" className="bg-white">
                {results.length > 0 ? (
                  <Stack gap={2}>
                    {results.map((res: any) => {
                      const highlight = (text: string) => {
                        if (!query) return text;
                        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                        const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));
                        return parts.map((part, i) =>
                          part.toLowerCase() === query.toLowerCase()
                            ? <span key={i} className={highlightVariants({ intent: 'default' })}>{part}</span>
                            : part
                        );
                      };

                      return (
                        <Box
                          key={`${res.type}-${res.slug}`}
                          as="button"
                          data-testid="search-result"
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
                                <Text variant="display" size="lg" className="group-hover:text-accent-brand truncate">
                                  {highlight(res.title)}
                                </Text>
                                <Box border paddingX={2} paddingY={0.5} radius="none" className="bg-accent/5 shrink-0">
                                    <Text variant="mono" size="micro" color="brand">{res.type.toUpperCase()}</Text>
                                </Box>
                              </Box>
                              <Text variant="body" size="xs" color="dim" className="line-clamp-1 truncate">
                                {highlight(res.excerpt)}
                              </Text>
                          </Stack>
                          <CornerDownLeft className="w-4 h-4 opacity-0 group-hover:opacity-30 transition-opacity" />
                        </Box>
                      );
                    })}
                  </Stack>
                ) : (
                  <Box paddingY={20} display="flex" align="center" justify="center">
                    <Stack align="center" gap={6} className="text-center">
                      <Box className="relative">
                        <Search className="w-16 h-16 text-line" strokeWidth={1} />
                        <Sparkles className="w-6 h-6 text-accent-brand absolute -top-2 -right-2 animate-pulse" />
                      </Box>
                      <Stack gap={2}>
                        <Text variant="display" size="xl">No Matches Found</Text>
                        <Text variant="body" size="sm" color="dim" className="max-w-xs">
                          Your query did not return any components from the tech-dancer repository.
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
        )}
      </AnimatePresence>
    </>
  );
}
