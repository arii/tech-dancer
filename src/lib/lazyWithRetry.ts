/**
 * Utility for detecting dynamic module import failures and recovering via controlled page reload.
 */

const RELOAD_KEY_PREFIX = 'chunk_reload_attempted:';
const RELOAD_TIMEOUT_MS = 10000; // 10s cooldown to prevent infinite reload loops

/**
 * Determines whether an error is caused by a failed dynamic module import / stale chunk URL.
 */
export function isChunkLoadError(error: unknown): boolean {
  if (!error) return false;
  const message = error instanceof Error ? error.message : String(error);
  return /Failed to fetch dynamically imported module|error loading dynamically imported module|loading chunk \d+ failed|failed to load module script/i.test(
    message
  );
}

/**
 * Attempts a page reload if a chunk load error occurred, enforcing a loop guard via sessionStorage.
 * Returns true if a reload was initiated, false if suppressed by loop guard or not a chunk error.
 */
export function handleChunkLoadError(error?: unknown): boolean {
  if (typeof window === 'undefined') return false;

  if (error && !isChunkLoadError(error)) {
    return false;
  }

  const pathname = window.location.pathname;
  const key = `${RELOAD_KEY_PREFIX}${pathname}`;
  const now = Date.now();

  try {
    const lastReload = sessionStorage.getItem(key);
    if (lastReload) {
      const elapsed = now - parseInt(lastReload, 10);
      if (elapsed < RELOAD_TIMEOUT_MS) {
        return false;
      }
    }
    sessionStorage.setItem(key, now.toString());
  } catch {
    // Fall back gracefully if sessionStorage is restricted or throws
  }

  window.location.reload();
  return true;
}

/**
 * Wraps a dynamic component or module import function to catch chunk loading failures
 * and automatically reload the page once per route session.
 */
export function lazyWithRetry<T>(
  importFn: () => Promise<T>
): () => Promise<T> {
  return async () => {
    try {
      return await importFn();
    } catch (error) {
      if (isChunkLoadError(error)) {
        const reloaded = handleChunkLoadError(error);
        if (reloaded) {
          // Return an unresolved promise so component rendering halts while page reloads
          return new Promise<T>(() => {});
        }
      }
      throw error;
    }
  };
}
