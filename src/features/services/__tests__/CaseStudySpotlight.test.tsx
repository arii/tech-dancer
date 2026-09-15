import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CaseStudySpotlight } from '@/features/services/CaseStudySpotlight';

describe('CaseStudySpotlight Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the case study spotlight with headline, story, authentic features, and live proof image', () => {
    render(
      <MemoryRouter>
        <CaseStudySpotlight />
      </MemoryRouter>
    );

    // Section title & badges
    expect(screen.getByText('LIVE CLIENT PRODUCTION SPOTLIGHT')).toBeDefined();
    expect(screen.getByText('Case Study: Hair by April')).toBeDefined();
    expect(screen.getByText(/How a top San Francisco hair specialist/i)).toBeDefined();

    // Before & After comparison
    expect(screen.getByText('The Friction Before')).toBeDefined();
    expect(screen.getByText(/Manual messaging across DMs/i)).toBeDefined();
    expect(screen.getByText('The Solution Built')).toBeDefined();
    expect(screen.getByText(/Custom mobile-first portfolio/i)).toBeDefined();

    // Production Features (no fabricated statistics)
    expect(screen.getByText('Direct Client Self-Booking:')).toBeDefined();
    expect(screen.getByText('Live Calendar Synchronization:')).toBeDefined();
    expect(screen.getByText('Structured Intake & Event Routing:')).toBeDefined();

    // Verify hallucinated numbers are completely absent
    expect(screen.queryByText(/5\+ hours saved weekly/i)).toBeNull();

    // Live Recording image & badge
    const img = screen.getByAltText('Hair by April Live Booking Flow') as HTMLImageElement;
    expect(img).toBeDefined();
    expect(img.src).toContain('images/creators/hair-by-april-booking.gif');
    expect(screen.getByText('Live Production Workflow')).toBeDefined();

    // Client Link button
    const ctaButton = screen.getByRole('link', { name: /Visit Live Client Site/i });
    expect(ctaButton).toBeDefined();
    expect(ctaButton.getAttribute('href')).toBe('https://hairbyapril.pages.dev');

    // Credibility footnote link to /about
    expect(screen.getByText(/About & Operations page →/i)).toBeDefined();
  });
});
