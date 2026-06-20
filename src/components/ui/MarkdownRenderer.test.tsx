import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MarkdownRenderer } from './MarkdownRenderer';
import { MemoryRouter } from 'react-router-dom';
import type { ReactNode } from 'react';

// Mock Primitives to verify props
vi.mock('@/layouts/Primitives', () => ({
  Box: ({ children, className, ...props }: { children: ReactNode, className?: string }) => <div className={className} data-props={JSON.stringify(props)}>{children}</div>,
  Text: ({ children, className, ...props }: { children: ReactNode, className?: string }) => <span className={className} data-props={JSON.stringify(props)}>{children}</span>,
  Stack: ({ children, className, ...props }: { children: ReactNode, className?: string }) => <div className={className} data-testid="stack" data-props={JSON.stringify(props)}>{children}</div>,
  Grid: ({ children, className, ...props }: { children: ReactNode, className?: string }) => <div className={className} data-testid="grid" data-props={JSON.stringify(props)}>{children}</div>,
}));

describe('MarkdownRenderer Primitives Support', () => {
  beforeEach(() => {
    cleanup();
  });

  it('correctly parses and passes responsive props to Grid', () => {
    const content = '<grid cols=\'{"base": 1, "md": 2}\' gap="10">Content</grid>';
    render(
      <MemoryRouter>
        <MarkdownRenderer content={content} />
      </MemoryRouter>
    );

    const grid = screen.getByTestId('grid');
    const props = JSON.parse(grid.getAttribute('data-props') || '{}');
    expect(props.cols).toEqual({ base: 1, md: 2 });
    expect(props.gap).toBe("10");
  });

  it('preserves children and does not attempt to parse them', () => {
    const content = '<stack gap="4">Complex Child Content</stack>';
    render(
      <MemoryRouter>
        <MarkdownRenderer content={content} />
      </MemoryRouter>
    );

    const stack = screen.getByTestId('stack');
    expect(stack.textContent).toBe('Complex Child Content');
  });

  it('correctly parses and passes props to Stack', () => {
    const content = '<stack gap="4">Content</stack>';
    render(
      <MemoryRouter>
        <MarkdownRenderer content={content} />
      </MemoryRouter>
    );

    const stack = screen.getByTestId('stack');
    const props = JSON.parse(stack.getAttribute('data-props') || '{}');
    expect(props.gap).toBe("4");
  });

  it('does not leak markup as text', () => {
    const content = '<grid cols=\'{"base": 1, "md": 2}\'>Content</grid>';
    render(
      <MemoryRouter>
        <MarkdownRenderer content={content} />
      </MemoryRouter>
    );

    expect(screen.queryByText(/<grid/)).toBeNull();
  });
});
