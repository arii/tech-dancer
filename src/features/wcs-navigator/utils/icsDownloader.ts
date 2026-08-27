/**
 * Triggers a direct client-side in-memory download of an .ics calendar string.
 * Uses Blob object to avoid backend file storage requirement.
 *
 * @param icsString Content of the RFC 5545 ICS file
 * @param filename Default filename for download (defaults to 'wcs-navigator-schedule.ics')
 */
export function downloadIcsFile(icsString: string, filename: string = 'wcs-navigator-schedule.ics'): void {
  if (!icsString) return;

  const blob = new Blob([icsString], { type: 'text/calendar;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
