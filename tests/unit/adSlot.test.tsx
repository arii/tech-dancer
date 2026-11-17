import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AdSlot } from '@/components/ads/AdSlot';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { getAdConsent } from '@/lib/ads/adConsentStore';
import { getAdSenseClient, getAdUnit, getAdSensePublisherId } from '@/lib/ads/adSenseConfig';
import { acceptAds, rejectAds, resetCookieYes } from '../utils/cookieYes';

const TEST_CLIENT = 'ca-pub-2398582836159289';
const TEST_SLOT = '1234567890';

const configureAds = () => {
  vi.stubEnv('VITE_ADSENSE_CLIENT', TEST_CLIENT);
  vi.stubEnv('VITE_ADSENSE_SLOT_IN_ARTICLE', TEST_SLOT);
  vi.stubEnv('VITE_ADSENSE_SLOT_SIDEBAR', TEST_SLOT);
  vi.stubEnv('VITE_ADSENSE_SLOT_LISTING', TEST_SLOT);
};

beforeEach(() => {
  delete window.adsbygoogle;
});

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
  resetCookieYes();
});

describe('AdSlot env gating', () => {
  it('renders nothing when VITE_ADSENSE_CLIENT is unset', () => {
    configureAds();
    vi.stubEnv('VITE_ADSENSE_CLIENT', '');
    acceptAds();
    const { container } = render(<AdSlot placement="in-article" />);
    expect(container.innerHTML).toBe('');
    expect(window.adsbygoogle).toBeUndefined();
  });

  it('renders nothing when VITE_ADSENSE_CLIENT is malformed', () => {
    configureAds();
    vi.stubEnv('VITE_ADSENSE_CLIENT', 'not-a-client-id');
    acceptAds();
    const { container } = render(<AdSlot placement="sidebar" />);
    expect(container.innerHTML).toBe('');
  });

  it('renders nothing when the placement has no ad unit ID', () => {
    configureAds();
    vi.stubEnv('VITE_ADSENSE_SLOT_SIDEBAR', '');
    acceptAds();
    const { container } = render(<AdSlot placement="sidebar" />);
    expect(container.innerHTML).toBe('');
    expect(window.adsbygoogle).toBeUndefined();
  });

  it('renders the ad unit before the visitor chooses (non-personalized default)', () => {
    configureAds();
    const { container } = render(<AdSlot placement="listing" />);
    expect(container.querySelector('ins.adsbygoogle')).not.toBeNull();
    expect(window.adsbygoogle?.length).toBe(1);
  });

  it('renders an ad unit with its slot ID and queues a push once consent is granted', () => {
    configureAds();
    acceptAds();
    const { container } = render(<AdSlot placement="in-article" />);
    const slot = container.querySelector('ins.adsbygoogle');
    expect(slot?.getAttribute('data-ad-client')).toBe(TEST_CLIENT);
    expect(slot?.getAttribute('data-ad-slot')).toBe(TEST_SLOT);
    expect(slot?.getAttribute('data-full-width-responsive')).toBe('true');
    expect(window.adsbygoogle?.length).toBe(1);
  });

  it('renders the ad unit after consent is rejected (non-personalized path)', () => {
    configureAds();
    rejectAds();
    const { container } = render(<AdSlot placement="sidebar" />);
    expect(container.querySelector('ins.adsbygoogle')).not.toBeNull();
  });
});

describe('AdSense config helpers', () => {
  it('parses a valid client id and derives the publisher id', () => {
    vi.stubEnv('VITE_ADSENSE_CLIENT', TEST_CLIENT);
    expect(getAdSenseClient()).toBe(TEST_CLIENT);
    expect(getAdSensePublisherId()).toBe('pub-2398582836159289');
  });

  it('disables ads for missing or malformed client ids', () => {
    vi.stubEnv('VITE_ADSENSE_CLIENT', '');
    expect(getAdSenseClient()).toBeUndefined();
    vi.stubEnv('VITE_ADSENSE_CLIENT', 'pub-no-ca-prefix');
    expect(getAdSenseClient()).toBeUndefined();
  });

  it('requires a 10-digit slot id per placement', () => {
    configureAds();
    expect(getAdUnit('listing')).toEqual({ client: TEST_CLIENT, slot: TEST_SLOT });
    vi.stubEnv('VITE_ADSENSE_SLOT_LISTING', '12345');
    expect(getAdUnit('listing')).toBeUndefined();
  });
});

describe('MarkdownRenderer AdSlot tag', () => {
  const MARKDOWN = 'Paragraph one.\n\n<AdSlot placement="in-article"></AdSlot>\n\nParagraph two.';

  it('emits no ad markup from markdown when ads are disabled', () => {
    vi.stubEnv('VITE_ADSENSE_CLIENT', '');
    acceptAds();
    render(
      <MemoryRouter>
        <MarkdownRenderer content={MARKDOWN} />
      </MemoryRouter>
    );
    expect(document.querySelector('ins.adsbygoogle')).toBeNull();
    expect(screen.getByText('Paragraph two.')).toBeDefined();
  });

  it('renders an in-article ad unit from markdown once consent is granted', () => {
    configureAds();
    acceptAds();
    render(
      <MemoryRouter>
        <MarkdownRenderer content={MARKDOWN} />
      </MemoryRouter>
    );
    const slot = document.querySelector('ins.adsbygoogle');
    expect(slot?.getAttribute('data-ad-slot')).toBe(TEST_SLOT);
    expect(getAdConsent()).toBe('granted');
  });
});
