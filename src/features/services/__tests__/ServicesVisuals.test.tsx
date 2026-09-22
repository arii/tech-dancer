import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { ModularPackages } from '@/features/services/Packages';
import { IntakeForm } from '@/features/services/IntakeForm';

describe('Services Page Modular Packages', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders Digital Foundation and 6 modular capability cards', () => {
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

    // Check key capability items
    expect(screen.getByText('24/7 calendar availability & sync')).toBeDefined();
    expect(screen.getByText('Intake questionnaires & screening')).toBeDefined();
    expect(screen.getByText('Custom AI-assisted workflow engines')).toBeDefined();
  });
});

describe('IntakeForm', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the consultation form with all required fields', () => {
    render(<IntakeForm />);

    expect(screen.getByLabelText(/full name/i)).toBeDefined();
    expect(screen.getByLabelText(/email address/i)).toBeDefined();
    expect(screen.getByLabelText(/project scope/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /send message/i })).toBeDefined();
  });
});
