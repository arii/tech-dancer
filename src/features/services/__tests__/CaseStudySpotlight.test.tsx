import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ClientSpotlight } from '@/features/services/ClientSpotlight';

describe('ClientSpotlight Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the client spotlight with headline, stylist positioning, customer flow, and live proof image', () => {
    render(
      <MemoryRouter>
        <ClientSpotlight />
      </MemoryRouter>
    );

    // Section title & positioning
    expect(screen.getByText('See it in action: Hair by April')).toBeDefined();

    // Verified features and customer mechanics
    expect(screen.getByText(/We built a mobile-first website for Hair by April/i)).toBeDefined();
    expect(screen.getByText(/Find the business/i)).toBeDefined();
    expect(screen.getByText(/No back-and-forth messages. No manually checking availability./i)).toBeDefined();

    // Live screenshot image
    const img = screen.getByAltText('Hair by April Live Website & Booking') as HTMLImageElement;
    expect(img).toBeDefined();
    expect(img.src).toContain('hair-by-april.jpg');

    // Client Link button
    const ctaButton = screen.getByRole('link', { name: /Visit the live client site/i });
    expect(ctaButton).toBeDefined();
    expect(ctaButton.getAttribute('href')).toBe('https://hairbyapril.pages.dev/');
  });
});
