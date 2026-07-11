import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import VersionTruth from '../../src/pages/VersionTruth';

// Mock SEO component to avoid HelmetProvider requirement in tests
vi.mock('@/components/SEO', () => ({
  SEO: () => <div data-testid="mock-seo" />,
}));

describe('VersionTruth page component', () => {
  it('should render the page title and description', () => {
    render(<VersionTruth />);

    // Check that title renders
    const titleElement = screen.getByText('VersionTruth');
    expect(titleElement).toBeDefined();

    // Check that concept cards render
    expect(screen.getByText('The Fallacy')).toBeDefined();
    expect(screen.getByText('The Remedy')).toBeDefined();
  });
});
