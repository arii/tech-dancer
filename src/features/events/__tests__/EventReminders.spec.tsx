import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { EventReminders } from '../components/EventReminders';
import { createMockEvent } from '../../../../tests/fixtures/events';

vi.mock('@/features/lab/wsdc-reminders/lib/ics-generator', () => ({
  generateICS: vi.fn(() => 'mock-ics-content'),
  downloadICS: vi.fn(),
}));

afterEach(cleanup);

describe('EventReminders', () => {
  it('should not render when no reminder dates are provided', () => {
    const { container } = render(<EventReminders event={createMockEvent()} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render when only registrationDeadline is provided', () => {
    render(<EventReminders event={createMockEvent({ registrationDeadline: '2024-05-15' })} />);
    expect(screen.getByText(/Stay on Top of What Matters/i)).toBeTruthy();
    expect(screen.getByText(/Registration Deadline/i)).toBeTruthy();
    expect(screen.getByText(/Required/i)).toBeTruthy();
  });

  it('should render all reminder dates when provided', () => {
    render(<EventReminders event={createMockEvent({
      earlyBirdDate: '2024-04-01',
      registrationDeadline: '2024-05-15',
      hotelCutoffDate: '2024-05-01',
      packingReminderDate: '2024-05-25',
    })} />);

    expect(screen.getByText(/Early Bird Deadline/i)).toBeTruthy();
    expect(screen.getByText(/Registration Deadline/i)).toBeTruthy();
    expect(screen.getByText(/Hotel Block Cutoff/i)).toBeTruthy();
    expect(screen.getByText(/Packing Reminder/i)).toBeTruthy();
  });

  it('should show "Soon" badges for unimplemented channels', () => {
    render(<EventReminders event={createMockEvent({ registrationDeadline: '2024-05-15' })} />);
    const soonBadges = screen.queryAllByText(/Soon/i);
    expect(soonBadges.length).toBeGreaterThan(0);
  });

  it('should show confirmation state after clicking the CTA', () => {
    render(<EventReminders event={createMockEvent({ registrationDeadline: '2024-05-15' })} />);
    fireEvent.click(screen.getByText(/Set Event Reminders/i));
    expect(screen.getByText(/You're All Set!/i)).toBeTruthy();
  });
});
