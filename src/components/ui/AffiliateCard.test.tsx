import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { AffiliateCard } from './AffiliateCard';
import { AffiliateLink } from '@/types';

describe('AffiliateCard Component', () => {
  beforeEach(() => {
    cleanup();
  });

  const mockLink: AffiliateLink = {
    id: 'compression-cubes',
    name: 'Compression Packing Cubes',
    url: 'https://www.amazon.com/dp/B07XLFXJ7D',
    category: 'travel',
    description: 'Save space and keep outfits organized.',
    image: '/images/gear/sketches/compression-cubes.webp',
  };

  it('renders product title as an h3 heading and description', () => {
    render(<AffiliateCard link={mockLink} />);

    const titleHeading = screen.getByRole('heading', { level: 3, name: 'Compression Packing Cubes' });
    expect(titleHeading).toBeDefined();
    expect(screen.getByText('Save space and keep outfits organized.')).toBeDefined();
  });

  it('renders sponsored external link with accessible label and rel attribute', () => {
    render(<AffiliateCard link={mockLink} />);

    const cardLink = screen.getByRole('link', { name: 'Open Compression Packing Cubes' });
    expect(cardLink).toBeDefined();
    expect(cardLink.getAttribute('href')).toBe('https://www.amazon.com/dp/B07XLFXJ7D');
    expect(cardLink.getAttribute('rel')).toContain('sponsored');
    expect(cardLink.getAttribute('target')).toBe('_blank');
  });

  it('does not render redundant category tag badge', () => {
    render(<AffiliateCard link={mockLink} />);

    const card = screen.getByTestId('affiliate-card');
    expect(card.querySelector('.capitalize')).toBeNull();
  });
});
