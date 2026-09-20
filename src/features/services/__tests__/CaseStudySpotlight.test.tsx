import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CaseStudySpotlight } from '@/features/services/CaseStudySpotlight';

describe('CaseStudySpotlight Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the case study spotlight with headline, story, integrated workflow, and live proof image', () => {
    render(
      <MemoryRouter>
        <CaseStudySpotlight />
      </MemoryRouter>
    );

    // Section title & badges
    expect(screen.getByText('LIVE CLIENT PROOF')).toBeDefined();
    expect(screen.getByText('Case Study: Hair by April')).toBeDefined();
    expect(screen.getByText(/How a top San Francisco curly hair specialist/i)).toBeDefined();

    // Before & After comparison
    expect(screen.getByText('The Friction Before')).toBeDefined();
    expect(screen.getByText(/Manual messaging across DMs/i)).toBeDefined();
    expect(screen.getByText('The Solution Built')).toBeDefined();
    expect(screen.getByText(/Custom mobile-first portfolio/i)).toBeDefined();

    // Integrated Production Workflow
    expect(screen.getByText('The Production System Hair by April Runs On')).toBeDefined();
    expect(screen.getByText('Smart Intake')).toBeDefined();
    expect(screen.getByText('Live Calendar Lock')).toBeDefined();
    expect(screen.getByText('Instant Confirmation')).toBeDefined();
    expect(screen.getByText('Automated Reminders')).toBeDefined();

    // Verify hallucinated numbers are completely absent
    expect(screen.queryByText(/5\+ hours saved weekly/i)).toBeNull();

    // Live Recording image & badge
    const img = screen.getByAltText('Hair by April Live Booking Flow') as HTMLImageElement;
    expect(img).toBeDefined();
    expect(img.src).toContain('hair-by-april-booking.gif');
    expect(screen.getByText('Live Production Workflow')).toBeDefined();

    // Client Link button
    const ctaButton = screen.getByRole('link', { name: /Visit Live Client Site/i });
    expect(ctaButton).toBeDefined();
    expect(ctaButton.getAttribute('href')).toBe('https://hairbyapril.pages.dev');

    // Credibility footnote link to /about
    expect(screen.getByText(/About & Operations page →/i)).toBeDefined();
  });
});
