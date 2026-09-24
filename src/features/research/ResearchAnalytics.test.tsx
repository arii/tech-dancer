import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi } from 'vitest';
import ResearchAnalytics from './ResearchAnalytics';

vi.mock('@/components/SEO', () => ({
  SEO: () => null,
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{ui}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe('ResearchAnalytics', () => {
  it('renders section headers as h2 and tool titles as h3 in proper heading order', () => {
    renderWithProviders(<ResearchAnalytics />);

    const mainHeader = screen.getByRole('heading', { level: 1, name: /experiments/i });
    expect(mainHeader).toBeDefined();

    const h2Headers = screen.getAllByRole('heading', { level: 2 });
    expect(h2Headers.map(h => h.textContent)).toEqual(['Live Tools', 'Active Experiments']);

    const h3Headers = screen.getAllByRole('heading', { level: 3 });
    expect(h3Headers.length).toBeGreaterThan(0);
    expect(h3Headers.map(h => h.textContent)).toContain('VersionTruth');
    expect(h3Headers.map(h => h.textContent)).toContain('Visual Regression & UX Auditor');
    expect(h3Headers.map(h => h.textContent)).toContain('WCS Navigator');
  });

  it('does not render redundant status badges or LIVE UTILITY pre-headings inside Live Tool cards', () => {
    renderWithProviders(<ResearchAnalytics />);

    expect(screen.queryByText('● LIVE UTILITY')).toBeNull();
    expect(screen.queryByText('● PRODUCTION SANDBOX')).toBeNull();
  });
});
