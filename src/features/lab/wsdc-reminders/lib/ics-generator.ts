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
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "");
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
    ].join("\r\n");
  });

  const footer = ["END:VCALENDAR"];
  return [...header, ...body, ...footer].join("\r\n");
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
