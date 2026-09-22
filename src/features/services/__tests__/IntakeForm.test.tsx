import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
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

  it('renders direct calendar booking link in form header', () => {
    render(<IntakeForm />);

    const headerLink = screen.getByText(/Book a 15-minute Discovery Call directly/i).closest('a');
    expect(headerLink).not.toBeNull();
    expect(headerLink?.getAttribute('href')).toBe('https://cal.com/boomtick');
    expect(headerLink?.getAttribute('target')).toBe('_blank');
    expect(headerLink?.getAttribute('rel')).toBe('noopener noreferrer');
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

  describe('Submission States', () => {
    let fetchMock: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      fetchMock = vi.fn();
      global.fetch = fetchMock;
      vi.stubEnv('VITE_MAILING_LIST_DEPLOYMENT_ID', 'test-deployment-id');
    });

    afterEach(() => {
      vi.unstubAllEnvs();
      vi.restoreAllMocks();
    });

    it('shows loading spinner and disables button during submission', async () => {
      let resolveFetch: (value: unknown) => void;
      fetchMock.mockReturnValue(new Promise((resolve) => {
        resolveFetch = resolve;
      }));

      render(<IntakeForm />);

      const nameInput = screen.getByLabelText(/Full Name/i);
      const emailInput = screen.getByLabelText(/Email Address/i);
      const notesInput = screen.getByLabelText(/Project Scope & Notes/i);
      const submitButton = screen.getByRole('button', { name: /Send Message/i });

      fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
      fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });
      fireEvent.change(notesInput, { target: { value: 'Test notes' } });

      fireEvent.click(submitButton);

      expect(submitButton.hasAttribute('disabled')).toBe(true);
      expect(submitButton.getAttribute('aria-busy')).toBe('true');
      expect(screen.getByText('Sending...')).toBeDefined();

      // Resolve the fetch to avoid hanging the test
      resolveFetch!({ ok: true });

      await waitFor(() => {
        expect(submitButton.hasAttribute('disabled')).toBe(false);
      });
    });

    it('displays success banner and clears form on successful submission', async () => {
      fetchMock.mockResolvedValue({ ok: true });

      render(<IntakeForm />);

      const nameInput = screen.getByLabelText(/Full Name/i) as HTMLInputElement;
      const emailInput = screen.getByLabelText(/Email Address/i) as HTMLInputElement;
      const notesInput = screen.getByLabelText(/Project Scope & Notes/i) as HTMLTextAreaElement;
      const submitButton = screen.getByRole('button', { name: /Send Message/i });

      fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
      fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });
      fireEvent.change(notesInput, { target: { value: 'Test notes' } });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Message sent!/)).toBeDefined();
        expect(screen.getByRole('status')).toBeDefined();
      });

      const successBookingButton = screen.getByText(/Book Discovery Call on Calendar/i).closest('a');
      expect(successBookingButton).not.toBeNull();
      expect(successBookingButton?.getAttribute('href')).toBe('https://cal.com/boomtick');
      expect(successBookingButton?.getAttribute('target')).toBe('_blank');
      expect(successBookingButton?.getAttribute('rel')).toBe('noopener noreferrer');

      expect(nameInput.value).toBe('');
      expect(emailInput.value).toBe('');
      expect(notesInput.value).toBe('');
    });

    it('uses custom VITE_CALENDAR_BOOKING_URL when provided', async () => {
      vi.stubEnv('VITE_CALENDAR_BOOKING_URL', 'https://calendly.com/custom-boomtick');
      fetchMock.mockResolvedValue({ ok: true });

      render(<IntakeForm />);

      const headerLink = screen.getByText(/Book a 15-minute Discovery Call directly/i).closest('a');
      expect(headerLink?.getAttribute('href')).toBe('https://calendly.com/custom-boomtick');

      const submitButton = screen.getByRole('button', { name: /Send Message/i });
      fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Jane Doe' } });
      fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'jane@example.com' } });
      fireEvent.change(screen.getByLabelText(/Project Scope & Notes/i), { target: { value: 'Test notes' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Message sent!/)).toBeDefined();
      });

      const successBookingButton = screen.getByText(/Book Discovery Call on Calendar/i).closest('a');
      expect(successBookingButton?.getAttribute('href')).toBe('https://calendly.com/custom-boomtick');
    });

    it('displays error banner and retains form data on failed submission', async () => {
      fetchMock.mockRejectedValue(new Error('Network error'));

      render(<IntakeForm />);

      const nameInput = screen.getByLabelText(/Full Name/i) as HTMLInputElement;
      const emailInput = screen.getByLabelText(/Email Address/i) as HTMLInputElement;
      const notesInput = screen.getByLabelText(/Project Scope & Notes/i) as HTMLTextAreaElement;
      const submitButton = screen.getByRole('button', { name: /Send Message/i });

      fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
      fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });
      fireEvent.change(notesInput, { target: { value: 'Test notes' } });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Something went wrong./)).toBeDefined();
        expect(screen.getByRole('alert')).toBeDefined();
      });

      expect(nameInput.value).toBe('Jane Doe');
      expect(emailInput.value).toBe('jane@example.com');
      expect(notesInput.value).toBe('Test notes');
    });
  });
});
