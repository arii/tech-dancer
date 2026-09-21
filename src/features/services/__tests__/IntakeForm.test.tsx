import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { IntakeForm } from '@/features/services/IntakeForm';

describe('IntakeForm Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders Step 1 with required inputs and step progress indicator', () => {
    render(<IntakeForm />);

    expect(screen.getByText('STUDIO INTAKE & INQUIRY')).toBeDefined();
    expect(screen.getByText('Request Studio Consultation')).toBeDefined();
    expect(screen.getByText('1. Studio & Contact')).toBeDefined();
    expect(screen.getByText('2. Focus & Scope')).toBeDefined();

    expect(screen.getByLabelText(/Full Name/i)).toBeDefined();
    expect(screen.getByLabelText(/Email Address/i)).toBeDefined();
    expect(screen.getByLabelText(/Business \/ Practice Name/i)).toBeDefined();
    expect(screen.getByLabelText(/Industry \/ Niche/i)).toBeDefined();

    expect(screen.getByRole('button', { name: /Continue to Project Focus/i })).toBeDefined();
  });

  it('advances to Step 2 when required Step 1 fields are provided and allows going back', () => {
    render(<IntakeForm />);

    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/Business \/ Practice Name/i), { target: { value: 'Jane Studio' } });
    fireEvent.change(screen.getByLabelText(/Industry \/ Niche/i), { target: { value: 'Hair & Beauty' } });

    fireEvent.click(screen.getByRole('button', { name: /Continue to Project Focus/i }));

    // Now in Step 2
    expect(screen.getByText('Primary Operational Focus')).toBeDefined();
    expect(screen.getByLabelText(/Current Website or Social Handle/i)).toBeDefined();
    expect(screen.getByLabelText(/Project Scope & Notes/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Submit Consultation Request/i })).toBeDefined();

    // Go back to Step 1
    fireEvent.click(screen.getByRole('button', { name: /Back to Contact Info/i }));
    expect((screen.getByLabelText(/Full Name/i) as HTMLInputElement).value).toBe('Jane Doe');
  });
});
