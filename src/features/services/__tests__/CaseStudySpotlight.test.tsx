import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CaseStudySpotlight } from '@/features/services/CaseStudySpotlight';

describe('CaseStudySpotlight Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the case study spotlight with headline, story, booking flow description, and live proof image', () => {
    render(
      <MemoryRouter>
        <CaseStudySpotlight />
      </MemoryRouter>
    );

    // Section title & human description (no emoji/caps badges)
    expect(screen.queryByText('LIVE CLIENT PROOF')).toBeNull();
    expect(screen.getByText('Case Study: Hair by April')).toBeDefined();
    expect(screen.getByText(/How a San Francisco curly hair specialist moved from manual Instagram DMs/i)).toBeDefined();

    // Before & After comparison
    expect(screen.getByText('The Friction Before')).toBeDefined();
    expect(screen.getByText(/Coordinating open time slots over direct messages/i)).toBeDefined();
    expect(screen.getByText('The Solution Built')).toBeDefined();
    expect(screen.getByText(/A mobile-first website where clients book directly/i)).toBeDefined();

    // Single-Sentence Client Booking Flow (replaces 4 fragmented cards)
    expect(screen.getByText(/How the booking process works:/i)).toBeDefined();
    expect(screen.getByText(/When a client books, they choose an open slot on your calendar/i)).toBeDefined();
    expect(screen.queryByText('The Production System Hair by April Runs On')).toBeNull();

    // Verify hallucinated numbers are completely absent
    expect(screen.queryByText(/5\+ hours saved weekly/i)).toBeNull();

    // Live Recording image
    const img = screen.getByAltText('Hair by April Live Booking Flow') as HTMLImageElement;
    expect(img).toBeDefined();
    expect(img.src).toContain('hair-by-april-booking.gif');

    // Client Link button
    const ctaButton = screen.getByRole('link', { name: /Visit Live Client Site/i });
    expect(ctaButton).toBeDefined();
    expect(ctaButton.getAttribute('href')).toBe('https://hairbyapril.pages.dev');

    // Credibility footnote link to /about
    expect(screen.getByText(/About & Operations page →/i)).toBeDefined();
  });
});
