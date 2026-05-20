import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { EventReminders } from './EventReminders';
import type { Event } from '@/lib/content';

const baseEvent: Event = {
  type: 'event',
  slug: 'test-event',
  title: 'Test Event',
  date: '2026-01-01',
  author: 'Tester',
  category: 'Events',
  excerpt: 'Excerpt',
  location: 'Venue',
  city: 'City',
  schedule: 'Schedule',
  description: 'Description',
  content: 'Content'
};

describe('EventReminders', () => {
  it('renders reminder rows for available reminder dates', () => {
    const html = renderToStaticMarkup(
      <EventReminders
        event={{
          ...baseEvent,
          earlyBirdDate: '2026-02-01',
          registrationDeadline: '2026-02-10',
          hotelCutoffDate: '2026-02-15',
          packingReminderDate: '2026-02-20'
        }}
      />
    );

    expect(html).toContain('Early-bird discount');
    expect(html).toContain('Registration deadline');
    expect(html).toContain('Hotel cutoff');
    expect(html).toContain('Packing reminder');
    expect(html).toContain('Sign up for reminders');
  });

  it('does not render the module when no reminder dates are present', () => {
    const html = renderToStaticMarkup(<EventReminders event={baseEvent} />);
    expect(html).toBe('');
  });
});
