import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Hash, CornerDownLeft } from 'lucide-react';
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex justify-center pt-40 bg-accent/40 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="w-full max-w-3xl h-fit max-h-[85vh] overflow-hidden bg-surface border border-line shadow-[0_64px_128px_-16px_rgba(0,0,0,0.3)] border-accent/20"
            >
              <div className="border-b border-line p-6 flex items-center gap-4 relative">
                <Search className="w-6 h-6 text-accent-brand shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="SEARCH REPOSITORY // FILTER BLOG & GEAR"
                  value={query}
                  onChange={(e: any) => setQuery(e.target.value)}
                  className="w-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-text-dim/30 text-text-main font-display font-bold uppercase tracking-tight leading-none text-2xl"
                  autoFocus
                />
                <button
                  onClick={() => setIsOpen(false)} 
                  className="p-2 group hover:bg-accent/5 transition-colors border border-line/50 cursor-pointer"
                >
                  <X className="w-6 h-6 text-text-dim group-hover:text-accent-brand" />
                </button>
              </div>

              <div className="p-3 overflow-y-auto max-h-[60vh] bg-white">
                {results.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {results.map((res: any) => (
                      <button
                        key={`${res.type}-${res.slug}`}
                        onClick={() => handleSelect(res)}
                        className="w-full p-3 flex items-center gap-4 bg-surface border border-line hover:bg-accent/5 group transition-colors text-left cursor-pointer"
                      >
                         <div className="shrink-0 border border-line p-2 bg-muted rounded-sm">
                            <Hash className="w-4 h-4 text-accent-brand opacity-50" />
                         </div>
                         <div className="flex flex-col gap-1 flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-3">
                               <span className="font-display font-bold uppercase tracking-tight leading-none text-lg group-hover:text-accent-brand truncate">{res.title}</span>
                               <div className="bg-accent/5 shrink-0 border border-line px-2 py-0.5">
                                  <span className="font-mono uppercase tracking-widest text-[8px] text-accent-brand font-bold">{res.type.toUpperCase()}</span>
                                </div>
                            </div>
                            <span className="font-sans leading-relaxed text-text-body text-xs text-text-dim line-clamp-1 truncate">{res.excerpt}</span>
                         </div>
                         <CornerDownLeft className="w-4 h-4 opacity-0 group-hover:opacity-30 transition-opacity" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 flex items-center justify-center opacity-30">
                    <div className="flex flex-col items-center gap-4">
                      <Search className="w-12 h-12 opacity-20" />
                      <span className="font-mono tracking-widest uppercase text-xs text-text-dim">Calibrating Variance...</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-line px-6 py-3 bg-muted flex justify-between items-center bg-surface/50">
                 <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                       <div className="bg-bg text-text-dim text-[10px] font-mono leading-none flex items-center justify-center border border-line px-1.5 py-0.5 rounded-sm">ESC</div>
                       <span className="font-mono uppercase tracking-widest text-[8px] text-text-dim leading-none">CLOSE</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="bg-bg text-text-dim text-[10px] font-mono leading-none flex items-center justify-center border border-line px-1.5 py-0.5 rounded-sm">↵</div>
                       <span className="font-mono uppercase tracking-widest text-[8px] text-text-dim leading-none">SELECT</span>
                    </div>
                 </div>
                  <span className="font-mono uppercase tracking-widest text-[8px] text-text-dim font-bold tracking-widest">
                    {results.length} RESULTS FOUND
                  </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
