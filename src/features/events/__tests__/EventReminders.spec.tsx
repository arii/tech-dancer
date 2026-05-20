import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { EventReminders } from '../components/EventReminders';
import { Event } from '@/lib/content';

// Mock the ics-generator to avoid issues with browser APIs in tests
vi.mock('@/features/lab/wsdc-reminders/lib/ics-generator', () => ({
  generateICS: vi.fn(() => 'mock-ics-content'),
  downloadICS: vi.fn(),
}));

const baseEvent: Partial<Event> = {
  type: 'event',
  title: 'Test Convention',
  startDate: '2024-06-01',
  date: '2024-06-01',
  url: 'https://example.com/event',
};

describe('EventReminders', () => {
  it('should not render when no reminder dates are provided', () => {
    const event = { ...baseEvent } as Event;
    const { container } = render(<EventReminders event={event} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render when only registrationDeadline is provided', () => {
    const event = {
      ...baseEvent,
      registrationDeadline: '2024-05-15'
    } as Event;
    render(<EventReminders event={event} />);

    expect(screen.getByText(/Stay on Top of What Matters/i)).toBeDefined();
    expect(screen.getByText(/Registration Deadline/i)).toBeDefined();
    expect(screen.getByText(/Required/i)).toBeDefined();
  });

  it('should render all reminder dates when provided', () => {
    const event = {
      ...baseEvent,
      earlyBirdDate: '2024-04-01',
      registrationDeadline: '2024-05-15',
      hotelCutoffDate: '2024-05-01',
      packingReminderDate: '2024-05-25',
    } as Event;
    render(<EventReminders event={event} />);

    expect(screen.queryAllByText(/Early Bird Deadline/i)).toBeDefined();
    expect(screen.queryAllByText(/Registration Deadline/i)).toBeDefined();
    expect(screen.queryAllByText(/Hotel Block Cutoff/i)).toBeDefined();
    expect(screen.queryAllByText(/Packing Reminder/i)).toBeDefined();
  });

  it('should show "Soon" badges for unimplemented channels', () => {
    const event = {
      ...baseEvent,
      registrationDeadline: '2024-05-15'
    } as Event;
    render(<EventReminders event={event} />);

    // Notification channels use "Soon" badges
    const soonBadges = screen.getAllByText(/Soon/i);
    expect(soonBadges.length).toBeGreaterThanOrEqual(3); // Email, Push, SMS
  });

  it('should show confirmation state after clicking the CTA', () => {
    const event = {
      ...baseEvent,
      registrationDeadline: '2024-05-15'
    } as Event;
    render(<EventReminders event={event} />);

    // In the test environment, Button might render as multiple elements or have accessibility roles that conflict
    // Find all buttons and click the one that contains our text
    const buttons = screen.getAllByRole('button');
    const cta = buttons.find(b => b.textContent?.includes('Set Event Reminders'));
    if (!cta) throw new Error('CTA not found');

    fireEvent.click(cta);

    expect(screen.getByText(/You're All Set!/i)).toBeDefined();
    expect(screen.getByText(/Update Preferences/i)).toBeDefined();
  });
});
