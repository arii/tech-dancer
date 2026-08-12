import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { MarkdownRenderer } from '../../src/components/ui/MarkdownRenderer';

describe('MarkdownRenderer - Mermaid Diagrams', () => {
  it('should render a mermaid graph using ResponsiveDiagram component with dark theme encoded URL', () => {
    const mermaidCode = 'graph TD\n    A --> B';
    const markdownContent = `\`\`\`mermaid\n${mermaidCode}\n\`\`\``;

    render(
      <MemoryRouter>
        <MarkdownRenderer content={markdownContent} />
      </MemoryRouter>
    );

    // Verify it renders the ResponsiveDiagram container structure
    expect(screen.getByText('Workflow Diagram')).toBeDefined();
    expect(screen.getByText('Click/Tap diagram to expand & zoom')).toBeDefined();

    const imgElement = screen.getByAltText('Workflow Diagram') as HTMLImageElement;
    expect(imgElement).toBeDefined();

    // Decode base64 to verify its config payload is passed
    const url = imgElement.src;
    expect(url.startsWith('https://mermaid.ink/svg/')).toBe(true);
    const base64Part = url.replace('https://mermaid.ink/svg/', '');
    const decodedStr = atob(base64Part);
    const decodedObj = JSON.parse(decodedStr);

    expect(decodedObj.code).toBe(mermaidCode);
    expect(decodedObj.mermaid.theme).toBe('dark');
    expect(decodedObj.mermaid.themeVariables.fontSize).toBe('24px');
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
