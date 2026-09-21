import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { GearCard } from '@/components/ui/GearCard';
import { PageHeader } from '@/components/ui/PageHeader';

describe('GearCard UI audit fixes', () => {
  const sampleProps = {
    slug: 'test-gear-item',
    title: 'Test Gear Item',
    category: 'Dance Gear',
    excerpt: 'An awesome dance gear excerpt for testing purposes.',
    verdict: 'Social Dancing',
    image: '/assets/test.jpg',
  };

  it('renders gear card title with h2 heading element for proper heading order', () => {
    render(
      <MemoryRouter>
        <GearCard {...sampleProps} />
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeDefined();
    expect(heading.textContent).toContain('Test Gear Item');
  });

  it('does not render redundant category pill badge on card image', () => {
    const { container } = render(
      <MemoryRouter>
        <GearCard {...sampleProps} />
      </MemoryRouter>
    );

    // Verify there is no absolute category badge inside the image box
    const badgeText = container.querySelector('.bg-accent.text-bg');
    expect(badgeText).toBeNull();
  });

  it('does not render "Best for:" pre-heading text', () => {
    render(
      <MemoryRouter>
        <GearCard {...sampleProps} />
      </MemoryRouter>
    );

    expect(screen.queryByText(/Best for:/i)).toBeNull();
  });
});

describe('PageHeader pre-heading styling', () => {
  it('renders PageHeader label with readable dim color', () => {
    render(
      <PageHeader label="GEAR & REVIEWS" title="Gear Reviews" />
    );

    const labelText = screen.getByText('GEAR & REVIEWS');
    expect(labelText).toBeDefined();
    expect(labelText.className).toContain('text-text-dim');
  });
});
