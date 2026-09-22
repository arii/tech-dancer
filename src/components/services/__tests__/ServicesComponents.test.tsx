import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { CoreServicesGrid } from '@/components/services/CoreServicesGrid';


vi.mock('@/components/ui/accordion', () => ({
  Accordion: ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={className}>{children}</div>,
  AccordionItem: ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={className}>{children}</div>,
  AccordionTrigger: ({ children, className }: { children: React.ReactNode, className?: string }) => <button className={className}>{children}</button>,
  AccordionContent: ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={className}>{children}</div>,
}));

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
      expect(screen.getByText(/A fast, beautiful website built specifically for independent practitioners/i)).toBeDefined();
      expect(screen.getByText('Custom design & development')).toBeDefined();
    });
  });
});
