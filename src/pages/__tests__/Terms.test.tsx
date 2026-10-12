import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Terms from '../Terms';

vi.mock('@/components/SEO', () => ({
  SEO: () => <div data-testid="mock-seo" />
}));

describe('Terms of Service Page Component', () => {
  it('renders the page header and main clauses', () => {
    render(
      <MemoryRouter>
        <Terms />
      </MemoryRouter>
    );

    expect(screen.getByTestId('terms-of-service-page')).toBeTruthy();
    expect(screen.getByRole('heading', { level: 1, name: /Terms of Service/i })).toBeTruthy();
    expect(screen.getByText(/Acceptance of Terms/i)).toBeTruthy();
    expect(screen.getByText(/Description of Service/i)).toBeTruthy();
    expect(screen.getByText(/User Responsibilities/i)).toBeTruthy();
    expect(screen.getByText(/Intellectual Property/i)).toBeTruthy();
    expect(screen.getByText(/Limitation of Liability/i)).toBeTruthy();
    expect(screen.getByText(/anders.ariel@gmail.com/i)).toBeTruthy();
  });
});
