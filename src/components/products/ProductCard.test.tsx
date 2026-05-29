import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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
  it('renders front and back merch images without making the whole card a link', () => {
    render(<ProductCard item={item} />);

    expect(screen.getByAltText('Front view of test shirt')).toBeTruthy();
    expect(screen.getByAltText('Back view of test shirt')).toBeTruthy();

    const card = screen.getByTestId('product-card');
    expect(card.tagName).toBe('ARTICLE');
    expect(card.querySelector(':scope > a[aria-label="Buy Test Front Back Shirt on storefront"]')).toBeNull();

    const links = within(card).getAllByRole('link');
    expect(links).toHaveLength(3);
    expect(links.map((link) => link.getAttribute('href'))).toEqual([item.href, item.href, item.href]);
  });
});
