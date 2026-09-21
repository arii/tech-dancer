import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { IntakeForm } from '@/features/services/IntakeForm';

describe('IntakeForm Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders low-friction consultation form with Name, Email, and Notes', () => {
    render(<IntakeForm />);

    expect(screen.queryByText('STUDIO INTAKE & INQUIRY')).toBeNull();
    expect(screen.getByText('Request a Consultation')).toBeDefined();

    expect(screen.getByLabelText(/Full Name/i)).toBeDefined();
    expect(screen.getByLabelText(/Email Address/i)).toBeDefined();
    expect(screen.getByLabelText(/Project Scope & Notes/i)).toBeDefined();

    // Verify unnecessary fields are removed
    expect(screen.queryByLabelText(/Business \/ Practice/i)).toBeNull();
    expect(screen.queryByLabelText(/Industry \/ Niche/i)).toBeNull();
    expect(screen.queryByText('PRIMARY FOCUS')).toBeNull();

    expect(screen.getByRole('button', { name: /Send Message/i })).toBeDefined();
  });

  it('allows filling input fields in the low-friction form', () => {
    render(<IntakeForm />);

    const nameInput = screen.getByLabelText(/Full Name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/Email Address/i) as HTMLInputElement;
    const notesInput = screen.getByLabelText(/Project Scope & Notes/i) as HTMLTextAreaElement;

    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });
    fireEvent.change(notesInput, { target: { value: 'Need booking system setup' } });

    expect(nameInput.value).toBe('Jane Doe');
    expect(emailInput.value).toBe('jane@example.com');
    expect(notesInput.value).toBe('Need booking system setup');
  });
});
