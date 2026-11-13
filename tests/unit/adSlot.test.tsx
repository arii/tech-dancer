import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AdSlot } from '@/components/ads/AdSlot';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { setAdConsent, getAdConsent, resetAdConsent } from '@/lib/ads/adConsentStore';
import { getAdSenseClient, isAdSenseEnabled, getAdSensePublisherId } from '@/lib/ads/adSenseConfig';

const TEST_CLIENT = 'ca-pub-2398582836159289';

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
  resetAdConsent();
});

describe('AdSlot env gating', () => {
  it('renders nothing when VITE_ADSENSE_CLIENT is unset', () => {
    vi.stubEnv('VITE_ADSENSE_CLIENT', '');
    setAdConsent('granted');
    const { container } = render(<AdSlot placement="in-article" />);
    expect(container.innerHTML).toBe('');
    expect(window.adsbygoogle).toBeUndefined();
  });

  it('renders nothing when VITE_ADSENSE_CLIENT is malformed', () => {
    vi.stubEnv('VITE_ADSENSE_CLIENT', 'not-a-client-id');
    setAdConsent('granted');
    const { container } = render(<AdSlot placement="sidebar" />);
    expect(container.innerHTML).toBe('');
  });

  it('renders nothing before consent resolves, even when configured', () => {
    vi.stubEnv('VITE_ADSENSE_CLIENT', TEST_CLIENT);
    const { container } = render(<AdSlot placement="listing" />);
    expect(container.querySelector('ins.adsbygoogle')).toBeNull();
    expect(window.adsbygoogle).toBeUndefined();
  });

  it('renders an ad unit and queues a push once consent is granted', () => {
    vi.stubEnv('VITE_ADSENSE_CLIENT', TEST_CLIENT);
    setAdConsent('granted');
    const { container } = render(<AdSlot placement="in-article" />);
    const slot = container.querySelector('ins.adsbygoogle');
    expect(slot).not.toBeNull();
    expect(slot?.getAttribute('data-ad-client')).toBe(TEST_CLIENT);
    expect(slot?.getAttribute('data-full-width-responsive')).toBe('true');
    expect(window.adsbygoogle?.length).toBe(1);
  });

  it('renders the ad unit after consent is declined (non-personalized path)', () => {
    vi.stubEnv('VITE_ADSENSE_CLIENT', TEST_CLIENT);
    setAdConsent('denied');
    const { container } = render(<AdSlot placement="sidebar" />);
    expect(container.querySelector('ins.adsbygoogle')).not.toBeNull();
  });
});

describe('AdSense config helpers', () => {
  it('parses a valid client id and derives the publisher id', () => {
    vi.stubEnv('VITE_ADSENSE_CLIENT', TEST_CLIENT);
    expect(isAdSenseEnabled()).toBe(true);
    expect(getAdSensePublisherId()).toBe('pub-2398582836159289');
  });

  it('disables ads for missing or malformed client ids', () => {
    vi.stubEnv('VITE_ADSENSE_CLIENT', '');
    expect(isAdSenseEnabled()).toBe(false);
    vi.stubEnv('VITE_ADSENSE_CLIENT', 'pub-no-ca-prefix');
    expect(getAdSenseClient()).toBeUndefined();
  });
});

describe('MarkdownRenderer AdSlot tag', () => {
  const MARKDOWN = 'Paragraph one.\n\n<AdSlot placement="in-article"></AdSlot>\n\nParagraph two.';

  it('emits no ad markup from markdown when ads are disabled', () => {
    vi.stubEnv('VITE_ADSENSE_CLIENT', '');
    setAdConsent('granted');
    render(
      <MemoryRouter>
        <MarkdownRenderer content={MARKDOWN} />
      </MemoryRouter>
    );
    expect(document.querySelector('ins.adsbygoogle')).toBeNull();
    expect(screen.getByText('Paragraph two.')).toBeDefined();
  });

  it('renders an in-article ad unit from markdown once consent is granted', () => {
    vi.stubEnv('VITE_ADSENSE_CLIENT', TEST_CLIENT);
    setAdConsent('granted');
    render(
      <MemoryRouter>
        <MarkdownRenderer content={MARKDOWN} />
      </MemoryRouter>
    );
    const slot = document.querySelector('ins.adsbygoogle');
    expect(slot).not.toBeNull();
    expect(slot?.getAttribute('data-ad-client')).toBe(TEST_CLIENT);
    expect(getAdConsent()).toBe('granted');
  });
});
