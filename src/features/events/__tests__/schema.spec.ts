import { describe, it, expect } from 'vitest';
import { getEventSchema } from '../schema';
import { Event } from '@/lib/content';
import { BASE_URL, SITE_NAME } from '@/config/constants';

describe('getEventSchema', () => {
  const mockEvent: Event = {
    type: 'event',
    slug: 'test-event',
    title: 'Test Event',
    date: '2025-01-01',
    startDate: '2025-01-01',
    author: 'Test Author',
    category: 'Test Category',
    excerpt: 'Test excerpt',
    description: 'Test description',
    location: 'Test Venue',
    city: 'Test City',
    schedule: 'Jan 1, 2025',
    content: 'Test content',
    heroImage: '/assets/test.jpg'
  };

  it('correctly maps event data to schema.org Event', () => {
    const schema = getEventSchema(mockEvent);

    expect(schema).toEqual({
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Test Event",
      "description": "Test description",
      "image": `${BASE_URL}/assets/test.jpg`,
      "startDate": "2025-01-01",
      "url": `${BASE_URL}/events/test-event`,
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "Test Venue",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Test City",
          "addressRegion": undefined,
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": SITE_NAME,
        "url": BASE_URL
      }
    });
  });

  it('prioritizes whyAttending over description and excerpt', () => {
    const eventWithWhyAttending = {
      ...mockEvent,
      whyAttending: 'Why attend this event'
    };
    const schema = getEventSchema(eventWithWhyAttending as Event);
    expect(schema.description).toBe('Why attend this event');
  });

  it('uses excerpt if description and whyAttending are missing', () => {
    const minimalEvent = { ...mockEvent, description: '', whyAttending: '' };
    const schema = getEventSchema(minimalEvent as Event);
    expect(schema.description).toBe('Test excerpt');
  });

  it('uses date if startDate is missing', () => {
    const eventWithoutStartDate = { ...mockEvent, startDate: undefined };
    const schema = getEventSchema(eventWithoutStartDate as Event);
    expect(schema.startDate).toBe('2025-01-01');
  });

  it('handles missing image', () => {
    const eventWithoutImage = { ...mockEvent, heroImage: '' };
    const schema = getEventSchema(eventWithoutImage as Event);
    expect(schema.image).toBeUndefined();
  });

  it('handles absolute image URL', () => {
    const eventWithAbsoluteImage = { ...mockEvent, heroImage: 'https://example.com/image.jpg' };
    const schema = getEventSchema(eventWithAbsoluteImage as Event);
    expect(schema.image).toBe('https://example.com/image.jpg');
  });

  it('correctly parses city and state', () => {
    const eventWithState = { ...mockEvent, city: 'San Francisco, CA' };
    const schema = getEventSchema(eventWithState as Event);
    expect(schema.location.address.addressLocality).toBe('San Francisco');
    expect(schema.location.address.addressRegion).toBe('CA');
  });
});
