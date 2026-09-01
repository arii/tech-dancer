import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUXAuditor } from '../useUXAuditor';
import type { ReactNode } from 'react';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useUXAuditor', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it('initializes default configuration state correctly', () => {
    const { result } = renderHook(() => useUXAuditor(), { wrapper: createWrapper() });

    expect(result.current.selectedViewports).toEqual(['Mobile', 'Tablet', 'Desktop']);
    expect(result.current.selectedFoci).toEqual(['Core Layout & Spacing', 'Accessibility (WCAG)']);
    expect(result.current.selectedPreset).toBe('Flat / Minimal');
    expect(result.current.customApiKey).toBe('');
  });

  it('maintains custom API key strictly in React memory state and does not persist to sessionStorage', () => {
    sessionStorage.setItem('ux-auditor-api-key', 'stale-key-that-should-be-ignored');

    const { result } = renderHook(() => useUXAuditor(), { wrapper: createWrapper() });

    expect(result.current.customApiKey).toBe('');

    act(() => {
      result.current.setCustomApiKey('new-in-memory-api-key');
    });

    expect(result.current.customApiKey).toBe('new-in-memory-api-key');
    expect(sessionStorage.getItem('ux-auditor-api-key')).not.toBe('new-in-memory-api-key');
  });

  it('allows updating viewport, focus, and preset configuration', () => {
    const { result } = renderHook(() => useUXAuditor(), { wrapper: createWrapper() });

    act(() => {
      result.current.setSelectedViewports(['Mobile']);
      result.current.setSelectedFoci(['Typography']);
      result.current.setSelectedPreset('Modern Semi-Flat (Depth/Shadows)');
    });

    expect(result.current.selectedViewports).toEqual(['Mobile']);
    expect(result.current.selectedFoci).toEqual(['Typography']);
    expect(result.current.selectedPreset).toBe('Modern Semi-Flat (Depth/Shadows)');
  });
});
