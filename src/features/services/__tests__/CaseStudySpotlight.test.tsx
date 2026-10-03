import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ClientSpotlight } from '@/features/services/ClientSpotlight';

describe('ClientSpotlight Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the dual client portfolio showcase with Marcella Therapy and Hair by April', () => {
    render(
      <MemoryRouter>
        <ClientSpotlight />
      </MemoryRouter>
    );

    // Section title & positioning
    expect(screen.getByText('See it in action: Real client platforms')).toBeDefined();

    // Default view: Marcella Therapy
    expect(screen.getAllByText('Marcella Therapy').length).toBeGreaterThan(0);
    expect(screen.getByText(/High-trust clinical web platform & Cal.com booking sync/i)).toBeDefined();
    expect(screen.getByText(/We engineered a calm, accessible digital presence for a San Francisco therapy practice/i)).toBeDefined();
    expect(screen.getByText('Discover Practice')).toBeDefined();

    // Live screenshot image for Marcella Therapy
    const marcellaImg = screen.getByAltText('Marcella Therapy Practice Website & Online Consultation Booking') as HTMLImageElement;
    expect(marcellaImg).toBeDefined();
    expect(marcellaImg.src).toContain('marcella-therapy.jpg');

    // Marcella Therapy Client Link button
    const marcellaCta = screen.getByRole('link', { name: /Visit live Marcella Therapy site/i });
    expect(marcellaCta).toBeDefined();
    expect(marcellaCta.getAttribute('href')).toBe('https://marcella-therapy.pages.dev/');

    // Switch to Hair by April
    const hairByAprilTab = screen.getByRole('button', { name: /View Hair by April case study/i });
    fireEvent.click(hairByAprilTab);

    // Verified features and customer mechanics for Hair by April
    expect(screen.getByText(/Mobile-first storefront & direct appointment booking/i)).toBeDefined();
    expect(screen.getByText(/A mobile-first website for an independent San Francisco hair stylist/i)).toBeDefined();
    expect(screen.getByText('Find Business')).toBeDefined();

    // Live screenshot image for Hair by April
    const aprilImg = screen.getByAltText('Hair by April Live Website & Booking System') as HTMLImageElement;
    expect(aprilImg).toBeDefined();
    expect(aprilImg.src).toContain('hair-by-april.jpg');

    // Hair by April Client Link button
    const aprilCta = screen.getByRole('link', { name: /Visit live Hair by April site/i });
    expect(aprilCta).toBeDefined();
    expect(aprilCta.getAttribute('href')).toBe('https://hairbyapril.pages.dev/');
  });
});
