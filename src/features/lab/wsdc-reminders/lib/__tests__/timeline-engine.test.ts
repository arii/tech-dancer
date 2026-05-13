import { describe, it, expect } from 'vitest';
import { calculateTimeline } from '../timeline-engine';
import { EventAnchors } from '../../types';

describe('timeline-engine', () => {
  const mockEvent: EventAnchors = {
    title: 'Test Convention',
    startDate: '2024-06-01T00:00:00Z',
    earlyBirdDate: '2024-04-01T00:00:00Z',
    hotelCutoffDate: '2024-05-01T00:00:00Z',
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

    const expectedDate = new Date(new Date(mockEvent.startDate).getTime() - (90 * 24 * 60 * 60 * 1000));
    expect(flightTrack?.date.toISOString()).toBe(expectedDate.toISOString());
  });

  it('should calculate early bird with 2-day buffer', () => {
    const timeline = calculateTimeline(mockEvent);
    const earlyBird = timeline.find(item => item.id === 'early-bird');

    const expectedDate = new Date(new Date(mockEvent.earlyBirdDate).getTime() - (2 * 24 * 60 * 60 * 1000));
    expect(earlyBird?.date.toISOString()).toBe(expectedDate.toISOString());
  });

  it('should use hotel cutoff date exactly', () => {
    const timeline = calculateTimeline(mockEvent);
    const hotelBlock = timeline.find(item => item.id === 'hotel-block');

    expect(hotelBlock?.date.toISOString()).toBe(new Date(mockEvent.hotelCutoffDate).toISOString());
  });

  it('should calculate competition window 14 days before start', () => {
    const timeline = calculateTimeline(mockEvent);
    const compWindow = timeline.find(item => item.id === 'comp-window');

    const expectedDate = new Date(new Date(mockEvent.startDate).getTime() - (14 * 24 * 60 * 60 * 1000));
    expect(compWindow?.date.toISOString()).toBe(expectedDate.toISOString());
  });

  it('should calculate cancel safety check 5 days before start', () => {
    const timeline = calculateTimeline(mockEvent);
    const cancelSafety = timeline.find(item => item.id === 'cancel-safety');

    const expectedDate = new Date(new Date(mockEvent.startDate).getTime() - (5 * 24 * 60 * 60 * 1000));
    expect(cancelSafety?.date.toISOString()).toBe(expectedDate.toISOString());
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

  it('should include registration deadline if provided', () => {
    const eventWithDeadline: EventAnchors = {
      ...mockEvent,
      registrationDeadline: '2024-05-25'
    };
    const timeline = calculateTimeline(eventWithDeadline);
    expect(timeline).toHaveLength(6);

    const registration = timeline.find(item => item.id === 'registration-deadline');
    expect(registration).toBeDefined();
    expect(registration?.date.getFullYear()).toBe(2024);
    expect(registration?.date.getMonth()).toBe(4); // May
    expect(registration?.date.getDate()).toBe(25);
  });
});
