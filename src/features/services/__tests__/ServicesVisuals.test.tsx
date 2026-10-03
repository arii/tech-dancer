import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { ModularPackages } from '@/features/services/Packages';
import { ClientSpotlight } from '@/features/services/ClientSpotlight';

describe('Services Page Modular Packages', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders Digital Foundation and modular capability cards', () => {
    render(<ModularPackages />);

    // Check Build your digital foundation & benefits
    expect(screen.getByText('Build your digital foundation')).toBeDefined();
    expect(screen.getByText(/A fast, polished website designed around your work/i)).toBeDefined();
    expect(screen.getByText('Mobile-responsive design')).toBeDefined();
    expect(screen.getByText('Built to help customers find you through local search')).toBeDefined();
    expect(screen.getByText('Your own professional domain and secure hosting')).toBeDefined();
    expect(screen.getByText('Booking, contact, and customer workflows built in')).toBeDefined();
    expect(screen.getByText('Ongoing updates, maintenance, and technical support')).toBeDefined();
    expect(screen.getByText('$1,500')).toBeDefined();

    // Check Connect, grow & automate your business title & capability cards
    expect(screen.getByText('Connect, grow & automate your business')).toBeDefined();
    expect(screen.getByText('Booking & Customer Workflows')).toBeDefined();
    expect(screen.getByText('Ecommerce & Digital Products')).toBeDefined();
    expect(screen.getByText('Events & Experiences')).toBeDefined();
    expect(screen.getByText('Marketing & Discovery')).toBeDefined();
    expect(screen.getByText('Business Automation')).toBeDefined();
    expect(screen.getByText('DevOps & Systems Advisory')).toBeDefined();

    // Check key capability items
    expect(screen.getByText('24/7 calendar availability & sync')).toBeDefined();
    expect(screen.getByText('Intake questionnaires & screening')).toBeDefined();
    expect(screen.getByText('Custom AI-assisted workflow engines')).toBeDefined();
    expect(screen.getByText('Senior technical advisory & system architecture')).toBeDefined();
  });
});

describe('ClientSpotlight Dual Portfolio Showcase', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders Marcella Therapy by default and toggles to Hair by April', () => {
    render(<ClientSpotlight />);

    // Default view: Marcella Therapy
    expect(screen.getByText('See it in action: Real client platforms')).toBeDefined();
    expect(screen.getAllByText('Marcella Therapy').length).toBeGreaterThan(0);
    expect(screen.getByText(/High-trust clinical web platform & Cal.com booking sync/i)).toBeDefined();
    expect(screen.getByText('Visit live Marcella Therapy site')).toBeDefined();
    expect(screen.getByText('Discover Practice')).toBeDefined();
    expect(screen.getByText('Automated Calendar Confirmation')).toBeDefined();

    // Switch to Hair by April
    const hairByAprilTab = screen.getByRole('button', { name: /View Hair by April case study/i });
    fireEvent.click(hairByAprilTab);

    expect(screen.getByText(/Mobile-first storefront & direct appointment booking/i)).toBeDefined();
    expect(screen.getByText('Visit live Hair by April site')).toBeDefined();
    expect(screen.getByText('Find Business')).toBeDefined();
    expect(screen.getByText('Instant Confirmation')).toBeDefined();
  });
});
