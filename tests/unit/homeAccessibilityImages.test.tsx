import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, afterEach } from 'vitest';
import { LatestPosts } from '@/features/home/LatestPosts';
import { GearShelf } from '@/features/home/GearShelf';
import { PromoStrip } from '@/components/ui/PromoStrip';
import { ListRow } from '@/components/ui/ListRow';

describe('Home and List Accessibility Images', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders meaningful alt text for post thumbnails in LatestPosts without aria-hidden', () => {
    render(
      <MemoryRouter>
        <LatestPosts />
      </MemoryRouter>
    );

    const images = screen.getAllByRole('img', { hidden: false });
    expect(images.length).toBeGreaterThan(0);

    images.forEach((img) => {
      const alt = img.getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt).not.toBe('');
      expect(img.getAttribute('aria-hidden')).toBeNull();
    });
  });

  it('renders meaningful alt text for gear items in GearShelf without aria-hidden', () => {
    render(
      <MemoryRouter>
        <GearShelf />
      </MemoryRouter>
    );

    const images = screen.getAllByRole('img', { hidden: false });
    expect(images.length).toBeGreaterThan(0);

    images.forEach((img) => {
      const alt = img.getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt).not.toBe('');
      expect(img.getAttribute('aria-hidden')).toBeNull();
    });
  });

  it('renders meaningful alt text in PromoStrip without aria-hidden', () => {
    render(
      <MemoryRouter>
        <PromoStrip
          imageSrc="/assets/gear/norcal-bestcal-front.webp"
          imageAlt="NorCal pride apparel preview"
          title="Shop NorCal pride merch"
          subtitle="Tees, hoodies, and tanks for the dance floor"
          ctaLabel="Shop now"
          href="/merch"
        />
      </MemoryRouter>
    );

    const img = screen.getByRole('img');
    expect(img.getAttribute('alt')).toBe('NorCal pride apparel preview');
    expect(img.getAttribute('aria-hidden')).toBeNull();
  });

  it('renders title as alt text fallback in PromoStrip when imageAlt is not provided', () => {
    render(
      <MemoryRouter>
        <PromoStrip
          imageSrc="/assets/gear/norcal-bestcal-front.webp"
          title="Shop NorCal pride merch"
          subtitle="Tees, hoodies, and tanks for the dance floor"
          ctaLabel="Shop now"
          href="/merch"
        />
      </MemoryRouter>
    );

    const img = screen.getByRole('img');
    expect(img.getAttribute('alt')).toBe('Shop NorCal pride merch');
  });

  it('renders title as alt text for image in ListRow', () => {
    render(
      <MemoryRouter>
        <ListRow
          slug="test-item"
          title="Test Item Title"
          category="guides"
          basePath="/blog"
          image="/assets/gear/test.webp"
        />
      </MemoryRouter>
    );

    const img = screen.getByRole('img');
    expect(img.getAttribute('alt')).toBe('Test Item Title');
    expect(img.getAttribute('aria-hidden')).toBeNull();
  });
});
