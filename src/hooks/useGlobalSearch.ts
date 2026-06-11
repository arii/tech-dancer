import { useCallback } from 'react';
import { useSearchParam } from './useSearchParam';

export function useGlobalSearch() {
  const [query, setQuery] = useSearchParam('q');
  const [searchState, setSearchState] = useSearchParam('modal');
  
  const isOpen = searchState === 'true';

  const open = useCallback(() => {
    setSearchState('true');
  }, [setSearchState]);

  const close = useCallback(() => {
    setSearchState('');
  }, [setSearchState]);

  return {
    query,
    setQuery,
    isOpen,
    open,
    close
  };
}

