import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { AdvertisingDisclosure } from '@/components/privacy/AdvertisingDisclosure';

afterEach(() => cleanup());

describe('AdvertisingDisclosure', () => {
  it('states the ad network, the non-personalized default, and the consent opt-out', () => {
    render(<AdvertisingDisclosure />);
    expect(screen.getByText('Advertising')).toBeDefined();
    expect(screen.getByText(/displays ads through Google AdSense/i)).toBeDefined();
    expect(screen.getByText(/non-personalized by default/i)).toBeDefined();
  });
});
