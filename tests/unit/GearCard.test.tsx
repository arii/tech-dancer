import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { GearCard } from '@/components/ui/GearCard';

describe('GearCard Component', () => {
  const sampleInternalGear = {
    slug: '2023-10-01-loop-earplugs',
    title: 'Loop Experience Earplugs',
    category: 'Earplugs',
    excerpt: 'High fidelity hearing protection for dance events.',
    verdict: 'High-fidelity hearing protection for live dance events',
  };

  const sampleExternalGear = {
    title: 'Slot Era Tote Bag',
    category: 'Accessories',
    excerpt: 'Durable canvas tote bag for dance shoes and gear.',
    verdict: 'Perfect for carrying shoes to social dances',
    affiliateIds: ['slot-era-tote-bag'],
  };

  test('renders product title as h2 for internal items and omits redundant Best for: pre-heading', () => {
    render(
      <MemoryRouter>
        <GearCard {...sampleInternalGear} />
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading', { level: 2, name: 'Loop Experience Earplugs' });
    expect(heading).toBeDefined();

    expect(screen.queryByText(/Best for:/i)).toBeNull();
  });

  test('renders product title as h2 for external affiliate items and omits redundant Best for: pre-heading', () => {
    render(
      <MemoryRouter>
        <GearCard {...sampleExternalGear} />
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading', { level: 2, name: 'Slot Era Tote Bag' });
    expect(heading).toBeDefined();

    expect(screen.queryByText(/Best for:/i)).toBeNull();
  });
});
