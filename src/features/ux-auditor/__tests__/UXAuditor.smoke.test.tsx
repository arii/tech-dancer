import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UXAuditor from '@/pages/UXAuditor';

// Mock useUXAuditor hook
vi.mock('@/features/ux-auditor/useUXAuditor', () => ({
  useUXAuditor: () => ({
    reports: [],
    isAnalyzing: false,
    activeReport: null,
    setActiveReport: vi.fn(),
    url: 'https://example.com',
    setUrl: vi.fn(),
    customApiKey: '',
    setCustomApiKey: vi.fn(),
    snapshotService: '',
    setSnapshotService: vi.fn(),
    isCopiedMarkdown: false,
    isExportingToGithub: false,
    runUXAudit: vi.fn(),
    exportToGithub: vi.fn(),
    copyMarkdown: vi.fn(),
  }),
  VIEWPORTS: [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1440, height: 900 },
  ],
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('UXAuditor Smoke Test', () => {
  it('renders without crashing', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UXAuditor />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText(/Multimodal AI Analysis/i)).toBeDefined();
    expect(screen.getByLabelText(/URL to audit/i)).toBeDefined();
  });
});
