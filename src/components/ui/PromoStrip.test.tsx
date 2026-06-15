import { render, screen, cleanup } from '@testing-library/react';
import { describe, expect, it, afterEach } from 'vitest';
import { PromoStrip } from './PromoStrip';

describe('PromoStrip', () => {
  afterEach(() => {
    cleanup();
  });

  const defaultProps = {
    imageSrc: '/assets/gear/test.webp',
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    ctaLabel: 'Shop Now',
    href: 'https://example.com',
  };

  it('renders all required content correctly', () => {
    render(<PromoStrip {...defaultProps} target="_blank" rel="nofollow" />);

    expect(screen.getByText('Test Title')).toBeTruthy();
    expect(screen.getByText('Test Subtitle')).toBeTruthy();
    expect(screen.getByText('Shop Now')).toBeTruthy();

    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('https://example.com');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('nofollow');
  });

  it('renders the "New" badge when isNew is true', () => {
    render(<PromoStrip {...defaultProps} isNew={true} />);
    expect(screen.getByText('New')).toBeTruthy();
  });

  it('does not render the "New" badge when isNew is false', () => {
    render(<PromoStrip {...defaultProps} isNew={false} />);
    expect(screen.queryByText('New')).toBeNull();
  });
});
