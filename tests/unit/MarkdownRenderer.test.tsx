import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
    expect(screen.getByTitle('Click/Tap to view full screen')).toBeDefined();

    const imgElement = screen.getByAltText('Workflow Diagram') as HTMLImageElement;
    expect(imgElement).toBeDefined();

    // Decode base64 to verify its config payload is passed
    const url = imgElement.src;
    expect(url.startsWith('https://mermaid.ink/svg/')).toBe(true);
    let base64Part = url.replace('https://mermaid.ink/svg/', '');
    base64Part = base64Part.replace(/-/g, '+').replace(/_/g, '/');
    while (base64Part.length % 4 !== 0) {
      base64Part += '=';
    }
    const decodedStr = atob(base64Part);
    const decodedObj = JSON.parse(decodedStr);

    expect(decodedObj.code).toBe(mermaidCode);
    expect(decodedObj.mermaid.theme).toBe('dark');
    expect(decodedObj.mermaid.themeVariables.fontSize).toBe('24px');
  });

  it('should render standard code blocks normally', async () => {
    const markdownContent = '```typescript\nconst x = 42;\n```';

    render(
      <MemoryRouter>
        <MarkdownRenderer content={markdownContent} />
      </MemoryRouter>
    );

    // Verify standard code block renders without crashing
    const codeBlock = await screen.findByText('typescript');
    expect(codeBlock).toBeDefined();
    expect(await screen.findByText(/const/)).toBeDefined();
  });

  it('should assign sponsored rel attribute for affiliate links and standard rel for other links', () => {
    const markdownContent = `
[Amazon](https://www.amazon.com/dp/12345)
[Amzn](https://amzn.to/abcde)
[Printful](https://printful.com/product/123)
[Tag Link](https://example.com/item?tag=my-tag)
[Not Amazon](https://not-amazon.com/test)
[Standard Link](https://example.org/docs)
    `;

    render(
      <MemoryRouter>
        <MarkdownRenderer content={markdownContent} />
      </MemoryRouter>
    );

    const amazonLink = screen.getByText('Amazon');
    expect(amazonLink.getAttribute('rel')).toBe('sponsored noopener noreferrer');

    const amznLink = screen.getByText('Amzn');
    expect(amznLink.getAttribute('rel')).toBe('sponsored noopener noreferrer');

    const printfulLink = screen.getByText('Printful');
    expect(printfulLink.getAttribute('rel')).toBe('sponsored noopener noreferrer');

    const tagLink = screen.getByText('Tag Link');
    expect(tagLink.getAttribute('rel')).toBe('sponsored noopener noreferrer');

    const notAmazonLink = screen.getByText('Not Amazon');
    expect(notAmazonLink.getAttribute('rel')).toBe('noopener noreferrer');

    const standardLink = screen.getByText('Standard Link');
    expect(standardLink.getAttribute('rel')).toBe('noopener noreferrer');
  });
});
