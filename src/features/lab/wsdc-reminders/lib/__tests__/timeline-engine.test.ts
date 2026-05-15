import { describe, it, expect } from 'vitest';
import { calculateTimeline } from '../timeline-engine';
import { parseDate, addDays } from '@/lib/utils';
import { EventAnchors } from '../../types';

describe('timeline-engine', () => {
  const mockEvent: EventAnchors = {
    title: 'Test Convention',
    startDate: '2024-06-01',
    earlyBirdDate: '2024-04-01',
    hotelCutoffDate: '2024-05-01',
    url: 'https://example.com/event'
  };

  it('should calculate all five timeline items', () => {
    const timeline = calculateTimeline(mockEvent);
    expect(timeline).toHaveLength(5);
  });

  it('should sort items by date', () => {
    const timeline = calculateTimeline(mockEvent);
    const dates = timeline.map(item => item.date.getTime());
    const sortedDates = [...dates].sort((a, b) => a - b);
    expect(dates).toEqual(sortedDates);
  });

  it('should calculate flight tracking 90 days before start', () => {
    const timeline = calculateTimeline(mockEvent);
    const flightTrack = timeline.find(item => item.id === 'flight-track');

    const expectedDate = addDays(parseDate(mockEvent.startDate), -90);
    expect(flightTrack?.date.getTime()).toBe(expectedDate.getTime());
  });

  it('should calculate early bird with 2-day buffer', () => {
    const timeline = calculateTimeline(mockEvent);
    const earlyBird = timeline.find(item => item.id === 'early-bird');

    const expectedDate = addDays(parseDate(mockEvent.earlyBirdDate), -2);
    expect(earlyBird?.date.getTime()).toBe(expectedDate.getTime());
  });

  it('should use hotel cutoff date exactly', () => {
    const timeline = calculateTimeline(mockEvent);
    const hotelBlock = timeline.find(item => item.id === 'hotel-block');

    expect(hotelBlock?.date.getTime()).toBe(parseDate(mockEvent.hotelCutoffDate).getTime());
  });

  it('should calculate competition window 14 days before start', () => {
    const timeline = calculateTimeline(mockEvent);
    const compWindow = timeline.find(item => item.id === 'comp-window');

    const expectedDate = addDays(parseDate(mockEvent.startDate), -14);
    expect(compWindow?.date.getTime()).toBe(expectedDate.getTime());
  });

  it('should calculate cancel safety check 5 days before start', () => {
    const timeline = calculateTimeline(mockEvent);
    const cancelSafety = timeline.find(item => item.id === 'cancel-safety');

    const expectedDate = addDays(parseDate(mockEvent.startDate), -5);
    expect(cancelSafety?.date.getTime()).toBe(expectedDate.getTime());
  });

  it('should handle date calculations spanning month boundaries', () => {
    const marchEvent: EventAnchors = {
      ...mockEvent,
      startDate: '2024-03-05',
    };
    const timeline = calculateTimeline(marchEvent);
    const cancelSafety = timeline.find(item => item.id === 'cancel-safety');

    // March 5th minus 5 days = Feb 29th (2024 is a leap year)
    // We expect the local date to be Feb 29th.
    expect(cancelSafety?.date.getFullYear()).toBe(2024);
    expect(cancelSafety?.date.getMonth()).toBe(1); // February
    expect(cancelSafety?.date.getDate()).toBe(29);
  });
});
