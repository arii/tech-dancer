import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { GearPostDetail } from '../GearPostDetail';
import type { Resource } from '@/lib/content';

describe('GearPostDetail', () => {
  const mockTotePost: Resource = {
    slug: 'slot-era-tote-bag',
    title: 'Slot Era WCS Tote Bag - Canvas West Coast Swing Dance Bag, Black 15x15',
    category: 'Accessories',
    excerpt: 'Show off your West Coast Swing pride with this durable 15" x 15" black canvas tote bag.',
    content: '## Highlights &\n\n- Heavy-Duty Construction\n- Spacious 15" x 15" Capacity',
    date: '2024-06-01',
    author: 'Ariel Anders',
    provider: 'printful',
    shopUrl: 'https://boomtick.printful.me/product/boomtick-slot-era-west-coast-swing-dancer-tote-bag',
  };

  it('renders H2 heading for markdown overview content and omits redundant collection badge when title includes collection name', () => {
    const { container } = render(
      <MemoryRouter>
        <GearPostDetail post={mockTotePost} onBack={() => {}} backLabel="Back to Merch" />
      </MemoryRouter>
    );

    // H1 product title check
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toContain('Slot Era WCS Tote Bag');

    // H2 section heading check from markdown content
    const h2s = container.querySelectorAll('h2');
    expect(h2s.length).toBeGreaterThan(0);

    // Collection badge suppression check: since title includes 'Slot Era', product-badge should be omitted
    const badge = container.querySelector('[data-component="product-badge"]');
    expect(badge).toBeNull();

    // Size card container check
    const sizeCard = container.querySelector('[data-component="product-size-card"]');
    expect(sizeCard).not.toBeNull();
    expect(screen.getByText('Available Sizes:')).toBeTruthy();
    expect(screen.getByText('15" x 15"')).toBeTruthy();
  });

  it('renders collection badge when product title does NOT contain collection name', () => {
    const customPost: Resource = {
      ...mockTotePost,
      title: 'Canvas WCS Tote Bag, Black 15x15',
    };

    const { container } = render(
      <MemoryRouter>
        <GearPostDetail post={customPost} onBack={() => {}} backLabel="Back to Merch" />
      </MemoryRouter>
    );

    const badge = container.querySelector('[data-component="product-badge"]');
    expect(badge).not.toBeNull();
    expect(badge?.textContent).toContain('Slot Era');
  });
});
