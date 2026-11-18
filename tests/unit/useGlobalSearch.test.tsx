import { act, cleanup, renderHook } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';

afterEach(cleanup);

const renderSearch = (entry: string) => renderHook(() => ({
  ...useGlobalSearch(),
  location: useLocation(),
}), {
  wrapper: ({ children }) => <MemoryRouter initialEntries={[entry]}>{children}</MemoryRouter>,
});

describe('global search URL state', () => {
  it('opens a direct query link without an explicit modal parameter', () => {
    const { result } = renderSearch('/blog?q=shoes');
    expect(result.current.isOpen).toBe(true);
    expect(result.current.query).toBe('shoes');
  });

  it('keeps a dismissed populated search closed and preserves other filters', () => {
    const { result } = renderSearch('/blog?q=shoes&category=Travel');
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
    const params = new URLSearchParams(result.current.location.search);
    expect(params.get('q')).toBe('shoes');
    expect(params.get('category')).toBe('Travel');
    expect(params.get('modal')).toBe('false');
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
  });

  it('honors a dismissed query after reload', () => {
    const { result } = renderSearch('/blog?q=shoes&modal=false');
    expect(result.current.isOpen).toBe(false);
  });

  it('opens a blank search only when requested', () => {
    const { result } = renderSearch('/');
    expect(result.current.isOpen).toBe(false);
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
  });
});
