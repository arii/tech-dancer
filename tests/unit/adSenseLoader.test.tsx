import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { useAdSenseLoader } from '@/hooks/useAdSenseLoader';
import { acceptAds, rejectAds, resetCookieYes } from '../utils/cookieYes';

const TEST_CLIENT = 'ca-pub-2398582836159289';

const Harness = () => {
  useAdSenseLoader();
  return null;
};

describe('useAdSenseLoader consent gate', () => {
  beforeEach(() => {
    resetCookieYes();
    document.head.innerHTML = '';
    delete window.adsbygoogle;
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllEnvs();
  });

  it('injects nothing when VITE_ADSENSE_CLIENT is unset', () => {
    vi.stubEnv('VITE_ADSENSE_CLIENT', '');
    render(<Harness />);
    expect(document.head.querySelector('script#adsbygoogle-loader')).toBeNull();
    expect(document.head.querySelector('meta[name="google-adsense-account"]')).toBeNull();
  });

  it('injects the verification meta tag immediately but blocks the script until consent resolves', () => {
    vi.stubEnv('VITE_ADSENSE_CLIENT', TEST_CLIENT);
    render(<Harness />);
    expect(document.head.querySelector('meta[name="google-adsense-account"]')?.getAttribute('content')).toBe(TEST_CLIENT);
    expect(document.head.querySelector('script#adsbygoogle-loader')).toBeNull();
  });

  it('loads the personalized script after consent is granted', () => {
    vi.stubEnv('VITE_ADSENSE_CLIENT', TEST_CLIENT);
    render(<Harness />);
    acceptAds();
    const script = document.head.querySelector('script#adsbygoogle-loader');
    expect(script?.getAttribute('src')).toContain(`client=${TEST_CLIENT}`);
    expect(window.adsbygoogle?.requestNonPersonalizedAds).toBe(0);
  });

  it('flags non-personalized ads before loading the script after consent is declined', () => {
    vi.stubEnv('VITE_ADSENSE_CLIENT', TEST_CLIENT);
    render(<Harness />);
    rejectAds();
    const script = document.head.querySelector('script#adsbygoogle-loader');
    expect(script).not.toBeNull();
    expect(window.adsbygoogle?.requestNonPersonalizedAds).toBe(1);
  });

  it('loads immediately for a returning visitor with a stored preference', () => {
    vi.stubEnv('VITE_ADSENSE_CLIENT', TEST_CLIENT);
    acceptAds();
    render(<Harness />);
    expect(document.head.querySelector('script#adsbygoogle-loader')).not.toBeNull();
  });

  it('follows consent changes made after the loader is on the page', () => {
    vi.stubEnv('VITE_ADSENSE_CLIENT', TEST_CLIENT);
    render(<Harness />);
    acceptAds();
    expect(window.adsbygoogle?.requestNonPersonalizedAds).toBe(0);
    rejectAds();
    expect(window.adsbygoogle?.requestNonPersonalizedAds).toBe(1);
    acceptAds();
    expect(window.adsbygoogle?.requestNonPersonalizedAds).toBe(0);
    expect(document.head.querySelectorAll('script#adsbygoogle-loader').length).toBe(1);
  });

  it('injects the loader script only once across re-renders', () => {
    vi.stubEnv('VITE_ADSENSE_CLIENT', TEST_CLIENT);
    acceptAds();
    const { rerender } = render(<Harness />);
    rerender(<Harness />);
    expect(document.head.querySelectorAll('script#adsbygoogle-loader').length).toBe(1);
    expect(document.head.querySelectorAll('meta[name="google-adsense-account"]').length).toBe(1);
  });
});
