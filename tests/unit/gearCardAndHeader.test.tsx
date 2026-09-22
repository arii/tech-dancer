import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, afterEach } from 'vitest';
import { GearCard } from '@/components/ui/GearCard';
import { PageHeader } from '@/components/ui/PageHeader';

describe('GearCard and PageHeader UX & A11y Refinements', () => {
  afterEach(() => {
    cleanup();
  });

  const sampleGearProps = {
    slug: 'test-gear',
    title: 'Test Dance Shoes',
    category: 'Shoes',
    excerpt: 'High performance dancing shoes.',
    verdict: 'Essential for dance floor traction'
  };

  it('renders product card title as an h2 element for internal router links', () => {
    render(
      <MemoryRouter>
        <GearCard {...sampleGearProps} />
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).not.toBeNull();
    expect(heading.textContent).toContain('Test Dance Shoes');
    expect(heading.tagName.toLowerCase()).toBe('h2');
  });

  it('renders product card title as an h2 element for external affiliate links', () => {
    render(
      <MemoryRouter>
        <GearCard
          {...sampleGearProps}
          affiliateIds={['amazon_001']}
        />
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).not.toBeNull();
    expect(heading.textContent).toContain('Test Dance Shoes');
    expect(heading.tagName.toLowerCase()).toBe('h2');
  });

  it('does not render redundant Best for pre-heading', () => {
    render(
      <MemoryRouter>
        <GearCard {...sampleGearProps} />
      </MemoryRouter>
    );

    expect(screen.queryByText(/Best for:/i)).toBeNull();
  });

  it('renders PageHeader label with text-text-dim class by default for proper contrast', () => {
    render(
      <PageHeader
        label="GEAR & REVIEWS"
        title="Gear Reviews"
        description="Dance gear notes and product resources"
      />
    );

    const labelElement = screen.getByText('GEAR & REVIEWS');
    expect(labelElement).not.toBeNull();
    expect(labelElement.className).toContain('text-text-dim');
  });

  it('renders PageHeader title as h1 by default', () => {
    render(
      <PageHeader
        label="GEAR & REVIEWS"
        title="Gear Reviews"
      />
    );

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).not.toBeNull();
    expect(heading.textContent).toBe('Gear Reviews');
  });
});
