import { renderHook, act, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useNavigatorStorage } from '../hooks/useNavigatorStorage';
import { adaptTraceToUserPreferences } from '../utils/scheduleRuleEngine';
import { AgentDecisionTrace } from '../types';

describe('useNavigatorStorage Hook', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('debounces saving draft state by 500ms under key tech-dancer-wcs-draft', () => {
    const { result } = renderHook(() => useNavigatorStorage('boogie-2026'));

    act(() => {
      result.current.saveDraftDebounced({
        eventId: 'boogie-2026',
        eventName: 'Boogie by the Bay 2026',
        division: 'intermediate',
        role: '',
        answers: { arrival: 'local' },
      });
    });

    // Immediate state before timer runs
    expect(localStorage.getItem('tech-dancer-wcs-draft')).toBeNull();

    // Fast forward 500ms
    act(() => {
      vi.advanceTimersByTime(500);
    });

    const stored = localStorage.getItem('tech-dancer-wcs-draft');
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored!);
    expect(parsed.eventId).toBe('boogie-2026');
    expect(parsed.division).toBe('intermediate');
    expect(parsed.role).toBe('');
    expect(parsed.answers).toEqual({ arrival: 'local' });
  });

  it('saves and retrieves custom schedule overrides under wcs_navigator_schedule_<eventId>', () => {
    const { result } = renderHook(() => useNavigatorStorage('south-bay'));

    act(() => {
      result.current.saveCustomSchedule('south-bay', ['session-1', 'session-3']);
    });

    const saved = result.current.getSavedSchedule('south-bay');
    expect(saved).toEqual(['session-1', 'session-3']);

    const rawStored = localStorage.getItem('wcs_navigator_schedule_south-bay');
    expect(rawStored).toContain('session-1');
  });
});

describe('Arrival Target & Rule Engine Adaptations', () => {
  const mockTrace: AgentDecisionTrace = {
    eventName: 'Boogie by the Bay 2026',
    bufferTimeline: {
      latestFlightArrivalDeadline: '2:15 PM Friday',
      earliestStagingTime: '5:15 PM Friday',
      transitMinutes: 30,
      hotelSettleMinutes: 90,
      warmupMinutes: 45,
      steps: [
        {
          time: '2:15 PM',
          type: 'transit',
          label: 'Target Safe Flight Landing',
          description: 'Recommended landing time',
          bufferMinutes: 30,
        },
      ],
    },
    sessions: [
      {
        id: 's1',
        title: 'Novice Strictly Swing Preliminaries',
        day: 'Friday',
        time: '6:30 PM - 8:00 PM',
        location: 'Grand Ballroom',
        category: 'competition',
        status: 'included',
        decisionBadge: 'Competition Call',
        justification: 'Division match',
      },
    ],
    themeDressCodes: [],
  };

  it('adapts target arrival for local commute / drive-in', () => {
    const adapted = adaptTraceToUserPreferences(mockTrace, { arrival: 'local' }, 'Boogie by the Bay 2026');
    expect(adapted.bufferTimeline.latestFlightArrivalDeadline).toBe('Local Commute (Drive-In)');
    expect(adapted.bufferTimeline.steps[0].label).toBe('Local Hotel / Venue Arrival Buffer');
    expect(adapted.bufferTimeline.steps[0].time).toBe('4:15 PM');
  });

  it('adapts target arrival for intensive registered attendees', () => {
    const adapted = adaptTraceToUserPreferences(mockTrace, { intensive: 'yes' }, 'Boogie by the Bay 2026');
    expect(adapted.bufferTimeline.latestFlightArrivalDeadline).toBe('12:00 PM Friday');
    expect(adapted.bufferTimeline.steps[0].time).toBe('12:00 PM');
  });

  it('adapts target arrival for Friday evening arrival', () => {
    const adapted = adaptTraceToUserPreferences(mockTrace, { arrival: 'evening' }, 'Boogie by the Bay 2026');
    expect(adapted.bufferTimeline.latestFlightArrivalDeadline).toBe('6:30 PM Friday');
  });
});
