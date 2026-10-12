import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Privacy from '../Privacy';

vi.mock('@/components/SEO', () => ({
  SEO: () => <div data-testid="mock-seo" />
}));

describe('Privacy Policy Page Component', () => {
  it('renders the page header and main clauses', () => {
    render(
      <MemoryRouter>
        <Privacy />
      </MemoryRouter>
    );

    expect(screen.getByTestId('privacy-policy-page')).toBeTruthy();
    expect(screen.getByRole('heading', { level: 1, name: /Privacy Policy/i })).toBeTruthy();
    expect(screen.getByText(/Information We Collect/i)).toBeTruthy();
    expect(screen.getByText(/How We Use Your Data/i)).toBeTruthy();
    expect(screen.getByText(/Data Sharing & Non-Disclosure/i)).toBeTruthy();
    expect(screen.getByText(/Security Measures/i)).toBeTruthy();
    expect(screen.getByText(/anders.ariel@gmail.com/i)).toBeTruthy();
  });
});
