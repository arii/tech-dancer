import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { ConsentBanner } from '@/components/ads/ConsentBanner';
import { getAdConsent, setAdConsent, resetAdConsent } from '@/lib/ads/adConsentStore';

const TEST_CLIENT = 'ca-pub-2398582836159289';

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
  resetAdConsent();
});

describe('ConsentBanner', () => {
  it('renders Accept and Decline while consent is unresolved and ads are configured', () => {
    vi.stubEnv('VITE_ADSENSE_CLIENT', TEST_CLIENT);
    render(<ConsentBanner />);
    expect(screen.getByRole('button', { name: 'Accept' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Decline' })).toBeDefined();
    expect(screen.getByRole('complementary', { name: 'Ads personalization consent' })).toBeDefined();
  });

  it('stays hidden when ads are not configured', () => {
    vi.stubEnv('VITE_ADSENSE_CLIENT', '');
    render(<ConsentBanner />);
    expect(screen.queryByRole('button', { name: 'Accept' })).toBeNull();
  });

  it('stays hidden once a preference is stored', () => {
    vi.stubEnv('VITE_ADSENSE_CLIENT', TEST_CLIENT);
    setAdConsent('granted');
    render(<ConsentBanner />);
    expect(screen.queryByRole('button', { name: 'Accept' })).toBeNull();
  });

  it('stores granted consent on Accept', () => {
    vi.stubEnv('VITE_ADSENSE_CLIENT', TEST_CLIENT);
    render(<ConsentBanner />);
    fireEvent.click(screen.getByRole('button', { name: 'Accept' }));
    expect(getAdConsent()).toBe('granted');
    expect(window.localStorage.getItem('bt-ad-consent')).toBe('granted');
  });

  it('stores denied consent on Decline', () => {
    vi.stubEnv('VITE_ADSENSE_CLIENT', TEST_CLIENT);
    render(<ConsentBanner />);
    fireEvent.click(screen.getByRole('button', { name: 'Decline' }));
    expect(getAdConsent()).toBe('denied');
    expect(window.localStorage.getItem('bt-ad-consent')).toBe('denied');
  });
});
