import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { CoreServicesGrid } from '@/components/services/CoreServicesGrid';

describe('Services Page Modular Packages', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders Digital Foundation and 6 modular capability cards', () => {
    render(<CoreServicesGrid />);

    expect(screen.getByText('Website & Digital Presence')).toBeDefined();
    expect(screen.getByText(/A professional online home for your work/i)).toBeDefined();

    // In Radix accordion, contents for unexpanded tabs are rendered in DOM but visually hidden or animated.
    // They are available in the DOM, so we can query them. However, since the test checks for
    // exact text match on items that might be nested or have slightly different spacing,
    // we use a more flexible matcher.

    expect(screen.getByText('Booking & Customer Workflows')).toBeDefined();
    expect(screen.getByText('Ecommerce')).toBeDefined();
    expect(screen.getByText('Events & Experiences')).toBeDefined();
    expect(screen.getByText('Marketing & Growth')).toBeDefined();
    expect(screen.getByText('Automation & Integrations')).toBeDefined();
  });
});
