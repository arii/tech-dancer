import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ShippingPolicy from '@/pages/ShippingPolicy';
import ReturnPolicy from '@/pages/ReturnPolicy';
import { Footer } from '@/layouts/Footer';

describe('Standalone Policy Pages & Merchant Contact Signals', () => {
  test('renders Shipping Policy page with fulfillment timelines and dynamic calculation disclosures', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ShippingPolicy />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByTestId('shipping-policy-page')).toBeDefined();
    expect(screen.getByText('Shipping & Fulfillment Policy')).toBeDefined();
    expect(screen.getByText(/2–7 business days/i)).toBeDefined();
    expect(screen.getByText(/4–8 business days/i)).toBeDefined();
    expect(screen.getByText(/6–15 business days/i)).toBeDefined();
    expect(screen.getByText(/calculated dynamically at checkout by Printful/i)).toBeDefined();
    expect(screen.getByText('ari@boomtick.blog')).toBeDefined();
  });

  test('renders Return Policy page with 30-day claims and damaged/defective guidelines', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ReturnPolicy />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByTestId('return-policy-page')).toBeDefined();
    expect(screen.getByText('Return & Refund Policy')).toBeDefined();
    expect(screen.getByText(/30 days of product delivery/i)).toBeDefined();
    expect(screen.getAllByText('ari@boomtick.blog').length).toBeGreaterThan(0);
    expect(screen.getByText(/Made-to-Order Custom Policy/i)).toBeDefined();
  });

  test('renders global Footer with all required policy links and merchant contact signals', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByText('Shipping')).toBeDefined();
    expect(screen.getByText('Returns')).toBeDefined();
    expect(screen.getByText('Privacy')).toBeDefined();
    expect(screen.getByText('Terms')).toBeDefined();
    expect(screen.getByText('Contact')).toBeDefined();

    expect(screen.getByText('BoomTick (BoomTick.blog)')).toBeDefined();
    expect(screen.getByText(/San Francisco, CA, USA/i)).toBeDefined();
    expect(screen.getAllByText('ari@boomtick.blog').length).toBeGreaterThan(0);
  });
});
