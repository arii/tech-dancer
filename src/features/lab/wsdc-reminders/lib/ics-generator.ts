import { TimelineItem } from '../types';

const ESCAPE_MAP: Record<string, string> = {
  '\\': '\\\\',
  ',': '\\,',
  ';': '\\;',
  '\n': '\\n',
  '\r': '',
};

/**
 * Escapes special characters for iCalendar format as per RFC 5545.
 */
function escapeICS(str: string): string {
  if (!str) return "";
  return str.replace(/[\\,;\n\r]/g, (match) => ESCAPE_MAP[match] ?? "");
}

/**
 * Folds lines longer than 75 octets as per RFC 5545.
 * Uses a buffer-aware approach to avoid O(n^2) encoding and emoji splitting.
 */
function foldLine(line: string): string {
  const MAX_OCTETS = 75;
  const encoder = new TextEncoder();
  const bytes = encoder.encode(line);

  if (bytes.length <= MAX_OCTETS) return line;

  const decoder = new TextDecoder();
  let result = "";
  let pos = 0;
  let isFirstLine = true;

  while (pos < bytes.length) {
    const limit = isFirstLine ? MAX_OCTETS : MAX_OCTETS - 1;
    let end = pos + limit;

    if (end >= bytes.length) {
      const chunk = bytes.subarray(pos);
      if (!isFirstLine) result += "\r\n ";
      result += decoder.decode(chunk);
      break;
    }

    // Don't split in the middle of a multi-byte UTF-8 character.
    // Bytes starting with 10xxxxxx (0x80-0xBF) are continuation bytes.
    while (end > pos && (bytes[end] & 0xC0) === 0x80) {
      end--;
    }

    // Fallback: if a single character is longer than the limit (should not happen with 75 octets),
    // we must at least move forward by one character.
    if (end === pos) {
      end = pos + limit + 1;
      while (end < bytes.length && (bytes[end] & 0xC0) === 0x80) {
        end++;
      }
    }

    const chunk = bytes.subarray(pos, end);
    if (!isFirstLine) result += "\r\n ";
    result += decoder.decode(chunk);
    pos = end;
    isFirstLine = false;
  }

  return result;
}

export function generateICS(eventTitle: string, items: TimelineItem[], url?: string) {
  const header = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//BoomTick//WSDCReminders//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH"
  ];

  const body = items.map(item => {
    // For all-day events (VALUE=DATE), we must use the date relative to the user's local time,
    // as that's how they entered it. toISOString() uses UTC and can shift the date.
    const formatDate = (d: Date) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}${month}${day}`;
    };

    const startStr = formatDate(item.date);

    // DTEND is non-inclusive for DATE values, so it must be set to the day AFTER the intended end.
    const end = item.endDate || item.date;
    const nextDay = new Date(end);
    nextDay.setDate(nextDay.getDate() + 1);
    const endStr = formatDate(nextDay);

    const rawDesc = url ? `${item.description}\n\nEvent URL: ${url}` : item.description;

    const escapedSummary = escapeICS(`WCS Action: ${item.label} (${eventTitle})`);
    const escapedDescription = escapeICS(rawDesc);

    return [
      "BEGIN:VEVENT",
      `DTSTART;VALUE=DATE:${startStr}`,
      `DTEND;VALUE=DATE:${endStr}`,
      `SUMMARY:${escapedSummary}`,
      `DESCRIPTION:${escapedDescription}`,
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "TRANSP:TRANSPARENT",
      "END:VEVENT"
    ].map(foldLine).join("\r\n");
  });

  const footer = ["END:VCALENDAR"];
  return [...header.map(foldLine), ...body, ...footer.map(foldLine)].join("\r\n");
}

export function downloadICS(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
