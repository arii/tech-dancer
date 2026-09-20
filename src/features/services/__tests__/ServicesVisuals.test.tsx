import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TierVisual } from '@/features/services/TierVisuals';
import { PracticeWorkflowBanner } from '@/features/services/PracticeWorkflowBanner';
import { PackagesGrid } from '@/features/services/Packages';

describe('Services Page Visual Enhancements', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders visual previews across Presence, Booked, and Growth tiers in PackagesGrid', () => {
    render(<PackagesGrid />);

    // Check Presence tier visual
    expect(screen.getByText('Presence')).toBeDefined();
    expect(screen.getByText('yourstudio.com')).toBeDefined();

    // Check Booked tier visual
    expect(screen.getByText('Booked')).toBeDefined();
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

  it('renders PracticeWorkflowBanner with 4-step workflow diagram and CTA', () => {
    render(
      <MemoryRouter>
        <PracticeWorkflowBanner />
      </MemoryRouter>
    );

    expect(screen.getByText('Running an independent practice?')).toBeDefined();
    expect(screen.getByText('EDGE-HOSTED AUTOMATION WORKFLOWS')).toBeDefined();
    expect(screen.getByText('Inquiry')).toBeDefined();
    expect(screen.getByText('Booking')).toBeDefined();
    expect(screen.getByText('Confirmation')).toBeDefined();
    expect(screen.getByText('Reminder')).toBeDefined();
    expect(screen.getByText(/View Services & Request Consultation/i)).toBeDefined();
  });
});
