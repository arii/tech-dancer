import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Memes from '../../src/pages/Memes';

// Mock SEO component to avoid HelmetProvider requirement in tests
vi.mock('@/components/SEO', () => ({
  SEO: () => <div data-testid="mock-seo" />,
}));

describe('Memes page component', () => {
  it('should render the page title, description, and list of memes', () => {
    render(<Memes />);

    // Check that header renders
    const titleElement = screen.getByText('West Coast Swing Memes');
    expect(titleElement).toBeDefined();

    // Check that individual meme titles render
    expect(screen.getByText('The WCS Slot')).toBeDefined();
    expect(screen.getByText('WCS Spectating Preference')).toBeDefined();
    expect(screen.getByText('West Coast Swing Connection')).toBeDefined();
    expect(screen.getByText('Workshop vs Social Floor')).toBeDefined();
    expect(screen.getByText('Safe from Dips and Drops')).toBeDefined();

    // Check that meme card elements exist via data-testid
    expect(screen.getByTestId('meme-card-9c2lc9')).toBeDefined();
    expect(screen.getByTestId('meme-card-9buj8i')).toBeDefined();
    expect(screen.getByTestId('meme-card-a0hmu1')).toBeDefined();
    expect(screen.getByTestId('meme-card-9hz3zx')).toBeDefined();
    expect(screen.getByTestId('meme-card-9hz3pj')).toBeDefined();
  });
});
