import { TimelineItem } from '../types';

/**
 * Escapes special characters for iCalendar format as per RFC 5545.
 */
function escapeICS(str: string): string {
  if (!str) return "";
  return str
    .replace(/\\/g, "\\\\")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
    .replace(/\r?\n/g, "\\n");
}

/**
 * Folds lines longer than 75 characters as per RFC 5545.
 */
function foldLine(line: string): string {
  const MAX_LENGTH = 75;
  if (line.length <= MAX_LENGTH) return line;

  let result = line.substring(0, MAX_LENGTH);
  let remaining = line.substring(MAX_LENGTH);

  while (remaining.length > 0) {
    result += "\r\n ";
    // Next chunk should be at most 74 chars because of the leading space
    const chunkSize = MAX_LENGTH - 1;
    result += remaining.substring(0, chunkSize);
    remaining = remaining.substring(chunkSize);
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
    const dateStr = item.date.toISOString().split('T')[0].replace(/-/g, "");
    const rawDesc = url ? `${item.description}\n\nEvent URL: ${url}` : item.description;

    const escapedSummary = escapeICS(`WCS Action: ${item.label} (${eventTitle})`);
    const escapedDescription = escapeICS(rawDesc);

    return [
      "BEGIN:VEVENT",
      `DTSTART;VALUE=DATE:${dateStr}`,
      `DTEND;VALUE=DATE:${dateStr}`,
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
