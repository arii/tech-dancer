import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { CoreServicesGrid } from '@/components/services/CoreServicesGrid';
import { FeatureTabs } from '@/components/services/FeatureTabs';

describe('Services Page Components', () => {
  afterEach(() => {
    cleanup();
  });

  describe('CoreServicesGrid', () => {
    it('renders the core service items and expands to show content', () => {
      render(<CoreServicesGrid />);

      // Verify the accordion titles are present
      expect(screen.getByText('Website & Digital Presence')).toBeDefined();
      expect(screen.getByText('Booking & Customer Workflows')).toBeDefined();
      expect(screen.getByText('Ecommerce')).toBeDefined();
      expect(screen.getByText('Events & Experiences')).toBeDefined();
      expect(screen.getByText('Marketing & Growth')).toBeDefined();
      expect(screen.getByText('Automation & Integrations')).toBeDefined();

      // Because 'website' is the defaultValue, its content should be visible
      expect(screen.getByText('A professional online home for your work.')).toBeDefined();
      expect(screen.getByText('✓ Custom website design & development')).toBeDefined();
    });
  });

  describe('FeatureTabs', () => {
    it('renders the feature tabs and displays the correct active tab content', () => {
      render(<FeatureTabs />);

      // Verify tabs are present
      expect(screen.getAllByText('Website & Digital Presence')).toHaveLength(2); // Tab and Header
      expect(screen.getByText('Booking & Workflows')).toBeDefined();

      // Because 'website' is the defaultValue, verify its specific text
      expect(screen.getByText(/A fast, beautiful website built specifically for independent practitioners/i)).toBeDefined();
      expect(screen.getByText('Custom website design & development')).toBeDefined();
    });
  });
});
