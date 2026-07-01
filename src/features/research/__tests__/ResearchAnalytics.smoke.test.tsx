import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ResearchAnalytics from '@/features/research/ResearchAnalytics';

// Mock useResearch hook
vi.mock('../useResearch', () => ({
  useResearch: () => ({
    studies: [],
    flagshipTools: [],
    engineeringTools: [],
    dataContentTools: [],
    ecommerceTools: [],
  }),
}));

describe('ResearchAnalytics Smoke Test', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <ResearchAnalytics />
      </MemoryRouter>
    );

    expect(screen.getByText(/DevAI Portfolio/i)).toBeDefined();
    expect(screen.getAllByText(/Flagship Projects/i).length).toBeGreaterThan(0);
  });
});
