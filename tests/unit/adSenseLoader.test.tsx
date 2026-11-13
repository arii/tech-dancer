import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { useAdSenseLoader } from '@/hooks/useAdSenseLoader';
import { setAdConsent, resetAdConsent } from '@/lib/ads/adConsentStore';

const TEST_CLIENT = 'ca-pub-2398582836159289';

const Harness = () => {
  useAdSenseLoader();
  return null;
};

describe('useAdSenseLoader consent gate', () => {
  beforeEach(() => {
    resetAdConsent();
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
    setAdConsent('granted');
    const script = document.head.querySelector('script#adsbygoogle-loader');
    expect(script?.getAttribute('src')).toContain(`client=${TEST_CLIENT}`);
    expect(window.adsbygoogle?.requestNonPersonalizedAds).toBeUndefined();
  });

  it('flags non-personalized ads before loading the script after consent is declined', () => {
    vi.stubEnv('VITE_ADSENSE_CLIENT', TEST_CLIENT);
    render(<Harness />);
    setAdConsent('denied');
    const script = document.head.querySelector('script#adsbygoogle-loader');
    expect(script).not.toBeNull();
    expect(window.adsbygoogle?.requestNonPersonalizedAds).toBe(1);
  });

  it('loads immediately for a returning visitor with a stored preference', () => {
    vi.stubEnv('VITE_ADSENSE_CLIENT', TEST_CLIENT);
    setAdConsent('granted');
    render(<Harness />);
    expect(document.head.querySelector('script#adsbygoogle-loader')).not.toBeNull();
  });

  it('injects the loader script only once across re-renders', () => {
    vi.stubEnv('VITE_ADSENSE_CLIENT', TEST_CLIENT);
    setAdConsent('granted');
    const { rerender } = render(<Harness />);
    rerender(<Harness />);
    expect(document.head.querySelectorAll('script#adsbygoogle-loader').length).toBe(1);
    expect(document.head.querySelectorAll('meta[name="google-adsense-account"]').length).toBe(1);
  });
});
