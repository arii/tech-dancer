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
    // 4 links: Image link, Title link, Collection link, and Button link
    expect(links).toHaveLength(4);
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      item.href, // Image
      item.href, // Title
      'https://boomtick.printful.me/collection/lead-follow-switch', // Collection link
      item.href  // Button
    ]);

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

  it('applies featured styling when isFeatured is true', () => {
    render(<ProductCard item={item} isFeatured />);
    const card = screen.getByTestId('product-card');

    // Check for featured classes (using classList because of cn utility)
    expect(card.classList.contains('bg-accent/5')).toBe(true);
    expect(card.classList.contains('border-accent/20')).toBe(true);

    // Title should be larger
    const title = screen.getByText(item.title);
    expect(title.classList.contains('text-xl')).toBe(true); // lg:text-2xl is handled by responsive tokens which might not show in vitest-dom as expected, but we check the base
  });
});
