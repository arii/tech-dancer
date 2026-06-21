import { render, screen, within, cleanup } from '@testing-library/react';
import { describe, expect, it, afterEach } from 'vitest';
import { ProductCard } from './ProductCard';
import type { ProductCatalogItem } from '@/data/products/catalog';

const item: ProductCatalogItem = {
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

describe('ProductCard', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders front and back merch images without making the whole card a link', () => {
    render(<ProductCard item={item} />);

    expect(screen.getByAltText('Front view of test shirt')).toBeTruthy();
    expect(screen.getByAltText('Back view of test shirt')).toBeTruthy();

    // Check for side labels since it's "both-equal"
    expect(screen.getByText('Front')).toBeTruthy();
    expect(screen.getByText('Back')).toBeTruthy();

    const card = screen.getByTestId('product-card');
    expect(card.tagName).toBe('ARTICLE');

    const links = within(card).getAllByRole('link');
    expect(links).toHaveLength(3);
    expect(links.map((link) => link.getAttribute('href'))).toEqual([item.href, item.href, item.href]);

    // Check CTA text for multi-image item
    expect(screen.getByText('SEE OPTIONS')).toBeTruthy();
  });

  it('hides labels when single image mode is used', () => {
    const singleItem = {
      ...item,
      imageDisplayMode: 'front-only' as const,
      images: [item.images![0]]
    };
    render(<ProductCard item={singleItem} />);

    expect(screen.getByAltText('Front view of test shirt')).toBeTruthy();
    expect(screen.queryByText('Front')).toBeNull();
    expect(screen.queryByText('Back')).toBeNull();

    // Check CTA text for single-image item
    expect(screen.getByText('VIEW ON PRINTFUL')).toBeTruthy();
  });

  it('applies featured styling when variant is featured', () => {
    render(<ProductCard item={item} variant="featured" />);
    const card = screen.getByTestId('product-card');

    expect(card.classList.contains('bg-accent/5')).toBe(true);
    expect(card.classList.contains('border-accent/20')).toBe(true);

    const title = screen.getByText(item.title);
    expect(title.classList.contains('text-xl')).toBe(true);
  });

  it('applies featured styling when isFeatured is true (backward compatibility)', () => {
    render(<ProductCard item={item} isFeatured />);
    const card = screen.getByTestId('product-card');

    expect(card.classList.contains('bg-accent/5')).toBe(true);
    expect(card.classList.contains('border-accent/20')).toBe(true);
  });

  it('applies stretched variant configuration', () => {
    render(<ProductCard item={item} variant="stretched" />);
    const title = screen.getByText(item.title);
    expect(title).toBeTruthy();
  });

  it('applies fillHeight configuration (backward compatibility)', () => {
    render(<ProductCard item={item} fillHeight />);
    const title = screen.getByText(item.title);
    expect(title).toBeTruthy();
  });
});
