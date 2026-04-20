import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Hash, ArrowRight, CornerDownLeft } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export function GlobalSearch() {
  const { query, setQuery, results } = useGlobalSearch();
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOpenSearch = () => setIsOpen(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
      if (e.ctrlKey && e.key === 'k') {
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
    else if (result.type === 'resource') navigate(`/gear`);
    else if (result.type === 'study') navigate(`/research`);
  };

  return (
    <>
      {/* Search Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <Box 
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            position="fixed"
            className="inset-0 z-[9999] bg-accent/40 backdrop-blur-md"
            display="flex"
            justify="center"
            paddingTop={40}
            surface={false}
          >
            <Box 
              as={motion.div}
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              width="full"
              maxWidth="3xl"
              height="fit"
              maxHeight="85vh"
              className="overflow-hidden bg-white shadow-[0_64px_128px_-16px_rgba(0,0,0,0.3)] border border-accent/20"
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
                  onClick={() => setIsOpen(false)} 
                  padding={2}
                  className="group hover:bg-accent/5 transition-colors border border-line/50 touch-target"
                >
                  <X className="w-6 h-6 text-text-dim group-hover:text-accent-brand" />
                </Box>
              </Box>

              <Box padding={3} overflow="y-auto" maxHeight="60vh" className="bg-white">
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
                        className="hover:bg-accent/5 bg-white group transition-colors text-left border border-line min-h-[44px]"
                      >
                         <Box border padding={2} surface="muted" radius="sm" className="shrink-0">
                            <Hash className="w-4 h-4 text-accent-brand opacity-50" />
                         </Box>
                         <Stack gap={1} flex className="min-w-0">
                            <Box display="flex" align="center" justify="between" gap={3}>
                               <Text variant="display" size="lg" className="group-hover:text-accent-brand truncate">{res.title}</Text>
                               <Box border paddingX={2} paddingY={0.5} radius="none" className="bg-accent/5 shrink-0">
                                  <Text variant="mono" size="micro" color="brand">{res.type.toUpperCase()}</Text>
                               </Box>
                            </Box>
                            <Text variant="body" size="xs" color="dim" className="line-clamp-1 truncate">{res.excerpt}</Text>
                         </Stack>
                         <CornerDownLeft className="w-4 h-4 opacity-0 group-hover:opacity-30 transition-opacity" />
                      </Box>
                    ))}
                  </Stack>
                ) : (
                  <Box padding={12} display="flex" align="center" justify="center" opacity={30}>
                    <Stack align="center" gap={4}>
                      <Search className="w-12 h-12 opacity-20" />
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
        )}
      </AnimatePresence>
    </>
  );
}
