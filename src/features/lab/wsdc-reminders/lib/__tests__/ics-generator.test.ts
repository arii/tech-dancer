import { describe, it, expect, vi, afterEach } from 'vitest';
import { generateICS } from '../ics-generator';
import { TimelineItem } from '../../types';

describe('ics-generator', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('should escape reserved characters in SUMMARY and DESCRIPTION and handle folding', () => {
    const items: TimelineItem[] = [
      {
        id: '1',
        label: 'Special; Item, with \\ characters',
        description: 'Multi\nline\ndescription; with symbols, like \\ and ;',
        date: new Date(2023, 0, 1),
      }
    ];
    const eventTitle = 'Test; Event, with \\ characters';
    const ics = generateICS(eventTitle, items);

    // SUMMARY:WCS Action: Special\; Item\, with \\ characters (Test\; Event\, wit
    //  h \\ characters)
    // Note: SUMMARY: is 8 chars.
    // WCS Action: Special\; Item\, with \\ characters (Test\; Event\, wit is 67 chars.
    // 8 + 67 = 75 chars.
    expect(ics).toContain('SUMMARY:WCS Action: Special\\; Item\\, with \\\\ characters (Test\\; Event\\, wit\r\n h \\\\ characters)');

    // DESCRIPTION:Multi\nline\ndescription\; with symbols\, like \\ and \;
    expect(ics).toContain('DESCRIPTION:Multi\\nline\\ndescription\\; with symbols\\, like \\\\ and \\;');
  });

  it('should handle empty or null strings', () => {
    const items: TimelineItem[] = [
      {
        id: '2',
        label: '',
        description: '',
        date: new Date(2023, 0, 1),
      }
    ];
    const ics = generateICS('', items);
    expect(ics).toContain('SUMMARY:WCS Action:  ()');
    expect(ics).toContain('DESCRIPTION:');
  });

  it('should fold long lines at 75 octets', () => {
    const longDescription = 'This is a very long description that should be folded into multiple lines because it exceeds the 75 character limit set by the RFC 5545 specification for iCalendar files.';
    const items: TimelineItem[] = [
      {
        id: '3',
        label: 'Long Item',
        description: longDescription,
        date: new Date(2023, 0, 1),
      }
    ];
    const ics = generateICS('Long Event', items);

    // DESCRIPTION: is 12 chars.
    // "DESCRIPTION:This is a very long description that should be folded into mult" is 75 chars.
    // Next line starts with a space and "iple lines because it exceeds the 75 character limit set by the RFC 5545 s" (1 + 74 = 75 chars)
    expect(ics).toContain('DESCRIPTION:This is a very long description that should be folded into mult\r\n iple lines because it exceeds the 75 character limit set by the RFC 5545 s\r\n pecification for iCalendar files.');
  });

  it('should fold based on octets, not string length', () => {
    // 🌟 is 4 bytes in UTF-8

    const emojis = "🌟".repeat(20);
    const items: TimelineItem[] = [
      {
        id: '4',
        label: emojis,
        description: 'Short',
        date: new Date(2023, 0, 1),
      }
    ];
    const ics = generateICS('Event', items);

    // "SUMMARY:WCS Action: " is 20 chars/bytes
    // 75 - 20 = 55 bytes available.
    // 55 / 4 = 13.75 -> 13 emojis = 52 bytes. 20 + 52 = 72 bytes.
    // 14th emoji would make it 76 bytes.
    // So 13 emojis on first line, then fold.
    const firstLineEmojis = "🌟".repeat(13);
    const secondLineEmojis = "🌟".repeat(7);

    expect(ics).toContain(`SUMMARY:WCS Action: ${firstLineEmojis}\r\n ${secondLineEmojis} (Event)`);
  });

  it('should not split multi-byte characters at the 75-octet boundary', () => {
    // Exact boundary test
    // "SUMMARY:WCS Action: " is 20 bytes.
    // 75 - 20 = 55 bytes available.
    // 54 bytes of 'A' + 4-byte emoji = 78 bytes (must fold before emoji).

    const label = "A".repeat(54) + "🌟";
    const items: TimelineItem[] = [
      {
        id: '5',
        label: label,
        description: 'Boundary',
        date: new Date(2023, 0, 1),
      }
    ];
    const ics = generateICS('Event', items);

    // SUMMARY:WCS Action: (20) + A*54 (54) = 74 bytes.
    // 74 + 4 (emoji) = 78 > 75.
    // Should fold after the 54th 'A'.
    expect(ics).toContain(`SUMMARY:WCS Action: ${"A".repeat(54)}\r\n 🌟 (Event)`);
  });

  it('should handle multi-day events by correctly setting DTEND to the non-inclusive next day', () => {
    const items: TimelineItem[] = [
      {
        id: '6',
        label: 'Multi-day Event',
        description: 'Starts Jan 1, ends Jan 3',
        date: new Date(2023, 0, 1),
        endDate: new Date(2023, 0, 3),
      }
    ];
    const ics = generateICS('Test Event', items);

    expect(ics).toContain('DTSTART;VALUE=DATE:20230101');
    // DTEND should be Jan 4th because Jan 3rd is the last day and DTEND is exclusive
    expect(ics).toContain('DTEND;VALUE=DATE:20230104');
  });

  it('should handle single-day events by setting DTEND to the next day', () => {
    const items: TimelineItem[] = [
      {
        id: '7',
        label: 'Single-day Event',
        description: 'Jan 1 only',
        date: new Date(2023, 0, 1),
      }
    ];
    const ics = generateICS('Test Event', items);

    expect(ics).toContain('DTSTART;VALUE=DATE:20230101');
    expect(ics).toContain('DTEND;VALUE=DATE:20230102');
  });

  it('should be consistent across timezones and match local date entry', () => {
    // When a user enters "2023-01-01", we want that literal date in the ICS.
    // toISOString() would shift it depending on the system's TZ if the date was created without a TZ.
    // Our implementation now uses local Date methods.

    // Test with EST
    vi.stubEnv('TZ', 'America/New_York');
    const itemsEST: TimelineItem[] = [{
      id: '8',
      label: 'TZ Test',
      description: 'Desc',
      date: new Date(2023, 0, 1), // Jan 1st local
    }];
    const icsEST = generateICS('Event', itemsEST);
    expect(icsEST).toContain('DTSTART;VALUE=DATE:20230101');

    // Test with AEST
    vi.stubEnv('TZ', 'Australia/Sydney');
    const itemsAEST: TimelineItem[] = [{
      id: '8',
      label: 'TZ Test',
      description: 'Desc',
      date: new Date(2023, 0, 1), // Jan 1st local
    }];
    const icsAEST = generateICS('Event', itemsAEST);
    expect(icsAEST).toContain('DTSTART;VALUE=DATE:20230101');
  });

  it('should escape double backslashes correctly', () => {
    const items: TimelineItem[] = [
      {
        id: '9',
        label: 'Backslash \\ Test',
        description: 'Path: C:\\Users\\Test',
        date: new Date(2023, 0, 1),
      }
    ];
    const ics = generateICS('Test Event', items);

    // Summary: WCS Action: Backslash \\ Test (Test Event)
    // Escaped: WCS Action: Backslash \\\\ Test (Test Event)
    expect(ics).toContain('SUMMARY:WCS Action: Backslash \\\\ Test (Test Event)');
    // Description: Path: C:\\Users\\Test
    // Escaped: Path: C:\\\\Users\\\\Test
    expect(ics).toContain('DESCRIPTION:Path: C:\\\\Users\\\\Test');
  });

  it('should handle missing descriptions by using an empty string', () => {
    const items: TimelineItem[] = [
      {
        id: '10',
        label: 'No Description',
        description: '',
        date: new Date(2023, 0, 1),
      }
    ];
    const ics = generateICS('Test Event', items);
    expect(ics).toContain('DESCRIPTION:');
  });

  it('should correctly handle overnight dance events (e.g. Sat-Sun)', () => {
    const items: TimelineItem[] = [
      {
        id: '11',
        label: 'Saturday Night Social',
        description: 'Dance from Sat night to Sun morning',
        date: new Date(2023, 5, 10), // Saturday
        endDate: new Date(2023, 5, 11), // Sunday
      }
    ];
    const ics = generateICS('WCS Event', items);

    // Starts 10th, ends 11th inclusive (all day)
    // DTSTART: 20230610
    // DTEND: 20230612 (exclusive)
    expect(ics).toContain('DTSTART;VALUE=DATE:20230610');
    expect(ics).toContain('DTEND;VALUE=DATE:20230612');
  });

  it('should handle complex mixed escaping in DESCRIPTION', () => {
    const items: TimelineItem[] = [
      {
        id: '12',
        label: 'Complex Escaping',
        description: 'Commas, Semicolons; Backslashes\\ and \nNewlines',
        date: new Date(2023, 0, 1),
      }
    ];
    const ics = generateICS('Event', items);

    // Escaped: Commas\, Semicolons\; Backslashes\\ and \nNewlines
    expect(ics).toContain('DESCRIPTION:Commas\\, Semicolons\\; Backslashes\\\\ and \\nNewlines');
  });

  it('should handle multi-month duration intervals (e.g. month end boundary)', () => {
    const items: TimelineItem[] = [
      {
        id: '13',
        label: 'End of Month Event',
        description: 'Starts Feb 28, ends March 1',
        date: new Date(2023, 1, 28),
        endDate: new Date(2023, 2, 1),
      }
    ];
    const ics = generateICS('WCS Event', items);

    // DTSTART: 20230228
    // DTEND: 20230302 (exclusive next day after March 1)
    expect(ics).toContain('DTSTART;VALUE=DATE:20230228');
    expect(ics).toContain('DTEND;VALUE=DATE:20230302');
  });

  describe('Timezone variance', () => {
    const createItems = () => [
      {
        id: '14',
        label: 'TZ Stability Test',
        description: 'Should stay same date',
        date: new Date(2023, 5, 15), // June 15th local
      }
    ];

    it('should output consistent DATE strings in UTC', () => {
      vi.stubEnv('TZ', 'UTC');
      const ics = generateICS('Event', createItems());
      expect(ics).toContain('DTSTART;VALUE=DATE:20230615');
    });

    it('should output consistent DATE strings in PST (Negative Offset)', () => {
      vi.stubEnv('TZ', 'America/Los_Angeles');
      const ics = generateICS('Event', createItems());
      expect(ics).toContain('DTSTART;VALUE=DATE:20230615');
    });

    it('should output consistent DATE strings in AEST (Positive Offset)', () => {
      vi.stubEnv('TZ', 'Australia/Sydney');
      const ics = generateICS('Event', createItems());
      expect(ics).toContain('DTSTART;VALUE=DATE:20230615');
    });
  });
});
