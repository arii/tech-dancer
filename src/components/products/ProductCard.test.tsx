import { render, screen, within, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, afterEach } from 'vitest';
import { ProductCard } from './ProductCard';
import type { ProductCatalogItem } from '@/data/products/catalog';

const externalItem: ProductCatalogItem = {
  id: 'test-shirt',
  source: 'owned-merch',
  title: 'Test Front Back Shirt',
  description: 'A shirt with separate front and back views.',
  imageUrl: '/assets/gear/test-front.webp',
  images: [
    { src: '/assets/gear/test-front.webp', side: 'front', alt: 'Front view of test shirt' },
    { src: '/assets/gear/test-back.webp', side: 'back', alt: 'Back view of test shirt' },
  ],
  imageDisplayMode: 'both-equal',
  href: 'https://boomtick.printful.me/product/test-shirt',
  price: '20.00',
  collections: ['lead-follow-switch'],
  tags: ['Test', 'Merch'],
  roles: ['lead'],
  disclosure: 'owned-printful',
};

const internalItem: ProductCatalogItem = {
  ...externalItem,
  id: 'test-internal-shirt',
  gearSlug: 'test-internal-shirt-gear',
};

describe('ProductCard', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders external Printful item with no nested links and clear Order action labels', () => {
    render(
      <MemoryRouter>
        <ProductCard item={externalItem} />
      </MemoryRouter>
    );

    expect(screen.getByAltText('Front view of test shirt')).toBeTruthy();
    expect(screen.getByAltText('Back view of test shirt')).toBeTruthy();

    const card = screen.getByTestId('product-card');
    expect(card.tagName).toBe('ARTICLE');

    const links = within(card).getAllByRole('link');
    expect(links).toHaveLength(3);

    // Ensure no link contains another link in DOM
    links.forEach((link) => {
      expect(link.querySelector('a')).toBeNull();
      expect(link.getAttribute('href')).toBe(externalItem.href);
    });

    // Check action button label
    expect(screen.getByText('ORDER ON PRINTFUL')).toBeTruthy();
    expect(screen.getAllByLabelText(`Order ${externalItem.title} on Printful`)).toHaveLength(3);
  });

  it('renders internal product card with local gear route and distinct View Details labels', () => {
    render(
      <MemoryRouter>
        <ProductCard item={internalItem} />
      </MemoryRouter>
    );

    const card = screen.getByTestId('product-card');
    const links = within(card).getAllByRole('link');
    expect(links).toHaveLength(3);

    // Verify all links point to local gear route
    links.forEach((link) => {
      expect(link.querySelector('a')).toBeNull();
      expect(link.getAttribute('href')).toBe(`/gear/${internalItem.gearSlug}`);
    });

    // Check CTA button text and aria-label
    expect(screen.getByText('VIEW DETAILS')).toBeTruthy();
    expect(screen.getByLabelText(`View details and options for ${internalItem.title}`)).toBeTruthy();
    expect(screen.getAllByLabelText(`View product details for ${internalItem.title}`)).toHaveLength(2);
  });

  it('hides labels when single image mode is used', () => {
    const singleItem = {
      ...externalItem,
      imageDisplayMode: 'front-only' as const,
      images: [externalItem.images![0]]
    };
    render(
      <MemoryRouter>
        <ProductCard item={singleItem} />
      </MemoryRouter>
    );

    expect(screen.getByAltText('Front view of test shirt')).toBeTruthy();
    expect(screen.queryByText('Front')).toBeNull();
    expect(screen.queryByText('Back')).toBeNull();

    expect(screen.getByText('ORDER ON PRINTFUL')).toBeTruthy();
  });

  it('applies featured styling when isFeatured is true', () => {
    render(
      <MemoryRouter>
        <ProductCard item={externalItem} isFeatured />
      </MemoryRouter>
    );
    const card = screen.getByTestId('product-card');

    expect(card.classList.contains('bg-accent/5')).toBe(true);
    expect(card.classList.contains('border-accent/20')).toBe(true);

    const title = screen.getByText(externalItem.title);
    expect(title.classList.contains('text-xl')).toBe(true);
  });
});
