/**
 * Lightweight frontend error telemetry and logging pipeline.
 * Catch uncaught exceptions, unhandled rejections, and React boundary crashes.
 */

export interface TelemetryPayload {
  message: string;
  type: 'error' | 'unhandledrejection' | 'react-error';
  stack?: string;
  componentStack?: string;
  url: string;
  userAgent: string;
  timestamp: string;
}

const ENDPOINT = '/api/telemetry';
const DEDUPE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

// Simple in-memory cache for deduplication
const errorCache = new Set<string>();

/**
 * Generates a stable key for an error to deduplicate reports.
 */
function getErrorKey(payload: Partial<TelemetryPayload>): string {
  return `${payload.type}:${payload.message}:${payload.stack?.slice(0, 100)}`;
}

/**
 * Sends a telemetry payload to the ingestion endpoint.
 */
export function reportError(payload: Partial<TelemetryPayload>) {
  const fullPayload: TelemetryPayload = {
    message: payload.message || 'Unknown error',
    type: payload.type || 'error',
    stack: payload.stack,
    componentStack: payload.componentStack,
    url: window.location.href,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString(),
  };

  const key = getErrorKey(fullPayload);

  if (errorCache.has(key)) {
    return;
  }

  errorCache.add(key);
  setTimeout(() => errorCache.delete(key), DEDUPE_WINDOW_MS);

  const body = JSON.stringify(fullPayload);

  // Use sendBeacon if available for reliability during page unload
  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon(ENDPOINT, blob);
  } else {
    // Fallback to fetch with keepalive
    fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
      keepalive: true,
    }).catch(() => {
      // Silently fail as we don't want to cause more errors
    });
  }
}

/**
 * Initializes global error listeners.
 */
export function initTelemetry() {
  if (typeof window === 'undefined') return;

  window.addEventListener('error', (event) => {
    reportError({
      message: event.message,
      type: 'error',
      stack: event.error?.stack,
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    reportError({
      message: event.reason?.message || String(event.reason),
      type: 'unhandledrejection',
      stack: event.reason?.stack,
    });
  });
}
