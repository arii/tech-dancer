import { describe, it, expect } from 'vitest';
import { calculateTimeline, calculateJourneyTimeline } from '../timeline-utils';
import { EventAnchors } from '../../types';

describe('timeline-utils', () => {
  const mockEvent: EventAnchors = {
    title: 'Test Event',
    startDate: '2024-06-01',
    earlyBirdDate: '2024-04-01',
    registrationDeadline: '2024-05-15',
    hotelCutoffDate: '2024-05-01',
    packingReminderDate: '2024-05-25',
  };

  it('should calculate all items when no options are provided', () => {
    const timeline = calculateTimeline(mockEvent);
    // 3 base items + 4 optional items = 7
    expect(timeline.length).toBe(7);
  });

  it('should filter items when filterIds is provided', () => {
    const timeline = calculateTimeline(mockEvent, { filterIds: ['early-bird', 'hotel-block'] });
    expect(timeline.length).toBe(2);
    expect(timeline[0].id).toBe('early-bird');
    expect(timeline[1].id).toBe('hotel-block');
  });

  it('should only return journey items when using calculateJourneyTimeline', () => {
    const timeline = calculateJourneyTimeline(mockEvent);
    expect(timeline.length).toBe(4);
    const ids = timeline.map(t => t.id);
    expect(ids).toContain('early-bird');
    expect(ids).toContain('registration-deadline');
    expect(ids).toContain('hotel-block');
    expect(ids).toContain('packing-reminder');
    expect(ids).not.toContain('flight-track');
  });

  it('should sort items by date', () => {
    const timeline = calculateTimeline(mockEvent);
    const dates = timeline.map(t => t.date.getTime());
    const sortedDates = [...dates].sort((a, b) => a - b);
    expect(dates).toEqual(sortedDates);
  });
});
