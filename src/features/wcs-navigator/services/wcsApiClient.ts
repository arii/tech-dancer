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

export interface ServiceTelemetry {
  endpoint: string;
  method: string;
  timestamp: string;
  durationMs: number;
  engine: string;
  httpStatus?: number;
  requestPayload?: unknown;
  responsePayload?: unknown;
  errorReason?: string;
}

export interface DiscoverApiResult {
  discovery: DiscoveryResponse;
  decisionTrace: AgentDecisionTrace;
  source: 'live_api' | 'client_heuristic';
  errorReason?: string;
  telemetry?: ServiceTelemetry;
}

/**
 * Executes Stage 1 Schedule Discovery against the live FastAPI server,
 * falling back seamlessly to client-side heuristic extraction if the server is offline.
 */
export async function discoverSchedule(
  target: File | string,
  isMockMode: boolean = false
): Promise<DiscoverApiResult> {
  const startTime = Date.now();
  const targetName = target instanceof File ? target.name : target;

  if (isMockMode) {
    const extracted = await extractScheduleFromDocument(targetName);
    const durationMs = Date.now() - startTime;
    return {
      discovery: extracted.discovery,
      decisionTrace: extracted.decisionTrace,
      source: 'client_heuristic',
      telemetry: {
        endpoint: 'client_heuristic://extractScheduleFromDocument',
        method: 'CLIENT_HEURISTIC',
        timestamp: new Date().toISOString(),
        durationMs,
        engine: 'Client Heuristic Engine (Offline)',
        requestPayload: { targetName, isMockMode },
        responsePayload: extracted.discovery,
        httpStatus: 200,
      },
    };
  }

  const apiBase = getApiBaseUrl();
  const endpoint = `${apiBase}/api/v1/discover`;

  try {
    let response: Response;
    let requestPayload: unknown;

    if (target instanceof File) {
      const formData = new FormData();
      formData.append('file', target);
      requestPayload = { fileName: target.name, fileSize: target.size, fileType: target.type };
      response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });
    } else {
      requestPayload = { url: target };
      response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload),
      });
    }

    const durationMs = Date.now() - startTime;

    if (!response.ok) {
      throw new Error(`Live API error: HTTP ${response.status} ${response.statusText}`);
    }

    const discoveryData: DiscoveryResponse = await response.json();
    const extracted = await extractScheduleFromDocument(targetName);

    const mergedDiscovery = {
      ...extracted.discovery,
      ...discoveryData,
      suggested_form_questions:
        discoveryData.suggested_form_questions?.length > 0
          ? discoveryData.suggested_form_questions
          : extracted.discovery.suggested_form_questions,
    };

    return {
      discovery: mergedDiscovery,
      decisionTrace: extracted.decisionTrace,
      source: 'live_api',
      telemetry: {
        endpoint,
        method: 'POST',
        timestamp: new Date().toISOString(),
        durationMs,
        engine: 'FastAPI / Gemini-2.5-Pro Stage 1 Discovery',
        httpStatus: response.status,
        requestPayload,
        responsePayload: mergedDiscovery,
      },
    };
  } catch (err) {
    const durationMs = Date.now() - startTime;
    const reason = err instanceof Error ? err.message : String(err);
    console.warn('[WCS Navigator] Live discovery gateway unreachable, using heuristic engine:', err);
    const extracted = await extractScheduleFromDocument(targetName);
    return {
      discovery: extracted.discovery,
      decisionTrace: extracted.decisionTrace,
      source: 'client_heuristic',
      errorReason: reason,
      telemetry: {
        endpoint,
        method: 'POST -> CLIENT_HEURISTIC_FALLBACK',
        timestamp: new Date().toISOString(),
        durationMs,
        engine: 'Client Heuristic Fallback',
        httpStatus: 0,
        requestPayload: { targetName },
        responsePayload: extracted.discovery,
        errorReason: reason,
      },
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
): Promise<GenerateResponse & { telemetry?: ServiceTelemetry }> {
  const startTime = Date.now();

  if (isMockMode || !target) {
    const extracted = await extractScheduleFromDocument(eventName);
    const durationMs = Date.now() - startTime;
    return {
      decisionTrace: baseTrace || extracted.decisionTrace,
      icsContent: baseTrace?.icsContent || extracted.decisionTrace.icsContent,
      telemetry: {
        endpoint: 'client_heuristic://generateSchedule',
        method: 'CLIENT_HEURISTIC',
        timestamp: new Date().toISOString(),
        durationMs,
        engine: 'Client Rule Engine (Local)',
        requestPayload: { eventName, answers },
        responsePayload: baseTrace || extracted.decisionTrace,
        httpStatus: 200,
      },
    };
  }

  const apiBase = getApiBaseUrl();
  const endpoint = `${apiBase}/api/v1/generate`;

  try {
    let response: Response;
    let requestPayload: unknown;

    if (target instanceof File) {
      const formData = new FormData();
      formData.append('file', target);
      formData.append('questionnaire_responses', JSON.stringify(answers));
      requestPayload = { fileName: target.name, answers };
      response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });
    } else {
      requestPayload = {
        url: target,
        questionnaire_responses: answers,
      };
      response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload),
      });
    }

    const durationMs = Date.now() - startTime;

    if (!response.ok) {
      throw new Error(`Live generation error: HTTP ${response.status}`);
    }

    const data: GenerateResponse = await response.json();
    return {
      ...data,
      telemetry: {
        endpoint,
        method: 'POST',
        timestamp: new Date().toISOString(),
        durationMs,
        engine: 'FastAPI / Gemini-2.5-Pro Stage 2 Optimization',
        httpStatus: response.status,
        requestPayload,
        responsePayload: data.decisionTrace,
      },
    };
  } catch (err) {
    const durationMs = Date.now() - startTime;
    const reason = err instanceof Error ? err.message : String(err);
    console.warn('[WCS Navigator] Live generation gateway unreachable, using fallback state:', err);
    const extracted = await extractScheduleFromDocument(eventName);
    return {
      decisionTrace: baseTrace || extracted.decisionTrace,
      icsContent: baseTrace?.icsContent || extracted.decisionTrace.icsContent,
      telemetry: {
        endpoint,
        method: 'POST -> CLIENT_FALLBACK',
        timestamp: new Date().toISOString(),
        durationMs,
        engine: 'Client Rule Engine Fallback',
        httpStatus: 0,
        requestPayload: { eventName, answers },
        responsePayload: baseTrace || extracted.decisionTrace,
        errorReason: reason,
      },
    };
  }
}
