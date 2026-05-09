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

  it('should fold long lines at 75 characters', () => {
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
});
