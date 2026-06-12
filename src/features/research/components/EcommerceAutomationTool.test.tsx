import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { EcommerceAutomationTool } from './EcommerceAutomationTool';
import { MemoryRouter } from 'react-router-dom';

// Mock SEO component as it's not critical for rendering tests
vi.mock('@/components/SEO', () => ({
  SEO: () => null,
}));

describe('EcommerceAutomationTool', () => {
  it('renders correctly with expected headings and content', () => {
    render(
      <MemoryRouter>
        <EcommerceAutomationTool />
      </MemoryRouter>
    );

    // Check for H1 heading
    const mainHeading = screen.getByRole('heading', { level: 1, name: /Ecommerce Automation Experiments/i });
    expect(mainHeading).toBeTruthy();

    // Check for major section headings (H2)

    expect(screen.getByRole('heading', { level: 2, name: /SEO & Policy Safety/i })).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2, name: /Pipeline Architecture/i })).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2, name: /Visual Image QA Examples/i })).toBeTruthy();

    // Verify presence of specific workflow items
    expect(screen.getByText(/Printful API Template Pulls/i)).toBeTruthy();
    expect(screen.getByText(/Metadata Agent Packets/i)).toBeTruthy();
    expect(screen.getByText(/SEO-Safe Product Copy/i)).toBeTruthy();

    // Verify presence of safety guardrails (demonstrating SEO safety as per AC)
    expect(screen.getByText(/No fake reviews or manufactured ratings/i)).toBeTruthy();
    expect(screen.getByText(/No unsupported stock status claims/i)).toBeTruthy();
  });
});
