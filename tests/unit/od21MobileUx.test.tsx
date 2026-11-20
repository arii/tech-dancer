import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ResourceSidebar } from '@/features/lab/components/sidebar/ResourceSidebar';
import { VerdictCallout } from '@/components/layout/DetailElements';
import { ListRow } from '@/components/ui/ListRow';

/**
 * OD-21 mobile UX acceptance tests (spec art_gLzVKWAb):
 * 1. ResourceSidebar renders fixed CTA copy and never link.name
 * 2. VerdictCallout applies responsive padding props
 * 3. ListRow date/category nowrap behavior
 */

describe('ResourceSidebar CTA copy (OD-21)', () => {
  it('renders fixed action labels and never the raw link name in purchase buttons', () => {
    // Non-Amazon link with a long inventory name: before OD-21 the name
    // ("LOVE neon tshirt - ask me to follow") leaked into the button copy.
    render(
      <MemoryRouter>
        <ResourceSidebar affiliateIds={['love-neon-follow-shirt', 'suede-sheets']} />
      </MemoryRouter>
    );

    const buttons = screen.queryAllByRole('link').map((a) => a.textContent ?? '');

    expect(buttons.some((t) => t.includes('Check Price on Amazon'))).toBe(true);
    expect(buttons.some((t) => t.includes('View on Store'))).toBe(true);
    // No purchase button carries the inventory name.
    for (const text of buttons) {
      expect(text.includes('LOVE neon tshirt')).toBe(false);
    }
    // The named link still exists as data — it is only excluded from button copy.
    expect(screen.queryAllByRole('link').every((a) => a.getAttribute('href') !== null)).toBe(true);
  });
});

describe('VerdictCallout responsive spacing (OD-21)', () => {
  it('applies reduced mobile padding/margin with desktop values preserved at md', () => {
    const { container } = render(<VerdictCallout verdict="Thematic commitment" />);
    const card = container.firstElementChild as HTMLElement;
    expect(card.className).toContain('p-5');
    expect(card.className).toContain('md:p-8');
    expect(card.className).toContain('mb-8');
    expect(card.className).toContain('md:mb-12');
  });
});

describe('ListRow meta nowrap (OD-21)', () => {
  const row = (
    <MemoryRouter>
      <ListRow
        slug="2024-06-01-alien-mask"
        title="Alien Latex Mask"
        category="Travel Gear"
        date="2024-06-01"
        basePath="/gear"
        content="Some long enough content to compute a reading time."
      />
    </MemoryRouter>
  );

  it('never wraps the date or category internally', () => {
    const { container } = render(row);
    const nowrap = container.querySelectorAll('.whitespace-nowrap');
    const texts = Array.from(nowrap).map((el) => el.textContent);
    expect(texts.some((t) => t === '2024-06-01')).toBe(true);
    expect(texts.some((t) => t === 'Travel Gear')).toBe(true);
  });

  it('clamps the title to two lines on mobile and one at sm and up', () => {
    const { container } = render(row);
    const title = container.querySelector('.line-clamp-2') as HTMLElement;
    expect(title).not.toBeNull();
    expect(title.textContent).toBe('Alien Latex Mask');
    expect(title.className).toContain('sm:line-clamp-1');
  });
});
