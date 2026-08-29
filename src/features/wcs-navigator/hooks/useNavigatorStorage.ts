import { useState, useEffect, useCallback, useRef } from 'react';
import { QuestionAnswerValue } from '../types/navigator';

export interface NavigatorDraftState {
  eventId: string;
  eventName: string;
  division: string;
  role: string;
  answers: Record<string, QuestionAnswerValue>;
  timestamp: number;
}

export interface SavedScheduleCustomization {
  eventId: string;
  includedSessionIds: string[];
  lastModified: number;
}

const DRAFT_STORAGE_KEY = 'tech-dancer-wcs-draft';
const SCHEDULE_STORAGE_PREFIX = 'wcs_navigator_schedule_';

function safeGetItem(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch (err) {
    console.warn(`[useNavigatorStorage] Failed to read ${key} from localStorage:`, err);
  }
  return null;
}

function safeSetItem(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch (err) {
    console.warn(`[useNavigatorStorage] Failed to save ${key} to localStorage:`, err);
  }
}

function safeRemoveItem(key: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(key);
    }
  } catch (err) {
    console.warn(`[useNavigatorStorage] Failed to remove ${key} from localStorage:`, err);
  }
}

export function useNavigatorStorage(_activeEventId?: string) {
  const [draft, setDraft] = useState<NavigatorDraftState | null>(() => {
    const raw = safeGetItem(DRAFT_STORAGE_KEY);
    if (raw) {
      try {
        return JSON.parse(raw) as NavigatorDraftState;
      } catch {
        return null;
      }
    }
    return null;
  });

  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, []);

  const saveDraftDebounced = useCallback((draftData: Partial<NavigatorDraftState>) => {
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = setTimeout(() => {
      setDraft((prev) => {
        const next: NavigatorDraftState = {
          eventId: draftData.eventId ?? prev?.eventId ?? '',
          eventName: draftData.eventName ?? prev?.eventName ?? '',
          division: draftData.division ?? prev?.division ?? 'novice',
          role: draftData.role ?? prev?.role ?? '',
          answers: { ...prev?.answers, ...draftData.answers },
          timestamp: Date.now(),
        };
        safeSetItem(DRAFT_STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    }, 500);
  }, []);

  const clearDraft = useCallback(() => {
    safeRemoveItem(DRAFT_STORAGE_KEY);
    setDraft(null);
  }, []);

  const getSavedSchedule = useCallback((eventId: string): string[] | null => {
    if (!eventId) return null;
    const cleanId = eventId.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const raw = safeGetItem(`${SCHEDULE_STORAGE_PREFIX}${cleanId}`);
    if (raw) {
      try {
        const parsed: SavedScheduleCustomization = JSON.parse(raw);
        return parsed.includedSessionIds || null;
      } catch {
        return null;
      }
    }
    return null;
  }, []);

  const saveCustomSchedule = useCallback((eventId: string, includedSessionIds: string[]) => {
    if (!eventId) return;
    const cleanId = eventId.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const payload: SavedScheduleCustomization = {
      eventId: cleanId,
      includedSessionIds,
      lastModified: Date.now(),
    };
    safeSetItem(`${SCHEDULE_STORAGE_PREFIX}${cleanId}`, JSON.stringify(payload));
  }, []);

  const clearCustomSchedule = useCallback((eventId: string) => {
    if (!eventId) return;
    const cleanId = eventId.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    safeRemoveItem(`${SCHEDULE_STORAGE_PREFIX}${cleanId}`);
  }, []);

  return {
    draft,
    saveDraftDebounced,
    clearDraft,
    getSavedSchedule,
    saveCustomSchedule,
    clearCustomSchedule,
  };
}

export default useNavigatorStorage;
