import { describe, it, expect } from 'vitest';
import { generateICS } from '../ics-generator';
import { TimelineItem } from '../../types';

describe('ics-generator', () => {
  it('should escape reserved characters in SUMMARY and DESCRIPTION and handle folding', () => {
    const items: TimelineItem[] = [
      {
        id: '1',
        label: 'Special; Item, with \\ characters',
        description: 'Multi\nline\ndescription; with symbols, like \\ and ;',
        date: new Date('2023-01-01T00:00:00Z'),
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
        date: new Date('2023-01-01T00:00:00Z'),
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
        date: new Date('2023-01-01T00:00:00Z'),
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
        date: new Date('2023-01-01T00:00:00Z'),
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
        date: new Date('2023-01-01T00:00:00Z'),
      }
    ];
    const ics = generateICS('Event', items);

    // SUMMARY:WCS Action: (20) + A*54 (54) = 74 bytes.
    // 74 + 4 (emoji) = 78 > 75.
    // Should fold after the 54th 'A'.
    expect(ics).toContain(`SUMMARY:WCS Action: ${"A".repeat(54)}\r\n 🌟 (Event)`);
  });
});
