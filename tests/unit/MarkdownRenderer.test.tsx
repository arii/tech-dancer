import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MarkdownRenderer } from '../../src/components/ui/MarkdownRenderer';

describe('MarkdownRenderer - Mermaid Diagrams', () => {
  it('should render a mermaid graph as an image pointing to mermaid.ink with the correct base64 encoded JSON configuration', () => {
    const mermaidCode = 'graph TD\n    A --> B';
    const markdownContent = `\`\`\`mermaid\n${mermaidCode}\n\`\`\``;

    render(
      <MemoryRouter>
        <MarkdownRenderer content={markdownContent} />
      </MemoryRouter>
    );

    // Find the image element representing the mermaid graph
    const imgElement = screen.getByAltText('Workflow Diagram') as HTMLImageElement;
    expect(imgElement).toBeDefined();
    expect(imgElement.src).toContain('https://mermaid.ink/svg/');

    // Decode and parse the JSON payload from the base64 URL
    const base64Part = imgElement.src.replace('https://mermaid.ink/svg/', '');
    let standardBase64 = base64Part.replace(/-/g, '+').replace(/_/g, '/');
    while (standardBase64.length % 4 !== 0) {
      standardBase64 += '=';
    }
    const binary = atob(standardBase64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const decodedString = new TextDecoder().decode(bytes);
    const payload = JSON.parse(decodedString);

    // Verify the structure and values
    expect(payload).toEqual({
      code: mermaidCode,
      mermaid: {
        theme: 'dark',
        themeVariables: {
          fontSize: '24px'
        }
      }
    });
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
