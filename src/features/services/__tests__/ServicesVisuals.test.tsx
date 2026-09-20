import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { TierVisual } from '@/features/services/TierVisuals';
import { PackagesGrid, ScopeBoundaries } from '@/features/services/Packages';

describe('Services Page Visual Enhancements', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders visual previews and client proof badge in PackagesGrid', () => {
    render(<PackagesGrid />);

    // Check Presence tier visual & content
    expect(screen.getByText('Presence')).toBeDefined();
    expect(screen.getByText('yourstudio.com')).toBeDefined();
    expect(screen.getByText('Google Search Verified')).toBeDefined();

    // Check Booked tier visual & client proof badge
    expect(screen.getByText('Booked')).toBeDefined();
    expect(screen.getByText('Hair by April runs on Booked')).toBeDefined();
    expect(screen.getByText('yourstudio.com/book')).toBeDefined();
    expect(screen.getByText('OCTOBER 2026')).toBeDefined();
    expect(screen.getByText('Auto-SMS & Calendar Sync Enabled')).toBeDefined();

    // Check Studio Growth tier visual
    expect(screen.getByText('Studio Growth')).toBeDefined();
    expect(screen.getByText('yourstudio.com/store')).toBeDefined();
    expect(screen.getByText('STRIPE CONNECT')).toBeDefined();
  });

  it('renders TierVisual standalone for all 3 tiers', () => {
    const { rerender } = render(<TierVisual tier="presence" />);
    expect(screen.getByText('yourstudio.com')).toBeDefined();

    rerender(<TierVisual tier="booked" />);
    expect(screen.getByText('yourstudio.com/book')).toBeDefined();

    rerender(<TierVisual tier="growth" />);
    expect(screen.getByText('yourstudio.com/store')).toBeDefined();
  });

  it('renders ScopeBoundaries with what we handle vs do not handle', () => {
    render(<ScopeBoundaries />);

    expect(screen.getByText('Scope Boundaries & Responsibilities')).toBeDefined();
    expect(screen.getByText('We Handle')).toBeDefined();
    expect(screen.getByText('We Do Not Handle')).toBeDefined();
  });
});
