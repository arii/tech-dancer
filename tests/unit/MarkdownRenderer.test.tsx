import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { MarkdownRenderer } from '../../src/components/ui/MarkdownRenderer';

// Mock mermaid for MarkdownRenderer test
vi.mock('mermaid', () => ({
  default: {
    initialize: vi.fn(),
    render: vi.fn().mockResolvedValue({ svg: '<svg data-testid="mock-svg"></svg>' }),
  },
}));

describe('MarkdownRenderer - Mermaid Diagrams', () => {
  it('should render a mermaid graph using ResponsiveDiagram component', () => {
    const mermaidCode = 'graph TD\n    A --> B';
    const markdownContent = `\`\`\`mermaid\n${mermaidCode}\n\`\`\``;

    render(
      <MemoryRouter>
        <MarkdownRenderer content={markdownContent} />
      </MemoryRouter>
    );

    // Verify it renders the ResponsiveDiagram container structure
    expect(screen.getByText('Workflow Diagram')).toBeDefined();
    expect(screen.getByRole('button', { name: /expand diagram/i })).toBeDefined();
  });

  it('should render standard code blocks normally', () => {
    const markdownContent = '```typescript\nconst x = 42;\n```';

    render(
      <MemoryRouter>
        <MarkdownRenderer content={markdownContent} />
      </MemoryRouter>
    );

    // Verify standard code block renders without crashing
    const codeBlock = screen.getByText('typescript');
    expect(codeBlock).toBeDefined();
    expect(screen.getByText('const')).toBeDefined();
  });
});
