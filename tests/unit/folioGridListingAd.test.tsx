import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FolioGrid from '@/components/ui/FolioGrid';
import { setAdConsent, resetAdConsent } from '@/lib/ads/adConsentStore';

vi.stubEnv('VITE_ADSENSE_CLIENT', 'ca-pub-2398582836159289');

const makeItems = (n: number) =>
  Array.from({ length: n }, (_, i) => ({
    slug: `post-${i}`,
    title: `Post ${i}`,
    category: 'General',
    excerpt: `Excerpt ${i}`,
    image: `/assets/posts/post-${i}.webp`,
    imageAlt: `Post ${i}`,
    tags: ['test']
  }));

const renderGrid = (items: ReturnType<typeof makeItems>) =>
  render(
    <MemoryRouter>
      <FolioGrid items={items} categoryTitle="Blog Posts" basePath="/blog" renderItem={() => <div>card</div>} />
    </MemoryRouter>
  );

afterEach(() => {
  resetAdConsent();
  cleanup();
});

describe('FolioGrid listing ad placement', () => {
  it('does not throw when consent resolves with ads configured (TDZ regression)', () => {
    setAdConsent('granted');
    expect(() => renderGrid(makeItems(6))).not.toThrow();
    expect(document.querySelector('ins.adsbygoogle')).not.toBeNull();
  });

  it('renders no listing ad before consent resolves', () => {
    renderGrid(makeItems(6));
    expect(document.querySelector('ins.adsbygoogle')).toBeNull();
  });

  it('renders no listing ad with too few items', () => {
    setAdConsent('granted');
    renderGrid(makeItems(3));
    expect(document.querySelector('ins.adsbygoogle')).toBeNull();
  });
});
