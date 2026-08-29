import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, cleanup } from '@testing-library/react';
import { useNavigatorStorage } from '../hooks/useNavigatorStorage';

describe('useNavigatorStorage Hook Suite', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  it('initializes with null draft when localStorage is empty', () => {
    const { result } = renderHook(() => useNavigatorStorage('boogie-by-the-bay-2026'));
    expect(result.current.draft).toBeNull();
  });

  it('debounces draft savings by 500ms and persists to localStorage', () => {
    const { result } = renderHook(() => useNavigatorStorage('boogie-by-the-bay-2026'));

    act(() => {
      result.current.saveDraftDebounced({
        eventId: 'boogie-by-the-bay-2026',
        eventName: 'Boogie by the Bay 2026',
        division: 'intermediate',
        role: '',
        answers: { arrival: 'local' },
      });
    });

    // Before timer advances, localStorage shouldn't have key yet
    expect(localStorage.getItem('tech-dancer-wcs-draft')).toBeNull();

    // Advance 500ms
    act(() => {
      vi.advanceTimersByTime(500);
    });

    const stored = localStorage.getItem('tech-dancer-wcs-draft');
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored!);
    expect(parsed.eventId).toBe('boogie-by-the-bay-2026');
    expect(parsed.division).toBe('intermediate');
    expect(parsed.role).toBe('');
    expect(parsed.answers).toEqual({ arrival: 'local' });
    expect(typeof parsed.timestamp).toBe('number');
  });

  it('loads existing draft from localStorage on initial render', () => {
    const mockDraft = {
      eventId: 'aloha-open',
      eventName: 'The Aloha Open 2026',
      division: 'advanced_allstar',
      role: 'follow',
      answers: { intensive: 'yes' },
      timestamp: 1700000000000,
    };
    localStorage.setItem('tech-dancer-wcs-draft', JSON.stringify(mockDraft));

    const { result } = renderHook(() => useNavigatorStorage('aloha-open'));
    expect(result.current.draft).toEqual(mockDraft);
  });

  it('handles clearing draft state correctly', () => {
    const mockDraft = {
      eventId: 'aloha-open',
      eventName: 'The Aloha Open 2026',
      division: 'novice',
      role: '',
      answers: {},
      timestamp: 1700000000000,
    };
    localStorage.setItem('tech-dancer-wcs-draft', JSON.stringify(mockDraft));

    const { result } = renderHook(() => useNavigatorStorage('aloha-open'));
    expect(result.current.draft).not.toBeNull();

    act(() => {
      result.current.clearDraft();
    });

    expect(result.current.draft).toBeNull();
    expect(localStorage.getItem('tech-dancer-wcs-draft')).toBeNull();
  });

  it('saves, retrieves, and clears custom schedule overrides per event', () => {
    const { result } = renderHook(() => useNavigatorStorage('south-bay-dance-fling-2026'));

    const sessionIds = ['session_1', 'session_2'];

    act(() => {
      result.current.saveCustomSchedule('South Bay Dance Fling 2026', sessionIds);
    });

    const storageKeyName = 'wcs_navigator_schedule_south-bay-dance-fling-2026';
    const stored = localStorage.getItem(storageKeyName);
    expect(stored).not.toBeNull();
    expect(JSON.parse(stored!).includedSessionIds).toEqual(sessionIds);

    const retrieved = result.current.getSavedSchedule('South Bay Dance Fling 2026');
    expect(retrieved).toEqual(sessionIds);

    act(() => {
      result.current.clearCustomSchedule('South Bay Dance Fling 2026');
    });

    expect(localStorage.getItem(storageKeyName)).toBeNull();
    expect(result.current.getSavedSchedule('South Bay Dance Fling 2026')).toBeNull();
  });

  it('safely handles localStorage QuotaExceededError or write exceptions without crashing', () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('QuotaExceededError', 'QuotaExceededError');
    });

    const { result } = renderHook(() => useNavigatorStorage('test-event'));

    act(() => {
      result.current.saveDraftDebounced({
        eventId: 'test-event',
        eventName: 'Test Event',
        division: 'novice',
        answers: {},
      });
      vi.advanceTimersByTime(500);
    });

    expect(consoleWarnSpy).toHaveBeenCalledWith(
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Failed to save'),
      expect.anything(),
      expect.anything()
    );
      expect.anything(),
      expect.anything()
    );

    setItemSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });
});
