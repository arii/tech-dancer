import { DiscoveryResponse, QuestionAnswerValue } from '../types/navigator';
import { AgentDecisionTrace, GenerateResponse } from '../types';
import { extractScheduleFromDocument } from './liveScheduleExtractor';

const DEFAULT_API_BASE = 'http://localhost:8000';

function getApiBaseUrl(): string {
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WCS_API_URL) {
    return import.meta.env.VITE_WCS_API_URL.replace(/\/$/, '');
  }
  return DEFAULT_API_BASE;
}

export interface DiscoverApiResult {
  discovery: DiscoveryResponse;
  decisionTrace: AgentDecisionTrace;
  source: 'live_api' | 'client_heuristic';
  errorReason?: string;
}

/**
 * Executes Stage 1 Schedule Discovery against the live FastAPI server,
 * falling back seamlessly to client-side heuristic extraction if the server is offline.
 */
export async function discoverSchedule(
  target: File | string,
  isMockMode: boolean = false
): Promise<DiscoverApiResult> {
  const targetName = target instanceof File ? target.name : target;

  if (isMockMode) {
    const extracted = await extractScheduleFromDocument(targetName);
    return {
      discovery: extracted.discovery,
      decisionTrace: extracted.decisionTrace,
      source: 'client_heuristic',
    };
  }

  const apiBase = getApiBaseUrl();

  try {
    let response: Response;

    if (target instanceof File) {
      const formData = new FormData();
      formData.append('file', target);
      response = await fetch(`${apiBase}/api/v1/discover`, {
        method: 'POST',
        body: formData,
      });
    } else {
      response = await fetch(`${apiBase}/api/v1/discover`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: target }),
      });
    }

    if (!response.ok) {
      throw new Error(`Live API error: HTTP ${response.status} ${response.statusText}`);
    }

    const discoveryData: DiscoveryResponse = await response.json();
    const extracted = await extractScheduleFromDocument(targetName);

    // Merge backend discovery with fallback decision trace structure
    return {
      discovery: {
        ...extracted.discovery,
        ...discoveryData,
        suggested_form_questions:
          discoveryData.suggested_form_questions?.length > 0
            ? discoveryData.suggested_form_questions
            : extracted.discovery.suggested_form_questions,
      },
      decisionTrace: extracted.decisionTrace,
      source: 'live_api',
    };
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    console.warn('[WCS Navigator] Live discovery gateway unreachable, using heuristic engine:', err);
    const extracted = await extractScheduleFromDocument(targetName);
    return {
      discovery: extracted.discovery,
      decisionTrace: extracted.decisionTrace,
      source: 'client_heuristic',
      errorReason: reason,
    };
  }
}

/**
 * Executes Stage 2 Schedule Generation against the live FastAPI server,
 * streaming the customized calendar and decision trace with fallback support.
 */
export async function generateSchedule(
  target: File | string | null,
  answers: Record<string, QuestionAnswerValue>,
  eventName: string,
  baseTrace?: AgentDecisionTrace,
  isMockMode: boolean = false
): Promise<GenerateResponse> {
  if (isMockMode || !target) {
    const extracted = await extractScheduleFromDocument(eventName);
    return {
      decisionTrace: baseTrace || extracted.decisionTrace,
      icsContent: baseTrace?.icsContent || extracted.decisionTrace.icsContent,
    };
  }

  const apiBase = getApiBaseUrl();

  try {
    let response: Response;

    if (target instanceof File) {
      const formData = new FormData();
      formData.append('file', target);
      formData.append('questionnaire_responses', JSON.stringify(answers));
      response = await fetch(`${apiBase}/api/v1/generate`, {
        method: 'POST',
        body: formData,
      });
    } else {
      response = await fetch(`${apiBase}/api/v1/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: target,
          questionnaire_responses: answers,
        }),
      });
    }

    if (!response.ok) {
      throw new Error(`Live generation error: HTTP ${response.status}`);
    }

    const data: GenerateResponse = await response.json();
    return data;
  } catch (err) {
    console.warn('[WCS Navigator] Live generation gateway unreachable, using fallback state:', err);
    const extracted = await extractScheduleFromDocument(eventName);
    return {
      decisionTrace: baseTrace || extracted.decisionTrace,
      icsContent: baseTrace?.icsContent || extracted.decisionTrace.icsContent,
    };
  }
}
