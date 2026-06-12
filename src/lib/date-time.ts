/**
 * Normalizes a date string to a Date object, ensuring that YYYY-MM-DD
 * strings are parsed as local time instead of UTC to prevent off-by-one errors.
 */
export function parseDate(dateStr: string | Date | undefined | null): Date {
  if (!dateStr) return new Date();
  if (dateStr instanceof Date) return dateStr;

  if (dateStr.includes('T')) {
    return new Date(dateStr);
  }
  // For YYYY-MM-DD, parse as local
  const parts = dateStr.split('-');
  if (parts.length !== 3) return new Date(dateStr);

  const [year, month, day] = parts.map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Adds or subtracts days from a Date object safely, handling DST transitions
 * by using local Date methods instead of millisecond math.
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Formats a date into a human-readable relative time string (e.g., "3 minutes ago").
 */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (Math.abs(diffInSeconds) < 60) {
    return rtf.format(-diffInSeconds, 'second');
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (Math.abs(diffInMinutes) < 60) {
    return rtf.format(-diffInMinutes, 'minute');
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (Math.abs(diffInHours) < 24) {
    return rtf.format(-diffInHours, 'hour');
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (Math.abs(diffInDays) < 30) {
    return rtf.format(-diffInDays, 'day');
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (Math.abs(diffInMonths) < 12) {
    return rtf.format(-diffInMonths, 'month');
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return rtf.format(-diffInYears, 'year');
}

/**
 * Generates a consistent timestamp-based unique identifier string.
 */
export function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
