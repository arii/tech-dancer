import { useCallback, useEffect } from 'react';
import { useSearchParam } from './useSearchParam';

export function useGlobalSearch() {
  const [query, setQuery] = useSearchParam('q');
  const [searchState, setSearchState] = useSearchParam('modal');
  
  const isOpen = searchState === 'true' || (searchState === '' && Boolean(query));

  useEffect(() => {
    if (searchState === '' && query) setSearchState('true');
  }, [searchState, query, setSearchState]);

  const open = useCallback(() => {
    setSearchState('true');
  }, [setSearchState]);

  const close = useCallback(() => {
    setSearchState('false');
  }, [setSearchState]);

  return {
    query,
    setQuery,
    isOpen,
    open,
    close
  };
}
