import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { AffiliateCard } from './AffiliateCard';
import { AffiliateLink } from '@/types';

describe('AffiliateCard', () => {
  afterEach(() => {
    cleanup();
  });

  const mockLink: AffiliateLink = {
    id: 'test-item',
    name: 'Travel Compression Packing Cubes',
    description: 'Keep your competition outfits organized and wrinkle-free.',
    url: 'https://amazon.com/dp/example',
    category: 'travel',
    image: '/assets/gear/packing-cubes.webp',
  };

  it('renders product heading with h3 tag for correct accessible hierarchy', () => {
    render(<AffiliateCard link={mockLink} />);

    const heading = screen.getByRole('heading', { level: 3, name: 'Travel Compression Packing Cubes' });
    expect(heading).toBeTruthy();
  });

  it('renders image, description, and link accessibility label', () => {
    render(<AffiliateCard link={mockLink} />);

    expect(screen.getAllByAltText('Travel Compression Packing Cubes').length).toBeGreaterThan(0);
    expect(screen.getByText('Keep your competition outfits organized and wrinkle-free.')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Open Travel Compression Packing Cubes' }).getAttribute('href')).toBe('https://amazon.com/dp/example');
  });

  it('does not render redundant category badge text', () => {
    render(<AffiliateCard link={mockLink} />);

    expect(screen.queryByText('travel')).toBeNull();
  });
});
