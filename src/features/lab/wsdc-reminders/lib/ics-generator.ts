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
 * Folds lines longer than 75 characters as per RFC 5545.
 * Limits lines to 75 octets.
 */
function foldLine(line: string): string {
  const MAX_OCTETS = 75;
  const encoder = new TextEncoder();

  if (encoder.encode(line).length <= MAX_OCTETS) return line;

  let result = "";
  let currentLineOctets = 0;
  let isFirstLine = true;
  let currentLine = "";

  for (const char of line) {
    const charOctets = encoder.encode(char).length;
    const limit = isFirstLine ? MAX_OCTETS : MAX_OCTETS - 1;

    if (currentLineOctets + charOctets > limit) {
      result += currentLine + "\r\n ";
      currentLine = char;
      currentLineOctets = charOctets;
      isFirstLine = false;
    } else {
      currentLine += char;
      currentLineOctets += charOctets;
    }
  }

  result += currentLine;
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
