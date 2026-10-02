import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import fs from 'node:fs';
import path from 'node:path';
import { MarkdownRenderer } from './MarkdownRenderer';

describe('MarkdownRenderer', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders standard markdown paragraphs and headings', () => {
    const markdown = `
## Test Heading
This is a paragraph of content.
    `;
    render(
      <MemoryRouter>
        <MarkdownRenderer content={markdown} />
      </MemoryRouter>
    );

    expect(screen.getByText('Test Heading')).toBeDefined();
    expect(screen.getByText('This is a paragraph of content.')).toBeDefined();
  });

  it('renders a top-level blockquote as a styled NOTE callout box', () => {
    const markdown = `
> This is an important observation.
    `;
    render(
      <MemoryRouter>
        <MarkdownRenderer content={markdown} />
      </MemoryRouter>
    );

    expect(screen.getByText('Note')).toBeDefined();
    expect(screen.getByText('This is an important observation.')).toBeDefined();
  });

  it('extracts custom label from bold prefix in blockquote', () => {
    const markdown = `
> **Important:** This is a key requirement.
    `;
    render(
      <MemoryRouter>
        <MarkdownRenderer content={markdown} />
      </MemoryRouter>
    );

    expect(screen.getByText('Important')).toBeDefined();
    expect(screen.getByText('This is a key requirement.')).toBeDefined();
  });

  it('handles nested blockquotes without spawning recursive NOTE callout cards', () => {
    const markdown = `
> Outer blockquote
>> Nested blockquote level 1
>>> Nested blockquote level 2
    `;
    const { container } = render(
      <MemoryRouter>
        <MarkdownRenderer content={markdown} />
      </MemoryRouter>
    );

    // There should only be ONE Note header label, not 3
    const noteHeaders = screen.getAllByText('Note');
    expect(noteHeaders).toHaveLength(1);

    // All content should still be rendered
    expect(container.textContent).toContain('Outer blockquote');
    expect(container.textContent).toContain('Nested blockquote level 1');
    expect(container.textContent).toContain('Nested blockquote level 2');
  });

  it('defensively sanitizes git merge conflict markers without layout corruption', () => {
    const conflictedMarkdown = `
### Telemetry Section
1. Option Alpha
<<<<<<< HEAD
2. **Gateway Telemetry**: Active engine FastAPI / Gemini-3.5-Flash
=======
2. **Gateway Telemetry**: Active engine FastAPI / Gemini-2.5-Pro
>>>>>>> origin/docs/wcs-navigator-architecture-update-10604771613681517063
3. Option Charlie
    `;

    const { container } = render(
      <MemoryRouter>
        <MarkdownRenderer content={conflictedMarkdown} />
      </MemoryRouter>
    );

    // Conflict markers and branch ref strings should not render as nested blockquote explosions
    expect(container.textContent).not.toContain('<<<<<<<');
    expect(container.textContent).not.toContain('=======');
    expect(container.textContent).not.toContain('>>>>>>> origin/docs');

    // Content should remain legible
    expect(screen.getByText('Telemetry Section')).toBeDefined();
    expect(container.textContent).toContain('Option Alpha');
    expect(container.textContent).toContain('Option Charlie');
  });
});

describe('Content Repository Integrity', () => {
  const contentDir = path.resolve(__dirname, '../../../content');

  function getAllMarkdownFiles(dir: string): string[] {
    if (!fs.existsSync(dir)) return [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files: string[] = [];

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...getAllMarkdownFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }

    return files;
  }

  it('ensures no markdown content file contains git merge conflict markers', () => {
    const mdFiles = getAllMarkdownFiles(contentDir);
    expect(mdFiles.length).toBeGreaterThan(0);

    const conflictPattern = /^(?:<{7}\s|={7}$|>{7}\s)/m;
    const violatedFiles: string[] = [];

    for (const file of mdFiles) {
      const text = fs.readFileSync(file, 'utf-8');
      if (conflictPattern.test(text)) {
        violatedFiles.push(path.relative(contentDir, file));
      }
    }

    expect(violatedFiles).toEqual([]);
  });
});
